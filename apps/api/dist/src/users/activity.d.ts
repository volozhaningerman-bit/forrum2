export type PublicActivityCategory = 'content' | 'saved' | 'subscriptions';
export type ActivityMetadata = Record<string, unknown> | null | undefined;
export declare const publicActivityActions: readonly ["publication.create", "publication.update", "publication.delete", "publication.comment", "publication.bookmark", "publication.unbookmark", "community.subscribe", "community.unsubscribe", "user.follow", "user.unfollow", "tag.subscribe", "tag.unsubscribe"];
export declare function describeActivity(action: string, metadata: ActivityMetadata): {
    category: PublicActivityCategory;
    title: string;
    detail: string;
    href: string | null;
};
