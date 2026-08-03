import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateWorkshopItemDto, ReviewWorkshopItemDto } from './dto.js';
import { WorkshopService } from './workshop.service.js';

@ApiTags('workshop')
@Controller('workshop')
export class WorkshopController {
  constructor(private readonly service: WorkshopService) {}
  @Get() @UseGuards(OptionalSessionGuard) list(@CurrentUser() user?: User) { return this.service.list(user?.id); }
  @Post() @UseGuards(SessionGuard, VerifiedGuard) create(@CurrentUser() user: User, @Body() dto: CreateWorkshopItemDto) { return this.service.create(user.id, dto); }
  @Post(':id/like') @UseGuards(SessionGuard, VerifiedGuard) like(@CurrentUser() user: User, @Param('id') id: string) { return this.service.toggleLike(user.id, id); }
}

@ApiTags('admin-workshop')
@Controller('admin/workshop')
@UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
export class WorkshopAdminController {
  constructor(private readonly service: WorkshopService) {}
  @Get() list(@CurrentUser() user: User) { return this.service.list(user.id, true); }
  @Post(':id/review') review(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: ReviewWorkshopItemDto) { return this.service.review(user, id, dto.status, dto.note); }
}
