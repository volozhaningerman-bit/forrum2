import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { PublicationsController } from './publications.controller.js';
import { PublicationsService } from './publications.service.js';

@Module({ imports: [AuthModule, NotificationsModule], controllers: [PublicationsController], providers: [PublicationsService], exports: [PublicationsService] })
export class PublicationsModule {}
