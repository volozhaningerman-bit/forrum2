export function includeInForYou(input) {
    if (!input.authenticated)
        return true;
    if (input.personallyRelevant)
        return true;
    return input.recommendationsEnabled && input.discussed;
}
//# sourceMappingURL=policy.js.map