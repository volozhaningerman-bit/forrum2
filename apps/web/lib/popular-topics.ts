import type { HomeOverview } from '@/components/home/types';
import type { PublicationCardData } from './types';
/** Never mix all-time replies into the list labelled as activity in the last 24 hours. */
export function popularTopics(overview: HomeOverview | undefined, feed: PublicationCardData[]) {
 const discussed = new Map((overview?.discussed??[]).map(item=>[item.slug,item]));
 const active = (overview?.pulse?.activeTopics??[]).filter(item=>item.replyCount>0)
  .slice().sort((a,b)=>b.replyCount-a.replyCount||a.slug.localeCompare(b.slug)).slice(0,5)
  .map(item=>({slug:item.slug,title:item.title||'Обсуждение',replies:item.replyCount,views:discussed.get(item.slug)?.viewCount}));
 if(active.length) return {items:active,isFallback:false};
 const candidates = new Map([...feed.filter(item=>item.format==='TOPIC'),...(overview?.discussed??[])].map(item=>[item.slug,item]));
 return {items:[...candidates.values()].sort((a,b)=>(b.viewCount??0)-(a.viewCount??0)||b.commentCount-a.commentCount)
  .slice(0,5).map(item=>({slug:item.slug,title:item.title||'Обсуждение',replies:item.commentCount,views:item.viewCount})),isFallback:true};
}
