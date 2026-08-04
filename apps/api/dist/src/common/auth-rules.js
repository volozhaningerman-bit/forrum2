const RESERVED_USERNAMES = new Set([
    'admin', 'administrator', 'api', 'auth', 'forrum', 'help', 'login', 'moderator',
    'owner', 'register', 'settings', 'support', 'system', 'verify', 'welcome',
]);
export function normalizeUsername(value) {
    return value.trim().toLowerCase();
}
export function usernamePolicy(value) {
    const normalized = normalizeUsername(value);
    if (!/^[a-z0-9_]{3,24}$/.test(normalized)) {
        return { normalized, allowed: false, reason: 'Разрешены 3–24 латинских символа, цифры и подчёркивание' };
    }
    if (RESERVED_USERNAMES.has(normalized)) {
        return { normalized, allowed: false, reason: 'Это имя зарезервировано FORRUM' };
    }
    return { normalized, allowed: true, reason: undefined };
}
//# sourceMappingURL=auth-rules.js.map