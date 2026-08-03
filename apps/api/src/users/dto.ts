import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateWallPostDto {
  @ApiProperty() @IsString() @Length(2, 2000) body!: string;
}
