var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { PollKind, ProposalStatus } from '../generated/prisma/client.js';
export class CreateProposalDto {
    name;
    description;
    initialTopics;
    parentSlug;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 80),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(30, 3000),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "description", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 2000),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "initialTopics", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(1, 100),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "parentSlug", void 0);
export class ResolveProposalDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: [ProposalStatus.APPROVED, ProposalStatus.REJECTED] }),
    IsEnum(ProposalStatus),
    __metadata("design:type", String)
], ResolveProposalDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 1000),
    __metadata("design:type", String)
], ResolveProposalDto.prototype, "note", void 0);
export class CreatePollDto {
    title;
    description;
    kind;
    options;
    closesAt;
    quorum;
    minAccountAgeDays;
    requireSubscription;
    allowAdvisory;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 160),
    __metadata("design:type", String)
], CreatePollDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 3000),
    __metadata("design:type", String)
], CreatePollDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ enum: PollKind }),
    IsEnum(PollKind),
    __metadata("design:type", String)
], CreatePollDto.prototype, "kind", void 0);
__decorate([
    ApiProperty({ type: [String] }),
    IsArray(),
    ArrayMinSize(2),
    ArrayMaxSize(8),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreatePollDto.prototype, "options", void 0);
__decorate([
    ApiProperty(),
    IsDateString(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "closesAt", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(1000000),
    __metadata("design:type", Number)
], CreatePollDto.prototype, "quorum", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(365),
    __metadata("design:type", Number)
], CreatePollDto.prototype, "minAccountAgeDays", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePollDto.prototype, "requireSubscription", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePollDto.prototype, "allowAdvisory", void 0);
export class ClosePollDto {
    resultNote;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 2000),
    __metadata("design:type", String)
], ClosePollDto.prototype, "resultNote", void 0);
export class CastVoteDto {
    optionId;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CastVoteDto.prototype, "optionId", void 0);
//# sourceMappingURL=dto.js.map