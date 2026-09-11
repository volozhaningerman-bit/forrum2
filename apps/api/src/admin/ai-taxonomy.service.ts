import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { aiTaxonomy, legacyParents, taxonomyPreview, taxonomyVersion } from './ai-taxonomy.js';
const select={id:true,slug:true,name:true,parentId:true,description:true,shortDescription:true,accentColor:true,status:true} as const;
@Injectable()
export class AiTaxonomyService {
 constructor(private readonly prisma:PrismaService){}
 async preview(){return taxonomyPreview(await this.prisma.community.findMany({select}));}
 async apply(actorId:string,version:string){return this.prisma.$transaction(async tx=>{
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(35350911)`;
  const before=await tx.community.findMany({select});
  if(taxonomyVersion(before)!==version)throw new ConflictException('Структура изменилась. Обновите предварительный просмотр.');
  const bySlug=new Map(before.map(n=>[n.slug,{...n}]));
  for(const node of aiTaxonomy){const old=bySlug.get(node.slug);if(old&&(old.name!==node.name||old.status!=='ACTIVE'||old.parentId!==(node.parent?bySlug.get(node.parent)?.id:null)))throw new BadRequestException(`Адрес ${node.slug} уже занят другой структурой. Нужен отдельный перенос.`);}
  const created:string[]=[];
  for(const node of aiTaxonomy){if(bySlug.has(node.slug))continue;const n=await tx.community.create({data:{slug:node.slug,name:node.name,description:node.description,shortDescription:node.description,accentColor:node.accentColor,parentId:node.parent?bySlug.get(node.parent)!.id:null,createdById:actorId},select});bySlug.set(n.slug,n);created.push(n.id);}
  for(const [slug,parent] of Object.entries(legacyParents)){const old=bySlug.get(slug);if(!old||old.status!=='ACTIVE')continue;const parentId=bySlug.get(parent)!.id;let cursor:string|null=parentId;const seen=new Set<string>();while(cursor){if(cursor===old.id||seen.has(cursor))throw new BadRequestException('Перенос создаёт цикл категорий.');seen.add(cursor);cursor=[...bySlug.values()].find(n=>n.id===cursor)?.parentId??null;}await tx.community.update({where:{id:old.id},data:{parentId}});old.parentId=parentId;}
  const life=bySlug.get('forrum-start');if(life&&life.status==='ACTIVE')await tx.community.update({where:{id:life.id},data:{name:'Жизнь FORRUM'}});
  await tx.auditLog.create({data:{actorId,action:'communities.ai-taxonomy.v35',entityType:'Community',entityId:'v35',metadata:{before,created}}});
  return {ok:true,created:created.length};
 },{timeout:30000,isolationLevel:'Serializable'});}
}
