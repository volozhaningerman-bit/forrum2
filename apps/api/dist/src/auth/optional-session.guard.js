var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
let OptionalSessionGuard = class OptionalSessionGuard {
    auth;
    config;
    constructor(auth, config) {
        this.auth = auth;
        this.config = config;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
        request.user = await this.auth.userFromSession(request.cookies?.[name]) ?? undefined;
        return true;
    }
};
OptionalSessionGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService, ConfigService])
], OptionalSessionGuard);
export { OptionalSessionGuard };
//# sourceMappingURL=optional-session.guard.js.map