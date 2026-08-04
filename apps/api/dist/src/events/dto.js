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
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommunityEventFormat, EventAttendanceStatus } from '../generated/prisma/client.js';
export class CreateCommunityEventDto {
    communitySlug;
    title;
    description;
    format;
    startsAt;
    endsAt;
    location;
    capacity;
    publish;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "communitySlug", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 160),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 5000),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ enum: CommunityEventFormat }),
    IsEnum(CommunityEventFormat),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "format", void 0);
__decorate([
    ApiProperty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "startsAt", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "endsAt", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Length(0, 240),
    __metadata("design:type", String)
], CreateCommunityEventDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(2),
    Max(100000),
    __metadata("design:type", Number)
], CreateCommunityEventDto.prototype, "capacity", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateCommunityEventDto.prototype, "publish", void 0);
export class EventAttendanceDto {
    status;
}
__decorate([
    ApiProperty({ enum: EventAttendanceStatus }),
    IsEnum(EventAttendanceStatus),
    __metadata("design:type", String)
], EventAttendanceDto.prototype, "status", void 0);
export class CancelEventDto {
    reason;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(5, 500),
    __metadata("design:type", String)
], CancelEventDto.prototype, "reason", void 0);
//# sourceMappingURL=dto.js.map