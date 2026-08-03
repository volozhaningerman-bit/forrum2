import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto.js';
import { PortfolioService } from './portfolio.service.js';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get() @UseGuards(OptionalSessionGuard)
  list(@Query('kind') kind?: string, @Query('owner') owner?: string) { return this.service.list(kind, owner); }

  @Get('me') @UseGuards(SessionGuard, VerifiedGuard)
  mine(@CurrentUser() user: User) { return this.service.mine(user.id); }

  @Get(':id') @UseGuards(OptionalSessionGuard)
  get(@Param('id') id: string, @OptionalUser() user: User | null) { return this.service.get(id, user?.id); }

  @Post() @UseGuards(SessionGuard, VerifiedGuard)
  create(@CurrentUser() user: User, @Body() dto: CreatePortfolioItemDto) { return this.service.create(user.id, dto); }

  @Patch(':id') @UseGuards(SessionGuard, VerifiedGuard)
  update(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: UpdatePortfolioItemDto) { return this.service.update(user, id, dto); }

  @Delete(':id') @UseGuards(SessionGuard, VerifiedGuard)
  archive(@CurrentUser() user: User, @Param('id') id: string) { return this.service.archive(user, id); }
}
