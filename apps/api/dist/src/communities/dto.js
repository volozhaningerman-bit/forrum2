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
import { IsEnum, IsHexColor, IsOptional, IsString, Length, Matches } from 'class-validator';
import { NotifyLevel } from '../generated/prisma/client.js';
export class CreateCommunityDto {
    name;
    description;
    shortDescription;
    slug;
    parentSlug;
    accentColor;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 60),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 2000),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 180),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "shortDescription", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Matches(/^[a-z0-9-]+$/),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "slug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "parentSlug", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsHexColor(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "accentColor", void 0);
export class UpdateCommunitySubscriptionDto {
    notifyLevel;
}
__decorate([
    ApiPropertyOptional({ enum: NotifyLevel }),
    IsEnum(NotifyLevel),
    __metadata("design:type", String)
], UpdateCommunitySubscriptionDto.prototype, "notifyLevel", void 0);
//# sourceMappingURL=dto.js.map