import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserAchievementModel = runtime.Types.Result.DefaultSelection<Prisma.$UserAchievementPayload>;
export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null;
    _min: UserAchievementMinAggregateOutputType | null;
    _max: UserAchievementMaxAggregateOutputType | null;
};
export type UserAchievementMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    achievementId: string | null;
    communityId: string | null;
    scopeKey: string | null;
    sourceType: string | null;
    sourceId: string | null;
    earnedAt: Date | null;
};
export type UserAchievementMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    achievementId: string | null;
    communityId: string | null;
    scopeKey: string | null;
    sourceType: string | null;
    sourceId: string | null;
    earnedAt: Date | null;
};
export type UserAchievementCountAggregateOutputType = {
    id: number;
    userId: number;
    achievementId: number;
    communityId: number;
    scopeKey: number;
    sourceType: number;
    sourceId: number;
    metadata: number;
    earnedAt: number;
    _all: number;
};
export type UserAchievementMinAggregateInputType = {
    id?: true;
    userId?: true;
    achievementId?: true;
    communityId?: true;
    scopeKey?: true;
    sourceType?: true;
    sourceId?: true;
    earnedAt?: true;
};
export type UserAchievementMaxAggregateInputType = {
    id?: true;
    userId?: true;
    achievementId?: true;
    communityId?: true;
    scopeKey?: true;
    sourceType?: true;
    sourceId?: true;
    earnedAt?: true;
};
export type UserAchievementCountAggregateInputType = {
    id?: true;
    userId?: true;
    achievementId?: true;
    communityId?: true;
    scopeKey?: true;
    sourceType?: true;
    sourceId?: true;
    metadata?: true;
    earnedAt?: true;
    _all?: true;
};
export type UserAchievementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithRelationInput | Prisma.UserAchievementOrderByWithRelationInput[];
    cursor?: Prisma.UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserAchievementCountAggregateInputType;
    _min?: UserAchievementMinAggregateInputType;
    _max?: UserAchievementMaxAggregateInputType;
};
export type GetUserAchievementAggregateType<T extends UserAchievementAggregateArgs> = {
    [P in keyof T & keyof AggregateUserAchievement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserAchievement[P]> : Prisma.GetScalarType<T[P], AggregateUserAchievement[P]>;
};
export type UserAchievementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithAggregationInput | Prisma.UserAchievementOrderByWithAggregationInput[];
    by: Prisma.UserAchievementScalarFieldEnum[] | Prisma.UserAchievementScalarFieldEnum;
    having?: Prisma.UserAchievementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserAchievementCountAggregateInputType | true;
    _min?: UserAchievementMinAggregateInputType;
    _max?: UserAchievementMaxAggregateInputType;
};
export type UserAchievementGroupByOutputType = {
    id: string;
    userId: string;
    achievementId: string;
    communityId: string | null;
    scopeKey: string;
    sourceType: string | null;
    sourceId: string | null;
    metadata: runtime.JsonValue | null;
    earnedAt: Date;
    _count: UserAchievementCountAggregateOutputType | null;
    _min: UserAchievementMinAggregateOutputType | null;
    _max: UserAchievementMaxAggregateOutputType | null;
};
type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserAchievementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserAchievementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserAchievementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserAchievementGroupByOutputType[P]>;
}>>;
export type UserAchievementWhereInput = {
    AND?: Prisma.UserAchievementWhereInput | Prisma.UserAchievementWhereInput[];
    OR?: Prisma.UserAchievementWhereInput[];
    NOT?: Prisma.UserAchievementWhereInput | Prisma.UserAchievementWhereInput[];
    id?: Prisma.UuidFilter<"UserAchievement"> | string;
    userId?: Prisma.UuidFilter<"UserAchievement"> | string;
    achievementId?: Prisma.UuidFilter<"UserAchievement"> | string;
    communityId?: Prisma.UuidNullableFilter<"UserAchievement"> | string | null;
    scopeKey?: Prisma.StringFilter<"UserAchievement"> | string;
    sourceType?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    sourceId?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"UserAchievement">;
    earnedAt?: Prisma.DateTimeFilter<"UserAchievement"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    achievement?: Prisma.XOR<Prisma.AchievementDefinitionScalarRelationFilter, Prisma.AchievementDefinitionWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
};
export type UserAchievementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    achievementId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scopeKey?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    earnedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    achievement?: Prisma.AchievementDefinitionOrderByWithRelationInput;
    community?: Prisma.CommunityOrderByWithRelationInput;
};
export type UserAchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_achievementId_scopeKey?: Prisma.UserAchievementUserIdAchievementIdScopeKeyCompoundUniqueInput;
    AND?: Prisma.UserAchievementWhereInput | Prisma.UserAchievementWhereInput[];
    OR?: Prisma.UserAchievementWhereInput[];
    NOT?: Prisma.UserAchievementWhereInput | Prisma.UserAchievementWhereInput[];
    userId?: Prisma.UuidFilter<"UserAchievement"> | string;
    achievementId?: Prisma.UuidFilter<"UserAchievement"> | string;
    communityId?: Prisma.UuidNullableFilter<"UserAchievement"> | string | null;
    scopeKey?: Prisma.StringFilter<"UserAchievement"> | string;
    sourceType?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    sourceId?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"UserAchievement">;
    earnedAt?: Prisma.DateTimeFilter<"UserAchievement"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    achievement?: Prisma.XOR<Prisma.AchievementDefinitionScalarRelationFilter, Prisma.AchievementDefinitionWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
}, "id" | "userId_achievementId_scopeKey">;
export type UserAchievementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    achievementId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scopeKey?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    earnedAt?: Prisma.SortOrder;
    _count?: Prisma.UserAchievementCountOrderByAggregateInput;
    _max?: Prisma.UserAchievementMaxOrderByAggregateInput;
    _min?: Prisma.UserAchievementMinOrderByAggregateInput;
};
export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserAchievementScalarWhereWithAggregatesInput | Prisma.UserAchievementScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserAchievementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserAchievementScalarWhereWithAggregatesInput | Prisma.UserAchievementScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"UserAchievement"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"UserAchievement"> | string;
    achievementId?: Prisma.UuidWithAggregatesFilter<"UserAchievement"> | string;
    communityId?: Prisma.UuidNullableWithAggregatesFilter<"UserAchievement"> | string | null;
    scopeKey?: Prisma.StringWithAggregatesFilter<"UserAchievement"> | string;
    sourceType?: Prisma.StringNullableWithAggregatesFilter<"UserAchievement"> | string | null;
    sourceId?: Prisma.StringNullableWithAggregatesFilter<"UserAchievement"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"UserAchievement">;
    earnedAt?: Prisma.DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string;
};
export type UserAchievementCreateInput = {
    id?: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAchievementsInput;
    achievement: Prisma.AchievementDefinitionCreateNestedOneWithoutAwardsInput;
    community?: Prisma.CommunityCreateNestedOneWithoutAchievementsInput;
};
export type UserAchievementUncheckedCreateInput = {
    id?: string;
    userId: string;
    achievementId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAchievementsNestedInput;
    achievement?: Prisma.AchievementDefinitionUpdateOneRequiredWithoutAwardsNestedInput;
    community?: Prisma.CommunityUpdateOneWithoutAchievementsNestedInput;
};
export type UserAchievementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementCreateManyInput = {
    id?: string;
    userId: string;
    achievementId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementListRelationFilter = {
    every?: Prisma.UserAchievementWhereInput;
    some?: Prisma.UserAchievementWhereInput;
    none?: Prisma.UserAchievementWhereInput;
};
export type UserAchievementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserAchievementUserIdAchievementIdScopeKeyCompoundUniqueInput = {
    userId: string;
    achievementId: string;
    scopeKey: string;
};
export type UserAchievementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    achievementId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    scopeKey?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    earnedAt?: Prisma.SortOrder;
};
export type UserAchievementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    achievementId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    scopeKey?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    earnedAt?: Prisma.SortOrder;
};
export type UserAchievementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    achievementId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    scopeKey?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    earnedAt?: Prisma.SortOrder;
};
export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput> | Prisma.UserAchievementCreateWithoutUserInput[] | Prisma.UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutUserInput | Prisma.UserAchievementCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserAchievementCreateManyUserInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput> | Prisma.UserAchievementCreateWithoutUserInput[] | Prisma.UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutUserInput | Prisma.UserAchievementCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserAchievementCreateManyUserInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput> | Prisma.UserAchievementCreateWithoutUserInput[] | Prisma.UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutUserInput | Prisma.UserAchievementCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutUserInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserAchievementCreateManyUserInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutUserInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutUserInput | Prisma.UserAchievementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput> | Prisma.UserAchievementCreateWithoutUserInput[] | Prisma.UserAchievementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutUserInput | Prisma.UserAchievementCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutUserInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserAchievementCreateManyUserInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutUserInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutUserInput | Prisma.UserAchievementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput> | Prisma.UserAchievementCreateWithoutCommunityInput[] | Prisma.UserAchievementUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutCommunityInput | Prisma.UserAchievementCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.UserAchievementCreateManyCommunityInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput> | Prisma.UserAchievementCreateWithoutCommunityInput[] | Prisma.UserAchievementUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutCommunityInput | Prisma.UserAchievementCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.UserAchievementCreateManyCommunityInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput> | Prisma.UserAchievementCreateWithoutCommunityInput[] | Prisma.UserAchievementUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutCommunityInput | Prisma.UserAchievementCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutCommunityInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.UserAchievementCreateManyCommunityInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutCommunityInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutCommunityInput | Prisma.UserAchievementUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput> | Prisma.UserAchievementCreateWithoutCommunityInput[] | Prisma.UserAchievementUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutCommunityInput | Prisma.UserAchievementCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutCommunityInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.UserAchievementCreateManyCommunityInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutCommunityInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutCommunityInput | Prisma.UserAchievementUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput> | Prisma.UserAchievementCreateWithoutAchievementInput[] | Prisma.UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutAchievementInput | Prisma.UserAchievementCreateOrConnectWithoutAchievementInput[];
    createMany?: Prisma.UserAchievementCreateManyAchievementInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput> | Prisma.UserAchievementCreateWithoutAchievementInput[] | Prisma.UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutAchievementInput | Prisma.UserAchievementCreateOrConnectWithoutAchievementInput[];
    createMany?: Prisma.UserAchievementCreateManyAchievementInputEnvelope;
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
};
export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput> | Prisma.UserAchievementCreateWithoutAchievementInput[] | Prisma.UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutAchievementInput | Prisma.UserAchievementCreateOrConnectWithoutAchievementInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[];
    createMany?: Prisma.UserAchievementCreateManyAchievementInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutAchievementInput | Prisma.UserAchievementUpdateManyWithWhereWithoutAchievementInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput> | Prisma.UserAchievementCreateWithoutAchievementInput[] | Prisma.UserAchievementUncheckedCreateWithoutAchievementInput[];
    connectOrCreate?: Prisma.UserAchievementCreateOrConnectWithoutAchievementInput | Prisma.UserAchievementCreateOrConnectWithoutAchievementInput[];
    upsert?: Prisma.UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | Prisma.UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[];
    createMany?: Prisma.UserAchievementCreateManyAchievementInputEnvelope;
    set?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    disconnect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    delete?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    connect?: Prisma.UserAchievementWhereUniqueInput | Prisma.UserAchievementWhereUniqueInput[];
    update?: Prisma.UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | Prisma.UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[];
    updateMany?: Prisma.UserAchievementUpdateManyWithWhereWithoutAchievementInput | Prisma.UserAchievementUpdateManyWithWhereWithoutAchievementInput[];
    deleteMany?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
};
export type UserAchievementCreateWithoutUserInput = {
    id?: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
    achievement: Prisma.AchievementDefinitionCreateNestedOneWithoutAwardsInput;
    community?: Prisma.CommunityCreateNestedOneWithoutAchievementsInput;
};
export type UserAchievementUncheckedCreateWithoutUserInput = {
    id?: string;
    achievementId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput>;
};
export type UserAchievementCreateManyUserInputEnvelope = {
    data: Prisma.UserAchievementCreateManyUserInput | Prisma.UserAchievementCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserAchievementUpdateWithoutUserInput, Prisma.UserAchievementUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutUserInput, Prisma.UserAchievementUncheckedCreateWithoutUserInput>;
};
export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateWithoutUserInput, Prisma.UserAchievementUncheckedUpdateWithoutUserInput>;
};
export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserAchievementScalarWhereInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateManyMutationInput, Prisma.UserAchievementUncheckedUpdateManyWithoutUserInput>;
};
export type UserAchievementScalarWhereInput = {
    AND?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
    OR?: Prisma.UserAchievementScalarWhereInput[];
    NOT?: Prisma.UserAchievementScalarWhereInput | Prisma.UserAchievementScalarWhereInput[];
    id?: Prisma.UuidFilter<"UserAchievement"> | string;
    userId?: Prisma.UuidFilter<"UserAchievement"> | string;
    achievementId?: Prisma.UuidFilter<"UserAchievement"> | string;
    communityId?: Prisma.UuidNullableFilter<"UserAchievement"> | string | null;
    scopeKey?: Prisma.StringFilter<"UserAchievement"> | string;
    sourceType?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    sourceId?: Prisma.StringNullableFilter<"UserAchievement"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"UserAchievement">;
    earnedAt?: Prisma.DateTimeFilter<"UserAchievement"> | Date | string;
};
export type UserAchievementCreateWithoutCommunityInput = {
    id?: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAchievementsInput;
    achievement: Prisma.AchievementDefinitionCreateNestedOneWithoutAwardsInput;
};
export type UserAchievementUncheckedCreateWithoutCommunityInput = {
    id?: string;
    userId: string;
    achievementId: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementCreateOrConnectWithoutCommunityInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput>;
};
export type UserAchievementCreateManyCommunityInputEnvelope = {
    data: Prisma.UserAchievementCreateManyCommunityInput | Prisma.UserAchievementCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type UserAchievementUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserAchievementUpdateWithoutCommunityInput, Prisma.UserAchievementUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutCommunityInput, Prisma.UserAchievementUncheckedCreateWithoutCommunityInput>;
};
export type UserAchievementUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateWithoutCommunityInput, Prisma.UserAchievementUncheckedUpdateWithoutCommunityInput>;
};
export type UserAchievementUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.UserAchievementScalarWhereInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateManyMutationInput, Prisma.UserAchievementUncheckedUpdateManyWithoutCommunityInput>;
};
export type UserAchievementCreateWithoutAchievementInput = {
    id?: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAchievementsInput;
    community?: Prisma.CommunityCreateNestedOneWithoutAchievementsInput;
};
export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    id?: string;
    userId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput>;
};
export type UserAchievementCreateManyAchievementInputEnvelope = {
    data: Prisma.UserAchievementCreateManyAchievementInput | Prisma.UserAchievementCreateManyAchievementInput[];
    skipDuplicates?: boolean;
};
export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserAchievementUpdateWithoutAchievementInput, Prisma.UserAchievementUncheckedUpdateWithoutAchievementInput>;
    create: Prisma.XOR<Prisma.UserAchievementCreateWithoutAchievementInput, Prisma.UserAchievementUncheckedCreateWithoutAchievementInput>;
};
export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: Prisma.UserAchievementWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateWithoutAchievementInput, Prisma.UserAchievementUncheckedUpdateWithoutAchievementInput>;
};
export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: Prisma.UserAchievementScalarWhereInput;
    data: Prisma.XOR<Prisma.UserAchievementUpdateManyMutationInput, Prisma.UserAchievementUncheckedUpdateManyWithoutAchievementInput>;
};
export type UserAchievementCreateManyUserInput = {
    id?: string;
    achievementId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    achievement?: Prisma.AchievementDefinitionUpdateOneRequiredWithoutAwardsNestedInput;
    community?: Prisma.CommunityUpdateOneWithoutAchievementsNestedInput;
};
export type UserAchievementUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementCreateManyCommunityInput = {
    id?: string;
    userId: string;
    achievementId: string;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAchievementsNestedInput;
    achievement?: Prisma.AchievementDefinitionUpdateOneRequiredWithoutAwardsNestedInput;
};
export type UserAchievementUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    achievementId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementCreateManyAchievementInput = {
    id?: string;
    userId: string;
    communityId?: string | null;
    scopeKey?: string;
    sourceType?: string | null;
    sourceId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Date | string;
};
export type UserAchievementUpdateWithoutAchievementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAchievementsNestedInput;
    community?: Prisma.CommunityUpdateOneWithoutAchievementsNestedInput;
};
export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    earnedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAchievementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    achievementId?: boolean;
    communityId?: boolean;
    scopeKey?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    metadata?: boolean;
    earnedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
}, ExtArgs["result"]["userAchievement"]>;
export type UserAchievementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    achievementId?: boolean;
    communityId?: boolean;
    scopeKey?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    metadata?: boolean;
    earnedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
}, ExtArgs["result"]["userAchievement"]>;
export type UserAchievementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    achievementId?: boolean;
    communityId?: boolean;
    scopeKey?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    metadata?: boolean;
    earnedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
}, ExtArgs["result"]["userAchievement"]>;
export type UserAchievementSelectScalar = {
    id?: boolean;
    userId?: boolean;
    achievementId?: boolean;
    communityId?: boolean;
    scopeKey?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    metadata?: boolean;
    earnedAt?: boolean;
};
export type UserAchievementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "achievementId" | "communityId" | "scopeKey" | "sourceType" | "sourceId" | "metadata" | "earnedAt", ExtArgs["result"]["userAchievement"]>;
export type UserAchievementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
};
export type UserAchievementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
};
export type UserAchievementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    achievement?: boolean | Prisma.AchievementDefinitionDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.UserAchievement$communityArgs<ExtArgs>;
};
export type $UserAchievementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserAchievement";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        achievement: Prisma.$AchievementDefinitionPayload<ExtArgs>;
        community: Prisma.$CommunityPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        achievementId: string;
        communityId: string | null;
        scopeKey: string;
        sourceType: string | null;
        sourceId: string | null;
        metadata: runtime.JsonValue | null;
        earnedAt: Date;
    }, ExtArgs["result"]["userAchievement"]>;
    composites: {};
};
export type UserAchievementGetPayload<S extends boolean | null | undefined | UserAchievementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload, S>;
export type UserAchievementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserAchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserAchievementCountAggregateInputType | true;
};
export interface UserAchievementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserAchievement'];
        meta: {
            name: 'UserAchievement';
        };
    };
    findUnique<T extends UserAchievementFindUniqueArgs>(args: Prisma.SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserAchievementFindFirstArgs>(args?: Prisma.SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserAchievementFindManyArgs>(args?: Prisma.SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserAchievementCreateArgs>(args: Prisma.SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserAchievementCreateManyArgs>(args?: Prisma.SelectSubset<T, UserAchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserAchievementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserAchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserAchievementDeleteArgs>(args: Prisma.SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserAchievementUpdateArgs>(args: Prisma.SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserAchievementDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserAchievementUpdateManyArgs>(args: Prisma.SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserAchievementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserAchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserAchievementUpsertArgs>(args: Prisma.SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>): Prisma.Prisma__UserAchievementClient<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserAchievementCountArgs>(args?: Prisma.Subset<T, UserAchievementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserAchievementCountAggregateOutputType> : number>;
    aggregate<T extends UserAchievementAggregateArgs>(args: Prisma.Subset<T, UserAchievementAggregateArgs>): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>;
    groupBy<T extends UserAchievementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserAchievementGroupByArgs['orderBy'];
    } : {
        orderBy?: UserAchievementGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserAchievementFieldRefs;
}
export interface Prisma__UserAchievementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    achievement<T extends Prisma.AchievementDefinitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AchievementDefinitionDefaultArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    community<T extends Prisma.UserAchievement$communityArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserAchievement$communityArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserAchievementFieldRefs {
    readonly id: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly userId: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly achievementId: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly communityId: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly scopeKey: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly sourceType: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly sourceId: Prisma.FieldRef<"UserAchievement", 'String'>;
    readonly metadata: Prisma.FieldRef<"UserAchievement", 'Json'>;
    readonly earnedAt: Prisma.FieldRef<"UserAchievement", 'DateTime'>;
}
export type UserAchievementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where: Prisma.UserAchievementWhereUniqueInput;
};
export type UserAchievementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where: Prisma.UserAchievementWhereUniqueInput;
};
export type UserAchievementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithRelationInput | Prisma.UserAchievementOrderByWithRelationInput[];
    cursor?: Prisma.UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAchievementScalarFieldEnum | Prisma.UserAchievementScalarFieldEnum[];
};
export type UserAchievementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithRelationInput | Prisma.UserAchievementOrderByWithRelationInput[];
    cursor?: Prisma.UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAchievementScalarFieldEnum | Prisma.UserAchievementScalarFieldEnum[];
};
export type UserAchievementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithRelationInput | Prisma.UserAchievementOrderByWithRelationInput[];
    cursor?: Prisma.UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAchievementScalarFieldEnum | Prisma.UserAchievementScalarFieldEnum[];
};
export type UserAchievementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAchievementCreateInput, Prisma.UserAchievementUncheckedCreateInput>;
};
export type UserAchievementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserAchievementCreateManyInput | Prisma.UserAchievementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserAchievementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    data: Prisma.UserAchievementCreateManyInput | Prisma.UserAchievementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserAchievementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserAchievementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAchievementUpdateInput, Prisma.UserAchievementUncheckedUpdateInput>;
    where: Prisma.UserAchievementWhereUniqueInput;
};
export type UserAchievementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserAchievementUpdateManyMutationInput, Prisma.UserAchievementUncheckedUpdateManyInput>;
    where?: Prisma.UserAchievementWhereInput;
    limit?: number;
};
export type UserAchievementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAchievementUpdateManyMutationInput, Prisma.UserAchievementUncheckedUpdateManyInput>;
    where?: Prisma.UserAchievementWhereInput;
    limit?: number;
    include?: Prisma.UserAchievementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserAchievementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where: Prisma.UserAchievementWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAchievementCreateInput, Prisma.UserAchievementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserAchievementUpdateInput, Prisma.UserAchievementUncheckedUpdateInput>;
};
export type UserAchievementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where: Prisma.UserAchievementWhereUniqueInput;
};
export type UserAchievementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAchievementWhereInput;
    limit?: number;
};
export type UserAchievement$communityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySelect<ExtArgs> | null;
    omit?: Prisma.CommunityOmit<ExtArgs> | null;
    include?: Prisma.CommunityInclude<ExtArgs> | null;
    where?: Prisma.CommunityWhereInput;
};
export type UserAchievementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
};
export {};
