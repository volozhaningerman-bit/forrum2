export const homeBannerKey = 'home.banners.v1';
export type HomeBanner = { slot:number; enabled:boolean; kind:'ad'|'promotion'; title:string; imageLight:string; imageDark:string; href:string; startsAt:string; endsAt:string; disclosure:string };
function text(value:unknown, max:number) { if(typeof value !== 'string' || value.length > max) throw new Error('Некорректное текстовое поле баннера'); return value.trim(); }
function safeUrl(value:string) {
 if (/\s|\\|[\u0000-\u001f]|%2f|%5c|%0[ad]/i.test(value)) return false;
 if (/^\/[a-zA-Z0-9]/.test(value)) return true;
 try {const url=new URL(value); return url.protocol==='https:' && !!url.hostname && !url.username && !url.password;} catch{return false;}
}
export function validateBanners(value:unknown):HomeBanner[] {
 if (!Array.isArray(value) || value.length > 2) throw new Error('Доступны два места для баннеров');
 const slots = new Set<number>();
 return value.map(raw => {
  if (!raw || typeof raw !== 'object' || ![1,2].includes(raw.slot) || slots.has(raw.slot) || typeof raw.enabled !== 'boolean' || !['ad','promotion'].includes(raw.kind)) throw new Error('Проверьте номер и тип баннера');
  slots.add(raw.slot);
  const item:HomeBanner={slot:raw.slot,enabled:raw.enabled,kind:raw.kind,title:text(raw.title,100),imageLight:text(raw.imageLight,2000),imageDark:text(raw.imageDark ?? '',2000),href:text(raw.href,2000),startsAt:text(raw.startsAt ?? '',40),endsAt:text(raw.endsAt ?? '',40),disclosure:text(raw.disclosure ?? '',300)};
  for(const url of [item.imageLight,item.imageDark,item.href]) if(url && !safeUrl(url)) throw new Error('Используйте HTTPS или внутренний адрес /…');
  if(item.enabled && (!item.title || !item.imageLight || !item.href)) throw new Error('Для показа нужны название, изображение и ссылка');
  if(item.enabled && item.kind==='ad' && !item.disclosure) throw new Error('Укажите информацию о рекламодателе');
  for(const date of [item.startsAt,item.endsAt]) if(date && (!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(date) || !Number.isFinite(Date.parse(date)))) throw new Error('Некорректный срок показа');
  if(item.startsAt && item.endsAt && Date.parse(item.endsAt)<=Date.parse(item.startsAt)) throw new Error('Окончание должно быть позже начала');
  return item;
 }).sort((a,b)=>a.slot-b.slot);
}
export function activeBanners(value:unknown,now=new Date()):HomeBanner[] {
 try{return validateBanners(value).filter(item=>item.enabled && (!item.startsAt || Date.parse(item.startsAt)<=now.getTime()) && (!item.endsAt || Date.parse(item.endsAt)>now.getTime()));}catch{return [];}
}

export function defaultHomeBanners(): HomeBanner[] {
 return [
  {slot:1,enabled:true,kind:'promotion',title:'AI-инструменты для ваших проектов',imageLight:'/images/home/tools-v35.webp',imageDark:'',href:'/search?q=AI',startsAt:'',endsAt:'',disclosure:''},
  {slot:2,enabled:true,kind:'promotion',title:'Покажи, что ты создал с AI',imageLight:'/images/home/creations-v35.webp',imageDark:'',href:'/create?intent=result',startsAt:'',endsAt:'',disclosure:''},
 ];
}
