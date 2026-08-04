import { PortfolioItemKind, PortfolioItemStatus } from '../generated/prisma/client.js';
export declare class CreatePortfolioItemDto {
    kind: PortfolioItemKind;
    title: string;
    summary: string;
    description: string;
    communitySlug?: string;
    publicationSlug?: string;
    coverUrl?: string;
    lookingForTeam?: boolean;
    priceText?: string;
    contactNote?: string;
    links?: string[];
    status?: PortfolioItemStatus;
}
export declare class UpdatePortfolioItemDto extends CreatePortfolioItemDto {
}
