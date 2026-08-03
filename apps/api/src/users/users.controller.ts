import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '../generated/prisma/client.js';
import { CurrentUser, OptionalUser } from '../auth/current-user.js';
import { OptionalSessionGuard } from '../auth/optional-session.guard.js';
import { SessionGuard } from '../auth/session.guard.js';
import { VerifiedGuard } from '../auth/verified.guard.js';
import { CreateWallPostDto } from './dto.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me/following') @UseGuards(SessionGuard)
  following(@CurrentUser() user: User) { return this.service.following(user.id); }

  @Get('me/activity') @UseGuards(SessionGuard)
  activity(@CurrentUser() user: User) { return this.service.activity(user.id); }

  @Get(':username') @UseGuards(OptionalSessionGuard)
  get(@Param('username') username: string, @OptionalUser() viewer: User | null) {
    return this.service.getProfile(username, viewer?.id);
  }

  @Post(':username/follow') @UseGuards(SessionGuard, VerifiedGuard)
  follow(@Param('username') username: string, @CurrentUser() user: User) { return this.service.follow(username, user.id); }

  @Delete(':username/follow') @UseGuards(SessionGuard, VerifiedGuard)
  unfollow(@Param('username') username: string, @CurrentUser() user: User) { return this.service.unfollow(username, user.id); }

  @Post(':username/wall') @UseGuards(SessionGuard, VerifiedGuard)
  wall(@Param('username') username: string, @CurrentUser() user: User, @Body() dto: CreateWallPostDto) {
    return this.service.createWallPost(username, user.id, dto.body);
  }

  @Delete(':username/wall/:postId') @UseGuards(SessionGuard, VerifiedGuard)
  deleteWallPost(@Param('username') username: string, @Param('postId') postId: string, @CurrentUser() user: User) {
    return this.service.deleteWallPost(username, postId, user.id);
  }
}
