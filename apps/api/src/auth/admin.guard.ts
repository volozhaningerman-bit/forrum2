import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GlobalRole, type User } from '../generated/prisma/client.js';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest<{ user: User }>().user;
    if (user.role !== GlobalRole.ADMIN && user.role !== GlobalRole.OWNER) throw new ForbiddenException('Недостаточно прав');
    return true;
  }
}
