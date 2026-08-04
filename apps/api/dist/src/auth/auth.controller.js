var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './current-user.js';
import { ChangePasswordDto, LoginDto, RegisterDto, RequestPasswordResetDto, ResendVerificationDto, ResetPasswordDto, UpdateProfileDto, UsernameAvailabilityDto } from './dto.js';
import { SessionGuard } from './session.guard.js';
import { VerifiedGuard } from './verified.guard.js';
let AuthController = class AuthController {
    auth;
    config;
    constructor(auth, config) {
        this.auth = auth;
        this.config = config;
    }
    register(dto) { return this.auth.register(dto); }
    usernameAvailability(dto) { return this.auth.usernameAvailability(dto.username); }
    resend(dto) { return this.auth.resendVerification(dto.email); }
    requestPasswordReset(dto) { return this.auth.requestPasswordReset(dto.email); }
    resetPassword(dto) { return this.auth.resetPassword(dto); }
    verify(token) { return this.auth.verifyEmail(token); }
    async login(dto, request, response) {
        const result = await this.auth.login(dto, {
            userAgent: request.headers['user-agent'],
            ipAddress: request.ip,
        });
        response.cookie(this.config.get('SESSION_COOKIE_NAME', 'forrum_session'), result.token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: this.config.get('NODE_ENV') === 'production',
            expires: result.expiresAt,
            path: '/',
        });
        return { user: result.user };
    }
    async logout(request, response) {
        const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
        await this.auth.logout(request.cookies?.[name]);
        response.clearCookie(name, { path: '/' });
        return { ok: true };
    }
    sessions(user, request) {
        const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
        return this.auth.listSessions(user.id, request.cookies?.[name]);
    }
    async revokeSession(id, user, request, response) {
        const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
        const result = await this.auth.revokeSession(user.id, id, request.cookies?.[name]);
        if (result.current)
            response.clearCookie(name, { path: '/' });
        return result;
    }
    revokeOthers(user, request) {
        const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
        return this.auth.revokeOtherSessions(user.id, request.cookies?.[name]);
    }
    me(user) { return { user: this.auth.publicUser(user) }; }
    completeOnboarding(user) { return this.auth.completeOnboarding(user.id); }
    update(user, dto) { return this.auth.updateProfile(user.id, dto); }
    async changePassword(user, dto, response) {
        await this.auth.changePassword(user.id, dto);
        response.clearCookie(this.config.get('SESSION_COOKIE_NAME', 'forrum_session'), { path: '/' });
        return { ok: true };
    }
};
__decorate([
    Post('register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    Get('username-availability'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernameAvailabilityDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "usernameAvailability", null);
__decorate([
    Post('resend-verification'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResendVerificationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resend", null);
__decorate([
    Post('password-reset/request'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestPasswordResetDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    Post('password-reset/confirm'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    Get('verify-email'),
    __param(0, Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verify", null);
__decorate([
    Post('login'),
    __param(0, Body()),
    __param(1, Req()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('logout'),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Get('sessions'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sessions", null);
__decorate([
    Delete('sessions/:id'),
    UseGuards(SessionGuard),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Req()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeSession", null);
__decorate([
    Post('sessions/revoke-others'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "revokeOthers", null);
__decorate([
    Get('me'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    Post('onboarding/complete'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "completeOnboarding", null);
__decorate([
    Patch('me'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    Post('change-password'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
AuthController = __decorate([
    ApiTags('auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService, ConfigService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map