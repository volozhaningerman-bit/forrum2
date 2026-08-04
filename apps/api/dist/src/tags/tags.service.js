var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { excerpt } from '../common/text.js';
import { normalizeTag } from '../common/slug.js';
const emptyViewerId = '00000000-0000-0000-0000-000000000000';
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async subscriptions(userId) {
        const rows = await this.prisma.tagSubscription.findMany({
            where: { userId }, orderBy: { createdAt: 'desc' },
            include: { tag: { include: { _count: { select: { publications: { where: { publication: { status: 'PUBLISHED' } } }, subscribers: true } } } } },
        });
        return rows.map((row) => ({
            id: row.tag.id, slug: row.tag.slug, label: row.tag.label,
            styleEnabled: row.tag.styleEnabled, backgroundColor: row.tag.backgroundColor,
            textColor: row.tag.textColor, borderColor: row.tag.borderColor,
            publicationCount: row.tag._count.publications, subscriberCount: row.tag._count.subscribers,
            subscribedAt: row.createdAt,
        }));
    }
    async get(slugInput, userId) {
        const slug = normalizeTag(slugInput);
        const tag = await this.prisma.tag.findUnique({
            where: { slug },
            include: {
                _count: { select: { publications: { where: { publication: { status: 'PUBLISHED' } } }, subscribers: true } },
                subscribers: { where: { userId: userId ?? emptyViewerId }, take: 1 },
            },
        });
        if (!tag)
            throw new NotFoundException('Хэштег не найден');
        const publications = await this.prisma.publication.findMany({
            where: { status: 'PUBLISHED', tags: { some: { tagId: tag.id } } },
            orderBy: [{ pinnedUntil: 'desc' }, { lastActivityAt: 'desc' }], take: 100,
            include: {
                author: true, community: true, tags: { include: { tag: true } },
                _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } },
            },
        });
        return {
            id: tag.id, slug: tag.slug, label: tag.label,
            styleEnabled: tag.styleEnabled, backgroundColor: tag.backgroundColor,
            textColor: tag.textColor, borderColor: tag.borderColor,
            publicationCount: tag._count.publications, subscriberCount: tag._count.subscribers,
            isSubscribed: tag.subscribers.length > 0,
            publications: publications.map((publication) => ({
                id: publication.id, slug: publication.slug, format: publication.format, type: publication.type,
                title: publication.title, excerpt: excerpt(publication.body), viewCount: publication.viewCount,
                createdAt: publication.createdAt, lastActivityAt: publication.lastActivityAt, pinnedUntil: publication.pinnedUntil,
                author: { username: publication.author.username, displayName: publication.author.displayName, avatarUrl: publication.author.avatarUrl },
                community: { slug: publication.community.slug, name: publication.community.name, accentColor: publication.community.accentColor },
                commentCount: publication._count.comments, reactionCount: publication._count.reactions,
                bookmarkCount: publication._count.bookmarks, tags: publication.tags.map((item) => item.tag),
            })),
        };
    }
    async subscribe(slugInput, userId) {
        const tag = await this.prisma.tag.findUnique({ where: { slug: normalizeTag(slugInput) } });
        if (!tag)
            throw new NotFoundException('Хэштег не найден');
        const existing = await this.prisma.tagSubscription.findUnique({ where: { userId_tagId: { userId, tagId: tag.id } } });
        if (!existing)
            await this.prisma.$transaction([
                this.prisma.tagSubscription.create({ data: { userId, tagId: tag.id } }),
                this.prisma.auditLog.create({ data: { actorId: userId, action: 'tag.subscribe', entityType: 'Tag', entityId: tag.id, metadata: { slug: tag.slug, label: tag.label } } }),
            ]);
        return { ok: true };
    }
    async unsubscribe(slugInput, userId) {
        const tag = await this.prisma.tag.findUnique({ where: { slug: normalizeTag(slugInput) } });
        if (!tag)
            throw new NotFoundException('Хэштег не найден');
        const existing = await this.prisma.tagSubscription.findUnique({ where: { userId_tagId: { userId, tagId: tag.id } } });
        if (existing)
            await this.prisma.$transaction([
                this.prisma.tagSubscription.delete({ where: { userId_tagId: { userId, tagId: tag.id } } }),
                this.prisma.auditLog.create({ data: { actorId: userId, action: 'tag.unsubscribe', entityType: 'Tag', entityId: tag.id, metadata: { slug: tag.slug, label: tag.label } } }),
            ]);
        return { ok: true };
    }
};
TagsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TagsService);
export { TagsService };
//# sourceMappingURL=tags.service.js.map