import { Module } from '@nestjs/common';
import { TyuryagaService } from './tyuryaga.service';
import { TyuryagaController } from './tyuryaga.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TyuryagaController],
  providers: [TyuryagaService],
  exports: [TyuryagaService],
})
export class TyuryagaModule {}
