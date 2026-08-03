import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { PromotionType } from '../generated/prisma/client.js';

export class PromotionQuoteDto {
  @ApiProperty({ enum: PromotionType }) @IsEnum(PromotionType) type!: PromotionType;
  @ApiProperty() @IsInt() @Min(1) @Max(30) durationDays!: number;
}
export class PurchasePromotionDto extends PromotionQuoteDto {
  @ApiProperty() @IsString() publicationSlug!: string;
}
export class CancelPromotionDto {
  @ApiProperty() @IsString() @Length(3, 300) reason!: string;
}
export class GrantBalanceDto {
  @ApiProperty() @IsString() username!: string;
  @ApiProperty() @IsInt() @Min(1) @Max(10000000) amount!: number;
  @ApiProperty() @IsString() @Length(3, 200) description!: string;
}
