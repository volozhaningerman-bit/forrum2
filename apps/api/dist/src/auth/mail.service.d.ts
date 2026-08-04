import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly config;
    private readonly transporter;
    constructor(config: ConfigService);
    sendVerification(email: string, token: string): Promise<void>;
    sendPasswordReset(email: string, token: string): Promise<void>;
}
