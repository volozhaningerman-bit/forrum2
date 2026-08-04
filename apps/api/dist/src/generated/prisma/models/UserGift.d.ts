import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserGiftModel = runtime.Types.Result.DefaultSelection<Prisma.$UserGiftPayload>;
export type AggregateUserGift = {
    _count: UserGiftCountAggregateOutputType | null;
    _min: UserGiftMinAggregateOutputType | null;
    _max: UserGiftMaxAggregateOutputType | null;
};
export type UserGiftMinAggregateOutputType = {
    id: string | null;
    recipientId: string | null;
    senderId: string | null;
    giftId: string | null;
    message: string | null;
    createdAt: Date | null;
};
export type UserGiftMaxAggregateOutputType = {
    id: string | null;
    recipientId: string | null;
    senderId: string | null;
    giftId: string | null;
    message: string | null;
    createdAt: Date | null;
};
export type UserGiftCountAggregateOutputType = {
    id: number;
    recipientId: number;
    senderId: number;
    giftId: number;
    message: number;
    createdAt: number;
    _all: number;
};
export type UserGiftMinAggregateInputType = {
    id?: true;
    recipientId?: true;
    senderId?: true;
    giftId?: true;
    message?: true;
    createdAt?: true;
};
export type UserGiftMaxAggregateInputType = {
    id?: true;
    recipientId?: true;
    senderId?: true;
    giftId?: true;
    message?: true;
    createdAt?: true;
};
export type UserGiftCountAggregateInputType = {
    id?: true;
    recipientId?: true;
    senderId?: true;
    giftId?: true;
    message?: true;
    createdAt?: true;
    _all?: true;
};
export type UserGiftAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserGiftWhereInput;
    orderBy?: Prisma.UserGiftOrderByWithRelationInput | Prisma.UserGiftOrderByWithRelationInput[];
    cursor?: Prisma.UserGiftWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserGiftCountAggregateInputType;
    _min?: UserGiftMinAggregateInputType;
    _max?: UserGiftMaxAggregateInputType;
};
export type GetUserGiftAggregateType<T extends UserGiftAggregateArgs> = {
    [P in keyof T & keyof AggregateUserGift]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserGift[P]> : Prisma.GetScalarType<T[P], AggregateUserGift[P]>;
};
export type UserGiftGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserGiftWhereInput;
    orderBy?: Prisma.UserGiftOrderByWithAggregationInput | Prisma.UserGiftOrderByWithAggregationInput[];
    by: Prisma.UserGiftScalarFieldEnum[] | Prisma.UserGiftScalarFieldEnum;
    having?: Prisma.UserGiftScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserGiftCountAggregateInputType | true;
    _min?: UserGiftMinAggregateInputType;
    _max?: UserGiftMaxAggregateInputType;
};
export type UserGiftGroupByOutputType = {
    id: string;
    recipientId: string;
    senderId: string;
    giftId: string;
    message: string | null;
    createdAt: Date;
    _count: UserGiftCountAggregateOutputType | null;
    _min: UserGiftMinAggregateOutputType | null;
    _max: UserGiftMaxAggregateOutputType | null;
};
type GetUserGiftGroupByPayload<T extends UserGiftGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGiftGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGiftGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGiftGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGiftGroupByOutputType[P]>;
}>>;
export type UserGiftWhereInput = {
    AND?: Prisma.UserGiftWhereInput | Prisma.UserGiftWhereInput[];
    OR?: Prisma.UserGiftWhereInput[];
    NOT?: Prisma.UserGiftWhereInput | Prisma.UserGiftWhereInput[];
    id?: Prisma.UuidFilter<"UserGift"> | string;
    recipientId?: Prisma.UuidFilter<"UserGift"> | string;
    senderId?: Prisma.UuidFilter<"UserGift"> | string;
    giftId?: Prisma.UuidFilter<"UserGift"> | string;
    message?: Prisma.StringNullableFilter<"UserGift"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserGift"> | Date | string;
    recipient?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    gift?: Prisma.XOR<Prisma.WorkshopItemScalarRelationFilter, Prisma.WorkshopItemWhereInput>;
};
export type UserGiftOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    giftId?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipient?: Prisma.UserOrderByWithRelationInput;
    sender?: Prisma.UserOrderByWithRelationInput;
    gift?: Prisma.WorkshopItemOrderByWithRelationInput;
};
export type UserGiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.UserGiftWhereInput | Prisma.UserGiftWhereInput[];
    OR?: Prisma.UserGiftWhereInput[];
    NOT?: Prisma.UserGiftWhereInput | Prisma.UserGiftWhereInput[];
    recipientId?: Prisma.UuidFilter<"UserGift"> | string;
    senderId?: Prisma.UuidFilter<"UserGift"> | string;
    giftId?: Prisma.UuidFilter<"UserGift"> | string;
    message?: Prisma.StringNullableFilter<"UserGift"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserGift"> | Date | string;
    recipient?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    gift?: Prisma.XOR<Prisma.WorkshopItemScalarRelationFilter, Prisma.WorkshopItemWhereInput>;
}, "id">;
export type UserGiftOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    giftId?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserGiftCountOrderByAggregateInput;
    _max?: Prisma.UserGiftMaxOrderByAggregateInput;
    _min?: Prisma.UserGiftMinOrderByAggregateInput;
};
export type UserGiftScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserGiftScalarWhereWithAggregatesInput | Prisma.UserGiftScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserGiftScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserGiftScalarWhereWithAggregatesInput | Prisma.UserGiftScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"UserGift"> | string;
    recipientId?: Prisma.UuidWithAggregatesFilter<"UserGift"> | string;
    senderId?: Prisma.UuidWithAggregatesFilter<"UserGift"> | string;
    giftId?: Prisma.UuidWithAggregatesFilter<"UserGift"> | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"UserGift"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserGift"> | Date | string;
};
export type UserGiftCreateInput = {
    id?: string;
    message?: string | null;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutGiftsReceivedInput;
    sender: Prisma.UserCreateNestedOneWithoutGiftsSentInput;
    gift: Prisma.WorkshopItemCreateNestedOneWithoutUserGiftsInput;
};
export type UserGiftUncheckedCreateInput = {
    id?: string;
    recipientId: string;
    senderId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutGiftsReceivedNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutGiftsSentNestedInput;
    gift?: Prisma.WorkshopItemUpdateOneRequiredWithoutUserGiftsNestedInput;
};
export type UserGiftUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftCreateManyInput = {
    id?: string;
    recipientId: string;
    senderId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftListRelationFilter = {
    every?: Prisma.UserGiftWhereInput;
    some?: Prisma.UserGiftWhereInput;
    none?: Prisma.UserGiftWhereInput;
};
export type UserGiftOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserGiftCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    giftId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserGiftMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    giftId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserGiftMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    giftId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserGiftCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput> | Prisma.UserGiftCreateWithoutRecipientInput[] | Prisma.UserGiftUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutRecipientInput | Prisma.UserGiftCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.UserGiftCreateManyRecipientInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput> | Prisma.UserGiftCreateWithoutSenderInput[] | Prisma.UserGiftUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutSenderInput | Prisma.UserGiftCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.UserGiftCreateManySenderInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftUncheckedCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput> | Prisma.UserGiftCreateWithoutRecipientInput[] | Prisma.UserGiftUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutRecipientInput | Prisma.UserGiftCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.UserGiftCreateManyRecipientInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput> | Prisma.UserGiftCreateWithoutSenderInput[] | Prisma.UserGiftUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutSenderInput | Prisma.UserGiftCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.UserGiftCreateManySenderInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput> | Prisma.UserGiftCreateWithoutRecipientInput[] | Prisma.UserGiftUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutRecipientInput | Prisma.UserGiftCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutRecipientInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.UserGiftCreateManyRecipientInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutRecipientInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutRecipientInput | Prisma.UserGiftUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput> | Prisma.UserGiftCreateWithoutSenderInput[] | Prisma.UserGiftUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutSenderInput | Prisma.UserGiftCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutSenderInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.UserGiftCreateManySenderInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutSenderInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutSenderInput | Prisma.UserGiftUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftUncheckedUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput> | Prisma.UserGiftCreateWithoutRecipientInput[] | Prisma.UserGiftUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutRecipientInput | Prisma.UserGiftCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutRecipientInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.UserGiftCreateManyRecipientInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutRecipientInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutRecipientInput | Prisma.UserGiftUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput> | Prisma.UserGiftCreateWithoutSenderInput[] | Prisma.UserGiftUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutSenderInput | Prisma.UserGiftCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutSenderInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.UserGiftCreateManySenderInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutSenderInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutSenderInput | Prisma.UserGiftUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftCreateNestedManyWithoutGiftInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput> | Prisma.UserGiftCreateWithoutGiftInput[] | Prisma.UserGiftUncheckedCreateWithoutGiftInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutGiftInput | Prisma.UserGiftCreateOrConnectWithoutGiftInput[];
    createMany?: Prisma.UserGiftCreateManyGiftInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftUncheckedCreateNestedManyWithoutGiftInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput> | Prisma.UserGiftCreateWithoutGiftInput[] | Prisma.UserGiftUncheckedCreateWithoutGiftInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutGiftInput | Prisma.UserGiftCreateOrConnectWithoutGiftInput[];
    createMany?: Prisma.UserGiftCreateManyGiftInputEnvelope;
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
};
export type UserGiftUpdateManyWithoutGiftNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput> | Prisma.UserGiftCreateWithoutGiftInput[] | Prisma.UserGiftUncheckedCreateWithoutGiftInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutGiftInput | Prisma.UserGiftCreateOrConnectWithoutGiftInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutGiftInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutGiftInput[];
    createMany?: Prisma.UserGiftCreateManyGiftInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutGiftInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutGiftInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutGiftInput | Prisma.UserGiftUpdateManyWithWhereWithoutGiftInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftUncheckedUpdateManyWithoutGiftNestedInput = {
    create?: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput> | Prisma.UserGiftCreateWithoutGiftInput[] | Prisma.UserGiftUncheckedCreateWithoutGiftInput[];
    connectOrCreate?: Prisma.UserGiftCreateOrConnectWithoutGiftInput | Prisma.UserGiftCreateOrConnectWithoutGiftInput[];
    upsert?: Prisma.UserGiftUpsertWithWhereUniqueWithoutGiftInput | Prisma.UserGiftUpsertWithWhereUniqueWithoutGiftInput[];
    createMany?: Prisma.UserGiftCreateManyGiftInputEnvelope;
    set?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    disconnect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    delete?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    connect?: Prisma.UserGiftWhereUniqueInput | Prisma.UserGiftWhereUniqueInput[];
    update?: Prisma.UserGiftUpdateWithWhereUniqueWithoutGiftInput | Prisma.UserGiftUpdateWithWhereUniqueWithoutGiftInput[];
    updateMany?: Prisma.UserGiftUpdateManyWithWhereWithoutGiftInput | Prisma.UserGiftUpdateManyWithWhereWithoutGiftInput[];
    deleteMany?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
};
export type UserGiftCreateWithoutRecipientInput = {
    id?: string;
    message?: string | null;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutGiftsSentInput;
    gift: Prisma.WorkshopItemCreateNestedOneWithoutUserGiftsInput;
};
export type UserGiftUncheckedCreateWithoutRecipientInput = {
    id?: string;
    senderId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftCreateOrConnectWithoutRecipientInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput>;
};
export type UserGiftCreateManyRecipientInputEnvelope = {
    data: Prisma.UserGiftCreateManyRecipientInput | Prisma.UserGiftCreateManyRecipientInput[];
    skipDuplicates?: boolean;
};
export type UserGiftCreateWithoutSenderInput = {
    id?: string;
    message?: string | null;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutGiftsReceivedInput;
    gift: Prisma.WorkshopItemCreateNestedOneWithoutUserGiftsInput;
};
export type UserGiftUncheckedCreateWithoutSenderInput = {
    id?: string;
    recipientId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftCreateOrConnectWithoutSenderInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput>;
};
export type UserGiftCreateManySenderInputEnvelope = {
    data: Prisma.UserGiftCreateManySenderInput | Prisma.UserGiftCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type UserGiftUpsertWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserGiftUpdateWithoutRecipientInput, Prisma.UserGiftUncheckedUpdateWithoutRecipientInput>;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutRecipientInput, Prisma.UserGiftUncheckedCreateWithoutRecipientInput>;
};
export type UserGiftUpdateWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateWithoutRecipientInput, Prisma.UserGiftUncheckedUpdateWithoutRecipientInput>;
};
export type UserGiftUpdateManyWithWhereWithoutRecipientInput = {
    where: Prisma.UserGiftScalarWhereInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateManyMutationInput, Prisma.UserGiftUncheckedUpdateManyWithoutRecipientInput>;
};
export type UserGiftScalarWhereInput = {
    AND?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
    OR?: Prisma.UserGiftScalarWhereInput[];
    NOT?: Prisma.UserGiftScalarWhereInput | Prisma.UserGiftScalarWhereInput[];
    id?: Prisma.UuidFilter<"UserGift"> | string;
    recipientId?: Prisma.UuidFilter<"UserGift"> | string;
    senderId?: Prisma.UuidFilter<"UserGift"> | string;
    giftId?: Prisma.UuidFilter<"UserGift"> | string;
    message?: Prisma.StringNullableFilter<"UserGift"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserGift"> | Date | string;
};
export type UserGiftUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserGiftUpdateWithoutSenderInput, Prisma.UserGiftUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutSenderInput, Prisma.UserGiftUncheckedCreateWithoutSenderInput>;
};
export type UserGiftUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateWithoutSenderInput, Prisma.UserGiftUncheckedUpdateWithoutSenderInput>;
};
export type UserGiftUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.UserGiftScalarWhereInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateManyMutationInput, Prisma.UserGiftUncheckedUpdateManyWithoutSenderInput>;
};
export type UserGiftCreateWithoutGiftInput = {
    id?: string;
    message?: string | null;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutGiftsReceivedInput;
    sender: Prisma.UserCreateNestedOneWithoutGiftsSentInput;
};
export type UserGiftUncheckedCreateWithoutGiftInput = {
    id?: string;
    recipientId: string;
    senderId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftCreateOrConnectWithoutGiftInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput>;
};
export type UserGiftCreateManyGiftInputEnvelope = {
    data: Prisma.UserGiftCreateManyGiftInput | Prisma.UserGiftCreateManyGiftInput[];
    skipDuplicates?: boolean;
};
export type UserGiftUpsertWithWhereUniqueWithoutGiftInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserGiftUpdateWithoutGiftInput, Prisma.UserGiftUncheckedUpdateWithoutGiftInput>;
    create: Prisma.XOR<Prisma.UserGiftCreateWithoutGiftInput, Prisma.UserGiftUncheckedCreateWithoutGiftInput>;
};
export type UserGiftUpdateWithWhereUniqueWithoutGiftInput = {
    where: Prisma.UserGiftWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateWithoutGiftInput, Prisma.UserGiftUncheckedUpdateWithoutGiftInput>;
};
export type UserGiftUpdateManyWithWhereWithoutGiftInput = {
    where: Prisma.UserGiftScalarWhereInput;
    data: Prisma.XOR<Prisma.UserGiftUpdateManyMutationInput, Prisma.UserGiftUncheckedUpdateManyWithoutGiftInput>;
};
export type UserGiftCreateManyRecipientInput = {
    id?: string;
    senderId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftCreateManySenderInput = {
    id?: string;
    recipientId: string;
    giftId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftUpdateWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutGiftsSentNestedInput;
    gift?: Prisma.WorkshopItemUpdateOneRequiredWithoutUserGiftsNestedInput;
};
export type UserGiftUncheckedUpdateWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftUncheckedUpdateManyWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutGiftsReceivedNestedInput;
    gift?: Prisma.WorkshopItemUpdateOneRequiredWithoutUserGiftsNestedInput;
};
export type UserGiftUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    giftId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftCreateManyGiftInput = {
    id?: string;
    recipientId: string;
    senderId: string;
    message?: string | null;
    createdAt?: Date | string;
};
export type UserGiftUpdateWithoutGiftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutGiftsReceivedNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutGiftsSentNestedInput;
};
export type UserGiftUncheckedUpdateWithoutGiftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftUncheckedUpdateManyWithoutGiftInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserGiftSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    giftId?: boolean;
    message?: boolean;
    createdAt?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userGift"]>;
export type UserGiftSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    giftId?: boolean;
    message?: boolean;
    createdAt?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userGift"]>;
export type UserGiftSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    giftId?: boolean;
    message?: boolean;
    createdAt?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userGift"]>;
export type UserGiftSelectScalar = {
    id?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    giftId?: boolean;
    message?: boolean;
    createdAt?: boolean;
};
export type UserGiftOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recipientId" | "senderId" | "giftId" | "message" | "createdAt", ExtArgs["result"]["userGift"]>;
export type UserGiftInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
};
export type UserGiftIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
};
export type UserGiftIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    gift?: boolean | Prisma.WorkshopItemDefaultArgs<ExtArgs>;
};
export type $UserGiftPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserGift";
    objects: {
        recipient: Prisma.$UserPayload<ExtArgs>;
        sender: Prisma.$UserPayload<ExtArgs>;
        gift: Prisma.$WorkshopItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        recipientId: string;
        senderId: string;
        giftId: string;
        message: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["userGift"]>;
    composites: {};
};
export type UserGiftGetPayload<S extends boolean | null | undefined | UserGiftDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserGiftPayload, S>;
export type UserGiftCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserGiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserGiftCountAggregateInputType | true;
};
export interface UserGiftDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserGift'];
        meta: {
            name: 'UserGift';
        };
    };
    findUnique<T extends UserGiftFindUniqueArgs>(args: Prisma.SelectSubset<T, UserGiftFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserGiftFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserGiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserGiftFindFirstArgs>(args?: Prisma.SelectSubset<T, UserGiftFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserGiftFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserGiftFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserGiftFindManyArgs>(args?: Prisma.SelectSubset<T, UserGiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserGiftCreateArgs>(args: Prisma.SelectSubset<T, UserGiftCreateArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserGiftCreateManyArgs>(args?: Prisma.SelectSubset<T, UserGiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserGiftCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserGiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserGiftDeleteArgs>(args: Prisma.SelectSubset<T, UserGiftDeleteArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserGiftUpdateArgs>(args: Prisma.SelectSubset<T, UserGiftUpdateArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserGiftDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserGiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserGiftUpdateManyArgs>(args: Prisma.SelectSubset<T, UserGiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserGiftUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserGiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserGiftUpsertArgs>(args: Prisma.SelectSubset<T, UserGiftUpsertArgs<ExtArgs>>): Prisma.Prisma__UserGiftClient<runtime.Types.Result.GetResult<Prisma.$UserGiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserGiftCountArgs>(args?: Prisma.Subset<T, UserGiftCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserGiftCountAggregateOutputType> : number>;
    aggregate<T extends UserGiftAggregateArgs>(args: Prisma.Subset<T, UserGiftAggregateArgs>): Prisma.PrismaPromise<GetUserGiftAggregateType<T>>;
    groupBy<T extends UserGiftGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGiftGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGiftGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserGiftFieldRefs;
}
export interface Prisma__UserGiftClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    recipient<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    gift<T extends Prisma.WorkshopItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkshopItemDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkshopItemClient<runtime.Types.Result.GetResult<Prisma.$WorkshopItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserGiftFieldRefs {
    readonly id: Prisma.FieldRef<"UserGift", 'String'>;
    readonly recipientId: Prisma.FieldRef<"UserGift", 'String'>;
    readonly senderId: Prisma.FieldRef<"UserGift", 'String'>;
    readonly giftId: Prisma.FieldRef<"UserGift", 'String'>;
    readonly message: Prisma.FieldRef<"UserGift", 'String'>;
    readonly createdAt: Prisma.FieldRef<"UserGift", 'DateTime'>;
}
export type UserGiftFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    where: Prisma.UserGiftWhereUniqueInput;
};
export type UserGiftFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    where: Prisma.UserGiftWhereUniqueInput;
};
export type UserGiftFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserGiftFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserGiftFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserGiftCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserGiftCreateInput, Prisma.UserGiftUncheckedCreateInput>;
};
export type UserGiftCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserGiftCreateManyInput | Prisma.UserGiftCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserGiftCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    data: Prisma.UserGiftCreateManyInput | Prisma.UserGiftCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserGiftIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserGiftUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserGiftUpdateInput, Prisma.UserGiftUncheckedUpdateInput>;
    where: Prisma.UserGiftWhereUniqueInput;
};
export type UserGiftUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserGiftUpdateManyMutationInput, Prisma.UserGiftUncheckedUpdateManyInput>;
    where?: Prisma.UserGiftWhereInput;
    limit?: number;
};
export type UserGiftUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserGiftUpdateManyMutationInput, Prisma.UserGiftUncheckedUpdateManyInput>;
    where?: Prisma.UserGiftWhereInput;
    limit?: number;
    include?: Prisma.UserGiftIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserGiftUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    where: Prisma.UserGiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserGiftCreateInput, Prisma.UserGiftUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserGiftUpdateInput, Prisma.UserGiftUncheckedUpdateInput>;
};
export type UserGiftDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
    where: Prisma.UserGiftWhereUniqueInput;
};
export type UserGiftDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserGiftWhereInput;
    limit?: number;
};
export type UserGiftDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserGiftSelect<ExtArgs> | null;
    omit?: Prisma.UserGiftOmit<ExtArgs> | null;
    include?: Prisma.UserGiftInclude<ExtArgs> | null;
};
export {};
