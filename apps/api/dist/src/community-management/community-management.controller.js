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
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CommunityManagementService } from './community-management.service.js';
import { CommunityContentActionDto, CreateCommunityReportDto, CreateStructureProposalDto, InviteCommunityRoleDto, RespondRoleInviteDto, ResolveStructureProposalDto } from './dto.js';
let CommunityManagementController = class CommunityManagementController {
    service;
    constructor(service) {
        this.service = service;
    }
    invites(user) { return this.service.invites(user.id); }
    respondInvite(user, id, dto) {
        return this.service.respondInvite(user.id, id, dto.status);
    }
    dashboard(user, slug) { return this.service.dashboard(user, slug); }
    createReport(user, slug, dto) {
        return this.service.createReport(user, slug, dto);
    }
    createStructureProposal(user, slug, dto) {
        return this.service.createStructureProposal(user, slug, dto);
    }
    resolveStructureProposal(user, slug, id, dto) {
        return this.service.resolveStructureProposal(user, slug, id, dto);
    }
    invite(user, slug, dto) {
        return this.service.invite(user, slug, dto);
    }
    contentAction(user, slug, publicationSlug, dto) {
        return this.service.contentAction(user, slug, publicationSlug, dto);
    }
};
__decorate([
    Get('invites'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "invites", null);
__decorate([
    Post('invites/:id/respond'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, RespondRoleInviteDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "respondInvite", null);
__decorate([
    Get(':slug'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "dashboard", null);
__decorate([
    Post(':slug/reports'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateCommunityReportDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "createReport", null);
__decorate([
    Post(':slug/structure-proposals'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateStructureProposalDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "createStructureProposal", null);
__decorate([
    Post(':slug/structure-proposals/:id/resolve'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Param('id')),
    __param(3, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, ResolveStructureProposalDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "resolveStructureProposal", null);
__decorate([
    Post(':slug/role-invites'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, InviteCommunityRoleDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "invite", null);
__decorate([
    Post(':slug/publications/:publicationSlug/action'),
    __param(0, CurrentUser()),
    __param(1, Param('slug')),
    __param(2, Param('publicationSlug')),
    __param(3, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, CommunityContentActionDto]),
    __metadata("design:returntype", void 0)
], CommunityManagementController.prototype, "contentAction", null);
CommunityManagementController = __decorate([
    ApiTags('community-management'),
    Controller('community-management'),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [CommunityManagementService])
], CommunityManagementController);
export { CommunityManagementController };
//# sourceMappingURL=community-management.controller.js.map