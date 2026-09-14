import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = process.env.HOME_TEST_OUTPUT || root + 'test-results/home-reference';
await mkdir(output, { recursive: true });
const names = ['Алексей Петров', 'Мария Кузнецова', 'Иван Соколов', 'Дмитрий Волков', 'Елена Смирнова'];
const categories = ['Разработка', 'Backend', 'Дизайн', 'Бизнес', 'Карьера', 'AI и данные', 'Маркетинг', 'Общество', 'Разное'];
const communities = categories.map((name, i) => ({ id: String(i), slug: 'category-' + i, name, parent: i === 1 ? { slug: 'category-0', name: categories[0] } : null, subscriberCount: 120, publicationCount: 5, onlineCount: 3, description: '' }));
const titles = ['Стоит ли переходить на Rust в продакшене?', 'Как составить сильное IT-резюме?', 'Лучшие практики для тёмных интерфейсов', 'Идея: платформа для поиска технических сооснователей', 'Как меняется работа с нейросетями'];
const excerpts = ['Команда обсуждает реальный опыт миграции критичных сервисов на Rust. Какие подводные камни, что с экосистемой, стоит ли игра свеч?', 'Делимся примерами, разбираем ошибки, обсуждаем, что действительно работает при поиске работы в текущих реалиях.', 'Собрали коллекцию подходов, примеров и рекомендаций по созданию комфортных тёмных тем.', 'Обсуждаем концепцию сервиса, который помогает находить партнёров по навыкам и интересам. Нужна ли такая платформа?', 'Пробуем новые инструменты, делимся первыми впечатлениями. Что нового и как это меняет правила игры?'];
const topics = titles.map((title, i) => ({ id: String(i), slug: 'topic-' + i, title, format: 'TOPIC', type: 'DISCUSSION', excerpt: excerpts[i], createdAt: new Date(Date.now() - (i + 1) * 7200000).toISOString(), author: { username: 'person-' + i, displayName: names[i], avatarUrl: null }, community: communities[[1,4,2,3,5][i]], commentCount: [47,29,18,35,0][i], viewCount: [2100,1600,980,1200,3400][i], reactionCount: [128,93,76,64,51][i], viewerReaction: null, isBookmarked: false, tags: [{ id: 'tag-' + i, slug: 'tag-' + i, label: ['rust','советы','интерфейсы','стартап','opensource'][i] }] }));
topics[0].lastComment = {id:'reply-1',excerpt:'Мы начали с одного сервиса. Что вы хотите ускорить?',createdAt:new Date().toISOString(),author:topics[1].author};
const pulse = {activeTopics:[{slug:topics[0].slug,title:topics[0].title,replyCount:3}],recentReplies:[{id:'reply-1',excerpt:'Мы начали с одного сервиса. Что вы хотите ускорить?',createdAt:new Date().toISOString(),author:topics[1].author,publication:{slug:topics[0].slug,title:topics[0].title,community:topics[0].community}}]};
const people = names.map((displayName, i) => ({ username: 'person-' + i, displayName, score: [2400,1800,1600,1400,1200][i], topicCount: 5-i, commentCount: 15-i, reactionCount: 20-i }));
const announcements = ['Обновления правил сообщества','Новый раздел: AI и данные','Запуск программы менторства','Интервью с командой FORRUM'].map((title,i) => ({ ...topics[i], id:'news-'+i, slug:'news-'+i, title }));
let emptyPeople = false, guest = false, showBanners = true, admin = false;
let bannerSettings=[];
let taxonomyApplied=false;
const taxonomyPlan={version:'a'.repeat(64),rows:[{slug:'video-games',name:'Видеоигры',parent:null,action:'create'},{slug:'gta-rp',name:'GTA RP',parent:'video-games',action:'move'}]};
const banners=[1,2].map(slot=>({slot,enabled:true,kind:slot===1?'ad':'promotion',title:slot===1?'AI-инструменты для ваших проектов':'Покажи, что ты создал с AI',imageLight:slot===1?'/images/home/tools-v35.webp':'/images/home/creations-v35.webp',imageDark:'',href:'/communities/category-0',startsAt:'',endsAt:'',disclosure:slot===1?'Тестовый рекламодатель':''}));
let saved = false, reaction = null, failFeed = false, failBookmark = false;
const requests = [];
const upstream = createServer(async (req,res) => {
 const url = new URL(req.url, 'http://localhost'); let data = []; let status = 200;
 requests.push({ path: url.pathname, query: url.search, method: req.method, cookie: req.headers.cookie });
 if (url.pathname === '/v1/communities') data = communities;
 else if (url.pathname === '/v1/feed') { data = topics.filter(item => (url.searchParams.get('unanswered') !== '1' || item.commentCount === 0) && (!url.searchParams.get('community') || item.community.slug === url.searchParams.get('community') || item.community.parent?.slug === url.searchParams.get('community'))).slice(Number(url.searchParams.get('offset')||0),Number(url.searchParams.get('offset')||0)+21); if(failFeed){status=503;data={message:'Сервис временно недоступен'};} }
 else if (url.pathname === '/v1/home/overview') data = { banners:showBanners?banners:[], pulse:emptyPeople ? {activeTopics:[],recentReplies:[]} : pulse, discussed: topics, weekly: { likes:people, activity:emptyPeople ? [] : people }, stats: {communities:9,topics:5,messages:134,usersOnline:emptyPeople ? 0 : 3,recordOnline:10} };
 else if (url.pathname === '/v1/admin/home-banners') {if(req.method==='PUT'){let body='';for await(const chunk of req)body+=chunk;bannerSettings=JSON.parse(body).banners;}data={banners:bannerSettings};}
 else if (url.pathname === '/v1/admin/ai-taxonomy') {if(req.method==='POST'){let body='';for await(const chunk of req)body+=chunk;assert.equal(JSON.parse(body).version,taxonomyPlan.version);taxonomyApplied=true;data={ok:true};}else data=taxonomyPlan;}
 else if (url.pathname === '/v1/announcements') data = announcements;
 else if (url.pathname === '/v1/auth/me' && guest) {status=401;data={message:'Войдите'};}
 else if (url.pathname === '/v1/auth/me') data = { user: { id:'viewer',username:'viewer',displayName:'Алексей Петров',emailVerified:true,onboardingCompleted:true,role:admin?'OWNER':'USER' } };
 else if (url.pathname === '/v1/publications/topic-0') data = {...topics[0],body:topics[0].excerpt,updatedAt:topics[0].createdAt,lastActivityAt:topics[0].lastComment.createdAt,pinnedUntil:null,canEdit:false,canDelete:false,bookmarkCount:0,comments:[{id:'reply-1',body:topics[0].lastComment.excerpt,createdAt:topics[0].lastComment.createdAt,parentId:null,author:{...topics[1].author,forrumId:2},reactionCount:0,replyCount:0,viewerReaction:null}]};
 else if (url.pathname.endsWith('/bookmark')) { if(failBookmark){ status=403;data={message:'Войдите, чтобы сохранить тему'}; } else {saved=!saved;data={bookmarked:saved};} }
 else if (url.pathname.endsWith('/reaction')) {let body='';for await(const chunk of req)body+=chunk;const type=JSON.parse(body).type;reaction=type===reaction?null:type;data={active:!!reaction,type:reaction};}
 else if (url.pathname === '/v1/telegram/channels') data = [{id:'channel',title:'Тестовый канал',enabled:true,canPost:true},{id:'blocked',title:'Недоступный канал',enabled:true,canPost:false}];
 else if (url.pathname.endsWith('/preview')) data = {title:topics[0].title,excerpt:topics[0].excerpt,hasImage:false};
 else if (url.pathname.startsWith('/v1/telegram/share/') && req.method==='POST') data = {channelTitle:'Тестовый канал'};
 res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));
});
await new Promise(resolve => upstream.listen(0,'127.0.0.1',resolve));
const apiPort = upstream.address().port;
const port = Number(process.env.HOME_TEST_PORT || 3126);
const web = spawn(process.execPath,[root+'node_modules/next/dist/bin/next',process.env.HOME_TEST_DEV ? 'dev' : 'start','--hostname','127.0.0.1','--port',String(port)],{cwd:root+'apps/web',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1',API_INTERNAL_URL:'http://127.0.0.1:'+apiPort},stdio:['ignore','pipe','pipe']});
let logs='';web.stdout.on('data',c=>logs+=c);web.stderr.on('data',c=>logs+=c);
let browser;
try {
 for(let n=0;n<120;n++){try{const r=await fetch('http://127.0.0.1:'+port+'/login');if(r.ok)break;}catch{} await new Promise(r=>setTimeout(r,500));if(n===119)throw new Error('Next did not start: '+logs);}
 const portable = process.env.PORTABLE_CHROMIUM ? (await import(process.env.PORTABLE_CHROMIUM)).default : null;
 browser=await chromium.launch({headless:true,...(portable ? {executablePath:process.env.CHROMIUM_EXECUTABLE || await portable.executablePath(),args:portable.args.filter(arg => !['--disable-web-security','--allow-running-insecure-content','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'].includes(arg)).concat('--disable-gpu')} : {})});
 const context=await browser.newContext({viewport:{width:1671,height:941},deviceScaleFactor:1});
 await context.addCookies([{name:'forrum_test',value:'viewer',domain:'127.0.0.1',path:'/'}]);
 const page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:'+port+'/',{waitUntil:'networkidle'});
 await page.locator('.forum-topic').first().waitFor();

 assert.equal(await page.locator('.forum-topic').count(),5);
 await page.getByRole('button',{name:'Без ответов',exact:true}).click();
 await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===1);
 assert.match(page.url(),/tab=unanswered/);
 await page.goBack();await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===5);
 await page.locator('.forum-bookmark').first().click();await page.waitForFunction(()=>document.querySelector('.forum-bookmark').getAttribute('aria-pressed')==='true');
 await page.getByRole('button',{name:'Фильтры',exact:true}).click();await page.getByLabel('Сообщество',{exact:true}).selectOption('category-0');
 await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===1);assert.match(page.url(),/community=category-0/);
 await page.getByRole('button',{name:'Сбросить выбранное сообщество'}).click();await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===5);
 await page.getByRole('button',{name:'Фильтры',exact:true}).click();
 for(const dark of [false,true]){
  await page.evaluate(dark=>document.documentElement.classList.toggle('dark',dark),dark);
  for(const width of [1920,1440,1280,1024,768,390,320]){
   await page.setViewportSize({width,height:960});await page.waitForTimeout(100);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,'overflow '+width+' '+dark);
   if([1920,390].includes(width))await page.screenshot({path:output+'/v39-'+width+'-'+(dark?'dark':'light')+'.png',fullPage:true});
  }
 }
 await page.getByRole('button',{name:'Открыть меню',exact:true}).click();await page.keyboard.press('Escape');assert.equal(await page.locator('.forum-sidebar.is-open').count(),0);
 emptyPeople=true;await page.setViewportSize({width:1920,height:960});await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('.forum-start').count(),1);assert.equal(await page.locator('.forum-topics-ranking').count(),0);
 await page.screenshot({path:output+'/v39-empty.png',fullPage:true});
 failFeed=true;await page.getByRole('button',{name:'Новые',exact:true}).click();await page.getByRole('button',{name:'Попробовать снова'}).waitFor();failFeed=false;await page.getByRole('button',{name:'Попробовать снова'}).click();await page.locator('.forum-topic').first().waitFor();
 for(let i=5;i<29;i++)topics.push({...topics[0],id:'extra-'+i,slug:'extra-'+i});
 await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===20);
 await page.getByRole('button',{name:'Показать ещё обсуждения'}).click();await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===29);
 assert.equal(await page.getByRole('button',{name:'Показать ещё обсуждения'}).count(),0);
 assert.deepEqual(errors,[]);console.log('V39 browser checks passed: pagination, filters, URL/back, bookmark, menu, errors, empty states, 7 widths, both themes');
} finally { await browser?.close(); web.kill(); upstream.close();await writeFile(output+'/server.log',logs); }
