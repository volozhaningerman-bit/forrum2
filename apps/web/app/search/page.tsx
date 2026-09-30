import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchClient } from './search-client';
export const metadata: Metadata = {
  title: 'Поиск',
  description: 'Поиск по темам, сообществам, пользователям и хэштегам 4rrum.',
  alternates: { canonical: '/search' },
  openGraph: { url: '/search', title: 'Поиск', description: 'Поиск по темам, сообществам, пользователям и хэштегам 4rrum.' },
};


function SearchFallback() {
  return (
    <div className="search-page-skeleton" role="status" aria-label="Загружаем поиск">
      <div className="compact-page-heading">
        <div>
          <h1>Поиск</h1>
          <p>
            Публикации, сообщества, люди и хэштеги.
          </p>
        </div>
      </div>

      <div className="search-form search-form-modern">
        <div className="search-input-wrap">
          <input
            aria-label="Поисковый запрос"
            placeholder="Название темы, имя или хэштег"
            disabled
          />
        </div>
        <button className="button" disabled>
          Найти
        </button>
      </div>

      <div className="compact-row-skeletons">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <span key={index} />
          ),
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="alpha-search-page"><Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense></div>
  );
}
