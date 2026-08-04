import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkshopItemModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkshopItemPayload>;
export type AggregateWorkshopItem = {
    _count: WorkshopItemCountAggregateOutputType | null;
    _min: WorkshopItemMinAggregateOutputType | null;
    _max: WorkshopItemMaxAggregateOutputType | null;
};
export type WorkshopItemMinAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    reviewedById: string | null;
    previewMediaId: string | null;
    type: $Enums.WorkshopItemType | null;
    status: $Enums.WorkshopItemStatus | null;
    title: string | null;
    description: string | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkshopItemMaxAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    reviewedById: string | null;
    previewMediaId: string | null;
    type: $Enums.WorkshopItemType | null;
    status: $Enums.WorkshopItemStatus | null;
    title: string | null;
    description: string | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkshopItemCountAggregateOutputType = {
    id: number;
    authorId: number;
    reviewedById: number;
    previewMediaId: number;
    type: number;
    status: number;
    title: number;
    description: number;
    resolutionNote: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkshopItemMinAggregateInputType = {
    id?: true;
    authorId?: true;
    reviewedById?: true;
    previewMediaId?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkshopItemMaxAggregateInputType = {
    id?: true;
    authorId?: true;
    reviewedById?: true;
    previewMediaId?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkshopItemCountAggregateInputType = {
    id?: true;
    authorId?: true;
    reviewedById?: true;
    previewMediaId?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkshopItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopItemWhereInput;
    orderBy?: Prisma.WorkshopItemOrderByWithRelationInput | Prisma.WorkshopItemOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkshopItemCountAggregateInputType;
    _min?: WorkshopItemMinAggregateInputType;
    _max?: WorkshopItemMaxAggregateInputType;
};
export type GetWorkshopItemAggregateType<T extends WorkshopItemAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkshopItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkshopItem[P]> : Prisma.GetScalarType<T[P], AggregateWorkshopItem[P]>;
};
export type WorkshopItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopItemWhereInput;
    orderBy?: Prisma.WorkshopItemOrderByWithAggregationInput | Prisma.WorkshopItemOrderByWithAggregationInput[];
    by: Prisma.WorkshopItemScalarFieldEnum[] | Prisma.WorkshopItemScalarFieldEnum;
    having?: Prisma.WorkshopItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkshopItemCountAggregateInputType | true;
    _min?: WorkshopItemMinAggregateInputType;
    _max?: WorkshopItemMaxAggregateInputType;
};
export type WorkshopItemGroupByOutputType = {
    id: string;
    authorId: string;
    reviewedById: string | null;
    previewMediaId: string | null;
    type: $Enums.WorkshopItemType;
    status: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkshopItemCountAggregateOutputType | null;
    _min: WorkshopItemMinAggregateOutputType | null;
    _max: WorkshopItemMaxAggregateOutputType | null;
};
type GetWorkshopItemGroupByPayload<T extends WorkshopItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkshopItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkshopItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkshopItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkshopItemGroupByOutputType[P]>;
}>>;
export type WorkshopItemWhereInput = {
    AND?: Prisma.WorkshopItemWhereInput | Prisma.WorkshopItemWhereInput[];
    OR?: Prisma.WorkshopItemWhereInput[];
    NOT?: Prisma.WorkshopItemWhereInput | Prisma.WorkshopItemWhereInput[];
    id?: Prisma.UuidFilter<"WorkshopItem"> | string;
    authorId?: Prisma.UuidFilter<"WorkshopItem"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    previewMediaId?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    type?: Prisma.EnumWorkshopItemTypeFilter<"WorkshopItem"> | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFilter<"WorkshopItem"> | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFilter<"WorkshopItem"> | string;
    description?: Prisma.StringFilter<"WorkshopItem"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"WorkshopItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    previewMedia?: Prisma.XOR<Prisma.MediaAssetNullableScalarRelationFilter, Prisma.MediaAssetWhereInput> | null;
    likes?: Prisma.WorkshopLikeListRelationFilter;
    userGifts?: Prisma.UserGiftListRelationFilter;
};
export type WorkshopItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    previewMediaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
    reviewedBy?: Prisma.UserOrderByWithRelationInput;
    previewMedia?: Prisma.MediaAssetOrderByWithRelationInput;
    likes?: Prisma.WorkshopLikeOrderByRelationAggregateInput;
    userGifts?: Prisma.UserGiftOrderByRelationAggregateInput;
};
export type WorkshopItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkshopItemWhereInput | Prisma.WorkshopItemWhereInput[];
    OR?: Prisma.WorkshopItemWhereInput[];
    NOT?: Prisma.WorkshopItemWhereInput | Prisma.WorkshopItemWhereInput[];
    authorId?: Prisma.UuidFilter<"WorkshopItem"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    previewMediaId?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    type?: Prisma.EnumWorkshopItemTypeFilter<"WorkshopItem"> | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFilter<"WorkshopItem"> | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFilter<"WorkshopItem"> | string;
    description?: Prisma.StringFilter<"WorkshopItem"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"WorkshopItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    previewMedia?: Prisma.XOR<Prisma.MediaAssetNullableScalarRelationFilter, Prisma.MediaAssetWhereInput> | null;
    likes?: Prisma.WorkshopLikeListRelationFilter;
    userGifts?: Prisma.UserGiftListRelationFilter;
}, "id">;
export type WorkshopItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    previewMediaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkshopItemCountOrderByAggregateInput;
    _max?: Prisma.WorkshopItemMaxOrderByAggregateInput;
    _min?: Prisma.WorkshopItemMinOrderByAggregateInput;
};
export type WorkshopItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkshopItemScalarWhereWithAggregatesInput | Prisma.WorkshopItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkshopItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkshopItemScalarWhereWithAggregatesInput | Prisma.WorkshopItemScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"WorkshopItem"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"WorkshopItem"> | string;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"WorkshopItem"> | string | null;
    previewMediaId?: Prisma.UuidNullableWithAggregatesFilter<"WorkshopItem"> | string | null;
    type?: Prisma.EnumWorkshopItemTypeWithAggregatesFilter<"WorkshopItem"> | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusWithAggregatesFilter<"WorkshopItem"> | $Enums.WorkshopItemStatus;
    title?: Prisma.StringWithAggregatesFilter<"WorkshopItem"> | string;
    description?: Prisma.StringWithAggregatesFilter<"WorkshopItem"> | string;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"WorkshopItem"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkshopItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkshopItem"> | Date | string;
};
export type WorkshopItemCreateInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWorkshopItemsInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutWorkshopReviewsInput;
    previewMedia?: Prisma.MediaAssetCreateNestedOneWithoutWorkshopPreviewsInput;
    likes?: Prisma.WorkshopLikeCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUncheckedCreateInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.WorkshopLikeUncheckedCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftUncheckedCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWorkshopItemsNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutWorkshopReviewsNestedInput;
    previewMedia?: Prisma.MediaAssetUpdateOneWithoutWorkshopPreviewsNestedInput;
    likes?: Prisma.WorkshopLikeUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUncheckedUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemCreateManyInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkshopItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopItemListRelationFilter = {
    every?: Prisma.WorkshopItemWhereInput;
    some?: Prisma.WorkshopItemWhereInput;
    none?: Prisma.WorkshopItemWhereInput;
};
export type WorkshopItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkshopItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    previewMediaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkshopItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    previewMediaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkshopItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    previewMediaId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkshopItemScalarRelationFilter = {
    is?: Prisma.WorkshopItemWhereInput;
    isNot?: Prisma.WorkshopItemWhereInput;
};
export type WorkshopItemCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput> | Prisma.WorkshopItemCreateWithoutAuthorInput[] | Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput | Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.WorkshopItemCreateManyAuthorInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput> | Prisma.WorkshopItemCreateWithoutReviewedByInput[] | Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput | Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.WorkshopItemCreateManyReviewedByInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput> | Prisma.WorkshopItemCreateWithoutAuthorInput[] | Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput | Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.WorkshopItemCreateManyAuthorInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput> | Prisma.WorkshopItemCreateWithoutReviewedByInput[] | Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput | Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.WorkshopItemCreateManyReviewedByInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput> | Prisma.WorkshopItemCreateWithoutAuthorInput[] | Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput | Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutAuthorInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.WorkshopItemCreateManyAuthorInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutAuthorInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutAuthorInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type WorkshopItemUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput> | Prisma.WorkshopItemCreateWithoutReviewedByInput[] | Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput | Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.WorkshopItemCreateManyReviewedByInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutReviewedByInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type WorkshopItemUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput> | Prisma.WorkshopItemCreateWithoutAuthorInput[] | Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput | Prisma.WorkshopItemCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutAuthorInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.WorkshopItemCreateManyAuthorInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutAuthorInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutAuthorInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type WorkshopItemUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput> | Prisma.WorkshopItemCreateWithoutReviewedByInput[] | Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput | Prisma.WorkshopItemCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.WorkshopItemCreateManyReviewedByInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutReviewedByInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type WorkshopItemCreateNestedManyWithoutPreviewMediaInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput> | Prisma.WorkshopItemCreateWithoutPreviewMediaInput[] | Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput | Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput[];
    createMany?: Prisma.WorkshopItemCreateManyPreviewMediaInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemUncheckedCreateNestedManyWithoutPreviewMediaInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput> | Prisma.WorkshopItemCreateWithoutPreviewMediaInput[] | Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput | Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput[];
    createMany?: Prisma.WorkshopItemCreateManyPreviewMediaInputEnvelope;
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
};
export type WorkshopItemUpdateManyWithoutPreviewMediaNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput> | Prisma.WorkshopItemCreateWithoutPreviewMediaInput[] | Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput | Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutPreviewMediaInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutPreviewMediaInput[];
    createMany?: Prisma.WorkshopItemCreateManyPreviewMediaInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutPreviewMediaInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutPreviewMediaInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutPreviewMediaInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutPreviewMediaInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type WorkshopItemUncheckedUpdateManyWithoutPreviewMediaNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput> | Prisma.WorkshopItemCreateWithoutPreviewMediaInput[] | Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput[];
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput | Prisma.WorkshopItemCreateOrConnectWithoutPreviewMediaInput[];
    upsert?: Prisma.WorkshopItemUpsertWithWhereUniqueWithoutPreviewMediaInput | Prisma.WorkshopItemUpsertWithWhereUniqueWithoutPreviewMediaInput[];
    createMany?: Prisma.WorkshopItemCreateManyPreviewMediaInputEnvelope;
    set?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    disconnect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    delete?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    connect?: Prisma.WorkshopItemWhereUniqueInput | Prisma.WorkshopItemWhereUniqueInput[];
    update?: Prisma.WorkshopItemUpdateWithWhereUniqueWithoutPreviewMediaInput | Prisma.WorkshopItemUpdateWithWhereUniqueWithoutPreviewMediaInput[];
    updateMany?: Prisma.WorkshopItemUpdateManyWithWhereWithoutPreviewMediaInput | Prisma.WorkshopItemUpdateManyWithWhereWithoutPreviewMediaInput[];
    deleteMany?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
};
export type EnumWorkshopItemTypeFieldUpdateOperationsInput = {
    set?: $Enums.WorkshopItemType;
};
export type EnumWorkshopItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkshopItemStatus;
};
export type WorkshopItemCreateNestedOneWithoutLikesInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutLikesInput, Prisma.WorkshopItemUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutLikesInput;
    connect?: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemUpdateOneRequiredWithoutLikesNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutLikesInput, Prisma.WorkshopItemUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutLikesInput;
    upsert?: Prisma.WorkshopItemUpsertWithoutLikesInput;
    connect?: Prisma.WorkshopItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkshopItemUpdateToOneWithWhereWithoutLikesInput, Prisma.WorkshopItemUpdateWithoutLikesInput>, Prisma.WorkshopItemUncheckedUpdateWithoutLikesInput>;
};
export type WorkshopItemCreateNestedOneWithoutUserGiftsInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedCreateWithoutUserGiftsInput>;
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutUserGiftsInput;
    connect?: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemUpdateOneRequiredWithoutUserGiftsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkshopItemCreateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedCreateWithoutUserGiftsInput>;
    connectOrCreate?: Prisma.WorkshopItemCreateOrConnectWithoutUserGiftsInput;
    upsert?: Prisma.WorkshopItemUpsertWithoutUserGiftsInput;
    connect?: Prisma.WorkshopItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkshopItemUpdateToOneWithWhereWithoutUserGiftsInput, Prisma.WorkshopItemUpdateWithoutUserGiftsInput>, Prisma.WorkshopItemUncheckedUpdateWithoutUserGiftsInput>;
};
export type WorkshopItemCreateWithoutAuthorInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutWorkshopReviewsInput;
    previewMedia?: Prisma.MediaAssetCreateNestedOneWithoutWorkshopPreviewsInput;
    likes?: Prisma.WorkshopLikeCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUncheckedCreateWithoutAuthorInput = {
    id?: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.WorkshopLikeUncheckedCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftUncheckedCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemCreateOrConnectWithoutAuthorInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput>;
};
export type WorkshopItemCreateManyAuthorInputEnvelope = {
    data: Prisma.WorkshopItemCreateManyAuthorInput | Prisma.WorkshopItemCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type WorkshopItemCreateWithoutReviewedByInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWorkshopItemsInput;
    previewMedia?: Prisma.MediaAssetCreateNestedOneWithoutWorkshopPreviewsInput;
    likes?: Prisma.WorkshopLikeCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    authorId: string;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.WorkshopLikeUncheckedCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftUncheckedCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput>;
};
export type WorkshopItemCreateManyReviewedByInputEnvelope = {
    data: Prisma.WorkshopItemCreateManyReviewedByInput | Prisma.WorkshopItemCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type WorkshopItemUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutAuthorInput, Prisma.WorkshopItemUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutAuthorInput, Prisma.WorkshopItemUncheckedCreateWithoutAuthorInput>;
};
export type WorkshopItemUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutAuthorInput, Prisma.WorkshopItemUncheckedUpdateWithoutAuthorInput>;
};
export type WorkshopItemUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.WorkshopItemScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateManyMutationInput, Prisma.WorkshopItemUncheckedUpdateManyWithoutAuthorInput>;
};
export type WorkshopItemScalarWhereInput = {
    AND?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
    OR?: Prisma.WorkshopItemScalarWhereInput[];
    NOT?: Prisma.WorkshopItemScalarWhereInput | Prisma.WorkshopItemScalarWhereInput[];
    id?: Prisma.UuidFilter<"WorkshopItem"> | string;
    authorId?: Prisma.UuidFilter<"WorkshopItem"> | string;
    reviewedById?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    previewMediaId?: Prisma.UuidNullableFilter<"WorkshopItem"> | string | null;
    type?: Prisma.EnumWorkshopItemTypeFilter<"WorkshopItem"> | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFilter<"WorkshopItem"> | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFilter<"WorkshopItem"> | string;
    description?: Prisma.StringFilter<"WorkshopItem"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"WorkshopItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkshopItem"> | Date | string;
};
export type WorkshopItemUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedCreateWithoutReviewedByInput>;
};
export type WorkshopItemUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutReviewedByInput, Prisma.WorkshopItemUncheckedUpdateWithoutReviewedByInput>;
};
export type WorkshopItemUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.WorkshopItemScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateManyMutationInput, Prisma.WorkshopItemUncheckedUpdateManyWithoutReviewedByInput>;
};
export type WorkshopItemCreateWithoutPreviewMediaInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWorkshopItemsInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutWorkshopReviewsInput;
    likes?: Prisma.WorkshopLikeCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUncheckedCreateWithoutPreviewMediaInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.WorkshopLikeUncheckedCreateNestedManyWithoutItemInput;
    userGifts?: Prisma.UserGiftUncheckedCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemCreateOrConnectWithoutPreviewMediaInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput>;
};
export type WorkshopItemCreateManyPreviewMediaInputEnvelope = {
    data: Prisma.WorkshopItemCreateManyPreviewMediaInput | Prisma.WorkshopItemCreateManyPreviewMediaInput[];
    skipDuplicates?: boolean;
};
export type WorkshopItemUpsertWithWhereUniqueWithoutPreviewMediaInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedUpdateWithoutPreviewMediaInput>;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedCreateWithoutPreviewMediaInput>;
};
export type WorkshopItemUpdateWithWhereUniqueWithoutPreviewMediaInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutPreviewMediaInput, Prisma.WorkshopItemUncheckedUpdateWithoutPreviewMediaInput>;
};
export type WorkshopItemUpdateManyWithWhereWithoutPreviewMediaInput = {
    where: Prisma.WorkshopItemScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateManyMutationInput, Prisma.WorkshopItemUncheckedUpdateManyWithoutPreviewMediaInput>;
};
export type WorkshopItemCreateWithoutLikesInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWorkshopItemsInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutWorkshopReviewsInput;
    previewMedia?: Prisma.MediaAssetCreateNestedOneWithoutWorkshopPreviewsInput;
    userGifts?: Prisma.UserGiftCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemUncheckedCreateWithoutLikesInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userGifts?: Prisma.UserGiftUncheckedCreateNestedManyWithoutGiftInput;
};
export type WorkshopItemCreateOrConnectWithoutLikesInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutLikesInput, Prisma.WorkshopItemUncheckedCreateWithoutLikesInput>;
};
export type WorkshopItemUpsertWithoutLikesInput = {
    update: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutLikesInput, Prisma.WorkshopItemUncheckedUpdateWithoutLikesInput>;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutLikesInput, Prisma.WorkshopItemUncheckedCreateWithoutLikesInput>;
    where?: Prisma.WorkshopItemWhereInput;
};
export type WorkshopItemUpdateToOneWithWhereWithoutLikesInput = {
    where?: Prisma.WorkshopItemWhereInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutLikesInput, Prisma.WorkshopItemUncheckedUpdateWithoutLikesInput>;
};
export type WorkshopItemUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWorkshopItemsNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutWorkshopReviewsNestedInput;
    previewMedia?: Prisma.MediaAssetUpdateOneWithoutWorkshopPreviewsNestedInput;
    userGifts?: Prisma.UserGiftUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userGifts?: Prisma.UserGiftUncheckedUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemCreateWithoutUserGiftsInput = {
    id?: string;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWorkshopItemsInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutWorkshopReviewsInput;
    previewMedia?: Prisma.MediaAssetCreateNestedOneWithoutWorkshopPreviewsInput;
    likes?: Prisma.WorkshopLikeCreateNestedManyWithoutItemInput;
};
export type WorkshopItemUncheckedCreateWithoutUserGiftsInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.WorkshopLikeUncheckedCreateNestedManyWithoutItemInput;
};
export type WorkshopItemCreateOrConnectWithoutUserGiftsInput = {
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedCreateWithoutUserGiftsInput>;
};
export type WorkshopItemUpsertWithoutUserGiftsInput = {
    update: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedUpdateWithoutUserGiftsInput>;
    create: Prisma.XOR<Prisma.WorkshopItemCreateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedCreateWithoutUserGiftsInput>;
    where?: Prisma.WorkshopItemWhereInput;
};
export type WorkshopItemUpdateToOneWithWhereWithoutUserGiftsInput = {
    where?: Prisma.WorkshopItemWhereInput;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateWithoutUserGiftsInput, Prisma.WorkshopItemUncheckedUpdateWithoutUserGiftsInput>;
};
export type WorkshopItemUpdateWithoutUserGiftsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWorkshopItemsNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutWorkshopReviewsNestedInput;
    previewMedia?: Prisma.MediaAssetUpdateOneWithoutWorkshopPreviewsNestedInput;
    likes?: Prisma.WorkshopLikeUpdateManyWithoutItemNestedInput;
};
export type WorkshopItemUncheckedUpdateWithoutUserGiftsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput;
};
export type WorkshopItemCreateManyAuthorInput = {
    id?: string;
    reviewedById?: string | null;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkshopItemCreateManyReviewedByInput = {
    id?: string;
    authorId: string;
    previewMediaId?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkshopItemUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedBy?: Prisma.UserUpdateOneWithoutWorkshopReviewsNestedInput;
    previewMedia?: Prisma.MediaAssetUpdateOneWithoutWorkshopPreviewsNestedInput;
    likes?: Prisma.WorkshopLikeUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUncheckedUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopItemUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWorkshopItemsNestedInput;
    previewMedia?: Prisma.MediaAssetUpdateOneWithoutWorkshopPreviewsNestedInput;
    likes?: Prisma.WorkshopLikeUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUncheckedUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    previewMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopItemCreateManyPreviewMediaInput = {
    id?: string;
    authorId: string;
    reviewedById?: string | null;
    type: $Enums.WorkshopItemType;
    status?: $Enums.WorkshopItemStatus;
    title: string;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkshopItemUpdateWithoutPreviewMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWorkshopItemsNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutWorkshopReviewsNestedInput;
    likes?: Prisma.WorkshopLikeUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateWithoutPreviewMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.WorkshopLikeUncheckedUpdateManyWithoutItemNestedInput;
    userGifts?: Prisma.UserGiftUncheckedUpdateManyWithoutGiftNestedInput;
};
export type WorkshopItemUncheckedUpdateManyWithoutPreviewMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumWorkshopItemTypeFieldUpdateOperationsInput | $Enums.WorkshopItemType;
    status?: Prisma.EnumWorkshopItemStatusFieldUpdateOperationsInput | $Enums.WorkshopItemStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkshopItemCountOutputType = {
    likes: number;
    userGifts: number;
};
export type WorkshopItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    likes?: boolean | WorkshopItemCountOutputTypeCountLikesArgs;
    userGifts?: boolean | WorkshopItemCountOutputTypeCountUserGiftsArgs;
};
export type WorkshopItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemCountOutputTypeSelect<ExtArgs> | null;
};
export type WorkshopItemCountOutputTypeCountLikesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopLikeWhereInput;
};
export type WorkshopItemCountOutputTypeCountUserGiftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserGiftWhereInput;
};
export type WorkshopItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    reviewedById?: boolean;
    previewMediaId?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
    likes?: boolean | Prisma.WorkshopItem$likesArgs<ExtArgs>;
    userGifts?: boolean | Prisma.WorkshopItem$userGiftsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkshopItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workshopItem"]>;
export type WorkshopItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    reviewedById?: boolean;
    previewMediaId?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
}, ExtArgs["result"]["workshopItem"]>;
export type WorkshopItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    reviewedById?: boolean;
    previewMediaId?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
}, ExtArgs["result"]["workshopItem"]>;
export type WorkshopItemSelectScalar = {
    id?: boolean;
    authorId?: boolean;
    reviewedById?: boolean;
    previewMediaId?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkshopItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "authorId" | "reviewedById" | "previewMediaId" | "type" | "status" | "title" | "description" | "resolutionNote" | "createdAt" | "updatedAt", ExtArgs["result"]["workshopItem"]>;
export type WorkshopItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
    likes?: boolean | Prisma.WorkshopItem$likesArgs<ExtArgs>;
    userGifts?: boolean | Prisma.WorkshopItem$userGiftsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkshopItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkshopItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
};
export type WorkshopItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.WorkshopItem$reviewedByArgs<ExtArgs>;
    previewMedia?: boolean | Prisma.WorkshopItem$previewMediaArgs<ExtArgs>;
};
export type $WorkshopItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkshopItem";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
        reviewedBy: Prisma.$UserPayload<ExtArgs> | null;
        previewMedia: Prisma.$MediaAssetPayload<ExtArgs> | null;
        likes: Prisma.$WorkshopLikePayload<ExtArgs>[];
        userGifts: Prisma.$UserGiftPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        authorId: string;
        reviewedById: string | null;
        previewMediaId: string | null;
        type: $Enums.WorkshopItemType;
        status: $Enums.WorkshopItemStatus;
        title: string;
        description: string;
        resolutionNote: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["workshopItem"]>;
    composites: {};
};
export type WorkshopItemGetPayload<S extends boolean | null | undefined | WorkshopItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload, S>;
export type WorkshopItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkshopItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkshopItemCountAggregateInputType | true;
};
export interface WorkshopItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkshopItem'];
        meta: {
            name: 'WorkshopItem';
        };
    };
    findUnique<T extends WorkshopItemFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkshopItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkshopItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkshopItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkshopItemFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkshopItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkshopItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkshopItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkshopItemFindManyArgs>(args?: Prisma.SelectSubset<T, WorkshopItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkshopItemCreateArgs>(args: Prisma.SelectSubset<T, WorkshopItemCreateArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkshopItemCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkshopItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkshopItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkshopItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkshopItemDeleteArgs>(args: Prisma.SelectSubset<T, WorkshopItemDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkshopItemUpdateArgs>(args: Prisma.SelectSubset<T, WorkshopItemUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkshopItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkshopItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkshopItemUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkshopItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkshopItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkshopItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkshopItemUpsertArgs>(args: Prisma.SelectSubset<T, WorkshopItemUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkshopItemCountArgs>(args?: Prisma.Subset<T, WorkshopItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkshopItemCountAggregateOutputType> : number>;
    aggregate<T extends WorkshopItemAggregateArgs>(args: Prisma.Subset<T, WorkshopItemAggregateArgs>): Prisma.PrismaPromise<GetWorkshopItemAggregateType<T>>;
    groupBy<T extends WorkshopItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkshopItemGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkshopItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkshopItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkshopItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkshopItemFieldRefs;
}
export interface Prisma__WorkshopItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.WorkshopItem$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItem$reviewedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    previewMedia<T extends Prisma.WorkshopItem$previewMediaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItem$previewMediaArgs<ExtArgs>>): Prisma.Prisma__MediaAssetClient<runtime.Types.Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    likes<T extends Prisma.WorkshopItem$likesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItem$likesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkshopLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    userGifts<T extends Prisma.WorkshopItem$userGiftsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItem$userGiftsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkshopItemFieldRefs {
    readonly id: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly authorId: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly previewMediaId: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly type: Prisma.FieldRef<"WorkshopItem", 'WorkshopItemType'>;
    readonly status: Prisma.FieldRef<"WorkshopItem", 'WorkshopItemStatus'>;
    readonly title: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly description: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly resolutionNote: Prisma.FieldRef<"WorkshopItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkshopItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkshopItem", 'DateTime'>;
}
export type WorkshopItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where?: Prisma.WorkshopItemWhereInput;
    orderBy?: Prisma.WorkshopItemOrderByWithRelationInput | Prisma.WorkshopItemOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopItemScalarFieldEnum | Prisma.WorkshopItemScalarFieldEnum[];
};
export type WorkshopItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where?: Prisma.WorkshopItemWhereInput;
    orderBy?: Prisma.WorkshopItemOrderByWithRelationInput | Prisma.WorkshopItemOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopItemScalarFieldEnum | Prisma.WorkshopItemScalarFieldEnum[];
};
export type WorkshopItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where?: Prisma.WorkshopItemWhereInput;
    orderBy?: Prisma.WorkshopItemOrderByWithRelationInput | Prisma.WorkshopItemOrderByWithRelationInput[];
    cursor?: Prisma.WorkshopItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkshopItemScalarFieldEnum | Prisma.WorkshopItemScalarFieldEnum[];
};
export type WorkshopItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopItemCreateInput, Prisma.WorkshopItemUncheckedCreateInput>;
};
export type WorkshopItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkshopItemCreateManyInput | Prisma.WorkshopItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkshopItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    data: Prisma.WorkshopItemCreateManyInput | Prisma.WorkshopItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkshopItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkshopItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateInput, Prisma.WorkshopItemUncheckedUpdateInput>;
    where: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkshopItemUpdateManyMutationInput, Prisma.WorkshopItemUncheckedUpdateManyInput>;
    where?: Prisma.WorkshopItemWhereInput;
    limit?: number;
};
export type WorkshopItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkshopItemUpdateManyMutationInput, Prisma.WorkshopItemUncheckedUpdateManyInput>;
    where?: Prisma.WorkshopItemWhereInput;
    limit?: number;
    include?: Prisma.WorkshopItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkshopItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where: Prisma.WorkshopItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkshopItemCreateInput, Prisma.WorkshopItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkshopItemUpdateInput, Prisma.WorkshopItemUncheckedUpdateInput>;
};
export type WorkshopItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
    where: Prisma.WorkshopItemWhereUniqueInput;
};
export type WorkshopItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkshopItemWhereInput;
    limit?: number;
};
export type WorkshopItem$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type WorkshopItem$previewMediaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaAssetSelect<ExtArgs> | null;
    omit?: Prisma.MediaAssetOmit<ExtArgs> | null;
    include?: Prisma.MediaAssetInclude<ExtArgs> | null;
    where?: Prisma.MediaAssetWhereInput;
};
export type WorkshopItem$likesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkshopItem$userGiftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    where?: Prisma.UserGiftWhereInput;
    orderBy?: Prisma.UserGiftOrderByWithRelationInput | Prisma.UserGiftOrderByWithRelationInput[];
    cursor?: Prisma.UserGiftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserGiftScalarFieldEnum | Prisma.UserGiftScalarFieldEnum[];
};
export type WorkshopItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkshopItemSelect<ExtArgs> | null;
    omit?: Prisma.WorkshopItemOmit<ExtArgs> | null;
    include?: Prisma.WorkshopItemInclude<ExtArgs> | null;
};
export {};
