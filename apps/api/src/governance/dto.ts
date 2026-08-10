import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsIn, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { PollKind, ProposalStatus } from '../generated/prisma/client.js';

export class CreateProposalDto {
  @ApiProperty() @IsString() @Length(2, 80) name!: string;
  @ApiProperty() @IsString() @Length(30, 3000) description!: string;
  @ApiProperty() @IsString() @Length(10, 2000) initialTopics!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 100) parentSlug?: string;
  @ApiPropertyOptional({ enum: ['YES', 'MAYBE', 'NO'] }) @IsOptional() @IsIn(['YES', 'MAYBE', 'NO']) curatorInterest?: string;
}

export class ResolveProposalDto {
  @ApiProperty({ enum: [ProposalStatus.APPROVED, ProposalStatus.REJECTED] }) @IsEnum(ProposalStatus) status!: ProposalStatus;
  @ApiProperty() @IsString() @Length(3, 1000) note!: string;
}

export class CreatePollDto {
  @ApiProperty() @IsString() @Length(5, 160) title!: string;
  @ApiProperty() @IsString() @Length(10, 3000) description!: string;
  @ApiProperty({ enum: PollKind }) @IsEnum(PollKind) kind!: PollKind;
  @ApiProperty({ type: [String] }) @IsArray() @ArrayMinSize(2) @ArrayMaxSize(8) @IsString({ each: true }) options!: string[];
  @ApiProperty() @IsDateString() closesAt!: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(1000000) quorum?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(365) minAccountAgeDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() requireSubscription?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() allowAdvisory?: boolean;
}

export class ClosePollDto {
  @ApiProperty() @IsString() @Length(5, 2000) resultNote!: string;
}

export class CastVoteDto {
  @ApiProperty() @IsString() optionId!: string;
}
export class CreateCuratorApplicationDto {
  @ApiProperty() @IsString() @Length(1, 100) communitySlug!: string;
  @ApiProperty() @IsString() @Length(20, 2000) motivation!: string;
  @ApiProperty() @IsString() @Length(20, 2000) plan!: string;
}
