import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
export declare class SessionGuard implements CanActivate {
    private readonly auth;
    private readonly config;
    constructor(auth: AuthService, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
