import { randomBytes } from 'node:crypto';
const cyrillicMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};
function slugBase(value, maxLength) {
    const transliterated = [...value.normalize('NFKD').toLowerCase()]
        .map((character) => cyrillicMap[character] ?? character)
        .join('')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');
    return transliterated.slice(0, maxLength).replace(/-+$/g, '');
}
export function createSlug(value, fallback = 'item') {
    const base = slugBase(value, 72) || fallback;
    return `${base}-${randomBytes(3).toString('hex')}`;
}
export function normalizeTag(value) {
    return slugBase(value.replace(/^#/, ''), 40);
}
//# sourceMappingURL=slug.js.map