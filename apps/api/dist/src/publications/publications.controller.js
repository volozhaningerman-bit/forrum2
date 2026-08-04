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
import { CreateCommentDto, CreatePublicationDto, ReactionDto, ReportDto, UpdatePublicationDto } from './dto.js';
import { PublicationsService } from './publications.service.js';
let PublicationsController = class PublicationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    news() { return this.service.listNews(); }
    announcements() { return this.service.listAnnouncements(); }
    create(slug, user, dto) {
        return this.service.create(slug, user.id, dto);
    }
    saved(user) { return this.service.saved(user.id); }
    get(slug, user, trackView = '1') { return this.service.get(slug, user, trackView !== '0'); }
    update(slug, user, dto) {
        return this.service.update(slug, user, dto);
    }
    remove(slug, user) { return this.service.remove(slug, user); }
    comment(slug, user, dto) {
        return this.service.comment(slug, user.id, dto);
    }
    react(slug, user, dto) {
        return this.service.react(slug, user.id, dto.type);
    }
    reactComment(id, user, dto) {
        return this.service.reactComment(id, user.id, dto.type);
    }
    bookmark(slug, user) { return this.service.toggleBookmark(slug, user.id); }
    reportComment(id, user, dto) {
        return this.service.reportComment(id, user.id, dto);
    }
    report(slug, user, dto) {
        return this.service.report(slug, user.id, dto);
    }
};
__decorate([
    Get('news'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "news", null);
__decorate([
    Get('announcements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "announcements", null);
__decorate([
    Post('communities/:slug/publications'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreatePublicationDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "create", null);
__decorate([
    Get('publications/saved'),
    UseGuards(SessionGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "saved", null);
__decorate([
    Get('publications/:slug'),
    UseGuards(OptionalSessionGuard),
    __param(0, Param('slug')),
    __param(1, OptionalUser()),
    __param(2, Query('trackView')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "get", null);
__decorate([
    Patch('publications/:slug'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, UpdatePublicationDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "update", null);
__decorate([
    Delete('publications/:slug'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "remove", null);
__decorate([
    Post('publications/:slug/comments'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateCommentDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "comment", null);
__decorate([
    Post('publications/:slug/reaction'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReactionDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "react", null);
__decorate([
    Post('comments/:id/reaction'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReactionDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "reactComment", null);
__decorate([
    Post('publications/:slug/bookmark'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "bookmark", null);
__decorate([
    Post('comments/:id/report'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReportDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "reportComment", null);
__decorate([
    Post('publications/:slug/report'),
    UseGuards(SessionGuard, VerifiedGuard),
    __param(0, Param('slug')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReportDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "report", null);
PublicationsController = __decorate([
    ApiTags('publications'),
    Controller(),
    __metadata("design:paramtypes", [PublicationsService])
], PublicationsController);
export { PublicationsController };
//# sourceMappingURL=publications.controller.js.map