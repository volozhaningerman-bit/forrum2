import { NextResponse } from 'next/server';
import { BUILD_COMMIT } from '@/lib/build-version';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function currentCommit() {
  return (
    process.env.RAILWAY_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    process.env.SOURCE_VERSION ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    BUILD_COMMIT
  );
}

export async function GET() {
  return NextResponse.json(
    {
      service: 'web',
      commit: currentCommit(),
      homeReference: 'v49',
      homeRevision: 'v74',
      railwayService: process.env.RAILWAY_SERVICE_NAME || null,
      railwayEnvironment: process.env.RAILWAY_ENVIRONMENT_NAME || null,
      deploymentId: process.env.RAILWAY_DEPLOYMENT_ID || null,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
        'CDN-Cache-Control': 'no-store',
        'Cloudflare-CDN-Cache-Control': 'no-store',
      },
    },
  );
}
