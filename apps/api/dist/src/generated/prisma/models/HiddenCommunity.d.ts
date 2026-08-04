import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HiddenCommunityModel = runtime.Types.Result.DefaultSelection<Prisma.$HiddenCommunityPayload>;
export type AggregateHiddenCommunity = {
    _count: HiddenCommunityCountAggregateOutputType | null;
    _min: HiddenCommunityMinAggregateOutputType | null;
    _max: HiddenCommunityMaxAggregateOutputType | null;
};
export type HiddenCommunityMinAggregateOutputType = {
    userId: string | null;
    communityId: string | null;
    createdAt: Date | null;
};
export type HiddenCommunityMaxAggregateOutputType = {
    userId: string | null;
    communityId: string | null;
    createdAt: Date | null;
};
export type HiddenCommunityCountAggregateOutputType = {
    userId: number;
    communityId: number;
    createdAt: number;
    _all: number;
};
export type HiddenCommunityMinAggregateInputType = {
    userId?: true;
    communityId?: true;
    createdAt?: true;
};
export type HiddenCommunityMaxAggregateInputType = {
    userId?: true;
    communityId?: true;
    createdAt?: true;
};
export type HiddenCommunityCountAggregateInputType = {
    userId?: true;
    communityId?: true;
    createdAt?: true;
    _all?: true;
};
export type HiddenCommunityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenCommunityWhereInput;
    orderBy?: Prisma.HiddenCommunityOrderByWithRelationInput | Prisma.HiddenCommunityOrderByWithRelationInput[];
    cursor?: Prisma.HiddenCommunityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HiddenCommunityCountAggregateInputType;
    _min?: HiddenCommunityMinAggregateInputType;
    _max?: HiddenCommunityMaxAggregateInputType;
};
export type GetHiddenCommunityAggregateType<T extends HiddenCommunityAggregateArgs> = {
    [P in keyof T & keyof AggregateHiddenCommunity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHiddenCommunity[P]> : Prisma.GetScalarType<T[P], AggregateHiddenCommunity[P]>;
};
export type HiddenCommunityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenCommunityWhereInput;
    orderBy?: Prisma.HiddenCommunityOrderByWithAggregationInput | Prisma.HiddenCommunityOrderByWithAggregationInput[];
    by: Prisma.HiddenCommunityScalarFieldEnum[] | Prisma.HiddenCommunityScalarFieldEnum;
    having?: Prisma.HiddenCommunityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HiddenCommunityCountAggregateInputType | true;
    _min?: HiddenCommunityMinAggregateInputType;
    _max?: HiddenCommunityMaxAggregateInputType;
};
export type HiddenCommunityGroupByOutputType = {
    userId: string;
    communityId: string;
    createdAt: Date;
    _count: HiddenCommunityCountAggregateOutputType | null;
    _min: HiddenCommunityMinAggregateOutputType | null;
    _max: HiddenCommunityMaxAggregateOutputType | null;
};
type GetHiddenCommunityGroupByPayload<T extends HiddenCommunityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HiddenCommunityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HiddenCommunityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HiddenCommunityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HiddenCommunityGroupByOutputType[P]>;
}>>;
export type HiddenCommunityWhereInput = {
    AND?: Prisma.HiddenCommunityWhereInput | Prisma.HiddenCommunityWhereInput[];
    OR?: Prisma.HiddenCommunityWhereInput[];
    NOT?: Prisma.HiddenCommunityWhereInput | Prisma.HiddenCommunityWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    communityId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenCommunity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
};
export type HiddenCommunityOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    community?: Prisma.CommunityOrderByWithRelationInput;
};
export type HiddenCommunityWhereUniqueInput = Prisma.AtLeast<{
    userId_communityId?: Prisma.HiddenCommunityUserIdCommunityIdCompoundUniqueInput;
    AND?: Prisma.HiddenCommunityWhereInput | Prisma.HiddenCommunityWhereInput[];
    OR?: Prisma.HiddenCommunityWhereInput[];
    NOT?: Prisma.HiddenCommunityWhereInput | Prisma.HiddenCommunityWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    communityId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenCommunity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
}, "userId_communityId">;
export type HiddenCommunityOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HiddenCommunityCountOrderByAggregateInput;
    _max?: Prisma.HiddenCommunityMaxOrderByAggregateInput;
    _min?: Prisma.HiddenCommunityMinOrderByAggregateInput;
};
export type HiddenCommunityScalarWhereWithAggregatesInput = {
    AND?: Prisma.HiddenCommunityScalarWhereWithAggregatesInput | Prisma.HiddenCommunityScalarWhereWithAggregatesInput[];
    OR?: Prisma.HiddenCommunityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HiddenCommunityScalarWhereWithAggregatesInput | Prisma.HiddenCommunityScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"HiddenCommunity"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"HiddenCommunity"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HiddenCommunity"> | Date | string;
};
export type HiddenCommunityCreateInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHiddenCommunitiesInput;
    community: Prisma.CommunityCreateNestedOneWithoutHiddenByInput;
};
export type HiddenCommunityUncheckedCreateInput = {
    userId: string;
    communityId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHiddenCommunitiesNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutHiddenByNestedInput;
};
export type HiddenCommunityUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityCreateManyInput = {
    userId: string;
    communityId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityListRelationFilter = {
    every?: Prisma.HiddenCommunityWhereInput;
    some?: Prisma.HiddenCommunityWhereInput;
    none?: Prisma.HiddenCommunityWhereInput;
};
export type HiddenCommunityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HiddenCommunityUserIdCommunityIdCompoundUniqueInput = {
    userId: string;
    communityId: string;
};
export type HiddenCommunityCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenCommunityMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenCommunityMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenCommunityCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput> | Prisma.HiddenCommunityCreateWithoutUserInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutUserInput | Prisma.HiddenCommunityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HiddenCommunityCreateManyUserInputEnvelope;
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
};
export type HiddenCommunityUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput> | Prisma.HiddenCommunityCreateWithoutUserInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutUserInput | Prisma.HiddenCommunityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HiddenCommunityCreateManyUserInputEnvelope;
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
};
export type HiddenCommunityUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput> | Prisma.HiddenCommunityCreateWithoutUserInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutUserInput | Prisma.HiddenCommunityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutUserInput | Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HiddenCommunityCreateManyUserInputEnvelope;
    set?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    disconnect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    delete?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    update?: Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutUserInput | Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HiddenCommunityUpdateManyWithWhereWithoutUserInput | Prisma.HiddenCommunityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
};
export type HiddenCommunityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput> | Prisma.HiddenCommunityCreateWithoutUserInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutUserInput | Prisma.HiddenCommunityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutUserInput | Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HiddenCommunityCreateManyUserInputEnvelope;
    set?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    disconnect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    delete?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    update?: Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutUserInput | Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HiddenCommunityUpdateManyWithWhereWithoutUserInput | Prisma.HiddenCommunityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
};
export type HiddenCommunityCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput> | Prisma.HiddenCommunityCreateWithoutCommunityInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput | Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.HiddenCommunityCreateManyCommunityInputEnvelope;
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
};
export type HiddenCommunityUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput> | Prisma.HiddenCommunityCreateWithoutCommunityInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput | Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.HiddenCommunityCreateManyCommunityInputEnvelope;
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
};
export type HiddenCommunityUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput> | Prisma.HiddenCommunityCreateWithoutCommunityInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput | Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutCommunityInput | Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.HiddenCommunityCreateManyCommunityInputEnvelope;
    set?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    disconnect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    delete?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    update?: Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutCommunityInput | Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.HiddenCommunityUpdateManyWithWhereWithoutCommunityInput | Prisma.HiddenCommunityUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
};
export type HiddenCommunityUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput> | Prisma.HiddenCommunityCreateWithoutCommunityInput[] | Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput | Prisma.HiddenCommunityCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutCommunityInput | Prisma.HiddenCommunityUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.HiddenCommunityCreateManyCommunityInputEnvelope;
    set?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    disconnect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    delete?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    connect?: Prisma.HiddenCommunityWhereUniqueInput | Prisma.HiddenCommunityWhereUniqueInput[];
    update?: Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutCommunityInput | Prisma.HiddenCommunityUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.HiddenCommunityUpdateManyWithWhereWithoutCommunityInput | Prisma.HiddenCommunityUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
};
export type HiddenCommunityCreateWithoutUserInput = {
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutHiddenByInput;
};
export type HiddenCommunityUncheckedCreateWithoutUserInput = {
    communityId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityCreateOrConnectWithoutUserInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput>;
};
export type HiddenCommunityCreateManyUserInputEnvelope = {
    data: Prisma.HiddenCommunityCreateManyUserInput | Prisma.HiddenCommunityCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type HiddenCommunityUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    update: Prisma.XOR<Prisma.HiddenCommunityUpdateWithoutUserInput, Prisma.HiddenCommunityUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutUserInput, Prisma.HiddenCommunityUncheckedCreateWithoutUserInput>;
};
export type HiddenCommunityUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateWithoutUserInput, Prisma.HiddenCommunityUncheckedUpdateWithoutUserInput>;
};
export type HiddenCommunityUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.HiddenCommunityScalarWhereInput;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateManyMutationInput, Prisma.HiddenCommunityUncheckedUpdateManyWithoutUserInput>;
};
export type HiddenCommunityScalarWhereInput = {
    AND?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
    OR?: Prisma.HiddenCommunityScalarWhereInput[];
    NOT?: Prisma.HiddenCommunityScalarWhereInput | Prisma.HiddenCommunityScalarWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    communityId?: Prisma.UuidFilter<"HiddenCommunity"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenCommunity"> | Date | string;
};
export type HiddenCommunityCreateWithoutCommunityInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHiddenCommunitiesInput;
};
export type HiddenCommunityUncheckedCreateWithoutCommunityInput = {
    userId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityCreateOrConnectWithoutCommunityInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput>;
};
export type HiddenCommunityCreateManyCommunityInputEnvelope = {
    data: Prisma.HiddenCommunityCreateManyCommunityInput | Prisma.HiddenCommunityCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type HiddenCommunityUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    update: Prisma.XOR<Prisma.HiddenCommunityUpdateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.HiddenCommunityCreateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedCreateWithoutCommunityInput>;
};
export type HiddenCommunityUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.HiddenCommunityWhereUniqueInput;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateWithoutCommunityInput, Prisma.HiddenCommunityUncheckedUpdateWithoutCommunityInput>;
};
export type HiddenCommunityUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.HiddenCommunityScalarWhereInput;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateManyMutationInput, Prisma.HiddenCommunityUncheckedUpdateManyWithoutCommunityInput>;
};
export type HiddenCommunityCreateManyUserInput = {
    communityId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutHiddenByNestedInput;
};
export type HiddenCommunityUncheckedUpdateWithoutUserInput = {
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityUncheckedUpdateManyWithoutUserInput = {
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityCreateManyCommunityInput = {
    userId: string;
    createdAt?: Date | string;
};
export type HiddenCommunityUpdateWithoutCommunityInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHiddenCommunitiesNestedInput;
};
export type HiddenCommunityUncheckedUpdateWithoutCommunityInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunityUncheckedUpdateManyWithoutCommunityInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenCommunitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    communityId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenCommunity"]>;
export type HiddenCommunitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    communityId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenCommunity"]>;
export type HiddenCommunitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    communityId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenCommunity"]>;
export type HiddenCommunitySelectScalar = {
    userId?: boolean;
    communityId?: boolean;
    createdAt?: boolean;
};
export type HiddenCommunityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "communityId" | "createdAt", ExtArgs["result"]["hiddenCommunity"]>;
export type HiddenCommunityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type HiddenCommunityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type HiddenCommunityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type $HiddenCommunityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HiddenCommunity";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        community: Prisma.$CommunityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        communityId: string;
        createdAt: Date;
    }, ExtArgs["result"]["hiddenCommunity"]>;
    composites: {};
};
export type HiddenCommunityGetPayload<S extends boolean | null | undefined | HiddenCommunityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload, S>;
export type HiddenCommunityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HiddenCommunityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HiddenCommunityCountAggregateInputType | true;
};
export interface HiddenCommunityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HiddenCommunity'];
        meta: {
            name: 'HiddenCommunity';
        };
    };
    findUnique<T extends HiddenCommunityFindUniqueArgs>(args: Prisma.SelectSubset<T, HiddenCommunityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HiddenCommunityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HiddenCommunityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HiddenCommunityFindFirstArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityFindFirstArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HiddenCommunityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HiddenCommunityFindManyArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HiddenCommunityCreateArgs>(args: Prisma.SelectSubset<T, HiddenCommunityCreateArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HiddenCommunityCreateManyArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HiddenCommunityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HiddenCommunityDeleteArgs>(args: Prisma.SelectSubset<T, HiddenCommunityDeleteArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HiddenCommunityUpdateArgs>(args: Prisma.SelectSubset<T, HiddenCommunityUpdateArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HiddenCommunityDeleteManyArgs>(args?: Prisma.SelectSubset<T, HiddenCommunityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HiddenCommunityUpdateManyArgs>(args: Prisma.SelectSubset<T, HiddenCommunityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HiddenCommunityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HiddenCommunityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HiddenCommunityUpsertArgs>(args: Prisma.SelectSubset<T, HiddenCommunityUpsertArgs<ExtArgs>>): Prisma.Prisma__HiddenCommunityClient<runtime.Types.Result.GetResult<Prisma.$HiddenCommunityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HiddenCommunityCountArgs>(args?: Prisma.Subset<T, HiddenCommunityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HiddenCommunityCountAggregateOutputType> : number>;
    aggregate<T extends HiddenCommunityAggregateArgs>(args: Prisma.Subset<T, HiddenCommunityAggregateArgs>): Prisma.PrismaPromise<GetHiddenCommunityAggregateType<T>>;
    groupBy<T extends HiddenCommunityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HiddenCommunityGroupByArgs['orderBy'];
    } : {
        orderBy?: HiddenCommunityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HiddenCommunityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHiddenCommunityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HiddenCommunityFieldRefs;
}
export interface Prisma__HiddenCommunityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HiddenCommunityFieldRefs {
    readonly userId: Prisma.FieldRef<"HiddenCommunity", 'String'>;
    readonly communityId: Prisma.FieldRef<"HiddenCommunity", 'String'>;
    readonly createdAt: Prisma.FieldRef<"HiddenCommunity", 'DateTime'>;
}
export type HiddenCommunityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where: Prisma.HiddenCommunityWhereUniqueInput;
};
export type HiddenCommunityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where: Prisma.HiddenCommunityWhereUniqueInput;
};
export type HiddenCommunityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where?: Prisma.HiddenCommunityWhereInput;
    orderBy?: Prisma.HiddenCommunityOrderByWithRelationInput | Prisma.HiddenCommunityOrderByWithRelationInput[];
    cursor?: Prisma.HiddenCommunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenCommunityScalarFieldEnum | Prisma.HiddenCommunityScalarFieldEnum[];
};
export type HiddenCommunityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where?: Prisma.HiddenCommunityWhereInput;
    orderBy?: Prisma.HiddenCommunityOrderByWithRelationInput | Prisma.HiddenCommunityOrderByWithRelationInput[];
    cursor?: Prisma.HiddenCommunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenCommunityScalarFieldEnum | Prisma.HiddenCommunityScalarFieldEnum[];
};
export type HiddenCommunityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where?: Prisma.HiddenCommunityWhereInput;
    orderBy?: Prisma.HiddenCommunityOrderByWithRelationInput | Prisma.HiddenCommunityOrderByWithRelationInput[];
    cursor?: Prisma.HiddenCommunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenCommunityScalarFieldEnum | Prisma.HiddenCommunityScalarFieldEnum[];
};
export type HiddenCommunityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenCommunityCreateInput, Prisma.HiddenCommunityUncheckedCreateInput>;
};
export type HiddenCommunityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HiddenCommunityCreateManyInput | Prisma.HiddenCommunityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HiddenCommunityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    data: Prisma.HiddenCommunityCreateManyInput | Prisma.HiddenCommunityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HiddenCommunityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HiddenCommunityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateInput, Prisma.HiddenCommunityUncheckedUpdateInput>;
    where: Prisma.HiddenCommunityWhereUniqueInput;
};
export type HiddenCommunityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateManyMutationInput, Prisma.HiddenCommunityUncheckedUpdateManyInput>;
    where?: Prisma.HiddenCommunityWhereInput;
    limit?: number;
};
export type HiddenCommunityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenCommunityUpdateManyMutationInput, Prisma.HiddenCommunityUncheckedUpdateManyInput>;
    where?: Prisma.HiddenCommunityWhereInput;
    limit?: number;
    include?: Prisma.HiddenCommunityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HiddenCommunityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where: Prisma.HiddenCommunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenCommunityCreateInput, Prisma.HiddenCommunityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HiddenCommunityUpdateInput, Prisma.HiddenCommunityUncheckedUpdateInput>;
};
export type HiddenCommunityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
    where: Prisma.HiddenCommunityWhereUniqueInput;
};
export type HiddenCommunityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenCommunityWhereInput;
    limit?: number;
};
export type HiddenCommunityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenCommunitySelect<ExtArgs> | null;
    omit?: Prisma.HiddenCommunityOmit<ExtArgs> | null;
    include?: Prisma.HiddenCommunityInclude<ExtArgs> | null;
};
export {};
