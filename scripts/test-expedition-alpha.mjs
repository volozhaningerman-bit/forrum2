import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;

const upstream = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let data = {};
  if (url.pathname === '/v1/auth/me') {
    data = { user: { id:'viewer', username:'viewer', displayName:'Алексей Петров', emailVerified:true, onboardingCompleted:true, role:'OWNER' } };
  } else if (url.pathname === '/v1/communities') data = [];
  else if (url.pathname === '/v1/notifications/unread-count') data = { count:0 };
  res.writeHead(200, { 'Content-Type':'application/json' });
  res.end(JSON.stringify(data));
});

await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
const apiPort = upstream.address().port;
const port = Number(process.env.EXPEDITION_TEST_PORT || 3142);
const web = spawn(process.execPath, [root+'node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)], {
  cwd: root+'apps/web',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED:'1', API_INTERNAL_URL:'http://127.0.0.1:'+apiPort },
  stdio:['ignore','pipe','pipe'],
});

let logs='';
web.stdout.on('data', chunk => (logs += chunk));
web.stderr.on('data', chunk => (logs += chunk));
let browser;

try {
  for (let n=0;n<120;n+=1) {
    try {
      const response=await fetch('http://127.0.0.1:'+port+'/applications/games/expedition');
      if (response.ok) break;
    } catch {}
    await new Promise(resolve => setTimeout(resolve,500));
    if (n===119) throw new Error('Next did not start: '+logs);
  }

  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1600,height:900},deviceScaleFactor:1});
  await context.addCookies([{name:'forrum_test',value:'viewer',domain:'127.0.0.1',path:'/'}]);
  const page=await context.newPage();

  await page.goto('http://127.0.0.1:'+port+'/applications/games/expedition',{waitUntil:'networkidle'});
  await page.evaluate(()=>localStorage.removeItem('4rrum.expedition.alpha.v1'));
  await page.reload({waitUntil:'networkidle'});

  assert.equal(await page.locator('[data-testid="expedition-alpha"]').count(),1,'alpha root missing');
  assert.match(await page.locator('body').innerText(),/Ржавые Окраины/);

  await page.getByRole('button',{name:'Отправить в экспедицию'}).click();
  assert.match(await page.locator('body').innerText(),/Персонаж в пути/);
  await page.waitForTimeout(9000);

  assert((await page.locator('.item-card').count())>=1,'first expedition must return an item');
  await page.locator('.item-card').first().click();
  await page.getByRole('button',{name:'Надеть'}).click();
  await page.getByRole('button',{name:'Персонаж'}).click();
  assert.match(await page.locator('body').innerText(),/1\/16/);

  await page.getByRole('button',{name:'Босс'}).click();
  assert.match(await page.locator('body').innerText(),/Железный Пастырь/);
  await page.getByRole('button',{name:'Отправить персонажа'}).click();
  assert.match(await page.locator('body').innerText(),/Вы участвуете/);

  const sizes=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth}));
  assert(sizes.scrollWidth<=sizes.width+2,'horizontal overflow '+sizes.scrollWidth+'/'+sizes.width);
  console.log('expedition alpha acceptance passed');
} finally {
  if (browser) await browser.close();
  web.kill('SIGTERM');
  upstream.close();
}
