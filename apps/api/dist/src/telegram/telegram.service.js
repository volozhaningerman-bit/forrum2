var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';
import { PublicationStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
function codeHash(value) {
    return createHash('sha256').update(value.trim().toUpperCase()).digest('hex');
}
function createCode() {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bytes = randomBytes(8);
    return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join('');
}
function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}
function plainText(source) {
    return source
        .replace(/\[img(?:=[^\]]*)?\][\s\S]*?\[\/img\]/gi, ' ')
        .replace(/\[url=[^\]]+\]([\s\S]*?)\[\/url\]/gi, '$1')
        .replace(/\[\/?[a-z0-9*]+(?:=[^\]]*)?\]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function firstImageUrl(source) {
    const match = /\[img(?:=[^\]]*)?\]([\s\S]*?)\[\/img\]/i.exec(source);
    const candidate = match?.[1]?.trim();
    if (!candidate)
        return null;
    try {
        const url = new URL(candidate);
        return url.protocol === 'https:' ? url.toString() : null;
    }
    catch {
        return null;
    }
}
let TelegramService = class TelegramService {
    prisma;
    config;
    active = false;
    offset = 0;
    botUserId = null;
    token;
    polling;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.token = config.get('TELEGRAM_BOT_TOKEN', '').trim();
        this.polling = config.get('TELEGRAM_POLLING_ENABLED', 'false') === 'true';
    }
    onModuleInit() {
        if (this.token && this.polling) {
            this.active = true;
            void this.pollLoop();
        }
    }
    onModuleDestroy() {
        this.active = false;
    }
    async api(method, payload = {}) {
        if (!this.token)
            throw new BadRequestException('Telegram-бот не настроен');
        const response = await fetch(`https://api.telegram.org/bot${this.token}/${method}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!data.ok) {
            throw new Error(data.description || `Telegram API: ${method}`);
        }
        return data.result;
    }
    async botId() {
        if (this.botUserId)
            return this.botUserId;
        const bot = await this.api('getMe');
        this.botUserId = bot.id;
        return bot.id;
    }
    async send(chatId, text) {
        return this.api('sendMessage', {
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });
    }
    async pollLoop() {
        while (this.active) {
            try {
                const updates = await this.api('getUpdates', {
                    offset: this.offset,
                    timeout: 25,
                    allowed_updates: ['message', 'my_chat_member'],
                });
                for (const update of updates) {
                    this.offset = Math.max(this.offset, update.update_id + 1);
                    await this.handleUpdate(update);
                }
            }
            catch (error) {
                console.error('Telegram polling error', error);
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    }
    async handleUpdate(update) {
        if (update.my_chat_member) {
            await this.handleChannelMembership(update.my_chat_member);
            return;
        }
        const message = update.message;
        const text = message?.text?.trim();
        const telegramUserId = message?.from?.id;
        const chatId = message?.chat.id;
        if (!text || !telegramUserId || !chatId)
            return;
        if (text.startsWith('/start')) {
            const code = text.split(/\s+/)[1]?.toUpperCase();
            if (!code) {
                await this.send(String(chatId), 'Откройте настройки FORRUM, создайте код привязки и отправьте /start КОД.');
                return;
            }
            const record = await this.prisma.telegramLinkCode.findUnique({
                where: { codeHash: codeHash(code) },
            });
            if (!record || record.usedAt || record.expiresAt <= new Date()) {
                await this.send(String(chatId), 'Код недействителен или истёк. Создайте новый в настройках FORRUM.');
                return;
            }
            await this.prisma.$transaction([
                this.prisma.telegramLink.upsert({
                    where: { userId: record.userId },
                    update: {
                        telegramUserId: String(telegramUserId),
                        chatId: String(chatId),
                        telegramUsername: message.from?.username,
                        enabled: true,
                        linkedAt: new Date(),
                    },
                    create: {
                        userId: record.userId,
                        telegramUserId: String(telegramUserId),
                        chatId: String(chatId),
                        telegramUsername: message.from?.username,
                    },
                }),
                this.prisma.telegramLinkCode.update({
                    where: { id: record.id },
                    data: { usedAt: new Date() },
                }),
                this.prisma.notificationPreference.upsert({
                    where: { userId: record.userId },
                    create: { userId: record.userId, telegramEnabled: true },
                    update: { telegramEnabled: true },
                }),
            ]);
            await this.send(String(chatId), 'FORRUM подключён. Теперь можно добавить бота администратором своего канала.');
            return;
        }
        if (text === '/unlink') {
            const link = await this.prisma.telegramLink.findUnique({
                where: { telegramUserId: String(telegramUserId) },
            });
            if (link) {
                await this.prisma.$transaction([
                    this.prisma.telegramLink.delete({ where: { userId: link.userId } }),
                    this.prisma.telegramChannel.updateMany({
                        where: { ownerUserId: link.userId },
                        data: { enabled: false, canPost: false },
                    }),
                    this.prisma.notificationPreference.updateMany({
                        where: { userId: link.userId },
                        data: { telegramEnabled: false },
                    }),
                ]);
            }
            await this.send(String(chatId), 'Telegram отвязан от FORRUM.');
            return;
        }
        await this.send(String(chatId), 'Команды: /start КОД — привязать FORRUM, /unlink — отключить Telegram.');
    }
    async handleChannelMembership(change) {
        if (change.chat.type !== 'channel')
            return;
        const status = change.new_chat_member.status;
        const active = status === 'administrator' || status === 'creator';
        const canPost = active && change.new_chat_member.can_post_messages !== false;
        const chatId = String(change.chat.id);
        if (!active) {
            await this.prisma.telegramChannel.updateMany({
                where: { chatId },
                data: {
                    enabled: false,
                    canPost: false,
                    lastCheckedAt: new Date(),
                },
            });
            return;
        }
        const link = await this.prisma.telegramLink.findUnique({
            where: { telegramUserId: String(change.from.id) },
        });
        if (!link)
            return;
        const existing = await this.prisma.telegramChannel.findUnique({
            where: { chatId },
        });
        if (existing &&
            existing.ownerUserId !== link.userId &&
            existing.enabled) {
            return;
        }
        await this.prisma.telegramChannel.upsert({
            where: { chatId },
            update: {
                ownerUserId: link.userId,
                title: change.chat.title?.trim() || 'Telegram-канал',
                username: change.chat.username?.trim() || null,
                enabled: canPost,
                canPost,
                lastCheckedAt: new Date(),
            },
            create: {
                ownerUserId: link.userId,
                chatId,
                title: change.chat.title?.trim() || 'Telegram-канал',
                username: change.chat.username?.trim() || null,
                enabled: canPost,
                canPost,
                lastCheckedAt: new Date(),
            },
        });
    }
    connectChannelUrl() {
        const username = this.config
            .get('TELEGRAM_BOT_USERNAME', '')
            .trim()
            .replace(/^@/, '');
        return username
            ? `https://t.me/${username}?startchannel&admin=post_messages`
            : null;
    }
    async status(userId) {
        const link = await this.prisma.telegramLink.findUnique({
            where: { userId },
        });
        return {
            configured: Boolean(this.token),
            polling: this.polling,
            linked: Boolean(link),
            connectChannelUrl: this.connectChannelUrl(),
            link: link
                ? {
                    telegramUsername: link.telegramUsername,
                    linkedAt: link.linkedAt,
                    enabled: link.enabled,
                }
                : null,
        };
    }
    async createLinkCode(userId) {
        if (!this.token) {
            throw new BadRequestException('Сначала укажите TELEGRAM_BOT_TOKEN');
        }
        const code = createCode();
        await this.prisma.$transaction([
            this.prisma.telegramLinkCode.deleteMany({
                where: { userId, usedAt: null },
            }),
            this.prisma.telegramLinkCode.create({
                data: {
                    userId,
                    codeHash: codeHash(code),
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            }),
        ]);
        return {
            code,
            command: `/start ${code}`,
            expiresInMinutes: 10,
            botUsername: this.config.get('TELEGRAM_BOT_USERNAME', '') || null,
        };
    }
    async unlink(userId) {
        await this.prisma.$transaction([
            this.prisma.telegramLink.deleteMany({ where: { userId } }),
            this.prisma.telegramChannel.updateMany({
                where: { ownerUserId: userId },
                data: { enabled: false, canPost: false },
            }),
            this.prisma.notificationPreference.updateMany({
                where: { userId },
                data: { telegramEnabled: false },
            }),
        ]);
        return { ok: true };
    }
    async channels(userId) {
        return this.prisma.telegramChannel.findMany({
            where: { ownerUserId: userId },
            orderBy: [{ enabled: 'desc' }, { updatedAt: 'desc' }],
            select: {
                id: true,
                title: true,
                username: true,
                enabled: true,
                canPost: true,
                linkedAt: true,
                lastCheckedAt: true,
            },
        });
    }
    async removeChannel(userId, channelId) {
        const channel = await this.prisma.telegramChannel.findFirst({
            where: { id: channelId, ownerUserId: userId },
            select: { id: true },
        });
        if (!channel)
            throw new NotFoundException('Канал не найден');
        await this.prisma.telegramChannel.update({
            where: { id: channel.id },
            data: { enabled: false },
        });
        return { ok: true };
    }
    async publicationPreview(slug) {
        const publication = await this.prisma.publication.findUnique({
            where: { slug },
            select: {
                status: true,
                title: true,
                body: true,
                community: { select: { name: true } },
            },
        });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED) {
            throw new NotFoundException('Публикация не найдена');
        }
        const excerpt = plainText(publication.body).slice(0, 500);
        return {
            title: publication.title?.trim() || `Публикация в ${publication.community.name}`,
            excerpt,
            hasImage: Boolean(firstImageUrl(publication.body)),
        };
    }
    async verifyChannel(channel) {
        try {
            const member = await this.api('getChatMember', {
                chat_id: channel.chatId,
                user_id: await this.botId(),
            });
            const canPost = (member.status === 'administrator' || member.status === 'creator') &&
                member.can_post_messages !== false;
            await this.prisma.telegramChannel.update({
                where: { id: channel.id },
                data: {
                    enabled: canPost,
                    canPost,
                    lastCheckedAt: new Date(),
                },
            });
            if (!canPost) {
                throw new BadRequestException('У бота больше нет права публиковать в этом канале');
            }
        }
        catch (error) {
            if (error instanceof BadRequestException)
                throw error;
            await this.prisma.telegramChannel.update({
                where: { id: channel.id },
                data: {
                    enabled: false,
                    canPost: false,
                    lastCheckedAt: new Date(),
                },
            }).catch(() => undefined);
            throw new BadRequestException('Не удалось проверить канал. Добавьте бота администратором ещё раз.');
        }
    }
    async sharePublication(userId, slug, dto) {
        const [channel, publication] = await Promise.all([
            this.prisma.telegramChannel.findFirst({
                where: {
                    id: dto.channelId,
                    ownerUserId: userId,
                    enabled: true,
                    canPost: true,
                },
            }),
            this.prisma.publication.findUnique({
                where: { slug },
                select: {
                    id: true,
                    slug: true,
                    status: true,
                    title: true,
                    body: true,
                    community: { select: { name: true } },
                },
            }),
        ]);
        if (!channel) {
            throw new ForbiddenException('Канал не подключён к вашему профилю');
        }
        if (!publication || publication.status !== PublicationStatus.PUBLISHED) {
            throw new NotFoundException('Публикация не найдена');
        }
        const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const shareCount = await this.prisma.telegramShare.count({
            where: { userId, createdAt: { gte: hourAgo } },
        });
        if (shareCount >= 30) {
            throw new BadRequestException('Достигнут лимит публикаций в Telegram. Попробуйте позже.');
        }
        const recentDuplicate = await this.prisma.telegramShare.findFirst({
            where: {
                userId,
                channelId: channel.id,
                publicationId: publication.id,
                createdAt: { gte: new Date(Date.now() - 2 * 60 * 1000) },
            },
            select: { id: true },
        });
        if (recentDuplicate) {
            throw new BadRequestException('Эта публикация только что была отправлена в выбранный канал');
        }
        await this.verifyChannel(channel);
        const site = this.config
            .get('WEB_URL', 'http://localhost:3000')
            .replace(/\/$/, '');
        const publicationUrl = `${site}/p/${encodeURIComponent(publication.slug)}`;
        const title = publication.title?.trim() || `Публикация в ${publication.community.name}`;
        const excerpt = plainText(publication.body).slice(0, 650);
        const html = [
            `<b>${escapeHtml(title)}</b>`,
            excerpt ? escapeHtml(excerpt) : '',
            `<a href="${escapeHtml(publicationUrl)}">FORRUM →</a>`,
        ].filter(Boolean).join('\n\n');
        const imageUrl = dto.includeImage
            ? firstImageUrl(publication.body)
            : null;
        let sent;
        let usedImage = false;
        try {
            if (imageUrl) {
                sent = await this.api('sendPhoto', {
                    chat_id: channel.chatId,
                    photo: imageUrl,
                    caption: html.slice(0, 1024),
                    parse_mode: 'HTML',
                });
                usedImage = true;
            }
            else {
                sent = await this.send(channel.chatId, html);
            }
        }
        catch (error) {
            if (!imageUrl) {
                const message = error instanceof Error
                    ? error.message
                    : 'Telegram не принял публикацию';
                throw new BadRequestException(message);
            }
            sent = await this.send(channel.chatId, html);
            usedImage = false;
        }
        await this.prisma.$transaction([
            this.prisma.telegramShare.create({
                data: {
                    userId,
                    channelId: channel.id,
                    publicationId: publication.id,
                    includeImage: dto.includeImage,
                    telegramMessageId: sent.message_id,
                },
            }),
            this.prisma.auditLog.create({
                data: {
                    actorId: userId,
                    action: 'telegram.share.publication',
                    entityType: 'Publication',
                    entityId: publication.id,
                    metadata: {
                        channelId: channel.id,
                        channelTitle: channel.title,
                        includeImage: dto.includeImage,
                        usedImage,
                    },
                },
            }),
        ]);
        return {
            ok: true,
            channelTitle: channel.title,
            usedImage,
        };
    }
    async deliverNotification(notificationId) {
        if (!this.token)
            return;
        const notification = await this.prisma.notification.findUnique({
            where: { id: notificationId },
            include: {
                user: {
                    include: {
                        telegramLink: true,
                        notificationPreference: true,
                    },
                },
            },
        });
        const link = notification?.user.telegramLink;
        if (!notification ||
            !link?.enabled ||
            !notification.user.notificationPreference?.telegramEnabled) {
            return;
        }
        const site = this.config
            .get('WEB_URL', 'http://localhost:3000')
            .replace(/\/$/, '');
        try {
            await this.send(link.chatId, `${escapeHtml(notification.title)}\n${escapeHtml(notification.body)}\n${escapeHtml(site + notification.href)}`);
            await this.prisma.telegramLink.update({
                where: { userId: notification.userId },
                data: { lastDeliveryAt: new Date() },
            });
        }
        catch (error) {
            console.error('Telegram delivery failed', error);
        }
    }
    async sendTest(userId) {
        const link = await this.prisma.telegramLink.findUnique({
            where: { userId },
        });
        if (!link)
            throw new BadRequestException('Telegram не привязан');
        await this.send(link.chatId, 'Тестовое уведомление FORRUM доставлено.');
        return { ok: true };
    }
};
TelegramService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ConfigService])
], TelegramService);
export { TelegramService };
//# sourceMappingURL=telegram.service.js.map