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
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CancelEventDto, CreateCommunityEventDto, EventAttendanceDto } from './dto.js';
import { EventsService } from './events.service.js';
let EventsController = class EventsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(user) { return this.service.list(user?.id); }
    get(id, user) { return this.service.get(id, user?.id); }
    create(user, dto) { return this.service.create(user, dto); }
    attendance(user, id, dto) { return this.service.attendance(user.id, id, dto.status); }
    cancel(user, id, dto) { return this.service.cancel(user, id, dto.reason); }
};
__decorate([
    Get(),
    UseGuards(OptionalSessionGuard),
    __param(0, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "list", null);
__decorate([
    Get(':id'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('id')),
    __param(1, OptionalUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "get", null);
__decorate([
    Post(),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateCommunityEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    Post(':id/attendance'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, EventAttendanceDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "attendance", null);
__decorate([
    Post(':id/cancel'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CancelEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "cancel", null);
EventsController = __decorate([
    ApiTags('events'),
    Controller('events'),
    __metadata("design:paramtypes", [EventsService])
], EventsController);
export { EventsController };
//# sourceMappingURL=events.controller.js.map