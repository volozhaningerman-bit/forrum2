import type { User } from '../generated/prisma/client.js';
import { ApplyMediaPartnerDto, ReviewMediaPartnerDto } from './dto.js';
import { MediaPartnersService } from './media-partners.service.js';
export declare class MediaPartnersController {
    private readonly service;
    constructor(service: MediaPartnersService);
    list(): Promise<{
        id: string;
        displayName: string;
        updatedAt: Date;
        description: string;
        type: import("../generated/prisma/enums.js").MediaPartnerType;
        platform: string;
        channelUrl: string;
        audienceText: string | null;
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
    }[]>;
    apply(user: User, dto: ApplyMediaPartnerDto): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").MediaPartnerStatus;
    }>;
}
export declare class MediaPartnersAdminController {
    private readonly service;
    constructor(service: MediaPartnersService);
    list(): Promise<({
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        displayName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string;
        status: import("../generated/prisma/enums.js").MediaPartnerStatus;
        type: import("../generated/prisma/enums.js").MediaPartnerType;
        resolutionNote: string | null;
        platform: string;
        channelUrl: string;
        audienceText: string | null;
    })[]>;
    review(id: string, user: User, dto: ReviewMediaPartnerDto): Promise<{
        ok: boolean;
    }>;
}
