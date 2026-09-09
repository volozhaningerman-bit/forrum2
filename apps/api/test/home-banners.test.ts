import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBanners, activeBanners } from '../src/home/banners.js';
const banner = {slot:1,enabled:true,kind:'promotion',title:'Сообщество',imageLight:'https://cdn.example.com/light.webp',imageDark:'',href:'/communities/start',startsAt:'2026-09-09T10:00:00Z',endsAt:'2026-09-10T10:00:00Z'};
test('banner slots validate links, unique positions and schedule', () => {
 assert.equal(validateBanners([banner]).length,1);
 for (const href of ['javascript:alert(1)','//evil.test','/\\evil.test','http://example.com','https://user:pass@example.com','/%2f%2fevil.test']) assert.throws(()=>validateBanners([{...banner,href}]));
 assert.throws(()=>validateBanners([banner,banner]));
 assert.throws(()=>validateBanners([{...banner,endsAt:banner.startsAt}]));
 assert.throws(()=>validateBanners([{...banner,imageLight:'data:image/svg+xml,bad'}]));
 assert.throws(()=>validateBanners([{...banner,kind:'ad',disclosure:''}]));
});
test('public banners are active only within their time window, expiry is exclusive', () => {
 assert.equal(activeBanners([banner],new Date('2026-09-09T09:59:59Z')).length,0);
 assert.equal(activeBanners([banner],new Date(banner.startsAt)).length,1);
 assert.equal(activeBanners([banner],new Date(banner.endsAt)).length,0);
 assert.equal(activeBanners([{...banner,enabled:false}],new Date(banner.startsAt)).length,0);
 assert.deepEqual(activeBanners({bad:true}),[]);
});
