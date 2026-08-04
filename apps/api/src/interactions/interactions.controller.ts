import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CancelInteractionDto, CreateInteractionDto, CreateProfileReviewDto } from './dto.js';
import { InteractionsService } from './interactions.service.js';

@ApiTags('interactions')
@Controller('interactions')
@UseGuards(SessionGuard, VerifiedGuard)
export class InteractionsController {
  constructor(private readonly service: InteractionsService) {}

  @Get()
  list(@CurrentUser() user: User) {
    return this.service.list(user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateInteractionDto) {
    return this.service.create(user.id, dto);
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string, @CurrentUser() user: User) {
    return this.service.confirm(id, user.id);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.service.complete(id, user.id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: CancelInteractionDto) {
    return this.service.cancel(id, user.id, dto.reason);
  }

  @Post(':id/reviews')
  review(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: CreateProfileReviewDto) {
    return this.service.review(id, user.id, dto.verdict, dto.body, dto.evidenceMediaId);
  }
}
