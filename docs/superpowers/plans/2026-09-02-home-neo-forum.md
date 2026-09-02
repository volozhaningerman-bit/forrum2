# 4RRUM Neo-Forum Home 20.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить только главную страницу 4RRUM в презентабельную «цифровую редакцию» с живой форумной механикой, честными состояниями и изолированным визуальным языком 20.0.

**Architecture:** Главная получает корневой scope `.forrum-home-v20`, а все новые стили живут в отдельном `home-v20.css`, импортированном после старого каскада. Поведение остаётся в существующих компонентах `components/home`; новая вычислимая логика «Пульса темы» добавляется в чистую модель и тестируется без React. Шапка и альтернативный логотип меняются только при наличии главной через `body:has(.forrum-home-v20)`.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, CSS, Node.js `node:test`, существующие static/UX/accessibility проверки.

**Spec:** `docs/superpowers/specs/2026-09-02-home-neo-forum-design.md`

## Global Constraints

- Новый визуальный язык применяется только на главной; остальные маршруты не меняются визуально.
- Не изменять API, Prisma, ранжирование, права доступа и маршруты.
- Не показывать выдуманные эфиры, услуги, пользователей, даты, статусы или метрики.
- Сохранять дерево категорий, плотные строки тем, анимированный поиск и обе темы.
- Не добавлять SaaS-карточность, большие скругления, сильный blur, градиентное свечение и декоративный шум.
- Любое движение отключается через `prefers-reduced-motion`.
- Смысловой текст не меньше 12 px на десктопе и 13 px на мобильном.

---

## File Structure

- `apps/web/app/home-v20.css` — изолированные токены, композиция, темы, состояния и адаптивность главной.
- `apps/web/app/layout.tsx` — импорт нового CSS после `globals.css`; разметка layout не меняется.
- `apps/web/components/home-dashboard.tsx` — корневой marker v20 и текущая композиция главной.
- `apps/web/components/site-header.tsx` — альтернативный Neo-Forum SVG рядом с legacy-знаком; CSS выбирает его только на главной.
- `apps/web/components/home/model.ts` — чистая функция вычисления достоверного состояния «Пульс темы».
- `apps/web/components/home/types.ts` — тип `TopicPulse` и минимальные поля для представления статуса.
- `apps/web/components/home/popular-topics-panel.tsx` — метка пульса и уточнённая правая зона статистики.
- `apps/web/components/home/community-tree.tsx` — служебная подпись и доступные зоны раскрытия дерева.
- `apps/web/components/home/discovery-panels.tsx` — содержательные честные fallback-состояния «Медиа» и «Услуг».
- `apps/web/components/home/activity-panel.tsx` — редакционная подача живого потока без изменения источника данных.
- `apps/web/components/home/forrum-news-panel.tsx` — первая новость как ведущий материал, остальные как компактные строки.
- `apps/web/test/home-model.test.ts` — unit-тесты новой чистой логики.
- `scripts/home-v20-check.mjs` — структурный контракт v20 и защита от утечки стилей.
- `.github/workflows/validate-home-19-1.yml` — запуск контракта v20 вместе с существующими проверками ветки.

---

### Task 1: Защитный контракт и изоляция v20

**Files:**
- Create: `scripts/home-v20-check.mjs`
- Create: `apps/web/app/home-v20.css`
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/components/home-dashboard.tsx`
- Modify: `.github/workflows/validate-home-19-1.yml`

**Interfaces:**
- Consumes: корневой класс `forrum-home-v191` и существующий импорт `globals.css`.
- Produces: `.forrum-home-v20`, `data-home-reference="v20"`, CSS-файл после legacy-каскада и команда `node scripts/home-v20-check.mjs`.

- [ ] **Step 1: Написать падающий структурный контракт**

Создать `scripts/home-v20-check.mjs`, который читает `layout.tsx`, `home-dashboard.tsx`, `home-v20.css`, проверяет импорт после `globals.css`, единственный marker v20, наличие светлых/тёмных токенов и запрещает голые селекторы `.header`, `.brand`, `.forrum-home-v16__panel` без home scope.

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = readFileSync('apps/web/app/layout.tsx', 'utf8');
const dashboard = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = readFileSync('apps/web/app/home-v20.css', 'utf8');

assert.match(layout, /import '\.\/globals\.css';[\s\S]*import '\.\/home-v20\.css';/);
assert.equal((dashboard.match(/forrum-home-v20/g) ?? []).length, 1);
assert.match(dashboard, /data-home-reference="v20"/);
assert.match(css, /\.forrum-home-v20\s*\{/);
assert.match(css, /body:has\(\.forrum-home-v20\)/);
assert.match(css, /html\.dark[\s\S]*\.forrum-home-v20/);
assert.doesNotMatch(css, /^\s*\.(?:header|brand|forrum-home-v16__panel)\b/gm);

console.log('Home v20 structural contract passed.');
```

- [ ] **Step 2: Запустить контракт и убедиться в правильном падении**

Run: `node scripts/home-v20-check.mjs`

Expected: FAIL, потому что `home-v20.css` ещё отсутствует либо marker v20 ещё не добавлен.

- [ ] **Step 3: Добавить минимальную изоляцию**

Создать CSS с базовыми scoped-токенами, импортировать его после `globals.css`, заменить root marker на:

```tsx
className="forrum-home-v16 forrum-home-v19 forrum-home-v191 forrum-home-v20"
data-home-reference="v20"
```

Добавить `node scripts/home-v20-check.mjs` в workflow перед static-check.

- [ ] **Step 4: Проверить контракт и регрессии**

Run: `node scripts/home-v20-check.mjs && npm run validate:ux && npm run validate:a11y`

Expected: контракт, UX и accessibility завершаются с exit code 0.

- [ ] **Step 5: Закоммитить изоляцию**

```bash
git add scripts/home-v20-check.mjs apps/web/app/home-v20.css apps/web/app/layout.tsx apps/web/components/home-dashboard.tsx .github/workflows/validate-home-19-1.yml
git commit -m "feat(home): isolate neo-forum v20 surface"
```

---

### Task 2: Достоверный «Пульс темы»

**Files:**
- Modify: `apps/web/test/home-model.test.ts`
- Modify: `apps/web/components/home/model.ts`
- Modify: `apps/web/components/home/types.ts`
- Modify: `apps/web/components/home/popular-topics-panel.tsx`

**Interfaces:**
- Consumes: `createdAt`, `lastActivityAt`, `commentCount`, `viewCount`, `type` из `DiscussedTopicData`.
- Produces: `type TopicPulse = 'rising' | 'hot'`, `topicPulse(item, now): TopicPulse | null` и необязательную метку в строке темы.

- [ ] **Step 1: Написать тесты до реализации**

Добавить тесты с фиксированным `now = new Date('2026-09-02T12:00:00.000Z').getTime()`:

```ts
test('topic pulse marks recent active discussions without inventing resolved states', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');
  assert.equal(homeModel.topicPulse({
    type: 'DISCUSSION', createdAt: '2026-08-30T12:00:00.000Z',
    lastActivityAt: '2026-09-02T10:00:00.000Z', commentCount: 8, viewCount: 700,
  }, now), 'hot');
  assert.equal(homeModel.topicPulse({
    type: 'QUESTION', createdAt: '2026-09-01T12:00:00.000Z',
    lastActivityAt: '2026-09-01T20:00:00.000Z', commentCount: 3, viewCount: 180,
  }, now), 'rising');
});

test('topic pulse stays absent when activity is stale or insufficient', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');
  assert.equal(homeModel.topicPulse({
    type: 'QUESTION', createdAt: '2026-08-01T12:00:00.000Z',
    lastActivityAt: '2026-08-02T12:00:00.000Z', commentCount: 30, viewCount: 5000,
  }, now), null);
});
```

- [ ] **Step 2: Запустить только model-тест и увидеть ожидаемое падение**

Run: `node --experimental-strip-types --experimental-loader ./scripts/local-ts-loader.mjs --test apps/web/test/home-model.test.ts`

Expected: FAIL с `topicPulse is not a function`.

- [ ] **Step 3: Реализовать минимальную чистую функцию**

Использовать последние 6 часов + минимум 5 ответов для `hot`, последние 48 часов + минимум 3 ответа или 100 просмотров для `rising`; не выводить `resolved`/`result`, потому что таких полей в данных нет.

В `types.ts` добавить `export type TopicPulse = 'rising' | 'hot';`. В `model.ts` импортировать этот тип и определить вход функции полностью:

```ts
type TopicPulseSource = {
  type: string;
  createdAt: string;
  lastActivityAt?: string;
  commentCount: number;
  viewCount: number;
};

export function topicPulse(
  item: TopicPulseSource,
  now = Date.now(),
): TopicPulse | null {
  const created = Date.parse(item.createdAt);
  const active = Date.parse(item.lastActivityAt ?? item.createdAt);
  if (!Number.isFinite(created) || !Number.isFinite(active)) return null;
  if (now - active <= 6 * 60 * 60 * 1000 && item.commentCount >= 5) return 'hot';
  if (now - created <= 48 * 60 * 60 * 1000 && (item.commentCount >= 3 || item.viewCount >= 100)) return 'rising';
  return null;
}
```

- [ ] **Step 4: Отобразить метку рядом с типом темы**

В `DiscussedTopic` вычислить pulse и выводить `Горячо` или `Набирает` только при ненулевом результате. Добавить `aria-label="Пульс темы: ..."`; хэштег типа оставить отдельным элементом.

- [ ] **Step 5: Проверить тесты**

Run: `node --experimental-strip-types --experimental-loader ./scripts/local-ts-loader.mjs --test apps/web/test/home-model.test.ts && node scripts/home-v20-check.mjs`

Expected: все model-тесты и контракт v20 проходят.

- [ ] **Step 6: Закоммитить пульс**

```bash
git add apps/web/test/home-model.test.ts apps/web/components/home/model.ts apps/web/components/home/types.ts apps/web/components/home/popular-topics-panel.tsx
git commit -m "feat(home): add truthful topic pulse"
```

---

### Task 3: Наполненные честные состояния и редакционные блоки

**Files:**
- Modify: `scripts/home-v20-check.mjs`
- Modify: `apps/web/components/home/discovery-panels.tsx`
- Modify: `apps/web/components/home/activity-panel.tsx`
- Modify: `apps/web/components/home/community-tree.tsx`
- Modify: `apps/web/components/home-dashboard.tsx`
- Modify: `apps/web/components/home/forrum-news-panel.tsx`

**Interfaces:**
- Consumes: существующие `items`, `services`, `loaded`, `publications`, `announcements`, `tree`.
- Produces: семантические fallback-списки `.forrum-home-v20__format-list`, подпись дерева `.forrum-home-v20__tree-meta`, tablet-toggle дерева и ведущую новость `.is-lead`.

- [ ] **Step 1: Расширить структурный контракт и увидеть падение**

Добавить проверки marker-строк `Старт стрима`, `Новости участника`, `Найти специалиста`, `Предложить работу`, `Показать кейс`, `структура форума`, `is-lead` в соответствующих компонентах.

Run: `node scripts/home-v20-check.mjs`

Expected: FAIL на первой отсутствующей строке.

- [ ] **Step 2: Пересобрать fallback «Медиа»**

Оставить заголовок «Медиапартнёры скоро появятся», добавить два описательных пункта формата без имён и дат, затем CTA. Пункты не являются ссылками на несуществующий контент и получают подпись `Формат блока` для screen reader.

- [ ] **Step 3: Пересобрать fallback «Услуги»**

Добавить три реальные навигационные возможности и один CTA. «Найти специалиста» ведёт на `/services`, «Предложить работу» — на `/create`, «Показать кейс» — на `/create`; ни одна строка не содержит цены, автора или отзыва.

- [ ] **Step 4: Уточнить дерево, активность и новости**

Добавить подпись «структура форума» в шапку дерева, статус «Обновляется раз в минуту» в activity, а первой реальной новости присвоить `is-lead` по `index === 0`. В `HomeDashboard` хранить `treeFullyVisible`; передать значение и обработчик в `CommunityTree`. Кнопка «Показать всю структуру» получает `aria-expanded`, на десктопе скрыта, на 768–1023 px раскрывает ограниченную по высоте область дерева.

- [ ] **Step 5: Проверить структуру и доступность**

Run: `node scripts/home-v20-check.mjs && npm run validate:ux && npm run validate:a11y`

Expected: все три проверки проходят.

- [ ] **Step 6: Закоммитить состояния**

```bash
git add scripts/home-v20-check.mjs apps/web/components/home/discovery-panels.tsx apps/web/components/home/activity-panel.tsx apps/web/components/home/community-tree.tsx apps/web/components/home-dashboard.tsx apps/web/components/home/forrum-news-panel.tsx
git commit -m "feat(home): enrich truthful discovery states"
```

---

### Task 4: Новый знак 4RRUM только на главной

**Files:**
- Modify: `scripts/home-v20-check.mjs`
- Modify: `apps/web/components/site-header.tsx`
- Modify: `apps/web/app/home-v20.css`

**Interfaces:**
- Consumes: текущий link `.brand`, legacy SVG и `body:has(.forrum-home-v20)`.
- Produces: `.brand-symbol--legacy`, `.brand-symbol--neo`; Neo SVG виден только на `/`, legacy остаётся на других маршрутах.

- [ ] **Step 1: Добавить падающие проверки двух символов**

Контракт должен требовать оба modifier-класса, один `aria-label="4RRUM"` и scoped-правила, скрывающие Neo вне главной и legacy только на главной.

Run: `node scripts/home-v20-check.mjs`

Expected: FAIL на `.brand-symbol--neo`.

- [ ] **Step 2: Добавить альтернативный SVG-знак**

Сохранить legacy SVG. Рядом добавить Neo SVG `viewBox="0 0 34 30"` из двух угловатых диалоговых рамок и центральной стойки, визуально образующих `4`. Оба SVG имеют `aria-hidden="true"`; доступное имя остаётся на ссылке.

- [ ] **Step 3: Ограничить переключение главной**

По умолчанию `.brand-symbol--neo { display: none; }`. Только внутри `body:has(.forrum-home-v20)` скрыть legacy и показать Neo. Добавить контрастный focus-visible и размеры 34×30 px без изменения высоты шапки.

- [ ] **Step 4: Проверить контракт и доступность**

Run: `node scripts/home-v20-check.mjs && npm run validate:a11y`

Expected: обе проверки проходят.

- [ ] **Step 5: Закоммитить знак**

```bash
git add scripts/home-v20-check.mjs apps/web/components/site-header.tsx apps/web/app/home-v20.css
git commit -m "feat(home): introduce neo-forum brand mark"
```

---

### Task 5: Полная визуальная система главной

**Files:**
- Modify: `apps/web/app/home-v20.css`
- Modify: `apps/web/components/home/popular-topics-panel.tsx`
- Modify: `apps/web/components/home/home-panel.tsx`

**Interfaces:**
- Consumes: существующие v16/v18/v19/v191 class names и v20 markup из Tasks 1–4.
- Produces: светлая/графитовая цифровая редакция на 360–1920 px без влияния на другие маршруты.

- [ ] **Step 1: Зафиксировать desktop-сетку и токены**

Добавить scoped custom properties для бумаги, поверхности, текста, границ, внутреннего света, подложки и смысловых цветов. Сетка при `min-width: 1440px`: `minmax(280px, 300px) minmax(0, 1fr) minmax(290px, 310px)`, общий максимум 1680 px, gap 14 px.

- [ ] **Step 2: Создать слои панелей**

Каждая панель получает 1 px border, 1 px inset highlight и смещённую подложку через `box-shadow: 2px 2px 0 var(--home-shadow-sheet)`. Скругление — максимум 3 px. Строки тем и дерева остаются непрозрачными.

- [ ] **Step 3: Оформить газетные рубрики**

Убрать остаточные checkbox-подобные квадраты. Использовать короткий цветной прямоугольник 3×12 px, uppercase-заголовок и моноширинные meta-строки. «Обсуждаемые темы» получают синий маркер, activity — зелёный, news — красный.

- [ ] **Step 4: Усилить дерево и обсуждения**

Сделать соединители дерева контрастнее, а область toggle — 32×32 px. Темы получают смысловую левую линию, отчётливые хэштеги, pulse-label, непрозрачный hover, translateY(-1px) и правую сетку `52px 72px 112px`. Ник и дата остаются в последней колонке.

- [ ] **Step 5: Оформить медиа, услуги и правую колонку**

Media live — зелёная точка; service signal — янтарный; fallback format rows — вложенные редакционные строки, а не карточки. Activity получает вертикальный «провод» событий. Первые три участника недели получают небольшие цифровые ранги. Ведущая новость отличается размером заголовка и красной меткой, не крупной карточкой.

- [ ] **Step 6: Добавить scoped-шапку и фон**

Через `body:has(.forrum-home-v20)` применить к header полупрозрачную поверхность, `backdrop-filter: blur(10px)` с непрозрачным базовым background, тонкую нижнюю линию. Фон получает малоконтрастную 24 px координатную сетку; контент остаётся выше псевдослоя.

- [ ] **Step 7: Реализовать четыре адаптивных режима**

```css
@media (max-width: 1439px) { /* дерево + центр; rail под центром в 2 колонки */ }
@media (max-width: 1023px) { /* одна основная колонка; дерево сверху */ }
@media (max-width: 767px) { /* single column; stats под copy; 44px targets */ }
@media (prefers-reduced-motion: reduce) { /* animation:none; transform:none */ }
```

На каждом breakpoint задать `min-width: 0`, безопасный `width: 100%` и отсутствие горизонтального overflow.

- [ ] **Step 8: Запустить автоматические проверки**

Run: `node scripts/home-v20-check.mjs && node --experimental-strip-types --experimental-loader ./scripts/local-ts-loader.mjs --test apps/web/test/home-model.test.ts && npm run validate:ux && npm run validate:a11y && npm run validate:static && npm run typecheck && npm run build`

Expected: все команды завершаются с exit code 0. Если локально отсутствуют зависимости, первые четыре доступные проверки должны пройти, а typecheck/build выполняются в workflow после установки зависимостей.

- [ ] **Step 9: Закоммитить визуальную систему**

```bash
git add apps/web/app/home-v20.css apps/web/components/home/popular-topics-panel.tsx apps/web/components/home/home-panel.tsx
git commit -m "feat(home): apply neo-forum editorial system"
```

---

### Task 6: Двухпроходная визуальная приёмка

**Files:**
- Modify: `apps/web/app/home-v20.css`
- Modify if required by discovered defect: files already listed in Tasks 1–5
- Create: `docs/design-reference/home-v20-light.png`
- Create: `docs/design-reference/home-v20-graphite.png`
- Create: `docs/STAGE_20_HOME_VALIDATION.md`

**Interfaces:**
- Consumes: собранную главную v20, утверждённый `home-approved.png` и production-скриншоты v19.
- Produces: два проверенных реальных рендера и отчёт с фактическими командами/результатами.

- [ ] **Step 1: Установить зависимости и запустить приложение**

Run setup: `npm install`

Run server in a persistent PTY: `npm run dev`

Expected: web и API доступны на локальных портах, указанных `scripts/dev.mjs`; главная возвращает HTTP 200.

- [ ] **Step 2: Сделать первый набор рендеров**

Снять светлую и графитовую тему на 1920×1080, затем проверить 1440×900, 1024×768, 768×1024 и 360×800. Зафиксировать хотя бы одну слабость первого прохода в рабочей заметке, не публикуя этот черновик владельцу.

- [ ] **Step 3: Исправить выявленные слабости**

Проверить конкретно: обрезание правой колонки, доминирование обсуждений, пустой воздух в discovery, читаемость дерева, положение автора/даты, лишние квадратные маркеры, контраст обеих тем и сходство с SaaS.

- [ ] **Step 4: Снять финальные рендеры**

Сохранить исправленные 1920×1080 снимки как `home-v20-light.png` и `home-v20-graphite.png`. Финальные изображения должны быть получены из работающего приложения, а не из отдельного макета.

- [ ] **Step 5: Провести финальную проверку**

Run: `git diff --check && node scripts/home-v20-check.mjs && node --experimental-strip-types --experimental-loader ./scripts/local-ts-loader.mjs --test apps/web/test/home-model.test.ts && npm run validate:static && npm run validate:ux && npm run validate:a11y && npm run typecheck && npm run build`

Expected: exit code 0 для всех команд; отсутствие warning/error в итоговом выводе.

- [ ] **Step 6: Записать проверяемые результаты**

В `docs/STAGE_20_HOME_VALIDATION.md` перечислить точные команды, число unit-тестов, результат typecheck/build, проверенные размеры экрана, найденную и исправленную слабость первого прохода. Не отмечать непроверенные пункты как пройденные.

- [ ] **Step 7: Закоммитить финальную приёмку**

```bash
git add apps/web/app/home-v20.css apps/web/components docs/design-reference/home-v20-light.png docs/design-reference/home-v20-graphite.png docs/STAGE_20_HOME_VALIDATION.md
git commit -m "test(home): validate neo-forum v20 experience"
```

---

## Completion Gate

Работа считается готовой к показу владельцу только после выполнения Task 6. В итоговом сообщении отдельно перечислить:

- что реально изменилось на главной;
- что намеренно не затронуто;
- какие проверки прошли;
- какие проверки не удалось выполнить и почему;
- ссылки на два финальных скриншота;
- commit/branch или PR, содержащий результат.
