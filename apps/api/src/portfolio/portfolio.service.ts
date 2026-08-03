import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { GlobalRole, PortfolioItemKind, PortfolioItemStatus, PublicationStatus, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto.js';
import { isPortfolioPublic, normalizePortfolioLinks } from './rules.js';

const publicStatuses = [PortfolioItemStatus.ACTIVE, PortfolioItemStatus.COMPLETED];

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  private map(item: any) {
    return {
      id: item.id, kind: item.kind, status: item.status, title: item.title, summary: item.summary, description: item.description,
      coverUrl: item.coverUrl, lookingForTeam: item.lookingForTeam, priceText: item.priceText, contactNote: item.contactNote,
      links: Array.isArray(item.links) ? item.links : [], createdAt: item.createdAt, updatedAt: item.updatedAt,
      owner: item.owner, community: item.community, publication: item.publication,
      interactionCount: item._count?.interactions ?? 0,
    };
  }

  async list(kindInput?: string, ownerUsername?: string) {
    const kind = kindInput && Object.values(PortfolioItemKind).includes(kindInput as PortfolioItemKind) ? kindInput as PortfolioItemKind : undefined;
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

  async mine(userId: string) {
    const items = await this.prisma.portfolioItem.findMany({
      where: { ownerId: userId }, orderBy: { updatedAt: 'desc' },
      include: { owner: { select: { username: true, displayName: true, avatarUrl: true, forrumId: true } }, community: { select: { slug: true, name: true, accentColor: true } }, publication: { select: { slug: true, title: true } }, _count: { select: { interactions: true } } },
    });
    return items.map((item) => this.map(item));
  }

  async get(id: string, viewerId?: string) {
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, username: true, displayName: true, avatarUrl: true, forrumId: true, bio: true } },
        community: { select: { slug: true, name: true, accentColor: true } }, publication: { select: { slug: true, title: true } },
        interactions: { where: { status: 'COMPLETED' }, select: { id: true, completedAt: true } },
        _count: { select: { interactions: { where: { status: 'COMPLETED' } } } },
      },
    });
    if (!item || !isPortfolioPublic(item.status) && item.ownerId !== viewerId) throw new NotFoundException('Проект или услуга не найдены');
    return { ...this.map(item), isOwner: item.ownerId === viewerId };
  }

  private async relations(ownerId: string, dto: CreatePortfolioItemDto) {
    const community = dto.communitySlug ? await this.prisma.community.findUnique({ where: { slug: dto.communitySlug } }) : null;
    if (dto.communitySlug && (!community || community.status !== 'ACTIVE')) throw new BadRequestException('Сообщество недоступно');
    const publication = dto.publicationSlug ? await this.prisma.publication.findUnique({ where: { slug: dto.publicationSlug } }) : null;
    if (dto.publicationSlug && (!publication || publication.status !== PublicationStatus.PUBLISHED || publication.authorId !== ownerId)) throw new BadRequestException('Можно привязать только свою опубликованную тему');
    return { community, publication };
  }

  async create(ownerId: string, dto: CreatePortfolioItemDto) {
    if (dto.status === PortfolioItemStatus.ARCHIVED) throw new BadRequestException('Новый материал нельзя сразу архивировать');
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

  async update(user: User, id: string, dto: UpdatePortfolioItemDto) {
    const item = await this.prisma.portfolioItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Материал портфолио не найден');
    if (item.ownerId !== user.id && ![GlobalRole.ADMIN, GlobalRole.OWNER].includes(user.role)) throw new ForbiddenException('Редактировать может только автор');
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

  async archive(user: User, id: string) {
    const item = await this.prisma.portfolioItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Материал портфолио не найден');
    if (item.ownerId !== user.id && ![GlobalRole.ADMIN, GlobalRole.OWNER].includes(user.role)) throw new ForbiddenException('Архивировать может только автор');
    await this.prisma.$transaction([
      this.prisma.portfolioItem.update({ where: { id }, data: { status: PortfolioItemStatus.ARCHIVED } }),
      this.prisma.auditLog.create({ data: { actorId: user.id, action: 'portfolio.archive', entityType: 'PortfolioItem', entityId: id, metadata: { title: item.title } } }),
    ]);
    return { ok: true };
  }
}
