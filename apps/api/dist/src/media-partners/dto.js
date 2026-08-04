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
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { MediaPartnerStatus, MediaPartnerType } from '../generated/prisma/client.js';
export class ApplyMediaPartnerDto {
    type;
    displayName;
    platform;
    channelUrl;
    audienceText;
    description;
}
__decorate([
    ApiProperty({ enum: MediaPartnerType }),
    IsEnum(MediaPartnerType),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 80),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "displayName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(2, 40),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "platform", void 0);
__decorate([
    ApiProperty(),
    IsUrl({ require_protocol: true, protocols: ['https'] }),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "channelUrl", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 80),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "audienceText", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 1500),
    __metadata("design:type", String)
], ApplyMediaPartnerDto.prototype, "description", void 0);
export class ReviewMediaPartnerDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: [MediaPartnerStatus.ACTIVE, MediaPartnerStatus.REJECTED] }),
    IsEnum(MediaPartnerStatus),
    __metadata("design:type", String)
], ReviewMediaPartnerDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 1000),
    __metadata("design:type", String)
], ReviewMediaPartnerDto.prototype, "note", void 0);
//# sourceMappingURL=dto.js.map