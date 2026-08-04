export function notificationEnabled(preferences, type) {
    switch (type) {
        case 'PUBLICATION_REPLY': return preferences.publicationReplies;
        case 'COMMENT_REPLY': return preferences.commentReplies;
        case 'REACTION': return preferences.reactions;
        case 'FOLLOW': return preferences.follows;
        case 'WALL_POST': return preferences.wallPosts;
        case 'MESSAGE': return preferences.messages;
        case 'SYSTEM': return preferences.system;
        default: return true;
    }
}
//# sourceMappingURL=policy.js.map