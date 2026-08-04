import { CommunityEventFormat, EventAttendanceStatus } from '../generated/prisma/client.js';
export declare class CreateCommunityEventDto {
    communitySlug: string;
    title: string;
    description: string;
    format: CommunityEventFormat;
    startsAt: string;
    endsAt?: string;
    location?: string;
    capacity?: number;
    publish?: boolean;
}
export declare class EventAttendanceDto {
    status: EventAttendanceStatus;
}
export declare class CancelEventDto {
    reason: string;
}
