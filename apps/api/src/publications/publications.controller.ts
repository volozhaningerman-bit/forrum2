import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateCommentDto, CreatePublicationDto, ReactionDto, ReportDto, UpdatePublicationDto } from './dto.js';
import { PublicationsService } from './publications.service.js';

@ApiTags('publications')
@Controller()
export class PublicationsController {
  constructor(private readonly service: PublicationsService) {}

  @Get('news')
  news() { return this.service.listNews(); }

  @Post('communities/:slug/publications') @UseGuards(SessionGuard, VerifiedGuard)
  create(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: CreatePublicationDto) {
    return this.service.create(slug, user.id, dto);
  }

  @Get('publications/saved') @UseGuards(SessionGuard)
  saved(@CurrentUser() user: User) { return this.service.saved(user.id); }

  @Get('publications/:slug') @UseGuards(OptionalSessionGuard)
  get(@Param('slug') slug: string, @OptionalUser() user: User | null, @Query('trackView') trackView = '1') { return this.service.get(slug, user, trackView !== '0'); }

  @Patch('publications/:slug') @UseGuards(SessionGuard, VerifiedGuard)
  update(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: UpdatePublicationDto) {
    return this.service.update(slug, user, dto);
  }

  @Delete('publications/:slug') @UseGuards(SessionGuard, VerifiedGuard)
  remove(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.remove(slug, user); }

  @Post('publications/:slug/comments') @UseGuards(SessionGuard, VerifiedGuard)
  comment(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: CreateCommentDto) {
    return this.service.comment(slug, user.id, dto);
  }

  @Post('publications/:slug/reaction') @UseGuards(SessionGuard, VerifiedGuard)
  react(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: ReactionDto) {
    return this.service.react(slug, user.id, dto.type);
  }

  @Post('comments/:id/reaction') @UseGuards(SessionGuard, VerifiedGuard)
  reactComment(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: ReactionDto) {
    return this.service.reactComment(id, user.id, dto.type);
  }

  @Post('publications/:slug/bookmark') @UseGuards(SessionGuard, VerifiedGuard)
  bookmark(@Param('slug') slug: string, @CurrentUser() user: User) { return this.service.toggleBookmark(slug, user.id); }

  @Post('comments/:id/report') @UseGuards(SessionGuard, VerifiedGuard)
  reportComment(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: ReportDto) {
    return this.service.reportComment(id, user.id, dto);
  }

  @Post('publications/:slug/report') @UseGuards(SessionGuard, VerifiedGuard)
  report(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: ReportDto) {
    return this.service.report(slug, user.id, dto);
  }
}
