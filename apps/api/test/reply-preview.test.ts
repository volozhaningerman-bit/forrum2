import test from 'node:test';
import assert from 'node:assert/strict';
import { replyExcerpt } from '../src/common/text.js';

test('reply preview preserves the reply but omits nested quotes and spoilers', () => {
 assert.equal(replyExcerpt('[quote]старое [quote]вложенное[/quote] сообщение[/quote] [b]Мой ответ[/b] [spoiler]секрет[/spoiler]'), 'Мой ответ');
 assert.equal(replyExcerpt('[spoiler]секрет [spoiler]вложенный[/spoiler] всё ещё секрет[/spoiler] Видно'), 'Видно');
 assert.equal(replyExcerpt('Видно [spoiler]не закрыт'), 'Видно');
 assert.equal(replyExcerpt('[url=https://example.com]ссылка[/url]'), 'ссылка');
 assert.equal(replyExcerpt('[spoiler]тайна[/spoiler]'), 'Ответ с вложением или скрытым текстом');
 assert(replyExcerpt('длинный ответ '.repeat(100)).length <= 160);
});
