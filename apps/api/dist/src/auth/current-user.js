import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((_data, ctx) => {
    return ctx.switchToHttp().getRequest().user;
});
export const OptionalUser = createParamDecorator((_data, ctx) => {
    return ctx.switchToHttp().getRequest().user ?? null;
});
//# sourceMappingURL=current-user.js.map