import { MediaKind } from '../generated/prisma/client.js';
export declare class UploadMediaDto {
    kind: MediaKind;
    originalName: string;
    dataUrl: string;
}
