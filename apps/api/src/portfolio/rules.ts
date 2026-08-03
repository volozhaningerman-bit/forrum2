export type PortfolioStatusValue = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export function isPortfolioPublic(status: PortfolioStatusValue) {
  return status === 'ACTIVE' || status === 'COMPLETED';
}

export function canLinkPortfolioInteraction(input: {
  itemStatus: PortfolioStatusValue;
  itemOwnerId: string;
  targetUserId: string;
}) {
  return isPortfolioPublic(input.itemStatus) && input.itemOwnerId === input.targetUserId;
}

export function normalizePortfolioLinks(links: string[]) {
  return [...new Set(links.map((item) => item.trim()).filter((item) => /^https:\/\//i.test(item)))].slice(0, 5);
}
