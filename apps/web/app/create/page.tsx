import { Suspense } from 'react';
import { CreatePublicationForm } from './publication-form';
export default function CreatePage() { return <Suspense fallback={<div className="card">Загрузка редактора…</div>}><CreatePublicationForm/></Suspense>; }
