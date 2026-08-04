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
import { ApplyMediaPartnerDto, ReviewMediaPartnerDto } from './dto.js';
import { MediaPartnersService } from './media-partners.service.js';
let MediaPartnersController = class MediaPartnersController {
    service;
    constructor(service) {
        this.service = service;
    }
    list() { return this.service.publicList(); }
    apply(user, dto) {
        return this.service.apply(user.id, dto);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaPartnersController.prototype, "list", null);
__decorate([
    Post('apply'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ApplyMediaPartnerDto]),
    __metadata("design:returntype", void 0)
], MediaPartnersController.prototype, "apply", null);
MediaPartnersController = __decorate([
    ApiTags('media-partners'),
    Controller('media/partners'),
    __metadata("design:paramtypes", [MediaPartnersService])
], MediaPartnersController);
export { MediaPartnersController };
let MediaPartnersAdminController = class MediaPartnersAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    list() { return this.service.adminList(); }
    review(id, user, dto) {
        return this.service.review(id, user.id, dto.status, dto.note);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaPartnersAdminController.prototype, "list", null);
__decorate([
    Post(':id/review'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReviewMediaPartnerDto]),
    __metadata("design:returntype", void 0)
], MediaPartnersAdminController.prototype, "review", null);
MediaPartnersAdminController = __decorate([
    ApiTags('admin-media-partners'),
    Controller('admin/media-partners'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [MediaPartnersService])
], MediaPartnersAdminController);
export { MediaPartnersAdminController };
//# sourceMappingURL=media-partners.controller.js.map