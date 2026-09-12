import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { smtpOptions } from './smtp-options.js';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  private async send(message: nodemailer.SendMailOptions) {
    try {
      const transporter = nodemailer.createTransport(smtpOptions(this.config));
      await transporter.sendMail(message);
    } catch {
      // Do not log SMTP credentials, recipient addresses or verification tokens.
      this.logger.error('Mail delivery failed; check SMTP configuration and provider availability');
      throw new ServiceUnavailableException('Не удалось отправить письмо. Попробуйте повторить отправку позже.');
    }
  }

  async sendVerification(email: string, token: string) {
    const url = `${this.config.get('WEB_URL', 'http://localhost:3000')}/verify-email?token=${encodeURIComponent(token)}`;
    await this.send({
      from: this.config.get('SMTP_FROM', 'FORRUM <noreply@forrum.local>'),
      to: email,
      subject: 'Подтвердите почту FORRUM',
      text: `Подтвердите почту: ${url}\n\nБез подтверждения аккаунт может только читать.`,
      html: `<h2>Подтвердите почту FORRUM</h2><p>После подтверждения можно публиковать, отвечать, подписываться и голосовать.</p><p><a href="${url}">Подтвердить почту</a></p><p>Без подтверждения аккаунт может только читать.</p>`,
    });
  }
  async sendPasswordReset(email: string, token: string) {
    const url = `${this.config.get('WEB_URL', 'http://localhost:3000')}/reset-password?token=${encodeURIComponent(token)}`;
    await this.send({
      from: this.config.get('SMTP_FROM', 'FORRUM <noreply@forrum.local>'),
      to: email,
      subject: 'Восстановление пароля FORRUM',
      text: `Ссылка для смены пароля: ${url}\n\nОна действует 60 минут. Если запрос сделали не вы, ничего не предпринимайте.`,
      html: `<h2>Восстановление пароля FORRUM</h2><p><a href="${url}">Создать новый пароль</a></p><p>Ссылка действует 60 минут. Если запрос сделали не вы, ничего не предпринимайте.</p>`,
    });
  }

}
