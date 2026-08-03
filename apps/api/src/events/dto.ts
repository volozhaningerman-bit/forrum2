import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityEventFormat, EventAttendanceStatus } from '../generated/prisma/client.js';

export class CreateCommunityEventDto {
  @ApiProperty() @IsString() communitySlug!: string;
  @ApiProperty() @IsString() @Length(5, 160) title!: string;
  @ApiProperty() @IsString() @Length(20, 5000) description!: string;
  @ApiProperty({ enum: CommunityEventFormat }) @IsEnum(CommunityEventFormat) format!: CommunityEventFormat;
  @ApiProperty() @IsDateString() startsAt!: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() endsAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 240) location?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(2) @Max(100000) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() publish?: boolean;
}

export class EventAttendanceDto {
  @ApiProperty({ enum: EventAttendanceStatus }) @IsEnum(EventAttendanceStatus) status!: EventAttendanceStatus;
}

export class CancelEventDto {
  @ApiProperty() @IsString() @Length(5, 500) reason!: string;
}
