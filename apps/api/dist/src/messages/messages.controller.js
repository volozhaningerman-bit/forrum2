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
import { SendMessageDto, StartConversationDto } from './dto.js';
import { MessagesService } from './messages.service.js';
let MessagesController = class MessagesController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) { return this.service.list(user.id); }
    unreadCount(user) { return this.service.unreadCount(user.id); }
    start(user, dto) { return this.service.start(user.id, dto.username, dto.body); }
    get(id, user) { return this.service.get(id, user.id); }
    send(id, user, dto) { return this.service.send(id, user.id, dto.body); }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "list", null);
__decorate([
    Get('unread-count'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "unreadCount", null);
__decorate([
    Post(),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, StartConversationDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "start", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "get", null);
__decorate([
    Post(':id'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, SendMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "send", null);
MessagesController = __decorate([
    ApiTags('messages'),
    Controller('messages'),
    UseGuards(SessionGuard, VerifiedGuard),
    __metadata("design:paramtypes", [MessagesService])
], MessagesController);
export { MessagesController };
//# sourceMappingURL=messages.controller.js.map