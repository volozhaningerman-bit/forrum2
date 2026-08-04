var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MediaPartnerStatus, NotificationType } from '../generated/prisma/client.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
let MediaPartnersService = class MediaPartnersService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async publicList() {
        return this.prisma.mediaPartner.findMany({
            where: { status: MediaPartnerStatus.ACTIVE },
            orderBy: [{ type: 'asc' }, { updatedAt: 'desc' }],
            take: 100,
            select: {
                id: true, type: true, displayName: true, platform: true, channelUrl: true,
                audienceText: true, description: true, updatedAt: true,
                user: { select: { username: true, displayName: true, avatarUrl: true } },
            },
        });
    }
    async apply(userId, dto) {
        const existing = await this.prisma.mediaPartner.findUnique({
            where: { userId_channelUrl: { userId, channelUrl: dto.channelUrl.trim() } },
        });
        if (existing?.status === MediaPartnerStatus.REVIEW)
            throw new BadRequestException('Заявка на этот канал уже рассматривается');
        if (existing?.status === MediaPartnerStatus.ACTIVE)
            throw new BadRequestException('Этот канал уже участвует в Медиа FORRUM');
        const row = await this.prisma.mediaPartner.upsert({
            where: { userId_channelUrl: { userId, channelUrl: dto.channelUrl.trim() } },
            update: {
                type: dto.type, status: MediaPartnerStatus.REVIEW, displayName: dto.displayName.trim(),
                platform: dto.platform.trim(), audienceText: dto.audienceText?.trim() || null,
                description: dto.description.trim(), resolutionNote: null,
            },
            create: {
                userId, type: dto.type, displayName: dto.displayName.trim(), platform: dto.platform.trim(),
                channelUrl: dto.channelUrl.trim(), audienceText: dto.audienceText?.trim() || null,
                description: dto.description.trim(),
            },
        });
        await this.prisma.auditLog.create({
            data: { actorId: userId, action: 'media-partner.apply', entityType: 'MediaPartner', entityId: row.id, metadata: { channelUrl: row.channelUrl, type: row.type } },
        });
        return { id: row.id, status: row.status };
    }
    async adminList() {
        return this.prisma.mediaPartner.findMany({
            orderBy: [{ status: 'asc' }, { createdAt: 'asc' }],
            take: 200,
            include: { user: { select: { username: true, displayName: true, avatarUrl: true } } },
        });
    }
    async review(id, actorId, status, note) {
        if (status !== MediaPartnerStatus.ACTIVE &&
            status !== MediaPartnerStatus.REJECTED) {
            throw new BadRequestException('Недопустимый статус');
        }
        const row = await this.prisma.mediaPartner.findUnique({ where: { id } });
        if (!row)
            throw new NotFoundException('Заявка не найдена');
        await this.prisma.$transaction(async (tx) => {
            await tx.mediaPartner.update({ where: { id }, data: { status, resolutionNote: note?.trim() || null } });
            await tx.auditLog.create({
                data: { actorId, action: 'media-partner.review', entityType: 'MediaPartner', entityId: id, metadata: { status, note: note?.trim() || null } },
            });
            await this.notifications.deliver({
                userId: row.userId, actorId, type: NotificationType.SYSTEM,
                title: status === MediaPartnerStatus.ACTIVE ? 'Заявка в Медиа FORRUM одобрена' : 'Заявка в Медиа FORRUM отклонена',
                body: note?.trim() || (status === MediaPartnerStatus.ACTIVE ? 'Канал добавлен в каталог медиапартнёров.' : 'Проверьте требования и отправьте заявку повторно.'),
                href: '/media',
            }, tx);
        });
        return { ok: true };
    }
};
MediaPartnersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, NotificationsService])
], MediaPartnersService);
export { MediaPartnersService };
//# sourceMappingURL=media-partners.service.js.map