export function isPortfolioPublic(status) {
    return status === 'ACTIVE' || status === 'COMPLETED';
}
export function canLinkPortfolioInteraction(input) {
    return isPortfolioPublic(input.itemStatus) && input.itemOwnerId === input.targetUserId;
}
export function normalizePortfolioLinks(links) {
    return [...new Set(links.map((item) => item.trim()).filter((item) => /^https:\/\//i.test(item)))].slice(0, 5);
}
//# sourceMappingURL=rules.js.map