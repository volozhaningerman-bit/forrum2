import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly EmailVerificationToken: "EmailVerificationToken";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly Session: "Session";
    readonly NotificationPreference: "NotificationPreference";
    readonly FeedPreference: "FeedPreference";
    readonly HiddenCommunity: "HiddenCommunity";
    readonly HiddenPublication: "HiddenPublication";
    readonly Community: "Community";
    readonly CommunityRole: "CommunityRole";
    readonly CommunitySubscription: "CommunitySubscription";
    readonly Publication: "Publication";
    readonly Comment: "Comment";
    readonly Tag: "Tag";
    readonly PublicationTag: "PublicationTag";
    readonly TagSubscription: "TagSubscription";
    readonly PublicationReaction: "PublicationReaction";
    readonly CommentReaction: "CommentReaction";
    readonly Bookmark: "Bookmark";
    readonly UserFollow: "UserFollow";
    readonly WallPost: "WallPost";
    readonly Notification: "Notification";
    readonly Conversation: "Conversation";
    readonly ConversationMember: "ConversationMember";
    readonly Message: "Message";
    readonly Report: "Report";
    readonly AuditLog: "AuditLog";
    readonly Wallet: "Wallet";
    readonly WalletTransaction: "WalletTransaction";
    readonly PromotionOrder: "PromotionOrder";
    readonly MediaAsset: "MediaAsset";
    readonly TelegramLink: "TelegramLink";
    readonly TelegramLinkCode: "TelegramLinkCode";
    readonly TelegramChannel: "TelegramChannel";
    readonly TelegramShare: "TelegramShare";
    readonly ModerationAction: "ModerationAction";
    readonly ModerationAppeal: "ModerationAppeal";
    readonly CommunityProposal: "CommunityProposal";
    readonly ProposalSupport: "ProposalSupport";
    readonly CommunityPoll: "CommunityPoll";
    readonly PollOption: "PollOption";
    readonly PollVote: "PollVote";
    readonly WorkshopItem: "WorkshopItem";
    readonly WorkshopLike: "WorkshopLike";
    readonly AchievementDefinition: "AchievementDefinition";
    readonly UserAchievement: "UserAchievement";
    readonly CommunityRoleEvent: "CommunityRoleEvent";
    readonly ConfirmedInteraction: "ConfirmedInteraction";
    readonly ProfileReview: "ProfileReview";
    readonly CommunityReport: "CommunityReport";
    readonly CommunityContentAction: "CommunityContentAction";
    readonly CommunityStructureProposal: "CommunityStructureProposal";
    readonly CommunityRoleInvite: "CommunityRoleInvite";
    readonly CommunityEvent: "CommunityEvent";
    readonly CommunityEventAttendance: "CommunityEventAttendance";
    readonly PortfolioItem: "PortfolioItem";
    readonly PlatformSetting: "PlatformSetting";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "emailVerificationToken" | "passwordResetToken" | "session" | "notificationPreference" | "feedPreference" | "hiddenCommunity" | "hiddenPublication" | "community" | "communityRole" | "communitySubscription" | "publication" | "comment" | "tag" | "publicationTag" | "tagSubscription" | "publicationReaction" | "commentReaction" | "bookmark" | "userFollow" | "wallPost" | "notification" | "conversation" | "conversationMember" | "message" | "report" | "auditLog" | "wallet" | "walletTransaction" | "promotionOrder" | "mediaAsset" | "telegramLink" | "telegramLinkCode" | "telegramChannel" | "telegramShare" | "moderationAction" | "moderationAppeal" | "communityProposal" | "proposalSupport" | "communityPoll" | "pollOption" | "pollVote" | "workshopItem" | "workshopLike" | "achievementDefinition" | "userAchievement" | "communityRoleEvent" | "confirmedInteraction" | "profileReview" | "communityReport" | "communityContentAction" | "communityStructureProposal" | "communityRoleInvite" | "communityEvent" | "communityEventAttendance" | "portfolioItem" | "platformSetting";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        EmailVerificationToken: {
            payload: Prisma.$EmailVerificationTokenPayload<ExtArgs>;
            fields: Prisma.EmailVerificationTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailVerificationTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findFirst: {
                    args: Prisma.EmailVerificationTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findMany: {
                    args: Prisma.EmailVerificationTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                create: {
                    args: Prisma.EmailVerificationTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                createMany: {
                    args: Prisma.EmailVerificationTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailVerificationTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                delete: {
                    args: Prisma.EmailVerificationTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                update: {
                    args: Prisma.EmailVerificationTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailVerificationTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailVerificationTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailVerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                upsert: {
                    args: Prisma.EmailVerificationTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                aggregate: {
                    args: Prisma.EmailVerificationTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailVerificationToken>;
                };
                groupBy: {
                    args: Prisma.EmailVerificationTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailVerificationTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenCountAggregateOutputType> | number;
                };
            };
        };
        PasswordResetToken: {
            payload: Prisma.$PasswordResetTokenPayload<ExtArgs>;
            fields: Prisma.PasswordResetTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                update: {
                    args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordResetToken>;
                };
                groupBy: {
                    args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        NotificationPreference: {
            payload: Prisma.$NotificationPreferencePayload<ExtArgs>;
            fields: Prisma.NotificationPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findMany: {
                    args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                create: {
                    args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                createMany: {
                    args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                delete: {
                    args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                update: {
                    args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationPreference>;
                };
                groupBy: {
                    args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        FeedPreference: {
            payload: Prisma.$FeedPreferencePayload<ExtArgs>;
            fields: Prisma.FeedPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FeedPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FeedPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.FeedPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FeedPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                findMany: {
                    args: Prisma.FeedPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>[];
                };
                create: {
                    args: Prisma.FeedPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                createMany: {
                    args: Prisma.FeedPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FeedPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>[];
                };
                delete: {
                    args: Prisma.FeedPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                update: {
                    args: Prisma.FeedPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.FeedPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FeedPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FeedPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.FeedPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FeedPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.FeedPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFeedPreference>;
                };
                groupBy: {
                    args: Prisma.FeedPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FeedPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FeedPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FeedPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        HiddenCommunity: {
            payload: Prisma.$HiddenCommunityPayload<ExtArgs>;
            fields: Prisma.HiddenCommunityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HiddenCommunityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HiddenCommunityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                findFirst: {
                    args: Prisma.HiddenCommunityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HiddenCommunityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                findMany: {
                    args: Prisma.HiddenCommunityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>[];
                };
                create: {
                    args: Prisma.HiddenCommunityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                createMany: {
                    args: Prisma.HiddenCommunityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HiddenCommunityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>[];
                };
                delete: {
                    args: Prisma.HiddenCommunityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                update: {
                    args: Prisma.HiddenCommunityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                deleteMany: {
                    args: Prisma.HiddenCommunityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HiddenCommunityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HiddenCommunityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>[];
                };
                upsert: {
                    args: Prisma.HiddenCommunityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenCommunityPayload>;
                };
                aggregate: {
                    args: Prisma.HiddenCommunityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHiddenCommunity>;
                };
                groupBy: {
                    args: Prisma.HiddenCommunityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HiddenCommunityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HiddenCommunityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HiddenCommunityCountAggregateOutputType> | number;
                };
            };
        };
        HiddenPublication: {
            payload: Prisma.$HiddenPublicationPayload<ExtArgs>;
            fields: Prisma.HiddenPublicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HiddenPublicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HiddenPublicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                findFirst: {
                    args: Prisma.HiddenPublicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HiddenPublicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                findMany: {
                    args: Prisma.HiddenPublicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>[];
                };
                create: {
                    args: Prisma.HiddenPublicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                createMany: {
                    args: Prisma.HiddenPublicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HiddenPublicationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>[];
                };
                delete: {
                    args: Prisma.HiddenPublicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                update: {
                    args: Prisma.HiddenPublicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                deleteMany: {
                    args: Prisma.HiddenPublicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HiddenPublicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HiddenPublicationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>[];
                };
                upsert: {
                    args: Prisma.HiddenPublicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HiddenPublicationPayload>;
                };
                aggregate: {
                    args: Prisma.HiddenPublicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHiddenPublication>;
                };
                groupBy: {
                    args: Prisma.HiddenPublicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HiddenPublicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HiddenPublicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HiddenPublicationCountAggregateOutputType> | number;
                };
            };
        };
        Community: {
            payload: Prisma.$CommunityPayload<ExtArgs>;
            fields: Prisma.CommunityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                findMany: {
                    args: Prisma.CommunityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>[];
                };
                create: {
                    args: Prisma.CommunityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                createMany: {
                    args: Prisma.CommunityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>[];
                };
                delete: {
                    args: Prisma.CommunityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                update: {
                    args: Prisma.CommunityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunity>;
                };
                groupBy: {
                    args: Prisma.CommunityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityCountAggregateOutputType> | number;
                };
            };
        };
        CommunityRole: {
            payload: Prisma.$CommunityRolePayload<ExtArgs>;
            fields: Prisma.CommunityRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                findFirst: {
                    args: Prisma.CommunityRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                findMany: {
                    args: Prisma.CommunityRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>[];
                };
                create: {
                    args: Prisma.CommunityRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                createMany: {
                    args: Prisma.CommunityRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>[];
                };
                delete: {
                    args: Prisma.CommunityRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                update: {
                    args: Prisma.CommunityRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>[];
                };
                upsert: {
                    args: Prisma.CommunityRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRolePayload>;
                };
                aggregate: {
                    args: Prisma.CommunityRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityRole>;
                };
                groupBy: {
                    args: Prisma.CommunityRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleCountAggregateOutputType> | number;
                };
            };
        };
        CommunitySubscription: {
            payload: Prisma.$CommunitySubscriptionPayload<ExtArgs>;
            fields: Prisma.CommunitySubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunitySubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunitySubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.CommunitySubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunitySubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.CommunitySubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>[];
                };
                create: {
                    args: Prisma.CommunitySubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.CommunitySubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunitySubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.CommunitySubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                update: {
                    args: Prisma.CommunitySubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunitySubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunitySubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunitySubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.CommunitySubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunitySubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.CommunitySubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunitySubscription>;
                };
                groupBy: {
                    args: Prisma.CommunitySubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunitySubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunitySubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunitySubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        Publication: {
            payload: Prisma.$PublicationPayload<ExtArgs>;
            fields: Prisma.PublicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PublicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PublicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                findFirst: {
                    args: Prisma.PublicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PublicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                findMany: {
                    args: Prisma.PublicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>[];
                };
                create: {
                    args: Prisma.PublicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                createMany: {
                    args: Prisma.PublicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PublicationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>[];
                };
                delete: {
                    args: Prisma.PublicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                update: {
                    args: Prisma.PublicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                deleteMany: {
                    args: Prisma.PublicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PublicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PublicationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>[];
                };
                upsert: {
                    args: Prisma.PublicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationPayload>;
                };
                aggregate: {
                    args: Prisma.PublicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePublication>;
                };
                groupBy: {
                    args: Prisma.PublicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PublicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationCountAggregateOutputType> | number;
                };
            };
        };
        Comment: {
            payload: Prisma.$CommentPayload<ExtArgs>;
            fields: Prisma.CommentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findFirst: {
                    args: Prisma.CommentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findMany: {
                    args: Prisma.CommentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                create: {
                    args: Prisma.CommentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                createMany: {
                    args: Prisma.CommentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                delete: {
                    args: Prisma.CommentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                update: {
                    args: Prisma.CommentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                deleteMany: {
                    args: Prisma.CommentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                upsert: {
                    args: Prisma.CommentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                aggregate: {
                    args: Prisma.CommentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComment>;
                };
                groupBy: {
                    args: Prisma.CommentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentCountAggregateOutputType> | number;
                };
            };
        };
        Tag: {
            payload: Prisma.$TagPayload<ExtArgs>;
            fields: Prisma.TagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findFirst: {
                    args: Prisma.TagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findMany: {
                    args: Prisma.TagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                create: {
                    args: Prisma.TagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                createMany: {
                    args: Prisma.TagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                delete: {
                    args: Prisma.TagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                update: {
                    args: Prisma.TagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                deleteMany: {
                    args: Prisma.TagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                upsert: {
                    args: Prisma.TagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                aggregate: {
                    args: Prisma.TagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTag>;
                };
                groupBy: {
                    args: Prisma.TagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagCountAggregateOutputType> | number;
                };
            };
        };
        PublicationTag: {
            payload: Prisma.$PublicationTagPayload<ExtArgs>;
            fields: Prisma.PublicationTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PublicationTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PublicationTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                findFirst: {
                    args: Prisma.PublicationTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PublicationTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                findMany: {
                    args: Prisma.PublicationTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>[];
                };
                create: {
                    args: Prisma.PublicationTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                createMany: {
                    args: Prisma.PublicationTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PublicationTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>[];
                };
                delete: {
                    args: Prisma.PublicationTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                update: {
                    args: Prisma.PublicationTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                deleteMany: {
                    args: Prisma.PublicationTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PublicationTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PublicationTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>[];
                };
                upsert: {
                    args: Prisma.PublicationTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationTagPayload>;
                };
                aggregate: {
                    args: Prisma.PublicationTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePublicationTag>;
                };
                groupBy: {
                    args: Prisma.PublicationTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PublicationTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationTagCountAggregateOutputType> | number;
                };
            };
        };
        TagSubscription: {
            payload: Prisma.$TagSubscriptionPayload<ExtArgs>;
            fields: Prisma.TagSubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TagSubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TagSubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.TagSubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TagSubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.TagSubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>[];
                };
                create: {
                    args: Prisma.TagSubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.TagSubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TagSubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.TagSubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                update: {
                    args: Prisma.TagSubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.TagSubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TagSubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TagSubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.TagSubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagSubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.TagSubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTagSubscription>;
                };
                groupBy: {
                    args: Prisma.TagSubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagSubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TagSubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagSubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        PublicationReaction: {
            payload: Prisma.$PublicationReactionPayload<ExtArgs>;
            fields: Prisma.PublicationReactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PublicationReactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PublicationReactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                findFirst: {
                    args: Prisma.PublicationReactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PublicationReactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                findMany: {
                    args: Prisma.PublicationReactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>[];
                };
                create: {
                    args: Prisma.PublicationReactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                createMany: {
                    args: Prisma.PublicationReactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PublicationReactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>[];
                };
                delete: {
                    args: Prisma.PublicationReactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                update: {
                    args: Prisma.PublicationReactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                deleteMany: {
                    args: Prisma.PublicationReactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PublicationReactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PublicationReactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>[];
                };
                upsert: {
                    args: Prisma.PublicationReactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PublicationReactionPayload>;
                };
                aggregate: {
                    args: Prisma.PublicationReactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePublicationReaction>;
                };
                groupBy: {
                    args: Prisma.PublicationReactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationReactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PublicationReactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PublicationReactionCountAggregateOutputType> | number;
                };
            };
        };
        CommentReaction: {
            payload: Prisma.$CommentReactionPayload<ExtArgs>;
            fields: Prisma.CommentReactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommentReactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommentReactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                findFirst: {
                    args: Prisma.CommentReactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommentReactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                findMany: {
                    args: Prisma.CommentReactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>[];
                };
                create: {
                    args: Prisma.CommentReactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                createMany: {
                    args: Prisma.CommentReactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommentReactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>[];
                };
                delete: {
                    args: Prisma.CommentReactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                update: {
                    args: Prisma.CommentReactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                deleteMany: {
                    args: Prisma.CommentReactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommentReactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommentReactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>[];
                };
                upsert: {
                    args: Prisma.CommentReactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentReactionPayload>;
                };
                aggregate: {
                    args: Prisma.CommentReactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommentReaction>;
                };
                groupBy: {
                    args: Prisma.CommentReactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentReactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommentReactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentReactionCountAggregateOutputType> | number;
                };
            };
        };
        Bookmark: {
            payload: Prisma.$BookmarkPayload<ExtArgs>;
            fields: Prisma.BookmarkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BookmarkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                findFirst: {
                    args: Prisma.BookmarkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                findMany: {
                    args: Prisma.BookmarkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>[];
                };
                create: {
                    args: Prisma.BookmarkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                createMany: {
                    args: Prisma.BookmarkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BookmarkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>[];
                };
                delete: {
                    args: Prisma.BookmarkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                update: {
                    args: Prisma.BookmarkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                deleteMany: {
                    args: Prisma.BookmarkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BookmarkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BookmarkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>[];
                };
                upsert: {
                    args: Prisma.BookmarkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookmarkPayload>;
                };
                aggregate: {
                    args: Prisma.BookmarkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBookmark>;
                };
                groupBy: {
                    args: Prisma.BookmarkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookmarkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BookmarkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookmarkCountAggregateOutputType> | number;
                };
            };
        };
        UserFollow: {
            payload: Prisma.$UserFollowPayload<ExtArgs>;
            fields: Prisma.UserFollowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFollowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFollowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                findFirst: {
                    args: Prisma.UserFollowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFollowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                findMany: {
                    args: Prisma.UserFollowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>[];
                };
                create: {
                    args: Prisma.UserFollowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                createMany: {
                    args: Prisma.UserFollowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserFollowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>[];
                };
                delete: {
                    args: Prisma.UserFollowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                update: {
                    args: Prisma.UserFollowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                deleteMany: {
                    args: Prisma.UserFollowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserFollowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserFollowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>[];
                };
                upsert: {
                    args: Prisma.UserFollowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserFollowPayload>;
                };
                aggregate: {
                    args: Prisma.UserFollowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserFollow>;
                };
                groupBy: {
                    args: Prisma.UserFollowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserFollowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserFollowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserFollowCountAggregateOutputType> | number;
                };
            };
        };
        WallPost: {
            payload: Prisma.$WallPostPayload<ExtArgs>;
            fields: Prisma.WallPostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WallPostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WallPostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                findFirst: {
                    args: Prisma.WallPostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WallPostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                findMany: {
                    args: Prisma.WallPostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>[];
                };
                create: {
                    args: Prisma.WallPostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                createMany: {
                    args: Prisma.WallPostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WallPostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>[];
                };
                delete: {
                    args: Prisma.WallPostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                update: {
                    args: Prisma.WallPostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                deleteMany: {
                    args: Prisma.WallPostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WallPostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WallPostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>[];
                };
                upsert: {
                    args: Prisma.WallPostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WallPostPayload>;
                };
                aggregate: {
                    args: Prisma.WallPostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWallPost>;
                };
                groupBy: {
                    args: Prisma.WallPostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WallPostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WallPostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WallPostCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        Conversation: {
            payload: Prisma.$ConversationPayload<ExtArgs>;
            fields: Prisma.ConversationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConversationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findFirst: {
                    args: Prisma.ConversationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findMany: {
                    args: Prisma.ConversationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                create: {
                    args: Prisma.ConversationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                createMany: {
                    args: Prisma.ConversationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                delete: {
                    args: Prisma.ConversationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                update: {
                    args: Prisma.ConversationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConversationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConversationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                upsert: {
                    args: Prisma.ConversationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                aggregate: {
                    args: Prisma.ConversationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConversation>;
                };
                groupBy: {
                    args: Prisma.ConversationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConversationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationCountAggregateOutputType> | number;
                };
            };
        };
        ConversationMember: {
            payload: Prisma.$ConversationMemberPayload<ExtArgs>;
            fields: Prisma.ConversationMemberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConversationMemberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConversationMemberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                findFirst: {
                    args: Prisma.ConversationMemberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConversationMemberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                findMany: {
                    args: Prisma.ConversationMemberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>[];
                };
                create: {
                    args: Prisma.ConversationMemberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                createMany: {
                    args: Prisma.ConversationMemberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConversationMemberCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>[];
                };
                delete: {
                    args: Prisma.ConversationMemberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                update: {
                    args: Prisma.ConversationMemberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                deleteMany: {
                    args: Prisma.ConversationMemberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConversationMemberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConversationMemberUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>[];
                };
                upsert: {
                    args: Prisma.ConversationMemberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationMemberPayload>;
                };
                aggregate: {
                    args: Prisma.ConversationMemberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConversationMember>;
                };
                groupBy: {
                    args: Prisma.ConversationMemberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationMemberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConversationMemberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationMemberCountAggregateOutputType> | number;
                };
            };
        };
        Message: {
            payload: Prisma.$MessagePayload<ExtArgs>;
            fields: Prisma.MessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findFirst: {
                    args: Prisma.MessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findMany: {
                    args: Prisma.MessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                create: {
                    args: Prisma.MessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                createMany: {
                    args: Prisma.MessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                delete: {
                    args: Prisma.MessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                update: {
                    args: Prisma.MessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                deleteMany: {
                    args: Prisma.MessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                upsert: {
                    args: Prisma.MessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                aggregate: {
                    args: Prisma.MessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessage>;
                };
                groupBy: {
                    args: Prisma.MessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageCountAggregateOutputType> | number;
                };
            };
        };
        Report: {
            payload: Prisma.$ReportPayload<ExtArgs>;
            fields: Prisma.ReportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                findFirst: {
                    args: Prisma.ReportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                findMany: {
                    args: Prisma.ReportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[];
                };
                create: {
                    args: Prisma.ReportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                createMany: {
                    args: Prisma.ReportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[];
                };
                delete: {
                    args: Prisma.ReportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                update: {
                    args: Prisma.ReportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                deleteMany: {
                    args: Prisma.ReportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[];
                };
                upsert: {
                    args: Prisma.ReportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>;
                };
                aggregate: {
                    args: Prisma.ReportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReport>;
                };
                groupBy: {
                    args: Prisma.ReportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReportCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        Wallet: {
            payload: Prisma.$WalletPayload<ExtArgs>;
            fields: Prisma.WalletFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findFirst: {
                    args: Prisma.WalletFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findMany: {
                    args: Prisma.WalletFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                create: {
                    args: Prisma.WalletCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                createMany: {
                    args: Prisma.WalletCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                delete: {
                    args: Prisma.WalletDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                update: {
                    args: Prisma.WalletUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                upsert: {
                    args: Prisma.WalletUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                aggregate: {
                    args: Prisma.WalletAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWallet>;
                };
                groupBy: {
                    args: Prisma.WalletGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletCountAggregateOutputType> | number;
                };
            };
        };
        WalletTransaction: {
            payload: Prisma.$WalletTransactionPayload<ExtArgs>;
            fields: Prisma.WalletTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.WalletTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findMany: {
                    args: Prisma.WalletTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                create: {
                    args: Prisma.WalletTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                createMany: {
                    args: Prisma.WalletTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                delete: {
                    args: Prisma.WalletTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                update: {
                    args: Prisma.WalletTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.WalletTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.WalletTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWalletTransaction>;
                };
                groupBy: {
                    args: Prisma.WalletTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionCountAggregateOutputType> | number;
                };
            };
        };
        PromotionOrder: {
            payload: Prisma.$PromotionOrderPayload<ExtArgs>;
            fields: Prisma.PromotionOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PromotionOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PromotionOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                findFirst: {
                    args: Prisma.PromotionOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PromotionOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                findMany: {
                    args: Prisma.PromotionOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>[];
                };
                create: {
                    args: Prisma.PromotionOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                createMany: {
                    args: Prisma.PromotionOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PromotionOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>[];
                };
                delete: {
                    args: Prisma.PromotionOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                update: {
                    args: Prisma.PromotionOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.PromotionOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PromotionOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PromotionOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>[];
                };
                upsert: {
                    args: Prisma.PromotionOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionOrderPayload>;
                };
                aggregate: {
                    args: Prisma.PromotionOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePromotionOrder>;
                };
                groupBy: {
                    args: Prisma.PromotionOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PromotionOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionOrderCountAggregateOutputType> | number;
                };
            };
        };
        MediaAsset: {
            payload: Prisma.$MediaAssetPayload<ExtArgs>;
            fields: Prisma.MediaAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MediaAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MediaAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                findFirst: {
                    args: Prisma.MediaAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MediaAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                findMany: {
                    args: Prisma.MediaAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>[];
                };
                create: {
                    args: Prisma.MediaAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                createMany: {
                    args: Prisma.MediaAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MediaAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>[];
                };
                delete: {
                    args: Prisma.MediaAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                update: {
                    args: Prisma.MediaAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.MediaAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MediaAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MediaAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>[];
                };
                upsert: {
                    args: Prisma.MediaAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MediaAssetPayload>;
                };
                aggregate: {
                    args: Prisma.MediaAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMediaAsset>;
                };
                groupBy: {
                    args: Prisma.MediaAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MediaAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MediaAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MediaAssetCountAggregateOutputType> | number;
                };
            };
        };
        TelegramLink: {
            payload: Prisma.$TelegramLinkPayload<ExtArgs>;
            fields: Prisma.TelegramLinkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TelegramLinkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TelegramLinkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                findFirst: {
                    args: Prisma.TelegramLinkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TelegramLinkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                findMany: {
                    args: Prisma.TelegramLinkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>[];
                };
                create: {
                    args: Prisma.TelegramLinkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                createMany: {
                    args: Prisma.TelegramLinkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TelegramLinkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>[];
                };
                delete: {
                    args: Prisma.TelegramLinkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                update: {
                    args: Prisma.TelegramLinkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                deleteMany: {
                    args: Prisma.TelegramLinkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TelegramLinkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TelegramLinkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>[];
                };
                upsert: {
                    args: Prisma.TelegramLinkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkPayload>;
                };
                aggregate: {
                    args: Prisma.TelegramLinkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTelegramLink>;
                };
                groupBy: {
                    args: Prisma.TelegramLinkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramLinkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TelegramLinkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramLinkCountAggregateOutputType> | number;
                };
            };
        };
        TelegramLinkCode: {
            payload: Prisma.$TelegramLinkCodePayload<ExtArgs>;
            fields: Prisma.TelegramLinkCodeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TelegramLinkCodeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TelegramLinkCodeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                findFirst: {
                    args: Prisma.TelegramLinkCodeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TelegramLinkCodeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                findMany: {
                    args: Prisma.TelegramLinkCodeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>[];
                };
                create: {
                    args: Prisma.TelegramLinkCodeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                createMany: {
                    args: Prisma.TelegramLinkCodeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TelegramLinkCodeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>[];
                };
                delete: {
                    args: Prisma.TelegramLinkCodeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                update: {
                    args: Prisma.TelegramLinkCodeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                deleteMany: {
                    args: Prisma.TelegramLinkCodeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TelegramLinkCodeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TelegramLinkCodeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>[];
                };
                upsert: {
                    args: Prisma.TelegramLinkCodeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramLinkCodePayload>;
                };
                aggregate: {
                    args: Prisma.TelegramLinkCodeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTelegramLinkCode>;
                };
                groupBy: {
                    args: Prisma.TelegramLinkCodeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramLinkCodeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TelegramLinkCodeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramLinkCodeCountAggregateOutputType> | number;
                };
            };
        };
        TelegramChannel: {
            payload: Prisma.$TelegramChannelPayload<ExtArgs>;
            fields: Prisma.TelegramChannelFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TelegramChannelFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TelegramChannelFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                findFirst: {
                    args: Prisma.TelegramChannelFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TelegramChannelFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                findMany: {
                    args: Prisma.TelegramChannelFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>[];
                };
                create: {
                    args: Prisma.TelegramChannelCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                createMany: {
                    args: Prisma.TelegramChannelCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TelegramChannelCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>[];
                };
                delete: {
                    args: Prisma.TelegramChannelDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                update: {
                    args: Prisma.TelegramChannelUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                deleteMany: {
                    args: Prisma.TelegramChannelDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TelegramChannelUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TelegramChannelUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>[];
                };
                upsert: {
                    args: Prisma.TelegramChannelUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramChannelPayload>;
                };
                aggregate: {
                    args: Prisma.TelegramChannelAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTelegramChannel>;
                };
                groupBy: {
                    args: Prisma.TelegramChannelGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramChannelGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TelegramChannelCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramChannelCountAggregateOutputType> | number;
                };
            };
        };
        TelegramShare: {
            payload: Prisma.$TelegramSharePayload<ExtArgs>;
            fields: Prisma.TelegramShareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TelegramShareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TelegramShareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                findFirst: {
                    args: Prisma.TelegramShareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TelegramShareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                findMany: {
                    args: Prisma.TelegramShareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>[];
                };
                create: {
                    args: Prisma.TelegramShareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                createMany: {
                    args: Prisma.TelegramShareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TelegramShareCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>[];
                };
                delete: {
                    args: Prisma.TelegramShareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                update: {
                    args: Prisma.TelegramShareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                deleteMany: {
                    args: Prisma.TelegramShareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TelegramShareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TelegramShareUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>[];
                };
                upsert: {
                    args: Prisma.TelegramShareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TelegramSharePayload>;
                };
                aggregate: {
                    args: Prisma.TelegramShareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTelegramShare>;
                };
                groupBy: {
                    args: Prisma.TelegramShareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramShareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TelegramShareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TelegramShareCountAggregateOutputType> | number;
                };
            };
        };
        ModerationAction: {
            payload: Prisma.$ModerationActionPayload<ExtArgs>;
            fields: Prisma.ModerationActionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ModerationActionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ModerationActionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                findFirst: {
                    args: Prisma.ModerationActionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ModerationActionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                findMany: {
                    args: Prisma.ModerationActionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>[];
                };
                create: {
                    args: Prisma.ModerationActionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                createMany: {
                    args: Prisma.ModerationActionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ModerationActionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>[];
                };
                delete: {
                    args: Prisma.ModerationActionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                update: {
                    args: Prisma.ModerationActionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                deleteMany: {
                    args: Prisma.ModerationActionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ModerationActionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ModerationActionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>[];
                };
                upsert: {
                    args: Prisma.ModerationActionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationActionPayload>;
                };
                aggregate: {
                    args: Prisma.ModerationActionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateModerationAction>;
                };
                groupBy: {
                    args: Prisma.ModerationActionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModerationActionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ModerationActionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModerationActionCountAggregateOutputType> | number;
                };
            };
        };
        ModerationAppeal: {
            payload: Prisma.$ModerationAppealPayload<ExtArgs>;
            fields: Prisma.ModerationAppealFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ModerationAppealFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ModerationAppealFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                findFirst: {
                    args: Prisma.ModerationAppealFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ModerationAppealFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                findMany: {
                    args: Prisma.ModerationAppealFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>[];
                };
                create: {
                    args: Prisma.ModerationAppealCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                createMany: {
                    args: Prisma.ModerationAppealCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ModerationAppealCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>[];
                };
                delete: {
                    args: Prisma.ModerationAppealDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                update: {
                    args: Prisma.ModerationAppealUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                deleteMany: {
                    args: Prisma.ModerationAppealDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ModerationAppealUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ModerationAppealUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>[];
                };
                upsert: {
                    args: Prisma.ModerationAppealUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ModerationAppealPayload>;
                };
                aggregate: {
                    args: Prisma.ModerationAppealAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateModerationAppeal>;
                };
                groupBy: {
                    args: Prisma.ModerationAppealGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModerationAppealGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ModerationAppealCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ModerationAppealCountAggregateOutputType> | number;
                };
            };
        };
        CommunityProposal: {
            payload: Prisma.$CommunityProposalPayload<ExtArgs>;
            fields: Prisma.CommunityProposalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityProposalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityProposalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityProposalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityProposalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                findMany: {
                    args: Prisma.CommunityProposalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>[];
                };
                create: {
                    args: Prisma.CommunityProposalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                createMany: {
                    args: Prisma.CommunityProposalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityProposalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>[];
                };
                delete: {
                    args: Prisma.CommunityProposalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                update: {
                    args: Prisma.CommunityProposalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityProposalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityProposalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityProposalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityProposalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityProposalPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityProposalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityProposal>;
                };
                groupBy: {
                    args: Prisma.CommunityProposalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityProposalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityProposalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityProposalCountAggregateOutputType> | number;
                };
            };
        };
        ProposalSupport: {
            payload: Prisma.$ProposalSupportPayload<ExtArgs>;
            fields: Prisma.ProposalSupportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProposalSupportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProposalSupportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                findFirst: {
                    args: Prisma.ProposalSupportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProposalSupportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                findMany: {
                    args: Prisma.ProposalSupportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>[];
                };
                create: {
                    args: Prisma.ProposalSupportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                createMany: {
                    args: Prisma.ProposalSupportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProposalSupportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>[];
                };
                delete: {
                    args: Prisma.ProposalSupportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                update: {
                    args: Prisma.ProposalSupportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                deleteMany: {
                    args: Prisma.ProposalSupportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProposalSupportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProposalSupportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>[];
                };
                upsert: {
                    args: Prisma.ProposalSupportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalSupportPayload>;
                };
                aggregate: {
                    args: Prisma.ProposalSupportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProposalSupport>;
                };
                groupBy: {
                    args: Prisma.ProposalSupportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProposalSupportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProposalSupportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProposalSupportCountAggregateOutputType> | number;
                };
            };
        };
        CommunityPoll: {
            payload: Prisma.$CommunityPollPayload<ExtArgs>;
            fields: Prisma.CommunityPollFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityPollFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityPollFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityPollFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityPollFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                findMany: {
                    args: Prisma.CommunityPollFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>[];
                };
                create: {
                    args: Prisma.CommunityPollCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                createMany: {
                    args: Prisma.CommunityPollCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityPollCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>[];
                };
                delete: {
                    args: Prisma.CommunityPollDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                update: {
                    args: Prisma.CommunityPollUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityPollDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityPollUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityPollUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityPollUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityPollPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityPollAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityPoll>;
                };
                groupBy: {
                    args: Prisma.CommunityPollGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityPollGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityPollCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityPollCountAggregateOutputType> | number;
                };
            };
        };
        PollOption: {
            payload: Prisma.$PollOptionPayload<ExtArgs>;
            fields: Prisma.PollOptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PollOptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PollOptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                findFirst: {
                    args: Prisma.PollOptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PollOptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                findMany: {
                    args: Prisma.PollOptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>[];
                };
                create: {
                    args: Prisma.PollOptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                createMany: {
                    args: Prisma.PollOptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PollOptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>[];
                };
                delete: {
                    args: Prisma.PollOptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                update: {
                    args: Prisma.PollOptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                deleteMany: {
                    args: Prisma.PollOptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PollOptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PollOptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>[];
                };
                upsert: {
                    args: Prisma.PollOptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollOptionPayload>;
                };
                aggregate: {
                    args: Prisma.PollOptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePollOption>;
                };
                groupBy: {
                    args: Prisma.PollOptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PollOptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PollOptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PollOptionCountAggregateOutputType> | number;
                };
            };
        };
        PollVote: {
            payload: Prisma.$PollVotePayload<ExtArgs>;
            fields: Prisma.PollVoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PollVoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PollVoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                findFirst: {
                    args: Prisma.PollVoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PollVoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                findMany: {
                    args: Prisma.PollVoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>[];
                };
                create: {
                    args: Prisma.PollVoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                createMany: {
                    args: Prisma.PollVoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PollVoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>[];
                };
                delete: {
                    args: Prisma.PollVoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                update: {
                    args: Prisma.PollVoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                deleteMany: {
                    args: Prisma.PollVoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PollVoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PollVoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>[];
                };
                upsert: {
                    args: Prisma.PollVoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PollVotePayload>;
                };
                aggregate: {
                    args: Prisma.PollVoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePollVote>;
                };
                groupBy: {
                    args: Prisma.PollVoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PollVoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PollVoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PollVoteCountAggregateOutputType> | number;
                };
            };
        };
        WorkshopItem: {
            payload: Prisma.$WorkshopItemPayload<ExtArgs>;
            fields: Prisma.WorkshopItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkshopItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkshopItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                findFirst: {
                    args: Prisma.WorkshopItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkshopItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                findMany: {
                    args: Prisma.WorkshopItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>[];
                };
                create: {
                    args: Prisma.WorkshopItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                createMany: {
                    args: Prisma.WorkshopItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkshopItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>[];
                };
                delete: {
                    args: Prisma.WorkshopItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                update: {
                    args: Prisma.WorkshopItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkshopItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkshopItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkshopItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>[];
                };
                upsert: {
                    args: Prisma.WorkshopItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopItemPayload>;
                };
                aggregate: {
                    args: Prisma.WorkshopItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkshopItem>;
                };
                groupBy: {
                    args: Prisma.WorkshopItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkshopItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkshopItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkshopItemCountAggregateOutputType> | number;
                };
            };
        };
        WorkshopLike: {
            payload: Prisma.$WorkshopLikePayload<ExtArgs>;
            fields: Prisma.WorkshopLikeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkshopLikeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkshopLikeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                findFirst: {
                    args: Prisma.WorkshopLikeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkshopLikeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                findMany: {
                    args: Prisma.WorkshopLikeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>[];
                };
                create: {
                    args: Prisma.WorkshopLikeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                createMany: {
                    args: Prisma.WorkshopLikeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkshopLikeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>[];
                };
                delete: {
                    args: Prisma.WorkshopLikeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                update: {
                    args: Prisma.WorkshopLikeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkshopLikeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkshopLikeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkshopLikeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>[];
                };
                upsert: {
                    args: Prisma.WorkshopLikeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkshopLikePayload>;
                };
                aggregate: {
                    args: Prisma.WorkshopLikeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkshopLike>;
                };
                groupBy: {
                    args: Prisma.WorkshopLikeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkshopLikeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkshopLikeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkshopLikeCountAggregateOutputType> | number;
                };
            };
        };
        AchievementDefinition: {
            payload: Prisma.$AchievementDefinitionPayload<ExtArgs>;
            fields: Prisma.AchievementDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AchievementDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AchievementDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.AchievementDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AchievementDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.AchievementDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>[];
                };
                create: {
                    args: Prisma.AchievementDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.AchievementDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AchievementDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.AchievementDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                update: {
                    args: Prisma.AchievementDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.AchievementDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AchievementDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AchievementDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.AchievementDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.AchievementDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAchievementDefinition>;
                };
                groupBy: {
                    args: Prisma.AchievementDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AchievementDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AchievementDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AchievementDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        UserAchievement: {
            payload: Prisma.$UserAchievementPayload<ExtArgs>;
            fields: Prisma.UserAchievementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                findFirst: {
                    args: Prisma.UserAchievementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                findMany: {
                    args: Prisma.UserAchievementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
                };
                create: {
                    args: Prisma.UserAchievementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                createMany: {
                    args: Prisma.UserAchievementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserAchievementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
                };
                delete: {
                    args: Prisma.UserAchievementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                update: {
                    args: Prisma.UserAchievementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                deleteMany: {
                    args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserAchievementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>[];
                };
                upsert: {
                    args: Prisma.UserAchievementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserAchievementPayload>;
                };
                aggregate: {
                    args: Prisma.UserAchievementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserAchievement>;
                };
                groupBy: {
                    args: Prisma.UserAchievementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserAchievementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserAchievementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserAchievementCountAggregateOutputType> | number;
                };
            };
        };
        CommunityRoleEvent: {
            payload: Prisma.$CommunityRoleEventPayload<ExtArgs>;
            fields: Prisma.CommunityRoleEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityRoleEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityRoleEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityRoleEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityRoleEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                findMany: {
                    args: Prisma.CommunityRoleEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>[];
                };
                create: {
                    args: Prisma.CommunityRoleEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                createMany: {
                    args: Prisma.CommunityRoleEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityRoleEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>[];
                };
                delete: {
                    args: Prisma.CommunityRoleEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                update: {
                    args: Prisma.CommunityRoleEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityRoleEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityRoleEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityRoleEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityRoleEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleEventPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityRoleEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityRoleEvent>;
                };
                groupBy: {
                    args: Prisma.CommunityRoleEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityRoleEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleEventCountAggregateOutputType> | number;
                };
            };
        };
        ConfirmedInteraction: {
            payload: Prisma.$ConfirmedInteractionPayload<ExtArgs>;
            fields: Prisma.ConfirmedInteractionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConfirmedInteractionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConfirmedInteractionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                findFirst: {
                    args: Prisma.ConfirmedInteractionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConfirmedInteractionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                findMany: {
                    args: Prisma.ConfirmedInteractionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>[];
                };
                create: {
                    args: Prisma.ConfirmedInteractionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                createMany: {
                    args: Prisma.ConfirmedInteractionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConfirmedInteractionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>[];
                };
                delete: {
                    args: Prisma.ConfirmedInteractionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                update: {
                    args: Prisma.ConfirmedInteractionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                deleteMany: {
                    args: Prisma.ConfirmedInteractionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConfirmedInteractionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConfirmedInteractionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>[];
                };
                upsert: {
                    args: Prisma.ConfirmedInteractionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedInteractionPayload>;
                };
                aggregate: {
                    args: Prisma.ConfirmedInteractionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConfirmedInteraction>;
                };
                groupBy: {
                    args: Prisma.ConfirmedInteractionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfirmedInteractionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConfirmedInteractionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfirmedInteractionCountAggregateOutputType> | number;
                };
            };
        };
        ProfileReview: {
            payload: Prisma.$ProfileReviewPayload<ExtArgs>;
            fields: Prisma.ProfileReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProfileReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProfileReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ProfileReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProfileReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                findMany: {
                    args: Prisma.ProfileReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>[];
                };
                create: {
                    args: Prisma.ProfileReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                createMany: {
                    args: Prisma.ProfileReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProfileReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>[];
                };
                delete: {
                    args: Prisma.ProfileReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                update: {
                    args: Prisma.ProfileReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ProfileReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProfileReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProfileReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ProfileReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfileReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ProfileReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProfileReview>;
                };
                groupBy: {
                    args: Prisma.ProfileReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProfileReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProfileReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProfileReviewCountAggregateOutputType> | number;
                };
            };
        };
        CommunityReport: {
            payload: Prisma.$CommunityReportPayload<ExtArgs>;
            fields: Prisma.CommunityReportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityReportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityReportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityReportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityReportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                findMany: {
                    args: Prisma.CommunityReportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>[];
                };
                create: {
                    args: Prisma.CommunityReportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                createMany: {
                    args: Prisma.CommunityReportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityReportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>[];
                };
                delete: {
                    args: Prisma.CommunityReportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                update: {
                    args: Prisma.CommunityReportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityReportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityReportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityReportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityReportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityReportPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityReportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityReport>;
                };
                groupBy: {
                    args: Prisma.CommunityReportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityReportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityReportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityReportCountAggregateOutputType> | number;
                };
            };
        };
        CommunityContentAction: {
            payload: Prisma.$CommunityContentActionPayload<ExtArgs>;
            fields: Prisma.CommunityContentActionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityContentActionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityContentActionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityContentActionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityContentActionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                findMany: {
                    args: Prisma.CommunityContentActionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>[];
                };
                create: {
                    args: Prisma.CommunityContentActionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                createMany: {
                    args: Prisma.CommunityContentActionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityContentActionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>[];
                };
                delete: {
                    args: Prisma.CommunityContentActionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                update: {
                    args: Prisma.CommunityContentActionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityContentActionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityContentActionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityContentActionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityContentActionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityContentActionPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityContentActionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityContentAction>;
                };
                groupBy: {
                    args: Prisma.CommunityContentActionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityContentActionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityContentActionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityContentActionCountAggregateOutputType> | number;
                };
            };
        };
        CommunityStructureProposal: {
            payload: Prisma.$CommunityStructureProposalPayload<ExtArgs>;
            fields: Prisma.CommunityStructureProposalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityStructureProposalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityStructureProposalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityStructureProposalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityStructureProposalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                findMany: {
                    args: Prisma.CommunityStructureProposalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>[];
                };
                create: {
                    args: Prisma.CommunityStructureProposalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                createMany: {
                    args: Prisma.CommunityStructureProposalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityStructureProposalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>[];
                };
                delete: {
                    args: Prisma.CommunityStructureProposalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                update: {
                    args: Prisma.CommunityStructureProposalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityStructureProposalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityStructureProposalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityStructureProposalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityStructureProposalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityStructureProposalPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityStructureProposalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityStructureProposal>;
                };
                groupBy: {
                    args: Prisma.CommunityStructureProposalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityStructureProposalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityStructureProposalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityStructureProposalCountAggregateOutputType> | number;
                };
            };
        };
        CommunityRoleInvite: {
            payload: Prisma.$CommunityRoleInvitePayload<ExtArgs>;
            fields: Prisma.CommunityRoleInviteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityRoleInviteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityRoleInviteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                findFirst: {
                    args: Prisma.CommunityRoleInviteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityRoleInviteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                findMany: {
                    args: Prisma.CommunityRoleInviteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>[];
                };
                create: {
                    args: Prisma.CommunityRoleInviteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                createMany: {
                    args: Prisma.CommunityRoleInviteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityRoleInviteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>[];
                };
                delete: {
                    args: Prisma.CommunityRoleInviteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                update: {
                    args: Prisma.CommunityRoleInviteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityRoleInviteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityRoleInviteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityRoleInviteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>[];
                };
                upsert: {
                    args: Prisma.CommunityRoleInviteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityRoleInvitePayload>;
                };
                aggregate: {
                    args: Prisma.CommunityRoleInviteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityRoleInvite>;
                };
                groupBy: {
                    args: Prisma.CommunityRoleInviteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleInviteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityRoleInviteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityRoleInviteCountAggregateOutputType> | number;
                };
            };
        };
        CommunityEvent: {
            payload: Prisma.$CommunityEventPayload<ExtArgs>;
            fields: Prisma.CommunityEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                findFirst: {
                    args: Prisma.CommunityEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                findMany: {
                    args: Prisma.CommunityEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>[];
                };
                create: {
                    args: Prisma.CommunityEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                createMany: {
                    args: Prisma.CommunityEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>[];
                };
                delete: {
                    args: Prisma.CommunityEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                update: {
                    args: Prisma.CommunityEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>[];
                };
                upsert: {
                    args: Prisma.CommunityEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventPayload>;
                };
                aggregate: {
                    args: Prisma.CommunityEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityEvent>;
                };
                groupBy: {
                    args: Prisma.CommunityEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityEventCountAggregateOutputType> | number;
                };
            };
        };
        CommunityEventAttendance: {
            payload: Prisma.$CommunityEventAttendancePayload<ExtArgs>;
            fields: Prisma.CommunityEventAttendanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommunityEventAttendanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommunityEventAttendanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                findFirst: {
                    args: Prisma.CommunityEventAttendanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommunityEventAttendanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                findMany: {
                    args: Prisma.CommunityEventAttendanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>[];
                };
                create: {
                    args: Prisma.CommunityEventAttendanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                createMany: {
                    args: Prisma.CommunityEventAttendanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommunityEventAttendanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>[];
                };
                delete: {
                    args: Prisma.CommunityEventAttendanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                update: {
                    args: Prisma.CommunityEventAttendanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                deleteMany: {
                    args: Prisma.CommunityEventAttendanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommunityEventAttendanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommunityEventAttendanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>[];
                };
                upsert: {
                    args: Prisma.CommunityEventAttendanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommunityEventAttendancePayload>;
                };
                aggregate: {
                    args: Prisma.CommunityEventAttendanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommunityEventAttendance>;
                };
                groupBy: {
                    args: Prisma.CommunityEventAttendanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityEventAttendanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommunityEventAttendanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommunityEventAttendanceCountAggregateOutputType> | number;
                };
            };
        };
        PortfolioItem: {
            payload: Prisma.$PortfolioItemPayload<ExtArgs>;
            fields: Prisma.PortfolioItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PortfolioItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PortfolioItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                findFirst: {
                    args: Prisma.PortfolioItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PortfolioItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                findMany: {
                    args: Prisma.PortfolioItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>[];
                };
                create: {
                    args: Prisma.PortfolioItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                createMany: {
                    args: Prisma.PortfolioItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PortfolioItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>[];
                };
                delete: {
                    args: Prisma.PortfolioItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                update: {
                    args: Prisma.PortfolioItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PortfolioItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PortfolioItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PortfolioItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>[];
                };
                upsert: {
                    args: Prisma.PortfolioItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PortfolioItemPayload>;
                };
                aggregate: {
                    args: Prisma.PortfolioItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePortfolioItem>;
                };
                groupBy: {
                    args: Prisma.PortfolioItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PortfolioItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PortfolioItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PortfolioItemCountAggregateOutputType> | number;
                };
            };
        };
        PlatformSetting: {
            payload: Prisma.$PlatformSettingPayload<ExtArgs>;
            fields: Prisma.PlatformSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                findFirst: {
                    args: Prisma.PlatformSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                findMany: {
                    args: Prisma.PlatformSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                create: {
                    args: Prisma.PlatformSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                createMany: {
                    args: Prisma.PlatformSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlatformSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                delete: {
                    args: Prisma.PlatformSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                update: {
                    args: Prisma.PlatformSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlatformSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                upsert: {
                    args: Prisma.PlatformSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                aggregate: {
                    args: Prisma.PlatformSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformSetting>;
                };
                groupBy: {
                    args: Prisma.PlatformSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformSettingCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly forrumId: "forrumId";
    readonly email: "email";
    readonly username: "username";
    readonly displayName: "displayName";
    readonly bio: "bio";
    readonly avatarUrl: "avatarUrl";
    readonly coverUrl: "coverUrl";
    readonly wallPrivacy: "wallPrivacy";
    readonly website: "website";
    readonly location: "location";
    readonly passwordHash: "passwordHash";
    readonly state: "state";
    readonly role: "role";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly onboardingCompletedAt: "onboardingCompletedAt";
    readonly lastSeenAt: "lastSeenAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const EmailVerificationTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type EmailVerificationTokenScalarFieldEnum = (typeof EmailVerificationTokenScalarFieldEnum)[keyof typeof EmailVerificationTokenScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly userAgent: "userAgent";
    readonly ipAddress: "ipAddress";
    readonly lastSeenAt: "lastSeenAt";
    readonly revokedAt: "revokedAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const NotificationPreferenceScalarFieldEnum: {
    readonly userId: "userId";
    readonly publicationReplies: "publicationReplies";
    readonly commentReplies: "commentReplies";
    readonly reactions: "reactions";
    readonly follows: "follows";
    readonly wallPosts: "wallPosts";
    readonly messages: "messages";
    readonly system: "system";
    readonly emailDigest: "emailDigest";
    readonly telegramEnabled: "telegramEnabled";
};
export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum];
export declare const FeedPreferenceScalarFieldEnum: {
    readonly userId: "userId";
    readonly recommendationsEnabled: "recommendationsEnabled";
    readonly showReasons: "showReasons";
    readonly updatedAt: "updatedAt";
};
export type FeedPreferenceScalarFieldEnum = (typeof FeedPreferenceScalarFieldEnum)[keyof typeof FeedPreferenceScalarFieldEnum];
export declare const HiddenCommunityScalarFieldEnum: {
    readonly userId: "userId";
    readonly communityId: "communityId";
    readonly createdAt: "createdAt";
};
export type HiddenCommunityScalarFieldEnum = (typeof HiddenCommunityScalarFieldEnum)[keyof typeof HiddenCommunityScalarFieldEnum];
export declare const HiddenPublicationScalarFieldEnum: {
    readonly userId: "userId";
    readonly publicationId: "publicationId";
    readonly createdAt: "createdAt";
};
export type HiddenPublicationScalarFieldEnum = (typeof HiddenPublicationScalarFieldEnum)[keyof typeof HiddenPublicationScalarFieldEnum];
export declare const CommunityScalarFieldEnum: {
    readonly id: "id";
    readonly parentId: "parentId";
    readonly slug: "slug";
    readonly name: "name";
    readonly description: "description";
    readonly shortDescription: "shortDescription";
    readonly avatarUrl: "avatarUrl";
    readonly coverUrl: "coverUrl";
    readonly accentColor: "accentColor";
    readonly status: "status";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityScalarFieldEnum = (typeof CommunityScalarFieldEnum)[keyof typeof CommunityScalarFieldEnum];
export declare const CommunityRoleScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly communityId: "communityId";
    readonly role: "role";
    readonly grantedById: "grantedById";
    readonly note: "note";
    readonly endedAt: "endedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityRoleScalarFieldEnum = (typeof CommunityRoleScalarFieldEnum)[keyof typeof CommunityRoleScalarFieldEnum];
export declare const CommunitySubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly communityId: "communityId";
    readonly notifyLevel: "notifyLevel";
    readonly createdAt: "createdAt";
};
export type CommunitySubscriptionScalarFieldEnum = (typeof CommunitySubscriptionScalarFieldEnum)[keyof typeof CommunitySubscriptionScalarFieldEnum];
export declare const PublicationScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly format: "format";
    readonly type: "type";
    readonly status: "status";
    readonly title: "title";
    readonly body: "body";
    readonly authorId: "authorId";
    readonly communityId: "communityId";
    readonly viewCount: "viewCount";
    readonly lastActivityAt: "lastActivityAt";
    readonly pinnedUntil: "pinnedUntil";
    readonly isOfficial: "isOfficial";
    readonly isSolved: "isSolved";
    readonly closedAt: "closedAt";
    readonly closedReason: "closedReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PublicationScalarFieldEnum = (typeof PublicationScalarFieldEnum)[keyof typeof PublicationScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly body: "body";
    readonly publicationId: "publicationId";
    readonly authorId: "authorId";
    readonly parentId: "parentId";
    readonly hiddenAt: "hiddenAt";
    readonly hiddenReason: "hiddenReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly label: "label";
    readonly backgroundColor: "backgroundColor";
    readonly textColor: "textColor";
    readonly borderColor: "borderColor";
    readonly styleEnabled: "styleEnabled";
    readonly createdAt: "createdAt";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const PublicationTagScalarFieldEnum: {
    readonly publicationId: "publicationId";
    readonly tagId: "tagId";
};
export type PublicationTagScalarFieldEnum = (typeof PublicationTagScalarFieldEnum)[keyof typeof PublicationTagScalarFieldEnum];
export declare const TagSubscriptionScalarFieldEnum: {
    readonly userId: "userId";
    readonly tagId: "tagId";
    readonly createdAt: "createdAt";
};
export type TagSubscriptionScalarFieldEnum = (typeof TagSubscriptionScalarFieldEnum)[keyof typeof TagSubscriptionScalarFieldEnum];
export declare const PublicationReactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly publicationId: "publicationId";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type PublicationReactionScalarFieldEnum = (typeof PublicationReactionScalarFieldEnum)[keyof typeof PublicationReactionScalarFieldEnum];
export declare const CommentReactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly commentId: "commentId";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type CommentReactionScalarFieldEnum = (typeof CommentReactionScalarFieldEnum)[keyof typeof CommentReactionScalarFieldEnum];
export declare const BookmarkScalarFieldEnum: {
    readonly userId: "userId";
    readonly publicationId: "publicationId";
    readonly createdAt: "createdAt";
};
export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum];
export declare const UserFollowScalarFieldEnum: {
    readonly followerId: "followerId";
    readonly followingId: "followingId";
    readonly createdAt: "createdAt";
};
export type UserFollowScalarFieldEnum = (typeof UserFollowScalarFieldEnum)[keyof typeof UserFollowScalarFieldEnum];
export declare const WallPostScalarFieldEnum: {
    readonly id: "id";
    readonly profileUserId: "profileUserId";
    readonly authorId: "authorId";
    readonly body: "body";
    readonly hiddenAt: "hiddenAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WallPostScalarFieldEnum = (typeof WallPostScalarFieldEnum)[keyof typeof WallPostScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly actorId: "actorId";
    readonly publicationId: "publicationId";
    readonly commentId: "commentId";
    readonly conversationId: "conversationId";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly href: "href";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const ConversationMemberScalarFieldEnum: {
    readonly conversationId: "conversationId";
    readonly userId: "userId";
    readonly joinedAt: "joinedAt";
    readonly lastReadAt: "lastReadAt";
};
export type ConversationMemberScalarFieldEnum = (typeof ConversationMemberScalarFieldEnum)[keyof typeof ConversationMemberScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly authorId: "authorId";
    readonly body: "body";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const ReportScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly publicationId: "publicationId";
    readonly commentId: "commentId";
    readonly reason: "reason";
    readonly details: "details";
    readonly status: "status";
    readonly resolutionNote: "resolutionNote";
    readonly resolvedAt: "resolvedAt";
    readonly createdAt: "createdAt";
};
export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const WalletScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly balance: "balance";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum];
export declare const WalletTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly walletId: "walletId";
    readonly type: "type";
    readonly status: "status";
    readonly amount: "amount";
    readonly description: "description";
    readonly externalRef: "externalRef";
    readonly createdAt: "createdAt";
};
export type WalletTransactionScalarFieldEnum = (typeof WalletTransactionScalarFieldEnum)[keyof typeof WalletTransactionScalarFieldEnum];
export declare const PromotionOrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly publicationId: "publicationId";
    readonly communityId: "communityId";
    readonly type: "type";
    readonly status: "status";
    readonly price: "price";
    readonly startsAt: "startsAt";
    readonly endsAt: "endsAt";
    readonly cancelledAt: "cancelledAt";
    readonly cancellationReason: "cancellationReason";
    readonly createdAt: "createdAt";
};
export type PromotionOrderScalarFieldEnum = (typeof PromotionOrderScalarFieldEnum)[keyof typeof PromotionOrderScalarFieldEnum];
export declare const MediaAssetScalarFieldEnum: {
    readonly id: "id";
    readonly ownerId: "ownerId";
    readonly kind: "kind";
    readonly mimeType: "mimeType";
    readonly originalName: "originalName";
    readonly storageKey: "storageKey";
    readonly thumbnailStorageKey: "thumbnailStorageKey";
    readonly sizeBytes: "sizeBytes";
    readonly width: "width";
    readonly height: "height";
    readonly createdAt: "createdAt";
};
export type MediaAssetScalarFieldEnum = (typeof MediaAssetScalarFieldEnum)[keyof typeof MediaAssetScalarFieldEnum];
export declare const TelegramLinkScalarFieldEnum: {
    readonly userId: "userId";
    readonly telegramUserId: "telegramUserId";
    readonly chatId: "chatId";
    readonly telegramUsername: "telegramUsername";
    readonly enabled: "enabled";
    readonly linkedAt: "linkedAt";
    readonly lastDeliveryAt: "lastDeliveryAt";
};
export type TelegramLinkScalarFieldEnum = (typeof TelegramLinkScalarFieldEnum)[keyof typeof TelegramLinkScalarFieldEnum];
export declare const TelegramLinkCodeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly codeHash: "codeHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type TelegramLinkCodeScalarFieldEnum = (typeof TelegramLinkCodeScalarFieldEnum)[keyof typeof TelegramLinkCodeScalarFieldEnum];
export declare const TelegramChannelScalarFieldEnum: {
    readonly id: "id";
    readonly ownerUserId: "ownerUserId";
    readonly chatId: "chatId";
    readonly title: "title";
    readonly username: "username";
    readonly enabled: "enabled";
    readonly canPost: "canPost";
    readonly linkedAt: "linkedAt";
    readonly lastCheckedAt: "lastCheckedAt";
    readonly updatedAt: "updatedAt";
};
export type TelegramChannelScalarFieldEnum = (typeof TelegramChannelScalarFieldEnum)[keyof typeof TelegramChannelScalarFieldEnum];
export declare const TelegramShareScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly channelId: "channelId";
    readonly publicationId: "publicationId";
    readonly includeImage: "includeImage";
    readonly telegramMessageId: "telegramMessageId";
    readonly createdAt: "createdAt";
};
export type TelegramShareScalarFieldEnum = (typeof TelegramShareScalarFieldEnum)[keyof typeof TelegramShareScalarFieldEnum];
export declare const ModerationActionScalarFieldEnum: {
    readonly id: "id";
    readonly subjectUserId: "subjectUserId";
    readonly actorId: "actorId";
    readonly targetType: "targetType";
    readonly actionType: "actionType";
    readonly publicationId: "publicationId";
    readonly commentId: "commentId";
    readonly reason: "reason";
    readonly expiresAt: "expiresAt";
    readonly reversedAt: "reversedAt";
    readonly createdAt: "createdAt";
};
export type ModerationActionScalarFieldEnum = (typeof ModerationActionScalarFieldEnum)[keyof typeof ModerationActionScalarFieldEnum];
export declare const ModerationAppealScalarFieldEnum: {
    readonly id: "id";
    readonly actionId: "actionId";
    readonly userId: "userId";
    readonly body: "body";
    readonly status: "status";
    readonly resolutionNote: "resolutionNote";
    readonly resolvedById: "resolvedById";
    readonly resolvedAt: "resolvedAt";
    readonly createdAt: "createdAt";
};
export type ModerationAppealScalarFieldEnum = (typeof ModerationAppealScalarFieldEnum)[keyof typeof ModerationAppealScalarFieldEnum];
export declare const CommunityProposalScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly suggestedParentId: "suggestedParentId";
    readonly name: "name";
    readonly description: "description";
    readonly initialTopics: "initialTopics";
    readonly status: "status";
    readonly resolutionNote: "resolutionNote";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityProposalScalarFieldEnum = (typeof CommunityProposalScalarFieldEnum)[keyof typeof CommunityProposalScalarFieldEnum];
export declare const ProposalSupportScalarFieldEnum: {
    readonly proposalId: "proposalId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type ProposalSupportScalarFieldEnum = (typeof ProposalSupportScalarFieldEnum)[keyof typeof ProposalSupportScalarFieldEnum];
export declare const CommunityPollScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly createdById: "createdById";
    readonly title: "title";
    readonly description: "description";
    readonly kind: "kind";
    readonly status: "status";
    readonly quorum: "quorum";
    readonly minAccountAgeDays: "minAccountAgeDays";
    readonly requireSubscription: "requireSubscription";
    readonly allowAdvisory: "allowAdvisory";
    readonly resultNote: "resultNote";
    readonly resultPublishedAt: "resultPublishedAt";
    readonly closesAt: "closesAt";
    readonly createdAt: "createdAt";
};
export type CommunityPollScalarFieldEnum = (typeof CommunityPollScalarFieldEnum)[keyof typeof CommunityPollScalarFieldEnum];
export declare const PollOptionScalarFieldEnum: {
    readonly id: "id";
    readonly pollId: "pollId";
    readonly label: "label";
    readonly position: "position";
};
export type PollOptionScalarFieldEnum = (typeof PollOptionScalarFieldEnum)[keyof typeof PollOptionScalarFieldEnum];
export declare const PollVoteScalarFieldEnum: {
    readonly id: "id";
    readonly pollId: "pollId";
    readonly optionId: "optionId";
    readonly userId: "userId";
    readonly voteClass: "voteClass";
    readonly createdAt: "createdAt";
};
export type PollVoteScalarFieldEnum = (typeof PollVoteScalarFieldEnum)[keyof typeof PollVoteScalarFieldEnum];
export declare const WorkshopItemScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly reviewedById: "reviewedById";
    readonly previewMediaId: "previewMediaId";
    readonly type: "type";
    readonly status: "status";
    readonly title: "title";
    readonly description: "description";
    readonly resolutionNote: "resolutionNote";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkshopItemScalarFieldEnum = (typeof WorkshopItemScalarFieldEnum)[keyof typeof WorkshopItemScalarFieldEnum];
export declare const WorkshopLikeScalarFieldEnum: {
    readonly itemId: "itemId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type WorkshopLikeScalarFieldEnum = (typeof WorkshopLikeScalarFieldEnum)[keyof typeof WorkshopLikeScalarFieldEnum];
export declare const AchievementDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly title: "title";
    readonly description: "description";
    readonly icon: "icon";
    readonly category: "category";
    readonly automatic: "automatic";
    readonly active: "active";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AchievementDefinitionScalarFieldEnum = (typeof AchievementDefinitionScalarFieldEnum)[keyof typeof AchievementDefinitionScalarFieldEnum];
export declare const UserAchievementScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly achievementId: "achievementId";
    readonly communityId: "communityId";
    readonly scopeKey: "scopeKey";
    readonly sourceType: "sourceType";
    readonly sourceId: "sourceId";
    readonly metadata: "metadata";
    readonly earnedAt: "earnedAt";
};
export type UserAchievementScalarFieldEnum = (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum];
export declare const CommunityRoleEventScalarFieldEnum: {
    readonly id: "id";
    readonly roleId: "roleId";
    readonly userId: "userId";
    readonly actorId: "actorId";
    readonly type: "type";
    readonly note: "note";
    readonly createdAt: "createdAt";
};
export type CommunityRoleEventScalarFieldEnum = (typeof CommunityRoleEventScalarFieldEnum)[keyof typeof CommunityRoleEventScalarFieldEnum];
export declare const ConfirmedInteractionScalarFieldEnum: {
    readonly id: "id";
    readonly createdById: "createdById";
    readonly counterpartId: "counterpartId";
    readonly communityId: "communityId";
    readonly publicationId: "publicationId";
    readonly portfolioItemId: "portfolioItemId";
    readonly type: "type";
    readonly status: "status";
    readonly title: "title";
    readonly description: "description";
    readonly creatorConfirmedAt: "creatorConfirmedAt";
    readonly counterpartConfirmedAt: "counterpartConfirmedAt";
    readonly creatorCompletedAt: "creatorCompletedAt";
    readonly counterpartCompletedAt: "counterpartCompletedAt";
    readonly completedAt: "completedAt";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConfirmedInteractionScalarFieldEnum = (typeof ConfirmedInteractionScalarFieldEnum)[keyof typeof ConfirmedInteractionScalarFieldEnum];
export declare const ProfileReviewScalarFieldEnum: {
    readonly id: "id";
    readonly interactionId: "interactionId";
    readonly authorId: "authorId";
    readonly targetId: "targetId";
    readonly evidenceMediaId: "evidenceMediaId";
    readonly verdict: "verdict";
    readonly body: "body";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProfileReviewScalarFieldEnum = (typeof ProfileReviewScalarFieldEnum)[keyof typeof ProfileReviewScalarFieldEnum];
export declare const CommunityReportScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly authorId: "authorId";
    readonly publicationId: "publicationId";
    readonly periodStart: "periodStart";
    readonly periodEnd: "periodEnd";
    readonly summary: "summary";
    readonly achievements: "achievements";
    readonly problems: "problems";
    readonly plans: "plans";
    readonly treasuryNote: "treasuryNote";
    readonly createdAt: "createdAt";
};
export type CommunityReportScalarFieldEnum = (typeof CommunityReportScalarFieldEnum)[keyof typeof CommunityReportScalarFieldEnum];
export declare const CommunityContentActionScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly publicationId: "publicationId";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly note: "note";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type CommunityContentActionScalarFieldEnum = (typeof CommunityContentActionScalarFieldEnum)[keyof typeof CommunityContentActionScalarFieldEnum];
export declare const CommunityStructureProposalScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly targetCommunityId: "targetCommunityId";
    readonly createdById: "createdById";
    readonly resolvedById: "resolvedById";
    readonly type: "type";
    readonly status: "status";
    readonly title: "title";
    readonly description: "description";
    readonly proposedName: "proposedName";
    readonly resolutionNote: "resolutionNote";
    readonly resolvedAt: "resolvedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityStructureProposalScalarFieldEnum = (typeof CommunityStructureProposalScalarFieldEnum)[keyof typeof CommunityStructureProposalScalarFieldEnum];
export declare const CommunityRoleInviteScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly invitedUserId: "invitedUserId";
    readonly invitedById: "invitedById";
    readonly role: "role";
    readonly status: "status";
    readonly note: "note";
    readonly expiresAt: "expiresAt";
    readonly respondedAt: "respondedAt";
    readonly createdAt: "createdAt";
};
export type CommunityRoleInviteScalarFieldEnum = (typeof CommunityRoleInviteScalarFieldEnum)[keyof typeof CommunityRoleInviteScalarFieldEnum];
export declare const CommunityEventScalarFieldEnum: {
    readonly id: "id";
    readonly communityId: "communityId";
    readonly createdById: "createdById";
    readonly title: "title";
    readonly description: "description";
    readonly format: "format";
    readonly status: "status";
    readonly startsAt: "startsAt";
    readonly endsAt: "endsAt";
    readonly location: "location";
    readonly capacity: "capacity";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityEventScalarFieldEnum = (typeof CommunityEventScalarFieldEnum)[keyof typeof CommunityEventScalarFieldEnum];
export declare const CommunityEventAttendanceScalarFieldEnum: {
    readonly eventId: "eventId";
    readonly userId: "userId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommunityEventAttendanceScalarFieldEnum = (typeof CommunityEventAttendanceScalarFieldEnum)[keyof typeof CommunityEventAttendanceScalarFieldEnum];
export declare const PortfolioItemScalarFieldEnum: {
    readonly id: "id";
    readonly ownerId: "ownerId";
    readonly communityId: "communityId";
    readonly publicationId: "publicationId";
    readonly kind: "kind";
    readonly status: "status";
    readonly title: "title";
    readonly summary: "summary";
    readonly description: "description";
    readonly coverUrl: "coverUrl";
    readonly lookingForTeam: "lookingForTeam";
    readonly priceText: "priceText";
    readonly contactNote: "contactNote";
    readonly links: "links";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PortfolioItemScalarFieldEnum = (typeof PortfolioItemScalarFieldEnum)[keyof typeof PortfolioItemScalarFieldEnum];
export declare const PlatformSettingScalarFieldEnum: {
    readonly key: "key";
    readonly value: "value";
    readonly updatedAt: "updatedAt";
};
export type PlatformSettingScalarFieldEnum = (typeof PlatformSettingScalarFieldEnum)[keyof typeof PlatformSettingScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumWallPrivacyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WallPrivacy'>;
export type ListEnumWallPrivacyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WallPrivacy[]'>;
export type EnumAccountStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountState'>;
export type ListEnumAccountStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountState[]'>;
export type EnumGlobalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GlobalRole'>;
export type ListEnumGlobalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GlobalRole[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumCommunityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStatus'>;
export type ListEnumCommunityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStatus[]'>;
export type EnumCommunityRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityRoleType'>;
export type ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityRoleType[]'>;
export type EnumNotifyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotifyLevel'>;
export type ListEnumNotifyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotifyLevel[]'>;
export type EnumPublicationFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationFormat'>;
export type ListEnumPublicationFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationFormat[]'>;
export type EnumPublicationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationType'>;
export type ListEnumPublicationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationType[]'>;
export type EnumPublicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationStatus'>;
export type ListEnumPublicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationStatus[]'>;
export type EnumReactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReactionType'>;
export type ListEnumReactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReactionType[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>;
export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumWalletTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionType'>;
export type ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionType[]'>;
export type EnumWalletTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionStatus'>;
export type ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTransactionStatus[]'>;
export type EnumPromotionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionType'>;
export type ListEnumPromotionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionType[]'>;
export type EnumPromotionOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionOrderStatus'>;
export type ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionOrderStatus[]'>;
export type EnumMediaKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaKind'>;
export type ListEnumMediaKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaKind[]'>;
export type EnumModerationTargetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationTargetType'>;
export type ListEnumModerationTargetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationTargetType[]'>;
export type EnumModerationActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationActionType'>;
export type ListEnumModerationActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationActionType[]'>;
export type EnumAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppealStatus'>;
export type ListEnumAppealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppealStatus[]'>;
export type EnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus'>;
export type ListEnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus[]'>;
export type EnumPollKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PollKind'>;
export type ListEnumPollKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PollKind[]'>;
export type EnumPollStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PollStatus'>;
export type ListEnumPollStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PollStatus[]'>;
export type EnumVoteClassFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoteClass'>;
export type ListEnumVoteClassFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoteClass[]'>;
export type EnumWorkshopItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkshopItemType'>;
export type ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkshopItemType[]'>;
export type EnumWorkshopItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkshopItemStatus'>;
export type ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkshopItemStatus[]'>;
export type EnumAchievementCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementCategory'>;
export type ListEnumAchievementCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementCategory[]'>;
export type EnumRoleEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleEventType'>;
export type ListEnumRoleEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleEventType[]'>;
export type EnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType'>;
export type ListEnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType[]'>;
export type EnumInteractionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionStatus'>;
export type ListEnumInteractionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionStatus[]'>;
export type EnumReviewVerdictFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewVerdict'>;
export type ListEnumReviewVerdictFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewVerdict[]'>;
export type EnumCommunityContentActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityContentActionType'>;
export type ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityContentActionType[]'>;
export type EnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStructureChangeType'>;
export type ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStructureChangeType[]'>;
export type EnumCommunityStructureStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStructureStatus'>;
export type ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityStructureStatus[]'>;
export type EnumTeamInviteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamInviteStatus'>;
export type ListEnumTeamInviteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamInviteStatus[]'>;
export type EnumCommunityEventFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityEventFormat'>;
export type ListEnumCommunityEventFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityEventFormat[]'>;
export type EnumCommunityEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityEventStatus'>;
export type ListEnumCommunityEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunityEventStatus[]'>;
export type EnumEventAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventAttendanceStatus'>;
export type ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventAttendanceStatus[]'>;
export type EnumPortfolioItemKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortfolioItemKind'>;
export type ListEnumPortfolioItemKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortfolioItemKind[]'>;
export type EnumPortfolioItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortfolioItemStatus'>;
export type ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortfolioItemStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    emailVerificationToken?: Prisma.EmailVerificationTokenOmit;
    passwordResetToken?: Prisma.PasswordResetTokenOmit;
    session?: Prisma.SessionOmit;
    notificationPreference?: Prisma.NotificationPreferenceOmit;
    feedPreference?: Prisma.FeedPreferenceOmit;
    hiddenCommunity?: Prisma.HiddenCommunityOmit;
    hiddenPublication?: Prisma.HiddenPublicationOmit;
    community?: Prisma.CommunityOmit;
    communityRole?: Prisma.CommunityRoleOmit;
    communitySubscription?: Prisma.CommunitySubscriptionOmit;
    publication?: Prisma.PublicationOmit;
    comment?: Prisma.CommentOmit;
    tag?: Prisma.TagOmit;
    publicationTag?: Prisma.PublicationTagOmit;
    tagSubscription?: Prisma.TagSubscriptionOmit;
    publicationReaction?: Prisma.PublicationReactionOmit;
    commentReaction?: Prisma.CommentReactionOmit;
    bookmark?: Prisma.BookmarkOmit;
    userFollow?: Prisma.UserFollowOmit;
    wallPost?: Prisma.WallPostOmit;
    notification?: Prisma.NotificationOmit;
    conversation?: Prisma.ConversationOmit;
    conversationMember?: Prisma.ConversationMemberOmit;
    message?: Prisma.MessageOmit;
    report?: Prisma.ReportOmit;
    auditLog?: Prisma.AuditLogOmit;
    wallet?: Prisma.WalletOmit;
    walletTransaction?: Prisma.WalletTransactionOmit;
    promotionOrder?: Prisma.PromotionOrderOmit;
    mediaAsset?: Prisma.MediaAssetOmit;
    telegramLink?: Prisma.TelegramLinkOmit;
    telegramLinkCode?: Prisma.TelegramLinkCodeOmit;
    telegramChannel?: Prisma.TelegramChannelOmit;
    telegramShare?: Prisma.TelegramShareOmit;
    moderationAction?: Prisma.ModerationActionOmit;
    moderationAppeal?: Prisma.ModerationAppealOmit;
    communityProposal?: Prisma.CommunityProposalOmit;
    proposalSupport?: Prisma.ProposalSupportOmit;
    communityPoll?: Prisma.CommunityPollOmit;
    pollOption?: Prisma.PollOptionOmit;
    pollVote?: Prisma.PollVoteOmit;
    workshopItem?: Prisma.WorkshopItemOmit;
    workshopLike?: Prisma.WorkshopLikeOmit;
    achievementDefinition?: Prisma.AchievementDefinitionOmit;
    userAchievement?: Prisma.UserAchievementOmit;
    communityRoleEvent?: Prisma.CommunityRoleEventOmit;
    confirmedInteraction?: Prisma.ConfirmedInteractionOmit;
    profileReview?: Prisma.ProfileReviewOmit;
    communityReport?: Prisma.CommunityReportOmit;
    communityContentAction?: Prisma.CommunityContentActionOmit;
    communityStructureProposal?: Prisma.CommunityStructureProposalOmit;
    communityRoleInvite?: Prisma.CommunityRoleInviteOmit;
    communityEvent?: Prisma.CommunityEventOmit;
    communityEventAttendance?: Prisma.CommunityEventAttendanceOmit;
    portfolioItem?: Prisma.PortfolioItemOmit;
    platformSetting?: Prisma.PlatformSettingOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
