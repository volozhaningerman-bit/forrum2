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
import { CancelPromotionDto, PromotionQuoteDto, PurchasePromotionDto } from './dto.js';
import { WalletService } from './wallet.service.js';
let WalletController = class WalletController {
    service;
    constructor(service) {
        this.service = service;
    }
    get(user) { return this.service.get(user.id); }
    quote(slug, dto) { return this.service.quote(slug, dto.type, dto.durationDays); }
    purchase(slug, user, dto) {
        return this.service.purchase(user.id, slug, dto.publicationSlug, dto.type, dto.durationDays);
    }
    cancel(id, user, dto) {
        return this.service.cancel(user.id, id, dto.reason);
    }
};
__decorate([
    Get('wallet'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "get", null);
__decorate([
    Post('communities/:slug/promotions/quote'),
    __param(0, Param('slug')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PromotionQuoteDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "quote", null);
__decorate([
    Post('communities/:slug/promotions'),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, PurchasePromotionDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "purchase", null);
__decorate([
    Post('promotions/:id/cancel'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CancelPromotionDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "cancel", null);
WalletController = __decorate([
    ApiTags('wallet'),
    Controller(),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [WalletService])
], WalletController);
export { WalletController };
//# sourceMappingURL=wallet.controller.js.map