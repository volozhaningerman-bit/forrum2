import { BadRequestException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';

function codeHash(value: string) { return createHash('sha256').update(value.trim().toUpperCase()).digest('hex'); }
function createCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(8);
  return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join('');
}

type TelegramUpdate = { update_id: number; message?: { chat: { id: number }; from?: { id: number; username?: string }; text?: string } };

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private active = false;
  private offset = 0;
  private readonly token: string;
  private readonly polling: boolean;

  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {
    this.token = config.get('TELEGRAM_BOT_TOKEN', '').trim();
    this.polling = config.get('TELEGRAM_POLLING_ENABLED', 'false') === 'true';
  }

  onModuleInit() {
    if (this.token && this.polling) { this.active = true; void this.pollLoop(); }
  }
  onModuleDestroy() { this.active = false; }

  private async api<T>(method: string, payload: Record<string, unknown> = {}): Promise<T> {
    if (!this.token) throw new BadRequestException('Telegram-бот не настроен');
    const response = await fetch(`https://api.telegram.org/bot${this.token}/${method}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
    });
    const data = await response.json() as { ok: boolean; result: T; description?: string };
    if (!data.ok) throw new Error(data.description || `Telegram API: ${method}`);
    return data.result;
  }

  private async send(chatId: string, text: string) {
    return this.api('sendMessage', { chat_id: chatId, text, disable_web_page_preview: true });
  }

  private async pollLoop() {
    while (this.active) {
      try {
        const updates = await this.api<TelegramUpdate[]>('getUpdates', { offset: this.offset, timeout: 25, allowed_updates: ['message'] });
        for (const update of updates) {
          this.offset = Math.max(this.offset, update.update_id + 1);
          await this.handleUpdate(update);
        }
      } catch (error) {
        console.error('Telegram polling error', error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  private async handleUpdate(update: TelegramUpdate) {
    const message = update.message;
    const text = message?.text?.trim();
    const telegramUserId = message?.from?.id;
    const chatId = message?.chat.id;
    if (!text || !telegramUserId || !chatId) return;
    if (text.startsWith('/start')) {
      const code = text.split(/\s+/)[1]?.toUpperCase();
      if (!code) { await this.send(String(chatId), 'Откройте настройки FORRUM, создайте код привязки и отправьте /start КОД.'); return; }
      const record = await this.prisma.telegramLinkCode.findUnique({ where: { codeHash: codeHash(code) } });
      if (!record || record.usedAt || record.expiresAt <= new Date()) { await this.send(String(chatId), 'Код недействителен или истёк. Создайте новый в настройках FORRUM.'); return; }
      await this.prisma.$transaction([
        this.prisma.telegramLink.upsert({
          where: { userId: record.userId },
          update: { telegramUserId: String(telegramUserId), chatId: String(chatId), telegramUsername: message.from?.username, enabled: true, linkedAt: new Date() },
          create: { userId: record.userId, telegramUserId: String(telegramUserId), chatId: String(chatId), telegramUsername: message.from?.username },
        }),
        this.prisma.telegramLinkCode.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
        this.prisma.notificationPreference.upsert({ where: { userId: record.userId }, create: { userId: record.userId, telegramEnabled: true }, update: { telegramEnabled: true } }),
      ]);
      await this.send(String(chatId), 'FORRUM подключён. Здесь будут приходить выбранные уведомления. Настройки можно изменить на сайте.');
      return;
    }
    if (text === '/unlink') {
      const link = await this.prisma.telegramLink.findUnique({ where: { telegramUserId: String(telegramUserId) } });
      if (link) await this.prisma.$transaction([
        this.prisma.telegramLink.delete({ where: { userId: link.userId } }),
        this.prisma.notificationPreference.updateMany({ where: { userId: link.userId }, data: { telegramEnabled: false } }),
      ]);
      await this.send(String(chatId), 'Telegram отвязан от FORRUM.');
      return;
    }
    await this.send(String(chatId), 'Команды: /start КОД — привязать FORRUM, /unlink — отключить уведомления.');
  }

  async status(userId: string) {
    const link = await this.prisma.telegramLink.findUnique({ where: { userId } });
    return { configured: Boolean(this.token), polling: this.polling, linked: Boolean(link), link: link ? { telegramUsername: link.telegramUsername, linkedAt: link.linkedAt, enabled: link.enabled } : null };
  }

  async createLinkCode(userId: string) {
    if (!this.token) throw new BadRequestException('Сначала укажите TELEGRAM_BOT_TOKEN в .env');
    const code = createCode();
    await this.prisma.$transaction([
      this.prisma.telegramLinkCode.deleteMany({ where: { userId, usedAt: null } }),
      this.prisma.telegramLinkCode.create({ data: { userId, codeHash: codeHash(code), expiresAt: new Date(Date.now() + 10 * 60 * 1000) } }),
    ]);
    return { code, command: `/start ${code}`, expiresInMinutes: 10, botUsername: this.config.get('TELEGRAM_BOT_USERNAME', '') || null };
  }

  async unlink(userId: string) {
    await this.prisma.$transaction([
      this.prisma.telegramLink.deleteMany({ where: { userId } }),
      this.prisma.notificationPreference.updateMany({ where: { userId }, data: { telegramEnabled: false } }),
    ]);
    return { ok: true };
  }

  async deliverNotification(notificationId: string) {
    if (!this.token) return;
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: { include: { telegramLink: true, notificationPreference: true } } },
    });
    const link = notification?.user.telegramLink;
    if (!notification || !link?.enabled || !notification.user.notificationPreference?.telegramEnabled) return;
    const site = this.config.get('WEB_URL', 'http://localhost:3000').replace(/\/$/, '');
    try {
      await this.send(link.chatId, `${notification.title}\n${notification.body}\n${site}${notification.href}`);
      await this.prisma.telegramLink.update({ where: { userId: notification.userId }, data: { lastDeliveryAt: new Date() } });
    } catch (error) { console.error('Telegram delivery failed', error); }
  }

  async sendTest(userId: string) {
    const link = await this.prisma.telegramLink.findUnique({ where: { userId } });
    if (!link) throw new BadRequestException('Telegram не привязан');
    await this.send(link.chatId, 'Тестовое уведомление FORRUM доставлено.');
    return { ok: true };
  }
}
