import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { GrantBalanceDto } from '../wallet/dto.js';
import { AdminService } from './admin.service.js';
import { EndCommunityRoleDto, GrantCommunityRoleDto, HidePublicationDto, PromotionSettingsDto, RefundPromotionDto, ResolveReportDto } from './dto.js';

@ApiTags('admin')
@Controller('admin')
@UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Get('dashboard') dashboard() { return this.service.dashboard(); }
  @Get('reports') reports() { return this.service.reports(); }
  @Post('reports/:id/resolve') resolve(@Param('id') id: string, @Body() dto: ResolveReportDto, @CurrentUser() user: User) {
    return this.service.resolveReport(id, dto.status, user.id, dto.note);
  }
  @Post('publications/:slug/hide') hide(@Param('slug') slug: string, @Body() dto: HidePublicationDto, @CurrentUser() user: User) {
    return this.service.hidePublication(slug, dto.reason, user.id);
  }
  @Post('comments/:id/hide') hideComment(@Param('id') id: string, @Body() dto: HidePublicationDto, @CurrentUser() user: User) {
    return this.service.hideComment(id, dto.reason, user.id);
  }
  @Get('backups/status') backupStatus() { return this.service.backupStatus(); }

  @Get('community-roles') communityRoles() { return this.service.communityRoles(); }
  @Post('community-roles') grantCommunityRole(@Body() dto: GrantCommunityRoleDto, @CurrentUser() user: User) {
    return this.service.grantCommunityRole(user.id, dto);
  }
  @Post('community-roles/:id/end') endCommunityRole(@Param('id') id: string, @Body() dto: EndCommunityRoleDto, @CurrentUser() user: User) {
    return this.service.endCommunityRole(user.id, id, dto.note);
  }

  @Get('promotion-settings') promotionSettings() { return this.service.promotionSettings(); }
  @Put('promotion-settings') updatePromotionSettings(@Body() dto: PromotionSettingsDto, @CurrentUser() user: User) {
    return this.service.updatePromotionSettings(user.id, dto);
  }
  @Get('promotions') promotions() { return this.service.promotions(); }
  @Post('promotions/:id/refund') refundPromotion(@Param('id') id: string, @Body() dto: RefundPromotionDto, @CurrentUser() user: User) {
    return this.service.refundPromotion(user.id, id, dto.reason);
  }
  @Post('wallet/grant') grant(@Body() dto: GrantBalanceDto, @CurrentUser() user: User) {
    return this.service.grantBalance(user.id, dto.username, dto.amount, dto.description);
  }
}
