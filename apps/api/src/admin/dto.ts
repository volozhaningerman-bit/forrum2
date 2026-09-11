import { Matches as MatchesVersion } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMaxSize, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityRoleType, ReportStatus } from '../generated/prisma/client.js';

export class ResolveReportDto {
  @ApiProperty({ enum: [ReportStatus.RESOLVED, ReportStatus.REJECTED] }) @IsEnum(ReportStatus) status!: ReportStatus;
  @ApiProperty({ required: false }) @IsOptional() @IsString() @Length(0, 500) note?: string;
}

export class HidePublicationDto {
  @ApiProperty() @IsString() @Length(3, 500) reason!: string;
}
export class PromotionSettingsDto {
  @ApiProperty() @IsInt() @Min(1) @Max(100) pinLimit!: number;
  @ApiProperty() @IsInt() @Min(1) @Max(1000000) pinBasePricePerDay!: number;
  @ApiProperty() @IsInt() @Min(0) @Max(500) pinDemandPercentPerOccupied!: number;
  @ApiProperty() @IsInt() @Min(1) @Max(1000) boostLimit!: number;
  @ApiProperty() @IsInt() @Min(1) @Max(1000000) boostBasePricePerDay!: number;
  @ApiProperty() @IsInt() @Min(0) @Max(500) boostDemandPercentPerOccupied!: number;
}

export class GrantCommunityRoleDto {
  @ApiProperty() @IsString() @Length(2, 40) username!: string;
  @ApiProperty() @IsString() @Length(1, 100) communitySlug!: string;
  @ApiProperty({ enum: CommunityRoleType }) @IsEnum(CommunityRoleType) role!: CommunityRoleType;
  @ApiProperty({ required: false }) @IsOptional() @IsString() @Length(0, 500) note?: string;
}

export class EndCommunityRoleDto {
  @ApiProperty() @IsString() @Length(3, 500) note!: string;
}

export class RefundPromotionDto {
  @ApiProperty() @IsString() @Length(5, 500) reason!: string;
}

export class HomeBannersDto {
 @IsArray() @ArrayMaxSize(2) banners!: unknown[];
}

export class AiTaxonomyDto { @MatchesVersion(/^[a-f0-9]{64}$/) version!: string; }
