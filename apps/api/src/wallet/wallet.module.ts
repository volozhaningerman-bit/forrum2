import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { PromotionPublicController, WalletController } from './wallet.controller.js';
import { WalletService } from './wallet.service.js';
@Module({ imports: [AuthModule], controllers: [PromotionPublicController, WalletController], providers: [WalletService], exports: [WalletService] })
export class WalletModule {}
