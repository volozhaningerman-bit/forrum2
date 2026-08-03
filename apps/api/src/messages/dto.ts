import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class StartConversationDto {
  @ApiProperty() @IsString() @Matches(/^[a-zA-Z0-9_]+$/) username!: string;
  @ApiProperty() @IsString() @Length(1, 5000) body!: string;
}
export class SendMessageDto {
  @ApiProperty() @IsString() @Length(1, 5000) body!: string;
}
