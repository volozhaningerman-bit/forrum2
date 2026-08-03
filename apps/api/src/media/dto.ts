import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length, MaxLength } from 'class-validator';
import { MediaKind } from '../generated/prisma/client.js';

export class UploadMediaDto {
  @ApiProperty({ enum: MediaKind }) @IsEnum(MediaKind) kind!: MediaKind;
  @ApiProperty() @IsString() @Length(1, 160) originalName!: string;
  @ApiProperty({ description: 'Data URL изображения PNG, JPEG или WebP' })
  @IsString() @MaxLength(12_000_000) dataUrl!: string;
}
