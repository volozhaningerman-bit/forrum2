import { Module } from '@nestjs/common';
import { TyuryagaService } from './tyuryaga.service.js';
import { TyuryagaController } from './tyuryaga.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [TyuryagaController],
  providers: [TyuryagaService],
  exports: [TyuryagaService],
})
export class TyuryagaModule {}
