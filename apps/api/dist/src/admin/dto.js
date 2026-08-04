var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityRoleType, ReportStatus } from '../generated/prisma/client.js';
export class ResolveReportDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: [ReportStatus.RESOLVED, ReportStatus.REJECTED] }),
    IsEnum(ReportStatus),
    __metadata("design:type", String)
], ResolveReportDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ required: false }),
    IsOptional(),
    IsString(),
    Length(0, 500),
    __metadata("design:type", String)
], ResolveReportDto.prototype, "note", void 0);
export class HidePublicationDto {
    reason;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 500),
    __metadata("design:type", String)
], HidePublicationDto.prototype, "reason", void 0);
export class PromotionSettingsDto {
    pinLimit;
    pinBasePricePerDay;
    pinDemandPercentPerOccupied;
    boostLimit;
    boostBasePricePerDay;
    boostDemandPercentPerOccupied;
}
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "pinLimit", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(1000000),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "pinBasePricePerDay", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(0),
    Max(500),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "pinDemandPercentPerOccupied", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(1000),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "boostLimit", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(1000000),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "boostBasePricePerDay", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(0),
    Max(500),
    __metadata("design:type", Number)
], PromotionSettingsDto.prototype, "boostDemandPercentPerOccupied", void 0);
export class GrantCommunityRoleDto {
    username;
    communitySlug;
    role;
    note;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 40),
    __metadata("design:type", String)
], GrantCommunityRoleDto.prototype, "username", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(1, 100),
    __metadata("design:type", String)
], GrantCommunityRoleDto.prototype, "communitySlug", void 0);
__decorate([
    ApiProperty({ enum: CommunityRoleType }),
    IsEnum(CommunityRoleType),
    __metadata("design:type", String)
], GrantCommunityRoleDto.prototype, "role", void 0);
__decorate([
    ApiProperty({ required: false }),
    IsOptional(),
    IsString(),
    Length(0, 500),
    __metadata("design:type", String)
], GrantCommunityRoleDto.prototype, "note", void 0);
export class EndCommunityRoleDto {
    note;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 500),
    __metadata("design:type", String)
], EndCommunityRoleDto.prototype, "note", void 0);
export class RefundPromotionDto {
    reason;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 500),
    __metadata("design:type", String)
], RefundPromotionDto.prototype, "reason", void 0);
//# sourceMappingURL=dto.js.map