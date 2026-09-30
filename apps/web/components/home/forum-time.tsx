'use client';
import { useEffect, useState } from 'react';
import { forumDate } from '@/lib/forum-display';
export function ForumTime({value,absolute=false}:{value:string;absolute?:boolean}) {
 const [clock,setClock]=useState<{now:number;zone:string}|null>(null);
 useEffect(()=>{const zone=Intl.DateTimeFormat().resolvedOptions().timeZone;const update=()=>setClock({now:Date.now(),zone});update();const timer=setInterval(update,60000);return()=>clearInterval(timer);},[]);
 const valid=Number.isFinite(Date.parse(value));
 // The SSR label is an absolute date; local relative labels start only after hydration.
 return <time dateTime={valid?value:undefined} title={valid?new Date(value).toLocaleString('ru-RU',{timeZone:clock?.zone??'UTC'})+` (${clock?.zone??'UTC'})`:undefined}>{clock?forumDate(value,clock.now,clock.zone,absolute):valid?new Date(value).toLocaleDateString('ru-RU',{timeZone:'UTC',day:'numeric',month:'short'}):'—'}</time>;
}
