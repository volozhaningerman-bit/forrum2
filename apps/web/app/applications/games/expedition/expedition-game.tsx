'use client';

import { useEffect, useMemo, useState } from 'react';
import { depths, itemById, items, lootCycle, rarityLabels, slotLabels, slotOrder } from './expedition-data';
import type { ItemInstance, Rarity, Slot, View } from './expedition-data';

type ExpeditionState = { depth:number; startedAt:number; endsAt:number; cost:number };
type SaveState = {
  energy:number;
  xp:number;
  level:number;
  coins:number;
  runs:number;
  maxDepth:number;
  inventory:ItemInstance[];
  equipped:Partial<Record<Slot,string>>;
  expedition:ExpeditionState|null;
  joinedRaid:boolean;
  raidParticipants:number;
  factionContribution:number;
  syndicateContribution:number;
  warehouseMetal:number;
};

const STORAGE_KEY='4rrum.expedition.alpha.v1';
const MAX_ENERGY=12;
const defaultSave:SaveState={
  energy:MAX_ENERGY,xp:0,level:1,coins:1200,runs:0,maxDepth:1,inventory:[],equipped:{},
  expedition:null,joinedRaid:false,raidParticipants:4,factionContribution:140,syndicateContribution:55,warehouseMetal:1240,
};

function loadSave():SaveState{
  if(typeof window==='undefined') return defaultSave;
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}') as Partial<SaveState>;
    return {...defaultSave,...parsed,inventory:Array.isArray(parsed.inventory)?parsed.inventory:[],equipped:parsed.equipped||{},expedition:parsed.expedition??null};
  }catch{return defaultSave;}
}

function rarityClass(r:Rarity){return 'rarity-'+r;}
function formatTime(ms:number){return '00:'+String(Math.max(0,Math.ceil(ms/1000))).padStart(2,'0');}

export function ExpeditionGame(){
  const [view,setView]=useState<View>('expeditions');
  const [save,setSave]=useState<SaveState>(()=>loadSave());
  const [selectedDepth,setSelectedDepth]=useState(1);
  const [selectedUid,setSelectedUid]=useState<string|null>(null);
  const [notice,setNotice]=useState('Первая цель — вернуться из экспедиции с предметом.');
  const [now,setNow]=useState(Date.now());

  useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(save));},[save]);
  useEffect(()=>{const t=window.setInterval(()=>setNow(Date.now()),500);return()=>window.clearInterval(t);},[]);

  useEffect(()=>{
    const active=save.expedition;
    if(!active||active.endsAt>now) return;
    const templateId=lootCycle[save.runs%lootCycle.length];
    const template=itemById[templateId];
    const serial=((save.runs*137+active.depth*53)%template.supply)+1;
    const uid=templateId+'-'+(save.runs+1)+'-'+serial;
    const nextXp=save.xp+18+active.depth*7;
    setSave(current=>({
      ...current,
      expedition:null,
      runs:current.runs+1,
      xp:nextXp,
      level:Math.max(current.level,1+Math.floor(nextXp/100)),
      maxDepth:Math.min(5,Math.max(current.maxDepth,active.depth<5?active.depth+1:5)),
      coins:current.coins+70+active.depth*30,
      inventory:[...current.inventory,{uid,templateId,serial}],
    }));
    setSelectedUid(uid);
    setNotice('Найден '+template.name+' #'+String(serial).padStart(4,'0')+' / '+template.supply+'.');
    setView('inventory');
  },[now,save.expedition,save.runs,save.xp]);

  const equippedCount=Object.values(save.equipped).filter(Boolean).length;
  const power=useMemo(()=>10+save.level*2+Object.values(save.equipped).reduce((sum,uid)=>{
    const instance=save.inventory.find(i=>i.uid===uid);
    return sum+(instance?itemById[instance.templateId]?.power||0:0);
  },0),[save.equipped,save.inventory,save.level]);
  const selectedItem=selectedUid?save.inventory.find(i=>i.uid===selectedUid)||null:null;
  const selectedTemplate=selectedItem?itemById[selectedItem.templateId]:null;
  const depth=depths[selectedDepth-1];
  const remaining=save.expedition?save.expedition.endsAt-now:0;

  const startExpedition=()=>{
    if(save.expedition) return;
    if(selectedDepth>save.maxDepth){setNotice('Глубина ещё закрыта. Сначала пройдите предыдущую.');return;}
    if(save.energy<depth.cost){setNotice('Недостаточно энергии.');return;}
    const startedAt=Date.now();
    setSave(s=>({...s,energy:s.energy-depth.cost,expedition:{depth:selectedDepth,cost:depth.cost,startedAt,endsAt:startedAt+depth.seconds*1000}}));
    setNotice('Персонаж отправлен в экспедицию. Состояние сохранено.');
  };

  const equip=(instance:ItemInstance)=>{
    const template=itemById[instance.templateId];
    setSave(s=>({...s,equipped:{...s.equipped,[template.slot]:instance.uid}}));
    setNotice(template.name+' надет — внешний вид изменён.');
  };

  const unequip=(slot:Slot)=>setSave(s=>{const equipped={...s.equipped};delete equipped[slot];return{...s,equipped};});
  const reset=()=>{localStorage.removeItem(STORAGE_KEY);setSave(defaultSave);setSelectedUid(null);setSelectedDepth(1);setView('expeditions');setNotice('Альфа-прогресс сброшен.');};

  return <section className="expedition-app" data-testid="expedition-alpha">
    <header className="expedition-hud">
      <div className="expedition-brand"><span>E</span><div><strong>Экспедиция</strong><small>4rrum game · alpha 0.1</small></div></div>
      <div className="expedition-stats">
        <Stat label="Энергия" value={save.energy+'/'+MAX_ENERGY}/><Stat label="Сила" value={String(power)}/><Stat label="Уровень" value={String(save.level)}/><Stat label="Монеты" value={save.coins.toLocaleString('ru-RU')}/>
      </div>
      <button className="expedition-reset" onClick={reset}>Сброс альфы</button>
    </header>

    <div className="expedition-shell">
      <aside className="expedition-nav" aria-label="Разделы игры">
        <Nav active={view==='expeditions'} icon="⌁" label="Экспедиции" onClick={()=>setView('expeditions')}/>
        <Nav active={view==='character'} icon="♙" label="Персонаж" onClick={()=>setView('character')}/>
        <Nav active={view==='inventory'} icon="▦" label="Инвентарь" badge={save.inventory.length||undefined} onClick={()=>setView('inventory')}/>
        <Nav active={view==='raid'} icon="⚔" label="Босс" badge={save.raidParticipants} onClick={()=>setView('raid')}/>
        <Nav active={view==='faction'} icon="△" label="Категория" onClick={()=>setView('faction')}/>
        <Nav active={view==='syndicate'} icon="⬡" label="Синдикат" onClick={()=>setView('syndicate')}/>
        <Nav active={view==='market'} icon="◈" label="Рынок" onClick={()=>setView('market')}/>
        <Nav active={view==='warehouse'} icon="▤" label="Склад" onClick={()=>setView('warehouse')}/>
      </aside>

      <main className="expedition-main">
        {view==='expeditions'&&<div className="expedition-expeditions">
          <section className="location-card">
            <div className="location-scene"><div className="sun"/><div className="ruin r1"/><div className="ruin r2"/><div className="tech-ring"/><div className="camp"/></div>
            <div className="location-copy"><small>Локация 01</small><h1>Ржавые Окраины</h1><p>Средневековый пригород вырос на руинах древней инфраструктуры. Чем глубже вылазка, тем опаснее находки.</p>
              <div className="depth-grid">{depths.map(d=><button key={d.depth} className={(selectedDepth===d.depth?'active ':'')+(d.depth>save.maxDepth?'locked':'')} onClick={()=>d.depth<=save.maxDepth&&setSelectedDepth(d.depth)}><span>{d.depth}</span><b>{d.name}</b><small>{d.depth>save.maxDepth?'закрыто':d.cost+' энергии · '+d.seconds+' сек'}</small></button>)}</div>
            </div>
          </section>
          <section className="run-card"><small>Глубина {selectedDepth}</small><h2>{depth.name}</h2><p>{depth.note}</p><dl><div><dt>Рекомендуемая сила</dt><dd>{depth.power||'любая'}</dd></div><div><dt>Стоимость</dt><dd>{depth.cost} энергии</dd></div><div><dt>Лут</dt><dd>опыт · монеты · предмет</dd></div></dl>
            {save.expedition?<div className="running"><div><strong>Персонаж в пути</strong><b>{formatTime(remaining)}</b></div><span><i style={{width:Math.min(100,Math.max(4,((now-save.expedition.startedAt)/(save.expedition.endsAt-save.expedition.startedAt))*100))+'%'}}/></span></div>:<button className="primary" onClick={startExpedition}>Отправить в экспедицию</button>}
          </section>
        </div>}

        {view==='character'&&<div className="character-view">
          <section className="hero-card"><PaperDoll equipped={save.equipped} inventory={save.inventory}/><div className="hero-meta"><small>Новичок · Пограничник</small><h1>Странник</h1><p>Базовый герой начинает в лохмотьях. Каждый надетый слот добавляет отдельный визуальный слой.</p><div><span>Сила <b>{power}</b></span><span>Надето <b>{equippedCount}/16</b></span></div></div></section>
          <section className="slots-panel"><SectionTitle kicker="Paper-doll" title="16 слотов экипировки" right={equippedCount+'/16'}/><div className="slot-grid">{slotOrder.map(slot=>{const uid=save.equipped[slot];const inst=uid?save.inventory.find(i=>i.uid===uid):null;const item=inst?itemById[inst.templateId]:null;return <button key={slot} className={'slot '+(item?rarityClass(item.rarity):'')} onClick={()=>item?unequip(slot):setView('inventory')}><span>{item?.icon||'·'}</span><b>{slotLabels[slot]}</b><small>{item?.name||'Пусто'}</small></button>})}</div></section>
        </div>}

        {view==='inventory'&&<div className="inventory-view">
          <section className="inventory-panel"><SectionTitle kicker="У каждого экземпляра свой номер" title="Инвентарь" right={save.inventory.length+'/120'}/>{save.inventory.length===0?<Empty title="Инвентарь пуст" text="Вернитесь из первой экспедиции — предмет гарантирован." action="К экспедиции" onAction={()=>setView('expeditions')}/>:<div className="item-grid">{save.inventory.map(inst=>{const item=itemById[inst.templateId];const isEquipped=save.equipped[item.slot]===inst.uid;return <button key={inst.uid} className={'item-card '+rarityClass(item.rarity)+(selectedUid===inst.uid?' selected':'')} onClick={()=>setSelectedUid(inst.uid)}><span>{item.icon}</span><b>{item.name}</b><small>#{String(inst.serial).padStart(4,'0')} / {item.supply}</small>{isEquipped?<em>Надето</em>:null}</button>})}</div>}</section>
          <section className="item-detail">{selectedTemplate&&selectedItem?<><div className={'item-art '+rarityClass(selectedTemplate.rarity)}>{selectedTemplate.icon}</div><small>{rarityLabels[selectedTemplate.rarity]} · {slotLabels[selectedTemplate.slot]}</small><h2>{selectedTemplate.name}</h2><strong>#{String(selectedItem.serial).padStart(4,'0')} / {selectedTemplate.supply}</strong><p>{selectedTemplate.description}</p><div className="power-row"><span>Сила предмета</span><b>+{selectedTemplate.power}</b></div><button className="primary" onClick={()=>equip(selectedItem)}>{save.equipped[selectedTemplate.slot]===selectedItem.uid?'Надето':'Надеть'}</button></>:<Empty title="Выберите предмет" text="Номер и история будут жить вместе с конкретной вещью."/>}</section>
        </div>}

        {view==='raid'&&<div className="raid-view"><section className="boss-stage"><BossFigure/><div><small>Совместный босс · Ржавые Окраины</small><h1>Железный Пастырь</h1><p>В одиночку недоступен. Игроки заранее договариваются и отправляют персонажей к одному времени.</p></div></section><section className="raid-card"><small>Сбор группы</small><h2>Сегодня · 21:00</h2><div className="people"><b>{save.raidParticipants}/6</b><span>участников</span></div><div className="avatars">{Array.from({length:6}).map((_,i)=><span key={i} className={i<save.raidParticipants?'filled':''}>{i<save.raidParticipants?'◆':'+'}</span>)}</div><p>Бой рассчитывается автоматически. Первый альфа-рейд проверяет саму механику сбора.</p><button className="primary" disabled={save.joinedRaid} onClick={()=>{setSave(s=>({...s,joinedRaid:true,raidParticipants:Math.min(6,s.raidParticipants+1)}));setNotice('Вы записаны на рейд.')}}>{save.joinedRaid?'Вы участвуете':'Отправить персонажа'}</button></section></div>}

        {view==='faction'&&<Shared title="Чемпион категории" name="Железный Герольд" level={4} progress={save.factionContribution} goal={500} kind="champion" text="Категория растит своего Чемпиона. На ключевых уровнях он визуально меняется и позже сражается с Чемпионами других категорий." button="Вложить 100 металла" disabled={save.warehouseMetal<100} onClick={()=>setSave(s=>({...s,warehouseMetal:s.warehouseMetal-100,factionContribution:s.factionContribution+100}))}/>}
        {view==='syndicate'&&<Shared title="Синдикат · Караван Пепла" name="Ядро Ковчега" level={2} progress={save.syndicateContribution} goal={250} kind="relic" text="Общий реликт синдиката. Его развивают участники, а синдикаты внутри одной категории соревнуются между собой." button="Вложить 50 металла" disabled={save.warehouseMetal<50} onClick={()=>setSave(s=>({...s,warehouseMetal:s.warehouseMetal-50,syndicateContribution:s.syndicateContribution+50}))}/>}

        {view==='market'&&<section className="market-view"><SectionTitle kicker="Прототип экономики" title="Рынок экземпляров" right={save.coins.toLocaleString('ru-RU')+' монет'}/><div className="market-grid">{items.filter(i=>['uncommon','rare','epic'].includes(i.rarity)).slice(0,8).map((item,index)=><article key={item.id} className={rarityClass(item.rarity)}><span>{item.icon}</span><small>{rarityLabels[item.rarity]}</small><h3>{item.name}</h3><p>#{String(80+index*137).padStart(4,'0')} / {item.supply}</p><b>{(650+item.power*95).toLocaleString('ru-RU')} монет</b><button disabled>Торговля — следующий слой</button></article>)}</div></section>}

        {view==='warehouse'&&<section className="warehouse-view"><SectionTitle kicker="Общий ресурс" title="Склад категории" right="операции будут журналироваться"/><div className="resource-grid"><Resource icon="▰" name="Металл" value={save.warehouseMetal}/><Resource icon="▤" name="Ткань" value={680}/><Resource icon="▧" name="Лом" value={432}/><Resource icon="◇" name="Старые детали" value={215}/><Resource icon="◆" name="Кристалл энергии" value={32}/><Resource icon="◉" name="Механическое ядро" value={8}/></div><div className="shared-note"><b>Правило MVP</b><p>Игроки могут жертвовать ресурсы в общие цели. Свободный вывод из склада до появления ролей и журнала не разрешаем.</p></div></section>}
      </main>

      <aside className="expedition-side"><div className="mini-hero"><PaperDoll compact equipped={save.equipped} inventory={save.inventory}/><strong>Странник</strong><small>Ур. {save.level} · сила {power}</small></div><div className="objective"><small>Текущая цель</small><b>{save.inventory.length?'Откройте глубину 2':'Найдите первый предмет'}</b><p>{save.inventory.length?'Продолжайте вылазки и собирайте экипировку.':'Отправьте персонажа в Ржавые Окраины.'}</p></div><div className="shared-mini"><small>Общий прогресс</small><div><span>Категория</span><b>{save.factionContribution}/500</b></div><div><span>Синдикат</span><b>{save.syndicateContribution}/250</b></div></div></aside>
    </div>
    <footer className="expedition-notice" role="status"><span>ALPHA</span>{notice}</footer>
  </section>;
}

function Stat({label,value}:{label:string;value:string}){return <div className="stat"><small>{label}</small><strong>{value}</strong></div>}
function Nav({active,icon,label,badge,onClick}:{active:boolean;icon:string;label:string;badge?:number;onClick:()=>void}){return <button className={active?'active':''} onClick={onClick}><span>{icon}</span><b>{label}</b>{badge!==undefined?<em>{badge}</em>:null}</button>}
function SectionTitle({kicker,title,right}:{kicker:string;title:string;right:string}){return <div className="section-title"><div><small>{kicker}</small><h2>{title}</h2></div><span>{right}</span></div>}
function Empty({title,text,action,onAction}:{title:string;text:string;action?:string;onAction?:()=>void}){return <div className="empty"><span>◇</span><h3>{title}</h3><p>{text}</p>{action&&onAction?<button onClick={onAction}>{action}</button>:null}</div>}
function Resource({icon,name,value}:{icon:string;name:string;value:number}){return <article><span>{icon}</span><b>{name}</b><strong>{value.toLocaleString('ru-RU')}</strong></article>}

function Shared({title,name,level,progress,goal,kind,text,button,disabled,onClick}:{title:string;name:string;level:number;progress:number;goal:number;kind:'champion'|'relic';text:string;button:string;disabled:boolean;onClick:()=>void}){
  const pct=Math.min(100,Math.round(progress/goal*100));
  return <section className="shared-view"><div className={'shared-art '+kind}>{kind==='champion'?<ChampionFigure/>:<RelicFigure/>}</div><div className="shared-copy"><small>{title}</small><h1>{name}</h1><b>Уровень {level}</b><p>{text}</p><div className="shared-progress"><span><b>{progress}</b> / {goal}</span><div><i style={{width:pct+'%'}}/></div></div><button className="primary" disabled={disabled} onClick={onClick}>{button}</button></div></section>
}

function equippedTemplate(slot:Slot,equipped:Partial<Record<Slot,string>>,inventory:ItemInstance[]){
  const uid=equipped[slot]; if(!uid) return null;
  const instance=inventory.find(i=>i.uid===uid); return instance?itemById[instance.templateId]:null;
}

function PaperDoll({equipped,inventory,compact=false}:{equipped:Partial<Record<Slot,string>>;inventory:ItemInstance[];compact?:boolean}){
  const get=(slot:Slot)=>equippedTemplate(slot,equipped,inventory);
  const head=get('head'),chest=get('chest'),cape=get('cape'),shoulders=get('shoulders'),gloves=get('gloves'),belt=get('belt'),legs=get('legs'),feet=get('feet'),main=get('mainhand'),off=get('offhand'),neck=get('neck'),r1=get('relic1'),r2=get('relic2'),ring1=get('ring1'),ring2=get('ring2');
  return <svg className={compact?'paper-doll compact':'paper-doll'} viewBox="0 0 260 420" role="img" aria-label="Персонаж в текущем снаряжении">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    {cape?<path d="M86 104 Q45 180 63 330 L123 350 L158 330 Q188 215 168 108Z" fill={cape.color} opacity=".92"/>:null}
    <circle cx="130" cy="64" r="34" fill="#e1a477"/><path d="M100 55 Q105 18 139 24 Q167 27 166 58 Q150 42 132 44 Q116 52 100 55Z" fill="#34261f"/>
    {head?<path d="M96 62 Q99 20 132 17 Q169 20 169 65 L156 50 L105 51Z" fill={head.color} stroke="#e7d8b8" strokeWidth="4"/>:null}
    <path d="M101 93 Q130 78 159 93 L176 214 Q145 231 84 214Z" fill={chest?.color||'#b89c78'} stroke="#3c3027" strokeWidth="4"/>
    {!chest?<><path d="M93 126 L165 152" stroke="#58402f" strokeWidth="9"/><path d="M151 97 L95 211" stroke="#5c4433" strokeWidth="8"/></>:null}
    {shoulders?<><ellipse cx="86" cy="112" rx="31" ry="19" fill={shoulders.color} stroke="#c6b18a" strokeWidth="4"/><ellipse cx="174" cy="112" rx="31" ry="19" fill={shoulders.color} stroke="#c6b18a" strokeWidth="4"/></>:null}
    <path d="M89 116 Q65 160 70 215" stroke="#d39b72" strokeWidth="23" strokeLinecap="round"/><path d="M171 116 Q195 160 190 215" stroke="#d39b72" strokeWidth="23" strokeLinecap="round"/>
    {gloves?<><path d="M58 195 h28 v42 h-30Z" fill={gloves.color}/><path d="M174 195 h28 l2 42 h-30Z" fill={gloves.color}/></>:<><path d="M58 199 h27" stroke="#5e4436" strokeWidth="10"/><path d="M175 199 h27" stroke="#5e4436" strokeWidth="10"/></>}
    {belt?<rect x="82" y="198" width="96" height="22" rx="7" fill={belt.color} stroke="#3b2b22" strokeWidth="4"/>:<rect x="86" y="201" width="88" height="13" rx="5" fill="#5e4433"/>}
    <path d="M96 214 L121 214 L117 335 L79 335Z" fill={legs?.color||'#4d5661'}/><path d="M139 214 L164 214 L181 335 L143 335Z" fill={legs?.color||'#4d5661'}/>
    {!legs?<><path d="M82 272 L112 280" stroke="#b99471" strokeWidth="9"/><path d="M148 254 L176 263" stroke="#b99471" strokeWidth="9"/></>:null}
    <path d="M78 330 L117 330 L116 381 L72 381Z" fill={feet?.color||'#5f4938'}/><path d="M143 330 L181 330 L188 381 L144 381Z" fill={feet?.color||'#5f4938'}/>
    {neck?<circle cx="130" cy="99" r="8" fill={neck.color} filter="url(#glow)"/>:null}
    {r1?<circle cx="86" cy="190" r="9" fill={r1.color} filter="url(#glow)"/>:null}{r2?<circle cx="174" cy="190" r="9" fill={r2.color} filter="url(#glow)"/>:null}
    {ring1?<circle cx="67" cy="226" r="5" fill={ring1.color}/>:null}{ring2?<circle cx="193" cy="226" r="5" fill={ring2.color}/>:null}
    {main?<g transform="translate(34 150) rotate(-8)"><rect x="0" y="0" width="10" height="190" rx="4" fill="#4b3529"/><path d="M-14 5 L5 -52 L24 5Z" fill={main.color} stroke="#dce6e4" strokeWidth="3"/></g>:null}
    {off?<g transform="translate(196 150)"><path d="M0 0 Q46 20 32 100 Q0 125 -32 100 Q-46 20 0 0Z" fill={off.color} stroke="#ded4b5" strokeWidth="4"/></g>:null}
  </svg>
}

function BossFigure(){return <svg className="boss-figure" viewBox="0 0 520 500"><circle cx="270" cy="180" r="145" fill="#5d271d" opacity=".35"/><path d="M170 100 L350 100 L400 170 L372 392 L285 455 L160 398 L120 185Z" fill="#2a2624" stroke="#c36d35" strokeWidth="10"/><path d="M190 86 L258 40 L330 90 L315 170 L210 170Z" fill="#3c3630" stroke="#e19145" strokeWidth="8"/><circle cx="260" cy="118" r="24" fill="#ff8b24" filter="url(#bossGlow)"/><path d="M130 195 L45 160 L28 210 L145 260Z" fill="#41372e" stroke="#c16e38" strokeWidth="9"/><path d="M390 185 L470 120 L500 170 L402 265Z" fill="#41372e" stroke="#c16e38" strokeWidth="9"/><rect x="412" y="128" width="38" height="260" rx="16" fill="#5b4230"/><circle cx="431" cy="118" r="55" fill="#7e3c24" stroke="#e58e48" strokeWidth="10"/><defs><filter id="bossGlow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>}
function ChampionFigure(){return <svg className="shared-figure" viewBox="0 0 420 480"><path d="M95 430 Q80 220 124 128 Q210 70 296 128 Q340 220 325 430Z" fill="#24313a" stroke="#d49b52" strokeWidth="9"/><path d="M152 126 L210 60 L268 126 L252 190 L168 190Z" fill="#35454e" stroke="#f0b762" strokeWidth="8"/><circle cx="210" cy="146" r="24" fill="#49c9ef"/><path d="M92 174 L28 220 L72 270 L128 216Z" fill="#394852" stroke="#d49b52" strokeWidth="8"/><path d="M328 174 L392 220 L348 270 L292 216Z" fill="#394852" stroke="#d49b52" strokeWidth="8"/><path d="M120 275 L300 275 L330 430 L90 430Z" fill="#20323c"/><circle cx="210" cy="260" r="34" fill="#43bfe6" opacity=".9"/></svg>}
function RelicFigure(){return <svg className="shared-figure" viewBox="0 0 420 480"><g fill="none" stroke="#4bd7ee"><ellipse cx="210" cy="240" rx="145" ry="62" strokeWidth="11"/><ellipse cx="210" cy="240" rx="82" ry="160" strokeWidth="9" transform="rotate(28 210 240)"/><ellipse cx="210" cy="240" rx="82" ry="160" strokeWidth="9" transform="rotate(-28 210 240)"/></g><circle cx="210" cy="240" r="74" fill="#163d55" stroke="#d7a457" strokeWidth="12"/><circle cx="210" cy="240" r="40" fill="#57e4ff"/><circle cx="210" cy="240" r="20" fill="white"/></svg>}
