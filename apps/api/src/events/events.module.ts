import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';

@Module({ imports: [AuthModule, NotificationsModule], controllers: [EventsController], providers: [EventsService], exports: [EventsService] })
export class EventsModule {}
