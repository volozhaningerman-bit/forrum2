import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { TagsService } from './tags.service.js';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Get('subscriptions') @UseGuards(SessionGuard)
  subscriptions(@CurrentUser() user: User) { return this.service.subscriptions(user.id); }

  @Get(':slug') @UseGuards(OptionalSessionGuard)
  get(@Param('slug') slug: string, @OptionalUser() user: User | null) { return this.service.get(slug, user?.id); }

  @Post(':slug/subscribe') @UseGuards(SessionGuard, VerifiedGuard)
  subscribe(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.subscribe(slug, user.id); }

  @Delete(':slug/subscribe') @UseGuards(SessionGuard, VerifiedGuard)
  unsubscribe(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.unsubscribe(slug, user.id); }
}
