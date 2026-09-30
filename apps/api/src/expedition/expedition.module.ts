import { Module } from '@nestjs/common';
import { ExpeditionController } from './expedition.controller.js';
import { ExpeditionService } from './expedition.service.js';

@Module({
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
})
export class ExpeditionModule {}
