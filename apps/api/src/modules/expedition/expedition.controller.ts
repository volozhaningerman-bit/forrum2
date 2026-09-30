import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../auth/session.guard.js';
import { StartExpeditionDto } from './dto/expedition.dto.js';
import { ExpeditionService } from './expedition.service.js';

@Controller('games/expedition')
@UseGuards(SessionGuard)
export class ExpeditionController {
  constructor(private readonly expedition: ExpeditionService) {}

  @Get('state')
  state(@Req() req: any) {
    return this.expedition.getState(req.user.id);
  }

  @Post('start')
  start(@Req() req: any, @Body() dto: StartExpeditionDto) {
    return this.expedition.start(req.user.id, dto.depth);
  }

  @Post('claim')
  claim(@Req() req: any) {
    return this.expedition.claim(req.user.id);
  }
}
