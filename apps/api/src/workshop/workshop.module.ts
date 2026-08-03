import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { WorkshopAdminController, WorkshopController } from './workshop.controller.js';
import { WorkshopService } from './workshop.service.js';

@Module({ imports: [AuthModule], controllers: [WorkshopController, WorkshopAdminController], providers: [WorkshopService] })
export class WorkshopModule {}
