import { AppealStatus } from '../generated/prisma/client.js';
export declare class CreateAppealDto {
    body: string;
}
export declare class ResolveAppealDto {
    status: AppealStatus;
    note: string;
}
