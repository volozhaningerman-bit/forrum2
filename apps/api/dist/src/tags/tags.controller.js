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
import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { TagsService } from './tags.service.js';
let TagsController = class TagsController {
    service;
    constructor(service) {
        this.service = service;
    }
    subscriptions(user) { return this.service.subscriptions(user.id); }
    get(slug, user) { return this.service.get(slug, user?.id); }
    subscribe(slug, user) { return this.service.subscribe(slug, user.id); }
    unsubscribe(slug, user) { return this.service.unsubscribe(slug, user.id); }
};
__decorate([
    Get('subscriptions'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "subscriptions", null);
__decorate([
    Get(':slug'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('slug')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "get", null);
__decorate([
    Post(':slug/subscribe'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "subscribe", null);
__decorate([
    Delete(':slug/subscribe'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "unsubscribe", null);
TagsController = __decorate([
    ApiTags('tags'),
    Controller('tags'),
    __metadata("design:paramtypes", [TagsService])
], TagsController);
export { TagsController };
//# sourceMappingURL=tags.controller.js.map