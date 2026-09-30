import { NextRequest } from 'next/server';
import { allowedRequestOrigin } from '@/lib/request-origin';
export const dynamic='force-dynamic';
export async function POST(request:NextRequest){
 if(!allowedRequestOrigin(request.headers,request.nextUrl.origin))return new Response(null,{status:403});
 const length=Number(request.headers.get('content-length')??0);
 if(length>512)return new Response(null,{status:413});
 const raw=await request.text();if(raw.length>512)return new Response(null,{status:413});
 let data;try{data=JSON.parse(raw);}catch{return new Response(null,{status:400});}
 if(!data||!['LCP','INP','CLS'].includes(data.name)||typeof data.value!=='number'||!Number.isFinite(data.value)||data.value<0||data.value>3600000||!['good','needs-improvement','poor'].includes(data.rating)||!['mobile','desktop'].includes(data.device))return new Response(null,{status:400});
 // Feed this structured log into the hosting log collector; never record IP/session/cookies.
 console.info(JSON.stringify({event:'homepage_vital',name:data.name,value:data.value,rating:data.rating,device:data.device,at:new Date().toISOString()}));
 return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
}
