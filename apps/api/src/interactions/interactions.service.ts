import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InteractionStatus, NotificationType, type InteractionType, type ReviewVerdict } from '../generated/prisma/client.js';
import { excerpt } from '../common/text.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateInteractionDto } from './dto.js';
import { completionState, reviewAllowed } from './rules.js';
import { canLinkPortfolioInteraction } from '../portfolio/rules.js';

@Injectable()
export class InteractionsService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService) {}

  private participantWhere(userId: string) {
    return { OR: [{ createdById: userId }, { counterpartId: userId }] };
  }

  async list(userId: string) {
    const rows = await this.prisma.confirmedInteraction.findMany({
      where: this.participantWhere(userId), orderBy: { updatedAt: 'desc' }, take: 100,
      include: {
        createdBy: { select: { username: true, displayName: true, avatarUrl: true } },
        counterpart: { select: { username: true, displayName: true, avatarUrl: true } },
        publication: { select: { slug: true, title: true } },
        community: { select: { slug: true, name: true } },
        portfolioItem: { select: { id: true, kind: true, title: true } },
        reviews: { where: { authorId: userId }, select: { id: true, verdict: true, body: true, createdAt: true } },
      },
    });
    return rows.map((row) => ({
      ...row,
      viewerRole: row.createdById === userId ? 'CREATOR' : 'COUNTERPART',
      otherUser: row.createdById === userId ? row.counterpart : row.createdBy,
      viewerConfirmed: Boolean(row.createdById === userId ? row.creatorConfirmedAt : row.counterpartConfirmedAt),
      otherConfirmed: Boolean(row.createdById === userId ? row.counterpartConfirmedAt : row.creatorConfirmedAt),
      viewerCompleted: Boolean(row.createdById === userId ? row.creatorCompletedAt : row.counterpartCompletedAt),
      otherCompleted: Boolean(row.createdById === userId ? row.counterpartCompletedAt : row.creatorCompletedAt),
      review: row.reviews[0] ?? null,
    }));
  }

  async create(actorId: string, dto: CreateInteractionDto) {
    const target = await this.prisma.user.findUnique({ where: { username: dto.targetUsername.trim().toLowerCase() } });
    if (!target) throw new NotFoundException('Пользователь не найден');
    if (target.id === actorId) throw new BadRequestException('Нельзя создать взаимодействие с самим собой');
    const publication = dto.publicationSlug ? await this.prisma.publication.findUnique({ where: { slug: dto.publicationSlug }, select: { id: true, status: true, communityId: true } }) : null;
    if (dto.publicationSlug && (!publication || publication.status !== 'PUBLISHED')) throw new BadRequestException('Связанная публикация недоступна');
    const community = dto.communitySlug ? await this.prisma.community.findUnique({ where: { slug: dto.communitySlug }, select: { id: true, status: true } }) : null;
    if (dto.communitySlug && (!community || community.status !== 'ACTIVE')) throw new BadRequestException('Сообщество недоступно');
    const portfolioItem = dto.portfolioItemId ? await this.prisma.portfolioItem.findUnique({ where: { id: dto.portfolioItemId } }) : null;
    if (dto.portfolioItemId && (!portfolioItem || !canLinkPortfolioInteraction({ itemStatus: portfolioItem.status, itemOwnerId: portfolioItem.ownerId, targetUserId: target.id }))) throw new BadRequestException('Связанный проект или услуга недоступны');
    const communityId = community?.id ?? publication?.communityId ?? portfolioItem?.communityId ?? null;

    const existing = await this.prisma.confirmedInteraction.findFirst({
      where: {
        status: { in: [InteractionStatus.PENDING, InteractionStatus.CONFIRMED] }, title: dto.title.trim(),
        OR: [
          { createdById: actorId, counterpartId: target.id },
          { createdById: target.id, counterpartId: actorId },
        ],
      },
    });
    if (existing) throw new BadRequestException('Похожее взаимодействие уже ожидает подтверждения или завершения');

    const created = await this.prisma.$transaction(async (tx) => {
      const row = await tx.confirmedInteraction.create({ data: {
        createdById: actorId, counterpartId: target.id, type: dto.type, title: dto.title.trim(), description: dto.description.trim(),
        publicationId: publication?.id ?? portfolioItem?.publicationId, portfolioItemId: portfolioItem?.id, communityId, creatorConfirmedAt: new Date(),
      } });
      await tx.auditLog.create({ data: { actorId, action: 'interaction.create', entityType: 'ConfirmedInteraction', entityId: row.id, metadata: { title: row.title, targetUsername: target.username, type: row.type } } });
      await this.notifications.deliver({
        userId: target.id, actorId, type: NotificationType.SYSTEM,
        title: 'Запрос подтверждения взаимодействия', body: excerpt(row.title, 120), href: '/interactions',
      }, tx);
      return row;
    });
    return { id: created.id };
  }

  async confirm(id: string, actorId: string) {
    const row = await this.prisma.confirmedInteraction.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Взаимодействие не найдено');
    if (row.status !== InteractionStatus.PENDING) throw new BadRequestException('Это взаимодействие уже обработано');
    if (row.counterpartId !== actorId) throw new ForbiddenException('Подтвердить может только приглашённый пользователь');
    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.confirmedInteraction.update({ where: { id }, data: { status: InteractionStatus.CONFIRMED, counterpartConfirmedAt: new Date() } });
      await tx.auditLog.create({ data: { actorId, action: 'interaction.confirm', entityType: 'ConfirmedInteraction', entityId: id, metadata: { title: row.title } } });
      await this.notifications.deliver({ userId: row.createdById, actorId, type: NotificationType.SYSTEM, title: 'Взаимодействие подтверждено', body: excerpt(row.title, 120), href: '/interactions' }, tx);
      return result;
    });
    return { id: updated.id, status: updated.status };
  }

  async complete(id: string, actorId: string) {
    const row = await this.prisma.confirmedInteraction.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Взаимодействие не найдено');
    if (row.status !== InteractionStatus.CONFIRMED) throw new BadRequestException('Сначала оба участника должны подтвердить взаимодействие');
    if (row.createdById !== actorId && row.counterpartId !== actorId) throw new ForbiddenException('Нет доступа к этому взаимодействию');
    const creator = row.createdById === actorId;
    const creatorCompletedAt = creator ? new Date() : row.creatorCompletedAt;
    const counterpartCompletedAt = creator ? row.counterpartCompletedAt : new Date();
    const nextStatus = completionState({ creatorCompleted: Boolean(creatorCompletedAt), counterpartCompleted: Boolean(counterpartCompletedAt) });
    const completed = nextStatus === 'COMPLETED';
    const targetUserId = creator ? row.counterpartId : row.createdById;
    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.confirmedInteraction.update({ where: { id }, data: {
        creatorCompletedAt, counterpartCompletedAt,
        ...(completed ? { status: InteractionStatus.COMPLETED, completedAt: new Date() } : {}),
      } });
      await tx.auditLog.create({ data: { actorId, action: completed ? 'interaction.complete' : 'interaction.completion-confirm', entityType: 'ConfirmedInteraction', entityId: id, metadata: { title: row.title } } });
      await this.notifications.deliver({
        userId: targetUserId, actorId, type: NotificationType.SYSTEM,
        title: completed ? 'Взаимодействие завершено' : 'Ожидается ваше подтверждение завершения',
        body: excerpt(row.title, 120), href: '/interactions',
      }, tx);
      return result;
    });
    return { id: updated.id, status: updated.status };
  }

  async cancel(id: string, actorId: string, reason?: string) {
    const row = await this.prisma.confirmedInteraction.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Взаимодействие не найдено');
    if (row.createdById !== actorId && row.counterpartId !== actorId) throw new ForbiddenException('Нет доступа к этому взаимодействию');
    if (row.status === InteractionStatus.COMPLETED) throw new BadRequestException('Завершённое взаимодействие нельзя отменить');
    if (row.status === InteractionStatus.CANCELLED) return { ok: true };
    const targetUserId = row.createdById === actorId ? row.counterpartId : row.createdById;
    await this.prisma.$transaction(async (tx) => {
      await tx.confirmedInteraction.update({ where: { id }, data: { status: InteractionStatus.CANCELLED, cancelledAt: new Date() } });
      await tx.auditLog.create({ data: { actorId, action: 'interaction.cancel', entityType: 'ConfirmedInteraction', entityId: id, metadata: { title: row.title, reason: reason?.trim() || null } } });
      await this.notifications.deliver({ userId: targetUserId, actorId, type: NotificationType.SYSTEM, title: 'Взаимодействие отменено', body: excerpt(row.title, 120), href: '/interactions' }, tx);
    });
    return { ok: true };
  }

  async review(id: string, actorId: string, verdict: ReviewVerdict, bodyInput: string) {
    const row = await this.prisma.confirmedInteraction.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Взаимодействие не найдено');
    const participant = row.createdById === actorId || row.counterpartId === actorId;
    const alreadyReviewed = Boolean(await this.prisma.profileReview.findUnique({ where: { interactionId_authorId: { interactionId: id, authorId: actorId } }, select: { id: true } }));
    if (!reviewAllowed({ status: row.status, participant, alreadyReviewed })) {
      if (!participant) throw new ForbiddenException('Нет доступа к этому взаимодействию');
      if (alreadyReviewed) throw new BadRequestException('Вы уже оставили отзыв по этому взаимодействию');
      throw new BadRequestException('Отзыв доступен только после подтверждённого завершения');
    }
    const targetId = row.createdById === actorId ? row.counterpartId : row.createdById;
    const review = await this.prisma.$transaction(async (tx) => {
      const result = await tx.profileReview.create({ data: { interactionId: id, authorId: actorId, targetId, verdict, body: bodyInput.trim() } });
      await tx.auditLog.create({ data: { actorId, action: 'review.create', entityType: 'ProfileReview', entityId: result.id, metadata: { interactionId: id, verdict } } });
      await this.notifications.deliver({ userId: targetId, actorId, type: NotificationType.SYSTEM, title: 'Новый подтверждённый отзыв', body: excerpt(bodyInput, 120), href: '/interactions' }, tx);
      return result;
    }).catch((error: { code?: string }) => {
      if (error?.code === 'P2002') throw new BadRequestException('Вы уже оставили отзыв по этому взаимодействию');
      throw error;
    });
    return { id: review.id };
  }
}
