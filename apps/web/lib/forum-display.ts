/** Calendar labels must compare full dates in the viewer's timezone, including year/month. */
export function forumDate(value: string, now: number, timeZone: string, absolute = false) {
 const date = new Date(value);
 if (!Number.isFinite(date.getTime())) return '—';
 const day = (at: Date) => new Intl.DateTimeFormat('en-CA', {timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(at);
 if (!absolute) {
  const clock = date.toLocaleTimeString('ru-RU',{timeZone,hour:'2-digit',minute:'2-digit'});
  if (day(date) === day(new Date(now))) return `сегодня, ${clock}`;
  // Calendar subtraction in the selected timezone, robust to daylight-saving changes.
  const parts = new Intl.DateTimeFormat('en', {timeZone,year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date(now));
  const part = (key: string) => Number(parts.find(p=>p.type===key)?.value);
  const yesterday = new Date(Date.UTC(part('year'),part('month')-1,part('day')-1));
  const target = new Intl.DateTimeFormat('en-CA',{timeZone:'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).format(yesterday);
  if(day(date)===target) return `вчера, ${clock}`;
 }
 return date.toLocaleDateString('ru-RU',{timeZone,day:'numeric',month:'short',year:absolute?'numeric':undefined});
}
