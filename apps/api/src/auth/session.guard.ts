import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{ cookies?: Record<string, string>; user?: unknown }>();
    const name = this.config.get('SESSION_COOKIE_NAME', 'forrum_session');
    const user = await this.auth.userFromSession(request.cookies?.[name]);
    if (!user) throw new UnauthorizedException('Требуется вход');
    request.user = user;
    return true;
  }
}
