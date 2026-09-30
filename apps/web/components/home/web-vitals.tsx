'use client';
import { useEffect } from 'react';
/** Anonymous homepage metrics: no cookies, account IDs, query strings or user content. */
export function HomeWebVitals(){
 useEffect(()=>{let active=true;void import('web-vitals').then(({onCLS,onINP,onLCP})=>{
  const report=({name,value,rating}:{name:string;value:number;rating:string})=>{if(!active)return;const body=JSON.stringify({name,value,rating,device:matchMedia('(max-width:760px)').matches?'mobile':'desktop'});navigator.sendBeacon?.('/api/vitals',new Blob([body],{type:'application/json'}));};
  if(active){onCLS(report);onINP(report);onLCP(report);}
 });return()=>{active=false;};},[]);
 return null;
}
