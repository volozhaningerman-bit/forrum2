import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { WorkshopItemStatus, WorkshopItemType } from '../generated/prisma/client.js';

export class CreateWorkshopItemDto {
  @ApiProperty({ enum: WorkshopItemType }) @IsEnum(WorkshopItemType) type!: WorkshopItemType;
  @ApiProperty() @IsString() @Length(3, 120) title!: string;
  @ApiProperty() @IsString() @Length(20, 3000) description!: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() previewMediaId?: string;
}

export class ReviewWorkshopItemDto {
  @ApiProperty({ enum: [WorkshopItemStatus.PUBLISHED, WorkshopItemStatus.REJECTED] }) @IsEnum(WorkshopItemStatus) status!: WorkshopItemStatus;
  @ApiProperty() @IsString() @Length(3, 1000) note!: string;
}
