export type PortfolioStatusValue = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
export declare function isPortfolioPublic(status: PortfolioStatusValue): status is "ACTIVE" | "COMPLETED";
export declare function canLinkPortfolioInteraction(input: {
    itemStatus: PortfolioStatusValue;
    itemOwnerId: string;
    targetUserId: string;
}): boolean;
export declare function normalizePortfolioLinks(links: string[]): string[];
