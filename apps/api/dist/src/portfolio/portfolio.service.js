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
import { GlobalRole, PortfolioItemKind, PortfolioItemStatus, PublicationStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPortfolioPublic, normalizePortfolioLinks } from './rules.js';
const publicStatuses = [PortfolioItemStatus.ACTIVE, PortfolioItemStatus.COMPLETED];
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    map(item) {
        return {
            id: item.id, kind: item.kind, status: item.status, title: item.title, summary: item.summary, description: item.description,
            coverUrl: item.coverUrl, lookingForTeam: item.lookingForTeam, priceText: item.priceText, contactNote: item.contactNote,
            links: Array.isArray(item.links) ? item.links : [], createdAt: item.createdAt, updatedAt: item.updatedAt,
            owner: item.owner, community: item.community, publication: item.publication,
            interactionCount: item._count?.interactions ?? 0,
        };
    }
    async list(kindInput, ownerUsername) {
        const kind = kindInput && Object.values(PortfolioItemKind).includes(kindInput) ? kindInput : undefined;
        const items = await this.prisma.portfolioItem.findMany({
            where: { status: { in: publicStatuses }, kind, owner: ownerUsername ? { username: ownerUsername.toLowerCase() } : undefined },
            orderBy: [{ lookingForTeam: 'desc' }, { updatedAt: 'desc' }], take: 120,
            include: {
                owner: { select: { username: true, displayName: true, avatarUrl: true, forrumId: true } },
                community: { select: { slug: true, name: true, accentColor: true } },
                publication: { select: { slug: true, title: true } },
                _count: { select: { interactions: { where: { status: 'COMPLETED' } } } },
            },
        });
        return items.map((item) => this.map(item));
    }
    async mine(userId) {
        const items = await this.prisma.portfolioItem.findMany({
            where: { ownerId: userId }, orderBy: { updatedAt: 'desc' },
            include: { owner: { select: { username: true, displayName: true, avatarUrl: true, forrumId: true } }, community: { select: { slug: true, name: true, accentColor: true } }, publication: { select: { slug: true, title: true } }, _count: { select: { interactions: true } } },
        });
        return items.map((item) => this.map(item));
    }
    async get(id, viewerId) {
        const item = await this.prisma.portfolioItem.findUnique({
            where: { id },
            include: {
                owner: { select: { id: true, username: true, displayName: true, avatarUrl: true, forrumId: true, bio: true } },
                community: { select: { slug: true, name: true, accentColor: true } }, publication: { select: { slug: true, title: true } },
                interactions: { where: { status: 'COMPLETED' }, select: { id: true, completedAt: true } },
                _count: { select: { interactions: { where: { status: 'COMPLETED' } } } },
            },
        });
        if (!item || !isPortfolioPublic(item.status) && item.ownerId !== viewerId)
            throw new NotFoundException('Проект или услуга не найдены');
        return { ...this.map(item), isOwner: item.ownerId === viewerId };
    }
    async relations(ownerId, dto) {
        const community = dto.communitySlug ? await this.prisma.community.findUnique({ where: { slug: dto.communitySlug } }) : null;
        if (dto.communitySlug && (!community || community.status !== 'ACTIVE'))
            throw new BadRequestException('Сообщество недоступно');
        const publication = dto.publicationSlug ? await this.prisma.publication.findUnique({ where: { slug: dto.publicationSlug } }) : null;
        if (dto.publicationSlug && (!publication || publication.status !== PublicationStatus.PUBLISHED || publication.authorId !== ownerId))
            throw new BadRequestException('Можно привязать только свою опубликованную тему');
        return { community, publication };
    }
    async create(ownerId, dto) {
        if (dto.status === PortfolioItemStatus.ARCHIVED)
            throw new BadRequestException('Новый материал нельзя сразу архивировать');
        const { community, publication } = await this.relations(ownerId, dto);
        const item = await this.prisma.$transaction(async (tx) => {
            const created = await tx.portfolioItem.create({ data: {
                    ownerId, communityId: community?.id ?? publication?.communityId, publicationId: publication?.id,
                    kind: dto.kind, status: dto.status ?? PortfolioItemStatus.ACTIVE, title: dto.title.trim(), summary: dto.summary.trim(), description: dto.description.trim(),
                    coverUrl: dto.coverUrl?.trim() || null, lookingForTeam: dto.lookingForTeam ?? false, priceText: dto.priceText?.trim() || null,
                    contactNote: dto.contactNote?.trim() || null, links: normalizePortfolioLinks(dto.links ?? []),
                } });
            await tx.auditLog.create({ data: { actorId: ownerId, action: 'portfolio.create', entityType: 'PortfolioItem', entityId: created.id, metadata: { kind: created.kind, title: created.title } } });
            return created;
        });
        return { id: item.id };
    }
    async update(user, id, dto) {
        const item = await this.prisma.portfolioItem.findUnique({ where: { id } });
        if (!item)
            throw new NotFoundException('Материал портфолио не найден');
        if (item.ownerId !== user.id && user.role !== GlobalRole.ADMIN && user.role !== GlobalRole.OWNER)
            throw new ForbiddenException('Редактировать может только автор');
        const { community, publication } = await this.relations(item.ownerId, dto);
        await this.prisma.$transaction([
            this.prisma.portfolioItem.update({ where: { id }, data: {
                    communityId: community?.id ?? publication?.communityId ?? null, publicationId: publication?.id ?? null,
                    kind: dto.kind, status: dto.status ?? item.status, title: dto.title.trim(), summary: dto.summary.trim(), description: dto.description.trim(),
                    coverUrl: dto.coverUrl?.trim() || null, lookingForTeam: dto.lookingForTeam ?? false, priceText: dto.priceText?.trim() || null,
                    contactNote: dto.contactNote?.trim() || null, links: normalizePortfolioLinks(dto.links ?? []),
                } }),
            this.prisma.auditLog.create({ data: { actorId: user.id, action: 'portfolio.update', entityType: 'PortfolioItem', entityId: id, metadata: { title: dto.title.trim() } } }),
        ]);
        return { ok: true };
    }
    async archive(user, id) {
        const item = await this.prisma.portfolioItem.findUnique({ where: { id } });
        if (!item)
            throw new NotFoundException('Материал портфолио не найден');
        if (item.ownerId !== user.id && user.role !== GlobalRole.ADMIN && user.role !== GlobalRole.OWNER)
            throw new ForbiddenException('Архивировать может только автор');
        await this.prisma.$transaction([
            this.prisma.portfolioItem.update({ where: { id }, data: { status: PortfolioItemStatus.ARCHIVED } }),
            this.prisma.auditLog.create({ data: { actorId: user.id, action: 'portfolio.archive', entityType: 'PortfolioItem', entityId: id, metadata: { title: item.title } } }),
        ]);
        return { ok: true };
    }
};
PortfolioService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PortfolioService);
export { PortfolioService };
//# sourceMappingURL=portfolio.service.js.map