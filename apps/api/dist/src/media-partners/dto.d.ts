import { MediaPartnerStatus, MediaPartnerType } from '../generated/prisma/client.js';
export declare class ApplyMediaPartnerDto {
    type: MediaPartnerType;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string;
    description: string;
}
export declare class ReviewMediaPartnerDto {
    status: MediaPartnerStatus;
    note?: string;
}
