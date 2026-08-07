import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  
} from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { TransferInventoryItemDto } from './dto/transfer-inventory-item.dto.js';
import { InventoryService } from './inventory.service.js';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get('users/:username')
  publicInventory(@Param('username') username: string) {
    return this.inventory.publicInventory(username);
  }

  @UseGuards(SessionGuard)
  @Post('items/:id/equip')
  equip(
    @Param('id') id: string,
    @CurrentUser() actorValue: unknown,
  ) {
    return this.inventory.equip(this.actorId(actorValue), id);
  }

  @UseGuards(SessionGuard)
  @Post('items/:id/unequip')
  unequip(
    @Param('id') id: string,
    @CurrentUser() actorValue: unknown,
  ) {
    return this.inventory.unequip(this.actorId(actorValue), id);
  }

  @UseGuards(SessionGuard)
  @Post('items/:id/transfer')
  transfer(
    @Param('id') id: string,
    @Body() body: TransferInventoryItemDto,
    @CurrentUser() actorValue: unknown,
  ) {
    return this.inventory.transfer(this.actorId(actorValue), id, body.username);
  }

  @UseGuards(SessionGuard)
  @Delete('items/:id')
  remove(
    @Param('id') id: string,
    @CurrentUser() actorValue: unknown,
  ) {
    return this.inventory.remove(this.actorId(actorValue), id);
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
