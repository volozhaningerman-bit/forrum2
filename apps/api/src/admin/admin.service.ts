import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { PublicationStatus, ReportStatus, RoleEventType } from '../generated/prisma/client.js';
import type { GrantCommunityRoleDto, PromotionSettingsDto } from './dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WalletService } from '../wallet/wallet.service.js';
import { ModerationService } from '../moderation/moderation.service.js';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService, private readonly wallet: WalletService, private readonly config: ConfigService, private readonly moderation: ModerationService) {}

  async dashboard() {
    const [users, verifiedUsers, communities, publications, comments, openReports, messages] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { emailVerifiedAt: { not: null } } }),
      this.prisma.community.count({ where: { status: 'ACTIVE' } }),
      this.prisma.publication.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.comment.count({ where: { hiddenAt: null } }),
      this.prisma.report.count({ where: { status: ReportStatus.OPEN } }),
      this.prisma.message.count(),
    ]);
    return { users, verifiedUsers, communities, publications, comments, openReports, messages };
  }

  async reports() {
    return this.prisma.report.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 200,
      include: {
        author: { select: { username: true, displayName: true } },
        publication: { select: { slug: true, title: true, body: true, status: true, author: { select: { username: true, displayName: true } } } },
        comment: { select: { id: true, body: true, hiddenAt: true, author: { select: { username: true, displayName: true } } } },
      },
    });
  }

  async resolveReport(id: string, status: ReportStatus, actorId: string, note?: string) {
    if (status !== ReportStatus.RESOLVED && status !== ReportStatus.REJECTED) throw new BadRequestException('Недопустимый статус');
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Жалоба не найдена');
    await this.prisma.$transaction([
      this.prisma.report.update({ where: { id }, data: { status, resolvedAt: new Date(), resolutionNote: note?.trim() || null } }),
      this.prisma.auditLog.create({ data: { actorId, action: 'report.resolve', entityType: 'Report', entityId: id, metadata: { status } } }),
    ]);
    return { ok: true };
  }

  async hidePublication(slug: string, reason: string, actorId: string) {
    const publication = await this.prisma.publication.findUnique({ where: { slug } });
    if (!publication) throw new NotFoundException('Публикация не найдена');
    await this.prisma.$transaction([
      this.prisma.publication.update({ where: { id: publication.id }, data: { status: PublicationStatus.HIDDEN } }),
      this.prisma.auditLog.create({ data: { actorId, action: 'publication.hide', entityType: 'Publication', entityId: publication.id, metadata: { reason } } }),
    ]);
    await this.moderation.recordPublicationHide(actorId, publication.id, reason);
    return { ok: true };
  }

  async hideComment(id: string, reason: string, actorId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Комментарий не найден');
    await this.prisma.$transaction([
      this.prisma.comment.update({ where: { id }, data: { hiddenAt: new Date(), hiddenReason: reason } }),
      this.prisma.auditLog.create({ data: { actorId, action: 'comment.hide', entityType: 'Comment', entityId: id, metadata: { reason } } }),
    ]);
    await this.moderation.recordCommentHide(actorId, id, reason);
    return { ok: true };
  }

  async backupStatus() {
    const file = this.config.get('BACKUP_STATUS_FILE', '/app/backups/backup-status.json');
    try {
      return JSON.parse(await readFile(file, 'utf8'));
    } catch {
      return { state: 'unknown', message: 'Сервис ещё не создал статус', updatedAt: null, lastBackup: null };
    }
  }

  async communityRoles() {
    return this.prisma.communityRole.findMany({
      orderBy: [{ endedAt: 'asc' }, { createdAt: 'desc' }], take: 200,
      include: {
        user: { select: { username: true, displayName: true, avatarUrl: true } },
        community: { select: { slug: true, name: true } },
        grantedBy: { select: { username: true, displayName: true } },
        events: { orderBy: { createdAt: 'desc' }, take: 5, include: { actor: { select: { username: true, displayName: true } } } },
      },
    });
  }

  async grantCommunityRole(actorId: string, dto: GrantCommunityRoleDto) {
    const [user, community] = await Promise.all([
      this.prisma.user.findUnique({ where: { username: dto.username.trim().toLowerCase() } }),
      this.prisma.community.findUnique({ where: { slug: dto.communitySlug.trim().toLowerCase() } }),
    ]);
    if (!user) throw new NotFoundException('Пользователь не найден');
    if (!community) throw new NotFoundException('Сообщество не найдено');
    const now = new Date();
    const result = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.communityRole.findUnique({ where: { userId_communityId_role: { userId: user.id, communityId: community.id, role: dto.role } } });
      if (existing && !existing.endedAt) throw new BadRequestException('У пользователя уже есть эта действующая роль');
      const role = existing
        ? await tx.communityRole.update({ where: { id: existing.id }, data: { endedAt: null, grantedById: actorId, note: dto.note?.trim() || null, createdAt: now } })
        : await tx.communityRole.create({ data: { userId: user.id, communityId: community.id, role: dto.role, grantedById: actorId, note: dto.note?.trim() || null } });
      await tx.communityRoleEvent.create({ data: { roleId: role.id, userId: user.id, actorId, type: RoleEventType.GRANTED, note: dto.note?.trim() || null } });
      await tx.auditLog.create({ data: { actorId, action: 'community.role.grant', entityType: 'CommunityRole', entityId: role.id, metadata: { username: user.username, communitySlug: community.slug, role: role.role } } });
      return role;
    });
    return { id: result.id };
  }

  async endCommunityRole(actorId: string, id: string, note: string) {
    const role = await this.prisma.communityRole.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Роль не найдена');
    if (role.endedAt) throw new BadRequestException('Роль уже завершена');
    await this.prisma.$transaction([
      this.prisma.communityRole.update({ where: { id }, data: { endedAt: new Date() } }),
      this.prisma.communityRoleEvent.create({ data: { roleId: id, userId: role.userId, actorId, type: RoleEventType.ENDED, note: note.trim() } }),
      this.prisma.auditLog.create({ data: { actorId, action: 'community.role.end', entityType: 'CommunityRole', entityId: id, metadata: { note: note.trim(), role: role.role } } }),
    ]);
    return { ok: true };
  }

  async promotionSettings() {
    const setting = await this.prisma.platformSetting.findUnique({ where: { key: 'promotion.pricing' } });
    return setting?.value ?? {
      pinLimit: 3, pinBasePricePerDay: 500, pinDemandPercentPerOccupied: 35,
      boostLimit: 8, boostBasePricePerDay: 150, boostDemandPercentPerOccupied: 12,
    };
  }

  async updatePromotionSettings(actorId: string, dto: PromotionSettingsDto) {
    const value: Record<string, number> = { ...dto };
    await this.prisma.$transaction([
      this.prisma.platformSetting.upsert({
        where: { key: 'promotion.pricing' }, update: { value }, create: { key: 'promotion.pricing', value },
      }),
      this.prisma.auditLog.create({
        data: { actorId, action: 'promotion.settings.update', entityType: 'PlatformSetting', entityId: 'promotion.pricing', metadata: value },
      }),
    ]);
    return dto;
  }

  promotions() { return this.wallet.adminList(); }

  refundPromotion(actorId: string, id: string, reason: string) {
    return this.wallet.adminRefund(actorId, id, reason);
  }

  grantBalance(actorId: string, username: string, amount: number, description: string) {
    return this.wallet.grant(actorId, username, amount, description);
  }
}
