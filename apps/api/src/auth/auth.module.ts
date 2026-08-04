import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { MailService } from './mail.service.js';
import { SessionGuard } from './session.guard.js';
import { OptionalSessionGuard } from './optional-session.guard.js';
import { VerifiedGuard } from './verified.guard.js';
import { AdminGuard } from './admin.guard.js';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService, SessionGuard, OptionalSessionGuard, VerifiedGuard, AdminGuard],
  exports: [AuthService, SessionGuard, OptionalSessionGuard, VerifiedGuard, AdminGuard],
})
export class AuthModule {}
