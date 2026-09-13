import { analyticsSummary, analyticsWindow, customWindow, type DailyMetric } from './analytics.js';
import type { EditCategoryDto } from './dto.js';
import { defaultHomeBanners, homeBannerKey, validateBanners } from '../home/banners.js';
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

  async analytics(input = '30',from?:string,to?:string) {
    let days = Number(input);
    let window;
    const now = new Date();
    try { if(from||to){const custom=customWindow(from??'',to??'',now);window=custom;days=custom.days;}else window=analyticsWindow(days,now); } catch { throw new BadRequestException('Выберите 7/30/90 дней или корректный период до 366 завершённых дней'); }
    const { previousStart, end } = window;
    const rows = await this.prisma.$queryRaw<DailyMetric[]>`
      WITH events AS (
        SELECT "createdAt"::date AS day, 1 AS users, 0 AS publications, 0 AS comments, NULL::text AS actor FROM "User"
          WHERE "createdAt" >= ${previousStart} AND "createdAt" < ${end}
        UNION ALL
        SELECT "createdAt"::date, 0, 1, 0, "authorId"::text FROM "Publication"
          WHERE "createdAt" >= ${previousStart} AND "createdAt" < ${end} AND status = 'PUBLISHED'
        UNION ALL
        SELECT c."createdAt"::date, 0, 0, 1, c."authorId"::text FROM "Comment" c JOIN "Publication" p ON p.id = c."publicationId"
          WHERE c."createdAt" >= ${previousStart} AND c."createdAt" < ${end} AND c."hiddenAt" IS NULL AND p.status = 'PUBLISHED'
      ) SELECT to_char(day, 'YYYY-MM-DD') AS date, SUM(users)::int AS users,
        SUM(publications)::int AS publications, SUM(comments)::int AS comments,
        COUNT(DISTINCT actor)::int AS contributors FROM events GROUP BY day ORDER BY day`;
    const result=analyticsSummary(rows,days,from||to?window.end:now,!!(from||to));
    const confirmed=await this.prisma.user.count({where:{emailVerifiedAt:{gte:window.start,lt:window.end}}});
    const confirmedPrevious=await this.prisma.user.count({where:{emailVerifiedAt:{gte:window.previousStart,lt:window.start}}});
    return {...result,generatedAt:now.toISOString(),confirmed:{value:confirmed,previous:confirmedPrevious}};
  }

  private listPage(q = '', input = '1') {
    const page = Number(input);
    if (!Number.isInteger(page) || page < 1 || page > 100000 || q.length > 100) throw new BadRequestException('Некорректные параметры поиска');
    return { page, query: q.trim(), take: 25, skip: (page - 1) * 25 };
  }

  async users(q?: string, input?: string) {
    const { page, query, take, skip } = this.listPage(q, input);
    const where = query ? { OR: [{ username: { contains: query, mode: 'insensitive' as const } }, { displayName: { contains: query, mode: 'insensitive' as const } }, { email: { contains: query, mode: 'insensitive' as const } }] } : {};
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({ where, take, skip, orderBy: [{ createdAt: 'desc' }, { id: 'asc' }], select: { id: true, username: true, displayName: true, email: true, role: true, state: true, emailVerifiedAt: true, createdAt: true } }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total, page, pageSize: take };
  }

  async publications(q?: string, input?: string,status?:string,author?:string,category?:string,from?:string,to?:string) {
    const { page, query, take, skip } = this.listPage(q, input);
    if(status&&!['PUBLISHED','HIDDEN','DELETED'].includes(status))throw new BadRequestException('Неизвестный статус');
    if((author?.length??0)>100||(category?.length??0)>100)throw new BadRequestException('Слишком длинный фильтр');
    const parseDate=(v:string)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v))||new Date(v).toISOString().slice(0,10)!==v)throw new BadRequestException('Неверная дата');return new Date(v);};
    const gte=from?parseDate(from):undefined,lt=to?new Date(+parseDate(to)+86400000):undefined;if(gte&&lt&&gte>=lt)throw new BadRequestException('Начало периода позже окончания');
    const where = {...(query?{title:{contains:query,mode:'insensitive' as const}}:{}),...(status?{status:status as PublicationStatus}:{}),...(author?{author:{username:{equals:author,mode:'insensitive' as const}}}:{}),...(category?{community:{slug:category}}:{}),...((gte||lt)?{createdAt:{gte,lt}}:{})};
    const [items, total] = await Promise.all([
      this.prisma.publication.findMany({ where, take, skip, orderBy: [{ createdAt: 'desc' }, { id: 'asc' }], select: { id: true, slug: true, title: true, status: true, createdAt: true, author: { select: { username: true } }, community: { select: { name: true } } } }),
      this.prisma.publication.count({ where }),
    ]);
    return { items, total, page, pageSize: take };
  }

  categories() {
    return this.prisma.community.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, parentId: true, name: true, slug: true, description: true, shortDescription: true, status: true, _count: { select: { publications: true, subscriptions: true } } } });
  }

  async editCategory(id: string, dto: EditCategoryDto, actorId: string) {
    const name = dto.name.trim(), description = dto.description.trim();
    if (name.length < 2 || description.length < 20) throw new BadRequestException('Название — от 2 символов, описание — от 20');
    const before = await this.prisma.community.findUnique({ where: { id } });
    if (!before) throw new NotFoundException('Категория не найдена');
    await this.prisma.$transaction([
      this.prisma.community.update({ where: { id }, data: { name, description, shortDescription: dto.shortDescription.trim() } }),
      this.prisma.auditLog.create({ data: { actorId, action: 'community.edit', entityType: 'Community', entityId: id, metadata: { before: { name: before.name, description: before.description, shortDescription: before.shortDescription }, after: { name, description, shortDescription: dto.shortDescription.trim() } } } }),
    ]);
    return { ok: true };
  }

  connections() {
    return {
      mail: { hostConfigured: Boolean(this.config.get('SMTP_HOST')), port: String(this.config.get('SMTP_PORT', '1025')), senderConfigured: Boolean(this.config.get('SMTP_FROM')), testInbox: /mailpit/i.test(String(this.config.get('SMTP_HOST', ''))), webUrlConfigured: /^https?:\/\//.test(String(this.config.get('WEB_URL', ''))) },
      telegram: { tokenConfigured: Boolean(this.config.get('TELEGRAM_BOT_TOKEN')), pollingEnabled: String(this.config.get('TELEGRAM_POLLING_ENABLED')) === 'true' },
    };
  }

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

  async homeBanners() {
    const setting = await this.prisma.platformSetting.findUnique({where:{key:homeBannerKey}});
    return {banners:setting ? setting.value : defaultHomeBanners()};
  }
  async updateHomeBanners(actorId:string, input:unknown) {
    let banners;
    try {banners=validateBanners(input);} catch(error) {throw new BadRequestException(error instanceof Error ? error.message : 'Некорректные баннеры');}
    await this.prisma.$transaction([
      this.prisma.platformSetting.upsert({where:{key:homeBannerKey},create:{key:homeBannerKey,value:banners},update:{value:banners}}),
      this.prisma.auditLog.create({data:{actorId,action:'home.banners.update',entityType:'PlatformSetting',entityId:homeBannerKey,metadata:{banners}}}),
    ]);
    return {banners};
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
