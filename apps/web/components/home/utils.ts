export function formatCount(value: number | undefined) {
  const safe = Number.isFinite(value) ? Number(value) : 0;
  return new Intl.NumberFormat('ru-RU', {
    notation: safe >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(safe);
}

export function relativeTime(value?: string | null) {
  if (!value) return '';
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return '';
  const diff = Math.max(0, Date.now() - time);
  if (diff < 60_000) return 'только что';
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} мин. назад`;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours} ч. назад`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 14) return `${days} дн. назад`;
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatCountLabel(value:number|undefined,forms:readonly [string,string,string]) {
  const count=Number.isFinite(value)?Math.max(0,Math.trunc(Number(value))):0;
  const rule=new Intl.PluralRules('ru').select(count);
  const noun=forms[rule==='one'?0:rule==='few'?1:2];
  return `${formatCount(count)} ${noun}`;
}
