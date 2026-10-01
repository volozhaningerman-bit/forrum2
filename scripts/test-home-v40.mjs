import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = process.env.HOME_TEST_OUTPUT || root + 'test-results/home-reference';
await mkdir(output, { recursive: true });
await copyFile(root + 'docs/design-reference/home-approved.png', output + '/approved.png');
const fixtureNow=Date.parse('2026-09-30T12:00:00Z');
const names = ['Алексей Петров', 'Мария Кузнецова', 'Иван Соколов', 'Дмитрий Волков', 'Елена Смирнова', 'Артём Орлов', 'Кира Белова', 'Михаил Серов', 'Лина Романова', 'Олег Миронов'];
const categories = ['Разработка', 'Backend', 'Дизайн', 'Бизнес', 'Карьера', 'AI и данные', 'Маркетинг', 'Общество', 'Разное'];
const communities = categories.map((name, i) => ({ id: String(i), slug: 'category-' + i, name, parent: i === 1 ? { slug: 'category-0', name: categories[0] } : null, subscriberCount: 120, publicationCount: 5, onlineCount: 3, description: '' }));
communities.push({id:'retired',slug:'workshop',name:'Мастерская',parent:null,subscriberCount:0,onlineCount:0,publicationCount:0,description:''});
communities[2].parent={slug:'workshop',name:'Мастерская'};
communities.push({id:'brand',slug:'forrum-start',name:'FORRUM Start',parent:null,subscriberCount:0,onlineCount:0,publicationCount:0,description:''});
const titles = ['Стоит ли переходить на Rust в продакшене?', 'Как составить сильное IT-резюме?', 'Лучшие практики для тёмных интерфейсов', 'Идея: платформа для поиска технических сооснователей', 'Как меняется работа с нейросетями'];
const excerpts = ['Команда обсуждает реальный опыт миграции критичных сервисов на Rust. Какие подводные камни, что с экосистемой, стоит ли игра свеч?', 'Делимся примерами, разбираем ошибки, обсуждаем, что действительно работает при поиске работы в текущих реалиях.', 'Собрали коллекцию подходов, примеров и рекомендаций по созданию комфортных тёмных тем.', 'Обсуждаем концепцию сервиса, который помогает находить партнёров по навыкам и интересам. Нужна ли такая платформа?', 'Пробуем новые инструменты, делимся первыми впечатлениями. Что нового и как это меняет правила игры?'];
const topics = titles.map((title, i) => ({ id: String(i), slug: 'topic-' + i, title, format: 'TOPIC', type: 'DISCUSSION', excerpt: excerpts[i], createdAt: new Date(fixtureNow - (i + 1) * 7200000).toISOString(), author: { username: 'person-' + i, displayName: names[i], avatarUrl: null }, community: communities[[1,4,2,3,5][i]], commentCount: [47,29,18,35,0][i], viewCount: [2100,1600,980,1200,3400][i], reactionCount: [128,93,76,64,51][i], viewerReaction: null, isBookmarked: false, tags: [{ id: 'tag-' + i, slug: 'tag-' + i, label: ['rust','советы','интерфейсы','стартап','opensource'][i] }] }));
topics[0].lastComment = {id:'reply-1',excerpt:'Мы начали с одного сервиса. Что вы хотите ускорить?',createdAt:new Date().toISOString(),author:topics[1].author};
const pulse = {activeTopics:[{slug:topics[0].slug,title:topics[0].title,replyCount:3}],recentReplies:[{id:'reply-1',excerpt:'Мы начали с одного сервиса. Что вы хотите ускорить?',createdAt:new Date().toISOString(),author:topics[1].author,publication:{slug:topics[0].slug,title:topics[0].title,community:topics[0].community}}]};
const people = names.map((displayName, i) => ({ username: 'person-' + i, displayName, score: 3000-i*180, topicCount: Math.max(1,10-i), commentCount: Math.max(1,20-i), reactionCount: Math.max(1,30-i) }));
const announcements = ['Обновления правил сообщества','Новый раздел: AI и данные','Запуск программы менторства','Интервью с командой FORRUM'].map((title,i) => ({ ...topics[i], id:'news-'+i, slug:'news-'+i, title }));
let emptyPeople = false, guest = false, showBanners = true, admin = false;
let bannerSettings=[];
let taxonomyApplied=false;
const taxonomyPlan={version:'a'.repeat(64),rows:[{slug:'video-games',name:'Видеоигры',parent:null,action:'create'},{slug:'gta-rp',name:'GTA RP',parent:'video-games',action:'move'}]};
const banners=[1,2].map(slot=>({slot,enabled:true,kind:slot===1?'ad':'promotion',title:slot===1?'AI-инструменты для ваших проектов':'Покажи, что ты создал с AI',imageLight:slot===1?'/images/home/tools-v35.webp':'/images/home/creations-v35.webp',imageDark:'',href:'/communities/category-0',startsAt:'',endsAt:'',disclosure:slot===1?'Тестовый рекламодатель':''}));
let saved = false, reaction = null, failFeed = false, failBookmark = false;
let reports=0, curatorApplications=0, replies=0;
const allTopics=Array.from({length:40},(_,i)=>({...topics[i%5],id:String(i),slug:'topic-'+i}));
const requests = [];
const upstream = createServer(async (req,res) => {
 const url = new URL(req.url, 'http://localhost'); let data = []; let status = 200;
 requests.push({ path: url.pathname, query: url.search, method: req.method, cookie: req.headers.cookie });
 if (url.pathname === '/v1/communities') data = communities;
 else if (url.pathname === '/v1/feed') { data = allTopics.slice(Number(url.searchParams.get('offset')||0),Number(url.searchParams.get('offset')||0)+21); if(failFeed){status=503;data={message:'Сервис временно недоступен'};} }
 else if (url.pathname === '/v1/home/ranking') data = emptyPeople && url.searchParams.get('period')!=='all' ? [] : people;
 else if (url.pathname === '/v1/home/overview') data = { banners:showBanners?banners:[], pulse:emptyPeople ? {activeTopics:[],recentReplies:[]} : pulse, discussed: topics, weekly: { likes:people, activity:emptyPeople ? [] : people }, stats: {users:10,newestUser:{username:'person-9',displayName:names[9]},communities:9,topics:5,messages:134,usersOnline:emptyPeople ? 0 : 3,recordOnline:10} };
 else if (url.pathname === '/v1/admin/home-banners') {if(req.method==='PUT'){let body='';for await(const chunk of req)body+=chunk;bannerSettings=JSON.parse(body).banners;}data={banners:bannerSettings};}
 else if (url.pathname === '/v1/admin/ai-taxonomy') {if(req.method==='POST'){let body='';for await(const chunk of req)body+=chunk;assert.equal(JSON.parse(body).version,taxonomyPlan.version);taxonomyApplied=true;data={ok:true};}else data=taxonomyPlan;}
 else if(url.pathname.endsWith('/report')){let body='';for await(const chunk of req)body+=chunk;assert(JSON.parse(body).reason.length>=5);reports++;data={ok:true};}
 else if(url.pathname==='/v1/portfolio')data=[{kind:url.searchParams.get('kind')||'PROJECT',status:'ACTIVE',lookingForTeam:false,priceText:null,owner:{username:'person-0',displayName:names[0],avatarUrl:null,forrumId:1},community:null,publication:null,id:'project-1',title:'Лаборатория промптов',summary:'Открытые эксперименты сообщества',interactionCount:3,updatedAt:new Date().toISOString(),coverUrl:'/images/home/tools-v35.webp'}];
 else if(url.pathname==='/v1/events')data=[
 {id:'far',title:'Позднее событие',startsAt:new Date(fixtureNow+86400000*10).toISOString()},
 {id:'near',title:'Ближайшее событие',startsAt:new Date(fixtureNow+86400000).toISOString()},
 {id:'cancelled',title:'Отменённое событие',status:'CANCELLED',startsAt:new Date(fixtureNow+3600000).toISOString()}];
 else if (url.pathname === '/v1/announcements') data = announcements;
 else if (url.pathname === '/v1/auth/me' && guest) {status=401;data={message:'Войдите'};}
 else if (url.pathname === '/v1/auth/me') data = { user: { id:'viewer',username:'viewer',displayName:'Алексей Петров',emailVerified:true,onboardingCompleted:true,role:admin?'OWNER':'USER' } };
 else if (url.pathname === '/v1/search') data = {query:url.searchParams.get('q'),publications:topics,communities:[communities[0]],users:[],tags:[]};
 else if (url.pathname === '/v1/governance/curator-applications') {let body='';for await(const chunk of req)body+=chunk;const form=JSON.parse(body);assert.equal(form.communitySlug,'category-0');assert(form.motivation.length>=20&&form.plan.length>=20);curatorApplications++;data={id:'application-1'};}
 else if (url.pathname === '/v1/publications/topic-0/comments' && req.method==='POST') {replies++;await new Promise(resolve=>setTimeout(resolve,300));data={id:'reply-new'};}
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
const web = spawn(process.execPath,[root+'node_modules/next/dist/bin/next',process.env.HOME_TEST_DEV ? 'dev' : 'start',...(process.env.HOME_TEST_DEV?['--webpack']:[]),'--hostname','127.0.0.1','--port',String(port)],{cwd:root+'apps/web',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1',API_INTERNAL_URL:'http://127.0.0.1:'+apiPort},stdio:['ignore','pipe','pipe']});
let logs='';web.stdout.on('data',c=>logs+=c);web.stderr.on('data',c=>logs+=c);
let browser;
try {
 for(let n=0;n<120;n++){try{const r=await fetch('http://127.0.0.1:'+port+'/login');if(r.ok)break;}catch{} await new Promise(r=>setTimeout(r,500));if(n===119)throw new Error('Next did not start: '+logs);}
 const portable = process.env.PORTABLE_CHROMIUM ? (await import(process.env.PORTABLE_CHROMIUM)).default : null;
 browser=await chromium.launch({headless:true,...(portable ? {executablePath:process.env.CHROMIUM_EXECUTABLE || await portable.executablePath(),args:portable.args.filter(arg => !['--disable-web-security','--allow-running-insecure-content','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'].includes(arg)).concat('--disable-gpu')} : {})});
 const context=await browser.newContext({viewport:{width:1600,height:1000},deviceScaleFactor:1,timezoneId:'UTC'});
 await context.addCookies([{name:'forrum_test',value:'viewer',domain:'127.0.0.1',path:'/'}]);
 const page=await context.newPage();await page.clock.setFixedTime(new Date(fixtureNow));const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:'+port+'/',{waitUntil:'networkidle'});
 await page.locator('.forum-topic').first().waitFor();
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:output+'/initial.png'});
 const {default:AxeBuilder}=await import('@axe-core/playwright');
 const accessibility=await new AxeBuilder({page}).include('.forum-home').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 await writeFile(output+'/axe.json',JSON.stringify(accessibility.violations,null,2));
 assert.deepEqual(accessibility.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'Runtime accessibility violations');
 assert.equal(await page.locator('.forum-topic').count(),20);
 assert.equal(await page.locator('.forum-right>.forum-panel').count(),2);
 assert.equal(await page.locator('.forum-topbar .forum-primary a').count(),5);
 assert.equal(await page.locator('.forum-last-reply,.forum-topic-summary,.forum-quick-links').count(),0);
 assert.equal(await page.locator('.forum-category-online').count(),0);
 assert.equal(await page.locator('.forum-category-children').count(),0);
 assert.equal(await page.locator('.forum-secondary-banners').count(),0);
 assert.equal(requests.filter(r=>r.path==='/v1/events').length,0,'Homepage must not fetch unused events data');
 assert.equal(requests.filter(r=>r.path==='/v1/feed').length,1,'Default feed should be fetched once on the server, not refetched after hydration');
 assert.equal(await page.locator('h1').count(),1,'Homepage should expose one primary heading');
 assert.equal(await page.locator('.forum-home-category a').getAttribute('aria-current'),'page');
 const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);return ids.filter((id,index)=>ids.indexOf(id)!==index);});
 assert.deepEqual(duplicateIds,[],'Rendered homepage must not contain duplicate ids');
 await page.getByRole('button',{name:'Развернуть: Разработка',exact:true}).click({position:{x:180,y:16}});
 await page.locator('.forum-category-children').first().waitFor();
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('.forum-category-children').count(),0);
 const treeTop=await page.locator('.forum-sidebar').evaluate(el=>el.getBoundingClientRect().top);
 await page.evaluate(()=>window.scrollTo(0,400));
 assert(treeTop-(await page.locator('.forum-sidebar').evaluate(el=>el.getBoundingClientRect().top))>350);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.evaluate(()=>document.addEventListener('click',event=>{const a=event.target.closest('a');if(a){window.__clickedHref=a.getAttribute('href');event.preventDefault();}}, {capture:true,once:true}));
 await page.locator('.forum-topic').first().click({position:{x:500,y:8}});
 assert.equal(await page.evaluate(()=>window.__clickedHref),'/p/topic-0');
 assert.equal(await page.locator('.forum-categories').getByText('Мастерская',{exact:true}).count(),0);
 assert.equal(await page.locator('.forum-categories').getByText('Дизайн',{exact:true}).count(),1);
 await page.getByRole('heading',{name:'Популярное сегодня',exact:true}).waitFor();
 assert.deepEqual((await page.locator('.forum-right>.forum-panel h2').allTextContents()).map(value=>value.replace(/[♛◆]/g,'')),['Рейтинг пользователей','Популярное сегодня']);
 assert.equal(await page.locator('.forum-panel-footer').getAttribute('href'),'/users');
 assert.equal(await page.locator('.forum-popular-today li').count(),1,'Only topics with replies in the last 24h belong to the live popular panel');
 const heroBox=await page.locator('.forum-search-hero').boundingBox();
 assert(heroBox && heroBox.height>=160 && heroBox.height<=163,`Hero must stay compact, got ${heroBox?.height}`);
 assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(13, 16, 18)');
 assert.equal((await page.locator('.forum-brand').textContent())?.replace(/\s/g,''),'4RRUM');
 assert.equal(await page.locator('.forum-hero-copy h1').evaluate(el=>getComputedStyle(el).color),'rgb(236, 238, 239)');
 assert.equal(await page.locator('[aria-label*="светлую тему"],[aria-label*="тёмную тему"]').count(),0);
 assert.deepEqual(await page.locator('.forum-primary a').allTextContents(),['Главная','Сообщества','Приложения','Сервисы','Услуги']);
 assert.equal(await page.getByRole('search').count(),1);
 assert.equal(await page.locator('.forum-home').getAttribute('data-home-reference'),'v49');
 assert.equal(await page.locator('.forum-important').count(),1);
 assert.equal(await page.locator('.forum-topic-columns').count(),0);
 assert.equal(await page.locator('.forum-topic-category-cell').count(),20);
 assert.equal(await page.locator('.forum-topic-excerpt').count(),0);
 assert.equal(await page.locator('.forum-topic-category-chip').count(),20);
 assert.equal(await page.locator('.forum-topic-stats').count(),20);
 assert.equal(await page.locator('.forum-bookmark-count').count(),20);
 assert.equal(await page.locator('.forum-topic-menu .forum-more-trigger').count(),20);
 const unreadStrip=await page.locator('.forum-topic').first().evaluate(el=>getComputedStyle(el,'::before').width);
 assert.equal(unreadStrip,'3px');
 const beforeHover=await page.locator('.forum-topic').first().boundingBox();
 await page.locator('.forum-topic').first().hover(); await page.waitForTimeout(160);
 const afterHover=await page.locator('.forum-topic').first().boundingBox();
 assert.deepEqual(afterHover,beforeHover,'Hover must not move or scale the row');
 assert.equal(await page.getByRole('button',{name:'Новые темы',exact:true}).getAttribute('aria-pressed'),'true');
 assert(requests.some(r=>r.path==='/v1/feed'&&r.cookie?.includes('forrum_test=viewer')));
 const bookmarkCalls=requests.filter(r=>r.path==='/v1/publications/topic-0/bookmark').length;
 const hostile=await page.request.post('http://127.0.0.1:'+port+'/api/publications/topic-0/bookmark',{headers:{Origin:'https://evil.example'}});
 assert.equal(hostile.status(),403,'Cross-site writes must be rejected before forwarding session cookies');
 assert.equal(requests.filter(r=>r.path==='/v1/publications/topic-0/bookmark').length,bookmarkCalls);
 const malformedVital=await page.request.post('http://127.0.0.1:'+port+'/api/vitals',{headers:{Origin:'http://127.0.0.1:'+port},data:{name:'not-a-vital',value:1,rating:'good',device:'desktop'}});
 assert.equal(malformedVital.status(),400);
 const first=page.locator('.forum-topic').first(),more=first.getByRole('button',{name:/Действия с темой/});
 await more.click();await page.keyboard.press('Escape');assert.equal(await more.getAttribute('aria-expanded'),'false');assert(await more.evaluate(el=>el===document.activeElement));
 await more.click();await first.getByRole('button',{name:'В избранное',exact:true}).click();await first.getByText('Добавлено в избранное',{exact:true}).waitFor({timeout:5000}).catch(async error=>{console.log('Bookmark notice:',await first.locator('.forum-action-notice').textContent());throw error;});assert(saved);assert.equal(await first.locator('.forum-saved-dot').count(),1);
 await more.click();await first.getByRole('button',{name:'Убрать из избранного',exact:true}).click();await first.getByText('Убрано из избранного',{exact:true}).waitFor();assert(!saved);assert.equal(await first.locator('.forum-saved-dot').count(),0);
 failBookmark=true;await more.click();await first.getByRole('button',{name:'В избранное',exact:true}).click();await first.getByText('Войдите, чтобы сохранить тему',{exact:true}).waitFor();failBookmark=false;
 await page.keyboard.press('Escape');await more.click();await first.getByRole('button',{name:'Пожаловаться',exact:true}).click();await page.getByRole('dialog').getByLabel('Что нарушено?').fill('Спам и реклама без маркировки');await page.getByRole('button',{name:'Отправить жалобу',exact:true}).click();await first.getByText('Жалоба отправлена модераторам',{exact:true}).waitFor();assert.equal(reports,1);
 await page.evaluate(()=>{Object.defineProperty(navigator,'share',{value:undefined,configurable:true});Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.__copied=text;}},configurable:true});});
 await more.click();await first.getByRole('button',{name:'Поделиться',exact:true}).click();await first.getByText('Ссылка скопирована',{exact:true}).waitFor();assert((await page.evaluate(()=>window.__copied)).endsWith('/p/topic-0'));await first.getByRole('button',{name:'Закрыть сообщение'}).click();
 await page.getByRole('button',{name:'Симпатии',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.forum-author-ranking li>small')?.textContent==='30');await page.getByRole('button',{name:'Сообщения',exact:true}).click();
 await page.getByRole('button',{name:'Показать ещё обсуждения',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('.forum-topic').length===40);assert.equal(await page.getByRole('button',{name:'Показать ещё обсуждения',exact:true}).count(),0);
 for(const theme of ['graphite']){
  await page.evaluate(theme=>{document.documentElement.classList.toggle('dark',theme==='graphite');document.documentElement.dataset.forrumTheme=theme;localStorage.setItem('forrum-theme',theme);},theme);
  for(const width of [1920,1648,1600,1280,1024,760,390,320]){
   await page.setViewportSize({width,height:width===1648?926:1000});await page.waitForTimeout(100);
   const size=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));if(size.scroll>size.w+1)console.log(await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.right>innerWidth+1}).slice(0,15).map(el=>({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right}))));assert(size.scroll<=size.w+1,`${theme} ${width}: overflow ${size.scroll}`);
   if(width<=760){const tabsFit=await page.locator('.forum-tabs').evaluate(el=>el.scrollWidth<=el.clientWidth+1);assert(tabsFit,`Filters must fit at ${width}px`);}
   if(width===390){const mobileAxe=await new AxeBuilder({page}).include('.forum-home').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();await writeFile(output+'/axe-mobile.json',JSON.stringify(mobileAxe.violations,null,2));assert.deepEqual(mobileAxe.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>v.id),[]);}
   if([1648,1600,390].includes(width)){await page.evaluate(()=>{window.scrollTo({top:0,behavior:"instant"});document.activeElement?.blur();});await page.screenshot({path:`${output}/${theme}-${width}.png`});}
  }
 }
 await page.getByRole('button',{name:'Открыть меню',exact:true}).click();assert(await page.getByRole('button',{name:'Закрыть меню',exact:true}).last().isVisible());await page.keyboard.press('Escape');
 await page.setViewportSize({width:1600,height:1000});await page.getByRole('button',{name:'Фильтры',exact:true}).click();await page.locator('summary[aria-label="Выбрать сообщество"]').focus();
 await page.keyboard.press('ArrowDown');
 assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'Все сообщества');
 await page.keyboard.press('End');
 assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'4rrum Start');
 await page.keyboard.press('Enter');await page.waitForTimeout(300);
 assert(await page.locator('summary[aria-label="Выбрать сообщество"]').evaluate(el=>el===document.activeElement));
 assert((await page.locator('.forum-active-filter').textContent()).startsWith('4rrum Start'));
 await page.getByRole('button',{name:'Сбросить выбранное сообщество',exact:true}).click();
 await page.locator('summary[aria-label="Выбрать сообщество"]').focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Escape');
 assert.equal(await page.locator('.forum-filter-menu').getAttribute('open'),null);
 assert(await page.locator('summary[aria-label="Выбрать сообщество"]').evaluate(el=>el===document.activeElement));
 await page.locator('summary[aria-label="Выбрать сообщество"]').click();await page.getByRole('menuitemradio',{name:'Разработка',exact:true}).click();await page.waitForTimeout(400);assert(requests.some(r=>r.query.includes('community=category-0')));
 failFeed=true;await page.getByRole('button',{name:'Активные темы за 24 часа',exact:true}).click();await page.getByText('Не удалось загрузить обсуждения. Попробуйте ещё раз.',{exact:true}).waitFor();failFeed=false;await page.getByRole('button',{name:'Попробовать снова',exact:true}).click();await first.waitFor();
 await page.goto('http://127.0.0.1:'+port+'/applications',{waitUntil:'networkidle'});assert.equal(await page.locator('.applications-grid article').count(),4);
 await page.goto('http://127.0.0.1:'+port+'/digital-services',{waitUntil:'domcontentloaded'});
 await page.getByRole('heading',{name:'Цифровые сервисы'}).waitFor();
 assert.equal(await page.locator('html').getAttribute('data-forrum-theme'),'graphite');
 guest=true;emptyPeople=true;await page.goto('http://127.0.0.1:'+port+'/',{waitUntil:'domcontentloaded'});
 await page.locator('.forum-author-ranking li').first().waitFor();
 assert.equal(await page.locator('.forum-side-stats dl>div').filter({hasText:'Пользователей'}).locator('dd').textContent(),'10');
 assert.equal(await page.getByRole('group',{name:'Период рейтинга'}).getByRole('button',{name:'За всё время',exact:true}).getAttribute('aria-pressed'),'true');
 assert(requests.some(r=>r.path==='/v1/home/ranking'&&r.query.includes('period=all')));
 await page.locator('.forum-topic').first().getByRole('button',{name:/Действия с темой/}).click();
 await page.getByRole('link',{name:'Войти, чтобы сохранить или пожаловаться'}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Пожаловаться',exact:true}).count(),0);
 await page.keyboard.press('Escape');
 await page.getByRole('heading',{name:'Популярные темы',exact:true}).waitFor();
 assert.equal(await page.locator('.forum-popular-today header>a').getAttribute('href'),'/?tab=new');
 assert.equal(await page.locator('.forum-popular-note').textContent(),'По просмотрам за всё время');
 await page.setViewportSize({width:800,height:600});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 // Alpha journeys: public utility screens must remain usable in the graphite theme.
 for (const route of ['/search?q=Rust','/login','/register','/forgot-password','/verify-email','/support','/rules','/digital-services','/services','/projects','/not-a-real-page']) {
  await page.goto('http://127.0.0.1:'+port+route,{waitUntil:'networkidle'});
  for (const width of [320,390,760,1280]) {
   await page.setViewportSize({width,height:900});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} overflows at ${width}`);
  }
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  await writeFile(output+'/axe-alpha-'+route.split('?')[0].replaceAll('/','')+'.json',JSON.stringify(results.violations,null,2));
  assert.deepEqual(results.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility: ${route}`);
  await page.screenshot({path:output+'/alpha-'+route.split('?')[0].replaceAll('/','')+'.png'});
 }
 await page.goto('http://127.0.0.1:'+port+'/communities/curators',{waitUntil:'networkidle'});
 assert(page.url().includes('/login?next='),'Guest curator application requires sign-in');
 await page.goto('http://127.0.0.1:'+port+'/p/topic-0',{waitUntil:'domcontentloaded'});
 await page.getByRole('link',{name:'Войти и ответить',exact:true}).waitFor();
 assert.equal(await page.locator('.reply-composer [role="textbox"]').count(),0,'Guest should not type a reply that cannot be sent');
 guest=false;
 await page.goto('http://127.0.0.1:'+port+'/communities/curators',{waitUntil:'networkidle'});
 await page.getByRole('combobox').selectOption('category-0');
 await page.getByLabel('Почему хотите стать куратором').fill('Хочу помогать участникам и развивать полезные обсуждения.');
 await page.getByLabel('Что планируете сделать для раздела').fill('Подготовлю инструкции и помогу отвечать на вопросы новичков.');
 await page.getByRole('button',{name:'Отправить заявку',exact:true}).click();
 await page.getByRole('heading',{name:'Заявка отправлена',exact:true}).waitFor();
 assert.equal(curatorApplications,1);
 await page.screenshot({path:output+'/alpha-curator.png'});
 await page.goto('http://127.0.0.1:'+port+'/p/topic-0',{waitUntil:'domcontentloaded'});
 await page.locator('.reply-composer [role="textbox"]').fill('Проверяем отправку одного ответа без повторов.');
 await page.getByRole('button',{name:'Отправить ответ',exact:true}).click();
 await page.getByRole('button',{name:'Отправляем…',exact:true}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Отправляем…',exact:true}).isDisabled(),true);
 await page.waitForFunction(()=>document.querySelector('.reply-composer [role="textbox"]')?.textContent==='');
 assert.equal(replies,1);
 failFeed=true;
 await page.goto('http://127.0.0.1:'+port+'/',{waitUntil:'domcontentloaded'});
 await page.getByText('Не удалось загрузить обсуждения. Попробуйте ещё раз.',{exact:true}).waitFor();
 failFeed=false;
 await page.getByRole('button',{name:'Попробовать снова',exact:true}).click();
 await page.locator('.forum-topic').first().waitFor();
 assert.deepEqual(errors,[]);console.log('V49: approved monochrome homepage, topic table, menus, ranking, popular today and responsive checks passed');
 await page.setViewportSize({width:1672,height:941});
 await page.goto('http://127.0.0.1:'+port+'/preview/home',{waitUntil:'domcontentloaded'});
 await page.locator('.forum-topic').first().waitFor();
 await page.locator('.auth-actions').waitFor();
 await page.waitForTimeout(300);
 await page.evaluate(()=>document.fonts.ready);
 const boxes=await page.evaluate(()=>Object.fromEntries(['.forum-search-hero','.forum-sidebar','.forum-right','.forum-important','.forum-feed-toolbar','.forum-topic'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [selector,{x:r.x,y:r.y,width:r.width,height:r.height}]})));
 assert(Math.abs(boxes['.forum-search-hero'].x-314)<=3);
 assert(Math.abs(boxes['.forum-search-hero'].width-974)<=5);
 assert(Math.abs(boxes['.forum-right'].x-1307)<=3);
 assert(Math.abs(boxes['.forum-feed-toolbar'].y-487)<=8);
 assert(boxes['.forum-topic'].height>=48 && boxes['.forum-topic'].height<=50,`Compact topic row drifted: ${boxes['.forum-topic'].height}px`);
 assert.equal(await page.locator('.forum-feed-title').textContent(),'Обсуждения');
 assert.equal(await page.locator('.forum-feed-title').evaluate(el=>getComputedStyle(el).textTransform),'none');
 assert.notEqual(await page.locator('.forum-feed-create>span').evaluate(el=>getComputedStyle(el).display),'none');
 assert.match(await page.locator('.forum-feed-create').evaluate(el=>getComputedStyle(el).backgroundColor),/^rgb\(/);
 const firstTopic=page.locator('.forum-topic').first();
 assert.match(await firstTopic.locator('.forum-topic-avatar').getAttribute('href') ?? '',/^\/u\/[^/]+$/,'Topic avatar must lead to an author profile, not a community');
 assert.equal(await firstTopic.locator('.forum-topic-avatar img').count(),1,'Topic feed should render a visual avatar, not a category initial');
 assert((await firstTopic.locator('.forum-topic-avatar img').getAttribute('src'))?.includes('/forrum-assets/avatar-'),'Fallback profile avatar should use the approved visual avatar set');
 assert.equal(await firstTopic.locator('.forum-topic-metric').count(),3,'Topic row keeps replies, views and bookmarks together');
 assert.equal(await firstTopic.locator('.forum-topic-category-cell').count(),1,'Category needs its own column');
 const categoryBox=await firstTopic.locator('.forum-topic-category-cell').boundingBox();
 const contentBox=await firstTopic.locator('.forum-topic-content').boundingBox();
 assert(categoryBox && contentBox && categoryBox.x>=contentBox.x+contentBox.width-1,'Category column must follow the title column');
 const titleBox=await firstTopic.locator('.forum-topic-title-line').boundingBox();
 const contextBox=await firstTopic.locator('.forum-topic-context').boundingBox();
 assert(titleBox && contextBox && contextBox.y>=titleBox.y+titleBox.height-1,'Author/category metadata must sit below the title');
 await writeFile(output+'/reference-geometry.json',JSON.stringify(boxes,null,2));
 await page.screenshot({path:output+'/reference-preview.png'});
 const {checkHomeSnapshot}=await import('./home-visual-check.mjs');
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:output+'/reference-mobile.png'});
 const suffix=process.env.PORTABLE_CHROMIUM?'-portable':'';
 await checkHomeSnapshot(output+'/reference-preview.png',root+'docs/design-reference/home-implemented-desktop'+suffix+'.png',output,process.env.UPDATE_HOME_SNAPSHOTS==='1');
 await checkHomeSnapshot(output+'/reference-mobile.png',root+'docs/design-reference/home-implemented-mobile'+suffix+'.png',output,process.env.UPDATE_HOME_SNAPSHOTS==='1');
} catch (cause) { console.error(logs.slice(-4000)); console.error(requests.slice(-12).map(({path,query,method})=>({path,query,method}))); throw cause; }
finally {await browser?.close();web.kill('SIGTERM');upstream.close();}
