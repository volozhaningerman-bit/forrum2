import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { CommunitiesModule } from '../communities/communities.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { GovernanceAdminController, GovernanceController } from './governance.controller.js';
import { GovernanceService } from './governance.service.js';

@Module({ imports: [AuthModule, CommunitiesModule, NotificationsModule], controllers: [GovernanceController, GovernanceAdminController], providers: [GovernanceService], exports: [GovernanceService] })
export class GovernanceModule {}
