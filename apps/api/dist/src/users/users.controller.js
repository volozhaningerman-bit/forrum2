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
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateWallPostDto, SendGiftDto } from './dto.js';
import { UsersService } from './users.service.js';
let UsersController = class UsersController {
    service;
    constructor(service) {
        this.service = service;
    }
    following(user) { return this.service.following(user.id); }
    activity(user) { return this.service.activity(user.id); }
    get(username, viewer) {
        return this.service.getProfile(username, viewer?.id);
    }
    follow(username, user) { return this.service.follow(username, user.id); }
    unfollow(username, user) { return this.service.unfollow(username, user.id); }
    wall(username, user, dto) {
        return this.service.createWallPost(username, user.id, dto.body);
    }
    gift(username, user, dto) {
        return this.service.sendGift(username, user.id, dto.workshopItemId, dto.message);
    }
    deleteWallPost(username, postId, user) {
        return this.service.deleteWallPost(username, postId, user.id);
    }
};
__decorate([
    Get('me/following'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "following", null);
__decorate([
    Get('me/activity'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "activity", null);
__decorate([
    Get(':username'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('username')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "get", null);
__decorate([
    Post(':username/follow'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('username')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "follow", null);
__decorate([
    Delete(':username/follow'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('username')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unfollow", null);
__decorate([
    Post(':username/wall'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('username')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateWallPostDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "wall", null);
__decorate([
    Post(':username/gifts'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('username')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, SendGiftDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "gift", null);
__decorate([
    Delete(':username/wall/:postId'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('username')),
    __param(1, Param('postId')),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteWallPost", null);
UsersController = __decorate([
    ApiTags('users'),
    Controller('users'),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map