import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateWallPostDto {
  @ApiProperty()
  @IsString()
  @Length(2, 5000)
  body!: string;
}

export class SendGiftDto {
  @ApiProperty()
  @IsUUID()
  workshopItemId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 300)
  message?: string;
}
