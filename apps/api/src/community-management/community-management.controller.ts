import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CommunityManagementService } from './community-management.service.js';
import { CommunityContentActionDto, CreateCommunityReportDto, CreateStructureProposalDto, InviteCommunityRoleDto, RespondRoleInviteDto, ResolveStructureProposalDto } from './dto.js';

@ApiTags('community-management')
@Controller('community-management')
@UseGuards(SessionGuard, VerifiedGuard)
export class CommunityManagementController {
  constructor(private readonly service: CommunityManagementService) {}

  @Get('invites')
  invites(@CurrentUser() user: User) { return this.service.invites(user.id); }

  @Post('invites/:id/respond')
  respondInvite(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: RespondRoleInviteDto) {
    return this.service.respondInvite(user.id, id, dto.status);
  }

  @Get(':slug')
  dashboard(@CurrentUser() user: User, @Param('slug') slug: string) { return this.service.dashboard(user, slug); }

  @Post(':slug/reports')
  createReport(@CurrentUser() user: User, @Param('slug') slug: string, @Body() dto: CreateCommunityReportDto) {
    return this.service.createReport(user, slug, dto);
  }

  @Post(':slug/structure-proposals')
  createStructureProposal(@CurrentUser() user: User, @Param('slug') slug: string, @Body() dto: CreateStructureProposalDto) {
    return this.service.createStructureProposal(user, slug, dto);
  }

  @Post(':slug/structure-proposals/:id/resolve')
  resolveStructureProposal(@CurrentUser() user: User, @Param('slug') slug: string, @Param('id') id: string, @Body() dto: ResolveStructureProposalDto) {
    return this.service.resolveStructureProposal(user, slug, id, dto);
  }

  @Post(':slug/role-invites')
  invite(@CurrentUser() user: User, @Param('slug') slug: string, @Body() dto: InviteCommunityRoleDto) {
    return this.service.invite(user, slug, dto);
  }

  @Post(':slug/publications/:publicationSlug/action')
  contentAction(@CurrentUser() user: User, @Param('slug') slug: string, @Param('publicationSlug') publicationSlug: string, @Body() dto: CommunityContentActionDto) {
    return this.service.contentAction(user, slug, publicationSlug, dto);
  }
}
