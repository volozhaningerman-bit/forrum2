import { Suspense } from 'react';
import { SearchClient } from './search-client';
export default function SearchPage() { return <Suspense fallback={<div className="card">Открываем поиск…</div>}><SearchClient/></Suspense>; }
