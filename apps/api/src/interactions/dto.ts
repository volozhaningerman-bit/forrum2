import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { InteractionType, ReviewVerdict } from '../generated/prisma/client.js';

export class CreateInteractionDto {
  @ApiProperty() @IsString() @Length(2, 40) targetUsername!: string;
  @ApiProperty({ enum: InteractionType }) @IsEnum(InteractionType) type!: InteractionType;
  @ApiProperty() @IsString() @Length(4, 140) title!: string;
  @ApiProperty() @IsString() @Length(10, 2000) description!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 180) publicationSlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 100) communitySlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() portfolioItemId?: string;
}

export class CancelInteractionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 500) reason?: string;
}

export class CreateProfileReviewDto {
  @ApiProperty({ enum: ReviewVerdict }) @IsEnum(ReviewVerdict) verdict!: ReviewVerdict;
  @ApiProperty() @IsString() @Length(10, 2000) body!: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() evidenceMediaId?: string;
}
