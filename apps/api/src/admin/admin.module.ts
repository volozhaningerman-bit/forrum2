import { WorkspaceService } from './workspace.service.js';
import { WorkspaceController } from './workspace.controller.js';
import { AiTaxonomyService } from './ai-taxonomy.service.js';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { WalletModule } from '../wallet/wallet.module.js';
import { ModerationModule } from '../moderation/moderation.module.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
@Module({ imports: [AuthModule, WalletModule, ModerationModule], controllers: [AdminController, WorkspaceController], providers: [AdminService, AiTaxonomyService, WorkspaceService] })
export class AdminModule {}
