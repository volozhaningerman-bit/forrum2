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
import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { UploadMediaDto } from './dto.js';
import { MediaService } from './media.service.js';
let MediaController = class MediaController {
    service;
    constructor(service) {
        this.service = service;
    }
    upload(user, dto) { return this.service.upload(user, dto); }
    list(user) { return this.service.list(user.id); }
    async content(id, variant, response) {
        const { asset, data } = await this.service.get(id, variant);
        response.type(asset.mimeType);
        response.setHeader('Content-Length', String(data.length));
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.send(data);
    }
};
__decorate([
    Post(),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UploadMediaDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "upload", null);
__decorate([
    Get(),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "list", null);
__decorate([
    Get(':id/content'),
    __param(0, Param('id')),
    __param(1, Query('variant')),
    __param(2, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "content", null);
MediaController = __decorate([
    ApiTags('media'),
    Controller('media'),
    __metadata("design:paramtypes", [MediaService])
], MediaController);
export { MediaController };
//# sourceMappingURL=media.controller.js.map