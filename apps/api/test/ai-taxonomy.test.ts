import test from 'node:test';
import assert from 'node:assert/strict';
import { aiTaxonomy, taxonomyPreview, taxonomyVersion, type ExistingNode } from '../src/admin/ai-taxonomy.js';
const node=(slug:string):ExistingNode=>({id:slug,slug,name:slug,parentId:null,description:'',shortDescription:null,accentColor:'#789747',status:'ACTIVE'});
test('taxonomy preserves existing gaming URLs and unrelated communities',()=>{
 const before=[node('gta-rp'),{...node('majestic-rp'),parentId:'gta-rp'},node('custom-community')];const plan=taxonomyPreview(before);
 assert.deepEqual(plan.rows.find(n=>n.slug==='gta-rp'),{slug:'gta-rp',name:'gta-rp',parent:'video-games',action:'move'});
 assert.equal(plan.rows.find(n=>n.slug==='ai-in-games')?.parent,'video-games');
 assert(!plan.rows.some(n=>n.slug==='custom-community'||n.slug==='majestic-rp'));assert.equal(before[1].parentId,'gta-rp');
});
test('preview detects concurrent changes independently of query order',()=>{const before=[node('one'),node('two')];assert.equal(taxonomyVersion(before),taxonomyVersion([...before].reverse()));assert.notEqual(taxonomyVersion(before),taxonomyVersion([{...before[0],name:'Changed'},before[1]]));});
test('new taxonomy has unique slugs and parents before children',()=>{const seen=new Set<string>();for(const row of aiTaxonomy){assert(!seen.has(row.slug));if(row.parent)assert(seen.has(row.parent));seen.add(row.slug);}});
