import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    EmailVerificationToken: 'EmailVerificationToken',
    PasswordResetToken: 'PasswordResetToken',
    Session: 'Session',
    NotificationPreference: 'NotificationPreference',
    FeedPreference: 'FeedPreference',
    HiddenCommunity: 'HiddenCommunity',
    HiddenPublication: 'HiddenPublication',
    Community: 'Community',
    CommunityRole: 'CommunityRole',
    CommunitySubscription: 'CommunitySubscription',
    Publication: 'Publication',
    Comment: 'Comment',
    Tag: 'Tag',
    PublicationTag: 'PublicationTag',
    TagSubscription: 'TagSubscription',
    PublicationReaction: 'PublicationReaction',
    CommentReaction: 'CommentReaction',
    Bookmark: 'Bookmark',
    UserFollow: 'UserFollow',
    WallPost: 'WallPost',
    Notification: 'Notification',
    Conversation: 'Conversation',
    ConversationMember: 'ConversationMember',
    Message: 'Message',
    Report: 'Report',
    AuditLog: 'AuditLog',
    Wallet: 'Wallet',
    WalletTransaction: 'WalletTransaction',
    PromotionOrder: 'PromotionOrder',
    MediaAsset: 'MediaAsset',
    TelegramLink: 'TelegramLink',
    TelegramLinkCode: 'TelegramLinkCode',
    TelegramChannel: 'TelegramChannel',
    TelegramShare: 'TelegramShare',
    ModerationAction: 'ModerationAction',
    ModerationAppeal: 'ModerationAppeal',
    CommunityProposal: 'CommunityProposal',
    ProposalSupport: 'ProposalSupport',
    CommunityPoll: 'CommunityPoll',
    PollOption: 'PollOption',
    PollVote: 'PollVote',
    WorkshopItem: 'WorkshopItem',
    WorkshopLike: 'WorkshopLike',
    AchievementDefinition: 'AchievementDefinition',
    UserAchievement: 'UserAchievement',
    CommunityRoleEvent: 'CommunityRoleEvent',
    ConfirmedInteraction: 'ConfirmedInteraction',
    ProfileReview: 'ProfileReview',
    CommunityReport: 'CommunityReport',
    CommunityContentAction: 'CommunityContentAction',
    CommunityStructureProposal: 'CommunityStructureProposal',
    CommunityRoleInvite: 'CommunityRoleInvite',
    CommunityEvent: 'CommunityEvent',
    CommunityEventAttendance: 'CommunityEventAttendance',
    PortfolioItem: 'PortfolioItem',
    PlatformSetting: 'PlatformSetting'
};
export const TransactionIsolationLevel = {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
};
export const UserScalarFieldEnum = {
    id: 'id',
    forrumId: 'forrumId',
    email: 'email',
    username: 'username',
    displayName: 'displayName',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    coverUrl: 'coverUrl',
    wallPrivacy: 'wallPrivacy',
    website: 'website',
    location: 'location',
    passwordHash: 'passwordHash',
    state: 'state',
    role: 'role',
    emailVerifiedAt: 'emailVerifiedAt',
    onboardingCompletedAt: 'onboardingCompletedAt',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const EmailVerificationTokenScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
export const PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
export const SessionScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    lastSeenAt: 'lastSeenAt',
    revokedAt: 'revokedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
export const NotificationPreferenceScalarFieldEnum = {
    userId: 'userId',
    publicationReplies: 'publicationReplies',
    commentReplies: 'commentReplies',
    reactions: 'reactions',
    follows: 'follows',
    wallPosts: 'wallPosts',
    messages: 'messages',
    system: 'system',
    emailDigest: 'emailDigest',
    telegramEnabled: 'telegramEnabled'
};
export const FeedPreferenceScalarFieldEnum = {
    userId: 'userId',
    recommendationsEnabled: 'recommendationsEnabled',
    showReasons: 'showReasons',
    updatedAt: 'updatedAt'
};
export const HiddenCommunityScalarFieldEnum = {
    userId: 'userId',
    communityId: 'communityId',
    createdAt: 'createdAt'
};
export const HiddenPublicationScalarFieldEnum = {
    userId: 'userId',
    publicationId: 'publicationId',
    createdAt: 'createdAt'
};
export const CommunityScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    slug: 'slug',
    name: 'name',
    description: 'description',
    shortDescription: 'shortDescription',
    avatarUrl: 'avatarUrl',
    coverUrl: 'coverUrl',
    accentColor: 'accentColor',
    status: 'status',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommunityRoleScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    communityId: 'communityId',
    role: 'role',
    grantedById: 'grantedById',
    note: 'note',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommunitySubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    communityId: 'communityId',
    notifyLevel: 'notifyLevel',
    createdAt: 'createdAt'
};
export const PublicationScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    format: 'format',
    type: 'type',
    status: 'status',
    title: 'title',
    body: 'body',
    authorId: 'authorId',
    communityId: 'communityId',
    viewCount: 'viewCount',
    lastActivityAt: 'lastActivityAt',
    pinnedUntil: 'pinnedUntil',
    isOfficial: 'isOfficial',
    isSolved: 'isSolved',
    closedAt: 'closedAt',
    closedReason: 'closedReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommentScalarFieldEnum = {
    id: 'id',
    body: 'body',
    publicationId: 'publicationId',
    authorId: 'authorId',
    parentId: 'parentId',
    hiddenAt: 'hiddenAt',
    hiddenReason: 'hiddenReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TagScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    label: 'label',
    backgroundColor: 'backgroundColor',
    textColor: 'textColor',
    borderColor: 'borderColor',
    styleEnabled: 'styleEnabled',
    createdAt: 'createdAt'
};
export const PublicationTagScalarFieldEnum = {
    publicationId: 'publicationId',
    tagId: 'tagId'
};
export const TagSubscriptionScalarFieldEnum = {
    userId: 'userId',
    tagId: 'tagId',
    createdAt: 'createdAt'
};
export const PublicationReactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    publicationId: 'publicationId',
    type: 'type',
    createdAt: 'createdAt'
};
export const CommentReactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    commentId: 'commentId',
    type: 'type',
    createdAt: 'createdAt'
};
export const BookmarkScalarFieldEnum = {
    userId: 'userId',
    publicationId: 'publicationId',
    createdAt: 'createdAt'
};
export const UserFollowScalarFieldEnum = {
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
};
export const WallPostScalarFieldEnum = {
    id: 'id',
    profileUserId: 'profileUserId',
    authorId: 'authorId',
    body: 'body',
    hiddenAt: 'hiddenAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    actorId: 'actorId',
    publicationId: 'publicationId',
    commentId: 'commentId',
    conversationId: 'conversationId',
    type: 'type',
    title: 'title',
    body: 'body',
    href: 'href',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const ConversationScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ConversationMemberScalarFieldEnum = {
    conversationId: 'conversationId',
    userId: 'userId',
    joinedAt: 'joinedAt',
    lastReadAt: 'lastReadAt'
};
export const MessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    authorId: 'authorId',
    body: 'body',
    createdAt: 'createdAt'
};
export const ReportScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    publicationId: 'publicationId',
    commentId: 'commentId',
    reason: 'reason',
    details: 'details',
    status: 'status',
    resolutionNote: 'resolutionNote',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    actorId: 'actorId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
export const WalletScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const WalletTransactionScalarFieldEnum = {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    status: 'status',
    amount: 'amount',
    description: 'description',
    externalRef: 'externalRef',
    createdAt: 'createdAt'
};
export const PromotionOrderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    publicationId: 'publicationId',
    communityId: 'communityId',
    type: 'type',
    status: 'status',
    price: 'price',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    cancelledAt: 'cancelledAt',
    cancellationReason: 'cancellationReason',
    createdAt: 'createdAt'
};
export const MediaAssetScalarFieldEnum = {
    id: 'id',
    ownerId: 'ownerId',
    kind: 'kind',
    mimeType: 'mimeType',
    originalName: 'originalName',
    storageKey: 'storageKey',
    thumbnailStorageKey: 'thumbnailStorageKey',
    sizeBytes: 'sizeBytes',
    width: 'width',
    height: 'height',
    createdAt: 'createdAt'
};
export const TelegramLinkScalarFieldEnum = {
    userId: 'userId',
    telegramUserId: 'telegramUserId',
    chatId: 'chatId',
    telegramUsername: 'telegramUsername',
    enabled: 'enabled',
    linkedAt: 'linkedAt',
    lastDeliveryAt: 'lastDeliveryAt'
};
export const TelegramLinkCodeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    codeHash: 'codeHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
export const TelegramChannelScalarFieldEnum = {
    id: 'id',
    ownerUserId: 'ownerUserId',
    chatId: 'chatId',
    title: 'title',
    username: 'username',
    enabled: 'enabled',
    canPost: 'canPost',
    linkedAt: 'linkedAt',
    lastCheckedAt: 'lastCheckedAt',
    updatedAt: 'updatedAt'
};
export const TelegramShareScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    channelId: 'channelId',
    publicationId: 'publicationId',
    includeImage: 'includeImage',
    telegramMessageId: 'telegramMessageId',
    createdAt: 'createdAt'
};
export const ModerationActionScalarFieldEnum = {
    id: 'id',
    subjectUserId: 'subjectUserId',
    actorId: 'actorId',
    targetType: 'targetType',
    actionType: 'actionType',
    publicationId: 'publicationId',
    commentId: 'commentId',
    reason: 'reason',
    expiresAt: 'expiresAt',
    reversedAt: 'reversedAt',
    createdAt: 'createdAt'
};
export const ModerationAppealScalarFieldEnum = {
    id: 'id',
    actionId: 'actionId',
    userId: 'userId',
    body: 'body',
    status: 'status',
    resolutionNote: 'resolutionNote',
    resolvedById: 'resolvedById',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
};
export const CommunityProposalScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    suggestedParentId: 'suggestedParentId',
    name: 'name',
    description: 'description',
    initialTopics: 'initialTopics',
    status: 'status',
    resolutionNote: 'resolutionNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProposalSupportScalarFieldEnum = {
    proposalId: 'proposalId',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const CommunityPollScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    createdById: 'createdById',
    title: 'title',
    description: 'description',
    kind: 'kind',
    status: 'status',
    quorum: 'quorum',
    minAccountAgeDays: 'minAccountAgeDays',
    requireSubscription: 'requireSubscription',
    allowAdvisory: 'allowAdvisory',
    resultNote: 'resultNote',
    resultPublishedAt: 'resultPublishedAt',
    closesAt: 'closesAt',
    createdAt: 'createdAt'
};
export const PollOptionScalarFieldEnum = {
    id: 'id',
    pollId: 'pollId',
    label: 'label',
    position: 'position'
};
export const PollVoteScalarFieldEnum = {
    id: 'id',
    pollId: 'pollId',
    optionId: 'optionId',
    userId: 'userId',
    voteClass: 'voteClass',
    createdAt: 'createdAt'
};
export const WorkshopItemScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    reviewedById: 'reviewedById',
    previewMediaId: 'previewMediaId',
    type: 'type',
    status: 'status',
    title: 'title',
    description: 'description',
    resolutionNote: 'resolutionNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const WorkshopLikeScalarFieldEnum = {
    itemId: 'itemId',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const AchievementDefinitionScalarFieldEnum = {
    id: 'id',
    code: 'code',
    title: 'title',
    description: 'description',
    icon: 'icon',
    category: 'category',
    automatic: 'automatic',
    active: 'active',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const UserAchievementScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    achievementId: 'achievementId',
    communityId: 'communityId',
    scopeKey: 'scopeKey',
    sourceType: 'sourceType',
    sourceId: 'sourceId',
    metadata: 'metadata',
    earnedAt: 'earnedAt'
};
export const CommunityRoleEventScalarFieldEnum = {
    id: 'id',
    roleId: 'roleId',
    userId: 'userId',
    actorId: 'actorId',
    type: 'type',
    note: 'note',
    createdAt: 'createdAt'
};
export const ConfirmedInteractionScalarFieldEnum = {
    id: 'id',
    createdById: 'createdById',
    counterpartId: 'counterpartId',
    communityId: 'communityId',
    publicationId: 'publicationId',
    portfolioItemId: 'portfolioItemId',
    type: 'type',
    status: 'status',
    title: 'title',
    description: 'description',
    creatorConfirmedAt: 'creatorConfirmedAt',
    counterpartConfirmedAt: 'counterpartConfirmedAt',
    creatorCompletedAt: 'creatorCompletedAt',
    counterpartCompletedAt: 'counterpartCompletedAt',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProfileReviewScalarFieldEnum = {
    id: 'id',
    interactionId: 'interactionId',
    authorId: 'authorId',
    targetId: 'targetId',
    evidenceMediaId: 'evidenceMediaId',
    verdict: 'verdict',
    body: 'body',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommunityReportScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    authorId: 'authorId',
    publicationId: 'publicationId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    summary: 'summary',
    achievements: 'achievements',
    problems: 'problems',
    plans: 'plans',
    treasuryNote: 'treasuryNote',
    createdAt: 'createdAt'
};
export const CommunityContentActionScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    publicationId: 'publicationId',
    actorId: 'actorId',
    action: 'action',
    note: 'note',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
export const CommunityStructureProposalScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    targetCommunityId: 'targetCommunityId',
    createdById: 'createdById',
    resolvedById: 'resolvedById',
    type: 'type',
    status: 'status',
    title: 'title',
    description: 'description',
    proposedName: 'proposedName',
    resolutionNote: 'resolutionNote',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommunityRoleInviteScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    invitedUserId: 'invitedUserId',
    invitedById: 'invitedById',
    role: 'role',
    status: 'status',
    note: 'note',
    expiresAt: 'expiresAt',
    respondedAt: 'respondedAt',
    createdAt: 'createdAt'
};
export const CommunityEventScalarFieldEnum = {
    id: 'id',
    communityId: 'communityId',
    createdById: 'createdById',
    title: 'title',
    description: 'description',
    format: 'format',
    status: 'status',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    location: 'location',
    capacity: 'capacity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommunityEventAttendanceScalarFieldEnum = {
    eventId: 'eventId',
    userId: 'userId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PortfolioItemScalarFieldEnum = {
    id: 'id',
    ownerId: 'ownerId',
    communityId: 'communityId',
    publicationId: 'publicationId',
    kind: 'kind',
    status: 'status',
    title: 'title',
    summary: 'summary',
    description: 'description',
    coverUrl: 'coverUrl',
    lookingForTeam: 'lookingForTeam',
    priceText: 'priceText',
    contactNote: 'contactNote',
    links: 'links',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PlatformSettingScalarFieldEnum = {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull'
};
export const JsonNullValueInput = {
    JsonNull: 'JsonNull'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map