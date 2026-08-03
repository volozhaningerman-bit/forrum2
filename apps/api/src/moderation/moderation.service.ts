import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AppealStatus, ModerationActionType, ModerationTargetType, NotificationType, PublicationStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService) {}

  async recordPublicationHide(actorId: string, publicationId: string, reason: string) {
    const publication = await this.prisma.publication.findUnique({ where: { id: publicationId }, select: { authorId: true, slug: true, title: true } });
    if (!publication) throw new NotFoundException('Публикация не найдена');
    const action = await this.prisma.moderationAction.create({ data: {
      actorId, subjectUserId: publication.authorId, targetType: ModerationTargetType.PUBLICATION,
      actionType: ModerationActionType.HIDE, publicationId, reason,
    } });
    await this.notifications.deliver({
      userId: publication.authorId, actorId, publicationId, type: NotificationType.SYSTEM,
      title: 'Публикация скрыта модерацией', body: reason, href: '/settings/moderation',
    });
    return action;
  }

  async recordCommentHide(actorId: string, commentId: string, reason: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId }, select: { authorId: true, publicationId: true } });
    if (!comment) throw new NotFoundException('Комментарий не найден');
    const action = await this.prisma.moderationAction.create({ data: {
      actorId, subjectUserId: comment.authorId, targetType: ModerationTargetType.COMMENT,
      actionType: ModerationActionType.HIDE, commentId, publicationId: comment.publicationId, reason,
    } });
    await this.notifications.deliver({
      userId: comment.authorId, actorId, publicationId: comment.publicationId, commentId,
      type: NotificationType.SYSTEM, title: 'Комментарий скрыт модерацией', body: reason, href: '/settings/moderation',
    });
    return action;
  }

  listMine(userId: string) {
    return this.prisma.moderationAction.findMany({
      where: { subjectUserId: userId }, orderBy: { createdAt: 'desc' }, take: 100,
      include: { appeals: { where: { userId }, orderBy: { createdAt: 'desc' } }, actor: { select: { username: true, displayName: true } } },
    });
  }

  async appeal(userId: string, actionId: string, body: string) {
    const action = await this.prisma.moderationAction.findUnique({ where: { id: actionId }, include: { appeals: true } });
    if (!action) throw new NotFoundException('Решение модерации не найдено');
    if (action.subjectUserId !== userId) throw new ForbiddenException('Это решение относится к другому аккаунту');
    if (action.reversedAt) throw new BadRequestException('Решение уже отменено');
    if (action.appeals.some((item) => item.userId === userId)) throw new BadRequestException('Апелляция уже отправлена');
    return this.prisma.moderationAppeal.create({ data: { actionId, userId, body: body.trim() } });
  }

  listAppeals() {
    return this.prisma.moderationAppeal.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 200,
      include: {
        user: { select: { username: true, displayName: true } },
        action: true,
      },
    });
  }

  async resolveAppeal(actorId: string, appealId: string, status: AppealStatus, note: string) {
    if (![AppealStatus.ACCEPTED, AppealStatus.REJECTED].includes(status)) throw new BadRequestException('Недопустимый результат');
    const appeal = await this.prisma.moderationAppeal.findUnique({ where: { id: appealId }, include: { action: true } });
    if (!appeal) throw new NotFoundException('Апелляция не найдена');
    if (appeal.status !== AppealStatus.OPEN) throw new BadRequestException('Апелляция уже рассмотрена');

    await this.prisma.$transaction(async (tx) => {
      await tx.moderationAppeal.update({ where: { id: appealId }, data: { status, resolutionNote: note.trim(), resolvedById: actorId, resolvedAt: new Date() } });
      if (status === AppealStatus.ACCEPTED) {
        await tx.moderationAction.update({ where: { id: appeal.actionId }, data: { reversedAt: new Date() } });
        if (appeal.action.targetType === ModerationTargetType.PUBLICATION && appeal.action.publicationId) {
          await tx.publication.update({ where: { id: appeal.action.publicationId }, data: { status: PublicationStatus.PUBLISHED } });
        }
        if (appeal.action.targetType === ModerationTargetType.COMMENT && appeal.action.commentId) {
          await tx.comment.update({ where: { id: appeal.action.commentId }, data: { hiddenAt: null, hiddenReason: null } });
        }
      }
      await tx.auditLog.create({ data: { actorId, action: 'moderation.appeal.resolve', entityType: 'ModerationAppeal', entityId: appealId, metadata: { status, note } } });
    });
    await this.notifications.deliver({
      userId: appeal.userId, actorId, type: NotificationType.SYSTEM,
      title: status === AppealStatus.ACCEPTED ? 'Апелляция принята' : 'Апелляция отклонена', body: note.trim(), href: '/settings/moderation',
    });
    return { ok: true };
  }
}
