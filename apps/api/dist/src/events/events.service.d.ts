import { EventAttendanceStatus, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import type { CreateCommunityEventDto } from './dto.js';
export declare class EventsService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    private communityWithPermission;
    private map;
    list(userId?: string): Promise<{
        id: any;
        title: any;
        description: any;
        format: any;
        status: any;
        startsAt: any;
        endsAt: any;
        location: any;
        capacity: any;
        community: any;
        createdBy: any;
        counts: {
            going: number;
            interested: number;
        };
        viewerAttendance: any;
        canManage: boolean;
        createdAt: any;
    }[]>;
    get(id: string, userId?: string): Promise<{
        attendees: {
            status: EventAttendanceStatus;
            user: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
        }[];
        id: any;
        title: any;
        description: any;
        format: any;
        status: any;
        startsAt: any;
        endsAt: any;
        location: any;
        capacity: any;
        community: any;
        createdBy: any;
        counts: {
            going: number;
            interested: number;
        };
        viewerAttendance: any;
        canManage: boolean;
        createdAt: any;
    }>;
    create(user: User, dto: CreateCommunityEventDto): Promise<{
        id: string;
    }>;
    attendance(userId: string, eventId: string, status: EventAttendanceStatus): Promise<{
        status: EventAttendanceStatus;
    }>;
    cancel(user: User, eventId: string, reason: string): Promise<{
        ok: boolean;
    }>;
}
