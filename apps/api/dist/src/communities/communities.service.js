var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CommunityRoleType, GlobalRole } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { createSlug } from '../common/slug.js';
import { excerpt } from '../common/text.js';
import { expandCommunityIds } from '../common/community-tree.js';
let CommunitiesService = class CommunitiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId) {
        const recentSince = new Date(Date.now() - 7 * 86_400_000);
        const [communities, activityRows, recentRows] = await Promise.all([
            this.prisma.community.findMany({
                where: { status: 'ACTIVE' }, orderBy: [{ parentId: 'asc' }, { createdAt: 'asc' }],
                include: {
                    parent: true,
                    _count: { select: { subscriptions: true, publications: { where: { status: 'PUBLISHED' } }, children: true } },
                    subscriptions: { where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
                    roles: { where: { role: CommunityRoleType.CURATOR, endedAt: null }, take: 1, include: { user: true } },
                },
            }),
            this.prisma.publication.groupBy({ by: ['communityId'], where: { status: 'PUBLISHED' }, _max: { lastActivityAt: true } }),
            this.prisma.publication.groupBy({ by: ['communityId'], where: { status: 'PUBLISHED', createdAt: { gte: recentSince } }, _count: { _all: true } }),
        ]);
        const activityByCommunity = new Map(activityRows.map((row) => [row.communityId, row._max.lastActivityAt]));
        const recentByCommunity = new Map(recentRows.map((row) => [row.communityId, row._count._all]));
        const viewer = userId ? await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } }) : null;
        const managedCommunityIds = userId
            ? new Set((await this.prisma.communityRole.findMany({ where: { userId, endedAt: null }, select: { communityId: true } })).map((role) => role.communityId))
            : new Set();
        const isGlobalManager = viewer?.role === GlobalRole.ADMIN || viewer?.role === GlobalRole.OWNER;
        return communities.map((community) => ({
            id: community.id,
            slug: community.slug,
            name: community.name,
            description: community.description,
            shortDescription: community.shortDescription,
            avatarUrl: community.avatarUrl,
            coverUrl: community.coverUrl,
            accentColor: community.accentColor,
            parent: community.parent ? { slug: community.parent.slug, name: community.parent.name } : null,
            subscriberCount: community._count.subscriptions,
            publicationCount: community._count.publications,
            recentPublicationCount: recentByCommunity.get(community.id) ?? 0,
            lastActivityAt: activityByCommunity.get(community.id) ?? null,
            childCount: community._count.children,
            isSubscribed: community.subscriptions.length > 0,
            canManage: isGlobalManager || managedCommunityIds.has(community.id),
            notifyLevel: community.subscriptions[0]?.notifyLevel ?? null,
            curator: community.roles[0] ? { username: community.roles[0].user.username, displayName: community.roles[0].user.displayName, avatarUrl: community.roles[0].user.avatarUrl } : null,
        }));
    }
    async get(slug, userId) {
        const community = await this.prisma.community.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: { where: { status: 'ACTIVE' }, orderBy: { name: 'asc' }, include: { _count: { select: { subscriptions: true } } } },
                _count: { select: { subscriptions: true, publications: { where: { status: 'PUBLISHED' } } } },
                subscriptions: { where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
                roles: { where: { endedAt: null }, include: { user: true }, orderBy: { createdAt: 'asc' } },
            },
        });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        const nodes = await this.prisma.community.findMany({ where: { status: 'ACTIVE' }, select: { id: true, parentId: true } });
        const scopeIds = [...expandCommunityIds(nodes, [community.id])];
        const [publications, tagCounts, activePoll] = await Promise.all([
            this.prisma.publication.findMany({
                where: { status: 'PUBLISHED', communityId: { in: scopeIds } },
                orderBy: [{ pinnedUntil: 'desc' }, { lastActivityAt: 'desc' }],
                take: 100,
                include: {
                    community: true,
                    author: true,
                    tags: { include: { tag: true } },
                    _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } },
                },
            }),
            this.prisma.publicationTag.groupBy({
                by: ['tagId'],
                where: { publication: { communityId: { in: scopeIds }, status: 'PUBLISHED' } },
                _count: { _all: true },
                orderBy: { _count: { tagId: 'desc' } },
                take: 6,
            }),
            this.prisma.communityPoll.findFirst({
                where: { communityId: community.id, status: 'OPEN', closesAt: { gt: new Date() } },
                orderBy: { createdAt: 'desc' },
                include: { options: { include: { _count: { select: { votes: true } } } } },
            }),
        ]);
        const tagIds = tagCounts.map((item) => item.tagId);
        const tags = tagIds.length ? await this.prisma.tag.findMany({ where: { id: { in: tagIds } } }) : [];
        const tagById = new Map(tags.map((tag) => [tag.id, tag]));
        let canManage = false;
        if (userId) {
            const viewer = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
            if (viewer && (viewer.role === GlobalRole.ADMIN || viewer.role === GlobalRole.OWNER))
                canManage = true;
            else {
                const allNodes = await this.prisma.community.findMany({ select: { id: true, parentId: true } });
                const parentById = new Map(allNodes.map((item) => [item.id, item.parentId]));
                const roleScope = [community.id];
                let parentId = community.parentId;
                let guard = 0;
                while (parentId && guard < 20) {
                    roleScope.push(parentId);
                    parentId = parentById.get(parentId) ?? null;
                    guard += 1;
                }
                canManage = Boolean(await this.prisma.communityRole.findFirst({ where: { userId, communityId: { in: roleScope }, endedAt: null } }));
            }
        }
        return {
            id: community.id,
            slug: community.slug,
            name: community.name,
            description: community.description,
            shortDescription: community.shortDescription,
            avatarUrl: community.avatarUrl,
            coverUrl: community.coverUrl,
            accentColor: community.accentColor,
            parent: community.parent ? { slug: community.parent.slug, name: community.parent.name } : null,
            subscriberCount: community._count.subscriptions,
            ownPublicationCount: community._count.publications,
            publicationCount: publications.length,
            isSubscribed: community.subscriptions.length > 0,
            canManage,
            notifyLevel: community.subscriptions[0]?.notifyLevel ?? null,
            children: community.children.map((child) => ({ slug: child.slug, name: child.name, shortDescription: child.shortDescription, avatarUrl: child.avatarUrl, coverUrl: child.coverUrl, subscriberCount: child._count.subscriptions })),
            team: community.roles.map((role) => ({ role: role.role, user: { username: role.user.username, displayName: role.user.displayName, avatarUrl: role.user.avatarUrl } })),
            popularTags: tagCounts.flatMap((item) => {
                const tag = tagById.get(item.tagId);
                return tag ? [{ id: tag.id, slug: tag.slug, label: tag.label, publicationCount: item._count._all, styleEnabled: tag.styleEnabled, backgroundColor: tag.backgroundColor, textColor: tag.textColor, borderColor: tag.borderColor }] : [];
            }),
            activePoll: activePoll ? { id: activePoll.id, title: activePoll.title, closesAt: activePoll.closesAt, totalVotes: activePoll.options.reduce((sum, option) => sum + option._count.votes, 0) } : null,
            publications: publications.map((publication) => ({
                id: publication.id,
                slug: publication.slug,
                format: publication.format,
                type: publication.type,
                title: publication.title,
                excerpt: excerpt(publication.body),
                viewCount: publication.viewCount,
                createdAt: publication.createdAt,
                lastActivityAt: publication.lastActivityAt,
                pinnedUntil: publication.pinnedUntil,
                inheritedFromChild: publication.communityId !== community.id,
                author: { username: publication.author.username, displayName: publication.author.displayName, avatarUrl: publication.author.avatarUrl },
                community: { slug: publication.community.slug, name: publication.community.name, accentColor: publication.community.accentColor },
                commentCount: publication._count.comments,
                reactionCount: publication._count.reactions,
                bookmarkCount: publication._count.bookmarks,
                tags: publication.tags.map((item) => item.tag),
            })),
        };
    }
    async subscribe(slug, userId) {
        const community = await this.prisma.community.findUnique({ where: { slug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        const existing = await this.prisma.communitySubscription.findUnique({ where: { userId_communityId: { userId, communityId: community.id } } });
        if (!existing)
            await this.prisma.$transaction([
                this.prisma.communitySubscription.create({ data: { userId, communityId: community.id } }),
                this.prisma.auditLog.create({ data: { actorId: userId, action: 'community.subscribe', entityType: 'Community', entityId: community.id, metadata: { communitySlug: community.slug, communityName: community.name } } }),
            ]);
        return { ok: true };
    }
    async unsubscribe(slug, userId) {
        const community = await this.prisma.community.findUnique({ where: { slug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        const existing = await this.prisma.communitySubscription.findUnique({ where: { userId_communityId: { userId, communityId: community.id } } });
        if (existing)
            await this.prisma.$transaction([
                this.prisma.communitySubscription.delete({ where: { id: existing.id } }),
                this.prisma.auditLog.create({ data: { actorId: userId, action: 'community.unsubscribe', entityType: 'Community', entityId: community.id, metadata: { communitySlug: community.slug, communityName: community.name } } }),
            ]);
        return { ok: true };
    }
    async updateSubscription(slug, userId, notifyLevel) {
        const community = await this.prisma.community.findUnique({ where: { slug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        const subscription = await this.prisma.communitySubscription.findUnique({ where: { userId_communityId: { userId, communityId: community.id } } });
        if (!subscription)
            throw new NotFoundException('Сначала подпишитесь на сообщество');
        return this.prisma.communitySubscription.update({ where: { id: subscription.id }, data: { notifyLevel }, select: { notifyLevel: true } });
    }
    async create(dto, creatorId) {
        const slug = dto.slug?.trim() || createSlug(dto.name, 'community');
        const existing = await this.prisma.community.findUnique({ where: { slug } });
        if (existing)
            throw new ConflictException('Такой адрес сообщества уже занят');
        const parent = dto.parentSlug ? await this.prisma.community.findUnique({ where: { slug: dto.parentSlug } }) : null;
        if (dto.parentSlug && !parent)
            throw new NotFoundException('Родительское сообщество не найдено');
        const community = await this.prisma.$transaction(async (tx) => {
            const created = await tx.community.create({
                data: {
                    slug,
                    name: dto.name.trim(),
                    description: dto.description.trim(),
                    shortDescription: dto.shortDescription?.trim() || excerpt(dto.description, 160),
                    accentColor: dto.accentColor ?? '#3157D5',
                    parentId: parent?.id,
                    createdById: creatorId,
                },
            });
            await tx.communityRole.create({ data: { communityId: created.id, userId: creatorId, role: CommunityRoleType.CURATOR } });
            await tx.communitySubscription.create({ data: { communityId: created.id, userId: creatorId } });
            await tx.auditLog.create({ data: { actorId: creatorId, action: 'community.create', entityType: 'Community', entityId: created.id } });
            return created;
        });
        return { id: community.id, slug: community.slug };
    }
};
CommunitiesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CommunitiesService);
export { CommunitiesService };
//# sourceMappingURL=communities.service.js.map