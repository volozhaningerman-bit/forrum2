import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { PortfolioItemKind, PortfolioItemStatus } from '../generated/prisma/client.js';

export class CreatePortfolioItemDto {
  @ApiProperty({ enum: PortfolioItemKind }) @IsEnum(PortfolioItemKind) kind!: PortfolioItemKind;
  @ApiProperty() @IsString() @Length(4, 120) title!: string;
  @ApiProperty() @IsString() @Length(20, 280) summary!: string;
  @ApiProperty() @IsString() @Length(40, 8000) description!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 100) communitySlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 180) publicationSlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @IsUrl({ protocols: ['https'], require_protocol: true }) coverUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() lookingForTeam?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 120) priceText?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 500) contactNote?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @ArrayMaxSize(5) @IsUrl({ protocols: ['https'], require_protocol: true }, { each: true }) links?: string[];
  @ApiPropertyOptional({ enum: PortfolioItemStatus }) @IsOptional() @IsEnum(PortfolioItemStatus) status?: PortfolioItemStatus;
}

export class UpdatePortfolioItemDto extends CreatePortfolioItemDto {}
