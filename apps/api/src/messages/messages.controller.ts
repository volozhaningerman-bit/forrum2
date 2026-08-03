import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { SendMessageDto, StartConversationDto } from './dto.js';
import { MessagesService } from './messages.service.js';

@ApiTags('messages')
@Controller('messages')
@UseGuards(SessionGuard, VerifiedGuard)
export class MessagesController {
  constructor(private readonly service: MessagesService) {}
  @Get() list(@CurrentUser() user: User) { return this.service.list(user.id); }
  @Get('unread-count') unreadCount(@CurrentUser() user: User) { return this.service.unreadCount(user.id); }
  @Post() start(@CurrentUser() user: User, @Body() dto: StartConversationDto) { return this.service.start(user.id, dto.username, dto.body); }
  @Get(':id') get(@Param('id') id: string, @CurrentUser() user: User) { return this.service.get(id, user.id); }
  @Post(':id') send(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: SendMessageDto) { return this.service.send(id, user.id, dto.body); }
}
