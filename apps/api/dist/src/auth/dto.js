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
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { WallPrivacy } from '../generated/prisma/client.js';
const passwordPattern = /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).+$/u;
const passwordMessage = 'Пароль должен содержать хотя бы одну букву и одну цифру';
const trimOptional = ({ value }) => typeof value === 'string' ? value.trim() : value;
export class RegisterDto {
    email;
    username;
    displayName;
    password;
}
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsEmail({}, { message: 'Укажите корректную почту' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsString(),
    Length(3, 24, { message: 'Имя пользователя должно содержать от 3 до 24 символов' }),
    Matches(/^[a-zA-Z0-9_]+$/, { message: 'В имени пользователя разрешены латинские буквы, цифры и подчёркивание' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim()),
    IsString(),
    Length(2, 60, { message: 'Отображаемое имя должно содержать от 2 до 60 символов' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "displayName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }),
    Matches(passwordPattern, { message: passwordMessage }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
export class UsernameAvailabilityDto {
    username;
}
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsString(),
    Length(3, 24, { message: 'Имя пользователя должно содержать от 3 до 24 символов' }),
    Matches(/^[a-zA-Z0-9_]+$/, { message: 'Разрешены латинские буквы, цифры и подчёркивание' }),
    __metadata("design:type", String)
], UsernameAvailabilityDto.prototype, "username", void 0);
export class LoginDto {
    email;
    password;
}
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsEmail({}, { message: 'Укажите корректную почту' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
export class ResendVerificationDto {
    email;
}
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsEmail({}, { message: 'Укажите корректную почту' }),
    __metadata("design:type", String)
], ResendVerificationDto.prototype, "email", void 0);
export class UpdateProfileDto {
    displayName;
    bio;
    website;
    location;
    wallPrivacy;
    showFavorites;
    showSubscriptions;
}
__decorate([
    ApiPropertyOptional(),
    Transform(trimOptional),
    IsOptional(),
    IsString(),
    Length(2, 60, { message: 'Отображаемое имя должно содержать от 2 до 60 символов' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "displayName", void 0);
__decorate([
    ApiPropertyOptional(),
    Transform(trimOptional),
    IsOptional(),
    IsString(),
    Length(0, 500, { message: 'Описание не должно превышать 500 символов' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    ApiPropertyOptional(),
    Transform(trimOptional),
    IsOptional(),
    IsString(),
    Length(0, 200, { message: 'Адрес сайта не должен превышать 200 символов' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "website", void 0);
__decorate([
    ApiPropertyOptional(),
    Transform(trimOptional),
    IsOptional(),
    IsString(),
    Length(0, 100, { message: 'Местоположение не должно превышать 100 символов' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ enum: WallPrivacy }),
    IsOptional(),
    IsEnum(WallPrivacy, { message: 'Неизвестный режим приватности стены' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "wallPrivacy", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "showFavorites", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "showSubscriptions", void 0);
export class RequestPasswordResetDto {
    email;
}
__decorate([
    ApiProperty(),
    Transform(({ value }) => String(value).trim().toLowerCase()),
    IsEmail({}, { message: 'Укажите корректную почту' }),
    __metadata("design:type", String)
], RequestPasswordResetDto.prototype, "email", void 0);
export class ResetPasswordDto {
    token;
    password;
}
__decorate([
    ApiProperty(),
    IsString(),
    Length(20, 300, { message: 'Некорректный токен восстановления' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }),
    Matches(passwordPattern, { message: passwordMessage }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
export class ChangePasswordDto {
    currentPassword;
    newPassword;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }),
    Matches(passwordPattern, { message: passwordMessage }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=dto.js.map