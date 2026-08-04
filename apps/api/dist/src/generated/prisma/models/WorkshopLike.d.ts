import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkshopLikeModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkshopLikePayload>;
export type AggregateWorkshopLike = {
    _count: WorkshopLikeCountAggregateOutputType | null;
    _min: WorkshopLikeMinAggregateOutputType | null;
    _max: WorkshopLikeMaxAggregateOutputType | null;
};
export type WorkshopLikeMinAggregateOutputType = {
    itemId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type WorkshopLikeMaxAggregateOutputType = {
    itemId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type WorkshopLikeCountAggregateOutputType = {
    itemId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type WorkshopLikeMinAggregateInputType = {
    itemId?: true;
    userId?: true;
    createdAt?: true;
};
export type WorkshopLikeMaxAggregateInputType = {
    itemId?: true;
    userId?: true;
    createdAt?: true;
};
export type WorkshopLikeCountAggregateInputType = {
    itemId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type WorkshopLikeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopLikeWhereInput;
    orderBy?: Prisma.WorkshopLikeOrderByWithRelationInput | Prisma.WorkshopLikeOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkshopLikeCountAggregateInputType;
    _min?: WorkshopLikeMinAggregateInputType;
    _max?: WorkshopLikeMaxAggregateInputType;
};
export type GetWorkshopLikeAggregateType<T extends WorkshopLikeAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkshopLike]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkshopLike[P]> : Prisma.GetScalarType<T[P], AggregateWorkshopLike[P]>;
};
export type WorkshopLikeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopLikeWhereInput;
    orderBy?: Prisma.WorkshopLikeOrderByWithAggregationInput | Prisma.WorkshopLikeOrderByWithAggregationInput[];
    by: Prisma.WorkshopLikeScalarFieldEnum[] | Prisma.WorkshopLikeScalarFieldEnum;
    having?: Prisma.WorkshopLikeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkshopLikeCountAggregateInputType | true;
    _min?: WorkshopLikeMinAggregateInputType;
    _max?: WorkshopLikeMaxAggregateInputType;
};
export type WorkshopLikeGroupByOutputType = {
    itemId: string;
    userId: string;
    createdAt: Date;
    _count: WorkshopLikeCountAggregateOutputType | null;
    _min: WorkshopLikeMinAggregateOutputType | null;
    _max: WorkshopLikeMaxAggregateOutputType | null;
};
type GetWorkshopLikeGroupByPayload<T extends WorkshopLikeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkshopLikeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkshopLikeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkshopLikeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkshopLikeGroupByOutputType[P]>;
}>>;
export type WorkshopLikeWhereInput = {
    AND?: Prisma.WorkshopLikeWhereInput | Prisma.WorkshopLikeWhereInput[];
    OR?: Prisma.WorkshopLikeWhereInput[];
    NOT?: Prisma.WorkshopLikeWhereInput | Prisma.WorkshopLikeWhereInput[];
    itemId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    userId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkshopLike"> | Date | string;
    item?: Prisma.XOR<Prisma.WorkshopItemScalarRelationFilter, Prisma.WorkshopItemWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type WorkshopLikeOrderByWithRelationInput = {
    itemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    item?: Prisma.WorkshopItemOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type WorkshopLikeWhereUniqueInput = Prisma.AtLeast<{
    itemId_userId?: Prisma.WorkshopLikeItemIdUserIdCompoundUniqueInput;
    AND?: Prisma.WorkshopLikeWhereInput | Prisma.WorkshopLikeWhereInput[];
    OR?: Prisma.WorkshopLikeWhereInput[];
    NOT?: Prisma.WorkshopLikeWhereInput | Prisma.WorkshopLikeWhereInput[];
    itemId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    userId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkshopLike"> | Date | string;
    item?: Prisma.XOR<Prisma.WorkshopItemScalarRelationFilter, Prisma.WorkshopItemWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "itemId_userId">;
export type WorkshopLikeOrderByWithAggregationInput = {
    itemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.WorkshopLikeCountOrderByAggregateInput;
    _max?: Prisma.WorkshopLikeMaxOrderByAggregateInput;
    _min?: Prisma.WorkshopLikeMinOrderByAggregateInput;
};
export type WorkshopLikeScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkshopLikeScalarWhereWithAggregatesInput | Prisma.WorkshopLikeScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkshopLikeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkshopLikeScalarWhereWithAggregatesInput | Prisma.WorkshopLikeScalarWhereWithAggregatesInput[];
    itemId?: Prisma.UuidWithAggregatesFilter<"WorkshopLike"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"WorkshopLike"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkshopLike"> | Date | string;
};
export type WorkshopLikeCreateInput = {
    createdAt?: Date | string;
    item: Prisma.WorkshopItemCreateNestedOneWithoutLikesInput;
    user: Prisma.UserCreateNestedOneWithoutWorkshopLikesInput;
};
export type WorkshopLikeUncheckedCreateInput = {
    itemId: string;
    userId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    item?: Prisma.WorkshopItemUpdateOneRequiredWithoutLikesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutWorkshopLikesNestedInput;
};
export type WorkshopLikeUncheckedUpdateInput = {
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeCreateManyInput = {
    itemId: string;
    userId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeUncheckedUpdateManyInput = {
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeListRelationFilter = {
    every?: Prisma.WorkshopLikeWhereInput;
    some?: Prisma.WorkshopLikeWhereInput;
    none?: Prisma.WorkshopLikeWhereInput;
};
export type WorkshopLikeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkshopLikeItemIdUserIdCompoundUniqueInput = {
    itemId: string;
    userId: string;
};
export type WorkshopLikeCountOrderByAggregateInput = {
    itemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WorkshopLikeMaxOrderByAggregateInput = {
    itemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WorkshopLikeMinOrderByAggregateInput = {
    itemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WorkshopLikeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput> | Prisma.WorkshopLikeCreateWithoutUserInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutUserInput | Prisma.WorkshopLikeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.WorkshopLikeCreateManyUserInputEnvelope;
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
};
export type WorkshopLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput> | Prisma.WorkshopLikeCreateWithoutUserInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutUserInput | Prisma.WorkshopLikeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.WorkshopLikeCreateManyUserInputEnvelope;
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
};
export type WorkshopLikeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput> | Prisma.WorkshopLikeCreateWithoutUserInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutUserInput | Prisma.WorkshopLikeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutUserInput | Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.WorkshopLikeCreateManyUserInputEnvelope;
    set?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    disconnect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    delete?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    update?: Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutUserInput | Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.WorkshopLikeUpdateManyWithWhereWithoutUserInput | Prisma.WorkshopLikeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
};
export type WorkshopLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput> | Prisma.WorkshopLikeCreateWithoutUserInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutUserInput | Prisma.WorkshopLikeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutUserInput | Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.WorkshopLikeCreateManyUserInputEnvelope;
    set?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    disconnect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    delete?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    update?: Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutUserInput | Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.WorkshopLikeUpdateManyWithWhereWithoutUserInput | Prisma.WorkshopLikeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
};
export type WorkshopLikeCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput> | Prisma.WorkshopLikeCreateWithoutItemInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutItemInput | Prisma.WorkshopLikeCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.WorkshopLikeCreateManyItemInputEnvelope;
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
};
export type WorkshopLikeUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput> | Prisma.WorkshopLikeCreateWithoutItemInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutItemInput | Prisma.WorkshopLikeCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.WorkshopLikeCreateManyItemInputEnvelope;
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
};
export type WorkshopLikeUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput> | Prisma.WorkshopLikeCreateWithoutItemInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutItemInput | Prisma.WorkshopLikeCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutItemInput | Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.WorkshopLikeCreateManyItemInputEnvelope;
    set?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    disconnect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    delete?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    update?: Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutItemInput | Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.WorkshopLikeUpdateManyWithWhereWithoutItemInput | Prisma.WorkshopLikeUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
};
export type WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput> | Prisma.WorkshopLikeCreateWithoutItemInput[] | Prisma.WorkshopLikeUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkshopLikeCreateOrConnectWithoutItemInput | Prisma.WorkshopLikeCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutItemInput | Prisma.WorkshopLikeUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.WorkshopLikeCreateManyItemInputEnvelope;
    set?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    disconnect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    delete?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    connect?: Prisma.WorkshopLikeWhereUniqueInput | Prisma.WorkshopLikeWhereUniqueInput[];
    update?: Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutItemInput | Prisma.WorkshopLikeUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.WorkshopLikeUpdateManyWithWhereWithoutItemInput | Prisma.WorkshopLikeUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
};
export type WorkshopLikeCreateWithoutUserInput = {
    createdAt?: Date | string;
    item: Prisma.WorkshopItemCreateNestedOneWithoutLikesInput;
};
export type WorkshopLikeUncheckedCreateWithoutUserInput = {
    itemId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeCreateOrConnectWithoutUserInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput>;
};
export type WorkshopLikeCreateManyUserInputEnvelope = {
    data: Prisma.WorkshopLikeCreateManyUserInput | Prisma.WorkshopLikeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type WorkshopLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkshopLikeUpdateWithoutUserInput, Prisma.WorkshopLikeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutUserInput, Prisma.WorkshopLikeUncheckedCreateWithoutUserInput>;
};
export type WorkshopLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateWithoutUserInput, Prisma.WorkshopLikeUncheckedUpdateWithoutUserInput>;
};
export type WorkshopLikeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.WorkshopLikeScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateManyMutationInput, Prisma.WorkshopLikeUncheckedUpdateManyWithoutUserInput>;
};
export type WorkshopLikeScalarWhereInput = {
    AND?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
    OR?: Prisma.WorkshopLikeScalarWhereInput[];
    NOT?: Prisma.WorkshopLikeScalarWhereInput | Prisma.WorkshopLikeScalarWhereInput[];
    itemId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    userId?: Prisma.UuidFilter<"WorkshopLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkshopLike"> | Date | string;
};
export type WorkshopLikeCreateWithoutItemInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWorkshopLikesInput;
};
export type WorkshopLikeUncheckedCreateWithoutItemInput = {
    userId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeCreateOrConnectWithoutItemInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput>;
};
export type WorkshopLikeCreateManyItemInputEnvelope = {
    data: Prisma.WorkshopLikeCreateManyItemInput | Prisma.WorkshopLikeCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type WorkshopLikeUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkshopLikeUpdateWithoutItemInput, Prisma.WorkshopLikeUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.WorkshopLikeCreateWithoutItemInput, Prisma.WorkshopLikeUncheckedCreateWithoutItemInput>;
};
export type WorkshopLikeUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.WorkshopLikeWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateWithoutItemInput, Prisma.WorkshopLikeUncheckedUpdateWithoutItemInput>;
};
export type WorkshopLikeUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.WorkshopLikeScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateManyMutationInput, Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemInput>;
};
export type WorkshopLikeCreateManyUserInput = {
    itemId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    item?: Prisma.WorkshopItemUpdateOneRequiredWithoutLikesNestedInput;
};
export type WorkshopLikeUncheckedUpdateWithoutUserInput = {
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeUncheckedUpdateManyWithoutUserInput = {
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeCreateManyItemInput = {
    userId: string;
    createdAt?: Date | string;
};
export type WorkshopLikeUpdateWithoutItemInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWorkshopLikesNestedInput;
};
export type WorkshopLikeUncheckedUpdateWithoutItemInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeUncheckedUpdateManyWithoutItemInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopLikeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    itemId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workshopLike"]>;
export type WorkshopLikeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    itemId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workshopLike"]>;
export type WorkshopLikeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    itemId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workshopLike"]>;
export type WorkshopLikeSelectScalar = {
    itemId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type WorkshopLikeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"itemId" | "userId" | "createdAt", ExtArgs["result"]["workshopLike"]>;
export type WorkshopLikeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WorkshopLikeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WorkshopLikeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $WorkshopLikePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkshopLike";
    objects: {
        item: Prisma.$WorkshopItemPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        itemId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["workshopLike"]>;
    composites: {};
};
export type WorkshopLikeGetPayload<S extends boolean | null | undefined | WorkshopLikeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload, S>;
export type WorkshopLikeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkshopLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkshopLikeCountAggregateInputType | true;
};
export interface WorkshopLikeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkshopLike'];
        meta: {
            name: 'WorkshopLike';
        };
    };
    findUnique<T extends WorkshopLikeFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkshopLikeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkshopLikeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkshopLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkshopLikeFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkshopLikeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkshopLikeFindManyArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkshopLikeCreateArgs>(args: Prisma.SelectSubset<T, WorkshopLikeCreateArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkshopLikeCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkshopLikeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkshopLikeDeleteArgs>(args: Prisma.SelectSubset<T, WorkshopLikeDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkshopLikeUpdateArgs>(args: Prisma.SelectSubset<T, WorkshopLikeUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkshopLikeDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkshopLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkshopLikeUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkshopLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkshopLikeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkshopLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkshopLikeUpsertArgs>(args: Prisma.SelectSubset<T, WorkshopLikeUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkshopLikeClient<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkshopLikeCountArgs>(args?: Prisma.Subset<T, WorkshopLikeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkshopLikeCountAggregateOutputType> : number>;
    aggregate<T extends WorkshopLikeAggregateArgs>(args: Prisma.Subset<T, WorkshopLikeAggregateArgs>): Prisma.PrismaPromise<GetWorkshopLikeAggregateType<T>>;
    groupBy<T extends WorkshopLikeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkshopLikeGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkshopLikeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkshopLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkshopLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkshopLikeFieldRefs;
}
export interface Prisma__WorkshopLikeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    item<T extends Prisma.WorkshopItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItemDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkshopLikeFieldRefs {
    readonly itemId: Prisma.FieldRef<"WorkshopLike", 'String'>;
    readonly userId: Prisma.FieldRef<"WorkshopLike", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkshopLike", 'DateTime'>;
}
export type WorkshopLikeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where: Prisma.WorkshopLikeWhereUniqueInput;
};
export type WorkshopLikeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where: Prisma.WorkshopLikeWhereUniqueInput;
};
export type WorkshopLikeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where?: Prisma.WorkshopLikeWhereInput;
    orderBy?: Prisma.WorkshopLikeOrderByWithRelationInput | Prisma.WorkshopLikeOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopLikeScalarFieldEnum | Prisma.WorkshopLikeScalarFieldEnum[];
};
export type WorkshopLikeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where?: Prisma.WorkshopLikeWhereInput;
    orderBy?: Prisma.WorkshopLikeOrderByWithRelationInput | Prisma.WorkshopLikeOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopLikeScalarFieldEnum | Prisma.WorkshopLikeScalarFieldEnum[];
};
export type WorkshopLikeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where?: Prisma.WorkshopLikeWhereInput;
    orderBy?: Prisma.WorkshopLikeOrderByWithRelationInput | Prisma.WorkshopLikeOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopLikeScalarFieldEnum | Prisma.WorkshopLikeScalarFieldEnum[];
};
export type WorkshopLikeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopLikeCreateInput, Prisma.WorkshopLikeUncheckedCreateInput>;
};
export type WorkshopLikeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkshopLikeCreateManyInput | Prisma.WorkshopLikeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkshopLikeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    data: Prisma.WorkshopLikeCreateManyInput | Prisma.WorkshopLikeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkshopLikeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkshopLikeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateInput, Prisma.WorkshopLikeUncheckedUpdateInput>;
    where: Prisma.WorkshopLikeWhereUniqueInput;
};
export type WorkshopLikeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateManyMutationInput, Prisma.WorkshopLikeUncheckedUpdateManyInput>;
    where?: Prisma.WorkshopLikeWhereInput;
    limit?: number;
};
export type WorkshopLikeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopLikeUpdateManyMutationInput, Prisma.WorkshopLikeUncheckedUpdateManyInput>;
    where?: Prisma.WorkshopLikeWhereInput;
    limit?: number;
    include?: Prisma.WorkshopLikeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkshopLikeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where: Prisma.WorkshopLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopLikeCreateInput, Prisma.WorkshopLikeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkshopLikeUpdateInput, Prisma.WorkshopLikeUncheckedUpdateInput>;
};
export type WorkshopLikeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
    where: Prisma.WorkshopLikeWhereUniqueInput;
};
export type WorkshopLikeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopLikeWhereInput;
    limit?: number;
};
export type WorkshopLikeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopLikeSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopLikeOmit<ExtArgs> | null;
    include?: Prisma.WorkshopLikeInclude<ExtArgs> | null;
};
export {};
