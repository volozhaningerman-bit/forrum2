const expectedSha = process.env.EXPECTED_SHA || process.argv[2];
const expectedReference = process.env.EXPECTED_HOME_REFERENCE || 'v49';
const expectedRevision = process.env.EXPECTED_HOME_REVISION || '';
const webBase = process.env.PRODUCTION_WEB_URL || 'https://4rrum.ru';
const apiBase = process.env.PRODUCTION_API_URL || 'https://api.4rrum.ru';
const timeoutMs = Number(process.env.PRODUCTION_VERIFY_TIMEOUT_MS || 12 * 60 * 1000);
const intervalMs = Number(process.env.PRODUCTION_VERIFY_INTERVAL_MS || 15000);
const requireExactSha = process.env.REQUIRE_EXACT_SHA !== 'false';

if (!expectedSha) {
  console.error('EXPECTED_SHA or first CLI argument is required');
  process.exit(2);
}

async function verifyPublicOrigin() {
  const origin=new URL(webBase).origin;
  const probe=async originHeader=>fetch(`${webBase}/api/auth/login`,{method:'POST',cache:'no-store',headers:{Origin:originHeader,'Content-Type':'application/json'},body:'{}'});
  // Empty login input only exercises validation; it creates no session/account.
  const valid=await probe(origin),hostile=await probe('https://evil.example');
  console.log(JSON.stringify({sameOriginValidation:valid.status,hostileOrigin:hostile.status}));
  if(valid.status!==400||hostile.status!==403)throw new Error(`Production Origin check failed: same-origin=${valid.status}, hostile=${hostile.status}`);
}

const deadline = Date.now() + timeoutMs;
let attempt = 0;
let lastError = '';

async function request(url, asJson = false) {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: asJson ? 'application/json' : 'text/html,application/xhtml+xml',
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
    redirect: 'follow',
  });

  const body = asJson ? await response.json() : await response.text();
  return { response, body };
}

while (Date.now() < deadline) {
  attempt += 1;
  const cacheBust = encodeURIComponent(expectedSha.slice(0, 12) + '-' + attempt);

  try {
    const [build, home, health] = await Promise.all([
      request(`${webBase}/api/build-info?verify=${cacheBust}`, true),
      request(`${webBase}/?verify=${cacheBust}`),
      request(`${apiBase}/v1/health?verify=${cacheBust}`, true),
    ]);

    const deployedSha = String(build.body?.commit || '');
    const reference = String(build.body?.homeReference || '');
    const revision = String(build.body?.homeRevision || '');
    const homeHtml = String(home.body || '');
    const hasReference = homeHtml.includes(`data-home-reference="${expectedReference}"`);
    const hasRevision = !expectedRevision || homeHtml.includes(`data-home-revision="${expectedRevision}"`);
    const shaMatches = !requireExactSha || deployedSha === expectedSha;

    console.log(
      JSON.stringify({
        attempt,
        buildStatus: build.response.status,
        homeStatus: home.response.status,
        apiStatus: health.response.status,
        deployedSha: deployedSha || null,
        expectedSha,
        requireExactSha,
        reference: reference || null,
        revision: revision || null,
        expectedRevision: expectedRevision || null,
        hasReference,
        hasRevision,
        shaMatches,
      }),
    );

    if (
      build.response.ok &&
      home.response.ok &&
      health.response.ok &&
      shaMatches &&
      reference === expectedReference &&
      hasReference &&
      hasRevision
    ) {
      await verifyPublicOrigin();
      console.log(
        `Production verified: ${webBase} serves homepage ${expectedReference}${expectedRevision ? ` revision ${expectedRevision}` : ''}` +
          (deployedSha && deployedSha !== 'unknown' ? ` at ${deployedSha}` : ''),
      );
      process.exit(0);
    }

    lastError = `Production has not switched to homepage ${expectedReference}${expectedRevision ? `/${expectedRevision}` : ''} yet`;
  } catch (error) {
    lastError = error instanceof Error ? error.stack || error.message : String(error);
    console.log(JSON.stringify({ attempt, error: lastError }));
  }

  await new Promise(resolve => setTimeout(resolve, intervalMs));
}

console.error(`Production verification timed out after ${attempt} attempts. Last state: ${lastError}`);
process.exit(1);
