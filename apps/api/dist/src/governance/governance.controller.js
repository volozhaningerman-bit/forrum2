var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CastVoteDto, ClosePollDto, CreatePollDto, CreateProposalDto, ResolveProposalDto } from './dto.js';
import { GovernanceService } from './governance.service.js';
let GovernanceController = class GovernanceController {
    service;
    constructor(service) {
        this.service = service;
    }
    proposals(user) { return this.service.proposals(user?.id); }
    createProposal(user, dto) { return this.service.createProposal(user.id, dto); }
    support(user, id) { return this.service.toggleSupport(user.id, id); }
    polls(user) { return this.service.polls(user?.id); }
    createPoll(user, slug, dto) { return this.service.createPoll(slug, user, dto); }
    vote(user, id, dto) { return this.service.castVote(user, id, dto.optionId); }
    close(user, id, dto) { return this.service.closePoll(user, id, dto.resultNote); }
};
__decorate([
    Get('proposals'),
    UseGuards(OptionalSessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "proposals", null);
__decorate([
    Post('proposals'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProposalDto]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "createProposal", null);
__decorate([
    Post('proposals/:id/support'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "support", null);
__decorate([
    Get('polls'),
    UseGuards(OptionalSessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "polls", null);
__decorate([
    Post('communities/:slug/polls'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreatePollDto]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "createPoll", null);
__decorate([
    Post('polls/:id/vote'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CastVoteDto]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "vote", null);
__decorate([
    Post('polls/:id/close'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ClosePollDto]),
    __metadata("design:returntype", void 0)
], GovernanceController.prototype, "close", null);
GovernanceController = __decorate([
    ApiTags('governance'),
    Controller('governance'),
    __metadata("design:paramtypes", [GovernanceService])
], GovernanceController);
export { GovernanceController };
let GovernanceAdminController = class GovernanceAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    resolve(user, id, dto) { return this.service.resolveProposal(user.id, id, dto.status, dto.note); }
};
__decorate([
    Post('proposals/:id/resolve'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ResolveProposalDto]),
    __metadata("design:returntype", void 0)
], GovernanceAdminController.prototype, "resolve", null);
GovernanceAdminController = __decorate([
    ApiTags('admin-governance'),
    Controller('admin/governance'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [GovernanceService])
], GovernanceAdminController);
export { GovernanceAdminController };
//# sourceMappingURL=governance.controller.js.map