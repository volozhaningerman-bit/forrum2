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
import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { InteractionType, ReviewVerdict } from '../generated/prisma/client.js';
export class CreateInteractionDto {
    targetUsername;
    type;
    title;
    description;
    publicationSlug;
    communitySlug;
    portfolioItemId;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 40),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "targetUsername", void 0);
__decorate([
    ApiProperty({ enum: InteractionType }),
    IsEnum(InteractionType),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(4, 140),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 2000),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(1, 180),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "publicationSlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(1, 100),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "communitySlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "portfolioItemId", void 0);
export class CancelInteractionDto {
    reason;
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 500),
    __metadata("design:type", String)
], CancelInteractionDto.prototype, "reason", void 0);
export class CreateProfileReviewDto {
    verdict;
    body;
    evidenceMediaId;
}
__decorate([
    ApiProperty({ enum: ReviewVerdict }),
    IsEnum(ReviewVerdict),
    __metadata("design:type", String)
], CreateProfileReviewDto.prototype, "verdict", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 2000),
    __metadata("design:type", String)
], CreateProfileReviewDto.prototype, "body", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateProfileReviewDto.prototype, "evidenceMediaId", void 0);
export class ModerateProfileReviewDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: ['PUBLISHED', 'REJECTED'] }),
    IsString(),
    __metadata("design:type", String)
], ModerateProfileReviewDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 1000),
    __metadata("design:type", String)
], ModerateProfileReviewDto.prototype, "note", void 0);
//# sourceMappingURL=dto.js.map