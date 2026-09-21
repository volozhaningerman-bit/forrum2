import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { HomeService } from './home.service.js';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get('ranking')
  ranking(@Query('period') period = 'week', @Query('mode') mode = 'activity') {
    if (period !== 'week' && period !== 'all' || mode !== 'activity' && mode !== 'likes') {
      throw new BadRequestException('Неверный период или показатель рейтинга');
    }
    return this.service.ranking(period, mode);
  }

  @Get('overview')
  @UseGuards(OptionalSessionGuard)
  overview(@OptionalUser() user: User | null) { return this.service.overview(user?.id); }
}
