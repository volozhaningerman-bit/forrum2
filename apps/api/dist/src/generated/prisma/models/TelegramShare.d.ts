import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TelegramShareModel = runtime.Types.Result.DefaultSelection<Prisma.$TelegramSharePayload>;
export type AggregateTelegramShare = {
    _count: TelegramShareCountAggregateOutputType | null;
    _avg: TelegramShareAvgAggregateOutputType | null;
    _sum: TelegramShareSumAggregateOutputType | null;
    _min: TelegramShareMinAggregateOutputType | null;
    _max: TelegramShareMaxAggregateOutputType | null;
};
export type TelegramShareAvgAggregateOutputType = {
    telegramMessageId: number | null;
};
export type TelegramShareSumAggregateOutputType = {
    telegramMessageId: number | null;
};
export type TelegramShareMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channelId: string | null;
    publicationId: string | null;
    includeImage: boolean | null;
    telegramMessageId: number | null;
    createdAt: Date | null;
};
export type TelegramShareMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channelId: string | null;
    publicationId: string | null;
    includeImage: boolean | null;
    telegramMessageId: number | null;
    createdAt: Date | null;
};
export type TelegramShareCountAggregateOutputType = {
    id: number;
    userId: number;
    channelId: number;
    publicationId: number;
    includeImage: number;
    telegramMessageId: number;
    createdAt: number;
    _all: number;
};
export type TelegramShareAvgAggregateInputType = {
    telegramMessageId?: true;
};
export type TelegramShareSumAggregateInputType = {
    telegramMessageId?: true;
};
export type TelegramShareMinAggregateInputType = {
    id?: true;
    userId?: true;
    channelId?: true;
    publicationId?: true;
    includeImage?: true;
    telegramMessageId?: true;
    createdAt?: true;
};
export type TelegramShareMaxAggregateInputType = {
    id?: true;
    userId?: true;
    channelId?: true;
    publicationId?: true;
    includeImage?: true;
    telegramMessageId?: true;
    createdAt?: true;
};
export type TelegramShareCountAggregateInputType = {
    id?: true;
    userId?: true;
    channelId?: true;
    publicationId?: true;
    includeImage?: true;
    telegramMessageId?: true;
    createdAt?: true;
    _all?: true;
};
export type TelegramShareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramShareWhereInput;
    orderBy?: Prisma.TelegramShareOrderByWithRelationInput | Prisma.TelegramShareOrderByWithRelationInput[];
    cursor?: Prisma.TelegramShareWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TelegramShareCountAggregateInputType;
    _avg?: TelegramShareAvgAggregateInputType;
    _sum?: TelegramShareSumAggregateInputType;
    _min?: TelegramShareMinAggregateInputType;
    _max?: TelegramShareMaxAggregateInputType;
};
export type GetTelegramShareAggregateType<T extends TelegramShareAggregateArgs> = {
    [P in keyof T & keyof AggregateTelegramShare]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTelegramShare[P]> : Prisma.GetScalarType<T[P], AggregateTelegramShare[P]>;
};
export type TelegramShareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramShareWhereInput;
    orderBy?: Prisma.TelegramShareOrderByWithAggregationInput | Prisma.TelegramShareOrderByWithAggregationInput[];
    by: Prisma.TelegramShareScalarFieldEnum[] | Prisma.TelegramShareScalarFieldEnum;
    having?: Prisma.TelegramShareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TelegramShareCountAggregateInputType | true;
    _avg?: TelegramShareAvgAggregateInputType;
    _sum?: TelegramShareSumAggregateInputType;
    _min?: TelegramShareMinAggregateInputType;
    _max?: TelegramShareMaxAggregateInputType;
};
export type TelegramShareGroupByOutputType = {
    id: string;
    userId: string;
    channelId: string;
    publicationId: string;
    includeImage: boolean;
    telegramMessageId: number | null;
    createdAt: Date;
    _count: TelegramShareCountAggregateOutputType | null;
    _avg: TelegramShareAvgAggregateOutputType | null;
    _sum: TelegramShareSumAggregateOutputType | null;
    _min: TelegramShareMinAggregateOutputType | null;
    _max: TelegramShareMaxAggregateOutputType | null;
};
type GetTelegramShareGroupByPayload<T extends TelegramShareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TelegramShareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TelegramShareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TelegramShareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TelegramShareGroupByOutputType[P]>;
}>>;
export type TelegramShareWhereInput = {
    AND?: Prisma.TelegramShareWhereInput | Prisma.TelegramShareWhereInput[];
    OR?: Prisma.TelegramShareWhereInput[];
    NOT?: Prisma.TelegramShareWhereInput | Prisma.TelegramShareWhereInput[];
    id?: Prisma.UuidFilter<"TelegramShare"> | string;
    userId?: Prisma.UuidFilter<"TelegramShare"> | string;
    channelId?: Prisma.UuidFilter<"TelegramShare"> | string;
    publicationId?: Prisma.UuidFilter<"TelegramShare"> | string;
    includeImage?: Prisma.BoolFilter<"TelegramShare"> | boolean;
    telegramMessageId?: Prisma.IntNullableFilter<"TelegramShare"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramShare"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    channel?: Prisma.XOR<Prisma.TelegramChannelScalarRelationFilter, Prisma.TelegramChannelWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
};
export type TelegramShareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    includeImage?: Prisma.SortOrder;
    telegramMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    channel?: Prisma.TelegramChannelOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
};
export type TelegramShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TelegramShareWhereInput | Prisma.TelegramShareWhereInput[];
    OR?: Prisma.TelegramShareWhereInput[];
    NOT?: Prisma.TelegramShareWhereInput | Prisma.TelegramShareWhereInput[];
    userId?: Prisma.UuidFilter<"TelegramShare"> | string;
    channelId?: Prisma.UuidFilter<"TelegramShare"> | string;
    publicationId?: Prisma.UuidFilter<"TelegramShare"> | string;
    includeImage?: Prisma.BoolFilter<"TelegramShare"> | boolean;
    telegramMessageId?: Prisma.IntNullableFilter<"TelegramShare"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramShare"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    channel?: Prisma.XOR<Prisma.TelegramChannelScalarRelationFilter, Prisma.TelegramChannelWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
}, "id">;
export type TelegramShareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    includeImage?: Prisma.SortOrder;
    telegramMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TelegramShareCountOrderByAggregateInput;
    _avg?: Prisma.TelegramShareAvgOrderByAggregateInput;
    _max?: Prisma.TelegramShareMaxOrderByAggregateInput;
    _min?: Prisma.TelegramShareMinOrderByAggregateInput;
    _sum?: Prisma.TelegramShareSumOrderByAggregateInput;
};
export type TelegramShareScalarWhereWithAggregatesInput = {
    AND?: Prisma.TelegramShareScalarWhereWithAggregatesInput | Prisma.TelegramShareScalarWhereWithAggregatesInput[];
    OR?: Prisma.TelegramShareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TelegramShareScalarWhereWithAggregatesInput | Prisma.TelegramShareScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TelegramShare"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"TelegramShare"> | string;
    channelId?: Prisma.UuidWithAggregatesFilter<"TelegramShare"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"TelegramShare"> | string;
    includeImage?: Prisma.BoolWithAggregatesFilter<"TelegramShare"> | boolean;
    telegramMessageId?: Prisma.IntNullableWithAggregatesFilter<"TelegramShare"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramShare"> | Date | string;
};
export type TelegramShareCreateInput = {
    id?: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTelegramSharesInput;
    channel: Prisma.TelegramChannelCreateNestedOneWithoutSharesInput;
    publication: Prisma.PublicationCreateNestedOneWithoutTelegramSharesInput;
};
export type TelegramShareUncheckedCreateInput = {
    id?: string;
    userId: string;
    channelId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTelegramSharesNestedInput;
    channel?: Prisma.TelegramChannelUpdateOneRequiredWithoutSharesNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutTelegramSharesNestedInput;
};
export type TelegramShareUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareCreateManyInput = {
    id?: string;
    userId: string;
    channelId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareListRelationFilter = {
    every?: Prisma.TelegramShareWhereInput;
    some?: Prisma.TelegramShareWhereInput;
    none?: Prisma.TelegramShareWhereInput;
};
export type TelegramShareOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TelegramShareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    includeImage?: Prisma.SortOrder;
    telegramMessageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramShareAvgOrderByAggregateInput = {
    telegramMessageId?: Prisma.SortOrder;
};
export type TelegramShareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    includeImage?: Prisma.SortOrder;
    telegramMessageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramShareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channelId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    includeImage?: Prisma.SortOrder;
    telegramMessageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramShareSumOrderByAggregateInput = {
    telegramMessageId?: Prisma.SortOrder;
};
export type TelegramShareCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput> | Prisma.TelegramShareCreateWithoutUserInput[] | Prisma.TelegramShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutUserInput | Prisma.TelegramShareCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TelegramShareCreateManyUserInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput> | Prisma.TelegramShareCreateWithoutUserInput[] | Prisma.TelegramShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutUserInput | Prisma.TelegramShareCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TelegramShareCreateManyUserInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput> | Prisma.TelegramShareCreateWithoutUserInput[] | Prisma.TelegramShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutUserInput | Prisma.TelegramShareCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutUserInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TelegramShareCreateManyUserInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutUserInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutUserInput | Prisma.TelegramShareUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput> | Prisma.TelegramShareCreateWithoutUserInput[] | Prisma.TelegramShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutUserInput | Prisma.TelegramShareCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutUserInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TelegramShareCreateManyUserInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutUserInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutUserInput | Prisma.TelegramShareUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput> | Prisma.TelegramShareCreateWithoutPublicationInput[] | Prisma.TelegramShareUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutPublicationInput | Prisma.TelegramShareCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.TelegramShareCreateManyPublicationInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput> | Prisma.TelegramShareCreateWithoutPublicationInput[] | Prisma.TelegramShareUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutPublicationInput | Prisma.TelegramShareCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.TelegramShareCreateManyPublicationInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput> | Prisma.TelegramShareCreateWithoutPublicationInput[] | Prisma.TelegramShareUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutPublicationInput | Prisma.TelegramShareCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutPublicationInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.TelegramShareCreateManyPublicationInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutPublicationInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutPublicationInput | Prisma.TelegramShareUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput> | Prisma.TelegramShareCreateWithoutPublicationInput[] | Prisma.TelegramShareUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutPublicationInput | Prisma.TelegramShareCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutPublicationInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.TelegramShareCreateManyPublicationInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutPublicationInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutPublicationInput | Prisma.TelegramShareUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareCreateNestedManyWithoutChannelInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput> | Prisma.TelegramShareCreateWithoutChannelInput[] | Prisma.TelegramShareUncheckedCreateWithoutChannelInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutChannelInput | Prisma.TelegramShareCreateOrConnectWithoutChannelInput[];
    createMany?: Prisma.TelegramShareCreateManyChannelInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUncheckedCreateNestedManyWithoutChannelInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput> | Prisma.TelegramShareCreateWithoutChannelInput[] | Prisma.TelegramShareUncheckedCreateWithoutChannelInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutChannelInput | Prisma.TelegramShareCreateOrConnectWithoutChannelInput[];
    createMany?: Prisma.TelegramShareCreateManyChannelInputEnvelope;
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
};
export type TelegramShareUpdateManyWithoutChannelNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput> | Prisma.TelegramShareCreateWithoutChannelInput[] | Prisma.TelegramShareUncheckedCreateWithoutChannelInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutChannelInput | Prisma.TelegramShareCreateOrConnectWithoutChannelInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutChannelInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutChannelInput[];
    createMany?: Prisma.TelegramShareCreateManyChannelInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutChannelInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutChannelInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutChannelInput | Prisma.TelegramShareUpdateManyWithWhereWithoutChannelInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput> | Prisma.TelegramShareCreateWithoutChannelInput[] | Prisma.TelegramShareUncheckedCreateWithoutChannelInput[];
    connectOrCreate?: Prisma.TelegramShareCreateOrConnectWithoutChannelInput | Prisma.TelegramShareCreateOrConnectWithoutChannelInput[];
    upsert?: Prisma.TelegramShareUpsertWithWhereUniqueWithoutChannelInput | Prisma.TelegramShareUpsertWithWhereUniqueWithoutChannelInput[];
    createMany?: Prisma.TelegramShareCreateManyChannelInputEnvelope;
    set?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    disconnect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    delete?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    connect?: Prisma.TelegramShareWhereUniqueInput | Prisma.TelegramShareWhereUniqueInput[];
    update?: Prisma.TelegramShareUpdateWithWhereUniqueWithoutChannelInput | Prisma.TelegramShareUpdateWithWhereUniqueWithoutChannelInput[];
    updateMany?: Prisma.TelegramShareUpdateManyWithWhereWithoutChannelInput | Prisma.TelegramShareUpdateManyWithWhereWithoutChannelInput[];
    deleteMany?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
};
export type TelegramShareCreateWithoutUserInput = {
    id?: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
    channel: Prisma.TelegramChannelCreateNestedOneWithoutSharesInput;
    publication: Prisma.PublicationCreateNestedOneWithoutTelegramSharesInput;
};
export type TelegramShareUncheckedCreateWithoutUserInput = {
    id?: string;
    channelId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareCreateOrConnectWithoutUserInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput>;
};
export type TelegramShareCreateManyUserInputEnvelope = {
    data: Prisma.TelegramShareCreateManyUserInput | Prisma.TelegramShareCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TelegramShareUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.TelegramShareUpdateWithoutUserInput, Prisma.TelegramShareUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutUserInput, Prisma.TelegramShareUncheckedCreateWithoutUserInput>;
};
export type TelegramShareUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateWithoutUserInput, Prisma.TelegramShareUncheckedUpdateWithoutUserInput>;
};
export type TelegramShareUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TelegramShareScalarWhereInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateManyMutationInput, Prisma.TelegramShareUncheckedUpdateManyWithoutUserInput>;
};
export type TelegramShareScalarWhereInput = {
    AND?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
    OR?: Prisma.TelegramShareScalarWhereInput[];
    NOT?: Prisma.TelegramShareScalarWhereInput | Prisma.TelegramShareScalarWhereInput[];
    id?: Prisma.UuidFilter<"TelegramShare"> | string;
    userId?: Prisma.UuidFilter<"TelegramShare"> | string;
    channelId?: Prisma.UuidFilter<"TelegramShare"> | string;
    publicationId?: Prisma.UuidFilter<"TelegramShare"> | string;
    includeImage?: Prisma.BoolFilter<"TelegramShare"> | boolean;
    telegramMessageId?: Prisma.IntNullableFilter<"TelegramShare"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramShare"> | Date | string;
};
export type TelegramShareCreateWithoutPublicationInput = {
    id?: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTelegramSharesInput;
    channel: Prisma.TelegramChannelCreateNestedOneWithoutSharesInput;
};
export type TelegramShareUncheckedCreateWithoutPublicationInput = {
    id?: string;
    userId: string;
    channelId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareCreateOrConnectWithoutPublicationInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput>;
};
export type TelegramShareCreateManyPublicationInputEnvelope = {
    data: Prisma.TelegramShareCreateManyPublicationInput | Prisma.TelegramShareCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type TelegramShareUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.TelegramShareUpdateWithoutPublicationInput, Prisma.TelegramShareUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutPublicationInput, Prisma.TelegramShareUncheckedCreateWithoutPublicationInput>;
};
export type TelegramShareUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateWithoutPublicationInput, Prisma.TelegramShareUncheckedUpdateWithoutPublicationInput>;
};
export type TelegramShareUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.TelegramShareScalarWhereInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateManyMutationInput, Prisma.TelegramShareUncheckedUpdateManyWithoutPublicationInput>;
};
export type TelegramShareCreateWithoutChannelInput = {
    id?: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTelegramSharesInput;
    publication: Prisma.PublicationCreateNestedOneWithoutTelegramSharesInput;
};
export type TelegramShareUncheckedCreateWithoutChannelInput = {
    id?: string;
    userId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareCreateOrConnectWithoutChannelInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput>;
};
export type TelegramShareCreateManyChannelInputEnvelope = {
    data: Prisma.TelegramShareCreateManyChannelInput | Prisma.TelegramShareCreateManyChannelInput[];
    skipDuplicates?: boolean;
};
export type TelegramShareUpsertWithWhereUniqueWithoutChannelInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.TelegramShareUpdateWithoutChannelInput, Prisma.TelegramShareUncheckedUpdateWithoutChannelInput>;
    create: Prisma.XOR<Prisma.TelegramShareCreateWithoutChannelInput, Prisma.TelegramShareUncheckedCreateWithoutChannelInput>;
};
export type TelegramShareUpdateWithWhereUniqueWithoutChannelInput = {
    where: Prisma.TelegramShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateWithoutChannelInput, Prisma.TelegramShareUncheckedUpdateWithoutChannelInput>;
};
export type TelegramShareUpdateManyWithWhereWithoutChannelInput = {
    where: Prisma.TelegramShareScalarWhereInput;
    data: Prisma.XOR<Prisma.TelegramShareUpdateManyMutationInput, Prisma.TelegramShareUncheckedUpdateManyWithoutChannelInput>;
};
export type TelegramShareCreateManyUserInput = {
    id?: string;
    channelId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    channel?: Prisma.TelegramChannelUpdateOneRequiredWithoutSharesNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutTelegramSharesNestedInput;
};
export type TelegramShareUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareCreateManyPublicationInput = {
    id?: string;
    userId: string;
    channelId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTelegramSharesNestedInput;
    channel?: Prisma.TelegramChannelUpdateOneRequiredWithoutSharesNestedInput;
};
export type TelegramShareUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channelId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareCreateManyChannelInput = {
    id?: string;
    userId: string;
    publicationId: string;
    includeImage?: boolean;
    telegramMessageId?: number | null;
    createdAt?: Date | string;
};
export type TelegramShareUpdateWithoutChannelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTelegramSharesNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutTelegramSharesNestedInput;
};
export type TelegramShareUncheckedUpdateWithoutChannelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareUncheckedUpdateManyWithoutChannelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    includeImage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    telegramMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramShareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channelId?: boolean;
    publicationId?: boolean;
    includeImage?: boolean;
    telegramMessageId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramShare"]>;
export type TelegramShareSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channelId?: boolean;
    publicationId?: boolean;
    includeImage?: boolean;
    telegramMessageId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramShare"]>;
export type TelegramShareSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channelId?: boolean;
    publicationId?: boolean;
    includeImage?: boolean;
    telegramMessageId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramShare"]>;
export type TelegramShareSelectScalar = {
    id?: boolean;
    userId?: boolean;
    channelId?: boolean;
    publicationId?: boolean;
    includeImage?: boolean;
    telegramMessageId?: boolean;
    createdAt?: boolean;
};
export type TelegramShareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "channelId" | "publicationId" | "includeImage" | "telegramMessageId" | "createdAt", ExtArgs["result"]["telegramShare"]>;
export type TelegramShareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type TelegramShareIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type TelegramShareIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    channel?: boolean | Prisma.TelegramChannelDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type $TelegramSharePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TelegramShare";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        channel: Prisma.$TelegramChannelPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        channelId: string;
        publicationId: string;
        includeImage: boolean;
        telegramMessageId: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["telegramShare"]>;
    composites: {};
};
export type TelegramShareGetPayload<S extends boolean | null | undefined | TelegramShareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload, S>;
export type TelegramShareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TelegramShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TelegramShareCountAggregateInputType | true;
};
export interface TelegramShareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TelegramShare'];
        meta: {
            name: 'TelegramShare';
        };
    };
    findUnique<T extends TelegramShareFindUniqueArgs>(args: Prisma.SelectSubset<T, TelegramShareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TelegramShareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TelegramShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TelegramShareFindFirstArgs>(args?: Prisma.SelectSubset<T, TelegramShareFindFirstArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TelegramShareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TelegramShareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TelegramShareFindManyArgs>(args?: Prisma.SelectSubset<T, TelegramShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TelegramShareCreateArgs>(args: Prisma.SelectSubset<T, TelegramShareCreateArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TelegramShareCreateManyArgs>(args?: Prisma.SelectSubset<T, TelegramShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TelegramShareCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TelegramShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TelegramShareDeleteArgs>(args: Prisma.SelectSubset<T, TelegramShareDeleteArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TelegramShareUpdateArgs>(args: Prisma.SelectSubset<T, TelegramShareUpdateArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TelegramShareDeleteManyArgs>(args?: Prisma.SelectSubset<T, TelegramShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TelegramShareUpdateManyArgs>(args: Prisma.SelectSubset<T, TelegramShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TelegramShareUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TelegramShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TelegramShareUpsertArgs>(args: Prisma.SelectSubset<T, TelegramShareUpsertArgs<ExtArgs>>): Prisma.Prisma__TelegramShareClient<runtime.Types.Result.GetResult<Prisma.$TelegramSharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TelegramShareCountArgs>(args?: Prisma.Subset<T, TelegramShareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TelegramShareCountAggregateOutputType> : number>;
    aggregate<T extends TelegramShareAggregateArgs>(args: Prisma.Subset<T, TelegramShareAggregateArgs>): Prisma.PrismaPromise<GetTelegramShareAggregateType<T>>;
    groupBy<T extends TelegramShareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TelegramShareGroupByArgs['orderBy'];
    } : {
        orderBy?: TelegramShareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TelegramShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TelegramShareFieldRefs;
}
export interface Prisma__TelegramShareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    channel<T extends Prisma.TelegramChannelDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TelegramChannelDefaultArgs<ExtArgs>>): Prisma.Prisma__TelegramChannelClient<runtime.Types.Result.GetResult<Prisma.$TelegramChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TelegramShareFieldRefs {
    readonly id: Prisma.FieldRef<"TelegramShare", 'String'>;
    readonly userId: Prisma.FieldRef<"TelegramShare", 'String'>;
    readonly channelId: Prisma.FieldRef<"TelegramShare", 'String'>;
    readonly publicationId: Prisma.FieldRef<"TelegramShare", 'String'>;
    readonly includeImage: Prisma.FieldRef<"TelegramShare", 'Boolean'>;
    readonly telegramMessageId: Prisma.FieldRef<"TelegramShare", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"TelegramShare", 'DateTime'>;
}
export type TelegramShareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    where: Prisma.TelegramShareWhereUniqueInput;
};
export type TelegramShareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    where: Prisma.TelegramShareWhereUniqueInput;
};
export type TelegramShareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TelegramShareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TelegramShareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TelegramShareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramShareCreateInput, Prisma.TelegramShareUncheckedCreateInput>;
};
export type TelegramShareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TelegramShareCreateManyInput | Prisma.TelegramShareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TelegramShareCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    data: Prisma.TelegramShareCreateManyInput | Prisma.TelegramShareCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TelegramShareIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TelegramShareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramShareUpdateInput, Prisma.TelegramShareUncheckedUpdateInput>;
    where: Prisma.TelegramShareWhereUniqueInput;
};
export type TelegramShareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TelegramShareUpdateManyMutationInput, Prisma.TelegramShareUncheckedUpdateManyInput>;
    where?: Prisma.TelegramShareWhereInput;
    limit?: number;
};
export type TelegramShareUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramShareUpdateManyMutationInput, Prisma.TelegramShareUncheckedUpdateManyInput>;
    where?: Prisma.TelegramShareWhereInput;
    limit?: number;
    include?: Prisma.TelegramShareIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TelegramShareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    where: Prisma.TelegramShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramShareCreateInput, Prisma.TelegramShareUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TelegramShareUpdateInput, Prisma.TelegramShareUncheckedUpdateInput>;
};
export type TelegramShareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
    where: Prisma.TelegramShareWhereUniqueInput;
};
export type TelegramShareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramShareWhereInput;
    limit?: number;
};
export type TelegramShareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramShareSelect<ExtArgs> | null;
    omit?: Prisma.TelegramShareOmit<ExtArgs> | null;
    include?: Prisma.TelegramShareInclude<ExtArgs> | null;
};
export {};
