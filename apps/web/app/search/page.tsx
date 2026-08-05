import { Suspense } from 'react';
import { SearchClient } from './search-client';

function SearchFallback() {
  return (
    <div className="search-page-skeleton">
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
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}
