/** Validate before the API proxy removes Origin/Referer from forwarded headers. */
export function allowedRequestOrigin(headers:Headers,requestOrigin:string,publicOrigin='https://4rrum.ru'){
 if(headers.get('sec-fetch-site')==='cross-site')return false;
 const origin=headers.get('origin');
 if(!origin)return true; // Non-browser clients remain supported; session/permission guards still apply.
 try{
  const submitted=new URL(origin);
  // Trust the configured canonical origin, not the proxy's internal HTTP hop.
  const canonical=new URL(publicOrigin);
  if(submitted.origin===canonical.origin)return true;
  if(submitted.hostname===canonical.hostname)return false;
  // Next may normalize nextUrl to localhost behind its server/proxy. The Host
  // received by the server remains the public authority used by the browser.
  const expected=new URL(requestOrigin);
  const host=headers.get('host');if(host)expected.host=host;
  const protocol=headers.get('x-forwarded-proto');
  if(protocol==='https'||protocol==='http')expected.protocol=protocol+':';
  return submitted.origin===expected.origin;
 }catch{return false;}
}
