import { PublicationFormat, PublicationType, ReactionType } from '../generated/prisma/client.js';
export declare class CreatePublicationDto {
    format: PublicationFormat;
    type: PublicationType;
    title?: string;
    body: string;
    tags?: string[];
}
export declare class UpdatePublicationDto {
    type?: PublicationType;
    title?: string;
    body?: string;
    tags?: string[];
}
export declare class CreateCommentDto {
    body: string;
    parentId?: string;
}
export declare class ReactionDto {
    type: ReactionType;
}
export declare class ReportDto {
    reason: string;
    details?: string;
}
