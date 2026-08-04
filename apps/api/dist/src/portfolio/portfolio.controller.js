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
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto.js';
import { PortfolioService } from './portfolio.service.js';
let PortfolioController = class PortfolioController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(kind, owner) { return this.service.list(kind, owner); }
    mine(user) { return this.service.mine(user.id); }
    get(id, user) { return this.service.get(id, user?.id); }
    create(user, dto) { return this.service.create(user.id, dto); }
    update(user, id, dto) { return this.service.update(user, id, dto); }
    archive(user, id) { return this.service.archive(user, id); }
};
__decorate([
    Get(),
    UseGuards(OptionalSessionGuard),
    __param(0, Query('kind')),
    __param(1, Query('owner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "list", null);
__decorate([
    Get('me'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "mine", null);
__decorate([
    Get(':id'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('id')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "get", null);
__decorate([
    Post(),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePortfolioItemDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "create", null);
__decorate([
    Patch(':id'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdatePortfolioItemDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "archive", null);
PortfolioController = __decorate([
    ApiTags('portfolio'),
    Controller('portfolio'),
    __metadata("design:paramtypes", [PortfolioService])
], PortfolioController);
export { PortfolioController };
//# sourceMappingURL=portfolio.controller.js.map