import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './current-user.js';
import { ChangePasswordDto, LoginDto, RegisterDto, RequestPasswordResetDto, ResendVerificationDto, ResetPasswordDto, UpdateProfileDto, UsernameAvailabilityDto } from './dto.js';
import { SessionGuard } from './session.guard.js';
import { VerifiedGuard } from './verified.guard.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}

  @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); }
  @Get('username-availability') usernameAvailability(@Query() dto: UsernameAvailabilityDto) { return this.auth.usernameAvailability(dto.username); }
  @Post('resend-verification') resend(@Body() dto: ResendVerificationDto) { return this.auth.resendVerification(dto.email); }
  @Post('password-reset/request') requestPasswordReset(@Body() dto: RequestPasswordResetDto) { return this.auth.requestPasswordReset(dto.email); }
  @Post('password-reset/confirm') resetPassword(@Body() dto: ResetPasswordDto) { return this.auth.resetPassword(dto); }
  @Get('verify-email') verify(@Query('token') token: string) { return this.auth.verifyEmail(token); }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
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

  @Post('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
    await this.auth.logout(request.cookies?.[name]);
    response.clearCookie(name, { path: '/' });
    return { ok: true };
  }

  @Get('sessions') @UseGuards(SessionGuard)
  sessions(@CurrentUser() user: User, @Req() request: Request) {
    const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
    return this.auth.listSessions(user.id, request.cookies?.[name]);
  }

  @Delete('sessions/:id') @UseGuards(SessionGuard)
  async revokeSession(
    @Param('id') id: string, @CurrentUser() user: User, @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
    const result = await this.auth.revokeSession(user.id, id, request.cookies?.[name]);
    if (result.current) response.clearCookie(name, { path: '/' });
    return result;
  }

  @Post('sessions/revoke-others') @UseGuards(SessionGuard)
  revokeOthers(@CurrentUser() user: User, @Req() request: Request) {
    const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
    return this.auth.revokeOtherSessions(user.id, request.cookies?.[name]);
  }

  @Get('me') @UseGuards(SessionGuard)
  me(@CurrentUser() user: User) { return { user: this.auth.publicUser(user) }; }

  @Post('onboarding/complete') @UseGuards(SessionGuard, VerifiedGuard)
  completeOnboarding(@CurrentUser() user: User) { return this.auth.completeOnboarding(user.id); }

  @Patch('me') @UseGuards(SessionGuard, VerifiedGuard)
  update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) { return this.auth.updateProfile(user.id, dto); }

  @Post('change-password') @UseGuards(SessionGuard, VerifiedGuard)
  async changePassword(@CurrentUser() user: User, @Body() dto: ChangePasswordDto, @Res({ passthrough: true }) response: Response) {
    await this.auth.changePassword(user.id, dto);
    response.clearCookie(this.config.get('SESSION_COOKIE_NAME', 'forrum_session'), { path: '/' });
    return { ok: true };
  }
}
