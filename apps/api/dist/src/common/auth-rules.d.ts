export declare function normalizeUsername(value: string): string;
export declare function usernamePolicy(value: string): {
    normalized: string;
    allowed: boolean;
    reason: string;
} | {
    normalized: string;
    allowed: boolean;
    reason: undefined;
};
