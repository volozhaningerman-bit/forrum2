const DEFAULT_PUBLIC_API =
  'https://api.4rrum.ru';

function addProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) return value;

  if (
    value.includes('.railway.internal') ||
    value.startsWith('localhost') ||
    value.startsWith('127.0.0.1')
  ) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export function resolveApiBase() {
  const configured =
    process.env.API_INTERNAL_URL?.trim() ||
    process.env.PUBLIC_API_URL?.trim() ||
    DEFAULT_PUBLIC_API;

  const withProtocol = addProtocol(configured);
  const withoutTrailingSlash = withProtocol.replace(
    /\/+$/,
    '',
  );

  return withoutTrailingSlash.endsWith('/v1')
    ? withoutTrailingSlash
    : `${withoutTrailingSlash}/v1`;
}
