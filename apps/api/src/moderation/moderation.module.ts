import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { ModerationAdminController, ModerationController } from './moderation.controller.js';
import { ModerationService } from './moderation.service.js';

@Module({ imports: [AuthModule, NotificationsModule], controllers: [ModerationController, ModerationAdminController], providers: [ModerationService], exports: [ModerationService] })
export class ModerationModule {}
