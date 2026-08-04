export function stripBbcode(text) {
    return text
        .replace(/\[url(?:=[^\]]+)?\]/gi, '')
        .replace(/\[img(?:=[^\]]+)?\][\s\S]*?\[\/img\]/gi, ' [Изображение] ')
        .replace(/\[\/?(?:b|i|u|s|quote|code|spoiler|list|h2|h3|color|size|img|\*)[^\]]*\]/gi, '')
        .replace(/\r?\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
export function excerpt(text, max = 220) {
    const compact = stripBbcode(text);
    if (compact.length <= max)
        return compact;
    const raw = compact.slice(0, Math.max(1, max - 1)).trimEnd();
    const boundary = raw.lastIndexOf(' ');
    const safe = boundary >= Math.floor(max * 0.55) ? raw.slice(0, boundary) : raw;
    return `${safe}…`;
}
export function clampPage(value, fallback = 1) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(1, Math.min(1000, Math.floor(n))) : fallback;
}
//# sourceMappingURL=text.js.map