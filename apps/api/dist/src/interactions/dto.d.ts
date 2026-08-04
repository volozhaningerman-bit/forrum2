import { InteractionType, ReviewVerdict } from '../generated/prisma/client.js';
export declare class CreateInteractionDto {
    targetUsername: string;
    type: InteractionType;
    title: string;
    description: string;
    publicationSlug?: string;
    communitySlug?: string;
    portfolioItemId?: string;
}
export declare class CancelInteractionDto {
    reason?: string;
}
export declare class CreateProfileReviewDto {
    verdict: ReviewVerdict;
    body: string;
    evidenceMediaId?: string;
}
