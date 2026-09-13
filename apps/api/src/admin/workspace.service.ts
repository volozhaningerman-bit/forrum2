import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { smtpOptions } from '../auth/smtp-options.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CategorySettingsDto } from './workspace.dto.js';
const person={username:true,displayName:true,avatarUrl:true} as const;
export function pageParams(input='1',q=''){const page=Number(input);if(!Number.isInteger(page)||page<1||page>100000||q.length>100)throw new BadRequestException('Проверьте параметры поиска');return {page,take:25,skip:(page-1)*25,query:q.trim()};}
@Injectable()
export class WorkspaceService {
 constructor(private readonly prisma:PrismaService,private readonly config:ConfigService){}
 async queues(){
  const queries=[this.prisma.report.count({where:{status:'OPEN'}}),this.prisma.moderationAppeal.count({where:{status:'OPEN'}}),this.prisma.profileReview.count({where:{moderationStatus:'REVIEW'}}),this.prisma.workshopItem.count({where:{status:'REVIEW'}}),this.prisma.mediaPartner.count({where:{status:'REVIEW'}}),this.prisma.communityProposal.count({where:{status:'OPEN'}})];
  const keys=['reports','appeals','reviews','workshop','partners','proposals'];const values=await Promise.allSettled(queries);return keys.map((key,i)=>({key,count:values[i].status==='fulfilled'?values[i].value:null}));
 }
 async queue(kind:string,input?:string,state='pending',q=''){
  const {page,take,skip,query}=pageParams(input,q);if(!['pending','done','all'].includes(state))throw new BadRequestException('Неизвестный фильтр');
  const status=(value:string)=>state==='all'?undefined:state==='done'?{not:value}:value;
  const search=query?{contains:query,mode:'insensitive' as const}:undefined;
  const orderBy=[{createdAt:'desc' as const},{id:'asc' as const}];
  // Each queue has an explicit shape; never include account secrets.
  if(kind==='reports'){const where={status:status('OPEN') as never,...(search?{OR:[{reason:search},{details:search}]}:{})};const [items,total]=await Promise.all([this.prisma.report.findMany({where,take,skip,orderBy,include:{author:{select:person},publication:{include:{author:{select:person}}},comment:{include:{author:{select:person}}}}}),this.prisma.report.count({where})]);return {items,total,page,pageSize:take};}
  if(kind==='appeals'){const where={status:status('OPEN') as never,...(search?{body:search}:{})};const [items,total]=await Promise.all([this.prisma.moderationAppeal.findMany({where,take,skip,orderBy,include:{user:{select:person},action:true}}),this.prisma.moderationAppeal.count({where})]);return {items,total,page,pageSize:take};}
  if(kind==='reviews'){const where={moderationStatus:status('REVIEW') as never,...(search?{body:search}:{})};const [items,total]=await Promise.all([this.prisma.profileReview.findMany({where,take,skip,orderBy,include:{author:{select:person},target:{select:person},interaction:{select:{id:true,type:true,title:true}},evidenceMedia:{select:{id:true}}}}),this.prisma.profileReview.count({where})]);return {items,total,page,pageSize:take};}
  if(kind==='workshop'){const where={status:status('REVIEW') as never,...(search?{title:search}:{})};const [items,total]=await Promise.all([this.prisma.workshopItem.findMany({where,take,skip,orderBy,include:{author:{select:person}}}),this.prisma.workshopItem.count({where})]);return {items,total,page,pageSize:take};}
  if(kind==='partners'){const where={status:status('REVIEW') as never,...(search?{displayName:search}:{})};const [items,total]=await Promise.all([this.prisma.mediaPartner.findMany({where,take,skip,orderBy,include:{user:{select:person}}}),this.prisma.mediaPartner.count({where})]);return {items,total,page,pageSize:take};}
  if(kind==='proposals'){const where={status:status('OPEN') as never,...(search?{name:search}:{})};const [items,total]=await Promise.all([this.prisma.communityProposal.findMany({where,take,skip,orderBy,include:{author:{select:person},suggestedParent:{select:{name:true,slug:true}}}}),this.prisma.communityProposal.count({where})]);return {items,total,page,pageSize:take};}
  throw new BadRequestException('Очередь не найдена');
 }
 async categories(){return this.prisma.community.findMany({orderBy:[{sortOrder:'asc'},{createdAt:'asc'},{id:'asc'}],include:{_count:{select:{publications:true,subscriptions:true}}}});}
 async category(id:string,dto:CategorySettingsDto,actorId:string){
  if(dto.name.trim().length<2||dto.description.trim().length<20)throw new BadRequestException('Заполните название и описание');
  return this.prisma.$transaction(async tx=>{
   await tx.$executeRaw`SELECT pg_advisory_xact_lock(38001)`;
   const before=await tx.community.findUnique({where:{id}});if(!before)throw new NotFoundException('Категория не найдена');
   const nodes=await tx.community.findMany({select:{id:true,parentId:true,status:true}});let parent=dto.parentId;const seen=new Set([id]);
   while(parent){if(seen.has(parent))throw new BadRequestException('Нельзя переместить категорию внутрь себя или своего подраздела');seen.add(parent);const node=nodes.find(n=>n.id===parent);if(!node||node.status!=='ACTIVE')throw new BadRequestException('Родительская категория должна быть активной');parent=node.parentId;}
   if(dto.status==='ARCHIVED'&&nodes.some(n=>n.parentId===id&&n.status==='ACTIVE'))throw new BadRequestException('Сначала перенесите или архивируйте активные подразделы');
   const data={name:dto.name.trim(),description:dto.description.trim(),shortDescription:dto.shortDescription.trim(),parentId:dto.parentId??null,sortOrder:dto.sortOrder,status:dto.status};
   await tx.community.update({where:{id},data});
   await tx.auditLog.create({data:{actorId,action:'community.settings',entityType:'Community',entityId:id,metadata:{before:{name:before.name,parentId:before.parentId,status:before.status,sortOrder:before.sortOrder},after:data}}});return {ok:true};
  });
 }
 async user(username:string){
  const user=await this.prisma.user.findUnique({where:{username},select:{id:true,username:true,displayName:true,email:true,createdAt:true,emailVerifiedAt:true,role:true,state:true,_count:{select:{publications:true,comments:true}}}});if(!user)throw new NotFoundException('Пользователь не найден');
  const [roles,publications]=await Promise.all([this.prisma.communityRole.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'},include:{community:{select:{name:true,slug:true}}}}),this.prisma.publication.findMany({where:{authorId:user.id},take:10,orderBy:{createdAt:'desc'},select:{title:true,slug:true,status:true}})]);return {...user,roles,publications};
 }
 async journal(input?:string,q=''){
  const {page,take,skip,query}=pageParams(input,q);const where=query?{OR:[{action:{contains:query,mode:'insensitive' as const}},{actor:{username:{contains:query,mode:'insensitive' as const}}}]}:{};
  const [items,total]=await Promise.all([this.prisma.auditLog.findMany({where,take,skip,orderBy:[{createdAt:'desc'},{id:'asc'}],select:{id:true,action:true,entityType:true,entityId:true,createdAt:true,actor:{select:person}}}),this.prisma.auditLog.count({where})]);return {items,total,page,pageSize:take};
 }
 async transactions(input?:string,q=''){
  const {page,take,skip,query}=pageParams(input,q);const where=query?{wallet:{user:{username:{contains:query,mode:'insensitive' as const}}}}:{};
  const [items,total]=await Promise.all([this.prisma.walletTransaction.findMany({where,take,skip,orderBy:[{createdAt:'desc'},{id:'asc'}],select:{id:true,type:true,amount:true,description:true,createdAt:true,wallet:{select:{user:{select:person}}}}}),this.prisma.walletTransaction.count({where})]);return {items,total,page,pageSize:take};
 }
 async restore(slug:string,reason:string,actorId:string){
  if(reason.trim().length<5)throw new BadRequestException('Укажите причину восстановления');
  return this.prisma.$transaction(async tx=>{const p=await tx.publication.findUnique({where:{slug}});if(!p||p.status!=='HIDDEN')throw new BadRequestException('Восстановить можно только скрытую публикацию');
   await tx.publication.update({where:{id:p.id},data:{status:'PUBLISHED'}});
   await tx.moderationAction.updateMany({where:{publicationId:p.id,actionType:'HIDE',reversedAt:null},data:{reversedAt:new Date()}});
   await tx.auditLog.create({data:{actorId,action:'publication.restore',entityType:'Publication',entityId:p.id,metadata:{reason:reason.trim()}}});return {ok:true};});
 }
 async diagnose(){
  let mail={ok:false,message:'Соединение не проверено'};let transporter:ReturnType<typeof nodemailer.createTransport>|undefined;
  try{transporter=nodemailer.createTransport(smtpOptions(this.config));await transporter.verify();mail={ok:true,message:'SMTP принял соединение. Это не подтверждает доставку в почтовый ящик.'};}catch{mail={ok:false,message:'SMTP недоступен или отклонил авторизацию. Проверьте сервер, порт и учётные данные в Railway.'};}finally{transporter?.close();}
  const token=this.config.get<string>('TELEGRAM_BOT_TOKEN');let telegram={ok:false,message:'Токен бота не задан'};
  if(token){try{const res=await fetch(`https://api.telegram.org/bot${token}/getMe`,{signal:AbortSignal.timeout(5000)});const result=await res.json() as {ok:boolean};telegram={ok:result.ok===true,message:result.ok?'Telegram подтвердил доступ к боту. Права в канале не проверялись.':'Telegram отклонил токен.'};}catch{telegram={ok:false,message:'Не удалось связаться с Telegram.'};}}
  return {checkedAt:new Date().toISOString(),mail,telegram};
 }
}
