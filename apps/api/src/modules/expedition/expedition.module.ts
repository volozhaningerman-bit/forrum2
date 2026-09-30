import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { ExpeditionController } from './expedition.controller.js';
import { ExpeditionService } from './expedition.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
  exports: [ExpeditionService],
})
export class ExpeditionModule {}
