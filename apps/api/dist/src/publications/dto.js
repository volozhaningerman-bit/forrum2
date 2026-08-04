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
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PublicationFormat, PublicationType, ReactionType } from '../generated/prisma/client.js';
export class CreatePublicationDto {
    format;
    type;
    title;
    body;
    tags;
}
__decorate([
    ApiProperty({ enum: PublicationFormat }),
    IsEnum(PublicationFormat),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "format", void 0);
__decorate([
    ApiProperty({ enum: PublicationType }),
    IsEnum(PublicationType),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(3, 160),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 30000),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "body", void 0);
__decorate([
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    ArrayMaxSize(5),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreatePublicationDto.prototype, "tags", void 0);
export class UpdatePublicationDto {
    type;
    title;
    body;
    tags;
}
__decorate([
    ApiPropertyOptional({ enum: PublicationType }),
    IsOptional(),
    IsEnum(PublicationType),
    __metadata("design:type", String)
], UpdatePublicationDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(3, 160),
    __metadata("design:type", String)
], UpdatePublicationDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(2, 30000),
    __metadata("design:type", String)
], UpdatePublicationDto.prototype, "body", void 0);
__decorate([
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    ArrayMaxSize(5),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdatePublicationDto.prototype, "tags", void 0);
export class CreateCommentDto {
    body;
    parentId;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 8000),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "body", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "parentId", void 0);
export class ReactionDto {
    type;
}
__decorate([
    ApiProperty({ enum: ReactionType }),
    IsEnum(ReactionType),
    __metadata("design:type", String)
], ReactionDto.prototype, "type", void 0);
export class ReportDto {
    reason;
    details;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 100),
    __metadata("design:type", String)
], ReportDto.prototype, "reason", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 2000),
    __metadata("design:type", String)
], ReportDto.prototype, "details", void 0);
//# sourceMappingURL=dto.js.map