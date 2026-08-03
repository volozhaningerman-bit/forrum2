import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { WallPrivacy } from '../generated/prisma/client.js';

const passwordPattern = /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).+$/u;
const passwordMessage = 'Пароль должен содержать хотя бы одну букву и одну цифру';
const trimOptional = ({ value }: { value: unknown }) => typeof value === 'string' ? value.trim() : value;

export class RegisterDto {
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsEmail({}, { message: 'Укажите корректную почту' }) email!: string;
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsString() @Length(3, 24, { message: 'Имя пользователя должно содержать от 3 до 24 символов' }) @Matches(/^[a-zA-Z0-9_]+$/, { message: 'В имени пользователя разрешены латинские буквы, цифры и подчёркивание' }) username!: string;
  @ApiProperty() @Transform(({ value }) => String(value).trim()) @IsString() @Length(2, 60, { message: 'Отображаемое имя должно содержать от 2 до 60 символов' }) displayName!: string;
  @ApiProperty() @IsString() @Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }) @Matches(passwordPattern, { message: passwordMessage }) password!: string;
}

export class UsernameAvailabilityDto {
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsString() @Length(3, 24, { message: 'Имя пользователя должно содержать от 3 до 24 символов' }) @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Разрешены латинские буквы, цифры и подчёркивание' }) username!: string;
}

export class LoginDto {
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsEmail({}, { message: 'Укажите корректную почту' }) email!: string;
  @ApiProperty() @IsString() password!: string;
}

export class ResendVerificationDto {
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsEmail({}, { message: 'Укажите корректную почту' }) email!: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional() @Transform(trimOptional) @IsOptional() @IsString() @Length(2, 60, { message: 'Отображаемое имя должно содержать от 2 до 60 символов' }) displayName?: string;
  @ApiPropertyOptional() @Transform(trimOptional) @IsOptional() @IsString() @Length(0, 500, { message: 'Описание не должно превышать 500 символов' }) bio?: string;
  @ApiPropertyOptional() @Transform(trimOptional) @IsOptional() @IsString() @Length(0, 200, { message: 'Адрес сайта не должен превышать 200 символов' }) website?: string;
  @ApiPropertyOptional() @Transform(trimOptional) @IsOptional() @IsString() @Length(0, 100, { message: 'Местоположение не должно превышать 100 символов' }) location?: string;
  @ApiPropertyOptional({ enum: WallPrivacy }) @IsOptional() @IsEnum(WallPrivacy, { message: 'Неизвестный режим приватности стены' }) wallPrivacy?: WallPrivacy;
}

export class RequestPasswordResetDto {
  @ApiProperty() @Transform(({ value }) => String(value).trim().toLowerCase()) @IsEmail({}, { message: 'Укажите корректную почту' }) email!: string;
}

export class ResetPasswordDto {
  @ApiProperty() @IsString() @Length(20, 300, { message: 'Некорректный токен восстановления' }) token!: string;
  @ApiProperty() @IsString() @Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }) @Matches(passwordPattern, { message: passwordMessage }) password!: string;
}

export class ChangePasswordDto {
  @ApiProperty() @IsString() currentPassword!: string;
  @ApiProperty() @IsString() @Length(10, 128, { message: 'Пароль должен содержать от 10 до 128 символов' }) @Matches(passwordPattern, { message: passwordMessage }) newPassword!: string;
}
