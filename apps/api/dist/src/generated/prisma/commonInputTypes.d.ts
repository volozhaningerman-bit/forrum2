import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type UuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type EnumWallPrivacyFilter<$PrismaModel = never> = {
    equals?: $Enums.WallPrivacy | Prisma.EnumWallPrivacyFieldRefInput<$PrismaModel>;
    in?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel> | $Enums.WallPrivacy;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type EnumAccountStateFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountState | Prisma.EnumAccountStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountStateFilter<$PrismaModel> | $Enums.AccountState;
};
export type EnumGlobalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | Prisma.EnumGlobalRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel> | $Enums.GlobalRole;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumWallPrivacyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WallPrivacy | Prisma.EnumWallPrivacyFieldRefInput<$PrismaModel>;
    in?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWallPrivacyWithAggregatesFilter<$PrismaModel> | $Enums.WallPrivacy;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumAccountStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountState | Prisma.EnumAccountStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountStateWithAggregatesFilter<$PrismaModel> | $Enums.AccountState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccountStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccountStateFilter<$PrismaModel>;
};
export type EnumGlobalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | Prisma.EnumGlobalRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel> | $Enums.GlobalRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type EnumCommunityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStatus | Prisma.EnumCommunityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel> | $Enums.CommunityStatus;
};
export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumCommunityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStatus | Prisma.EnumCommunityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel>;
};
export type EnumCommunityRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityRoleType | Prisma.EnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel> | $Enums.CommunityRoleType;
};
export type EnumCommunityRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityRoleType | Prisma.EnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityRoleTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityRoleType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel>;
};
export type EnumNotifyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotifyLevel | Prisma.EnumNotifyLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel> | $Enums.NotifyLevel;
};
export type EnumNotifyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotifyLevel | Prisma.EnumNotifyLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotifyLevelWithAggregatesFilter<$PrismaModel> | $Enums.NotifyLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel>;
};
export type EnumPublicationFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationFormat | Prisma.EnumPublicationFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel> | $Enums.PublicationFormat;
};
export type EnumPublicationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | Prisma.EnumPublicationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel> | $Enums.PublicationType;
};
export type EnumPublicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | Prisma.EnumPublicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel> | $Enums.PublicationStatus;
};
export type EnumPublicationFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationFormat | Prisma.EnumPublicationFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationFormatWithAggregatesFilter<$PrismaModel> | $Enums.PublicationFormat;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel>;
};
export type EnumPublicationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | Prisma.EnumPublicationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel> | $Enums.PublicationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel>;
};
export type EnumPublicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | Prisma.EnumPublicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PublicationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel>;
};
export type EnumReactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel> | $Enums.ReactionType;
};
export type EnumReactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type EnumWalletTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel> | $Enums.WalletTransactionType;
};
export type EnumWalletTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
};
export type EnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
};
export type EnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
};
export type EnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType;
};
export type EnumPromotionOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionOrderStatus | Prisma.EnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel> | $Enums.PromotionOrderStatus;
};
export type EnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
};
export type EnumPromotionOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionOrderStatus | Prisma.EnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.PromotionOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel>;
};
export type EnumMediaKindFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaKind | Prisma.EnumMediaKindFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaKindFilter<$PrismaModel> | $Enums.MediaKind;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type EnumMediaKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaKind | Prisma.EnumMediaKindFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaKindWithAggregatesFilter<$PrismaModel> | $Enums.MediaKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaKindFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumModerationTargetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationTargetType | Prisma.EnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel> | $Enums.ModerationTargetType;
};
export type EnumModerationActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationActionType | Prisma.EnumModerationActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel> | $Enums.ModerationActionType;
};
export type EnumModerationTargetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationTargetType | Prisma.EnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationTargetTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModerationTargetType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel>;
};
export type EnumModerationActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationActionType | Prisma.EnumModerationActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModerationActionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel>;
};
export type EnumAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel> | $Enums.AppealStatus;
};
export type EnumAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppealStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
};
export type EnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | Prisma.EnumProposalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus;
};
export type EnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | Prisma.EnumProposalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel>;
};
export type EnumPollKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PollKind | Prisma.EnumPollKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollKindFilter<$PrismaModel> | $Enums.PollKind;
};
export type EnumPollStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PollStatus | Prisma.EnumPollStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollStatusFilter<$PrismaModel> | $Enums.PollStatus;
};
export type EnumPollKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PollKind | Prisma.EnumPollKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollKindWithAggregatesFilter<$PrismaModel> | $Enums.PollKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPollKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPollKindFilter<$PrismaModel>;
};
export type EnumPollStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PollStatus | Prisma.EnumPollStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollStatusWithAggregatesFilter<$PrismaModel> | $Enums.PollStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPollStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPollStatusFilter<$PrismaModel>;
};
export type EnumVoteClassFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteClass | Prisma.EnumVoteClassFieldRefInput<$PrismaModel>;
    in?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoteClassFilter<$PrismaModel> | $Enums.VoteClass;
};
export type EnumVoteClassWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteClass | Prisma.EnumVoteClassFieldRefInput<$PrismaModel>;
    in?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoteClassWithAggregatesFilter<$PrismaModel> | $Enums.VoteClass;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVoteClassFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVoteClassFilter<$PrismaModel>;
};
export type EnumMediaPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerType | Prisma.EnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel> | $Enums.MediaPartnerType;
};
export type EnumMediaPartnerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerStatus | Prisma.EnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel> | $Enums.MediaPartnerStatus;
};
export type EnumMediaPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerType | Prisma.EnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaPartnerType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel>;
};
export type EnumMediaPartnerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerStatus | Prisma.EnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerStatusWithAggregatesFilter<$PrismaModel> | $Enums.MediaPartnerStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel>;
};
export type EnumWorkshopItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemType | Prisma.EnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel> | $Enums.WorkshopItemType;
};
export type EnumWorkshopItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemStatus | Prisma.EnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel> | $Enums.WorkshopItemStatus;
};
export type EnumWorkshopItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemType | Prisma.EnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkshopItemType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel>;
};
export type EnumWorkshopItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemStatus | Prisma.EnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkshopItemStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel>;
};
export type EnumAchievementCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementCategory | Prisma.EnumAchievementCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel> | $Enums.AchievementCategory;
};
export type EnumAchievementCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementCategory | Prisma.EnumAchievementCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAchievementCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AchievementCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel>;
};
export type EnumRoleEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEventType | Prisma.EnumRoleEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel> | $Enums.RoleEventType;
};
export type EnumRoleEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEventType | Prisma.EnumRoleEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoleEventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel>;
};
export type EnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | Prisma.EnumInteractionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType;
};
export type EnumInteractionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionStatus | Prisma.EnumInteractionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel> | $Enums.InteractionStatus;
};
export type EnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | Prisma.EnumInteractionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel>;
};
export type EnumInteractionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionStatus | Prisma.EnumInteractionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionStatusWithAggregatesFilter<$PrismaModel> | $Enums.InteractionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel>;
};
export type EnumReviewVerdictFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewVerdict | Prisma.EnumReviewVerdictFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel> | $Enums.ReviewVerdict;
};
export type EnumReviewModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewModerationStatus | Prisma.EnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel> | $Enums.ReviewModerationStatus;
};
export type EnumReviewVerdictWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewVerdict | Prisma.EnumReviewVerdictFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewVerdictWithAggregatesFilter<$PrismaModel> | $Enums.ReviewVerdict;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel>;
};
export type EnumReviewModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewModerationStatus | Prisma.EnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewModerationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel>;
};
export type EnumCommunityContentActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityContentActionType | Prisma.EnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel> | $Enums.CommunityContentActionType;
};
export type EnumCommunityContentActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityContentActionType | Prisma.EnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityContentActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityContentActionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel>;
};
export type EnumCommunityStructureChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureChangeType | Prisma.EnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel> | $Enums.CommunityStructureChangeType;
};
export type EnumCommunityStructureStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureStatus | Prisma.EnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel> | $Enums.CommunityStructureStatus;
};
export type EnumCommunityStructureChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureChangeType | Prisma.EnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStructureChangeType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel>;
};
export type EnumCommunityStructureStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureStatus | Prisma.EnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStructureStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel>;
};
export type EnumTeamInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamInviteStatus | Prisma.EnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel> | $Enums.TeamInviteStatus;
};
export type EnumTeamInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamInviteStatus | Prisma.EnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTeamInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.TeamInviteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel>;
};
export type EnumCommunityEventFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventFormat | Prisma.EnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel> | $Enums.CommunityEventFormat;
};
export type EnumCommunityEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventStatus | Prisma.EnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel> | $Enums.CommunityEventStatus;
};
export type EnumCommunityEventFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventFormat | Prisma.EnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventFormatWithAggregatesFilter<$PrismaModel> | $Enums.CommunityEventFormat;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel>;
};
export type EnumCommunityEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventStatus | Prisma.EnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityEventStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel>;
};
export type EnumEventAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendanceStatus | Prisma.EnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel> | $Enums.EventAttendanceStatus;
};
export type EnumEventAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendanceStatus | Prisma.EnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventAttendanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel>;
};
export type EnumPortfolioItemKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemKind | Prisma.EnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel> | $Enums.PortfolioItemKind;
};
export type EnumPortfolioItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemStatus | Prisma.EnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel> | $Enums.PortfolioItemStatus;
};
export type EnumPortfolioItemKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemKind | Prisma.EnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemKindWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel>;
};
export type EnumPortfolioItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemStatus | Prisma.EnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel>;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumWallPrivacyFilter<$PrismaModel = never> = {
    equals?: $Enums.WallPrivacy | Prisma.EnumWallPrivacyFieldRefInput<$PrismaModel>;
    in?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel> | $Enums.WallPrivacy;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedEnumAccountStateFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountState | Prisma.EnumAccountStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountStateFilter<$PrismaModel> | $Enums.AccountState;
};
export type NestedEnumGlobalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | Prisma.EnumGlobalRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel> | $Enums.GlobalRole;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumWallPrivacyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WallPrivacy | Prisma.EnumWallPrivacyFieldRefInput<$PrismaModel>;
    in?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WallPrivacy[] | Prisma.ListEnumWallPrivacyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWallPrivacyWithAggregatesFilter<$PrismaModel> | $Enums.WallPrivacy;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWallPrivacyFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumAccountStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountState | Prisma.EnumAccountStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountState[] | Prisma.ListEnumAccountStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountStateWithAggregatesFilter<$PrismaModel> | $Enums.AccountState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccountStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccountStateFilter<$PrismaModel>;
};
export type NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | Prisma.EnumGlobalRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.GlobalRole[] | Prisma.ListEnumGlobalRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel> | $Enums.GlobalRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGlobalRoleFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumCommunityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStatus | Prisma.EnumCommunityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel> | $Enums.CommunityStatus;
};
export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedEnumCommunityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStatus | Prisma.EnumCommunityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStatus[] | Prisma.ListEnumCommunityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStatusFilter<$PrismaModel>;
};
export type NestedEnumCommunityRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityRoleType | Prisma.EnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel> | $Enums.CommunityRoleType;
};
export type NestedEnumCommunityRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityRoleType | Prisma.EnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityRoleType[] | Prisma.ListEnumCommunityRoleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityRoleTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityRoleType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityRoleTypeFilter<$PrismaModel>;
};
export type NestedEnumNotifyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotifyLevel | Prisma.EnumNotifyLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel> | $Enums.NotifyLevel;
};
export type NestedEnumNotifyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotifyLevel | Prisma.EnumNotifyLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotifyLevel[] | Prisma.ListEnumNotifyLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotifyLevelWithAggregatesFilter<$PrismaModel> | $Enums.NotifyLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotifyLevelFilter<$PrismaModel>;
};
export type NestedEnumPublicationFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationFormat | Prisma.EnumPublicationFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel> | $Enums.PublicationFormat;
};
export type NestedEnumPublicationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | Prisma.EnumPublicationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel> | $Enums.PublicationType;
};
export type NestedEnumPublicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | Prisma.EnumPublicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel> | $Enums.PublicationStatus;
};
export type NestedEnumPublicationFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationFormat | Prisma.EnumPublicationFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationFormat[] | Prisma.ListEnumPublicationFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationFormatWithAggregatesFilter<$PrismaModel> | $Enums.PublicationFormat;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationFormatFilter<$PrismaModel>;
};
export type NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | Prisma.EnumPublicationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationType[] | Prisma.ListEnumPublicationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel> | $Enums.PublicationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationTypeFilter<$PrismaModel>;
};
export type NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | Prisma.EnumPublicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PublicationStatus[] | Prisma.ListEnumPublicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PublicationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPublicationStatusFilter<$PrismaModel>;
};
export type NestedEnumReactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel> | $Enums.ReactionType;
};
export type NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumWalletTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel> | $Enums.WalletTransactionType;
};
export type NestedEnumWalletTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
};
export type NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
};
export type NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
};
export type NestedEnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType;
};
export type NestedEnumPromotionOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionOrderStatus | Prisma.EnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel> | $Enums.PromotionOrderStatus;
};
export type NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
};
export type NestedEnumPromotionOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionOrderStatus | Prisma.EnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionOrderStatus[] | Prisma.ListEnumPromotionOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.PromotionOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionOrderStatusFilter<$PrismaModel>;
};
export type NestedEnumMediaKindFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaKind | Prisma.EnumMediaKindFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaKindFilter<$PrismaModel> | $Enums.MediaKind;
};
export type NestedEnumMediaKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaKind | Prisma.EnumMediaKindFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaKind[] | Prisma.ListEnumMediaKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaKindWithAggregatesFilter<$PrismaModel> | $Enums.MediaKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaKindFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumModerationTargetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationTargetType | Prisma.EnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel> | $Enums.ModerationTargetType;
};
export type NestedEnumModerationActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationActionType | Prisma.EnumModerationActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel> | $Enums.ModerationActionType;
};
export type NestedEnumModerationTargetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationTargetType | Prisma.EnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationTargetType[] | Prisma.ListEnumModerationTargetTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationTargetTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModerationTargetType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationTargetTypeFilter<$PrismaModel>;
};
export type NestedEnumModerationActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationActionType | Prisma.EnumModerationActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationActionType[] | Prisma.ListEnumModerationActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModerationActionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationActionTypeFilter<$PrismaModel>;
};
export type NestedEnumAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel> | $Enums.AppealStatus;
};
export type NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppealStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
};
export type NestedEnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | Prisma.EnumProposalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus;
};
export type NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | Prisma.EnumProposalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProposalStatus[] | Prisma.ListEnumProposalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProposalStatusFilter<$PrismaModel>;
};
export type NestedEnumPollKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PollKind | Prisma.EnumPollKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollKindFilter<$PrismaModel> | $Enums.PollKind;
};
export type NestedEnumPollStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PollStatus | Prisma.EnumPollStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollStatusFilter<$PrismaModel> | $Enums.PollStatus;
};
export type NestedEnumPollKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PollKind | Prisma.EnumPollKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollKind[] | Prisma.ListEnumPollKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollKindWithAggregatesFilter<$PrismaModel> | $Enums.PollKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPollKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPollKindFilter<$PrismaModel>;
};
export type NestedEnumPollStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PollStatus | Prisma.EnumPollStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PollStatus[] | Prisma.ListEnumPollStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPollStatusWithAggregatesFilter<$PrismaModel> | $Enums.PollStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPollStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPollStatusFilter<$PrismaModel>;
};
export type NestedEnumVoteClassFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteClass | Prisma.EnumVoteClassFieldRefInput<$PrismaModel>;
    in?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoteClassFilter<$PrismaModel> | $Enums.VoteClass;
};
export type NestedEnumVoteClassWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteClass | Prisma.EnumVoteClassFieldRefInput<$PrismaModel>;
    in?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoteClass[] | Prisma.ListEnumVoteClassFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoteClassWithAggregatesFilter<$PrismaModel> | $Enums.VoteClass;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVoteClassFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVoteClassFilter<$PrismaModel>;
};
export type NestedEnumMediaPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerType | Prisma.EnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel> | $Enums.MediaPartnerType;
};
export type NestedEnumMediaPartnerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerStatus | Prisma.EnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel> | $Enums.MediaPartnerStatus;
};
export type NestedEnumMediaPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerType | Prisma.EnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerType[] | Prisma.ListEnumMediaPartnerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaPartnerType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaPartnerTypeFilter<$PrismaModel>;
};
export type NestedEnumMediaPartnerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaPartnerStatus | Prisma.EnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaPartnerStatus[] | Prisma.ListEnumMediaPartnerStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaPartnerStatusWithAggregatesFilter<$PrismaModel> | $Enums.MediaPartnerStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaPartnerStatusFilter<$PrismaModel>;
};
export type NestedEnumWorkshopItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemType | Prisma.EnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel> | $Enums.WorkshopItemType;
};
export type NestedEnumWorkshopItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemStatus | Prisma.EnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel> | $Enums.WorkshopItemStatus;
};
export type NestedEnumWorkshopItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemType | Prisma.EnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemType[] | Prisma.ListEnumWorkshopItemTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkshopItemType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkshopItemTypeFilter<$PrismaModel>;
};
export type NestedEnumWorkshopItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkshopItemStatus | Prisma.EnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkshopItemStatus[] | Prisma.ListEnumWorkshopItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkshopItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkshopItemStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkshopItemStatusFilter<$PrismaModel>;
};
export type NestedEnumAchievementCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementCategory | Prisma.EnumAchievementCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel> | $Enums.AchievementCategory;
};
export type NestedEnumAchievementCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementCategory | Prisma.EnumAchievementCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AchievementCategory[] | Prisma.ListEnumAchievementCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAchievementCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AchievementCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAchievementCategoryFilter<$PrismaModel>;
};
export type NestedEnumRoleEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEventType | Prisma.EnumRoleEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel> | $Enums.RoleEventType;
};
export type NestedEnumRoleEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEventType | Prisma.EnumRoleEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleEventType[] | Prisma.ListEnumRoleEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoleEventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleEventTypeFilter<$PrismaModel>;
};
export type NestedEnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | Prisma.EnumInteractionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType;
};
export type NestedEnumInteractionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionStatus | Prisma.EnumInteractionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel> | $Enums.InteractionStatus;
};
export type NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | Prisma.EnumInteractionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionType[] | Prisma.ListEnumInteractionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInteractionTypeFilter<$PrismaModel>;
};
export type NestedEnumInteractionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionStatus | Prisma.EnumInteractionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InteractionStatus[] | Prisma.ListEnumInteractionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInteractionStatusWithAggregatesFilter<$PrismaModel> | $Enums.InteractionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInteractionStatusFilter<$PrismaModel>;
};
export type NestedEnumReviewVerdictFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewVerdict | Prisma.EnumReviewVerdictFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel> | $Enums.ReviewVerdict;
};
export type NestedEnumReviewModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewModerationStatus | Prisma.EnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel> | $Enums.ReviewModerationStatus;
};
export type NestedEnumReviewVerdictWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewVerdict | Prisma.EnumReviewVerdictFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewVerdict[] | Prisma.ListEnumReviewVerdictFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewVerdictWithAggregatesFilter<$PrismaModel> | $Enums.ReviewVerdict;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewVerdictFilter<$PrismaModel>;
};
export type NestedEnumReviewModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewModerationStatus | Prisma.EnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewModerationStatus[] | Prisma.ListEnumReviewModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewModerationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewModerationStatusFilter<$PrismaModel>;
};
export type NestedEnumCommunityContentActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityContentActionType | Prisma.EnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel> | $Enums.CommunityContentActionType;
};
export type NestedEnumCommunityContentActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityContentActionType | Prisma.EnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityContentActionType[] | Prisma.ListEnumCommunityContentActionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityContentActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityContentActionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityContentActionTypeFilter<$PrismaModel>;
};
export type NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureChangeType | Prisma.EnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel> | $Enums.CommunityStructureChangeType;
};
export type NestedEnumCommunityStructureStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureStatus | Prisma.EnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel> | $Enums.CommunityStructureStatus;
};
export type NestedEnumCommunityStructureChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureChangeType | Prisma.EnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureChangeType[] | Prisma.ListEnumCommunityStructureChangeTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStructureChangeType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStructureChangeTypeFilter<$PrismaModel>;
};
export type NestedEnumCommunityStructureStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityStructureStatus | Prisma.EnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityStructureStatus[] | Prisma.ListEnumCommunityStructureStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityStructureStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityStructureStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityStructureStatusFilter<$PrismaModel>;
};
export type NestedEnumTeamInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamInviteStatus | Prisma.EnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel> | $Enums.TeamInviteStatus;
};
export type NestedEnumTeamInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamInviteStatus | Prisma.EnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TeamInviteStatus[] | Prisma.ListEnumTeamInviteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTeamInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.TeamInviteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTeamInviteStatusFilter<$PrismaModel>;
};
export type NestedEnumCommunityEventFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventFormat | Prisma.EnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel> | $Enums.CommunityEventFormat;
};
export type NestedEnumCommunityEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventStatus | Prisma.EnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel> | $Enums.CommunityEventStatus;
};
export type NestedEnumCommunityEventFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventFormat | Prisma.EnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventFormat[] | Prisma.ListEnumCommunityEventFormatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventFormatWithAggregatesFilter<$PrismaModel> | $Enums.CommunityEventFormat;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityEventFormatFilter<$PrismaModel>;
};
export type NestedEnumCommunityEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunityEventStatus | Prisma.EnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommunityEventStatus[] | Prisma.ListEnumCommunityEventStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommunityEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommunityEventStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommunityEventStatusFilter<$PrismaModel>;
};
export type NestedEnumEventAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendanceStatus | Prisma.EnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel> | $Enums.EventAttendanceStatus;
};
export type NestedEnumEventAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendanceStatus | Prisma.EnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventAttendanceStatus[] | Prisma.ListEnumEventAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventAttendanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEventAttendanceStatusFilter<$PrismaModel>;
};
export type NestedEnumPortfolioItemKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemKind | Prisma.EnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel> | $Enums.PortfolioItemKind;
};
export type NestedEnumPortfolioItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemStatus | Prisma.EnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel> | $Enums.PortfolioItemStatus;
};
export type NestedEnumPortfolioItemKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemKind | Prisma.EnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemKind[] | Prisma.ListEnumPortfolioItemKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemKindWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPortfolioItemKindFilter<$PrismaModel>;
};
export type NestedEnumPortfolioItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemStatus | Prisma.EnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PortfolioItemStatus[] | Prisma.ListEnumPortfolioItemStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPortfolioItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPortfolioItemStatusFilter<$PrismaModel>;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
