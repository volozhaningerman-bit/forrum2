import { Injectable } from '@nestjs/common';
import { NotificationType, NotifyLevel, type Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UpdateNotificationPreferencesDto } from './dto.js';
import { notificationEnabled } from './policy.js';
import { TelegramService } from '../telegram/telegram.service.js';

const defaults = {
  publicationReplies: true,
  commentReplies: true,
  reactions: true,
  follows: true,
  wallPosts: true,
  messages: true,
  system: true,
  emailDigest: false,
  telegramEnabled: false,
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService, private readonly telegram: TelegramService) {}

  list(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId }, orderBy: { createdAt: 'desc' }, take: 100,
      include: { actor: { select: { username: true, displayName: true, avatarUrl: true } } },
    });
  }

  async unreadCount(userId: string) {
    return { count: await this.prisma.notification.count({ where: { userId, readAt: null } }) };
  }

  async read(userId: string, id: string) {
    await this.prisma.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
    return { ok: true };
  }

  async readAll(userId: string) {
    await this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
    return { ok: true };
  }

  async preferences(userId: string) {
    return (await this.prisma.notificationPreference.findUnique({ where: { userId } })) ?? { userId, ...defaults };
  }

  async updatePreferences(userId: string, dto: UpdateNotificationPreferencesDto) {
    return this.prisma.notificationPreference.upsert({
      where: { userId },
      create: { userId, ...defaults, ...dto },
      update: dto,
    });
  }


  async deliverToCommunitySubscribers(input: {
    communityId: string;
    importance: 'IMPORTANT' | 'ALL';
    title: string;
    body: string;
    href: string;
    actorId?: string;
    publicationId?: string;
  }) {
    const communities = await this.prisma.community.findMany({ select: { id: true, parentId: true } });
    const byId = new Map(communities.map((item) => [item.id, item]));
    const audienceCommunityIds: string[] = [];
    let current: string | null = input.communityId;
    while (current) {
      audienceCommunityIds.push(current);
      current = byId.get(current)?.parentId ?? null;
    }
    const allowedLevels = input.importance === 'ALL' ? [NotifyLevel.ALL] : [NotifyLevel.IMPORTANT, NotifyLevel.ALL];
    const subscriptions = await this.prisma.communitySubscription.findMany({
      where: { communityId: { in: audienceCommunityIds }, notifyLevel: { in: allowedLevels }, ...(input.actorId ? { userId: { not: input.actorId } } : {}) },
      select: { userId: true, notifyLevel: true },
      take: 5000,
    });
    const userIds = [...new Set(subscriptions.map((item) => item.userId))];
    let delivered = 0;
    for (const userId of userIds) {
      const notification = await this.deliver({
        userId,
        actorId: input.actorId,
        publicationId: input.publicationId,
        type: NotificationType.SYSTEM,
        title: input.title,
        body: input.body,
        href: input.href,
      });
      if (notification) delivered += 1;
    }
    return { delivered };
  }

  async deliver(data: Prisma.NotificationUncheckedCreateInput, transaction?: Prisma.TransactionClient) {
    const db = transaction ?? this.prisma;
    const stored = await db.notificationPreference.findUnique({ where: { userId: data.userId } });
    const preferences = { ...defaults, ...(stored ?? {}) };
    if (!notificationEnabled(preferences, data.type)) return null;
    const notification = await db.notification.create({ data });
    setTimeout(() => { void this.telegram.deliverNotification(notification.id); }, transaction ? 500 : 0);
    return notification;
  }
}
