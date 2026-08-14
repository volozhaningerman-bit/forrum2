// FORRUM_TAG_STYLE_MODULE_V15_10
import { TagStylesController } from './tag-styles.controller.js';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { PublicationsController } from './publications.controller.js';
import { PublicationsService } from './publications.service.js';

@Module({ imports: [AuthModule, NotificationsModule], controllers: [PublicationsController, TagStylesController], providers: [PublicationsService], exports: [PublicationsService] })
export class PublicationsModule {}
