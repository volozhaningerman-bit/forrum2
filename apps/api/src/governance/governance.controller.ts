import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CastVoteDto, ClosePollDto, CreatePollDto, CreateProposalDto, ResolveProposalDto } from './dto.js';
import { GovernanceService } from './governance.service.js';

@ApiTags('governance')
@Controller('governance')
export class GovernanceController {
  constructor(private readonly service: GovernanceService) {}
  @Get('proposals') @UseGuards(OptionalSessionGuard) proposals(@CurrentUser() user?: User) { return this.service.proposals(user?.id); }
  @Post('proposals') @UseGuards(SessionGuard, VerifiedGuard) createProposal(@CurrentUser() user: User, @Body() dto: CreateProposalDto) { return this.service.createProposal(user.id, dto); }
  @Post('proposals/:id/support') @UseGuards(SessionGuard, VerifiedGuard) support(@CurrentUser() user: User, @Param('id') id: string) { return this.service.toggleSupport(user.id, id); }
  @Get('polls') @UseGuards(OptionalSessionGuard) polls(@CurrentUser() user?: User) { return this.service.polls(user?.id); }
  @Post('communities/:slug/polls') @UseGuards(SessionGuard, VerifiedGuard) createPoll(@CurrentUser() user: User, @Param('slug') slug: string, @Body() dto: CreatePollDto) { return this.service.createPoll(slug, user, dto); }
  @Post('polls/:id/vote') @UseGuards(SessionGuard, VerifiedGuard) vote(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: CastVoteDto) { return this.service.castVote(user, id, dto.optionId); }
  @Post('polls/:id/close') @UseGuards(SessionGuard, VerifiedGuard) close(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: ClosePollDto) { return this.service.closePoll(user, id, dto.resultNote); }
}

@ApiTags('admin-governance')
@Controller('admin/governance')
@UseGuards(SessionGuard, VerifiedGuard, AdminGuard)
export class GovernanceAdminController {
  constructor(private readonly service: GovernanceService) {}
  @Post('proposals/:id/resolve') resolve(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: ResolveProposalDto) { return this.service.resolveProposal(user.id, id, dto.status, dto.note); }
}
