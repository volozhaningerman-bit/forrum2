import { createHash } from 'node:crypto';
export const aiTaxonomy = [
 ['ai-start','Старт в AI',null,'Первые шаги, вопросы новичков и обмен промптами.','#789747'],
 ['ai-beginners','Вопросы новичков','ai-start','Помощь с инструментами и первыми задачами.','#789747'],
 ['ai-prompts','Промпты','ai-start','Промпты, результаты и условия их применения.','#b49349'],
 ['ai-code','Код и автоматизация',null,'Разработка с AI, агенты и автоматизация.','#5d8db5'],
 ['ai-coding','AI-кодинг','ai-code','Проверка, отладка и разработка кода с нейросетями.','#5d8db5'],
 ['ai-agents','Агенты','ai-code','Сценарии, интеграции и опыт использования агентов.','#5d8db5'],
 ['ai-design','Изображения и дизайн',null,'Генерации, дизайн и разбор работ.','#789747'],
 ['ai-generations','Генерации и разборы','ai-design','Сравнение результата и исходного промпта.','#b49349'],
 ['ai-media','Видео и музыка',null,'Создание видео, анимации, музыки и звука с AI.','#b49349'],
 ['ai-business','Работа и бизнес',null,'Интернет-проекты, продвижение и применение AI в работе.','#789747'],
 ['ai-models','Модели и инструменты',null,'Сравнение моделей и практический опыт.','#9176ad'],
 ['video-games','Видеоигры',null,'Игровые сообщества, GTA RP и применение AI в играх.','#789747'],
 ['ai-in-games','AI в играх','video-games','AI-инструменты, моды, NPC и разработка игр.','#5d8db5'],
 ['general-chat','Свободное общение',null,'Знакомства, интересы и разговоры участников.','#b49349'],
].map(([slug,name,parent,description,accentColor])=>({slug:slug!,name:name!,parent,description:description!,accentColor:accentColor!}));
export const legacyParents:Record<string,string>={'gta-rp':'video-games','internet-projects':'ai-business','promotion':'ai-business','telegram':'ai-code','workshop':'ai-business'};
export type ExistingNode={id:string;slug:string;name:string;parentId:string|null;description:string;shortDescription:string|null;accentColor:string;status:string};
export function taxonomyVersion(nodes:ExistingNode[]){return createHash('sha256').update(JSON.stringify([...nodes].sort((a,b)=>a.id.localeCompare(b.id)))).digest('hex');}
export function taxonomyPreview(nodes:ExistingNode[]){
 const bySlug=new Map(nodes.map(n=>[n.slug,n]));
 const rows=aiTaxonomy.map(n=>({slug:n.slug,name:n.name,parent:n.parent,action:bySlug.has(n.slug)?'keep':'create'}));
 for(const [slug,parent] of Object.entries(legacyParents)){const n=bySlug.get(slug);if(n&&n.status==='ACTIVE')rows.push({slug,name:n.name,parent,action:n.parentId===bySlug.get(parent)?.id?'keep':'move'});}
 const life=bySlug.get('forrum-start');if(life&&life.status==='ACTIVE')rows.push({slug:life.slug,name:'Жизнь FORRUM',parent:null,action:life.name==='Жизнь FORRUM'?'keep':'rename'});
 return {version:taxonomyVersion(nodes),rows};
}
