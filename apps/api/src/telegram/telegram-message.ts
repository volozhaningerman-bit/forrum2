export function escapeTelegramHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildTelegramPublicationHtml({
  title,
  excerpt,
  publicationUrl,
}: {
  title: string;
  excerpt: string;
  publicationUrl: string;
}) {
  return [
    `<b>${escapeTelegramHtml(title)}</b>`,
    excerpt ? escapeTelegramHtml(excerpt) : '',
    `<a href="${escapeTelegramHtml(publicationUrl)}">Создано на 4RRUM · Обсудить →</a>`,
  ].filter(Boolean).join('\n\n');
}
