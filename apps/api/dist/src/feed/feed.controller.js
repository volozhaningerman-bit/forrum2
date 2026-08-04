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
import { UpdateFeedPreferencesDto } from './dto.js';
import { FeedService } from './feed.service.js';
const modes = ['for-you', 'subscriptions', 'all', 'popular', 'new', 'saved'];
let FeedController = class FeedController {
    service;
    constructor(service) {
        this.service = service;
    }
    preferences(user) { return this.service.preferences(user.id); }
    updatePreferences(user, dto) {
        return this.service.updatePreferences(user.id, dto);
    }
    hidePublication(id, user) { return this.service.hidePublication(user.id, id); }
    unhidePublication(id, user) { return this.service.unhidePublication(user.id, id); }
    clearHiddenPublications(user) { return this.service.clearHiddenPublications(user.id); }
    hideCommunity(slug, user) { return this.service.hideCommunity(user.id, slug); }
    unhideCommunity(slug, user) { return this.service.unhideCommunity(user.id, slug); }
    get(mode = 'for-you', user) {
        return this.service.get(modes.includes(mode) ? mode : 'for-you', user?.id);
    }
};
__decorate([
    Get('preferences'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "preferences", null);
__decorate([
    Patch('preferences'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateFeedPreferencesDto]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "updatePreferences", null);
__decorate([
    Post('hidden-publications/:id'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "hidePublication", null);
__decorate([
    Delete('hidden-publications/:id'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "unhidePublication", null);
__decorate([
    Delete('hidden-publications'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "clearHiddenPublications", null);
__decorate([
    Post('hidden-communities/:slug'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "hideCommunity", null);
__decorate([
    Delete('hidden-communities/:slug'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "unhideCommunity", null);
__decorate([
    Get(),
    UseGuards(OptionalSessionGuard),
    __param(0, Query('mode')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "get", null);
FeedController = __decorate([
    ApiTags('feed'),
    Controller('feed'),
    __metadata("design:paramtypes", [FeedService])
], FeedController);
export { FeedController };
//# sourceMappingURL=feed.controller.js.map