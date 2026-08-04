import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TelegramChannelModel = runtime.Types.Result.DefaultSelection<Prisma.$TelegramChannelPayload>;
export type AggregateTelegramChannel = {
    _count: TelegramChannelCountAggregateOutputType | null;
    _min: TelegramChannelMinAggregateOutputType | null;
    _max: TelegramChannelMaxAggregateOutputType | null;
};
export type TelegramChannelMinAggregateOutputType = {
    id: string | null;
    ownerUserId: string | null;
    chatId: string | null;
    title: string | null;
    username: string | null;
    enabled: boolean | null;
    canPost: boolean | null;
    linkedAt: Date | null;
    lastCheckedAt: Date | null;
    updatedAt: Date | null;
};
export type TelegramChannelMaxAggregateOutputType = {
    id: string | null;
    ownerUserId: string | null;
    chatId: string | null;
    title: string | null;
    username: string | null;
    enabled: boolean | null;
    canPost: boolean | null;
    linkedAt: Date | null;
    lastCheckedAt: Date | null;
    updatedAt: Date | null;
};
export type TelegramChannelCountAggregateOutputType = {
    id: number;
    ownerUserId: number;
    chatId: number;
    title: number;
    username: number;
    enabled: number;
    canPost: number;
    linkedAt: number;
    lastCheckedAt: number;
    updatedAt: number;
    _all: number;
};
export type TelegramChannelMinAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    chatId?: true;
    title?: true;
    username?: true;
    enabled?: true;
    canPost?: true;
    linkedAt?: true;
    lastCheckedAt?: true;
    updatedAt?: true;
};
export type TelegramChannelMaxAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    chatId?: true;
    title?: true;
    username?: true;
    enabled?: true;
    canPost?: true;
    linkedAt?: true;
    lastCheckedAt?: true;
    updatedAt?: true;
};
export type TelegramChannelCountAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    chatId?: true;
    title?: true;
    username?: true;
    enabled?: true;
    canPost?: true;
    linkedAt?: true;
    lastCheckedAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TelegramChannelAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramChannelWhereInput;
    orderBy?: Prisma.TelegramChannelOrderByWithRelationInput | Prisma.TelegramChannelOrderByWithRelationInput[];
    cursor?: Prisma.TelegramChannelWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TelegramChannelCountAggregateInputType;
    _min?: TelegramChannelMinAggregateInputType;
    _max?: TelegramChannelMaxAggregateInputType;
};
export type GetTelegramChannelAggregateType<T extends TelegramChannelAggregateArgs> = {
    [P in keyof T & keyof AggregateTelegramChannel]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTelegramChannel[P]> : Prisma.GetScalarType<T[P], AggregateTelegramChannel[P]>;
};
export type TelegramChannelGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramChannelWhereInput;
    orderBy?: Prisma.TelegramChannelOrderByWithAggregationInput | Prisma.TelegramChannelOrderByWithAggregationInput[];
    by: Prisma.TelegramChannelScalarFieldEnum[] | Prisma.TelegramChannelScalarFieldEnum;
    having?: Prisma.TelegramChannelScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TelegramChannelCountAggregateInputType | true;
    _min?: TelegramChannelMinAggregateInputType;
    _max?: TelegramChannelMaxAggregateInputType;
};
export type TelegramChannelGroupByOutputType = {
    id: string;
    ownerUserId: string;
    chatId: string;
    title: string;
    username: string | null;
    enabled: boolean;
    canPost: boolean;
    linkedAt: Date;
    lastCheckedAt: Date | null;
    updatedAt: Date;
    _count: TelegramChannelCountAggregateOutputType | null;
    _min: TelegramChannelMinAggregateOutputType | null;
    _max: TelegramChannelMaxAggregateOutputType | null;
};
type GetTelegramChannelGroupByPayload<T extends TelegramChannelGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TelegramChannelGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TelegramChannelGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TelegramChannelGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TelegramChannelGroupByOutputType[P]>;
}>>;
export type TelegramChannelWhereInput = {
    AND?: Prisma.TelegramChannelWhereInput | Prisma.TelegramChannelWhereInput[];
    OR?: Prisma.TelegramChannelWhereInput[];
    NOT?: Prisma.TelegramChannelWhereInput | Prisma.TelegramChannelWhereInput[];
    id?: Prisma.UuidFilter<"TelegramChannel"> | string;
    ownerUserId?: Prisma.UuidFilter<"TelegramChannel"> | string;
    chatId?: Prisma.StringFilter<"TelegramChannel"> | string;
    title?: Prisma.StringFilter<"TelegramChannel"> | string;
    username?: Prisma.StringNullableFilter<"TelegramChannel"> | string | null;
    enabled?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    canPost?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    linkedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
    lastCheckedAt?: Prisma.DateTimeNullableFilter<"TelegramChannel"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    shares?: Prisma.TelegramShareListRelationFilter;
};
export type TelegramChannelOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    canPost?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastCheckedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    shares?: Prisma.TelegramShareOrderByRelationAggregateInput;
};
export type TelegramChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    chatId?: string;
    AND?: Prisma.TelegramChannelWhereInput | Prisma.TelegramChannelWhereInput[];
    OR?: Prisma.TelegramChannelWhereInput[];
    NOT?: Prisma.TelegramChannelWhereInput | Prisma.TelegramChannelWhereInput[];
    ownerUserId?: Prisma.UuidFilter<"TelegramChannel"> | string;
    title?: Prisma.StringFilter<"TelegramChannel"> | string;
    username?: Prisma.StringNullableFilter<"TelegramChannel"> | string | null;
    enabled?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    canPost?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    linkedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
    lastCheckedAt?: Prisma.DateTimeNullableFilter<"TelegramChannel"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    shares?: Prisma.TelegramShareListRelationFilter;
}, "id" | "chatId">;
export type TelegramChannelOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    canPost?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastCheckedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TelegramChannelCountOrderByAggregateInput;
    _max?: Prisma.TelegramChannelMaxOrderByAggregateInput;
    _min?: Prisma.TelegramChannelMinOrderByAggregateInput;
};
export type TelegramChannelScalarWhereWithAggregatesInput = {
    AND?: Prisma.TelegramChannelScalarWhereWithAggregatesInput | Prisma.TelegramChannelScalarWhereWithAggregatesInput[];
    OR?: Prisma.TelegramChannelScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TelegramChannelScalarWhereWithAggregatesInput | Prisma.TelegramChannelScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TelegramChannel"> | string;
    ownerUserId?: Prisma.UuidWithAggregatesFilter<"TelegramChannel"> | string;
    chatId?: Prisma.StringWithAggregatesFilter<"TelegramChannel"> | string;
    title?: Prisma.StringWithAggregatesFilter<"TelegramChannel"> | string;
    username?: Prisma.StringNullableWithAggregatesFilter<"TelegramChannel"> | string | null;
    enabled?: Prisma.BoolWithAggregatesFilter<"TelegramChannel"> | boolean;
    canPost?: Prisma.BoolWithAggregatesFilter<"TelegramChannel"> | boolean;
    linkedAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramChannel"> | Date | string;
    lastCheckedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TelegramChannel"> | Date | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramChannel"> | Date | string;
};
export type TelegramChannelCreateInput = {
    id?: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutTelegramChannelsInput;
    shares?: Prisma.TelegramShareCreateNestedManyWithoutChannelInput;
};
export type TelegramChannelUncheckedCreateInput = {
    id?: string;
    ownerUserId: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
    shares?: Prisma.TelegramShareUncheckedCreateNestedManyWithoutChannelInput;
};
export type TelegramChannelUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutTelegramChannelsNestedInput;
    shares?: Prisma.TelegramShareUpdateManyWithoutChannelNestedInput;
};
export type TelegramChannelUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.TelegramShareUncheckedUpdateManyWithoutChannelNestedInput;
};
export type TelegramChannelCreateManyInput = {
    id?: string;
    ownerUserId: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type TelegramChannelUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramChannelUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramChannelListRelationFilter = {
    every?: Prisma.TelegramChannelWhereInput;
    some?: Prisma.TelegramChannelWhereInput;
    none?: Prisma.TelegramChannelWhereInput;
};
export type TelegramChannelOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TelegramChannelCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    canPost?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastCheckedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TelegramChannelMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    canPost?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastCheckedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TelegramChannelMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    canPost?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastCheckedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TelegramChannelScalarRelationFilter = {
    is?: Prisma.TelegramChannelWhereInput;
    isNot?: Prisma.TelegramChannelWhereInput;
};
export type TelegramChannelCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput> | Prisma.TelegramChannelCreateWithoutOwnerInput[] | Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput | Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.TelegramChannelCreateManyOwnerInputEnvelope;
    connect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
};
export type TelegramChannelUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput> | Prisma.TelegramChannelCreateWithoutOwnerInput[] | Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput | Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.TelegramChannelCreateManyOwnerInputEnvelope;
    connect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
};
export type TelegramChannelUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput> | Prisma.TelegramChannelCreateWithoutOwnerInput[] | Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput | Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.TelegramChannelUpsertWithWhereUniqueWithoutOwnerInput | Prisma.TelegramChannelUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.TelegramChannelCreateManyOwnerInputEnvelope;
    set?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    disconnect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    delete?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    connect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    update?: Prisma.TelegramChannelUpdateWithWhereUniqueWithoutOwnerInput | Prisma.TelegramChannelUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.TelegramChannelUpdateManyWithWhereWithoutOwnerInput | Prisma.TelegramChannelUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.TelegramChannelScalarWhereInput | Prisma.TelegramChannelScalarWhereInput[];
};
export type TelegramChannelUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput> | Prisma.TelegramChannelCreateWithoutOwnerInput[] | Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput | Prisma.TelegramChannelCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.TelegramChannelUpsertWithWhereUniqueWithoutOwnerInput | Prisma.TelegramChannelUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.TelegramChannelCreateManyOwnerInputEnvelope;
    set?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    disconnect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    delete?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    connect?: Prisma.TelegramChannelWhereUniqueInput | Prisma.TelegramChannelWhereUniqueInput[];
    update?: Prisma.TelegramChannelUpdateWithWhereUniqueWithoutOwnerInput | Prisma.TelegramChannelUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.TelegramChannelUpdateManyWithWhereWithoutOwnerInput | Prisma.TelegramChannelUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.TelegramChannelScalarWhereInput | Prisma.TelegramChannelScalarWhereInput[];
};
export type TelegramChannelCreateNestedOneWithoutSharesInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutSharesInput, Prisma.TelegramChannelUncheckedCreateWithoutSharesInput>;
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutSharesInput;
    connect?: Prisma.TelegramChannelWhereUniqueInput;
};
export type TelegramChannelUpdateOneRequiredWithoutSharesNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramChannelCreateWithoutSharesInput, Prisma.TelegramChannelUncheckedCreateWithoutSharesInput>;
    connectOrCreate?: Prisma.TelegramChannelCreateOrConnectWithoutSharesInput;
    upsert?: Prisma.TelegramChannelUpsertWithoutSharesInput;
    connect?: Prisma.TelegramChannelWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TelegramChannelUpdateToOneWithWhereWithoutSharesInput, Prisma.TelegramChannelUpdateWithoutSharesInput>, Prisma.TelegramChannelUncheckedUpdateWithoutSharesInput>;
};
export type TelegramChannelCreateWithoutOwnerInput = {
    id?: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
    shares?: Prisma.TelegramShareCreateNestedManyWithoutChannelInput;
};
export type TelegramChannelUncheckedCreateWithoutOwnerInput = {
    id?: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
    shares?: Prisma.TelegramShareUncheckedCreateNestedManyWithoutChannelInput;
};
export type TelegramChannelCreateOrConnectWithoutOwnerInput = {
    where: Prisma.TelegramChannelWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput>;
};
export type TelegramChannelCreateManyOwnerInputEnvelope = {
    data: Prisma.TelegramChannelCreateManyOwnerInput | Prisma.TelegramChannelCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type TelegramChannelUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.TelegramChannelWhereUniqueInput;
    update: Prisma.XOR<Prisma.TelegramChannelUpdateWithoutOwnerInput, Prisma.TelegramChannelUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.TelegramChannelCreateWithoutOwnerInput, Prisma.TelegramChannelUncheckedCreateWithoutOwnerInput>;
};
export type TelegramChannelUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.TelegramChannelWhereUniqueInput;
    data: Prisma.XOR<Prisma.TelegramChannelUpdateWithoutOwnerInput, Prisma.TelegramChannelUncheckedUpdateWithoutOwnerInput>;
};
export type TelegramChannelUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.TelegramChannelScalarWhereInput;
    data: Prisma.XOR<Prisma.TelegramChannelUpdateManyMutationInput, Prisma.TelegramChannelUncheckedUpdateManyWithoutOwnerInput>;
};
export type TelegramChannelScalarWhereInput = {
    AND?: Prisma.TelegramChannelScalarWhereInput | Prisma.TelegramChannelScalarWhereInput[];
    OR?: Prisma.TelegramChannelScalarWhereInput[];
    NOT?: Prisma.TelegramChannelScalarWhereInput | Prisma.TelegramChannelScalarWhereInput[];
    id?: Prisma.UuidFilter<"TelegramChannel"> | string;
    ownerUserId?: Prisma.UuidFilter<"TelegramChannel"> | string;
    chatId?: Prisma.StringFilter<"TelegramChannel"> | string;
    title?: Prisma.StringFilter<"TelegramChannel"> | string;
    username?: Prisma.StringNullableFilter<"TelegramChannel"> | string | null;
    enabled?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    canPost?: Prisma.BoolFilter<"TelegramChannel"> | boolean;
    linkedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
    lastCheckedAt?: Prisma.DateTimeNullableFilter<"TelegramChannel"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"TelegramChannel"> | Date | string;
};
export type TelegramChannelCreateWithoutSharesInput = {
    id?: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutTelegramChannelsInput;
};
export type TelegramChannelUncheckedCreateWithoutSharesInput = {
    id?: string;
    ownerUserId: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type TelegramChannelCreateOrConnectWithoutSharesInput = {
    where: Prisma.TelegramChannelWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramChannelCreateWithoutSharesInput, Prisma.TelegramChannelUncheckedCreateWithoutSharesInput>;
};
export type TelegramChannelUpsertWithoutSharesInput = {
    update: Prisma.XOR<Prisma.TelegramChannelUpdateWithoutSharesInput, Prisma.TelegramChannelUncheckedUpdateWithoutSharesInput>;
    create: Prisma.XOR<Prisma.TelegramChannelCreateWithoutSharesInput, Prisma.TelegramChannelUncheckedCreateWithoutSharesInput>;
    where?: Prisma.TelegramChannelWhereInput;
};
export type TelegramChannelUpdateToOneWithWhereWithoutSharesInput = {
    where?: Prisma.TelegramChannelWhereInput;
    data: Prisma.XOR<Prisma.TelegramChannelUpdateWithoutSharesInput, Prisma.TelegramChannelUncheckedUpdateWithoutSharesInput>;
};
export type TelegramChannelUpdateWithoutSharesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutTelegramChannelsNestedInput;
};
export type TelegramChannelUncheckedUpdateWithoutSharesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramChannelCreateManyOwnerInput = {
    id?: string;
    chatId: string;
    title: string;
    username?: string | null;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: Date | string;
    lastCheckedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type TelegramChannelUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.TelegramShareUpdateManyWithoutChannelNestedInput;
};
export type TelegramChannelUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.TelegramShareUncheckedUpdateManyWithoutChannelNestedInput;
};
export type TelegramChannelUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canPost?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastCheckedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramChannelCountOutputType = {
    shares: number;
};
export type TelegramChannelCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shares?: boolean | TelegramChannelCountOutputTypeCountSharesArgs;
};
export type TelegramChannelCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelCountOutputTypeSelect<ExtArgs> | null;
};
export type TelegramChannelCountOutputTypeCountSharesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramShareWhereInput;
};
export type TelegramChannelSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    chatId?: boolean;
    title?: boolean;
    username?: boolean;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: boolean;
    lastCheckedAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    shares?: boolean | Prisma.TelegramChannel$sharesArgs<ExtArgs>;
    _count?: boolean | Prisma.TelegramChannelCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramChannel"]>;
export type TelegramChannelSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    chatId?: boolean;
    title?: boolean;
    username?: boolean;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: boolean;
    lastCheckedAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramChannel"]>;
export type TelegramChannelSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    chatId?: boolean;
    title?: boolean;
    username?: boolean;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: boolean;
    lastCheckedAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramChannel"]>;
export type TelegramChannelSelectScalar = {
    id?: boolean;
    ownerUserId?: boolean;
    chatId?: boolean;
    title?: boolean;
    username?: boolean;
    enabled?: boolean;
    canPost?: boolean;
    linkedAt?: boolean;
    lastCheckedAt?: boolean;
    updatedAt?: boolean;
};
export type TelegramChannelOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ownerUserId" | "chatId" | "title" | "username" | "enabled" | "canPost" | "linkedAt" | "lastCheckedAt" | "updatedAt", ExtArgs["result"]["telegramChannel"]>;
export type TelegramChannelInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    shares?: boolean | Prisma.TelegramChannel$sharesArgs<ExtArgs>;
    _count?: boolean | Prisma.TelegramChannelCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TelegramChannelIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TelegramChannelIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TelegramChannelPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TelegramChannel";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs>;
        shares: Prisma.$TelegramSharePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        ownerUserId: string;
        chatId: string;
        title: string;
        username: string | null;
        enabled: boolean;
        canPost: boolean;
        linkedAt: Date;
        lastCheckedAt: Date | null;
        updatedAt: Date;
    }, ExtArgs["result"]["telegramChannel"]>;
    composites: {};
};
export type TelegramChannelGetPayload<S extends boolean | null | undefined | TelegramChannelDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload, S>;
export type TelegramChannelCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TelegramChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TelegramChannelCountAggregateInputType | true;
};
export interface TelegramChannelDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TelegramChannel'];
        meta: {
            name: 'TelegramChannel';
        };
    };
    findUnique<T extends TelegramChannelFindUniqueArgs>(args: Prisma.SelectSubset<T, TelegramChannelFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TelegramChannelFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TelegramChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TelegramChannelFindFirstArgs>(args?: Prisma.SelectSubset<T, TelegramChannelFindFirstArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TelegramChannelFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TelegramChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TelegramChannelFindManyArgs>(args?: Prisma.SelectSubset<T, TelegramChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TelegramChannelCreateArgs>(args: Prisma.SelectSubset<T, TelegramChannelCreateArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TelegramChannelCreateManyArgs>(args?: Prisma.SelectSubset<T, TelegramChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TelegramChannelCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TelegramChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TelegramChannelDeleteArgs>(args: Prisma.SelectSubset<T, TelegramChannelDeleteArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TelegramChannelUpdateArgs>(args: Prisma.SelectSubset<T, TelegramChannelUpdateArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TelegramChannelDeleteManyArgs>(args?: Prisma.SelectSubset<T, TelegramChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TelegramChannelUpdateManyArgs>(args: Prisma.SelectSubset<T, TelegramChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TelegramChannelUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TelegramChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TelegramChannelUpsertArgs>(args: Prisma.SelectSubset<T, TelegramChannelUpsertArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TelegramChannelCountArgs>(args?: Prisma.Subset<T, TelegramChannelCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TelegramChannelCountAggregateOutputType> : number>;
    aggregate<T extends TelegramChannelAggregateArgs>(args: Prisma.Subset<T, TelegramChannelAggregateArgs>): Prisma.PrismaPromise<GetTelegramChannelAggregateType<T>>;
    groupBy<T extends TelegramChannelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TelegramChannelGroupByArgs['orderBy'];
    } : {
        orderBy?: TelegramChannelGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TelegramChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TelegramChannelFieldRefs;
}
export interface Prisma__TelegramChannelClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    shares<T extends Prisma.TelegramChannel$sharesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TelegramChannel$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TelegramChannelFieldRefs {
    readonly id: Prisma.FieldRef<"TelegramChannel", 'String'>;
    readonly ownerUserId: Prisma.FieldRef<"TelegramChannel", 'String'>;
    readonly chatId: Prisma.FieldRef<"TelegramChannel", 'String'>;
    readonly title: Prisma.FieldRef<"TelegramChannel", 'String'>;
    readonly username: Prisma.FieldRef<"TelegramChannel", 'String'>;
    readonly enabled: Prisma.FieldRef<"TelegramChannel", 'Boolean'>;
    readonly canPost: Prisma.FieldRef<"TelegramChannel", 'Boolean'>;
    readonly linkedAt: Prisma.FieldRef<"TelegramChannel", 'DateTime'>;
    readonly lastCheckedAt: Prisma.FieldRef<"TelegramChannel", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TelegramChannel", 'DateTime'>;
}
export type TelegramChannelFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where: Prisma.TelegramChannelWhereUniqueInput;
};
export type TelegramChannelFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where: Prisma.TelegramChannelWhereUniqueInput;
};
export type TelegramChannelFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where?: Prisma.TelegramChannelWhereInput;
    orderBy?: Prisma.TelegramChannelOrderByWithRelationInput | Prisma.TelegramChannelOrderByWithRelationInput[];
    cursor?: Prisma.TelegramChannelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramChannelScalarFieldEnum | Prisma.TelegramChannelScalarFieldEnum[];
};
export type TelegramChannelFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where?: Prisma.TelegramChannelWhereInput;
    orderBy?: Prisma.TelegramChannelOrderByWithRelationInput | Prisma.TelegramChannelOrderByWithRelationInput[];
    cursor?: Prisma.TelegramChannelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramChannelScalarFieldEnum | Prisma.TelegramChannelScalarFieldEnum[];
};
export type TelegramChannelFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where?: Prisma.TelegramChannelWhereInput;
    orderBy?: Prisma.TelegramChannelOrderByWithRelationInput | Prisma.TelegramChannelOrderByWithRelationInput[];
    cursor?: Prisma.TelegramChannelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramChannelScalarFieldEnum | Prisma.TelegramChannelScalarFieldEnum[];
};
export type TelegramChannelCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramChannelCreateInput, Prisma.TelegramChannelUncheckedCreateInput>;
};
export type TelegramChannelCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TelegramChannelCreateManyInput | Prisma.TelegramChannelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TelegramChannelCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    data: Prisma.TelegramChannelCreateManyInput | Prisma.TelegramChannelCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TelegramChannelIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TelegramChannelUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramChannelUpdateInput, Prisma.TelegramChannelUncheckedUpdateInput>;
    where: Prisma.TelegramChannelWhereUniqueInput;
};
export type TelegramChannelUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TelegramChannelUpdateManyMutationInput, Prisma.TelegramChannelUncheckedUpdateManyInput>;
    where?: Prisma.TelegramChannelWhereInput;
    limit?: number;
};
export type TelegramChannelUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramChannelUpdateManyMutationInput, Prisma.TelegramChannelUncheckedUpdateManyInput>;
    where?: Prisma.TelegramChannelWhereInput;
    limit?: number;
    include?: Prisma.TelegramChannelIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TelegramChannelUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where: Prisma.TelegramChannelWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramChannelCreateInput, Prisma.TelegramChannelUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TelegramChannelUpdateInput, Prisma.TelegramChannelUncheckedUpdateInput>;
};
export type TelegramChannelDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
    where: Prisma.TelegramChannelWhereUniqueInput;
};
export type TelegramChannelDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramChannelWhereInput;
    limit?: number;
};
export type TelegramChannel$sharesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    where?: Prisma.TelegramShareWhereInput;
    orderBy?: Prisma.TelegramShareOrderByWithRelationInput | Prisma.TelegramShareOrderByWithRelationInput[];
    cursor?: Prisma.TelegramShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramShareScalarFieldEnum | Prisma.TelegramShareScalarFieldEnum[];
};
export type TelegramChannelDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramChannelSelect<ExtArgs> | null;
    omit?: Prisma.TelegramChannelOmit<ExtArgs> | null;
    include?: Prisma.TelegramChannelInclude<ExtArgs> | null;
};
export {};
