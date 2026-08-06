import { type NextRequest } from 'next/server';
import { resolveApiBase } from '@/lib/api-base';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-length',
  'content-encoding',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

function requestHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.delete('host');
  headers.delete('content-length');
  headers.delete('connection');
  headers.delete('accept-encoding');
  headers.delete('origin');
  headers.delete('referer');

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json');
  }

  return headers;
}

function responseHeaders(upstream: Response) {
  const headers = new Headers();

  upstream.headers.forEach((value, key) => {
    const normalized = key.toLowerCase();

    if (
      HOP_BY_HOP_HEADERS.has(normalized) ||
      normalized === 'set-cookie'
    ) {
      return;
    }

    headers.append(key, value);
  });

  const sourceHeaders = upstream.headers as Headers & {
    getSetCookie?: () => string[];
  };

  const cookies =
    sourceHeaders.getSetCookie?.() ??
    (upstream.headers.get('set-cookie')
      ? [upstream.headers.get('set-cookie') as string]
      : []);

  for (const cookie of cookies) {
    headers.append(
      'set-cookie',
      cookie.replace(/;\s*Domain=[^;]+/gi, ''),
    );
  }

  headers.set('cache-control', 'no-store');

  return headers;
}

async function proxy(
  request: NextRequest,
  context: RouteContext,
) {
  const { path = [] } = await context.params;
  const base = resolveApiBase();

  const encodedPath = path
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  const target = new URL(
    encodedPath ? `${base}/${encodedPath}` : base,
  );

  target.search = request.nextUrl.search;

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    20_000,
  );

  request.signal.addEventListener(
    'abort',
    () => controller.abort(),
    { once: true },
  );

  try {
    const hasBody = !['GET', 'HEAD'].includes(
      request.method,
    );

    const body = hasBody
      ? await request.arrayBuffer()
      : undefined;

    const upstream = await fetch(target, {
      method: request.method,
      headers: requestHeaders(request),
      body:
        body && body.byteLength > 0
          ? body
          : undefined,
      redirect: 'manual',
      cache: 'no-store',
      signal: controller.signal,
    });

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders(upstream),
    });
  } catch (cause) {
    const timedOut =
      cause instanceof Error &&
      cause.name === 'AbortError';

    return Response.json(
      {
        statusCode: 502,
        message: timedOut
          ? 'API не ответил за 20 секунд'
          : 'Web-сервис не смог подключиться к API',
        apiBase: base.replace(
          /:\/\/([^/]+).*$/,
          '://$1',
        ),
      },
      {
        status: 502,
        headers: {
          'cache-control': 'no-store',
        },
      },
    );
  } finally {
    clearTimeout(timeout);
  }
}

export {
  proxy as DELETE,
  proxy as GET,
  proxy as HEAD,
  proxy as OPTIONS,
  proxy as PATCH,
  proxy as POST,
  proxy as PUT,
};
