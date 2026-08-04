import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunitySubscriptionModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunitySubscriptionPayload>;
export type AggregateCommunitySubscription = {
    _count: CommunitySubscriptionCountAggregateOutputType | null;
    _min: CommunitySubscriptionMinAggregateOutputType | null;
    _max: CommunitySubscriptionMaxAggregateOutputType | null;
};
export type CommunitySubscriptionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    communityId: string | null;
    notifyLevel: $Enums.NotifyLevel | null;
    createdAt: Date | null;
};
export type CommunitySubscriptionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    communityId: string | null;
    notifyLevel: $Enums.NotifyLevel | null;
    createdAt: Date | null;
};
export type CommunitySubscriptionCountAggregateOutputType = {
    id: number;
    userId: number;
    communityId: number;
    notifyLevel: number;
    createdAt: number;
    _all: number;
};
export type CommunitySubscriptionMinAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    notifyLevel?: true;
    createdAt?: true;
};
export type CommunitySubscriptionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    notifyLevel?: true;
    createdAt?: true;
};
export type CommunitySubscriptionCountAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    notifyLevel?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunitySubscriptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunitySubscriptionWhereInput;
    orderBy?: Prisma.CommunitySubscriptionOrderByWithRelationInput | Prisma.CommunitySubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.CommunitySubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunitySubscriptionCountAggregateInputType;
    _min?: CommunitySubscriptionMinAggregateInputType;
    _max?: CommunitySubscriptionMaxAggregateInputType;
};
export type GetCommunitySubscriptionAggregateType<T extends CommunitySubscriptionAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunitySubscription]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunitySubscription[P]> : Prisma.GetScalarType<T[P], AggregateCommunitySubscription[P]>;
};
export type CommunitySubscriptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunitySubscriptionWhereInput;
    orderBy?: Prisma.CommunitySubscriptionOrderByWithAggregationInput | Prisma.CommunitySubscriptionOrderByWithAggregationInput[];
    by: Prisma.CommunitySubscriptionScalarFieldEnum[] | Prisma.CommunitySubscriptionScalarFieldEnum;
    having?: Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunitySubscriptionCountAggregateInputType | true;
    _min?: CommunitySubscriptionMinAggregateInputType;
    _max?: CommunitySubscriptionMaxAggregateInputType;
};
export type CommunitySubscriptionGroupByOutputType = {
    id: string;
    userId: string;
    communityId: string;
    notifyLevel: $Enums.NotifyLevel;
    createdAt: Date;
    _count: CommunitySubscriptionCountAggregateOutputType | null;
    _min: CommunitySubscriptionMinAggregateOutputType | null;
    _max: CommunitySubscriptionMaxAggregateOutputType | null;
};
type GetCommunitySubscriptionGroupByPayload<T extends CommunitySubscriptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunitySubscriptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunitySubscriptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunitySubscriptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunitySubscriptionGroupByOutputType[P]>;
}>>;
export type CommunitySubscriptionWhereInput = {
    AND?: Prisma.CommunitySubscriptionWhereInput | Prisma.CommunitySubscriptionWhereInput[];
    OR?: Prisma.CommunitySubscriptionWhereInput[];
    NOT?: Prisma.CommunitySubscriptionWhereInput | Prisma.CommunitySubscriptionWhereInput[];
    id?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    userId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    communityId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    notifyLevel?: Prisma.EnumNotifyLevelFilter<"CommunitySubscription"> | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFilter<"CommunitySubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
};
export type CommunitySubscriptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    notifyLevel?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    community?: Prisma.CommunityOrderByWithRelationInput;
};
export type CommunitySubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_communityId?: Prisma.CommunitySubscriptionUserIdCommunityIdCompoundUniqueInput;
    AND?: Prisma.CommunitySubscriptionWhereInput | Prisma.CommunitySubscriptionWhereInput[];
    OR?: Prisma.CommunitySubscriptionWhereInput[];
    NOT?: Prisma.CommunitySubscriptionWhereInput | Prisma.CommunitySubscriptionWhereInput[];
    userId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    communityId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    notifyLevel?: Prisma.EnumNotifyLevelFilter<"CommunitySubscription"> | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFilter<"CommunitySubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
}, "id" | "userId_communityId">;
export type CommunitySubscriptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    notifyLevel?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunitySubscriptionCountOrderByAggregateInput;
    _max?: Prisma.CommunitySubscriptionMaxOrderByAggregateInput;
    _min?: Prisma.CommunitySubscriptionMinOrderByAggregateInput;
};
export type CommunitySubscriptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput | Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput | Prisma.CommunitySubscriptionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunitySubscription"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CommunitySubscription"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunitySubscription"> | string;
    notifyLevel?: Prisma.EnumNotifyLevelWithAggregatesFilter<"CommunitySubscription"> | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunitySubscription"> | Date | string;
};
export type CommunitySubscriptionCreateInput = {
    id?: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubscriptionsInput;
    community: Prisma.CommunityCreateNestedOneWithoutSubscriptionsInput;
};
export type CommunitySubscriptionUncheckedCreateInput = {
    id?: string;
    userId: string;
    communityId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubscriptionsNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutSubscriptionsNestedInput;
};
export type CommunitySubscriptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionCreateManyInput = {
    id?: string;
    userId: string;
    communityId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionListRelationFilter = {
    every?: Prisma.CommunitySubscriptionWhereInput;
    some?: Prisma.CommunitySubscriptionWhereInput;
    none?: Prisma.CommunitySubscriptionWhereInput;
};
export type CommunitySubscriptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunitySubscriptionUserIdCommunityIdCompoundUniqueInput = {
    userId: string;
    communityId: string;
};
export type CommunitySubscriptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    notifyLevel?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunitySubscriptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    notifyLevel?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunitySubscriptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    notifyLevel?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunitySubscriptionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput> | Prisma.CommunitySubscriptionCreateWithoutUserInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
};
export type CommunitySubscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput> | Prisma.CommunitySubscriptionCreateWithoutUserInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
};
export type CommunitySubscriptionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput> | Prisma.CommunitySubscriptionCreateWithoutUserInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    disconnect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    delete?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    update?: Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
};
export type CommunitySubscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput> | Prisma.CommunitySubscriptionCreateWithoutUserInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    disconnect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    delete?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    update?: Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
};
export type CommunitySubscriptionCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput> | Prisma.CommunitySubscriptionCreateWithoutCommunityInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
};
export type CommunitySubscriptionUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput> | Prisma.CommunitySubscriptionCreateWithoutCommunityInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
};
export type CommunitySubscriptionUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput> | Prisma.CommunitySubscriptionCreateWithoutCommunityInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    disconnect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    delete?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    update?: Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
};
export type CommunitySubscriptionUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput> | Prisma.CommunitySubscriptionCreateWithoutCommunityInput[] | Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput | Prisma.CommunitySubscriptionCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunitySubscriptionUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunitySubscriptionCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    disconnect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    delete?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    connect?: Prisma.CommunitySubscriptionWhereUniqueInput | Prisma.CommunitySubscriptionWhereUniqueInput[];
    update?: Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunitySubscriptionUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunitySubscriptionUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
};
export type EnumNotifyLevelFieldUpdateOperationsInput = {
    set?: $Enums.NotifyLevel;
};
export type CommunitySubscriptionCreateWithoutUserInput = {
    id?: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutSubscriptionsInput;
};
export type CommunitySubscriptionUncheckedCreateWithoutUserInput = {
    id?: string;
    communityId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionCreateOrConnectWithoutUserInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput>;
};
export type CommunitySubscriptionCreateManyUserInputEnvelope = {
    data: Prisma.CommunitySubscriptionCreateManyUserInput | Prisma.CommunitySubscriptionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommunitySubscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunitySubscriptionUpdateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutUserInput>;
};
export type CommunitySubscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateWithoutUserInput, Prisma.CommunitySubscriptionUncheckedUpdateWithoutUserInput>;
};
export type CommunitySubscriptionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommunitySubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateManyMutationInput, Prisma.CommunitySubscriptionUncheckedUpdateManyWithoutUserInput>;
};
export type CommunitySubscriptionScalarWhereInput = {
    AND?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
    OR?: Prisma.CommunitySubscriptionScalarWhereInput[];
    NOT?: Prisma.CommunitySubscriptionScalarWhereInput | Prisma.CommunitySubscriptionScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    userId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    communityId?: Prisma.UuidFilter<"CommunitySubscription"> | string;
    notifyLevel?: Prisma.EnumNotifyLevelFilter<"CommunitySubscription"> | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFilter<"CommunitySubscription"> | Date | string;
};
export type CommunitySubscriptionCreateWithoutCommunityInput = {
    id?: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubscriptionsInput;
};
export type CommunitySubscriptionUncheckedCreateWithoutCommunityInput = {
    id?: string;
    userId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput>;
};
export type CommunitySubscriptionCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunitySubscriptionCreateManyCommunityInput | Prisma.CommunitySubscriptionCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunitySubscriptionUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunitySubscriptionUpdateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunitySubscriptionCreateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedCreateWithoutCommunityInput>;
};
export type CommunitySubscriptionUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateWithoutCommunityInput, Prisma.CommunitySubscriptionUncheckedUpdateWithoutCommunityInput>;
};
export type CommunitySubscriptionUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunitySubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateManyMutationInput, Prisma.CommunitySubscriptionUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunitySubscriptionCreateManyUserInput = {
    id?: string;
    communityId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutSubscriptionsNestedInput;
};
export type CommunitySubscriptionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionCreateManyCommunityInput = {
    id?: string;
    userId: string;
    notifyLevel?: $Enums.NotifyLevel;
    createdAt?: Date | string;
};
export type CommunitySubscriptionUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubscriptionsNestedInput;
};
export type CommunitySubscriptionUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    notifyLevel?: Prisma.EnumNotifyLevelFieldUpdateOperationsInput | $Enums.NotifyLevel;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunitySubscriptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    notifyLevel?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communitySubscription"]>;
export type CommunitySubscriptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    notifyLevel?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communitySubscription"]>;
export type CommunitySubscriptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    notifyLevel?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communitySubscription"]>;
export type CommunitySubscriptionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    notifyLevel?: boolean;
    createdAt?: boolean;
};
export type CommunitySubscriptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "communityId" | "notifyLevel" | "createdAt", ExtArgs["result"]["communitySubscription"]>;
export type CommunitySubscriptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type CommunitySubscriptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type CommunitySubscriptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type $CommunitySubscriptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunitySubscription";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        community: Prisma.$CommunityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        communityId: string;
        notifyLevel: $Enums.NotifyLevel;
        createdAt: Date;
    }, ExtArgs["result"]["communitySubscription"]>;
    composites: {};
};
export type CommunitySubscriptionGetPayload<S extends boolean | null | undefined | CommunitySubscriptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload, S>;
export type CommunitySubscriptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunitySubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunitySubscriptionCountAggregateInputType | true;
};
export interface CommunitySubscriptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunitySubscription'];
        meta: {
            name: 'CommunitySubscription';
        };
    };
    findUnique<T extends CommunitySubscriptionFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunitySubscriptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunitySubscriptionFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunitySubscriptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunitySubscriptionFindManyArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunitySubscriptionCreateArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionCreateArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunitySubscriptionCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunitySubscriptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunitySubscriptionDeleteArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunitySubscriptionUpdateArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunitySubscriptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunitySubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunitySubscriptionUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunitySubscriptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunitySubscriptionUpsertArgs>(args: Prisma.SelectSubset<T, CommunitySubscriptionUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunitySubscriptionClient<runtime.Types.Result.GetResult<Prisma.$CommunitySubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunitySubscriptionCountArgs>(args?: Prisma.Subset<T, CommunitySubscriptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunitySubscriptionCountAggregateOutputType> : number>;
    aggregate<T extends CommunitySubscriptionAggregateArgs>(args: Prisma.Subset<T, CommunitySubscriptionAggregateArgs>): Prisma.PrismaPromise<GetCommunitySubscriptionAggregateType<T>>;
    groupBy<T extends CommunitySubscriptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunitySubscriptionGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunitySubscriptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunitySubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunitySubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunitySubscriptionFieldRefs;
}
export interface Prisma__CommunitySubscriptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunitySubscriptionFieldRefs {
    readonly id: Prisma.FieldRef<"CommunitySubscription", 'String'>;
    readonly userId: Prisma.FieldRef<"CommunitySubscription", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunitySubscription", 'String'>;
    readonly notifyLevel: Prisma.FieldRef<"CommunitySubscription", 'NotifyLevel'>;
    readonly createdAt: Prisma.FieldRef<"CommunitySubscription", 'DateTime'>;
}
export type CommunitySubscriptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
};
export type CommunitySubscriptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
};
export type CommunitySubscriptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where?: Prisma.CommunitySubscriptionWhereInput;
    orderBy?: Prisma.CommunitySubscriptionOrderByWithRelationInput | Prisma.CommunitySubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.CommunitySubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunitySubscriptionScalarFieldEnum | Prisma.CommunitySubscriptionScalarFieldEnum[];
};
export type CommunitySubscriptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where?: Prisma.CommunitySubscriptionWhereInput;
    orderBy?: Prisma.CommunitySubscriptionOrderByWithRelationInput | Prisma.CommunitySubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.CommunitySubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunitySubscriptionScalarFieldEnum | Prisma.CommunitySubscriptionScalarFieldEnum[];
};
export type CommunitySubscriptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where?: Prisma.CommunitySubscriptionWhereInput;
    orderBy?: Prisma.CommunitySubscriptionOrderByWithRelationInput | Prisma.CommunitySubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.CommunitySubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunitySubscriptionScalarFieldEnum | Prisma.CommunitySubscriptionScalarFieldEnum[];
};
export type CommunitySubscriptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunitySubscriptionCreateInput, Prisma.CommunitySubscriptionUncheckedCreateInput>;
};
export type CommunitySubscriptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunitySubscriptionCreateManyInput | Prisma.CommunitySubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunitySubscriptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    data: Prisma.CommunitySubscriptionCreateManyInput | Prisma.CommunitySubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunitySubscriptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunitySubscriptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateInput, Prisma.CommunitySubscriptionUncheckedUpdateInput>;
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
};
export type CommunitySubscriptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateManyMutationInput, Prisma.CommunitySubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.CommunitySubscriptionWhereInput;
    limit?: number;
};
export type CommunitySubscriptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunitySubscriptionUpdateManyMutationInput, Prisma.CommunitySubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.CommunitySubscriptionWhereInput;
    limit?: number;
    include?: Prisma.CommunitySubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunitySubscriptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunitySubscriptionCreateInput, Prisma.CommunitySubscriptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunitySubscriptionUpdateInput, Prisma.CommunitySubscriptionUncheckedUpdateInput>;
};
export type CommunitySubscriptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
    where: Prisma.CommunitySubscriptionWhereUniqueInput;
};
export type CommunitySubscriptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunitySubscriptionWhereInput;
    limit?: number;
};
export type CommunitySubscriptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.CommunitySubscriptionOmit<ExtArgs> | null;
    include?: Prisma.CommunitySubscriptionInclude<ExtArgs> | null;
};
export {};
