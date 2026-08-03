import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateCommunityDto, UpdateCommunitySubscriptionDto } from './dto.js';
import { CommunitiesService } from './communities.service.js';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(private readonly service: CommunitiesService) {}

  @Get() @UseGuards(OptionalSessionGuard)
  list(@OptionalUser() user: User | null) { return this.service.list(user?.id); }

  @Get(':slug') @UseGuards(OptionalSessionGuard)
  get(@Param('slug') slug: string, @OptionalUser() user: User | null) { return this.service.get(slug, user?.id); }

  @Post(':slug/subscribe') @UseGuards(SessionGuard, VerifiedGuard)
  subscribe(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.subscribe(slug, user.id); }

  @Delete(':slug/subscribe') @UseGuards(SessionGuard, VerifiedGuard)
  unsubscribe(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.unsubscribe(slug, user.id); }

  @Patch(':slug/subscription') @UseGuards(SessionGuard, VerifiedGuard)
  updateSubscription(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: UpdateCommunitySubscriptionDto) {
    return this.service.updateSubscription(slug, user.id, dto.notifyLevel);
  }

  @Post() @UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
  create(@Body() dto: CreateCommunityDto, @CurrentUser() user: User) { return this.service.create(dto, user.id); }
}
