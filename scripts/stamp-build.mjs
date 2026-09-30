import {execFileSync} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
let sha=process.env.GITHUB_SHA||process.env.SOURCE_VERSION||'';
if(!/^[a-f0-9]{40}$/.test(sha)){try{sha=execFileSync('git',['rev-parse','HEAD'],{cwd:new URL('../',import.meta.url),encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{try{const root=new URL('../',import.meta.url);const head=readFileSync(new URL('.git/HEAD',root),'utf8').trim();if(head.startsWith('ref: ')){const ref=head.slice(5);try{sha=readFileSync(new URL('.git/'+ref,root),'utf8').trim();}catch{sha=readFileSync(new URL('.git/packed-refs',root),'utf8').split('\n').find(line=>line.endsWith(' '+ref))?.split(' ')[0]??'unknown';}}else sha=head;}catch{sha='unknown';}}}
writeFileSync(new URL('../apps/web/lib/build-version.ts',import.meta.url),`// Generated before build; use the immutable source commit for deployment verification.\nexport const BUILD_COMMIT = ${JSON.stringify(sha)};\n`);
