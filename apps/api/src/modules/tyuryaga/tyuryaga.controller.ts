import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TyuryagaService } from './tyuryaga.service.js';
import { BuyTattooDto, ExecuteQuestDto, HitBossDto, StartBossDto } from './dto/tyuryaga.dto.js';
import { SessionGuard } from '../../auth/session.guard.js';

@Controller('games/tyuryaga')
@UseGuards(SessionGuard)
export class TyuryagaController {
  constructor(private readonly tyuryagaService: TyuryagaService) {}

  @Get('state')
  async getState(@Req() req: any) {
    return this.tyuryagaService.getProfile(req.user.id);
  }

  @Post('quest')
  async executeQuest(@Req() req: any, @Body() dto: ExecuteQuestDto) {
    return this.tyuryagaService.executeQuest(req.user.id, dto.questId);
  }

  @Post('boss/start')
  async startBoss(@Req() req: any, @Body() dto: StartBossDto) {
    return this.tyuryagaService.startBossBattle(req.user.id, dto.bossId);
  }

  @Post('boss/hit')
  async hitBoss(@Req() req: any, @Body() dto: HitBossDto) {
    return this.tyuryagaService.hitBoss(req.user.id, dto.weaponId);
  }

  @Post('tattoo/buy')
  async buyTattoo(@Req() req: any, @Body() dto: BuyTattooDto) {
    return this.tyuryagaService.buyTattoo(req.user.id, dto.tattooId);
  }
}
