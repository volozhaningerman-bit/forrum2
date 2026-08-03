import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateAppealDto, ResolveAppealDto } from './dto.js';
import { ModerationService } from './moderation.service.js';

@ApiTags('moderation')
@Controller('moderation')
@UseGuards(SessionGuard, VerifiedGuard)
export class ModerationController {
  constructor(private readonly service: ModerationService) {}
  @Get('actions') actions(@CurrentUser() user: User) { return this.service.listMine(user.id); }
  @Post('actions/:id/appeal') appeal(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: CreateAppealDto) { return this.service.appeal(user.id, id, dto.body); }
}

@ApiTags('admin-moderation')
@Controller('admin/moderation')
@UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
export class ModerationAdminController {
  constructor(private readonly service: ModerationService) {}
  @Get('appeals') appeals() { return this.service.listAppeals(); }
  @Post('appeals/:id/resolve') resolve(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: ResolveAppealDto) { return this.service.resolveAppeal(user.id, id, dto.status, dto.note); }
}
