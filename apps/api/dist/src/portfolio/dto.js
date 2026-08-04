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
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { PortfolioItemKind, PortfolioItemStatus } from '../generated/prisma/client.js';
export class CreatePortfolioItemDto {
    kind;
    title;
    summary;
    description;
    communitySlug;
    publicationSlug;
    coverUrl;
    lookingForTeam;
    priceText;
    contactNote;
    links;
    status;
}
__decorate([
    ApiProperty({ enum: PortfolioItemKind }),
    IsEnum(PortfolioItemKind),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "kind", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(4, 120),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 280),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "summary", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(40, 8000),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(1, 100),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "communitySlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(1, 180),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "publicationSlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    IsUrl({ protocols: ['https'], require_protocol: true }),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "coverUrl", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePortfolioItemDto.prototype, "lookingForTeam", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 120),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "priceText", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 500),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "contactNote", void 0);
__decorate([
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    ArrayMaxSize(5),
    IsUrl({ protocols: ['https'], require_protocol: true }, { each: true }),
    __metadata("design:type", Array)
], CreatePortfolioItemDto.prototype, "links", void 0);
__decorate([
    ApiPropertyOptional({ enum: PortfolioItemStatus }),
    IsOptional(),
    IsEnum(PortfolioItemStatus),
    __metadata("design:type", String)
], CreatePortfolioItemDto.prototype, "status", void 0);
export class UpdatePortfolioItemDto extends CreatePortfolioItemDto {
}
//# sourceMappingURL=dto.js.map