import { CommunityRoleType, ReportStatus } from '../generated/prisma/client.js';
export declare class ResolveReportDto {
    status: ReportStatus;
    note?: string;
}
export declare class HidePublicationDto {
    reason: string;
}
export declare class PromotionSettingsDto {
    pinLimit: number;
    pinBasePricePerDay: number;
    pinDemandPercentPerOccupied: number;
    boostLimit: number;
    boostBasePricePerDay: number;
    boostDemandPercentPerOccupied: number;
}
export declare class GrantCommunityRoleDto {
    username: string;
    communitySlug: string;
    role: CommunityRoleType;
    note?: string;
}
export declare class EndCommunityRoleDto {
    note: string;
}
export declare class RefundPromotionDto {
    reason: string;
}
