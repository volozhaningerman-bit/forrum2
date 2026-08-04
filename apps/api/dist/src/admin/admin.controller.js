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
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { GrantBalanceDto } from '../wallet/dto.js';
import { AdminService } from './admin.service.js';
import { EndCommunityRoleDto, GrantCommunityRoleDto, HidePublicationDto, PromotionSettingsDto, RefundPromotionDto, ResolveReportDto } from './dto.js';
let AdminController = class AdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    dashboard() { return this.service.dashboard(); }
    reports() { return this.service.reports(); }
    resolve(id, dto, user) {
        return this.service.resolveReport(id, dto.status, user.id, dto.note);
    }
    hide(slug, dto, user) {
        return this.service.hidePublication(slug, dto.reason, user.id);
    }
    hideComment(id, dto, user) {
        return this.service.hideComment(id, dto.reason, user.id);
    }
    backupStatus() { return this.service.backupStatus(); }
    communityRoles() { return this.service.communityRoles(); }
    grantCommunityRole(dto, user) {
        return this.service.grantCommunityRole(user.id, dto);
    }
    endCommunityRole(id, dto, user) {
        return this.service.endCommunityRole(user.id, id, dto.note);
    }
    promotionSettings() { return this.service.promotionSettings(); }
    updatePromotionSettings(dto, user) {
        return this.service.updatePromotionSettings(user.id, dto);
    }
    promotions() { return this.service.promotions(); }
    refundPromotion(id, dto, user) {
        return this.service.refundPromotion(user.id, id, dto.reason);
    }
    grant(dto, user) {
        return this.service.grantBalance(user.id, dto.username, dto.amount, dto.description);
    }
};
__decorate([
    Get('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "dashboard", null);
__decorate([
    Get('reports'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "reports", null);
__decorate([
    Post('reports/:id/resolve'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ResolveReportDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resolve", null);
__decorate([
    Post('publications/:slug/hide'),
    __param(0, Param('slug')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, HidePublicationDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "hide", null);
__decorate([
    Post('comments/:id/hide'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, HidePublicationDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "hideComment", null);
__decorate([
    Get('backups/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "backupStatus", null);
__decorate([
    Get('community-roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "communityRoles", null);
__decorate([
    Post('community-roles'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GrantCommunityRoleDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "grantCommunityRole", null);
__decorate([
    Post('community-roles/:id/end'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, EndCommunityRoleDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "endCommunityRole", null);
__decorate([
    Get('promotion-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "promotionSettings", null);
__decorate([
    Put('promotion-settings'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PromotionSettingsDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePromotionSettings", null);
__decorate([
    Get('promotions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "promotions", null);
__decorate([
    Post('promotions/:id/refund'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RefundPromotionDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "refundPromotion", null);
__decorate([
    Post('wallet/grant'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GrantBalanceDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "grant", null);
AdminController = __decorate([
    ApiTags('admin'),
    Controller('admin'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map