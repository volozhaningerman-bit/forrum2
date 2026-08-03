import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommunityEventStatus, CommunityRoleType, EventAttendanceStatus, GlobalRole, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import type { CreateCommunityEventDto } from './dto.js';
import { canAttendEvent } from './rules.js';

const teamRoles = [CommunityRoleType.CURATOR, CommunityRoleType.ASSISTANT, CommunityRoleType.MODERATOR];

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService) {}

  private async communityWithPermission(user: User, slug: string) {
    const community = await this.prisma.community.findUnique({ where: { slug } });
    if (!community) throw new NotFoundException('Сообщество не найдено');
    if (user.role === GlobalRole.ADMIN || user.role === GlobalRole.OWNER) return community;
    const scope = [community.id];
    let parentId = community.parentId;
    let guard = 0;
    while (parentId && guard < 20) {
      scope.push(parentId);
      const parent = await this.prisma.community.findUnique({ where: { id: parentId }, select: { parentId: true } });
      parentId = parent?.parentId ?? null; guard += 1;
    }
    const role = await this.prisma.communityRole.findFirst({ where: { userId: user.id, communityId: { in: scope }, endedAt: null, role: { in: teamRoles } } });
    if (!role) throw new ForbiddenException('События создаёт команда сообщества');
    return community;
  }

  private map(event: any) {
    const counts = { going: 0, interested: 0 };
    for (const attendance of event.attendees ?? []) {
      if (attendance.status === EventAttendanceStatus.GOING) counts.going += 1;
      if (attendance.status === EventAttendanceStatus.INTERESTED) counts.interested += 1;
    }
    return {
      id: event.id, title: event.title, description: event.description, format: event.format, status: event.status,
      startsAt: event.startsAt, endsAt: event.endsAt, location: event.location, capacity: event.capacity,
      community: event.community, createdBy: event.createdBy, counts,
      viewerAttendance: event.viewerAttendances?.[0]?.status ?? null,
      canManage: Boolean(event.canManage), createdAt: event.createdAt,
    };
  }

  async list(userId?: string) {
    const now = new Date();
    await this.prisma.communityEvent.updateMany({ where: { status: CommunityEventStatus.PUBLISHED, endsAt: { lte: now } }, data: { status: CommunityEventStatus.COMPLETED } });
    const events = await this.prisma.communityEvent.findMany({
      where: { status: { in: [CommunityEventStatus.PUBLISHED, CommunityEventStatus.COMPLETED, CommunityEventStatus.CANCELLED] } },
      orderBy: [{ startsAt: 'asc' }], take: 120,
      include: {
        community: { select: { slug: true, name: true, accentColor: true } },
        createdBy: { select: { username: true, displayName: true } },
        attendees: { select: { status: true } },
      },
    });
    const viewer = userId ? await this.prisma.communityEventAttendance.findMany({ where: { userId, eventId: { in: events.map((item) => item.id) } } }) : [];
    const byEvent = new Map(viewer.map((item) => [item.eventId, item]));
    return events.map((event) => this.map({ ...event, viewerAttendances: byEvent.has(event.id) ? [byEvent.get(event.id)] : [] }));
  }

  async get(id: string, userId?: string) {
    const event = await this.prisma.communityEvent.findUnique({
      where: { id },
      include: {
        community: { select: { id: true, parentId: true, slug: true, name: true, accentColor: true } },
        createdBy: { select: { id: true, username: true, displayName: true } },
        attendees: { include: { user: { select: { username: true, displayName: true, avatarUrl: true } } }, orderBy: { updatedAt: 'desc' } },
      },
    });
    if (!event || event.status === CommunityEventStatus.DRAFT && event.createdById !== userId) throw new NotFoundException('Событие не найдено');
    const viewerAttendance = userId ? event.attendees.find((item) => item.userId === userId)?.status ?? null : null;
    return { ...this.map({ ...event, viewerAttendances: viewerAttendance ? [{ status: viewerAttendance }] : [] }), attendees: event.attendees.filter((item) => item.status !== EventAttendanceStatus.NOT_GOING).map((item) => ({ status: item.status, user: item.user })) };
  }

  async create(user: User, dto: CreateCommunityEventDto) {
    const community = await this.communityWithPermission(user, dto.communitySlug);
    const startsAt = new Date(dto.startsAt);
    const endsAt = dto.endsAt ? new Date(dto.endsAt) : null;
    if (startsAt.getTime() < Date.now() + 30 * 60_000) throw new BadRequestException('Событие должно начинаться не раньше чем через 30 минут');
    if (startsAt.getTime() > Date.now() + 366 * 86_400_000) throw new BadRequestException('Событие нельзя планировать дальше чем на год');
    if (endsAt && endsAt <= startsAt) throw new BadRequestException('Окончание должно быть позже начала');
    if (dto.format !== 'ONLINE' && !dto.location?.trim()) throw new BadRequestException('Для офлайн- или гибридного события укажите место');
    const status = dto.publish === false ? CommunityEventStatus.DRAFT : CommunityEventStatus.PUBLISHED;
    const event = await this.prisma.communityEvent.create({ data: {
      communityId: community.id, createdById: user.id, title: dto.title.trim(), description: dto.description.trim(), format: dto.format,
      status, startsAt, endsAt, location: dto.location?.trim() || null, capacity: dto.capacity ?? null,
    } });
    await this.prisma.auditLog.create({ data: { actorId: user.id, action: 'community.event.create', entityType: 'CommunityEvent', entityId: event.id, metadata: { communitySlug: community.slug, title: event.title, status } } });
    if (status === CommunityEventStatus.PUBLISHED) void this.notifications.deliverToCommunitySubscribers({ communityId: community.id, importance: 'IMPORTANT', title: `Событие в ${community.name}`, body: event.title, href: `/events/${event.id}`, actorId: user.id }).catch(() => undefined);
    return { id: event.id };
  }

  async attendance(userId: string, eventId: string, status: EventAttendanceStatus) {
    const event = await this.prisma.communityEvent.findUnique({ where: { id: eventId }, include: { attendees: { where: { status: EventAttendanceStatus.GOING } } } });
    if (!event) throw new BadRequestException('Запись на событие закрыта');
    const existing = await this.prisma.communityEventAttendance.findUnique({ where: { eventId_userId: { eventId, userId } } });
    const attendanceRule = canAttendEvent({ published: event.status === CommunityEventStatus.PUBLISHED, startsAt: event.startsAt, goingCount: event.attendees.length, capacity: event.capacity, alreadyGoing: existing?.status === EventAttendanceStatus.GOING });
    if (!attendanceRule.allowed) throw new BadRequestException(attendanceRule.reason === 'full' ? 'Все места уже заняты' : 'Запись на событие закрыта');
    await this.prisma.communityEventAttendance.upsert({ where: { eventId_userId: { eventId, userId } }, update: { status }, create: { eventId, userId, status } });
    return { status };
  }

  async cancel(user: User, eventId: string, reason: string) {
    const event = await this.prisma.communityEvent.findUnique({ where: { id: eventId }, include: { community: true } });
    if (!event) throw new NotFoundException('Событие не найдено');
    await this.communityWithPermission(user, event.community.slug);
    if (event.status === CommunityEventStatus.CANCELLED || event.status === CommunityEventStatus.COMPLETED) throw new BadRequestException('Событие уже завершено');
    await this.prisma.$transaction([
      this.prisma.communityEvent.update({ where: { id: eventId }, data: { status: CommunityEventStatus.CANCELLED } }),
      this.prisma.auditLog.create({ data: { actorId: user.id, action: 'community.event.cancel', entityType: 'CommunityEvent', entityId: eventId, metadata: { reason: reason.trim(), title: event.title } } }),
    ]);
    return { ok: true };
  }
}
