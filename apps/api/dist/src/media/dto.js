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
import { IsEnum, IsString, Length, MaxLength } from 'class-validator';
import { MediaKind } from '../generated/prisma/client.js';
export class UploadMediaDto {
    kind;
    originalName;
    dataUrl;
}
__decorate([
    ApiProperty({ enum: MediaKind }),
    IsEnum(MediaKind),
    __metadata("design:type", String)
], UploadMediaDto.prototype, "kind", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(1, 160),
    __metadata("design:type", String)
], UploadMediaDto.prototype, "originalName", void 0);
__decorate([
    ApiProperty({ description: 'Data URL изображения PNG, JPEG или WebP' }),
    IsString(),
    MaxLength(12_000_000),
    __metadata("design:type", String)
], UploadMediaDto.prototype, "dataUrl", void 0);
//# sourceMappingURL=dto.js.map