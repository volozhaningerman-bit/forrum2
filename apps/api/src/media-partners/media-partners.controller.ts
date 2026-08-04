import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { ApplyMediaPartnerDto, ReviewMediaPartnerDto } from './dto.js';
import { MediaPartnersService } from './media-partners.service.js';

@ApiTags('media-partners')
@Controller('media/partners')
export class MediaPartnersController {
  constructor(private readonly service: MediaPartnersService) {}

  @Get()
  list() { return this.service.publicList(); }

  @Post('apply')
  @UseGuards(SessionGuard, VerifiedGuard)
  apply(@CurrentUser() user: User, @Body() dto: ApplyMediaPartnerDto) {
    return this.service.apply(user.id, dto);
  }
}

@ApiTags('admin-media-partners')
@Controller('admin/media-partners')
@UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
export class MediaPartnersAdminController {
  constructor(private readonly service: MediaPartnersService) {}

  @Get()
  list() { return this.service.adminList(); }

  @Post(':id/review')
  review(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: ReviewMediaPartnerDto) {
    return this.service.review(id, user.id, dto.status, dto.note);
  }
}
