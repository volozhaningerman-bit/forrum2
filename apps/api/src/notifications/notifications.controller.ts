import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { NotificationsService } from './notifications.service.js';
import { UpdateNotificationPreferencesDto } from './dto.js';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(SessionGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}
  @Get() list(@CurrentUser() user: User) { return this.service.list(user.id); }
  @Get('unread-count') count(@CurrentUser() user: User) { return this.service.unreadCount(user.id); }
  @Post('read-all') readAll(@CurrentUser() user: User) { return this.service.readAll(user.id); }
  @Post(':id/read') read(@Param('id') id: string, @CurrentUser() user: User) { return this.service.read(user.id, id); }
  @Get('preferences') preferences(@CurrentUser() user: User) { return this.service.preferences(user.id); }
  @Patch('preferences') updatePreferences(@CurrentUser() user: User, @Body() dto: UpdateNotificationPreferencesDto) {
    return this.service.updatePreferences(user.id, dto);
  }
}
