import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TagSubscriptionModel = runtime.Types.Result.DefaultSelection<Prisma.$TagSubscriptionPayload>;
export type AggregateTagSubscription = {
    _count: TagSubscriptionCountAggregateOutputType | null;
    _min: TagSubscriptionMinAggregateOutputType | null;
    _max: TagSubscriptionMaxAggregateOutputType | null;
};
export type TagSubscriptionMinAggregateOutputType = {
    userId: string | null;
    tagId: string | null;
    createdAt: Date | null;
};
export type TagSubscriptionMaxAggregateOutputType = {
    userId: string | null;
    tagId: string | null;
    createdAt: Date | null;
};
export type TagSubscriptionCountAggregateOutputType = {
    userId: number;
    tagId: number;
    createdAt: number;
    _all: number;
};
export type TagSubscriptionMinAggregateInputType = {
    userId?: true;
    tagId?: true;
    createdAt?: true;
};
export type TagSubscriptionMaxAggregateInputType = {
    userId?: true;
    tagId?: true;
    createdAt?: true;
};
export type TagSubscriptionCountAggregateInputType = {
    userId?: true;
    tagId?: true;
    createdAt?: true;
    _all?: true;
};
export type TagSubscriptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithRelationInput | Prisma.TagSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.TagSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TagSubscriptionCountAggregateInputType;
    _min?: TagSubscriptionMinAggregateInputType;
    _max?: TagSubscriptionMaxAggregateInputType;
};
export type GetTagSubscriptionAggregateType<T extends TagSubscriptionAggregateArgs> = {
    [P in keyof T & keyof AggregateTagSubscription]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTagSubscription[P]> : Prisma.GetScalarType<T[P], AggregateTagSubscription[P]>;
};
export type TagSubscriptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithAggregationInput | Prisma.TagSubscriptionOrderByWithAggregationInput[];
    by: Prisma.TagSubscriptionScalarFieldEnum[] | Prisma.TagSubscriptionScalarFieldEnum;
    having?: Prisma.TagSubscriptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TagSubscriptionCountAggregateInputType | true;
    _min?: TagSubscriptionMinAggregateInputType;
    _max?: TagSubscriptionMaxAggregateInputType;
};
export type TagSubscriptionGroupByOutputType = {
    userId: string;
    tagId: string;
    createdAt: Date;
    _count: TagSubscriptionCountAggregateOutputType | null;
    _min: TagSubscriptionMinAggregateOutputType | null;
    _max: TagSubscriptionMaxAggregateOutputType | null;
};
type GetTagSubscriptionGroupByPayload<T extends TagSubscriptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TagSubscriptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TagSubscriptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TagSubscriptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TagSubscriptionGroupByOutputType[P]>;
}>>;
export type TagSubscriptionWhereInput = {
    AND?: Prisma.TagSubscriptionWhereInput | Prisma.TagSubscriptionWhereInput[];
    OR?: Prisma.TagSubscriptionWhereInput[];
    NOT?: Prisma.TagSubscriptionWhereInput | Prisma.TagSubscriptionWhereInput[];
    userId?: Prisma.UuidFilter<"TagSubscription"> | string;
    tagId?: Prisma.UuidFilter<"TagSubscription"> | string;
    createdAt?: Prisma.DateTimeFilter<"TagSubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type TagSubscriptionOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type TagSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    userId_tagId?: Prisma.TagSubscriptionUserIdTagIdCompoundUniqueInput;
    AND?: Prisma.TagSubscriptionWhereInput | Prisma.TagSubscriptionWhereInput[];
    OR?: Prisma.TagSubscriptionWhereInput[];
    NOT?: Prisma.TagSubscriptionWhereInput | Prisma.TagSubscriptionWhereInput[];
    userId?: Prisma.UuidFilter<"TagSubscription"> | string;
    tagId?: Prisma.UuidFilter<"TagSubscription"> | string;
    createdAt?: Prisma.DateTimeFilter<"TagSubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "userId_tagId">;
export type TagSubscriptionOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TagSubscriptionCountOrderByAggregateInput;
    _max?: Prisma.TagSubscriptionMaxOrderByAggregateInput;
    _min?: Prisma.TagSubscriptionMinOrderByAggregateInput;
};
export type TagSubscriptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.TagSubscriptionScalarWhereWithAggregatesInput | Prisma.TagSubscriptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.TagSubscriptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TagSubscriptionScalarWhereWithAggregatesInput | Prisma.TagSubscriptionScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"TagSubscription"> | string;
    tagId?: Prisma.UuidWithAggregatesFilter<"TagSubscription"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TagSubscription"> | Date | string;
};
export type TagSubscriptionCreateInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTagSubscriptionsInput;
    tag: Prisma.TagCreateNestedOneWithoutSubscribersInput;
};
export type TagSubscriptionUncheckedCreateInput = {
    userId: string;
    tagId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTagSubscriptionsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutSubscribersNestedInput;
};
export type TagSubscriptionUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionCreateManyInput = {
    userId: string;
    tagId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionListRelationFilter = {
    every?: Prisma.TagSubscriptionWhereInput;
    some?: Prisma.TagSubscriptionWhereInput;
    none?: Prisma.TagSubscriptionWhereInput;
};
export type TagSubscriptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TagSubscriptionUserIdTagIdCompoundUniqueInput = {
    userId: string;
    tagId: string;
};
export type TagSubscriptionCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagSubscriptionMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagSubscriptionMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagSubscriptionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput> | Prisma.TagSubscriptionCreateWithoutUserInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutUserInput | Prisma.TagSubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TagSubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
};
export type TagSubscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput> | Prisma.TagSubscriptionCreateWithoutUserInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutUserInput | Prisma.TagSubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TagSubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
};
export type TagSubscriptionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput> | Prisma.TagSubscriptionCreateWithoutUserInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutUserInput | Prisma.TagSubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TagSubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    delete?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    update?: Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TagSubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.TagSubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
};
export type TagSubscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput> | Prisma.TagSubscriptionCreateWithoutUserInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutUserInput | Prisma.TagSubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TagSubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    delete?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    update?: Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TagSubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.TagSubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
};
export type TagSubscriptionCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput> | Prisma.TagSubscriptionCreateWithoutTagInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutTagInput | Prisma.TagSubscriptionCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.TagSubscriptionCreateManyTagInputEnvelope;
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
};
export type TagSubscriptionUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput> | Prisma.TagSubscriptionCreateWithoutTagInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutTagInput | Prisma.TagSubscriptionCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.TagSubscriptionCreateManyTagInputEnvelope;
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
};
export type TagSubscriptionUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput> | Prisma.TagSubscriptionCreateWithoutTagInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutTagInput | Prisma.TagSubscriptionCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutTagInput | Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.TagSubscriptionCreateManyTagInputEnvelope;
    set?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    delete?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    update?: Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutTagInput | Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.TagSubscriptionUpdateManyWithWhereWithoutTagInput | Prisma.TagSubscriptionUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
};
export type TagSubscriptionUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput> | Prisma.TagSubscriptionCreateWithoutTagInput[] | Prisma.TagSubscriptionUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.TagSubscriptionCreateOrConnectWithoutTagInput | Prisma.TagSubscriptionCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutTagInput | Prisma.TagSubscriptionUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.TagSubscriptionCreateManyTagInputEnvelope;
    set?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    delete?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    connect?: Prisma.TagSubscriptionWhereUniqueInput | Prisma.TagSubscriptionWhereUniqueInput[];
    update?: Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutTagInput | Prisma.TagSubscriptionUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.TagSubscriptionUpdateManyWithWhereWithoutTagInput | Prisma.TagSubscriptionUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
};
export type TagSubscriptionCreateWithoutUserInput = {
    createdAt?: Date | string;
    tag: Prisma.TagCreateNestedOneWithoutSubscribersInput;
};
export type TagSubscriptionUncheckedCreateWithoutUserInput = {
    tagId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionCreateOrConnectWithoutUserInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput>;
};
export type TagSubscriptionCreateManyUserInputEnvelope = {
    data: Prisma.TagSubscriptionCreateManyUserInput | Prisma.TagSubscriptionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TagSubscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TagSubscriptionUpdateWithoutUserInput, Prisma.TagSubscriptionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutUserInput, Prisma.TagSubscriptionUncheckedCreateWithoutUserInput>;
};
export type TagSubscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateWithoutUserInput, Prisma.TagSubscriptionUncheckedUpdateWithoutUserInput>;
};
export type TagSubscriptionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TagSubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateManyMutationInput, Prisma.TagSubscriptionUncheckedUpdateManyWithoutUserInput>;
};
export type TagSubscriptionScalarWhereInput = {
    AND?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
    OR?: Prisma.TagSubscriptionScalarWhereInput[];
    NOT?: Prisma.TagSubscriptionScalarWhereInput | Prisma.TagSubscriptionScalarWhereInput[];
    userId?: Prisma.UuidFilter<"TagSubscription"> | string;
    tagId?: Prisma.UuidFilter<"TagSubscription"> | string;
    createdAt?: Prisma.DateTimeFilter<"TagSubscription"> | Date | string;
};
export type TagSubscriptionCreateWithoutTagInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTagSubscriptionsInput;
};
export type TagSubscriptionUncheckedCreateWithoutTagInput = {
    userId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionCreateOrConnectWithoutTagInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput>;
};
export type TagSubscriptionCreateManyTagInputEnvelope = {
    data: Prisma.TagSubscriptionCreateManyTagInput | Prisma.TagSubscriptionCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type TagSubscriptionUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TagSubscriptionUpdateWithoutTagInput, Prisma.TagSubscriptionUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.TagSubscriptionCreateWithoutTagInput, Prisma.TagSubscriptionUncheckedCreateWithoutTagInput>;
};
export type TagSubscriptionUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.TagSubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateWithoutTagInput, Prisma.TagSubscriptionUncheckedUpdateWithoutTagInput>;
};
export type TagSubscriptionUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.TagSubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateManyMutationInput, Prisma.TagSubscriptionUncheckedUpdateManyWithoutTagInput>;
};
export type TagSubscriptionCreateManyUserInput = {
    tagId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tag?: Prisma.TagUpdateOneRequiredWithoutSubscribersNestedInput;
};
export type TagSubscriptionUncheckedUpdateWithoutUserInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionUncheckedUpdateManyWithoutUserInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionCreateManyTagInput = {
    userId: string;
    createdAt?: Date | string;
};
export type TagSubscriptionUpdateWithoutTagInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTagSubscriptionsNestedInput;
};
export type TagSubscriptionUncheckedUpdateWithoutTagInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionUncheckedUpdateManyWithoutTagInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagSubscriptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tagId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tagSubscription"]>;
export type TagSubscriptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tagId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tagSubscription"]>;
export type TagSubscriptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tagId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tagSubscription"]>;
export type TagSubscriptionSelectScalar = {
    userId?: boolean;
    tagId?: boolean;
    createdAt?: boolean;
};
export type TagSubscriptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "tagId" | "createdAt", ExtArgs["result"]["tagSubscription"]>;
export type TagSubscriptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type TagSubscriptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type TagSubscriptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $TagSubscriptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TagSubscription";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        tagId: string;
        createdAt: Date;
    }, ExtArgs["result"]["tagSubscription"]>;
    composites: {};
};
export type TagSubscriptionGetPayload<S extends boolean | null | undefined | TagSubscriptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload, S>;
export type TagSubscriptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TagSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TagSubscriptionCountAggregateInputType | true;
};
export interface TagSubscriptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TagSubscription'];
        meta: {
            name: 'TagSubscription';
        };
    };
    findUnique<T extends TagSubscriptionFindUniqueArgs>(args: Prisma.SelectSubset<T, TagSubscriptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TagSubscriptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TagSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TagSubscriptionFindFirstArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TagSubscriptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TagSubscriptionFindManyArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TagSubscriptionCreateArgs>(args: Prisma.SelectSubset<T, TagSubscriptionCreateArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TagSubscriptionCreateManyArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TagSubscriptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TagSubscriptionDeleteArgs>(args: Prisma.SelectSubset<T, TagSubscriptionDeleteArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TagSubscriptionUpdateArgs>(args: Prisma.SelectSubset<T, TagSubscriptionUpdateArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TagSubscriptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, TagSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TagSubscriptionUpdateManyArgs>(args: Prisma.SelectSubset<T, TagSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TagSubscriptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TagSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TagSubscriptionUpsertArgs>(args: Prisma.SelectSubset<T, TagSubscriptionUpsertArgs<ExtArgs>>): Prisma.Prisma__TagSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TagSubscriptionCountArgs>(args?: Prisma.Subset<T, TagSubscriptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TagSubscriptionCountAggregateOutputType> : number>;
    aggregate<T extends TagSubscriptionAggregateArgs>(args: Prisma.Subset<T, TagSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetTagSubscriptionAggregateType<T>>;
    groupBy<T extends TagSubscriptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TagSubscriptionGroupByArgs['orderBy'];
    } : {
        orderBy?: TagSubscriptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TagSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TagSubscriptionFieldRefs;
}
export interface Prisma__TagSubscriptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TagSubscriptionFieldRefs {
    readonly userId: Prisma.FieldRef<"TagSubscription", 'String'>;
    readonly tagId: Prisma.FieldRef<"TagSubscription", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TagSubscription", 'DateTime'>;
}
export type TagSubscriptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where: Prisma.TagSubscriptionWhereUniqueInput;
};
export type TagSubscriptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where: Prisma.TagSubscriptionWhereUniqueInput;
};
export type TagSubscriptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithRelationInput | Prisma.TagSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.TagSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagSubscriptionScalarFieldEnum | Prisma.TagSubscriptionScalarFieldEnum[];
};
export type TagSubscriptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithRelationInput | Prisma.TagSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.TagSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagSubscriptionScalarFieldEnum | Prisma.TagSubscriptionScalarFieldEnum[];
};
export type TagSubscriptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithRelationInput | Prisma.TagSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.TagSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagSubscriptionScalarFieldEnum | Prisma.TagSubscriptionScalarFieldEnum[];
};
export type TagSubscriptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagSubscriptionCreateInput, Prisma.TagSubscriptionUncheckedCreateInput>;
};
export type TagSubscriptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TagSubscriptionCreateManyInput | Prisma.TagSubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TagSubscriptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    data: Prisma.TagSubscriptionCreateManyInput | Prisma.TagSubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TagSubscriptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TagSubscriptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateInput, Prisma.TagSubscriptionUncheckedUpdateInput>;
    where: Prisma.TagSubscriptionWhereUniqueInput;
};
export type TagSubscriptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateManyMutationInput, Prisma.TagSubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.TagSubscriptionWhereInput;
    limit?: number;
};
export type TagSubscriptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagSubscriptionUpdateManyMutationInput, Prisma.TagSubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.TagSubscriptionWhereInput;
    limit?: number;
    include?: Prisma.TagSubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TagSubscriptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where: Prisma.TagSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagSubscriptionCreateInput, Prisma.TagSubscriptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TagSubscriptionUpdateInput, Prisma.TagSubscriptionUncheckedUpdateInput>;
};
export type TagSubscriptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where: Prisma.TagSubscriptionWhereUniqueInput;
};
export type TagSubscriptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagSubscriptionWhereInput;
    limit?: number;
};
export type TagSubscriptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
};
export {};
