var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { ModerationAdminController, ModerationController } from './moderation.controller.js';
import { ModerationService } from './moderation.service.js';
let ModerationModule = class ModerationModule {
};
ModerationModule = __decorate([
    Module({ imports: [AuthModule, NotificationsModule], controllers: [ModerationController, ModerationAdminController], providers: [ModerationService], exports: [ModerationService] })
], ModerationModule);
export { ModerationModule };
//# sourceMappingURL=moderation.module.js.map