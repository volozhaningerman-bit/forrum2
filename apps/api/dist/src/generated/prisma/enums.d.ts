export declare const AccountState: {
    readonly UNVERIFIED: "UNVERIFIED";
    readonly VERIFIED: "VERIFIED";
    readonly SUSPENDED: "SUSPENDED";
};
export type AccountState = (typeof AccountState)[keyof typeof AccountState];
export declare const GlobalRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly OWNER: "OWNER";
};
export type GlobalRole = (typeof GlobalRole)[keyof typeof GlobalRole];
export declare const CommunityStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type CommunityStatus = (typeof CommunityStatus)[keyof typeof CommunityStatus];
export declare const CommunityRoleType: {
    readonly CURATOR: "CURATOR";
    readonly ASSISTANT: "ASSISTANT";
    readonly MODERATOR: "MODERATOR";
};
export type CommunityRoleType = (typeof CommunityRoleType)[keyof typeof CommunityRoleType];
export declare const NotifyLevel: {
    readonly NONE: "NONE";
    readonly IMPORTANT: "IMPORTANT";
    readonly ALL: "ALL";
};
export type NotifyLevel = (typeof NotifyLevel)[keyof typeof NotifyLevel];
export declare const PublicationFormat: {
    readonly POST: "POST";
    readonly TOPIC: "TOPIC";
};
export type PublicationFormat = (typeof PublicationFormat)[keyof typeof PublicationFormat];
export declare const PublicationType: {
    readonly DISCUSSION: "DISCUSSION";
    readonly QUESTION: "QUESTION";
    readonly NEWS: "NEWS";
    readonly GUIDE: "GUIDE";
    readonly PROJECT: "PROJECT";
    readonly SERVICE: "SERVICE";
    readonly CASE: "CASE";
    readonly ANNOUNCEMENT: "ANNOUNCEMENT";
};
export type PublicationType = (typeof PublicationType)[keyof typeof PublicationType];
export declare const PublicationStatus: {
    readonly PUBLISHED: "PUBLISHED";
    readonly HIDDEN: "HIDDEN";
    readonly DELETED: "DELETED";
};
export type PublicationStatus = (typeof PublicationStatus)[keyof typeof PublicationStatus];
export declare const ReactionType: {
    readonly LIKE: "LIKE";
    readonly USEFUL: "USEFUL";
    readonly INTERESTING: "INTERESTING";
    readonly FIRE: "FIRE";
    readonly THANKS: "THANKS";
};
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];
export declare const NotificationType: {
    readonly PUBLICATION_REPLY: "PUBLICATION_REPLY";
    readonly COMMENT_REPLY: "COMMENT_REPLY";
    readonly REACTION: "REACTION";
    readonly FOLLOW: "FOLLOW";
    readonly WALL_POST: "WALL_POST";
    readonly MESSAGE: "MESSAGE";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const ReportStatus: {
    readonly OPEN: "OPEN";
    readonly RESOLVED: "RESOLVED";
    readonly REJECTED: "REJECTED";
};
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
export declare const WalletTransactionType: {
    readonly TOPUP: "TOPUP";
    readonly SPEND: "SPEND";
    readonly MANUAL_GRANT: "MANUAL_GRANT";
    readonly REFUND: "REFUND";
};
export type WalletTransactionType = (typeof WalletTransactionType)[keyof typeof WalletTransactionType];
export declare const WalletTransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
};
export type WalletTransactionStatus = (typeof WalletTransactionStatus)[keyof typeof WalletTransactionStatus];
export declare const PromotionType: {
    readonly BOOST: "BOOST";
    readonly PIN: "PIN";
};
export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];
export declare const MediaKind: {
    readonly POST_IMAGE: "POST_IMAGE";
    readonly AVATAR: "AVATAR";
    readonly COVER: "COVER";
};
export type MediaKind = (typeof MediaKind)[keyof typeof MediaKind];
export declare const WallPrivacy: {
    readonly EVERYONE: "EVERYONE";
    readonly FOLLOWERS: "FOLLOWERS";
    readonly ONLY_ME: "ONLY_ME";
};
export type WallPrivacy = (typeof WallPrivacy)[keyof typeof WallPrivacy];
export declare const ModerationTargetType: {
    readonly PUBLICATION: "PUBLICATION";
    readonly COMMENT: "COMMENT";
    readonly USER: "USER";
};
export type ModerationTargetType = (typeof ModerationTargetType)[keyof typeof ModerationTargetType];
export declare const ModerationActionType: {
    readonly HIDE: "HIDE";
    readonly SUSPEND: "SUSPEND";
    readonly WARNING: "WARNING";
};
export type ModerationActionType = (typeof ModerationActionType)[keyof typeof ModerationActionType];
export declare const AppealStatus: {
    readonly OPEN: "OPEN";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
};
export type AppealStatus = (typeof AppealStatus)[keyof typeof AppealStatus];
export declare const ProposalStatus: {
    readonly OPEN: "OPEN";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly WITHDRAWN: "WITHDRAWN";
};
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];
export declare const PollStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly CANCELLED: "CANCELLED";
};
export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];
export declare const VoteClass: {
    readonly ADVISORY: "ADVISORY";
    readonly BINDING: "BINDING";
};
export type VoteClass = (typeof VoteClass)[keyof typeof VoteClass];
export declare const WorkshopItemType: {
    readonly GIFT: "GIFT";
    readonly REACTION: "REACTION";
    readonly BADGE: "BADGE";
    readonly PROFILE_DECOR: "PROFILE_DECOR";
    readonly COMMUNITY_DECOR: "COMMUNITY_DECOR";
};
export type WorkshopItemType = (typeof WorkshopItemType)[keyof typeof WorkshopItemType];
export declare const WorkshopItemStatus: {
    readonly REVIEW: "REVIEW";
    readonly PUBLISHED: "PUBLISHED";
    readonly REJECTED: "REJECTED";
};
export type WorkshopItemStatus = (typeof WorkshopItemStatus)[keyof typeof WorkshopItemStatus];
export declare const MediaPartnerStatus: {
    readonly REVIEW: "REVIEW";
    readonly ACTIVE: "ACTIVE";
    readonly REJECTED: "REJECTED";
};
export type MediaPartnerStatus = (typeof MediaPartnerStatus)[keyof typeof MediaPartnerStatus];
export declare const MediaPartnerType: {
    readonly STREAMER: "STREAMER";
    readonly VIDEO_CREATOR: "VIDEO_CREATOR";
    readonly BLOGGER: "BLOGGER";
    readonly CHANNEL: "CHANNEL";
};
export type MediaPartnerType = (typeof MediaPartnerType)[keyof typeof MediaPartnerType];
export declare const AchievementCategory: {
    readonly ACCOUNT: "ACCOUNT";
    readonly CONTRIBUTION: "CONTRIBUTION";
    readonly COMMUNITY: "COMMUNITY";
    readonly SPECIAL: "SPECIAL";
};
export type AchievementCategory = (typeof AchievementCategory)[keyof typeof AchievementCategory];
export declare const RoleEventType: {
    readonly GRANTED: "GRANTED";
    readonly ENDED: "ENDED";
};
export type RoleEventType = (typeof RoleEventType)[keyof typeof RoleEventType];
export declare const InteractionType: {
    readonly SERVICE: "SERVICE";
    readonly PROJECT: "PROJECT";
    readonly DEAL: "DEAL";
    readonly HELP: "HELP";
};
export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType];
export declare const InteractionStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type InteractionStatus = (typeof InteractionStatus)[keyof typeof InteractionStatus];
export declare const ReviewVerdict: {
    readonly POSITIVE: "POSITIVE";
    readonly NEUTRAL: "NEUTRAL";
    readonly NEGATIVE: "NEGATIVE";
};
export type ReviewVerdict = (typeof ReviewVerdict)[keyof typeof ReviewVerdict];
export declare const ReviewModerationStatus: {
    readonly REVIEW: "REVIEW";
    readonly PUBLISHED: "PUBLISHED";
    readonly REJECTED: "REJECTED";
};
export type ReviewModerationStatus = (typeof ReviewModerationStatus)[keyof typeof ReviewModerationStatus];
export declare const CommunityContentActionType: {
    readonly PIN: "PIN";
    readonly UNPIN: "UNPIN";
    readonly MOVE: "MOVE";
    readonly CLOSE: "CLOSE";
    readonly REOPEN: "REOPEN";
    readonly MARK_OFFICIAL: "MARK_OFFICIAL";
    readonly UNMARK_OFFICIAL: "UNMARK_OFFICIAL";
    readonly MARK_SOLVED: "MARK_SOLVED";
    readonly UNMARK_SOLVED: "UNMARK_SOLVED";
};
export type CommunityContentActionType = (typeof CommunityContentActionType)[keyof typeof CommunityContentActionType];
export declare const CommunityStructureChangeType: {
    readonly CREATE_SUBCOMMUNITY: "CREATE_SUBCOMMUNITY";
    readonly RENAME: "RENAME";
    readonly MERGE: "MERGE";
    readonly ARCHIVE: "ARCHIVE";
};
export type CommunityStructureChangeType = (typeof CommunityStructureChangeType)[keyof typeof CommunityStructureChangeType];
export declare const CommunityStructureStatus: {
    readonly OPEN: "OPEN";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly WITHDRAWN: "WITHDRAWN";
};
export type CommunityStructureStatus = (typeof CommunityStructureStatus)[keyof typeof CommunityStructureStatus];
export declare const TeamInviteStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly DECLINED: "DECLINED";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
};
export type TeamInviteStatus = (typeof TeamInviteStatus)[keyof typeof TeamInviteStatus];
export declare const CommunityEventFormat: {
    readonly ONLINE: "ONLINE";
    readonly OFFLINE: "OFFLINE";
    readonly HYBRID: "HYBRID";
};
export type CommunityEventFormat = (typeof CommunityEventFormat)[keyof typeof CommunityEventFormat];
export declare const CommunityEventStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly CANCELLED: "CANCELLED";
    readonly COMPLETED: "COMPLETED";
};
export type CommunityEventStatus = (typeof CommunityEventStatus)[keyof typeof CommunityEventStatus];
export declare const EventAttendanceStatus: {
    readonly INTERESTED: "INTERESTED";
    readonly GOING: "GOING";
    readonly NOT_GOING: "NOT_GOING";
};
export type EventAttendanceStatus = (typeof EventAttendanceStatus)[keyof typeof EventAttendanceStatus];
export declare const PollKind: {
    readonly GENERAL: "GENERAL";
    readonly TEAM_REVIEW: "TEAM_REVIEW";
    readonly ELECTION: "ELECTION";
    readonly STRUCTURE: "STRUCTURE";
    readonly BUDGET: "BUDGET";
};
export type PollKind = (typeof PollKind)[keyof typeof PollKind];
export declare const PortfolioItemKind: {
    readonly PROJECT: "PROJECT";
    readonly SERVICE: "SERVICE";
};
export type PortfolioItemKind = (typeof PortfolioItemKind)[keyof typeof PortfolioItemKind];
export declare const PortfolioItemStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly PAUSED: "PAUSED";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export type PortfolioItemStatus = (typeof PortfolioItemStatus)[keyof typeof PortfolioItemStatus];
export declare const PromotionOrderStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly EXPIRED: "EXPIRED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
};
export type PromotionOrderStatus = (typeof PromotionOrderStatus)[keyof typeof PromotionOrderStatus];
