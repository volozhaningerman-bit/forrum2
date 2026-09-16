import type { CSSProperties } from 'react';
/** One stable accent source for the tree and publication breadcrumbs. */
export function categoryStyle(slug: string, accent?: string): CSSProperties {
 const palette=['#548e70','#678baa','#9b7bae','#b38a61','#648e94','#a47786'];
 const hash=Array.from(slug).reduce((sum,char)=>sum+char.charCodeAt(0),0);
 return {'--chip-accent':accent && /^#[0-9a-f]{6}$/i.test(accent)?accent:palette[hash%palette.length]} as CSSProperties;
}
