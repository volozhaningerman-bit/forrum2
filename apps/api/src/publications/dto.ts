import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PublicationFormat, PublicationType, ReactionType } from '../generated/prisma/client.js';

export class CreatePublicationDto {
  @ApiProperty({ enum: PublicationFormat }) @IsEnum(PublicationFormat) format!: PublicationFormat;
  @ApiProperty({ enum: PublicationType }) @IsEnum(PublicationType) type!: PublicationType;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(3, 160) title?: string;
  @ApiProperty() @IsString() @Length(2, 30000) body!: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @ArrayMaxSize(5) @IsString({ each: true }) tags?: string[];
}

export class UpdatePublicationDto {
  @ApiPropertyOptional({ enum: PublicationType }) @IsOptional() @IsEnum(PublicationType) type?: PublicationType;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(3, 160) title?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(2, 30000) body?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @ArrayMaxSize(5) @IsString({ each: true }) tags?: string[];
}

export class CreateCommentDto {
  @ApiProperty() @IsString() @Length(2, 8000) body!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() parentId?: string;
}

export class ReactionDto {
  @ApiProperty({ enum: ReactionType }) @IsEnum(ReactionType) type!: ReactionType;
}

export class ReportDto {
  @ApiProperty() @IsString() @Length(3, 100) reason!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 2000) details?: string;
}
