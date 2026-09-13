import {Body,Controller,Get,Param,Post,Put,Query,UseGuards,ParseUUIDPipe} from '@nestjs/common';
import {WorkspaceService} from './workspace.service.js';
import {CategorySettingsDto,RestoreDto} from './workspace.dto.js';
import {SessionGuard} from '../auth/session.guard.js';
import {VerifiedGuard} from '../auth/verified.guard.js';
import {AdminGuard} from '../auth/admin.guard.js';
import {CurrentUser} from '../auth/current-user.js';
import type {User} from '../generated/prisma/client.js';
@Controller('admin/workspace') @UseGuards(SessionGuard,VerifiedGuard,AdminGuard)
export class WorkspaceController {
 constructor(private readonly service:WorkspaceService){}
 @Get('queues') queues(){return this.service.queues();}
 @Get('queue/:kind') queue(@Param('kind') kind:string,@Query('page') page?:string,@Query('state') state?:string,@Query('q') q?:string){return this.service.queue(kind,page,state,q);}
 @Get('categories') categories(){return this.service.categories();}
 @Put('categories/:id') category(@Param('id',ParseUUIDPipe) id:string,@Body() dto:CategorySettingsDto,@CurrentUser() user:User){return this.service.category(id,dto,user.id);}
 @Get('users/:username') user(@Param('username') username:string){return this.service.user(username);}
 @Get('journal') journal(@Query('page') page?:string,@Query('q') q?:string){return this.service.journal(page,q);}
 @Get('transactions') transactions(@Query('page') page?:string,@Query('q') q?:string){return this.service.transactions(page,q);}
 @Post('publications/:slug/restore') restore(@Param('slug') slug:string,@Body() dto:RestoreDto,@CurrentUser() user:User){return this.service.restore(slug,dto.reason,user.id);}
 @Post('diagnose') diagnose(){return this.service.diagnose();}
}
