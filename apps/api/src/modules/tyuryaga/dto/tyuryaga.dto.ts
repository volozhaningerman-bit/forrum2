import { IsNotEmpty, IsString } from 'class-validator';

export class ExecuteQuestDto {
  @IsString()
  @IsNotEmpty()
  questId: string;
}

export class StartBossDto {
  @IsString()
  @IsNotEmpty()
  bossId: string;
}

export class HitBossDto {
  @IsString()
  @IsNotEmpty()
  weaponId: string;
}

export class BuyTattooDto {
  @IsString()
  @IsNotEmpty()
  tattooId: string;
}
