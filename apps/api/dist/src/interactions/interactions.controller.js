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
import { AdminGuard } from '../auth/admin.guard.js';
import { CancelInteractionDto, CreateInteractionDto, CreateProfileReviewDto, ModerateProfileReviewDto } from './dto.js';
import { InteractionsService } from './interactions.service.js';
let InteractionsController = class InteractionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) {
        return this.service.list(user.id);
    }
    create(user, dto) {
        return this.service.create(user.id, dto);
    }
    confirm(id, user) {
        return this.service.confirm(id, user.id);
    }
    complete(id, user) {
        return this.service.complete(id, user.id);
    }
    cancel(id, user, dto) {
        return this.service.cancel(id, user.id, dto.reason);
    }
    review(id, user, dto) {
        return this.service.review(id, user.id, dto.verdict, dto.body, dto.evidenceMediaId);
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "list", null);
__decorate([
    Post(),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateInteractionDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "create", null);
__decorate([
    Post(':id/confirm'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "confirm", null);
__decorate([
    Post(':id/complete'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "complete", null);
__decorate([
    Post(':id/cancel'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CancelInteractionDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "cancel", null);
__decorate([
    Post(':id/reviews'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateProfileReviewDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "review", null);
InteractionsController = __decorate([
    ApiTags('interactions'),
    Controller('interactions'),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [InteractionsService])
], InteractionsController);
export { InteractionsController };
let InteractionsAdminController = class InteractionsAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    list() {
        return this.service.reviewsForModeration();
    }
    moderate(id, user, dto) {
        return this.service.moderateReview(id, user.id, dto.status, dto.note);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InteractionsAdminController.prototype, "list", null);
__decorate([
    Post(':id/moderate'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ModerateProfileReviewDto]),
    __metadata("design:returntype", void 0)
], InteractionsAdminController.prototype, "moderate", null);
InteractionsAdminController = __decorate([
    ApiTags('admin-reviews'),
    Controller('admin/reviews'),
    UseGuards(SessionGuard, VerifiedGuard, AdminGuard),
    __metadata("design:paramtypes", [InteractionsService])
], InteractionsAdminController);
export { InteractionsAdminController };
//# sourceMappingURL=interactions.controller.js.map