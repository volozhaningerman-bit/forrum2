'use client';
import { useEffect, useState } from 'react';
import { parseReadHistory, readingKey, type ReadHistory } from '@/lib/topic-reading';

export function useTopicReading() {
 const [viewer, setViewer] = useState<string | null>(null);
 const [history, setHistory] = useState<ReadHistory | null>(null);
 useEffect(() => {
  let active = true;
  let request: AbortController | undefined;
  const identify = async () => {
   request?.abort(); request = new AbortController();
   const signal = request.signal;
   setViewer(null); setHistory(null);
   try {
    const response = await fetch('/api/auth/me', { credentials:'include', cache:'no-store', signal });
    let identity: string;
    if (response.status === 401) identity = 'guest';
    else {
     if (!response.ok) return;
     const data = await response.json();
     if (typeof data?.user?.id !== 'string') return;
     identity = data.user.id;
    }
    if (active && !signal.aborted) setViewer(identity);
   } catch { /* An unavailable session must not be mistaken for the guest. */ }
  };
  void identify();
  window.addEventListener('forrum-auth-changed', identify);
  window.addEventListener('focus', identify);
  return () => {active=false;request?.abort();window.removeEventListener('forrum-auth-changed',identify);window.removeEventListener('focus',identify);};
 }, []);
 useEffect(() => {
  if (!viewer) return;
  const read = () => { try {setHistory(parseReadHistory(localStorage.getItem(readingKey(viewer))));} catch {setHistory(null);} };
  read();
  window.addEventListener('storage', read);window.addEventListener('forrum-reading-changed', read);window.addEventListener('pageshow', read);
  return () => {window.removeEventListener('storage',read);window.removeEventListener('forrum-reading-changed',read);window.removeEventListener('pageshow',read);};
 }, [viewer]);
 return {viewer, history};
}
