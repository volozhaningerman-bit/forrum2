import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { TelegramController } from './telegram.controller.js';
import { TelegramService } from './telegram.service.js';

@Module({ imports: [AuthModule], controllers: [TelegramController], providers: [TelegramService], exports: [TelegramService] })
export class TelegramModule {}
