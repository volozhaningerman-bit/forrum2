import type { NextFunction, Request, Response } from 'express';

const windows = new Map<string, { count: number; resetAt: number }>();

function limitFor(path: string) {
  if (/\/v1\/auth\/(login|register|resend-verification|password-reset)/.test(path)) return 8;
  if (/\/v1\/media$/.test(path)) return 20;
  return 300;
}

export function requestSecurity(options: { allowedOrigin: string }) {
  return (request: Request, response: Response, next: NextFunction) => {
    const requestId = request.header('x-request-id')?.slice(0, 100) || crypto.randomUUID();
    response.setHeader('X-Request-Id', requestId);
    response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

    const method = request.method.toUpperCase();
    const origin = request.header('origin');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && origin && origin !== options.allowedOrigin) {
      response.status(403).json({ statusCode: 403, message: 'Источник запроса не разрешён', requestId });
      return;
    }

    if (request.path === '/v1/health') { next(); return; }
    const now = Date.now();
    const key = `${request.ip}:${request.path}`;
    const current = windows.get(key);
    const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + 60_000 } : current;
    bucket.count += 1;
    windows.set(key, bucket);
    const limit = limitFor(request.path);
    response.setHeader('X-RateLimit-Limit', String(limit));
    response.setHeader('X-RateLimit-Remaining', String(Math.max(0, limit - bucket.count)));
    if (bucket.count > limit) {
      response.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      response.status(429).json({ statusCode: 429, message: 'Слишком много запросов. Повторите позже.', requestId });
      return;
    }

    if (windows.size > 10_000) {
      for (const [entryKey, value] of windows) if (value.resetAt <= now) windows.delete(entryKey);
    }
    next();
  };
}
