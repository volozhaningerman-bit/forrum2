import assert from 'node:assert/strict';
import test from 'node:test';
import { excerpt, stripBbcode } from '../src/common/text.js';

test('BBCode is removed from search excerpts', () => {
  const source = '[h2]Заголовок[/h2]\n[b]Важный[/b] текст и [url=https://forrum.local]ссылка[/url].';
  assert.equal(stripBbcode(source), 'Заголовок Важный текст и ссылка.');
  assert.equal(excerpt(source, 20), 'Заголовок Важный…');
});

test('images, colors and sizes do not leak markup into excerpts', () => {
  const source = '[color=red]Красный[/color] [size=large]текст[/size] [img=Фото]http://localhost:4000/v1/media/123/content[/img]';
  assert.equal(stripBbcode(source), 'Красный текст [Изображение]');
});
