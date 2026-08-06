import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="route-state">
      <strong>Страница не найдена</strong>
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
