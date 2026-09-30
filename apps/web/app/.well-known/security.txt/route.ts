export function GET() {
  const body = [
    'Contact: https://4rrum.ru/support',
    'Canonical: https://4rrum.ru/.well-known/security.txt',
    'Policy: https://4rrum.ru/rules',
    'Preferred-Languages: ru, en',
    'Expires: 2027-09-30T00:00:00.000Z',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
