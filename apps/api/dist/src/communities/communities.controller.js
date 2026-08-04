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
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateCommunityDto, UpdateCommunitySubscriptionDto } from './dto.js';
import { CommunitiesService } from './communities.service.js';
let CommunitiesController = class CommunitiesController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) { return this.service.list(user?.id); }
    get(slug, user) { return this.service.get(slug, user?.id); }
    subscribe(slug, user) { return this.service.subscribe(slug, user.id); }
    unsubscribe(slug, user) { return this.service.unsubscribe(slug, user.id); }
    updateSubscription(slug, user, dto) {
        return this.service.updateSubscription(slug, user.id, dto.notifyLevel);
    }
    create(dto, user) { return this.service.create(dto, user.id); }
};
__decorate([
    Get(),
    UseGuards(OptionalSessionGuard),
    __param(0, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "list", null);
__decorate([
    Get(':slug'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('slug')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "get", null);
__decorate([
    Post(':slug/subscribe'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "subscribe", null);
__decorate([
    Delete(':slug/subscribe'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "unsubscribe", null);
__decorate([
    Patch(':slug/subscription'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, UpdateCommunitySubscriptionDto]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "updateSubscription", null);
__decorate([
    Post(),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCommunityDto, Object]),
    __metadata("design:returntype", void 0)
], CommunitiesController.prototype, "create", null);
CommunitiesController = __decorate([
    ApiTags('communities'),
    Controller('communities'),
    __metadata("design:paramtypes", [CommunitiesService])
], CommunitiesController);
export { CommunitiesController };
//# sourceMappingURL=communities.controller.js.map