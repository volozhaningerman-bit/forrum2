var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { NotificationType, NotifyLevel } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
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
let NotificationsService = class NotificationsService {
    prisma;
    telegram;
    constructor(prisma, telegram) {
        this.prisma = prisma;
        this.telegram = telegram;
    }
    list(userId) {
        return this.prisma.notification.findMany({
            where: { userId }, orderBy: { createdAt: 'desc' }, take: 100,
            include: { actor: { select: { username: true, displayName: true, avatarUrl: true } } },
        });
    }
    async unreadCount(userId) {
        return { count: await this.prisma.notification.count({ where: { userId, readAt: null } }) };
    }
    async read(userId, id) {
        await this.prisma.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
        return { ok: true };
    }
    async readAll(userId) {
        await this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
        return { ok: true };
    }
    async preferences(userId) {
        return (await this.prisma.notificationPreference.findUnique({ where: { userId } })) ?? { userId, ...defaults };
    }
    async updatePreferences(userId, dto) {
        return this.prisma.notificationPreference.upsert({
            where: { userId },
            create: { userId, ...defaults, ...dto },
            update: dto,
        });
    }
    async deliverToCommunitySubscribers(input) {
        const communities = await this.prisma.community.findMany({ select: { id: true, parentId: true } });
        const byId = new Map(communities.map((item) => [item.id, item]));
        const audienceCommunityIds = [];
        let current = input.communityId;
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
            if (notification)
                delivered += 1;
        }
        return { delivered };
    }
    async deliver(data, transaction) {
        const db = transaction ?? this.prisma;
        const stored = await db.notificationPreference.findUnique({ where: { userId: data.userId } });
        const preferences = { ...defaults, ...(stored ?? {}) };
        if (!notificationEnabled(preferences, data.type))
            return null;
        const notification = await db.notification.create({ data });
        setTimeout(() => { void this.telegram.deliverNotification(notification.id); }, transaction ? 500 : 0);
        return notification;
    }
};
NotificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, TelegramService])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map