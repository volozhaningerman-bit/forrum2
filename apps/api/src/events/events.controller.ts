import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CancelEventDto, CreateCommunityEventDto, EventAttendanceDto } from './dto.js';
import { EventsService } from './events.service.js';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Get() @UseGuards(OptionalSessionGuard)
  list(@OptionalUser() user: User | null) { return this.service.list(user?.id); }

  @Get(':id') @UseGuards(OptionalSessionGuard)
  get(@Param('id') id: string, @OptionalUser() user: User | null) { return this.service.get(id, user?.id); }

  @Post() @UseGuards(SessionGuard, VerifiedGuard)
  create(@CurrentUser() user: User, @Body() dto: CreateCommunityEventDto) { return this.service.create(user, dto); }

  @Post(':id/attendance') @UseGuards(SessionGuard, VerifiedGuard)
  attendance(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: EventAttendanceDto) { return this.service.attendance(user.id, id, dto.status); }

  @Post(':id/cancel') @UseGuards(SessionGuard, VerifiedGuard)
  cancel(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: CancelEventDto) { return this.service.cancel(user, id, dto.reason); }
}
