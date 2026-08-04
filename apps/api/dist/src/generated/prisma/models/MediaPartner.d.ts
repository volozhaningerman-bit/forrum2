import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MediaPartnerModel = runtime.Types.Result.DefaultSelection<Prisma.$MediaPartnerPayload>;
export type AggregateMediaPartner = {
    _count: MediaPartnerCountAggregateOutputType | null;
    _min: MediaPartnerMinAggregateOutputType | null;
    _max: MediaPartnerMaxAggregateOutputType | null;
};
export type MediaPartnerMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.MediaPartnerType | null;
    status: $Enums.MediaPartnerStatus | null;
    displayName: string | null;
    platform: string | null;
    channelUrl: string | null;
    audienceText: string | null;
    description: string | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MediaPartnerMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.MediaPartnerType | null;
    status: $Enums.MediaPartnerStatus | null;
    displayName: string | null;
    platform: string | null;
    channelUrl: string | null;
    audienceText: string | null;
    description: string | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MediaPartnerCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    status: number;
    displayName: number;
    platform: number;
    channelUrl: number;
    audienceText: number;
    description: number;
    resolutionNote: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MediaPartnerMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    displayName?: true;
    platform?: true;
    channelUrl?: true;
    audienceText?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MediaPartnerMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    displayName?: true;
    platform?: true;
    channelUrl?: true;
    audienceText?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MediaPartnerCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    displayName?: true;
    platform?: true;
    channelUrl?: true;
    audienceText?: true;
    description?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MediaPartnerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaPartnerWhereInput;
    orderBy?: Prisma.MediaPartnerOrderByWithRelationInput | Prisma.MediaPartnerOrderByWithRelationInput[];
    cursor?: Prisma.MediaPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MediaPartnerCountAggregateInputType;
    _min?: MediaPartnerMinAggregateInputType;
    _max?: MediaPartnerMaxAggregateInputType;
};
export type GetMediaPartnerAggregateType<T extends MediaPartnerAggregateArgs> = {
    [P in keyof T & keyof AggregateMediaPartner]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMediaPartner[P]> : Prisma.GetScalarType<T[P], AggregateMediaPartner[P]>;
};
export type MediaPartnerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaPartnerWhereInput;
    orderBy?: Prisma.MediaPartnerOrderByWithAggregationInput | Prisma.MediaPartnerOrderByWithAggregationInput[];
    by: Prisma.MediaPartnerScalarFieldEnum[] | Prisma.MediaPartnerScalarFieldEnum;
    having?: Prisma.MediaPartnerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MediaPartnerCountAggregateInputType | true;
    _min?: MediaPartnerMinAggregateInputType;
    _max?: MediaPartnerMaxAggregateInputType;
};
export type MediaPartnerGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.MediaPartnerType;
    status: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText: string | null;
    description: string;
    resolutionNote: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MediaPartnerCountAggregateOutputType | null;
    _min: MediaPartnerMinAggregateOutputType | null;
    _max: MediaPartnerMaxAggregateOutputType | null;
};
type GetMediaPartnerGroupByPayload<T extends MediaPartnerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MediaPartnerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MediaPartnerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MediaPartnerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MediaPartnerGroupByOutputType[P]>;
}>>;
export type MediaPartnerWhereInput = {
    AND?: Prisma.MediaPartnerWhereInput | Prisma.MediaPartnerWhereInput[];
    OR?: Prisma.MediaPartnerWhereInput[];
    NOT?: Prisma.MediaPartnerWhereInput | Prisma.MediaPartnerWhereInput[];
    id?: Prisma.UuidFilter<"MediaPartner"> | string;
    userId?: Prisma.UuidFilter<"MediaPartner"> | string;
    type?: Prisma.EnumMediaPartnerTypeFilter<"MediaPartner"> | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFilter<"MediaPartner"> | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFilter<"MediaPartner"> | string;
    platform?: Prisma.StringFilter<"MediaPartner"> | string;
    channelUrl?: Prisma.StringFilter<"MediaPartner"> | string;
    audienceText?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    description?: Prisma.StringFilter<"MediaPartner"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MediaPartnerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    channelUrl?: Prisma.SortOrder;
    audienceText?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type MediaPartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_channelUrl?: Prisma.MediaPartnerUserIdChannelUrlCompoundUniqueInput;
    AND?: Prisma.MediaPartnerWhereInput | Prisma.MediaPartnerWhereInput[];
    OR?: Prisma.MediaPartnerWhereInput[];
    NOT?: Prisma.MediaPartnerWhereInput | Prisma.MediaPartnerWhereInput[];
    userId?: Prisma.UuidFilter<"MediaPartner"> | string;
    type?: Prisma.EnumMediaPartnerTypeFilter<"MediaPartner"> | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFilter<"MediaPartner"> | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFilter<"MediaPartner"> | string;
    platform?: Prisma.StringFilter<"MediaPartner"> | string;
    channelUrl?: Prisma.StringFilter<"MediaPartner"> | string;
    audienceText?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    description?: Prisma.StringFilter<"MediaPartner"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_channelUrl">;
export type MediaPartnerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    channelUrl?: Prisma.SortOrder;
    audienceText?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MediaPartnerCountOrderByAggregateInput;
    _max?: Prisma.MediaPartnerMaxOrderByAggregateInput;
    _min?: Prisma.MediaPartnerMinOrderByAggregateInput;
};
export type MediaPartnerScalarWhereWithAggregatesInput = {
    AND?: Prisma.MediaPartnerScalarWhereWithAggregatesInput | Prisma.MediaPartnerScalarWhereWithAggregatesInput[];
    OR?: Prisma.MediaPartnerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MediaPartnerScalarWhereWithAggregatesInput | Prisma.MediaPartnerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MediaPartner"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"MediaPartner"> | string;
    type?: Prisma.EnumMediaPartnerTypeWithAggregatesFilter<"MediaPartner"> | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusWithAggregatesFilter<"MediaPartner"> | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringWithAggregatesFilter<"MediaPartner"> | string;
    platform?: Prisma.StringWithAggregatesFilter<"MediaPartner"> | string;
    channelUrl?: Prisma.StringWithAggregatesFilter<"MediaPartner"> | string;
    audienceText?: Prisma.StringNullableWithAggregatesFilter<"MediaPartner"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"MediaPartner"> | string;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"MediaPartner"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MediaPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MediaPartner"> | Date | string;
};
export type MediaPartnerCreateInput = {
    id?: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMediaPartnersInput;
};
export type MediaPartnerUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MediaPartnerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMediaPartnersNestedInput;
};
export type MediaPartnerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MediaPartnerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerListRelationFilter = {
    every?: Prisma.MediaPartnerWhereInput;
    some?: Prisma.MediaPartnerWhereInput;
    none?: Prisma.MediaPartnerWhereInput;
};
export type MediaPartnerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MediaPartnerUserIdChannelUrlCompoundUniqueInput = {
    userId: string;
    channelUrl: string;
};
export type MediaPartnerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    channelUrl?: Prisma.SortOrder;
    audienceText?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MediaPartnerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    channelUrl?: Prisma.SortOrder;
    audienceText?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MediaPartnerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    channelUrl?: Prisma.SortOrder;
    audienceText?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MediaPartnerCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput> | Prisma.MediaPartnerCreateWithoutUserInput[] | Prisma.MediaPartnerUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MediaPartnerCreateOrConnectWithoutUserInput | Prisma.MediaPartnerCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.MediaPartnerCreateManyUserInputEnvelope;
    connect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
};
export type MediaPartnerUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput> | Prisma.MediaPartnerCreateWithoutUserInput[] | Prisma.MediaPartnerUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MediaPartnerCreateOrConnectWithoutUserInput | Prisma.MediaPartnerCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.MediaPartnerCreateManyUserInputEnvelope;
    connect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
};
export type MediaPartnerUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput> | Prisma.MediaPartnerCreateWithoutUserInput[] | Prisma.MediaPartnerUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MediaPartnerCreateOrConnectWithoutUserInput | Prisma.MediaPartnerCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.MediaPartnerUpsertWithWhereUniqueWithoutUserInput | Prisma.MediaPartnerUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.MediaPartnerCreateManyUserInputEnvelope;
    set?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    disconnect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    delete?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    connect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    update?: Prisma.MediaPartnerUpdateWithWhereUniqueWithoutUserInput | Prisma.MediaPartnerUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.MediaPartnerUpdateManyWithWhereWithoutUserInput | Prisma.MediaPartnerUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.MediaPartnerScalarWhereInput | Prisma.MediaPartnerScalarWhereInput[];
};
export type MediaPartnerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput> | Prisma.MediaPartnerCreateWithoutUserInput[] | Prisma.MediaPartnerUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MediaPartnerCreateOrConnectWithoutUserInput | Prisma.MediaPartnerCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.MediaPartnerUpsertWithWhereUniqueWithoutUserInput | Prisma.MediaPartnerUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.MediaPartnerCreateManyUserInputEnvelope;
    set?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    disconnect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    delete?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    connect?: Prisma.MediaPartnerWhereUniqueInput | Prisma.MediaPartnerWhereUniqueInput[];
    update?: Prisma.MediaPartnerUpdateWithWhereUniqueWithoutUserInput | Prisma.MediaPartnerUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.MediaPartnerUpdateManyWithWhereWithoutUserInput | Prisma.MediaPartnerUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.MediaPartnerScalarWhereInput | Prisma.MediaPartnerScalarWhereInput[];
};
export type EnumMediaPartnerTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaPartnerType;
};
export type EnumMediaPartnerStatusFieldUpdateOperationsInput = {
    set?: $Enums.MediaPartnerStatus;
};
export type MediaPartnerCreateWithoutUserInput = {
    id?: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MediaPartnerUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MediaPartnerCreateOrConnectWithoutUserInput = {
    where: Prisma.MediaPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput>;
};
export type MediaPartnerCreateManyUserInputEnvelope = {
    data: Prisma.MediaPartnerCreateManyUserInput | Prisma.MediaPartnerCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type MediaPartnerUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.MediaPartnerWhereUniqueInput;
    update: Prisma.XOR<Prisma.MediaPartnerUpdateWithoutUserInput, Prisma.MediaPartnerUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.MediaPartnerCreateWithoutUserInput, Prisma.MediaPartnerUncheckedCreateWithoutUserInput>;
};
export type MediaPartnerUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.MediaPartnerWhereUniqueInput;
    data: Prisma.XOR<Prisma.MediaPartnerUpdateWithoutUserInput, Prisma.MediaPartnerUncheckedUpdateWithoutUserInput>;
};
export type MediaPartnerUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.MediaPartnerScalarWhereInput;
    data: Prisma.XOR<Prisma.MediaPartnerUpdateManyMutationInput, Prisma.MediaPartnerUncheckedUpdateManyWithoutUserInput>;
};
export type MediaPartnerScalarWhereInput = {
    AND?: Prisma.MediaPartnerScalarWhereInput | Prisma.MediaPartnerScalarWhereInput[];
    OR?: Prisma.MediaPartnerScalarWhereInput[];
    NOT?: Prisma.MediaPartnerScalarWhereInput | Prisma.MediaPartnerScalarWhereInput[];
    id?: Prisma.UuidFilter<"MediaPartner"> | string;
    userId?: Prisma.UuidFilter<"MediaPartner"> | string;
    type?: Prisma.EnumMediaPartnerTypeFilter<"MediaPartner"> | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFilter<"MediaPartner"> | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFilter<"MediaPartner"> | string;
    platform?: Prisma.StringFilter<"MediaPartner"> | string;
    channelUrl?: Prisma.StringFilter<"MediaPartner"> | string;
    audienceText?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    description?: Prisma.StringFilter<"MediaPartner"> | string;
    resolutionNote?: Prisma.StringNullableFilter<"MediaPartner"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MediaPartner"> | Date | string;
};
export type MediaPartnerCreateManyUserInput = {
    id?: string;
    type: $Enums.MediaPartnerType;
    status?: $Enums.MediaPartnerStatus;
    displayName: string;
    platform: string;
    channelUrl: string;
    audienceText?: string | null;
    description: string;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MediaPartnerUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMediaPartnerTypeFieldUpdateOperationsInput | $Enums.MediaPartnerType;
    status?: Prisma.EnumMediaPartnerStatusFieldUpdateOperationsInput | $Enums.MediaPartnerStatus;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    channelUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    audienceText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaPartnerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    displayName?: boolean;
    platform?: boolean;
    channelUrl?: boolean;
    audienceText?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mediaPartner"]>;
export type MediaPartnerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    displayName?: boolean;
    platform?: boolean;
    channelUrl?: boolean;
    audienceText?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mediaPartner"]>;
export type MediaPartnerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    displayName?: boolean;
    platform?: boolean;
    channelUrl?: boolean;
    audienceText?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mediaPartner"]>;
export type MediaPartnerSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    displayName?: boolean;
    platform?: boolean;
    channelUrl?: boolean;
    audienceText?: boolean;
    description?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MediaPartnerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "status" | "displayName" | "platform" | "channelUrl" | "audienceText" | "description" | "resolutionNote" | "createdAt" | "updatedAt", ExtArgs["result"]["mediaPartner"]>;
export type MediaPartnerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MediaPartnerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MediaPartnerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MediaPartnerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MediaPartner";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.MediaPartnerType;
        status: $Enums.MediaPartnerStatus;
        displayName: string;
        platform: string;
        channelUrl: string;
        audienceText: string | null;
        description: string;
        resolutionNote: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["mediaPartner"]>;
    composites: {};
};
export type MediaPartnerGetPayload<S extends boolean | null | undefined | MediaPartnerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload, S>;
export type MediaPartnerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MediaPartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MediaPartnerCountAggregateInputType | true;
};
export interface MediaPartnerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MediaPartner'];
        meta: {
            name: 'MediaPartner';
        };
    };
    findUnique<T extends MediaPartnerFindUniqueArgs>(args: Prisma.SelectSubset<T, MediaPartnerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MediaPartnerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MediaPartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MediaPartnerFindFirstArgs>(args?: Prisma.SelectSubset<T, MediaPartnerFindFirstArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MediaPartnerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MediaPartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MediaPartnerFindManyArgs>(args?: Prisma.SelectSubset<T, MediaPartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MediaPartnerCreateArgs>(args: Prisma.SelectSubset<T, MediaPartnerCreateArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MediaPartnerCreateManyArgs>(args?: Prisma.SelectSubset<T, MediaPartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MediaPartnerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MediaPartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MediaPartnerDeleteArgs>(args: Prisma.SelectSubset<T, MediaPartnerDeleteArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MediaPartnerUpdateArgs>(args: Prisma.SelectSubset<T, MediaPartnerUpdateArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MediaPartnerDeleteManyArgs>(args?: Prisma.SelectSubset<T, MediaPartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MediaPartnerUpdateManyArgs>(args: Prisma.SelectSubset<T, MediaPartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MediaPartnerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MediaPartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MediaPartnerUpsertArgs>(args: Prisma.SelectSubset<T, MediaPartnerUpsertArgs<ExtArgs>>): Prisma.Prisma__MediaPartnerClient<runtime.Types.Result.GetResult<Prisma.$MediaPartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MediaPartnerCountArgs>(args?: Prisma.Subset<T, MediaPartnerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MediaPartnerCountAggregateOutputType> : number>;
    aggregate<T extends MediaPartnerAggregateArgs>(args: Prisma.Subset<T, MediaPartnerAggregateArgs>): Prisma.PrismaPromise<GetMediaPartnerAggregateType<T>>;
    groupBy<T extends MediaPartnerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MediaPartnerGroupByArgs['orderBy'];
    } : {
        orderBy?: MediaPartnerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MediaPartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MediaPartnerFieldRefs;
}
export interface Prisma__MediaPartnerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MediaPartnerFieldRefs {
    readonly id: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly userId: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly type: Prisma.FieldRef<"MediaPartner", 'MediaPartnerType'>;
    readonly status: Prisma.FieldRef<"MediaPartner", 'MediaPartnerStatus'>;
    readonly displayName: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly platform: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly channelUrl: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly audienceText: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly description: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly resolutionNote: Prisma.FieldRef<"MediaPartner", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MediaPartner", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MediaPartner", 'DateTime'>;
}
export type MediaPartnerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where: Prisma.MediaPartnerWhereUniqueInput;
};
export type MediaPartnerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where: Prisma.MediaPartnerWhereUniqueInput;
};
export type MediaPartnerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where?: Prisma.MediaPartnerWhereInput;
    orderBy?: Prisma.MediaPartnerOrderByWithRelationInput | Prisma.MediaPartnerOrderByWithRelationInput[];
    cursor?: Prisma.MediaPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaPartnerScalarFieldEnum | Prisma.MediaPartnerScalarFieldEnum[];
};
export type MediaPartnerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where?: Prisma.MediaPartnerWhereInput;
    orderBy?: Prisma.MediaPartnerOrderByWithRelationInput | Prisma.MediaPartnerOrderByWithRelationInput[];
    cursor?: Prisma.MediaPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaPartnerScalarFieldEnum | Prisma.MediaPartnerScalarFieldEnum[];
};
export type MediaPartnerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where?: Prisma.MediaPartnerWhereInput;
    orderBy?: Prisma.MediaPartnerOrderByWithRelationInput | Prisma.MediaPartnerOrderByWithRelationInput[];
    cursor?: Prisma.MediaPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaPartnerScalarFieldEnum | Prisma.MediaPartnerScalarFieldEnum[];
};
export type MediaPartnerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaPartnerCreateInput, Prisma.MediaPartnerUncheckedCreateInput>;
};
export type MediaPartnerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MediaPartnerCreateManyInput | Prisma.MediaPartnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MediaPartnerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    data: Prisma.MediaPartnerCreateManyInput | Prisma.MediaPartnerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MediaPartnerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MediaPartnerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaPartnerUpdateInput, Prisma.MediaPartnerUncheckedUpdateInput>;
    where: Prisma.MediaPartnerWhereUniqueInput;
};
export type MediaPartnerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MediaPartnerUpdateManyMutationInput, Prisma.MediaPartnerUncheckedUpdateManyInput>;
    where?: Prisma.MediaPartnerWhereInput;
    limit?: number;
};
export type MediaPartnerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaPartnerUpdateManyMutationInput, Prisma.MediaPartnerUncheckedUpdateManyInput>;
    where?: Prisma.MediaPartnerWhereInput;
    limit?: number;
    include?: Prisma.MediaPartnerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MediaPartnerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where: Prisma.MediaPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.MediaPartnerCreateInput, Prisma.MediaPartnerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MediaPartnerUpdateInput, Prisma.MediaPartnerUncheckedUpdateInput>;
};
export type MediaPartnerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
    where: Prisma.MediaPartnerWhereUniqueInput;
};
export type MediaPartnerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaPartnerWhereInput;
    limit?: number;
};
export type MediaPartnerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaPartnerSelect<ExtArgs> | null;
    omit?: Prisma.MediaPartnerOmit<ExtArgs> | null;
    include?: Prisma.MediaPartnerInclude<ExtArgs> | null;
};
export {};
