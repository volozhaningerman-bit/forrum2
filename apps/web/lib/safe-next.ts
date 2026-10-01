/** Only allow a same-site absolute path after authentication. */
export function safeNext(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(value)) return '/';
  try {
    const url = new URL(value, 'https://4rrum.ru');
    return url.origin === 'https://4rrum.ru' ? url.pathname + url.search + url.hash : '/';
  } catch { return '/'; }
}
