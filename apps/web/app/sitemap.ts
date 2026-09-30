import type { MetadataRoute } from 'next';
import { resolveApiBase } from '@/lib/api-base';
export const revalidate=300;

const routes = [
  '',
  '/communities',
  '/users',
  '/applications',
  '/digital-services',
  '/services',
  '/events',
  '/news',
  '/projects',
  '/rules',
  '/support',
  '/search',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes:MetadataRoute.Sitemap=routes.map((path, index) => ({
    url: `https://4rrum.ru${path}`,
    changeFrequency: index === 0 ? 'hourly' : 'daily',
    priority: index === 0 ? 1 : 0.7,
  }));
  try {
    const response=await fetch(`${resolveApiBase()}/home/index`,{next:{revalidate:300},signal:AbortSignal.timeout(3000)});
    if(!response.ok)return staticRoutes;
    const data=await response.json() as {communities:{slug:string;updatedAt:string}[];topics:{slug:string;updatedAt:string}[]};
    const entry=(base:string,item:{slug:string;updatedAt:string})=>({url:`https://4rrum.ru/${base}/${encodeURIComponent(item.slug)}`,lastModified:new Date(item.updatedAt)});
    return [...staticRoutes,...data.communities.map(item=>entry('communities',item)),...data.topics.map(item=>entry('p',item))];
  } catch {return staticRoutes;}
}
