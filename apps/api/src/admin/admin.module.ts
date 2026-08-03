import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { WalletModule } from '../wallet/wallet.module.js';
import { ModerationModule } from '../moderation/moderation.module.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
@Module({ imports: [AuthModule, WalletModule, ModerationModule], controllers: [AdminController], providers: [AdminService] })
export class AdminModule {}
