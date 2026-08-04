import { ConfigService } from '@nestjs/config';
import { AccountState, GlobalRole } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from './mail.service.js';
import type { ChangePasswordDto, LoginDto, RegisterDto, ResetPasswordDto, UpdateProfileDto } from './dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly mail;
    private readonly config;
    constructor(prisma: PrismaService, mail: MailService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        ok: boolean;
        message: string;
        email: string;
    }>;
    usernameAvailability(usernameInput: string): Promise<{
        available: boolean;
        normalized: string;
        reason: string | undefined;
    }>;
    completeOnboarding(userId: string): Promise<{
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
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: AccountState;
            role: GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    resendVerification(emailInput: string): Promise<{
        ok: boolean;
    }>;
    requestPasswordReset(emailInput: string): Promise<{
        ok: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        ok: boolean;
    }>;
    verifyEmail(token: string): Promise<{
        ok: boolean;
    }>;
    login(dto: LoginDto, metadata?: {
        userAgent?: string;
        ipAddress?: string;
    }): Promise<{
        token: string;
        expiresAt: Date;
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
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: AccountState;
            role: GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    logout(rawToken?: string): Promise<{
        ok: boolean;
    }>;
    userFromSession(rawToken?: string): Promise<{
        id: string;
        forrumId: number;
        email: string;
        username: string;
        displayName: string;
        bio: string | null;
        avatarUrl: string | null;
        coverUrl: string | null;
        wallPrivacy: import("../generated/prisma/enums.js").WallPrivacy;
        website: string | null;
        location: string | null;
        passwordHash: string;
        state: AccountState;
        role: GlobalRole;
        emailVerifiedAt: Date | null;
        onboardingCompletedAt: Date | null;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    listSessions(userId: string, rawToken?: string): Promise<{
        id: string;
        userAgent: string | null;
        ipAddress: string | null;
        createdAt: Date;
        lastSeenAt: Date;
        expiresAt: Date;
        current: boolean;
    }[]>;
    revokeSession(userId: string, sessionId: string, rawToken?: string): Promise<{
        ok: boolean;
        current: boolean;
    }>;
    revokeOtherSessions(userId: string, rawToken?: string): Promise<{
        ok: boolean;
        revoked: number;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
            emailVerified: boolean;
            onboardingCompleted: boolean;
            state: AccountState;
            role: GlobalRole;
            createdAt: Date | undefined;
        };
    }>;
    publicUser(user: {
        id: string;
        forrumId: number;
        username: string;
        displayName: string;
        bio?: string | null;
        website?: string | null;
        location?: string | null;
        avatarUrl?: string | null;
        coverUrl?: string | null;
        wallPrivacy?: string;
        email: string;
        emailVerifiedAt: Date | null;
        onboardingCompletedAt?: Date | null;
        state: AccountState;
        role: GlobalRole;
        createdAt?: Date;
    }): {
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
        emailVerified: boolean;
        onboardingCompleted: boolean;
        state: AccountState;
        role: GlobalRole;
        createdAt: Date | undefined;
    };
}
