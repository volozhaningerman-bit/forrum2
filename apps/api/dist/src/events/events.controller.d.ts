import type { User } from '../generated/prisma/client.js';
import { CancelEventDto, CreateCommunityEventDto, EventAttendanceDto } from './dto.js';
import { EventsService } from './events.service.js';
export declare class EventsController {
    private readonly service;
    constructor(service: EventsService);
    list(user: User | null): Promise<{
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
    get(id: string, user: User | null): Promise<{
        attendees: {
            status: import("../generated/prisma/enums.js").EventAttendanceStatus;
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
    attendance(user: User, id: string, dto: EventAttendanceDto): Promise<{
        status: import("../generated/prisma/enums.js").EventAttendanceStatus;
    }>;
    cancel(user: User, id: string, dto: CancelEventDto): Promise<{
        ok: boolean;
    }>;
}
