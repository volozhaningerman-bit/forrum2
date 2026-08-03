import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '../generated/prisma/client.js';

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  return ctx.switchToHttp().getRequest<{ user: User }>().user;
});

export const OptionalUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User | null => {
  return ctx.switchToHttp().getRequest<{ user?: User }>().user ?? null;
});
