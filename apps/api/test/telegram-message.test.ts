import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTelegramPublicationHtml } from '../src/telegram/telegram-message.js';

test('Telegram publication carries the 4RRUM origin and discussion link', () => {
  assert.equal(
    buildTelegramPublicationHtml({
      title: '<Запуск>',
      excerpt: 'Первый & полезный пост',
      publicationUrl: 'https://4rrum.ru/p/start?a=1&b=2',
    }),
    [
      '<b>&lt;Запуск&gt;</b>',
      'Первый &amp; полезный пост',
      '<a href="https://4rrum.ru/p/start?a=1&amp;b=2">Создано на 4RRUM · Обсудить →</a>',
    ].join('\n\n'),
  );
});
