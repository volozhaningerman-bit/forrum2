import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { excerpt } from '../common/text.js';
import { normalizeTag } from '../common/slug.js';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(rawQuery: string) {
    const q = rawQuery.trim();
    if (q.length < 2) return { query: q, publications: [], communities: [], users: [], tags: [] };
    const hashtag = q.startsWith('#') ? normalizeTag(q) : null;
    const [publications, communities, users, tags] = await Promise.all([
      this.prisma.publication.findMany({
        where: hashtag ? {
          status: 'PUBLISHED', tags: { some: { tag: { slug: hashtag } } },
        } : {
          status: 'PUBLISHED', OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { body: { contains: q, mode: 'insensitive' } },
            { tags: { some: { tag: { OR: [{ slug: { contains: normalizeTag(q) } }, { label: { contains: q, mode: 'insensitive' } }] } } } },
          ],
        },
        orderBy: [{ pinnedUntil: 'desc' }, { lastActivityAt: 'desc' }], take: 50,
        include: { author: true, community: true, tags: { include: { tag: true } }, _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } } },
      }),
      this.prisma.community.findMany({
        where: { status: 'ACTIVE', OR: [{ name: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] },
        take: 12, include: { _count: { select: { subscriptions: true } } },
      }),
      this.prisma.user.findMany({
        where: { OR: [{ username: { contains: q.toLowerCase() } }, { displayName: { contains: q, mode: 'insensitive' } }, { bio: { contains: q, mode: 'insensitive' } }] },
        take: 12, include: { _count: { select: { followers: true, publications: { where: { status: 'PUBLISHED' } } } } },
      }),
      this.prisma.tag.findMany({
        where: { OR: [{ slug: { contains: normalizeTag(q) } }, { label: { contains: q.replace(/^#/, ''), mode: 'insensitive' } }] },
        take: 20, include: { _count: { select: { publications: { where: { publication: { status: 'PUBLISHED' } } }, subscribers: true } } },
      }),
    ]);
    return {
      query: q,
      publications: publications.map((publication) => ({
        id: publication.id, slug: publication.slug, format: publication.format, type: publication.type, title: publication.title,
        excerpt: excerpt(publication.body), viewCount: publication.viewCount, createdAt: publication.createdAt,
        lastActivityAt: publication.lastActivityAt, pinnedUntil: publication.pinnedUntil,
        author: { username: publication.author.username, displayName: publication.author.displayName, avatarUrl: publication.author.avatarUrl },
        community: { slug: publication.community.slug, name: publication.community.name, accentColor: publication.community.accentColor },
        commentCount: publication._count.comments, reactionCount: publication._count.reactions, bookmarkCount: publication._count.bookmarks,
        tags: publication.tags.map((item) => item.tag),
      })),
      communities: communities.map((community) => ({ slug: community.slug, name: community.name, description: excerpt(community.description, 160), accentColor: community.accentColor, subscriberCount: community._count.subscriptions })),
      users: users.map((user) => ({ username: user.username, displayName: user.displayName, avatarUrl: user.avatarUrl, bio: user.bio, forrumId: user.forrumId, followerCount: user._count.followers, publicationCount: user._count.publications })),
      tags: tags.map((tag) => ({ ...tag, publicationCount: tag._count.publications, subscriberCount: tag._count.subscribers })),
    };
  }
}
