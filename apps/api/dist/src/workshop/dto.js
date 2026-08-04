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
import { WorkshopItemStatus, WorkshopItemType } from '../generated/prisma/client.js';
export class CreateWorkshopItemDto {
    type;
    title;
    description;
    previewMediaId;
}
__decorate([
    ApiProperty({ enum: WorkshopItemType }),
    IsEnum(WorkshopItemType),
    __metadata("design:type", String)
], CreateWorkshopItemDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 120),
    __metadata("design:type", String)
], CreateWorkshopItemDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 3000),
    __metadata("design:type", String)
], CreateWorkshopItemDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateWorkshopItemDto.prototype, "previewMediaId", void 0);
export class ReviewWorkshopItemDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: [WorkshopItemStatus.PUBLISHED, WorkshopItemStatus.REJECTED] }),
    IsEnum(WorkshopItemStatus),
    __metadata("design:type", String)
], ReviewWorkshopItemDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 1000),
    __metadata("design:type", String)
], ReviewWorkshopItemDto.prototype, "note", void 0);
//# sourceMappingURL=dto.js.map