'use client';
import { useState } from 'react';
export type HomeBanner = {slot:number;enabled:boolean;kind:'ad'|'promotion';title:string;imageLight:string;imageDark:string;href:string;startsAt:string;endsAt:string;disclosure:string};
export function BannerCard({item}:{item:HomeBanner}) {
 const [broken,setBroken]=useState(false);
 const safeLink=/^(https:\/\/|\/[a-zA-Z0-9])/.test(item.href) && !/[\\\s]/.test(item.href);
 return <a className={`forum-banner ${broken?'is-image-unavailable':''}`} href={safeLink?item.href:undefined} rel={item.kind==='ad'?'sponsored noopener noreferrer':undefined}>
  {!broken && <><img className="forum-banner-light" src={item.imageLight} alt="" onError={()=>setBroken(true)}/><img className="forum-banner-dark" src={item.imageDark || item.imageLight} alt="" onError={()=>setBroken(true)}/></>}
  <span className="forum-banner-copy" title={item.disclosure || item.title}><small>{item.kind==='ad'?'Реклама':'Сообщество'}</small><strong>{item.title}</strong>{item.kind==='ad' && item.disclosure && <span>{item.disclosure}</span>}</span><span className="forum-banner-arrow" aria-hidden="true">↗</span>
 </a>;
}
