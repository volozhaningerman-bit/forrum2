import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationPreferencesDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() publicationReplies?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() commentReplies?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() reactions?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() follows?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() wallPosts?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() messages?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() system?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() emailDigest?: boolean;
}
