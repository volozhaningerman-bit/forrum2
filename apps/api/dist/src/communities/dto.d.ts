import { NotifyLevel } from '../generated/prisma/client.js';
export declare class CreateCommunityDto {
    name: string;
    description: string;
    shortDescription?: string;
    slug?: string;
    parentSlug?: string;
    accentColor?: string;
}
export declare class UpdateCommunitySubscriptionDto {
    notifyLevel: NotifyLevel;
}
