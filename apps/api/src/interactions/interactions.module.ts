import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { InteractionsAdminController, InteractionsController } from './interactions.controller.js';
import { InteractionsService } from './interactions.service.js';

@Module({ imports: [AuthModule, NotificationsModule], controllers: [InteractionsController, InteractionsAdminController], providers: [InteractionsService], exports: [InteractionsService] })
export class InteractionsModule {}
