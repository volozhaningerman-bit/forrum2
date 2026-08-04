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
import { GlobalRole, NotificationType, PublicationFormat, PublicationStatus, PublicationType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { createSlug, normalizeTag } from '../common/slug.js';
import { excerpt } from '../common/text.js';
const publicationInclude = {
    author: true,
    community: { include: { _count: { select: { subscriptions: true } } } },
    tags: { include: { tag: true } },
    _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } },
};
let PublicationsService = class PublicationsService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    card(publication, viewer) {
        return {
            id: publication.id,
            slug: publication.slug,
            format: publication.format,
            type: publication.type,
            title: publication.title,
            excerpt: excerpt(publication.body),
            viewCount: publication.viewCount,
            createdAt: publication.createdAt,
            updatedAt: publication.updatedAt,
            lastActivityAt: publication.lastActivityAt,
            pinnedUntil: publication.pinnedUntil,
            author: {
                username: publication.author.username,
                displayName: publication.author.displayName,
                avatarUrl: publication.author.avatarUrl,
                forrumId: publication.author.forrumId,
                bio: publication.author.bio,
                emailVerified: Boolean(publication.author.emailVerifiedAt),
                createdAt: publication.author.createdAt,
            },
            community: {
                slug: publication.community.slug,
                name: publication.community.name,
                accentColor: publication.community.accentColor,
                subscriberCount: publication.community._count.subscriptions,
            },
            commentCount: publication._count.comments,
            reactionCount: publication._count.reactions,
            bookmarkCount: publication._count.bookmarks,
            tags: publication.tags.map((item) => item.tag),
            viewerReaction: viewer?.reaction ?? null,
            isBookmarked: viewer?.bookmarked ?? false,
        };
    }
    async listNews() {
        const publications = await this.prisma.publication.findMany({
            where: { status: PublicationStatus.PUBLISHED, type: PublicationType.NEWS },
            orderBy: [{ pinnedUntil: 'desc' }, { createdAt: 'desc' }], take: 100, include: publicationInclude,
        });
        return publications.map((publication) => this.card(publication));
    }
    async listAnnouncements() {
        const publications = await this.prisma.publication.findMany({
            where: { status: PublicationStatus.PUBLISHED, type: PublicationType.ANNOUNCEMENT },
            orderBy: [{ pinnedUntil: 'desc' }, { createdAt: 'desc' }], take: 100, include: publicationInclude,
        });
        return publications.map((publication) => this.card(publication));
    }
    async create(communitySlug, userId, dto) {
        const community = await this.prisma.community.findUnique({ where: { slug: communitySlug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        if (dto.format === PublicationFormat.TOPIC && !dto.title?.trim()) {
            throw new BadRequestException('Для постоянной темы нужен заголовок');
        }
        const title = dto.title?.trim() || null;
        const rawTags = [...new Set((dto.tags ?? []).map(normalizeTag).filter(Boolean))].slice(0, 5);
        const publication = await this.prisma.$transaction(async (tx) => {
            const created = await tx.publication.create({
                data: {
                    communityId: community.id,
                    authorId: userId,
                    format: dto.format,
                    type: dto.type,
                    title,
                    body: dto.body.trim(),
                    slug: createSlug(title || excerpt(dto.body, 50), dto.format === PublicationFormat.TOPIC ? 'topic' : 'post'),
                },
            });
            for (const tagSlug of rawTags) {
                const tag = await tx.tag.upsert({
                    where: { slug: tagSlug },
                    update: {},
                    create: { slug: tagSlug, label: tagSlug },
                });
                await tx.publicationTag.create({ data: { publicationId: created.id, tagId: tag.id } });
            }
            await tx.auditLog.create({ data: { actorId: userId, action: 'publication.create', entityType: 'Publication', entityId: created.id, metadata: { slug: created.slug, title: title || excerpt(dto.body, 90), communitySlug: community.slug, communityName: community.name } } });
            return created;
        });
        if (dto.type === PublicationType.NEWS) {
            void this.notifications.deliverToCommunitySubscribers({
                communityId: community.id,
                importance: 'ALL',
                title: `Новая публикация в ${community.name}`,
                body: title || excerpt(dto.body, 140),
                href: `/p/${publication.slug}`,
                actorId: userId,
                publicationId: publication.id,
            }).catch(() => undefined);
        }
        return { id: publication.id, slug: publication.slug };
    }
    async saved(userId) {
        const rows = await this.prisma.bookmark.findMany({
            where: { userId, publication: { status: PublicationStatus.PUBLISHED } },
            orderBy: { createdAt: 'desc' },
            include: { publication: { include: publicationInclude } },
        });
        return rows.map((row) => ({ ...this.card(row.publication, { bookmarked: true }), savedAt: row.createdAt }));
    }
    async get(slug, viewer, trackView = true) {
        const viewerId = viewer?.id;
        const publication = await this.prisma.publication.findUnique({
            where: { slug },
            include: {
                ...publicationInclude,
                comments: {
                    where: { hiddenAt: null },
                    orderBy: { createdAt: 'asc' },
                    include: {
                        author: true,
                        _count: { select: { reactions: true, replies: true } },
                        reactions: { where: { userId: viewerId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
                    },
                },
                reactions: { where: { userId: viewerId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
                bookmarks: { where: { userId: viewerId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
            },
        });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED)
            throw new NotFoundException('Публикация не найдена');
        let displayedViewCount = publication.viewCount;
        if (trackView) {
            const tracked = await this.prisma.publication.update({ where: { id: publication.id }, data: { viewCount: { increment: 1 } } }).then(() => true).catch(() => false);
            if (tracked)
                displayedViewCount += 1;
        }
        const card = this.card(publication, { reaction: publication.reactions[0]?.type, bookmarked: publication.bookmarks.length > 0 });
        return {
            ...card,
            viewCount: displayedViewCount,
            body: publication.body,
            canEdit: Boolean(viewer && (viewer.id === publication.authorId || viewer.role === GlobalRole.ADMIN || viewer.role === GlobalRole.OWNER)),
            canDelete: Boolean(viewer && (viewer.id === publication.authorId || viewer.role === GlobalRole.ADMIN || viewer.role === GlobalRole.OWNER)),
            comments: publication.comments.map((comment) => ({
                id: comment.id,
                body: comment.body,
                parentId: comment.parentId,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                author: {
                    username: comment.author.username,
                    displayName: comment.author.displayName,
                    avatarUrl: comment.author.avatarUrl,
                    forrumId: comment.author.forrumId,
                    emailVerified: Boolean(comment.author.emailVerifiedAt),
                },
                reactionCount: comment._count.reactions,
                replyCount: comment._count.replies,
                viewerReaction: comment.reactions[0]?.type ?? null,
            })),
        };
    }
    canManage(publication, user) {
        return publication.authorId === user.id || user.role === GlobalRole.ADMIN || user.role === GlobalRole.OWNER;
    }
    async update(slug, user, dto) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED)
            throw new NotFoundException('Публикация не найдена');
        if (!this.canManage(publication, user))
            throw new ForbiddenException('Редактировать публикацию может только автор или администрация');
        const title = dto.title?.trim();
        if (publication.format === PublicationFormat.TOPIC && dto.title !== undefined && !title) {
            throw new BadRequestException('Для постоянной темы нужен заголовок');
        }
        const rawTags = dto.tags === undefined ? null : [...new Set(dto.tags.map(normalizeTag).filter(Boolean))].slice(0, 5);
        await this.prisma.$transaction(async (tx) => {
            await tx.publication.update({
                where: { id: publication.id },
                data: {
                    type: dto.type,
                    title: dto.title === undefined ? undefined : title || null,
                    body: dto.body === undefined ? undefined : dto.body.trim(),
                    lastActivityAt: new Date(),
                },
            });
            if (rawTags) {
                await tx.publicationTag.deleteMany({ where: { publicationId: publication.id } });
                for (const tagSlug of rawTags) {
                    const tag = await tx.tag.upsert({ where: { slug: tagSlug }, update: {}, create: { slug: tagSlug, label: tagSlug } });
                    await tx.publicationTag.create({ data: { publicationId: publication.id, tagId: tag.id } });
                }
            }
            await tx.auditLog.create({ data: { actorId: user.id, action: 'publication.update', entityType: 'Publication', entityId: publication.id, metadata: { slug: publication.slug, title: title || publication.title || excerpt(dto.body || publication.body, 90) } } });
        });
        return { ok: true, slug: publication.slug };
    }
    async remove(slug, user) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED)
            throw new NotFoundException('Публикация не найдена');
        if (!this.canManage(publication, user))
            throw new ForbiddenException('Удалить публикацию может только автор или администрация');
        await this.prisma.$transaction(async (tx) => {
            await tx.publication.update({ where: { id: publication.id }, data: { status: PublicationStatus.DELETED } });
            await tx.auditLog.create({ data: { actorId: user.id, action: 'publication.delete', entityType: 'Publication', entityId: publication.id, metadata: { slug: publication.slug, title: publication.title || excerpt(publication.body, 90) } } });
        });
        return { ok: true, communitySlug: (await this.prisma.community.findUnique({ where: { id: publication.communityId }, select: { slug: true } }))?.slug };
    }
    async comment(slug, userId, dto) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED)
            throw new NotFoundException('Публикация не найдена');
        let parent = null;
        if (dto.parentId) {
            parent = await this.prisma.comment.findFirst({ where: { id: dto.parentId, publicationId: publication.id, hiddenAt: null }, select: { id: true, authorId: true } });
            if (!parent)
                throw new BadRequestException('Ответ, на который вы отвечаете, не найден');
        }
        const comment = await this.prisma.$transaction(async (tx) => {
            const created = await tx.comment.create({
                data: { publicationId: publication.id, authorId: userId, body: dto.body.trim(), parentId: parent?.id },
            });
            await tx.publication.update({ where: { id: publication.id }, data: { lastActivityAt: new Date() } });
            await tx.auditLog.create({ data: { actorId: userId, action: 'publication.comment', entityType: 'Comment', entityId: created.id, metadata: { slug: publication.slug, title: publication.title || excerpt(publication.body, 90) } } });
            const targetUserId = parent?.authorId && parent.authorId !== userId ? parent.authorId : publication.authorId !== userId ? publication.authorId : null;
            if (targetUserId) {
                await this.notifications.deliver({
                    userId: targetUserId,
                    actorId: userId,
                    publicationId: publication.id,
                    commentId: created.id,
                    type: parent ? NotificationType.COMMENT_REPLY : NotificationType.PUBLICATION_REPLY,
                    title: parent ? 'Ответ на ваш комментарий' : 'Новый ответ в вашей публикации',
                    body: publication.title || excerpt(publication.body, 90),
                    href: `/p/${publication.slug}#comment-${created.id}`,
                }, tx);
            }
            return created;
        });
        return { id: comment.id };
    }
    async react(slug, userId, type) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication)
            throw new NotFoundException('Публикация не найдена');
        const existing = await this.prisma.publicationReaction.findUnique({ where: { userId_publicationId: { userId, publicationId: publication.id } } });
        if (existing?.type === type) {
            await this.prisma.publicationReaction.delete({ where: { id: existing.id } });
            return { active: false, type: null };
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.publicationReaction.upsert({
                where: { userId_publicationId: { userId, publicationId: publication.id } },
                update: { type }, create: { userId, publicationId: publication.id, type },
            });
            if (publication.authorId !== userId && !existing) {
                await this.notifications.deliver({
                    userId: publication.authorId, actorId: userId, publicationId: publication.id,
                    type: NotificationType.REACTION, title: 'Новая реакция',
                    body: publication.title || excerpt(publication.body, 90), href: `/p/${publication.slug}`,
                }, tx);
            }
        });
        return { active: true, type };
    }
    async reactComment(commentId, userId, type) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId }, include: { publication: true } });
        if (!comment || comment.hiddenAt)
            throw new NotFoundException('Комментарий не найден');
        const existing = await this.prisma.commentReaction.findUnique({ where: { userId_commentId: { userId, commentId } } });
        if (existing?.type === type) {
            await this.prisma.commentReaction.delete({ where: { id: existing.id } });
            return { active: false, type: null };
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.commentReaction.upsert({
                where: { userId_commentId: { userId, commentId } }, update: { type }, create: { userId, commentId, type },
            });
            if (comment.authorId !== userId && !existing) {
                await this.notifications.deliver({
                    userId: comment.authorId, actorId: userId, publicationId: comment.publicationId, commentId,
                    type: NotificationType.REACTION, title: 'Новая реакция на комментарий',
                    body: excerpt(comment.body, 90), href: `/p/${comment.publication.slug}#comment-${comment.id}`,
                }, tx);
            }
        });
        return { active: true, type };
    }
    async toggleBookmark(slug, userId) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication)
            throw new NotFoundException('Публикация не найдена');
        const metadata = { slug: publication.slug, title: publication.title || excerpt(publication.body, 90) };
        const existing = await this.prisma.bookmark.findUnique({ where: { userId_publicationId: { userId, publicationId: publication.id } } });
        if (existing) {
            await this.prisma.$transaction([
                this.prisma.bookmark.delete({ where: { userId_publicationId: { userId, publicationId: publication.id } } }),
                this.prisma.auditLog.create({ data: { actorId: userId, action: 'publication.unbookmark', entityType: 'Publication', entityId: publication.id, metadata } }),
            ]);
            return { bookmarked: false };
        }
        await this.prisma.$transaction([
            this.prisma.bookmark.create({ data: { userId, publicationId: publication.id } }),
            this.prisma.auditLog.create({ data: { actorId: userId, action: 'publication.bookmark', entityType: 'Publication', entityId: publication.id, metadata } }),
        ]);
        return { bookmarked: true };
    }
    async reportComment(commentId, userId, dto) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment || comment.hiddenAt)
            throw new NotFoundException('Комментарий не найден');
        const report = await this.prisma.report.create({
            data: {
                authorId: userId, commentId: comment.id, publicationId: comment.publicationId,
                reason: dto.reason.trim(), details: dto.details?.trim() || null,
            },
        });
        return { id: report.id };
    }
    async report(slug, userId, dto) {
        const publication = await this.prisma.publication.findUnique({ where: { slug } });
        if (!publication)
            throw new NotFoundException('Публикация не найдена');
        const report = await this.prisma.report.create({
            data: { authorId: userId, publicationId: publication.id, reason: dto.reason.trim(), details: dto.details?.trim() || null },
        });
        return { id: report.id };
    }
};
PublicationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, NotificationsService])
], PublicationsService);
export { PublicationsService };
//# sourceMappingURL=publications.service.js.map