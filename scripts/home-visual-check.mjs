import {readFile,writeFile,copyFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
export async function checkHomeSnapshot(actualPath,baselinePath,output,update=false){
 if(update){await copyFile(actualPath,baselinePath);return;}
 const actual=PNG.sync.read(await readFile(actualPath)),expected=PNG.sync.read(await readFile(baselinePath));
 assert.equal(actual.width,expected.width);assert.equal(actual.height,expected.height);
 const diff=new PNG({width:actual.width,height:actual.height});
 const changed=pixelmatch(actual.data,expected.data,diff.data,actual.width,actual.height,{threshold:.2,includeAA:false});
 await writeFile(output+'/'+(actual.width>760?'desktop-diff.png':'mobile-diff.png'),PNG.sync.write(diff));
 const ratio=changed/(actual.width*actual.height);
 assert(ratio<.012,`Homepage visual regression: ${(ratio*100).toFixed(2)}% pixels changed against manually reviewed implementation baseline`);
}
