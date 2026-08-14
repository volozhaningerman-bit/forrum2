import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser } from '../auth/current-user.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { PublicationsService } from './publications.service.js';

// FORRUM_TAG_STYLE_CONTROLLER_V15_10
@Controller('communities/:communitySlug/publications')
@UseGuards(SessionGuard, VerifiedGuard)
export class TagStylesController {
  constructor(private readonly service: PublicationsService) {}

  @Patch(':publicationSlug/tag-styles')
  styleTags(
    @CurrentUser() user: User,
    @Param('communitySlug') communitySlug: string,
    @Param('publicationSlug') publicationSlug: string,
    @Body() body: { styles?: Record<string, string> },
  ) {
    return this.service.styleTags(
      user.id,
      communitySlug,
      publicationSlug,
      body.styles,
    );
  }
}
