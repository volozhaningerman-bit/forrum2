import { IsString, Length, Matches } from 'class-validator';

export class TransferInventoryItemDto {
  @IsString()
  @Length(2, 32)
  @Matches(/^[a-zA-Z0-9_.-]+$/)
  username!: string;
}
