import { WorkshopItemStatus, WorkshopItemType } from '../generated/prisma/client.js';
export declare class CreateWorkshopItemDto {
    type: WorkshopItemType;
    title: string;
    description: string;
    previewMediaId?: string;
}
export declare class ReviewWorkshopItemDto {
    status: WorkshopItemStatus;
    note: string;
}
