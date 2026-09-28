const hooks = [
  ['web', process.env.RAILWAY_DEPLOY_HOOK_WEB],
  ['api', process.env.RAILWAY_DEPLOY_HOOK_API],
].filter(([, url]) => Boolean(url));

if (!hooks.length) {
  console.log('No Railway deploy hooks configured; relying on Railway GitHub auto-deploy.');
  process.exit(0);
}

let failed = false;
for (const [service, url] of hooks) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent': '4rrum-production-deploy',
        Accept: 'application/json,text/plain,*/*',
      },
      redirect: 'follow',
    });
    const body = await response.text();
    console.log(JSON.stringify({ service, status: response.status, ok: response.ok, body: body.slice(0, 500) }));
    if (!response.ok) failed = true;
  } catch (error) {
    failed = true;
    console.error(JSON.stringify({
      service,
      error: error instanceof Error ? error.message : String(error),
    }));
  }
}

if (failed) process.exit(1);
