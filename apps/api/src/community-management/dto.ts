import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityContentActionType, CommunityRoleType, CommunityStructureChangeType, TeamInviteStatus } from '../generated/prisma/client.js';

export class CreateCommunityReportDto {
  @ApiProperty() @IsDateString() periodStart!: string;
  @ApiProperty() @IsDateString() periodEnd!: string;
  @ApiProperty() @IsString() @Length(20, 3000) summary!: string;
  @ApiProperty() @IsString() @Length(5, 3000) achievements!: string;
  @ApiProperty() @IsString() @Length(5, 3000) problems!: string;
  @ApiProperty() @IsString() @Length(5, 3000) plans!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(0, 2000) treasuryNote?: string;
}

export class CreateStructureProposalDto {
  @ApiProperty({ enum: CommunityStructureChangeType }) @IsEnum(CommunityStructureChangeType) type!: CommunityStructureChangeType;
  @ApiProperty() @IsString() @Length(5, 140) title!: string;
  @ApiProperty() @IsString() @Length(20, 3000) description!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(2, 80) proposedName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() targetCommunitySlug?: string;
}

export class ResolveStructureProposalDto {
  @ApiProperty({ enum: ['APPROVED', 'REJECTED'] }) @IsString() status!: 'APPROVED' | 'REJECTED';
  @ApiProperty() @IsString() @Length(5, 1000) note!: string;
}

export class InviteCommunityRoleDto {
  @ApiProperty() @IsString() @Length(2, 40) username!: string;
  @ApiProperty({ enum: CommunityRoleType }) @IsEnum(CommunityRoleType) role!: CommunityRoleType;
  @ApiProperty() @IsString() @Length(5, 500) note!: string;
}

export class RespondRoleInviteDto {
  @ApiProperty({ enum: [TeamInviteStatus.ACCEPTED, TeamInviteStatus.DECLINED] })
  @IsEnum(TeamInviteStatus) status!: TeamInviteStatus;
}

export class CommunityContentActionDto {
  @ApiProperty({ enum: CommunityContentActionType }) @IsEnum(CommunityContentActionType) action!: CommunityContentActionType;
  @ApiProperty() @IsString() @Length(5, 500) note!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() targetCommunitySlug?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30) durationDays?: number;
}
