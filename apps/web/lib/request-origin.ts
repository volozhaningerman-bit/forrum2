/** Validate before the API proxy removes Origin/Referer from forwarded headers. */
export function allowedRequestOrigin(headers:Headers,requestOrigin:string){
 if(headers.get('sec-fetch-site')==='cross-site')return false;
 const origin=headers.get('origin');
 if(!origin)return true; // Non-browser clients remain supported; session/permission guards still apply.
 try{
  // Next may normalize nextUrl to localhost behind its server/proxy. The Host
  // received by the server remains the public authority used by the browser.
  const expected=new URL(requestOrigin);
  const host=headers.get('host');if(host)expected.host=host;
  const protocol=headers.get('x-forwarded-proto');
  if(protocol==='https'||protocol==='http')expected.protocol=protocol+':';
  return new URL(origin).origin===expected.origin;
 }catch{return false;}
}
