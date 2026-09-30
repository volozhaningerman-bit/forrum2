import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { StartExpeditionDto } from './dto/start-expedition.dto.js';
import { ExpeditionService } from './expedition.service.js';

@UseGuards(SessionGuard)
@Controller('expedition')
export class ExpeditionController {
  constructor(private readonly expedition: ExpeditionService) {}

  @Get('me')
  me(@CurrentUser() actorValue: unknown) {
    return this.expedition.state(this.actorId(actorValue));
  }

  @Post('runs')
  start(
    @CurrentUser() actorValue: unknown,
    @Body() body: StartExpeditionDto,
  ) {
    return this.expedition.startRun(this.actorId(actorValue), body.depth);
  }

  @Post('runs/:id/claim')
  claim(
    @CurrentUser() actorValue: unknown,
    @Param('id') id: string,
  ) {
    return this.expedition.claimRun(this.actorId(actorValue), id);
  }

  @Post('items/:id/equip')
  equip(
    @CurrentUser() actorValue: unknown,
    @Param('id') id: string,
  ) {
    return this.expedition.equip(this.actorId(actorValue), id);
  }

  @Post('items/:id/unequip')
  unequip(
    @CurrentUser() actorValue: unknown,
    @Param('id') id: string,
  ) {
    return this.expedition.unequip(this.actorId(actorValue), id);
  }

  private actorId(value: unknown) {
    if (typeof value === 'string' && value) return value;
    if (value && typeof value === 'object') {
      const candidate = value as {
        id?: string;
        userId?: string;
        sub?: string;
        user?: { id?: string };
      };
      const id =
        candidate.id ??
        candidate.userId ??
        candidate.sub ??
        candidate.user?.id;
      if (id) return id;
    }
    throw new UnauthorizedException('Не удалось определить пользователя');
  }
}
