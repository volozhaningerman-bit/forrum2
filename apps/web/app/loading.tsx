export default function GlobalLoading() {
  return (
    <section
      className="route-state route-state-loading"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="route-spinner" aria-hidden="true" />
      <strong>Загружаем раздел</strong>
      <p>Обычно это занимает несколько секунд.</p>
    </section>
  );
}
