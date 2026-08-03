import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { CommunityManagementController } from './community-management.controller.js';
import { CommunityManagementService } from './community-management.service.js';

@Module({ imports: [AuthModule], controllers: [CommunityManagementController], providers: [CommunityManagementService], exports: [CommunityManagementService] })
export class CommunityManagementModule {}
