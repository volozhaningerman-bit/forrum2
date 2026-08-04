export const AccountState = {
    UNVERIFIED: 'UNVERIFIED',
    VERIFIED: 'VERIFIED',
    SUSPENDED: 'SUSPENDED'
};
export const GlobalRole = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    OWNER: 'OWNER'
};
export const CommunityStatus = {
    ACTIVE: 'ACTIVE',
    ARCHIVED: 'ARCHIVED'
};
export const CommunityRoleType = {
    CURATOR: 'CURATOR',
    ASSISTANT: 'ASSISTANT',
    MODERATOR: 'MODERATOR'
};
export const NotifyLevel = {
    NONE: 'NONE',
    IMPORTANT: 'IMPORTANT',
    ALL: 'ALL'
};
export const PublicationFormat = {
    POST: 'POST',
    TOPIC: 'TOPIC'
};
export const PublicationType = {
    DISCUSSION: 'DISCUSSION',
    QUESTION: 'QUESTION',
    NEWS: 'NEWS',
    GUIDE: 'GUIDE',
    PROJECT: 'PROJECT',
    SERVICE: 'SERVICE',
    CASE: 'CASE',
    ANNOUNCEMENT: 'ANNOUNCEMENT'
};
export const PublicationStatus = {
    PUBLISHED: 'PUBLISHED',
    HIDDEN: 'HIDDEN',
    DELETED: 'DELETED'
};
export const ReactionType = {
    LIKE: 'LIKE',
    USEFUL: 'USEFUL',
    INTERESTING: 'INTERESTING',
    FIRE: 'FIRE',
    THANKS: 'THANKS'
};
export const NotificationType = {
    PUBLICATION_REPLY: 'PUBLICATION_REPLY',
    COMMENT_REPLY: 'COMMENT_REPLY',
    REACTION: 'REACTION',
    FOLLOW: 'FOLLOW',
    WALL_POST: 'WALL_POST',
    MESSAGE: 'MESSAGE',
    SYSTEM: 'SYSTEM'
};
export const ReportStatus = {
    OPEN: 'OPEN',
    RESOLVED: 'RESOLVED',
    REJECTED: 'REJECTED'
};
export const WalletTransactionType = {
    TOPUP: 'TOPUP',
    SPEND: 'SPEND',
    MANUAL_GRANT: 'MANUAL_GRANT',
    REFUND: 'REFUND'
};
export const WalletTransactionStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
};
export const PromotionType = {
    BOOST: 'BOOST',
    PIN: 'PIN'
};
export const MediaKind = {
    POST_IMAGE: 'POST_IMAGE',
    AVATAR: 'AVATAR',
    COVER: 'COVER'
};
export const WallPrivacy = {
    EVERYONE: 'EVERYONE',
    FOLLOWERS: 'FOLLOWERS',
    ONLY_ME: 'ONLY_ME'
};
export const ModerationTargetType = {
    PUBLICATION: 'PUBLICATION',
    COMMENT: 'COMMENT',
    USER: 'USER'
};
export const ModerationActionType = {
    HIDE: 'HIDE',
    SUSPEND: 'SUSPEND',
    WARNING: 'WARNING'
};
export const AppealStatus = {
    OPEN: 'OPEN',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
};
export const ProposalStatus = {
    OPEN: 'OPEN',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    WITHDRAWN: 'WITHDRAWN'
};
export const PollStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    CANCELLED: 'CANCELLED'
};
export const VoteClass = {
    ADVISORY: 'ADVISORY',
    BINDING: 'BINDING'
};
export const WorkshopItemType = {
    GIFT: 'GIFT',
    REACTION: 'REACTION',
    BADGE: 'BADGE',
    PROFILE_DECOR: 'PROFILE_DECOR',
    COMMUNITY_DECOR: 'COMMUNITY_DECOR'
};
export const WorkshopItemStatus = {
    REVIEW: 'REVIEW',
    PUBLISHED: 'PUBLISHED',
    REJECTED: 'REJECTED'
};
export const MediaPartnerStatus = {
    REVIEW: 'REVIEW',
    ACTIVE: 'ACTIVE',
    REJECTED: 'REJECTED'
};
export const MediaPartnerType = {
    STREAMER: 'STREAMER',
    VIDEO_CREATOR: 'VIDEO_CREATOR',
    BLOGGER: 'BLOGGER',
    CHANNEL: 'CHANNEL'
};
export const AchievementCategory = {
    ACCOUNT: 'ACCOUNT',
    CONTRIBUTION: 'CONTRIBUTION',
    COMMUNITY: 'COMMUNITY',
    SPECIAL: 'SPECIAL'
};
export const RoleEventType = {
    GRANTED: 'GRANTED',
    ENDED: 'ENDED'
};
export const InteractionType = {
    SERVICE: 'SERVICE',
    PROJECT: 'PROJECT',
    DEAL: 'DEAL',
    HELP: 'HELP'
};
export const InteractionStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
export const ReviewVerdict = {
    POSITIVE: 'POSITIVE',
    NEUTRAL: 'NEUTRAL',
    NEGATIVE: 'NEGATIVE'
};
export const ReviewModerationStatus = {
    REVIEW: 'REVIEW',
    PUBLISHED: 'PUBLISHED',
    REJECTED: 'REJECTED'
};
export const CommunityContentActionType = {
    PIN: 'PIN',
    UNPIN: 'UNPIN',
    MOVE: 'MOVE',
    CLOSE: 'CLOSE',
    REOPEN: 'REOPEN',
    MARK_OFFICIAL: 'MARK_OFFICIAL',
    UNMARK_OFFICIAL: 'UNMARK_OFFICIAL',
    MARK_SOLVED: 'MARK_SOLVED',
    UNMARK_SOLVED: 'UNMARK_SOLVED'
};
export const CommunityStructureChangeType = {
    CREATE_SUBCOMMUNITY: 'CREATE_SUBCOMMUNITY',
    RENAME: 'RENAME',
    MERGE: 'MERGE',
    ARCHIVE: 'ARCHIVE'
};
export const CommunityStructureStatus = {
    OPEN: 'OPEN',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    WITHDRAWN: 'WITHDRAWN'
};
export const TeamInviteStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED'
};
export const CommunityEventFormat = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    HYBRID: 'HYBRID'
};
export const CommunityEventStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
};
export const EventAttendanceStatus = {
    INTERESTED: 'INTERESTED',
    GOING: 'GOING',
    NOT_GOING: 'NOT_GOING'
};
export const PollKind = {
    GENERAL: 'GENERAL',
    TEAM_REVIEW: 'TEAM_REVIEW',
    ELECTION: 'ELECTION',
    STRUCTURE: 'STRUCTURE',
    BUDGET: 'BUDGET'
};
export const PortfolioItemKind = {
    PROJECT: 'PROJECT',
    SERVICE: 'SERVICE'
};
export const PortfolioItemStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED'
};
export const PromotionOrderStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    CANCELLED: 'CANCELLED',
    REFUNDED: 'REFUNDED'
};
//# sourceMappingURL=enums.js.map