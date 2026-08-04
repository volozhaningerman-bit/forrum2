
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { SharePublicationToTelegramDto } from './dto.js';
import { TelegramService } from './telegram.service.js';

@ApiTags('telegram')
@Controller('telegram')
@UseGuards(SessionGuard, VerifiedGuard)
export class TelegramController {
  constructor(private readonly service: TelegramService) {}

  @Get('status')
  status(@CurrentUser() user: User) {
    return this.service.status(user.id);
  }

  @Post('link-code')
  linkCode(@CurrentUser() user: User) {
    return this.service.createLinkCode(user.id);
  }

  @Delete('link')
  unlink(@CurrentUser() user: User) {
    return this.service.unlink(user.id);
  }

  @Post('test')
  test(@CurrentUser() user: User) {
    return this.service.sendTest(user.id);
  }

  @Get('channels')
  channels(@CurrentUser() user: User) {
    return this.service.channels(user.id);
  }

  @Delete('channels/:id')
  removeChannel(@Param('id') id: string, @CurrentUser() user: User) {
    return this.service.removeChannel(user.id, id);
  }

  @Get('share/publication/:slug/preview')
  previewPublication(@Param('slug') slug: string) {
    return this.service.publicationPreview(slug);
  }

  @Post('share/publication/:slug')
  sharePublication(
    @Param('slug') slug: string,
    @CurrentUser() user: User,
    @Body() dto: SharePublicationToTelegramDto,
  ) {
    return this.service.sharePublication(user.id, slug, dto);
  }
}
