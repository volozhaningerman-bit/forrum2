var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
let MailService = class MailService {
    config;
    transporter;
    constructor(config) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: config.get('SMTP_HOST', 'localhost'),
            port: Number(config.get('SMTP_PORT', 1025)),
            secure: false,
        });
    }
    async sendVerification(email, token) {
        const url = `${this.config.get('WEB_URL', 'http://localhost:3000')}/verify-email?token=${encodeURIComponent(token)}`;
        await this.transporter.sendMail({
            from: this.config.get('SMTP_FROM', 'FORRUM <noreply@forrum.local>'),
            to: email,
            subject: 'Подтвердите почту FORRUM',
            text: `Подтвердите почту: ${url}\n\nБез подтверждения аккаунт может только читать.`,
            html: `<h2>Подтвердите почту FORRUM</h2><p>После подтверждения можно публиковать, отвечать, подписываться и голосовать.</p><p><a href="${url}">Подтвердить почту</a></p><p>Без подтверждения аккаунт может только читать.</p>`,
        });
    }
    async sendPasswordReset(email, token) {
        const url = `${this.config.get('WEB_URL', 'http://localhost:3000')}/reset-password?token=${encodeURIComponent(token)}`;
        await this.transporter.sendMail({
            from: this.config.get('SMTP_FROM', 'FORRUM <noreply@forrum.local>'),
            to: email,
            subject: 'Восстановление пароля FORRUM',
            text: `Ссылка для смены пароля: ${url}\n\nОна действует 60 минут. Если запрос сделали не вы, ничего не предпринимайте.`,
            html: `<h2>Восстановление пароля FORRUM</h2><p><a href="${url}">Создать новый пароль</a></p><p>Ссылка действует 60 минут. Если запрос сделали не вы, ничего не предпринимайте.</p>`,
        });
    }
};
MailService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map