import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PromotionOrderModel = runtime.Types.Result.DefaultSelection<Prisma.$PromotionOrderPayload>;
export type AggregatePromotionOrder = {
    _count: PromotionOrderCountAggregateOutputType | null;
    _avg: PromotionOrderAvgAggregateOutputType | null;
    _sum: PromotionOrderSumAggregateOutputType | null;
    _min: PromotionOrderMinAggregateOutputType | null;
    _max: PromotionOrderMaxAggregateOutputType | null;
};
export type PromotionOrderAvgAggregateOutputType = {
    price: number | null;
};
export type PromotionOrderSumAggregateOutputType = {
    price: number | null;
};
export type PromotionOrderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    publicationId: string | null;
    communityId: string | null;
    type: $Enums.PromotionType | null;
    status: $Enums.PromotionOrderStatus | null;
    price: number | null;
    startsAt: Date | null;
    endsAt: Date | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    createdAt: Date | null;
};
export type PromotionOrderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    publicationId: string | null;
    communityId: string | null;
    type: $Enums.PromotionType | null;
    status: $Enums.PromotionOrderStatus | null;
    price: number | null;
    startsAt: Date | null;
    endsAt: Date | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    createdAt: Date | null;
};
export type PromotionOrderCountAggregateOutputType = {
    id: number;
    userId: number;
    publicationId: number;
    communityId: number;
    type: number;
    status: number;
    price: number;
    startsAt: number;
    endsAt: number;
    cancelledAt: number;
    cancellationReason: number;
    createdAt: number;
    _all: number;
};
export type PromotionOrderAvgAggregateInputType = {
    price?: true;
};
export type PromotionOrderSumAggregateInputType = {
    price?: true;
};
export type PromotionOrderMinAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    communityId?: true;
    type?: true;
    status?: true;
    price?: true;
    startsAt?: true;
    endsAt?: true;
    cancelledAt?: true;
    cancellationReason?: true;
    createdAt?: true;
};
export type PromotionOrderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    communityId?: true;
    type?: true;
    status?: true;
    price?: true;
    startsAt?: true;
    endsAt?: true;
    cancelledAt?: true;
    cancellationReason?: true;
    createdAt?: true;
};
export type PromotionOrderCountAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    communityId?: true;
    type?: true;
    status?: true;
    price?: true;
    startsAt?: true;
    endsAt?: true;
    cancelledAt?: true;
    cancellationReason?: true;
    createdAt?: true;
    _all?: true;
};
export type PromotionOrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionOrderWhereInput;
    orderBy?: Prisma.PromotionOrderOrderByWithRelationInput | Prisma.PromotionOrderOrderByWithRelationInput[];
    cursor?: Prisma.PromotionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PromotionOrderCountAggregateInputType;
    _avg?: PromotionOrderAvgAggregateInputType;
    _sum?: PromotionOrderSumAggregateInputType;
    _min?: PromotionOrderMinAggregateInputType;
    _max?: PromotionOrderMaxAggregateInputType;
};
export type GetPromotionOrderAggregateType<T extends PromotionOrderAggregateArgs> = {
    [P in keyof T & keyof AggregatePromotionOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePromotionOrder[P]> : Prisma.GetScalarType<T[P], AggregatePromotionOrder[P]>;
};
export type PromotionOrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionOrderWhereInput;
    orderBy?: Prisma.PromotionOrderOrderByWithAggregationInput | Prisma.PromotionOrderOrderByWithAggregationInput[];
    by: Prisma.PromotionOrderScalarFieldEnum[] | Prisma.PromotionOrderScalarFieldEnum;
    having?: Prisma.PromotionOrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromotionOrderCountAggregateInputType | true;
    _avg?: PromotionOrderAvgAggregateInputType;
    _sum?: PromotionOrderSumAggregateInputType;
    _min?: PromotionOrderMinAggregateInputType;
    _max?: PromotionOrderMaxAggregateInputType;
};
export type PromotionOrderGroupByOutputType = {
    id: string;
    userId: string;
    publicationId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date;
    endsAt: Date;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    createdAt: Date;
    _count: PromotionOrderCountAggregateOutputType | null;
    _avg: PromotionOrderAvgAggregateOutputType | null;
    _sum: PromotionOrderSumAggregateOutputType | null;
    _min: PromotionOrderMinAggregateOutputType | null;
    _max: PromotionOrderMaxAggregateOutputType | null;
};
type GetPromotionOrderGroupByPayload<T extends PromotionOrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PromotionOrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PromotionOrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PromotionOrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PromotionOrderGroupByOutputType[P]>;
}>>;
export type PromotionOrderWhereInput = {
    AND?: Prisma.PromotionOrderWhereInput | Prisma.PromotionOrderWhereInput[];
    OR?: Prisma.PromotionOrderWhereInput[];
    NOT?: Prisma.PromotionOrderWhereInput | Prisma.PromotionOrderWhereInput[];
    id?: Prisma.UuidFilter<"PromotionOrder"> | string;
    userId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    publicationId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    communityId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    type?: Prisma.EnumPromotionTypeFilter<"PromotionOrder"> | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFilter<"PromotionOrder"> | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFilter<"PromotionOrder"> | number;
    startsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    cancelledAt?: Prisma.DateTimeNullableFilter<"PromotionOrder"> | Date | string | null;
    cancellationReason?: Prisma.StringNullableFilter<"PromotionOrder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
};
export type PromotionOrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancellationReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
    community?: Prisma.CommunityOrderByWithRelationInput;
};
export type PromotionOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PromotionOrderWhereInput | Prisma.PromotionOrderWhereInput[];
    OR?: Prisma.PromotionOrderWhereInput[];
    NOT?: Prisma.PromotionOrderWhereInput | Prisma.PromotionOrderWhereInput[];
    userId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    publicationId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    communityId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    type?: Prisma.EnumPromotionTypeFilter<"PromotionOrder"> | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFilter<"PromotionOrder"> | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFilter<"PromotionOrder"> | number;
    startsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    cancelledAt?: Prisma.DateTimeNullableFilter<"PromotionOrder"> | Date | string | null;
    cancellationReason?: Prisma.StringNullableFilter<"PromotionOrder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
}, "id">;
export type PromotionOrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancellationReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PromotionOrderCountOrderByAggregateInput;
    _avg?: Prisma.PromotionOrderAvgOrderByAggregateInput;
    _max?: Prisma.PromotionOrderMaxOrderByAggregateInput;
    _min?: Prisma.PromotionOrderMinOrderByAggregateInput;
    _sum?: Prisma.PromotionOrderSumOrderByAggregateInput;
};
export type PromotionOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.PromotionOrderScalarWhereWithAggregatesInput | Prisma.PromotionOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.PromotionOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PromotionOrderScalarWhereWithAggregatesInput | Prisma.PromotionOrderScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PromotionOrder"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"PromotionOrder"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"PromotionOrder"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"PromotionOrder"> | string;
    type?: Prisma.EnumPromotionTypeWithAggregatesFilter<"PromotionOrder"> | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusWithAggregatesFilter<"PromotionOrder"> | $Enums.PromotionOrderStatus;
    price?: Prisma.IntWithAggregatesFilter<"PromotionOrder"> | number;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionOrder"> | Date | string;
    endsAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionOrder"> | Date | string;
    cancelledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PromotionOrder"> | Date | string | null;
    cancellationReason?: Prisma.StringNullableWithAggregatesFilter<"PromotionOrder"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionOrder"> | Date | string;
};
export type PromotionOrderCreateInput = {
    id?: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPromotionsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutPromotionsInput;
    community: Prisma.CommunityCreateNestedOneWithoutPromotionsInput;
};
export type PromotionOrderUncheckedCreateInput = {
    id?: string;
    userId: string;
    publicationId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPromotionsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutPromotionsNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPromotionsNestedInput;
};
export type PromotionOrderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderCreateManyInput = {
    id?: string;
    userId: string;
    publicationId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderListRelationFilter = {
    every?: Prisma.PromotionOrderWhereInput;
    some?: Prisma.PromotionOrderWhereInput;
    none?: Prisma.PromotionOrderWhereInput;
};
export type PromotionOrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PromotionOrderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    cancellationReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PromotionOrderAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type PromotionOrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    cancellationReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PromotionOrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    cancellationReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PromotionOrderSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type PromotionOrderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput> | Prisma.PromotionOrderCreateWithoutUserInput[] | Prisma.PromotionOrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutUserInput | Prisma.PromotionOrderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PromotionOrderCreateManyUserInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput> | Prisma.PromotionOrderCreateWithoutUserInput[] | Prisma.PromotionOrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutUserInput | Prisma.PromotionOrderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PromotionOrderCreateManyUserInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput> | Prisma.PromotionOrderCreateWithoutUserInput[] | Prisma.PromotionOrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutUserInput | Prisma.PromotionOrderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutUserInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PromotionOrderCreateManyUserInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutUserInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutUserInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type PromotionOrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput> | Prisma.PromotionOrderCreateWithoutUserInput[] | Prisma.PromotionOrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutUserInput | Prisma.PromotionOrderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutUserInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PromotionOrderCreateManyUserInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutUserInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutUserInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type PromotionOrderCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput> | Prisma.PromotionOrderCreateWithoutCommunityInput[] | Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput | Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.PromotionOrderCreateManyCommunityInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput> | Prisma.PromotionOrderCreateWithoutCommunityInput[] | Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput | Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.PromotionOrderCreateManyCommunityInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput> | Prisma.PromotionOrderCreateWithoutCommunityInput[] | Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput | Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutCommunityInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.PromotionOrderCreateManyCommunityInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutCommunityInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutCommunityInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type PromotionOrderUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput> | Prisma.PromotionOrderCreateWithoutCommunityInput[] | Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput | Prisma.PromotionOrderCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutCommunityInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.PromotionOrderCreateManyCommunityInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutCommunityInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutCommunityInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type PromotionOrderCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput> | Prisma.PromotionOrderCreateWithoutPublicationInput[] | Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput | Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PromotionOrderCreateManyPublicationInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput> | Prisma.PromotionOrderCreateWithoutPublicationInput[] | Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput | Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PromotionOrderCreateManyPublicationInputEnvelope;
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
};
export type PromotionOrderUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput> | Prisma.PromotionOrderCreateWithoutPublicationInput[] | Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput | Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PromotionOrderCreateManyPublicationInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutPublicationInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type PromotionOrderUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput> | Prisma.PromotionOrderCreateWithoutPublicationInput[] | Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput | Prisma.PromotionOrderCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PromotionOrderUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PromotionOrderUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PromotionOrderCreateManyPublicationInputEnvelope;
    set?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    disconnect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    delete?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    connect?: Prisma.PromotionOrderWhereUniqueInput | Prisma.PromotionOrderWhereUniqueInput[];
    update?: Prisma.PromotionOrderUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PromotionOrderUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PromotionOrderUpdateManyWithWhereWithoutPublicationInput | Prisma.PromotionOrderUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
};
export type EnumPromotionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PromotionType;
};
export type EnumPromotionOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.PromotionOrderStatus;
};
export type PromotionOrderCreateWithoutUserInput = {
    id?: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutPromotionsInput;
    community: Prisma.CommunityCreateNestedOneWithoutPromotionsInput;
};
export type PromotionOrderUncheckedCreateWithoutUserInput = {
    id?: string;
    publicationId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderCreateOrConnectWithoutUserInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput>;
};
export type PromotionOrderCreateManyUserInputEnvelope = {
    data: Prisma.PromotionOrderCreateManyUserInput | Prisma.PromotionOrderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PromotionOrderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutUserInput, Prisma.PromotionOrderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutUserInput, Prisma.PromotionOrderUncheckedCreateWithoutUserInput>;
};
export type PromotionOrderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutUserInput, Prisma.PromotionOrderUncheckedUpdateWithoutUserInput>;
};
export type PromotionOrderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PromotionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateManyMutationInput, Prisma.PromotionOrderUncheckedUpdateManyWithoutUserInput>;
};
export type PromotionOrderScalarWhereInput = {
    AND?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
    OR?: Prisma.PromotionOrderScalarWhereInput[];
    NOT?: Prisma.PromotionOrderScalarWhereInput | Prisma.PromotionOrderScalarWhereInput[];
    id?: Prisma.UuidFilter<"PromotionOrder"> | string;
    userId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    publicationId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    communityId?: Prisma.UuidFilter<"PromotionOrder"> | string;
    type?: Prisma.EnumPromotionTypeFilter<"PromotionOrder"> | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFilter<"PromotionOrder"> | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFilter<"PromotionOrder"> | number;
    startsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
    cancelledAt?: Prisma.DateTimeNullableFilter<"PromotionOrder"> | Date | string | null;
    cancellationReason?: Prisma.StringNullableFilter<"PromotionOrder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PromotionOrder"> | Date | string;
};
export type PromotionOrderCreateWithoutCommunityInput = {
    id?: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPromotionsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutPromotionsInput;
};
export type PromotionOrderUncheckedCreateWithoutCommunityInput = {
    id?: string;
    userId: string;
    publicationId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderCreateOrConnectWithoutCommunityInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput>;
};
export type PromotionOrderCreateManyCommunityInputEnvelope = {
    data: Prisma.PromotionOrderCreateManyCommunityInput | Prisma.PromotionOrderCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type PromotionOrderUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutCommunityInput, Prisma.PromotionOrderUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutCommunityInput, Prisma.PromotionOrderUncheckedCreateWithoutCommunityInput>;
};
export type PromotionOrderUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutCommunityInput, Prisma.PromotionOrderUncheckedUpdateWithoutCommunityInput>;
};
export type PromotionOrderUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.PromotionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateManyMutationInput, Prisma.PromotionOrderUncheckedUpdateManyWithoutCommunityInput>;
};
export type PromotionOrderCreateWithoutPublicationInput = {
    id?: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPromotionsInput;
    community: Prisma.CommunityCreateNestedOneWithoutPromotionsInput;
};
export type PromotionOrderUncheckedCreateWithoutPublicationInput = {
    id?: string;
    userId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderCreateOrConnectWithoutPublicationInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput>;
};
export type PromotionOrderCreateManyPublicationInputEnvelope = {
    data: Prisma.PromotionOrderCreateManyPublicationInput | Prisma.PromotionOrderCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type PromotionOrderUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutPublicationInput, Prisma.PromotionOrderUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.PromotionOrderCreateWithoutPublicationInput, Prisma.PromotionOrderUncheckedCreateWithoutPublicationInput>;
};
export type PromotionOrderUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PromotionOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateWithoutPublicationInput, Prisma.PromotionOrderUncheckedUpdateWithoutPublicationInput>;
};
export type PromotionOrderUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.PromotionOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateManyMutationInput, Prisma.PromotionOrderUncheckedUpdateManyWithoutPublicationInput>;
};
export type PromotionOrderCreateManyUserInput = {
    id?: string;
    publicationId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutPromotionsNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPromotionsNestedInput;
};
export type PromotionOrderUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderCreateManyCommunityInput = {
    id?: string;
    userId: string;
    publicationId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPromotionsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutPromotionsNestedInput;
};
export type PromotionOrderUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderCreateManyPublicationInput = {
    id?: string;
    userId: string;
    communityId: string;
    type: $Enums.PromotionType;
    status?: $Enums.PromotionOrderStatus;
    price: number;
    startsAt: Date | string;
    endsAt: Date | string;
    cancelledAt?: Date | string | null;
    cancellationReason?: string | null;
    createdAt?: Date | string;
};
export type PromotionOrderUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPromotionsNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPromotionsNestedInput;
};
export type PromotionOrderUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPromotionTypeFieldUpdateOperationsInput | $Enums.PromotionType;
    status?: Prisma.EnumPromotionOrderStatusFieldUpdateOperationsInput | $Enums.PromotionOrderStatus;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancellationReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    communityId?: boolean;
    type?: boolean;
    status?: boolean;
    price?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    cancelledAt?: boolean;
    cancellationReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionOrder"]>;
export type PromotionOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    communityId?: boolean;
    type?: boolean;
    status?: boolean;
    price?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    cancelledAt?: boolean;
    cancellationReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionOrder"]>;
export type PromotionOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    communityId?: boolean;
    type?: boolean;
    status?: boolean;
    price?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    cancelledAt?: boolean;
    cancellationReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionOrder"]>;
export type PromotionOrderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    communityId?: boolean;
    type?: boolean;
    status?: boolean;
    price?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    cancelledAt?: boolean;
    cancellationReason?: boolean;
    createdAt?: boolean;
};
export type PromotionOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "publicationId" | "communityId" | "type" | "status" | "price" | "startsAt" | "endsAt" | "cancelledAt" | "cancellationReason" | "createdAt", ExtArgs["result"]["promotionOrder"]>;
export type PromotionOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type PromotionOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type PromotionOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
};
export type $PromotionOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PromotionOrder";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs>;
        community: Prisma.$CommunityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        publicationId: string;
        communityId: string;
        type: $Enums.PromotionType;
        status: $Enums.PromotionOrderStatus;
        price: number;
        startsAt: Date;
        endsAt: Date;
        cancelledAt: Date | null;
        cancellationReason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["promotionOrder"]>;
    composites: {};
};
export type PromotionOrderGetPayload<S extends boolean | null | undefined | PromotionOrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload, S>;
export type PromotionOrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PromotionOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PromotionOrderCountAggregateInputType | true;
};
export interface PromotionOrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PromotionOrder'];
        meta: {
            name: 'PromotionOrder';
        };
    };
    findUnique<T extends PromotionOrderFindUniqueArgs>(args: Prisma.SelectSubset<T, PromotionOrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PromotionOrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PromotionOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PromotionOrderFindFirstArgs>(args?: Prisma.SelectSubset<T, PromotionOrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PromotionOrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PromotionOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PromotionOrderFindManyArgs>(args?: Prisma.SelectSubset<T, PromotionOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PromotionOrderCreateArgs>(args: Prisma.SelectSubset<T, PromotionOrderCreateArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PromotionOrderCreateManyArgs>(args?: Prisma.SelectSubset<T, PromotionOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PromotionOrderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PromotionOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PromotionOrderDeleteArgs>(args: Prisma.SelectSubset<T, PromotionOrderDeleteArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PromotionOrderUpdateArgs>(args: Prisma.SelectSubset<T, PromotionOrderUpdateArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PromotionOrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, PromotionOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PromotionOrderUpdateManyArgs>(args: Prisma.SelectSubset<T, PromotionOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PromotionOrderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PromotionOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PromotionOrderUpsertArgs>(args: Prisma.SelectSubset<T, PromotionOrderUpsertArgs<ExtArgs>>): Prisma.Prisma__PromotionOrderClient<runtime.Types.Result.GetResult<Prisma.$PromotionOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PromotionOrderCountArgs>(args?: Prisma.Subset<T, PromotionOrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PromotionOrderCountAggregateOutputType> : number>;
    aggregate<T extends PromotionOrderAggregateArgs>(args: Prisma.Subset<T, PromotionOrderAggregateArgs>): Prisma.PrismaPromise<GetPromotionOrderAggregateType<T>>;
    groupBy<T extends PromotionOrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PromotionOrderGroupByArgs['orderBy'];
    } : {
        orderBy?: PromotionOrderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PromotionOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PromotionOrderFieldRefs;
}
export interface Prisma__PromotionOrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PromotionOrderFieldRefs {
    readonly id: Prisma.FieldRef<"PromotionOrder", 'String'>;
    readonly userId: Prisma.FieldRef<"PromotionOrder", 'String'>;
    readonly publicationId: Prisma.FieldRef<"PromotionOrder", 'String'>;
    readonly communityId: Prisma.FieldRef<"PromotionOrder", 'String'>;
    readonly type: Prisma.FieldRef<"PromotionOrder", 'PromotionType'>;
    readonly status: Prisma.FieldRef<"PromotionOrder", 'PromotionOrderStatus'>;
    readonly price: Prisma.FieldRef<"PromotionOrder", 'Int'>;
    readonly startsAt: Prisma.FieldRef<"PromotionOrder", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"PromotionOrder", 'DateTime'>;
    readonly cancelledAt: Prisma.FieldRef<"PromotionOrder", 'DateTime'>;
    readonly cancellationReason: Prisma.FieldRef<"PromotionOrder", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PromotionOrder", 'DateTime'>;
}
export type PromotionOrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where: Prisma.PromotionOrderWhereUniqueInput;
};
export type PromotionOrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where: Prisma.PromotionOrderWhereUniqueInput;
};
export type PromotionOrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where?: Prisma.PromotionOrderWhereInput;
    orderBy?: Prisma.PromotionOrderOrderByWithRelationInput | Prisma.PromotionOrderOrderByWithRelationInput[];
    cursor?: Prisma.PromotionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionOrderScalarFieldEnum | Prisma.PromotionOrderScalarFieldEnum[];
};
export type PromotionOrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where?: Prisma.PromotionOrderWhereInput;
    orderBy?: Prisma.PromotionOrderOrderByWithRelationInput | Prisma.PromotionOrderOrderByWithRelationInput[];
    cursor?: Prisma.PromotionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionOrderScalarFieldEnum | Prisma.PromotionOrderScalarFieldEnum[];
};
export type PromotionOrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where?: Prisma.PromotionOrderWhereInput;
    orderBy?: Prisma.PromotionOrderOrderByWithRelationInput | Prisma.PromotionOrderOrderByWithRelationInput[];
    cursor?: Prisma.PromotionOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionOrderScalarFieldEnum | Prisma.PromotionOrderScalarFieldEnum[];
};
export type PromotionOrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionOrderCreateInput, Prisma.PromotionOrderUncheckedCreateInput>;
};
export type PromotionOrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PromotionOrderCreateManyInput | Prisma.PromotionOrderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PromotionOrderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    data: Prisma.PromotionOrderCreateManyInput | Prisma.PromotionOrderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PromotionOrderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PromotionOrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateInput, Prisma.PromotionOrderUncheckedUpdateInput>;
    where: Prisma.PromotionOrderWhereUniqueInput;
};
export type PromotionOrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PromotionOrderUpdateManyMutationInput, Prisma.PromotionOrderUncheckedUpdateManyInput>;
    where?: Prisma.PromotionOrderWhereInput;
    limit?: number;
};
export type PromotionOrderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionOrderUpdateManyMutationInput, Prisma.PromotionOrderUncheckedUpdateManyInput>;
    where?: Prisma.PromotionOrderWhereInput;
    limit?: number;
    include?: Prisma.PromotionOrderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PromotionOrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where: Prisma.PromotionOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionOrderCreateInput, Prisma.PromotionOrderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PromotionOrderUpdateInput, Prisma.PromotionOrderUncheckedUpdateInput>;
};
export type PromotionOrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
    where: Prisma.PromotionOrderWhereUniqueInput;
};
export type PromotionOrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionOrderWhereInput;
    limit?: number;
};
export type PromotionOrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionOrderSelect<ExtArgs> | null;
    omit?: Prisma.PromotionOrderOmit<ExtArgs> | null;
    include?: Prisma.PromotionOrderInclude<ExtArgs> | null;
};
export {};
