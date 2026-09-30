import { IsInt, Max, Min } from 'class-validator';

export class StartExpeditionDto {
  @IsInt()
  @Min(1)
  @Max(5)
  depth!: number;
}
