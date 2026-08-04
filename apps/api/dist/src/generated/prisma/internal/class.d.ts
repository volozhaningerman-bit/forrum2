import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get emailVerificationToken(): Prisma.EmailVerificationTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get feedPreference(): Prisma.FeedPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get hiddenCommunity(): Prisma.HiddenCommunityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get hiddenPublication(): Prisma.HiddenPublicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get community(): Prisma.CommunityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityRole(): Prisma.CommunityRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communitySubscription(): Prisma.CommunitySubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get publication(): Prisma.PublicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get comment(): Prisma.CommentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tag(): Prisma.TagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get publicationTag(): Prisma.PublicationTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tagSubscription(): Prisma.TagSubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get publicationReaction(): Prisma.PublicationReactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get commentReaction(): Prisma.CommentReactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bookmark(): Prisma.BookmarkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userFollow(): Prisma.UserFollowDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wallPost(): Prisma.WallPostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get conversation(): Prisma.ConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get conversationMember(): Prisma.ConversationMemberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get message(): Prisma.MessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get report(): Prisma.ReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wallet(): Prisma.WalletDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get promotionOrder(): Prisma.PromotionOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mediaAsset(): Prisma.MediaAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get telegramLink(): Prisma.TelegramLinkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get telegramLinkCode(): Prisma.TelegramLinkCodeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get telegramChannel(): Prisma.TelegramChannelDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get telegramShare(): Prisma.TelegramShareDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get moderationAction(): Prisma.ModerationActionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get moderationAppeal(): Prisma.ModerationAppealDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityProposal(): Prisma.CommunityProposalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get proposalSupport(): Prisma.ProposalSupportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityPoll(): Prisma.CommunityPollDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pollOption(): Prisma.PollOptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pollVote(): Prisma.PollVoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workshopItem(): Prisma.WorkshopItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workshopLike(): Prisma.WorkshopLikeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get achievementDefinition(): Prisma.AchievementDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityRoleEvent(): Prisma.CommunityRoleEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get confirmedInteraction(): Prisma.ConfirmedInteractionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get profileReview(): Prisma.ProfileReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityReport(): Prisma.CommunityReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityContentAction(): Prisma.CommunityContentActionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityStructureProposal(): Prisma.CommunityStructureProposalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityRoleInvite(): Prisma.CommunityRoleInviteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityEvent(): Prisma.CommunityEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get communityEventAttendance(): Prisma.CommunityEventAttendanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get portfolioItem(): Prisma.PortfolioItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get platformSetting(): Prisma.PlatformSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
