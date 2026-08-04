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
import { WorkshopItemStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConfigService } from '@nestjs/config';
let WorkshopService = class WorkshopService {
    prisma;
    config;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async list(viewerId, includeReview = false) {
        const items = await this.prisma.workshopItem.findMany({
            where: includeReview ? {} : { OR: [{ status: WorkshopItemStatus.PUBLISHED }, ...(viewerId ? [{ authorId: viewerId }] : [])] },
            orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 200,
            include: {
                author: { select: { username: true, displayName: true, avatarUrl: true, forrumId: true } },
                previewMedia: { select: { id: true } },
                _count: { select: { likes: true } },
                likes: { where: { userId: viewerId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
            },
        });
        const publicApi = this.config.get('PUBLIC_API_URL', 'http://localhost:4000').replace(/\/$/, '');
        return items.map((item) => ({
            id: item.id, type: item.type, status: item.status, title: item.title, description: item.description,
            resolutionNote: item.resolutionNote, createdAt: item.createdAt, updatedAt: item.updatedAt, author: item.author,
            previewUrl: item.previewMedia ? `${publicApi}/v1/media/${item.previewMedia.id}/content` : null,
            thumbnailUrl: item.previewMedia ? `${publicApi}/v1/media/${item.previewMedia.id}/content?variant=thumbnail` : null,
            likeCount: item._count.likes, likedByViewer: item.likes.length > 0,
        }));
    }
    async create(userId, dto) {
        if (dto.previewMediaId) {
            const media = await this.prisma.mediaAsset.findUnique({ where: { id: dto.previewMediaId } });
            if (!media || media.ownerId !== userId)
                throw new ForbiddenException('Превью должно быть загружено этим аккаунтом');
        }
        return this.prisma.workshopItem.create({ data: {
                authorId: userId, type: dto.type, title: dto.title.trim(), description: dto.description.trim(), previewMediaId: dto.previewMediaId,
            } });
    }
    async toggleLike(userId, itemId) {
        const item = await this.prisma.workshopItem.findUnique({ where: { id: itemId } });
        if (!item || item.status !== WorkshopItemStatus.PUBLISHED)
            throw new NotFoundException('Работа не найдена');
        const existing = await this.prisma.workshopLike.findUnique({ where: { itemId_userId: { itemId, userId } } });
        if (existing) {
            await this.prisma.workshopLike.delete({ where: { itemId_userId: { itemId, userId } } });
            return { liked: false };
        }
        await this.prisma.workshopLike.create({ data: { itemId, userId } });
        return { liked: true };
    }
    async review(actor, itemId, status, note) {
        if (status !== WorkshopItemStatus.PUBLISHED && status !== WorkshopItemStatus.REJECTED)
            throw new BadRequestException('Недопустимый статус');
        const item = await this.prisma.workshopItem.findUnique({ where: { id: itemId } });
        if (!item)
            throw new NotFoundException('Работа не найдена');
        await this.prisma.$transaction([
            this.prisma.workshopItem.update({ where: { id: itemId }, data: { status, resolutionNote: note.trim(), reviewedById: actor.id } }),
            this.prisma.auditLog.create({ data: { actorId: actor.id, action: 'workshop.review', entityType: 'WorkshopItem', entityId: itemId, metadata: { status, note } } }),
        ]);
        return { ok: true };
    }
};
WorkshopService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, ConfigService])
], WorkshopService);
export { WorkshopService };
//# sourceMappingURL=workshop.service.js.map