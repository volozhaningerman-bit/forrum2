import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { User } from '../generated/prisma/client.js';

@Injectable()
export class VerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest<{ user: User }>().user;
    if (!user?.emailVerifiedAt) throw new ForbiddenException('Сначала подтвердите почту');
    return true;
  }
}
