import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsHexColor, IsOptional, IsString, Length, Matches } from 'class-validator';
import { NotifyLevel } from '../generated/prisma/client.js';

export class CreateCommunityDto {
  @ApiProperty() @IsString() @Length(2, 60) name!: string;
  @ApiProperty() @IsString() @Length(20, 2000) description!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 180) shortDescription?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Matches(/^[a-z0-9-]+$/) slug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() parentSlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsHexColor() accentColor?: string;
}

export class UpdateCommunitySubscriptionDto {
  @ApiPropertyOptional({ enum: NotifyLevel }) @IsEnum(NotifyLevel) notifyLevel!: NotifyLevel;
}
