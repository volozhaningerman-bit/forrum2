import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { AppealStatus } from '../generated/prisma/client.js';

export class CreateAppealDto {
  @ApiProperty() @IsString() @Length(20, 2000) body!: string;
}

export class ResolveAppealDto {
  @ApiProperty({ enum: [AppealStatus.ACCEPTED, AppealStatus.REJECTED] }) @IsEnum(AppealStatus) status!: AppealStatus;
  @ApiProperty() @IsString() @Length(3, 1000) note!: string;
}
