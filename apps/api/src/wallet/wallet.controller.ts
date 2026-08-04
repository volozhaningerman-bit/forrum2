import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CancelPromotionDto, PromotionQuoteDto, PurchasePromotionDto } from './dto.js';
import { WalletService } from './wallet.service.js';

@ApiTags('promotion')
@Controller('promotion')
export class PromotionPublicController {
  constructor(private readonly service: WalletService) {}
  @Get('terms') terms() { return this.service.terms(); }
}

@ApiTags('wallet')
@Controller()
@UseGuards(SessionGuard, VerifiedGuard)
export class WalletController {
  constructor(private readonly service: WalletService) {}
  @Get('wallet') get(@CurrentUser() user: User) { return this.service.get(user.id); }
  @Post('communities/:slug/promotions/quote')
  quote(@Param('slug') slug: string, @Body() dto: PromotionQuoteDto) { return this.service.quote(slug, dto.type, dto.durationDays); }
  @Post('communities/:slug/promotions')
  purchase(@Param('slug') slug: string, @CurrentUser() user: User, @Body() dto: PurchasePromotionDto) {
    return this.service.purchase(user.id, slug, dto.publicationSlug, dto.type, dto.durationDays);
  }
  @Post('promotions/:id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: CancelPromotionDto) {
    return this.service.cancel(user.id, id, dto.reason);
  }
}
