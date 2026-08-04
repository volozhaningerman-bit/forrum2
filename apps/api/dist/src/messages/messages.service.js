var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { excerpt } from '../common/text.js';
import { NotificationsService } from '../notifications/notifications.service.js';
let MessagesService = class MessagesService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async list(userId) {
        const memberships = await this.prisma.conversationMember.findMany({
            where: { userId }, orderBy: { conversation: { updatedAt: 'desc' } },
            include: {
                conversation: {
                    include: {
                        members: { include: { user: true } },
                        messages: { orderBy: { createdAt: 'desc' }, take: 1, include: { author: true } },
                    },
                },
            },
        });
        return memberships.map((membership) => {
            const other = membership.conversation.members.find((item) => item.userId !== userId)?.user;
            const latest = membership.conversation.messages[0];
            return {
                id: membership.conversationId,
                updatedAt: membership.conversation.updatedAt,
                other: other ? { username: other.username, displayName: other.displayName, avatarUrl: other.avatarUrl } : null,
                latest: latest ? { body: excerpt(latest.body, 100), createdAt: latest.createdAt, authorId: latest.authorId } : null,
                unread: Boolean(latest && latest.authorId !== userId && (!membership.lastReadAt || latest.createdAt > membership.lastReadAt)),
            };
        });
    }
    async unreadCount(userId) {
        const memberships = await this.prisma.conversationMember.findMany({
            where: { userId },
            include: { conversation: { include: { messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { authorId: true, createdAt: true } } } } },
        });
        const count = memberships.filter((membership) => {
            const latest = membership.conversation.messages[0];
            return Boolean(latest && latest.authorId !== userId && (!membership.lastReadAt || latest.createdAt > membership.lastReadAt));
        }).length;
        return { count };
    }
    async start(userId, usernameInput, bodyInput) {
        const target = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() } });
        if (!target)
            throw new NotFoundException('Пользователь не найден');
        if (target.id === userId)
            throw new BadRequestException('Нельзя написать самому себе');
        const existingMemberships = await this.prisma.conversationMember.findMany({
            where: { userId },
            include: { conversation: { include: { members: true } } },
        });
        const existing = existingMemberships.find((item) => {
            const ids = item.conversation.members.map((member) => member.userId);
            return ids.length === 2 && ids.includes(target.id);
        });
        const body = bodyInput.trim();
        if (existing) {
            await this.send(existing.conversationId, userId, body);
            return { id: existing.conversationId };
        }
        const conversation = await this.prisma.$transaction(async (tx) => {
            const created = await tx.conversation.create({
                data: { members: { create: [{ userId }, { userId: target.id }] } },
            });
            const message = await tx.message.create({ data: { conversationId: created.id, authorId: userId, body } });
            await this.notifications.deliver({
                userId: target.id, actorId: userId, conversationId: created.id, type: NotificationType.MESSAGE,
                title: 'Новое личное сообщение', body: excerpt(body, 120), href: `/messages/${created.id}`,
            }, tx);
            await tx.conversation.update({ where: { id: created.id }, data: { updatedAt: message.createdAt } });
            return created;
        });
        return { id: conversation.id };
    }
    async get(conversationId, userId) {
        const membership = await this.prisma.conversationMember.findUnique({
            where: { conversationId_userId: { conversationId, userId } },
            include: {
                conversation: {
                    include: {
                        members: { include: { user: true } },
                        messages: { orderBy: { createdAt: 'asc' }, take: 300, include: { author: true } },
                    },
                },
            },
        });
        if (!membership)
            throw new ForbiddenException('Нет доступа к переписке');
        await this.prisma.conversationMember.update({
            where: { conversationId_userId: { conversationId, userId } }, data: { lastReadAt: new Date() },
        });
        const other = membership.conversation.members.find((member) => member.userId !== userId)?.user ?? null;
        return {
            id: conversationId,
            other: other ? { username: other.username, displayName: other.displayName, avatarUrl: other.avatarUrl } : null,
            members: membership.conversation.members.map((member) => ({ username: member.user.username, displayName: member.user.displayName, avatarUrl: member.user.avatarUrl })),
            messages: membership.conversation.messages.map((message) => ({
                id: message.id, body: message.body, createdAt: message.createdAt,
                author: { username: message.author.username, displayName: message.author.displayName, avatarUrl: message.author.avatarUrl },
                isMine: message.authorId === userId,
            })),
        };
    }
    async send(conversationId, userId, bodyInput) {
        const membership = await this.prisma.conversationMember.findUnique({
            where: { conversationId_userId: { conversationId, userId } },
            include: { conversation: { include: { members: true } } },
        });
        if (!membership)
            throw new ForbiddenException('Нет доступа к переписке');
        const body = bodyInput.trim();
        const message = await this.prisma.$transaction(async (tx) => {
            const created = await tx.message.create({ data: { conversationId, authorId: userId, body } });
            await tx.conversation.update({ where: { id: conversationId }, data: { updatedAt: created.createdAt } });
            for (const member of membership.conversation.members) {
                if (member.userId === userId)
                    continue;
                await this.notifications.deliver({
                    userId: member.userId, actorId: userId, conversationId, type: NotificationType.MESSAGE,
                    title: 'Новое личное сообщение', body: excerpt(body, 120), href: `/messages/${conversationId}`,
                }, tx);
            }
            return created;
        });
        return { id: message.id };
    }
};
MessagesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, NotificationsService])
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages.service.js.map