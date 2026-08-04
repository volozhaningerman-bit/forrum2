import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client.js';
import { AuthService } from './auth.service.js';
import { ChangePasswordDto, LoginDto, RegisterDto, RequestPasswordResetDto, ResendVerificationDto, ResetPasswordDto, UpdateProfileDto, UsernameAvailabilityDto } from './dto.js';
export declare class AuthController {
    private readonly auth;
    private readonly config;
    constructor(auth: AuthService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        ok: boolean;
        message: string;
        email: string;
    }>;
    usernameAvailability(dto: UsernameAvailabilityDto): Promise<{
        available: boolean;
        normalized: string;
        reason: string | undefined;
    }>;
    resend(dto: ResendVerificationDto): Promise<{
        ok: boolean;
    }>;
    requestPasswordReset(dto: RequestPasswordResetDto): Promise<{
        ok: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    verify(token: string): Promise<{
        ok: boolean;
    }>;
    login(dto: LoginDto, request: Request, response: Response): Promise<{
        user: {
            id: string;
            email: string;
            forrumId: number;
            username: string;
            displayName: string;
            bio: string | null;
            website: string | null;
            location: string | null;
            avatarUrl: string | null;
            coverUrl: string | null;
            wallPrivacy: string;
            showFavorites: boolean;
            showSubscriptions: boolean;
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: import("../generated/prisma/enums.js").AccountState;
            role: import("../generated/prisma/enums.js").GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    logout(request: Request, response: Response): Promise<{
        ok: boolean;
    }>;
    sessions(user: User, request: Request): Promise<{
        id: string;
        userAgent: string | null;
        ipAddress: string | null;
        createdAt: Date;
        lastSeenAt: Date;
        expiresAt: Date;
        current: boolean;
    }[]>;
    revokeSession(id: string, user: User, request: Request, response: Response): Promise<{
        ok: boolean;
        current: boolean;
    }>;
    revokeOthers(user: User, request: Request): Promise<{
        ok: boolean;
        revoked: number;
    }>;
    me(user: User): {
        user: {
            id: string;
            email: string;
            forrumId: number;
            username: string;
            displayName: string;
            bio: string | null;
            website: string | null;
            location: string | null;
            avatarUrl: string | null;
            coverUrl: string | null;
            wallPrivacy: string;
            showFavorites: boolean;
            showSubscriptions: boolean;
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: import("../generated/prisma/enums.js").AccountState;
            role: import("../generated/prisma/enums.js").GlobalRole;
            createdAt: Date | undefined;
        };
    };
    completeOnboarding(user: User): Promise<{
        ok: boolean;
        user: {
            id: string;
            email: string;
            forrumId: number;
            username: string;
            displayName: string;
            bio: string | null;
            website: string | null;
            location: string | null;
            avatarUrl: string | null;
            coverUrl: string | null;
            wallPrivacy: string;
            showFavorites: boolean;
            showSubscriptions: boolean;
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: import("../generated/prisma/enums.js").AccountState;
            role: import("../generated/prisma/enums.js").GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    update(user: User, dto: UpdateProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            forrumId: number;
            username: string;
            displayName: string;
            bio: string | null;
            website: string | null;
            location: string | null;
            avatarUrl: string | null;
            coverUrl: string | null;
            wallPrivacy: string;
            showFavorites: boolean;
            showSubscriptions: boolean;
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: import("../generated/prisma/enums.js").AccountState;
            role: import("../generated/prisma/enums.js").GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    changePassword(user: User, dto: ChangePasswordDto, response: Response): Promise<{
        ok: boolean;
    }>;
}
