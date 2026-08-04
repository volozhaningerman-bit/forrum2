import { PrismaService } from './prisma/prisma.service.js';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    health(): Promise<{
        ok: boolean;
        service: string;
        version: string;
        time: string;
    }>;
}
