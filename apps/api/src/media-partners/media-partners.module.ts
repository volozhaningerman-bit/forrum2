import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { MediaPartnersAdminController, MediaPartnersController } from './media-partners.controller.js';
import { MediaPartnersService } from './media-partners.service.js';

@Module({
  imports: [AuthModule, NotificationsModule],
  controllers: [MediaPartnersController, MediaPartnersAdminController],
  providers: [MediaPartnersService],
})
export class MediaPartnersModule {}
