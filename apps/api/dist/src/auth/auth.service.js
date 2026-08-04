var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import { AccountState } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { createOpaqueToken, hashToken } from '../common/security.js';
import { usernamePolicy } from '../common/auth-rules.js';
import { MailService } from './mail.service.js';
let AuthService = class AuthService {
    prisma;
    mail;
    config;
    constructor(prisma, mail, config) {
        this.prisma = prisma;
        this.mail = mail;
        this.config = config;
    }
    async register(dto) {
        const email = dto.email.trim().toLowerCase();
        const policy = usernamePolicy(dto.username);
        if (!policy.allowed)
            throw new BadRequestException(policy.reason);
        const username = policy.normalized;
        const exists = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
        if (exists)
            throw new ConflictException('Почта или имя пользователя уже заняты');
        const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });
        const token = createOpaqueToken();
        await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    username,
                    displayName: dto.displayName.trim(),
                    passwordHash,
                    wallet: { create: {} },
                    notificationPreference: { create: {} },
                },
            });
            await tx.emailVerificationToken.create({
                data: { userId: user.id, tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
            });
        });
        await this.mail.sendVerification(email, token);
        return { ok: true, message: 'Письмо подтверждения отправлено', email };
    }
    async usernameAvailability(usernameInput) {
        const policy = usernamePolicy(usernameInput);
        if (!policy.allowed)
            return { available: false, normalized: policy.normalized, reason: policy.reason };
        const existing = await this.prisma.user.findUnique({ where: { username: policy.normalized }, select: { id: true } });
        return { available: !existing, normalized: policy.normalized, reason: existing ? 'Имя уже занято' : undefined };
    }
    async completeOnboarding(userId) {
        const user = await this.prisma.user.update({ where: { id: userId }, data: { onboardingCompletedAt: new Date() } });
        return { ok: true, user: this.publicUser(user) };
    }
    async resendVerification(emailInput) {
        const email = emailInput.trim().toLowerCase();
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.emailVerifiedAt)
            return { ok: true };
        const token = createOpaqueToken();
        await this.prisma.$transaction([
            this.prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } }),
            this.prisma.emailVerificationToken.create({
                data: { userId: user.id, tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
            }),
        ]);
        await this.mail.sendVerification(email, token);
        return { ok: true };
    }
    async requestPasswordReset(emailInput) {
        const email = emailInput.trim().toLowerCase();
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return { ok: true };
        const token = createOpaqueToken();
        await this.prisma.$transaction([
            this.prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } }),
            this.prisma.passwordResetToken.create({
                data: { userId: user.id, tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
            }),
        ]);
        await this.mail.sendPasswordReset(email, token);
        return { ok: true };
    }
    async resetPassword(dto) {
        const tokenHash = hashToken(dto.token);
        const record = await this.prisma.passwordResetToken.findUnique({ where: { tokenHash } });
        if (!record || record.usedAt || record.expiresAt <= new Date())
            throw new BadRequestException('Ссылка недействительна или истекла');
        const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });
        await this.prisma.$transaction([
            this.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
            this.prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
            this.prisma.session.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
        ]);
        return { ok: true };
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !(await argon2.verify(user.passwordHash, dto.currentPassword)))
            throw new BadRequestException('Текущий пароль указан неверно');
        const passwordHash = await argon2.hash(dto.newPassword, { type: argon2.argon2id });
        await this.prisma.$transaction([
            this.prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
            this.prisma.session.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } }),
        ]);
        return { ok: true };
    }
    async verifyEmail(token) {
        if (!token)
            throw new UnauthorizedException('В ссылке отсутствует токен');
        const record = await this.prisma.emailVerificationToken.findUnique({ where: { tokenHash: hashToken(token) } });
        if (!record || record.expiresAt <= new Date())
            throw new UnauthorizedException('Ссылка недействительна или истекла');
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: record.userId },
                data: { emailVerifiedAt: new Date(), state: AccountState.VERIFIED },
            }),
            this.prisma.emailVerificationToken.deleteMany({ where: { userId: record.userId } }),
        ]);
        return { ok: true };
    }
    async login(dto, metadata = {}) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email.trim().toLowerCase() } });
        if (!user || !(await argon2.verify(user.passwordHash, dto.password))) {
            throw new UnauthorizedException('Неверная почта или пароль');
        }
        if (user.state === AccountState.SUSPENDED)
            throw new ForbiddenException('Аккаунт заблокирован');
        const token = createOpaqueToken();
        const days = Number(this.config.get('SESSION_TTL_DAYS', 30));
        const expiresAt = new Date(Date.now() + days * 86400000);
        await this.prisma.session.create({
            data: {
                userId: user.id, tokenHash: hashToken(token), expiresAt,
                userAgent: metadata.userAgent?.slice(0, 500) || null,
                ipAddress: metadata.ipAddress?.slice(0, 100) || null,
            },
        });
        return { token, expiresAt, user: this.publicUser(user) };
    }
    async logout(rawToken) {
        if (rawToken)
            await this.prisma.session.updateMany({
                where: { tokenHash: hashToken(rawToken), revokedAt: null }, data: { revokedAt: new Date() },
            });
        return { ok: true };
    }
    async userFromSession(rawToken) {
        if (!rawToken)
            return null;
        const session = await this.prisma.session.findUnique({
            where: { tokenHash: hashToken(rawToken) }, include: { user: true },
        });
        if (!session || session.revokedAt || session.expiresAt <= new Date() || session.user.state === AccountState.SUSPENDED)
            return null;
        const stale = session.lastSeenAt.getTime() < Date.now() - 5 * 60 * 1000;
        if (stale) {
            void this.prisma.$transaction([
                this.prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } }),
                this.prisma.user.update({ where: { id: session.userId }, data: { lastSeenAt: new Date() } }),
            ]).catch(() => undefined);
        }
        return session.user;
    }
    async listSessions(userId, rawToken) {
        const currentHash = rawToken ? hashToken(rawToken) : null;
        const sessions = await this.prisma.session.findMany({
            where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { lastSeenAt: 'desc' },
        });
        return sessions.map((session) => ({
            id: session.id,
            userAgent: session.userAgent,
            ipAddress: session.ipAddress,
            createdAt: session.createdAt,
            lastSeenAt: session.lastSeenAt,
            expiresAt: session.expiresAt,
            current: currentHash === session.tokenHash,
        }));
    }
    async revokeSession(userId, sessionId, rawToken) {
        const session = await this.prisma.session.findFirst({ where: { id: sessionId, userId, revokedAt: null } });
        if (!session)
            throw new UnauthorizedException('Сессия не найдена');
        await this.prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
        return { ok: true, current: Boolean(rawToken && session.tokenHash === hashToken(rawToken)) };
    }
    async revokeOtherSessions(userId, rawToken) {
        const currentHash = rawToken ? hashToken(rawToken) : '';
        const result = await this.prisma.session.updateMany({
            where: { userId, revokedAt: null, tokenHash: { not: currentHash } },
            data: { revokedAt: new Date() },
        });
        return { ok: true, revoked: result.count };
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                displayName: dto.displayName?.trim(),
                bio: dto.bio?.trim() || null,
                website: dto.website?.trim() || null,
                location: dto.location?.trim() || null,
                wallPrivacy: dto.wallPrivacy,
                showFavorites: dto.showFavorites,
                showSubscriptions: dto.showSubscriptions,
            },
        });
        return { user: this.publicUser(user) };
    }
    publicUser(user) {
        return {
            id: user.id,
            email: user.email,
            forrumId: user.forrumId,
            username: user.username,
            displayName: user.displayName,
            bio: user.bio ?? null,
            website: user.website ?? null,
            location: user.location ?? null,
            avatarUrl: user.avatarUrl ?? null,
            coverUrl: user.coverUrl ?? null,
            wallPrivacy: user.wallPrivacy ?? 'EVERYONE',
            showFavorites: user.showFavorites ?? true,
            showSubscriptions: user.showSubscriptions ?? true,
            emailVerified: Boolean(user.emailVerifiedAt),
            onboardingCompleted: Boolean(user.onboardingCompletedAt),
            state: user.state,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MailService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map