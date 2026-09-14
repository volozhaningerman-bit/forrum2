import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { UpdateFeedPreferencesDto } from './dto.js';
import { FeedService } from './feed.service.js';

const modes = ['for-you', 'subscriptions', 'all', 'popular', 'new', 'saved'] as const;

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Get('preferences') @UseGuards(SessionGuard)
  preferences(@CurrentUser() user: User) { return this.service.preferences(user.id); }

  @Patch('preferences') @UseGuards(SessionGuard, VerifiedGuard)
  updatePreferences(@CurrentUser() user: User, @Body() dto: UpdateFeedPreferencesDto) {
    return this.service.updatePreferences(user.id, dto);
  }

  @Post('hidden-publications/:id') @UseGuards(SessionGuard, VerifiedGuard)
  hidePublication(@Param('id') id: string, @CurrentUser() user: User) { return this.service.hidePublication(user.id, id); }

  @Delete('hidden-publications/:id') @UseGuards(SessionGuard, VerifiedGuard)
  unhidePublication(@Param('id') id: string, @CurrentUser() user: User) { return this.service.unhidePublication(user.id, id); }

  @Delete('hidden-publications') @UseGuards(SessionGuard, VerifiedGuard)
  clearHiddenPublications(@CurrentUser() user: User) { return this.service.clearHiddenPublications(user.id); }

  @Post('hidden-communities/:slug') @UseGuards(SessionGuard, VerifiedGuard)
  hideCommunity(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.hideCommunity(user.id, slug); }

  @Delete('hidden-communities/:slug') @UseGuards(SessionGuard, VerifiedGuard)
  unhideCommunity(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.unhideCommunity(user.id, slug); }

  @Get() @UseGuards(OptionalSessionGuard)
  get(@Query('mode') mode = 'for-you', @OptionalUser() user: User | null, @Query('browse') browse?: string, @Query('community') community?: string, @Query('unanswered') unanswered?: string, @Query('offset') offset?: string) {
    return this.service.get(modes.includes(mode as typeof modes[number]) ? mode : 'for-you', user?.id, browse === '1' ? { community, unanswered: unanswered === '1', offset: Math.max(0, Math.min(1000000, Number.parseInt(offset || '0', 10) || 0)) } : undefined);
  }
}
