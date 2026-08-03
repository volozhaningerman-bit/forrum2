import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFeedPreferencesDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() recommendationsEnabled?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() showReasons?: boolean;
}
