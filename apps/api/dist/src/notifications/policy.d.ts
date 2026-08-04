export type NotificationPreferenceLike = {
    publicationReplies: boolean;
    commentReplies: boolean;
    reactions: boolean;
    follows: boolean;
    wallPosts: boolean;
    messages: boolean;
    system: boolean;
};
export declare function notificationEnabled(preferences: NotificationPreferenceLike, type: string): boolean;
