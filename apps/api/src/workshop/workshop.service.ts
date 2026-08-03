import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { WorkshopItemStatus, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConfigService } from '@nestjs/config';
import type { CreateWorkshopItemDto } from './dto.js';

@Injectable()
export class WorkshopService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  async list(viewerId?: string, includeReview = false) {
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

  async create(userId: string, dto: CreateWorkshopItemDto) {
    if (dto.previewMediaId) {
      const media = await this.prisma.mediaAsset.findUnique({ where: { id: dto.previewMediaId } });
      if (!media || media.ownerId !== userId) throw new ForbiddenException('Превью должно быть загружено этим аккаунтом');
    }
    return this.prisma.workshopItem.create({ data: {
      authorId: userId, type: dto.type, title: dto.title.trim(), description: dto.description.trim(), previewMediaId: dto.previewMediaId,
    } });
  }

  async toggleLike(userId: string, itemId: string) {
    const item = await this.prisma.workshopItem.findUnique({ where: { id: itemId } });
    if (!item || item.status !== WorkshopItemStatus.PUBLISHED) throw new NotFoundException('Работа не найдена');
    const existing = await this.prisma.workshopLike.findUnique({ where: { itemId_userId: { itemId, userId } } });
    if (existing) { await this.prisma.workshopLike.delete({ where: { itemId_userId: { itemId, userId } } }); return { liked: false }; }
    await this.prisma.workshopLike.create({ data: { itemId, userId } });
    return { liked: true };
  }

  async review(actor: User, itemId: string, status: WorkshopItemStatus, note: string) {
    if (status !== WorkshopItemStatus.PUBLISHED && status !== WorkshopItemStatus.REJECTED) throw new BadRequestException('Недопустимый статус');
    const item = await this.prisma.workshopItem.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Работа не найдена');
    await this.prisma.$transaction([
      this.prisma.workshopItem.update({ where: { id: itemId }, data: { status, resolutionNote: note.trim(), reviewedById: actor.id } }),
      this.prisma.auditLog.create({ data: { actorId: actor.id, action: 'workshop.review', entityType: 'WorkshopItem', entityId: itemId, metadata: { status, note } } }),
    ]);
    return { ok: true };
  }
}
