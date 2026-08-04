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
import { CommunityContentActionType, CommunityRoleType, CommunityStructureStatus, GlobalRole, PublicationFormat, PublicationStatus, PublicationType, TeamInviteStatus, } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { createSlug } from '../common/slug.js';
const DAY = 86_400_000;
const teamRoles = [CommunityRoleType.CURATOR, CommunityRoleType.ASSISTANT, CommunityRoleType.MODERATOR];
let CommunityManagementService = class CommunityManagementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async community(slug) {
        const community = await this.prisma.community.findUnique({ where: { slug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        return community;
    }
    async ancestorIds(communityId) {
        const ids = [communityId];
        let current = await this.prisma.community.findUnique({ where: { id: communityId }, select: { parentId: true } });
        let guard = 0;
        while (current?.parentId && guard < 20) {
            ids.push(current.parentId);
            current = await this.prisma.community.findUnique({ where: { id: current.parentId }, select: { parentId: true } });
            guard += 1;
        }
        return ids;
    }
    async permission(user, communityId) {
        if (user.role === GlobalRole.OWNER || user.role === GlobalRole.ADMIN)
            return { level: 'ADMIN', role: null };
        const scopeIds = await this.ancestorIds(communityId);
        const role = await this.prisma.communityRole.findFirst({
            where: { userId: user.id, communityId: { in: scopeIds }, endedAt: null, role: { in: teamRoles } },
            orderBy: { createdAt: 'asc' },
        });
        if (!role)
            throw new ForbiddenException('Кабинет доступен только действующей команде сообщества');
        return { level: role.role === CommunityRoleType.CURATOR ? 'CURATOR' : role.role === CommunityRoleType.ASSISTANT ? 'ASSISTANT' : 'MODERATOR', role };
    }
    requireLeadership(level) {
        if (!['ADMIN', 'CURATOR', 'ASSISTANT'].includes(level))
            throw new ForbiddenException('Для этого действия нужны полномочия куратора или помощника');
    }
    requireCurator(level) {
        if (!['ADMIN', 'CURATOR'].includes(level))
            throw new ForbiddenException('Для этого действия нужны полномочия куратора');
    }
    async dashboard(user, slug) {
        const community = await this.community(slug);
        const access = await this.permission(user, community.id);
        const now = new Date();
        const week = new Date(now.getTime() - 7 * DAY);
        const month = new Date(now.getTime() - 30 * DAY);
        const [publications7, publications30, comments7, comments30, openReports, unanswered, recentPublications, team, reports, proposals, invites, actions, subscriptions30, unsubscribeLogs] = await Promise.all([
            this.prisma.publication.count({ where: { communityId: community.id, status: PublicationStatus.PUBLISHED, createdAt: { gte: week } } }),
            this.prisma.publication.count({ where: { communityId: community.id, status: PublicationStatus.PUBLISHED, createdAt: { gte: month } } }),
            this.prisma.comment.count({ where: { publication: { communityId: community.id }, hiddenAt: null, createdAt: { gte: week } } }),
            this.prisma.comment.count({ where: { publication: { communityId: community.id }, hiddenAt: null, createdAt: { gte: month } } }),
            this.prisma.report.count({ where: { status: 'OPEN', OR: [{ publication: { communityId: community.id } }, { comment: { publication: { communityId: community.id } } }] } }),
            this.prisma.publication.findMany({
                where: { communityId: community.id, status: PublicationStatus.PUBLISHED, comments: { none: { hiddenAt: null } } },
                orderBy: { createdAt: 'desc' }, take: 8,
                select: { slug: true, title: true, body: true, createdAt: true, author: { select: { username: true, displayName: true } } },
            }),
            this.prisma.publication.findMany({
                where: { communityId: community.id, status: PublicationStatus.PUBLISHED },
                orderBy: { lastActivityAt: 'desc' }, take: 20,
                include: { author: { select: { username: true, displayName: true } }, _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } } },
            }),
            this.prisma.communityRole.findMany({ where: { communityId: community.id, endedAt: null }, include: { user: { select: { username: true, displayName: true, avatarUrl: true } } }, orderBy: { createdAt: 'asc' } }),
            this.prisma.communityReport.findMany({ where: { communityId: community.id }, include: { author: { select: { username: true, displayName: true } }, publication: { select: { slug: true } } }, orderBy: { periodEnd: 'desc' }, take: 12 }),
            this.prisma.communityStructureProposal.findMany({ where: { communityId: community.id }, include: { createdBy: { select: { username: true, displayName: true } }, targetCommunity: { select: { slug: true, name: true } } }, orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 30 }),
            this.prisma.communityRoleInvite.findMany({ where: { communityId: community.id }, include: { invitedUser: { select: { username: true, displayName: true } }, invitedBy: { select: { username: true, displayName: true } } }, orderBy: { createdAt: 'desc' }, take: 30 }),
            this.prisma.communityContentAction.findMany({ where: { communityId: community.id }, include: { actor: { select: { username: true, displayName: true } }, publication: { select: { slug: true, title: true } } }, orderBy: { createdAt: 'desc' }, take: 30 }),
            this.prisma.communitySubscription.count({ where: { communityId: community.id, createdAt: { gte: month } } }),
            this.prisma.auditLog.count({ where: { entityId: community.id, action: 'community.unsubscribe', createdAt: { gte: month } } }),
        ]);
        const responseRows = await this.prisma.publication.findMany({
            where: { communityId: community.id, status: PublicationStatus.PUBLISHED, createdAt: { gte: month }, comments: { some: { hiddenAt: null } } },
            select: { createdAt: true, comments: { where: { hiddenAt: null }, orderBy: { createdAt: 'asc' }, take: 1, select: { createdAt: true } } },
            take: 300,
        });
        const responseHours = responseRows.flatMap((row) => row.comments[0] ? [(row.comments[0].createdAt.getTime() - row.createdAt.getTime()) / 3_600_000] : []);
        const averageFirstResponseHours = responseHours.length ? Math.round(responseHours.reduce((sum, value) => sum + value, 0) / responseHours.length * 10) / 10 : null;
        return {
            access: access.level,
            community: { id: community.id, slug: community.slug, name: community.name, accentColor: community.accentColor },
            health: {
                publications7, publications30, comments7, comments30, openReports,
                unansweredCount: unanswered.length,
                averageFirstResponseHours,
                subscriberChange30: subscriptions30 - unsubscribeLogs,
            },
            unanswered: unanswered.map((item) => ({ ...item, excerpt: item.title || item.body.slice(0, 100), body: undefined })),
            publications: recentPublications.map((item) => ({
                slug: item.slug, title: item.title || item.body.slice(0, 100), createdAt: item.createdAt, lastActivityAt: item.lastActivityAt,
                pinnedUntil: item.pinnedUntil, isOfficial: item.isOfficial, isSolved: item.isSolved, closedAt: item.closedAt,
                author: item.author, commentCount: item._count.comments, reactionCount: item._count.reactions, bookmarkCount: item._count.bookmarks,
            })),
            team, reports, proposals, invites, actions,
        };
    }
    async createReport(user, slug, dto) {
        const community = await this.community(slug);
        const access = await this.permission(user, community.id);
        this.requireLeadership(access.level);
        const periodStart = new Date(dto.periodStart);
        const periodEnd = new Date(dto.periodEnd);
        if (periodEnd <= periodStart || periodEnd > new Date())
            throw new BadRequestException('Период отчёта указан неверно');
        if (periodEnd.getTime() - periodStart.getTime() > 100 * DAY)
            throw new BadRequestException('Один отчёт не должен охватывать больше 100 дней');
        const title = `Отчёт команды ${community.name}: ${periodStart.toLocaleDateString('ru-RU')} — ${periodEnd.toLocaleDateString('ru-RU')}`;
        const body = `[h2]Итоги периода[/h2]${dto.summary.trim()}\n\n[h3]Что сделано[/h3]${dto.achievements.trim()}\n\n[h3]Проблемы[/h3]${dto.problems.trim()}\n\n[h3]Что дальше[/h3]${dto.plans.trim()}${dto.treasuryNote?.trim() ? `\n\n[h3]Средства сообщества[/h3]${dto.treasuryNote.trim()}` : ''}`;
        return this.prisma.$transaction(async (tx) => {
            const publication = await tx.publication.create({ data: {
                    slug: createSlug(title, 'community-report'), format: PublicationFormat.TOPIC, type: PublicationType.ANNOUNCEMENT,
                    title, body, authorId: user.id, communityId: community.id, isOfficial: true,
                } });
            const report = await tx.communityReport.create({ data: {
                    communityId: community.id, authorId: user.id, publicationId: publication.id,
                    periodStart, periodEnd, summary: dto.summary.trim(), achievements: dto.achievements.trim(), problems: dto.problems.trim(), plans: dto.plans.trim(), treasuryNote: dto.treasuryNote?.trim() || null,
                } });
            await tx.auditLog.create({ data: { actorId: user.id, action: 'community.report.create', entityType: 'CommunityReport', entityId: report.id, metadata: { communitySlug: slug, publicationSlug: publication.slug } } });
            return { id: report.id, publicationSlug: publication.slug };
        });
    }
    async createStructureProposal(user, slug, dto) {
        const community = await this.community(slug);
        const access = await this.permission(user, community.id);
        this.requireLeadership(access.level);
        const target = dto.targetCommunitySlug ? await this.prisma.community.findUnique({ where: { slug: dto.targetCommunitySlug } }) : null;
        if (dto.targetCommunitySlug && !target)
            throw new NotFoundException('Целевое сообщество не найдено');
        return this.prisma.communityStructureProposal.create({ data: {
                communityId: community.id, targetCommunityId: target?.id, createdById: user.id, type: dto.type,
                title: dto.title.trim(), description: dto.description.trim(), proposedName: dto.proposedName?.trim() || null,
            } });
    }
    async resolveStructureProposal(user, slug, id, dto) {
        const community = await this.community(slug);
        const access = await this.permission(user, community.id);
        if (access.level !== 'ADMIN')
            throw new ForbiddenException('Структурные изменения утверждает центральная администрация');
        const proposal = await this.prisma.communityStructureProposal.findFirst({ where: { id, communityId: community.id, status: CommunityStructureStatus.OPEN } });
        if (!proposal)
            throw new NotFoundException('Открытое предложение не найдено');
        const status = dto.status === 'APPROVED' ? CommunityStructureStatus.APPROVED : CommunityStructureStatus.REJECTED;
        await this.prisma.$transaction([
            this.prisma.communityStructureProposal.update({ where: { id }, data: { status, resolutionNote: dto.note.trim(), resolvedById: user.id, resolvedAt: new Date() } }),
            this.prisma.auditLog.create({ data: { actorId: user.id, action: 'community.structure.resolve', entityType: 'CommunityStructureProposal', entityId: id, metadata: { status, note: dto.note.trim() } } }),
        ]);
        return { ok: true };
    }
    async invite(user, slug, dto) {
        const community = await this.community(slug);
        const access = await this.permission(user, community.id);
        this.requireCurator(access.level);
        if (dto.role === CommunityRoleType.CURATOR && access.level !== 'ADMIN')
            throw new ForbiddenException('Нового куратора назначает центральная администрация');
        const invitedUser = await this.prisma.user.findUnique({ where: { username: dto.username.trim().toLowerCase() } });
        if (!invitedUser)
            throw new NotFoundException('Пользователь не найден');
        if (invitedUser.id === user.id)
            throw new BadRequestException('Нельзя пригласить самого себя');
        const existingRole = await this.prisma.communityRole.findFirst({ where: { userId: invitedUser.id, communityId: community.id, role: dto.role, endedAt: null } });
        if (existingRole)
            throw new BadRequestException('У пользователя уже есть эта роль');
        const activeInvite = await this.prisma.communityRoleInvite.findFirst({ where: { invitedUserId: invitedUser.id, communityId: community.id, role: dto.role, status: TeamInviteStatus.PENDING, expiresAt: { gt: new Date() } } });
        if (activeInvite)
            throw new BadRequestException('Такое приглашение уже отправлено');
        return this.prisma.communityRoleInvite.create({ data: {
                communityId: community.id, invitedUserId: invitedUser.id, invitedById: user.id, role: dto.role,
                note: dto.note.trim(), expiresAt: new Date(Date.now() + 7 * DAY),
            } });
    }
    async invites(userId) {
        await this.prisma.communityRoleInvite.updateMany({ where: { invitedUserId: userId, status: TeamInviteStatus.PENDING, expiresAt: { lte: new Date() } }, data: { status: TeamInviteStatus.EXPIRED } });
        return this.prisma.communityRoleInvite.findMany({
            where: { invitedUserId: userId }, include: { community: { select: { slug: true, name: true, accentColor: true } }, invitedBy: { select: { username: true, displayName: true } } },
            orderBy: { createdAt: 'desc' }, take: 50,
        });
    }
    async respondInvite(userId, inviteId, status) {
        if (status !== TeamInviteStatus.ACCEPTED && status !== TeamInviteStatus.DECLINED)
            throw new BadRequestException('Недопустимый ответ');
        const invite = await this.prisma.communityRoleInvite.findFirst({ where: { id: inviteId, invitedUserId: userId, status: TeamInviteStatus.PENDING }, include: { community: true } });
        if (!invite)
            throw new NotFoundException('Активное приглашение не найдено');
        if (invite.expiresAt <= new Date()) {
            await this.prisma.communityRoleInvite.update({ where: { id: invite.id }, data: { status: TeamInviteStatus.EXPIRED, respondedAt: new Date() } });
            throw new BadRequestException('Срок приглашения истёк');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.communityRoleInvite.update({ where: { id: invite.id }, data: { status, respondedAt: new Date() } });
            if (status === TeamInviteStatus.ACCEPTED) {
                const existing = await tx.communityRole.findUnique({ where: { userId_communityId_role: { userId, communityId: invite.communityId, role: invite.role } } });
                const role = existing
                    ? await tx.communityRole.update({ where: { id: existing.id }, data: { endedAt: null, grantedById: invite.invitedById, note: invite.note } })
                    : await tx.communityRole.create({ data: { userId, communityId: invite.communityId, role: invite.role, grantedById: invite.invitedById, note: invite.note } });
                await tx.communityRoleEvent.create({ data: { roleId: role.id, userId, actorId: invite.invitedById, type: 'GRANTED', note: invite.note } });
            }
            await tx.auditLog.create({ data: { actorId: userId, action: `community.role-invite.${status.toLowerCase()}`, entityType: 'CommunityRoleInvite', entityId: invite.id, metadata: { communitySlug: invite.community.slug, role: invite.role } } });
        });
        return { ok: true };
    }
    async contentAction(user, slug, publicationSlug, dto) {
        const community = await this.community(slug);
        await this.permission(user, community.id);
        const publication = await this.prisma.publication.findUnique({ where: { slug: publicationSlug }, include: { community: true } });
        if (!publication || publication.status !== PublicationStatus.PUBLISHED || publication.communityId !== community.id)
            throw new NotFoundException('Публикация в этом сообществе не найдена');
        const now = new Date();
        let update = {};
        let metadata;
        switch (dto.action) {
            case CommunityContentActionType.PIN: {
                const days = dto.durationDays ?? 7;
                if (![1, 3, 7, 30].includes(days))
                    throw new BadRequestException('Закрепление доступно на 1, 3, 7 или 30 дней');
                update = { pinnedUntil: new Date(now.getTime() + days * DAY) };
                metadata = { days };
                break;
            }
            case CommunityContentActionType.UNPIN:
                update = { pinnedUntil: null };
                break;
            case CommunityContentActionType.CLOSE:
                update = { closedAt: now, closedReason: dto.note.trim() };
                break;
            case CommunityContentActionType.REOPEN:
                update = { closedAt: null, closedReason: null };
                break;
            case CommunityContentActionType.MARK_OFFICIAL:
                update = { isOfficial: true };
                break;
            case CommunityContentActionType.UNMARK_OFFICIAL:
                update = { isOfficial: false };
                break;
            case CommunityContentActionType.MARK_SOLVED:
                update = { isSolved: true };
                break;
            case CommunityContentActionType.UNMARK_SOLVED:
                update = { isSolved: false };
                break;
            case CommunityContentActionType.MOVE: {
                if (!dto.targetCommunitySlug)
                    throw new BadRequestException('Выберите целевое сообщество');
                const target = await this.community(dto.targetCommunitySlug);
                await this.permission(user, target.id);
                update = { communityId: target.id, lastActivityAt: now };
                metadata = { fromCommunitySlug: community.slug, toCommunitySlug: target.slug };
                break;
            }
            default: throw new BadRequestException('Неизвестное действие');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.publication.update({ where: { id: publication.id }, data: update });
            await tx.communityContentAction.create({ data: { communityId: community.id, publicationId: publication.id, actorId: user.id, action: dto.action, note: dto.note.trim(), metadata } });
            await tx.auditLog.create({ data: { actorId: user.id, action: `community.content.${dto.action.toLowerCase()}`, entityType: 'Publication', entityId: publication.id, metadata: { communitySlug: community.slug, publicationSlug, note: dto.note.trim(), ...metadata } } });
        });
        return { ok: true };
    }
};
CommunityManagementService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CommunityManagementService);
export { CommunityManagementService };
//# sourceMappingURL=community-management.service.js.map