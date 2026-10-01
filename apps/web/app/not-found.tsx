import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="route-state">
      <h1>Страница не найдена</h1>
      <p>
        Материал мог быть удалён, перемещён или
        закрыт для просмотра.
      </p>
      <Link className="button" href="/">
        Вернуться на главную
      </Link>
    </section>
  );
}
