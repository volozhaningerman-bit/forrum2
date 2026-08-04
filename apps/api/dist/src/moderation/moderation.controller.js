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
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateAppealDto, ResolveAppealDto } from './dto.js';
import { ModerationService } from './moderation.service.js';
let ModerationController = class ModerationController {
    service;
    constructor(service) {
        this.service = service;
    }
    actions(user) { return this.service.listMine(user.id); }
    appeal(user, id, dto) { return this.service.appeal(user.id, id, dto.body); }
};
__decorate([
    Get('actions'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ModerationController.prototype, "actions", null);
__decorate([
    Post('actions/:id/appeal'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateAppealDto]),
    __metadata("design:returntype", void 0)
], ModerationController.prototype, "appeal", null);
ModerationController = __decorate([
    ApiTags('moderation'),
    Controller('moderation'),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [ModerationService])
], ModerationController);
export { ModerationController };
let ModerationAdminController = class ModerationAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    appeals() { return this.service.listAppeals(); }
    resolve(user, id, dto) { return this.service.resolveAppeal(user.id, id, dto.status, dto.note); }
};
__decorate([
    Get('appeals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModerationAdminController.prototype, "appeals", null);
__decorate([
    Post('appeals/:id/resolve'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ResolveAppealDto]),
    __metadata("design:returntype", void 0)
], ModerationAdminController.prototype, "resolve", null);
ModerationAdminController = __decorate([
    ApiTags('admin-moderation'),
    Controller('admin/moderation'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [ModerationService])
], ModerationAdminController);
export { ModerationAdminController };
//# sourceMappingURL=moderation.controller.js.map