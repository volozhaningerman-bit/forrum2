import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

const dashboard = read('apps/web/components/home-dashboard.tsx');
const page = read('apps/web/app/page.tsx');
const header = read('apps/web/components/site-header.tsx');
const footer = read('apps/web/components/site-footer.tsx');
const css = read('apps/web/app/globals.css');
const homeService = read('apps/api/src/home/home.service.ts');

assert.match(dashboard, /forrum-home-v19/, 'dashboard must enable the V19 visual scope');
assert.match(dashboard, /4RRUM_HOME_ACTIVITY_SLOT_V19_1/, 'activity slot must stay hidden until V19.1 data exists');
assert.doesNotMatch(dashboard, /discussedExpanded|discussedPage|Показано \{/, 'popular topics must not collapse or paginate');
assert.doesNotMatch(dashboard, /title="О FORRUM"/, 'static about panel must leave the home rail');
assert.match(page, /\/portfolio\?kind=SERVICE/, 'services must come from the real portfolio directory');
assert.match(page, /\/media\/partners/, 'media partners must be available on first render');
assert.doesNotMatch(page, /\/feed\?mode=new/, 'home must not fetch a separate new-topics feed');
assert.match(header, /brand-symbol__joint/, 'brand must use the compact joined-dialog mark');
assert.match(footer, />Обратная связь</, 'moved support action must be named Обратная связь');
assert.match(css, /4RRUM HOME 19\.0: live internet newsroom/, 'V19 visual layer is missing');
assert.equal((css.match(/4RRUM HOME 19\.0: live internet newsroom/g) ?? []).length, 1, 'V19 CSS layer must occur once');
assert.match(homeService, /rankWeekly\(\[\.\.\.activity\.values\(\)\], 'activity'\)/, 'home service must use the transparent ranking helper');
assert.doesNotMatch(homeService, /getWeeklyUser\(activity, user\)\.presenceCount \+= 1/, 'presence must not affect activity score');

console.log('Home V19.0 policy audit passed.');
