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
import { CreateWorkshopItemDto, ReviewWorkshopItemDto } from './dto.js';
import { WorkshopService } from './workshop.service.js';
let WorkshopController = class WorkshopController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) { return this.service.list(user?.id); }
    create(user, dto) { return this.service.create(user.id, dto); }
    like(user, id) { return this.service.toggleLike(user.id, id); }
};
__decorate([
    Get(),
    UseGuards(OptionalSessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "list", null);
__decorate([
    Post(),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateWorkshopItemDto]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "create", null);
__decorate([
    Post(':id/like'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "like", null);
WorkshopController = __decorate([
    ApiTags('workshop'),
    Controller('workshop'),
    __metadata("design:paramtypes", [WorkshopService])
], WorkshopController);
export { WorkshopController };
let WorkshopAdminController = class WorkshopAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) { return this.service.list(user.id, true); }
    review(user, id, dto) { return this.service.review(user, id, dto.status, dto.note); }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkshopAdminController.prototype, "list", null);
__decorate([
    Post(':id/review'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ReviewWorkshopItemDto]),
    __metadata("design:returntype", void 0)
], WorkshopAdminController.prototype, "review", null);
WorkshopAdminController = __decorate([
    ApiTags('admin-workshop'),
    Controller('admin/workshop'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [WorkshopService])
], WorkshopAdminController);
export { WorkshopAdminController };
//# sourceMappingURL=workshop.controller.js.map