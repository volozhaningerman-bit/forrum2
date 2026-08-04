var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ForbiddenException, Injectable } from '@nestjs/common';
let VerifiedGuard = class VerifiedGuard {
    canActivate(context) {
        const user = context.switchToHttp().getRequest().user;
        if (!user?.emailVerifiedAt)
            throw new ForbiddenException('Сначала подтвердите почту');
        return true;
    }
};
VerifiedGuard = __decorate([
    Injectable()
], VerifiedGuard);
export { VerifiedGuard };
//# sourceMappingURL=verified.guard.js.map