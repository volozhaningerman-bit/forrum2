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
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityContentActionType, CommunityRoleType, CommunityStructureChangeType, TeamInviteStatus } from '../generated/prisma/client.js';
export class CreateCommunityReportDto {
    periodStart;
    periodEnd;
    summary;
    achievements;
    problems;
    plans;
    treasuryNote;
}
__decorate([
    ApiProperty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "periodStart", void 0);
__decorate([
    ApiProperty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "periodEnd", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 3000),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "summary", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 3000),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "achievements", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 3000),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "problems", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 3000),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "plans", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 2000),
    __metadata("design:type", String)
], CreateCommunityReportDto.prototype, "treasuryNote", void 0);
export class CreateStructureProposalDto {
    type;
    title;
    description;
    proposedName;
    targetCommunitySlug;
}
__decorate([
    ApiProperty({ enum: CommunityStructureChangeType }),
    IsEnum(CommunityStructureChangeType),
    __metadata("design:type", String)
], CreateStructureProposalDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 140),
    __metadata("design:type", String)
], CreateStructureProposalDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 3000),
    __metadata("design:type", String)
], CreateStructureProposalDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(2, 80),
    __metadata("design:type", String)
], CreateStructureProposalDto.prototype, "proposedName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateStructureProposalDto.prototype, "targetCommunitySlug", void 0);
export class ResolveStructureProposalDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: ['APPROVED', 'REJECTED'] }),
    IsString(),
    __metadata("design:type", String)
], ResolveStructureProposalDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 1000),
    __metadata("design:type", String)
], ResolveStructureProposalDto.prototype, "note", void 0);
export class InviteCommunityRoleDto {
    username;
    role;
    note;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 40),
    __metadata("design:type", String)
], InviteCommunityRoleDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ enum: CommunityRoleType }),
    IsEnum(CommunityRoleType),
    __metadata("design:type", String)
], InviteCommunityRoleDto.prototype, "role", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 500),
    __metadata("design:type", String)
], InviteCommunityRoleDto.prototype, "note", void 0);
export class RespondRoleInviteDto {
    status;
}
__decorate([
    ApiProperty({ enum: [TeamInviteStatus.ACCEPTED, TeamInviteStatus.DECLINED] }),
    IsEnum(TeamInviteStatus),
    __metadata("design:type", String)
], RespondRoleInviteDto.prototype, "status", void 0);
export class CommunityContentActionDto {
    action;
    note;
    targetCommunitySlug;
    durationDays;
}
__decorate([
    ApiProperty({ enum: CommunityContentActionType }),
    IsEnum(CommunityContentActionType),
    __metadata("design:type", String)
], CommunityContentActionDto.prototype, "action", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 500),
    __metadata("design:type", String)
], CommunityContentActionDto.prototype, "note", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CommunityContentActionDto.prototype, "targetCommunitySlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(30),
    __metadata("design:type", Number)
], CommunityContentActionDto.prototype, "durationDays", void 0);
//# sourceMappingURL=dto.js.map