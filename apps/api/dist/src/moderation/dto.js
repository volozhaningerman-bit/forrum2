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
import { IsEnum, IsString, Length } from 'class-validator';
import { AppealStatus } from '../generated/prisma/client.js';
export class CreateAppealDto {
    body;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 2000),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "body", void 0);
export class ResolveAppealDto {
    status;
    note;
}
__decorate([
    ApiProperty({ enum: [AppealStatus.ACCEPTED, AppealStatus.REJECTED] }),
    IsEnum(AppealStatus),
    __metadata("design:type", String)
], ResolveAppealDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(3, 1000),
    __metadata("design:type", String)
], ResolveAppealDto.prototype, "note", void 0);
//# sourceMappingURL=dto.js.map