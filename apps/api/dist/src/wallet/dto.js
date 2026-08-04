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
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { PromotionType } from '../generated/prisma/client.js';
export class PromotionQuoteDto {
    type;
    durationDays;
}
__decorate([
    ApiProperty({ enum: PromotionType }),
    IsEnum(PromotionType),
    __metadata("design:type", String)
], PromotionQuoteDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(30),
    __metadata("design:type", Number)
], PromotionQuoteDto.prototype, "durationDays", void 0);
export class PurchasePromotionDto extends PromotionQuoteDto {
    publicationSlug;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], PurchasePromotionDto.prototype, "publicationSlug", void 0);
export class CancelPromotionDto {
    reason;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 300),
    __metadata("design:type", String)
], CancelPromotionDto.prototype, "reason", void 0);
export class GrantBalanceDto {
    username;
    amount;
    description;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], GrantBalanceDto.prototype, "username", void 0);
__decorate([
    ApiProperty(),
    IsInt(),
    Min(1),
    Max(10000000),
    __metadata("design:type", Number)
], GrantBalanceDto.prototype, "amount", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 200),
    __metadata("design:type", String)
], GrantBalanceDto.prototype, "description", void 0);
//# sourceMappingURL=dto.js.map