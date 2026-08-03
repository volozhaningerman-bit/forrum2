import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { UploadMediaDto } from './dto.js';
import { MediaService } from './media.service.js';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Post() @UseGuards(SessionGuard, VerifiedGuard)
  upload(@CurrentUser() user: User, @Body() dto: UploadMediaDto) { return this.service.upload(user, dto); }

  @Get() @UseGuards(SessionGuard)
  list(@CurrentUser() user: User) { return this.service.list(user.id); }

  @Get(':id/content')
  async content(@Param('id') id: string, @Query('variant') variant: string | undefined, @Res() response: Response) {
    const { asset, data } = await this.service.get(id, variant);
    response.type(asset.mimeType);
    response.setHeader('Content-Length', String(data.length));
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.send(data);
  }
}
