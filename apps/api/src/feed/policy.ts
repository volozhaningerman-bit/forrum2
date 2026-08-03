export function includeInForYou(input: {
  authenticated: boolean;
  recommendationsEnabled: boolean;
  personallyRelevant: boolean;
  discussed: boolean;
}) {
  if (!input.authenticated) return true;
  if (input.personallyRelevant) return true;
  return input.recommendationsEnabled && input.discussed;
}
