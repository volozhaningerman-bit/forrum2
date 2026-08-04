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
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { SharePublicationToTelegramDto } from './dto.js';
import { TelegramService } from './telegram.service.js';
let TelegramController = class TelegramController {
    service;
    constructor(service) {
        this.service = service;
    }
    status(user) {
        return this.service.status(user.id);
    }
    linkCode(user) {
        return this.service.createLinkCode(user.id);
    }
    unlink(user) {
        return this.service.unlink(user.id);
    }
    test(user) {
        return this.service.sendTest(user.id);
    }
    channels(user) {
        return this.service.channels(user.id);
    }
    removeChannel(id, user) {
        return this.service.removeChannel(user.id, id);
    }
    previewPublication(slug) {
        return this.service.publicationPreview(slug);
    }
    sharePublication(slug, user, dto) {
        return this.service.sharePublication(user.id, slug, dto);
    }
};
__decorate([
    Get('status'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "status", null);
__decorate([
    Post('link-code'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "linkCode", null);
__decorate([
    Delete('link'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "unlink", null);
__decorate([
    Post('test'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "test", null);
__decorate([
    Get('channels'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "channels", null);
__decorate([
    Delete('channels/:id'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "removeChannel", null);
__decorate([
    Get('share/publication/:slug/preview'),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "previewPublication", null);
__decorate([
    Post('share/publication/:slug'),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, SharePublicationToTelegramDto]),
    __metadata("design:returntype", void 0)
], TelegramController.prototype, "sharePublication", null);
TelegramController = __decorate([
    ApiTags('telegram'),
    Controller('telegram'),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [TelegramService])
], TelegramController);
export { TelegramController };
//# sourceMappingURL=telegram.controller.js.map