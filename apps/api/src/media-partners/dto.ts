import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { MediaPartnerStatus, MediaPartnerType } from '../generated/prisma/client.js';

export class ApplyMediaPartnerDto {
  @ApiProperty({ enum: MediaPartnerType })
  @IsEnum(MediaPartnerType)
  type!: MediaPartnerType;

  @ApiProperty()
  @IsString()
  @Length(2, 80)
  displayName!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 40)
  platform!: string;

  @ApiProperty()
  @IsUrl({ require_protocol: true, protocols: ['https'] })
  channelUrl!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 80)
  audienceText?: string;

  @ApiProperty()
  @IsString()
  @Length(20, 1500)
  description!: string;
}

export class ReviewMediaPartnerDto {
  @ApiProperty({ enum: [MediaPartnerStatus.ACTIVE, MediaPartnerStatus.REJECTED] })
  @IsEnum(MediaPartnerStatus)
  status!: MediaPartnerStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  note?: string;
}
