
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class SharePublicationToTelegramDto {
  @ApiProperty()
  @IsUUID()
  channelId!: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  includeImage!: boolean;
}
