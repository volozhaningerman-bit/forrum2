import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityEventModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityEventPayload>;
export type AggregateCommunityEvent = {
    _count: CommunityEventCountAggregateOutputType | null;
    _avg: CommunityEventAvgAggregateOutputType | null;
    _sum: CommunityEventSumAggregateOutputType | null;
    _min: CommunityEventMinAggregateOutputType | null;
    _max: CommunityEventMaxAggregateOutputType | null;
};
export type CommunityEventAvgAggregateOutputType = {
    capacity: number | null;
};
export type CommunityEventSumAggregateOutputType = {
    capacity: number | null;
};
export type CommunityEventMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    createdById: string | null;
    title: string | null;
    description: string | null;
    format: $Enums.CommunityEventFormat | null;
    status: $Enums.CommunityEventStatus | null;
    startsAt: Date | null;
    endsAt: Date | null;
    location: string | null;
    capacity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityEventMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    createdById: string | null;
    title: string | null;
    description: string | null;
    format: $Enums.CommunityEventFormat | null;
    status: $Enums.CommunityEventStatus | null;
    startsAt: Date | null;
    endsAt: Date | null;
    location: string | null;
    capacity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityEventCountAggregateOutputType = {
    id: number;
    communityId: number;
    createdById: number;
    title: number;
    description: number;
    format: number;
    status: number;
    startsAt: number;
    endsAt: number;
    location: number;
    capacity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommunityEventAvgAggregateInputType = {
    capacity?: true;
};
export type CommunityEventSumAggregateInputType = {
    capacity?: true;
};
export type CommunityEventMinAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    format?: true;
    status?: true;
    startsAt?: true;
    endsAt?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityEventMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    format?: true;
    status?: true;
    startsAt?: true;
    endsAt?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityEventCountAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    format?: true;
    status?: true;
    startsAt?: true;
    endsAt?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommunityEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventWhereInput;
    orderBy?: Prisma.CommunityEventOrderByWithRelationInput | Prisma.CommunityEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityEventCountAggregateInputType;
    _avg?: CommunityEventAvgAggregateInputType;
    _sum?: CommunityEventSumAggregateInputType;
    _min?: CommunityEventMinAggregateInputType;
    _max?: CommunityEventMaxAggregateInputType;
};
export type GetCommunityEventAggregateType<T extends CommunityEventAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityEvent[P]> : Prisma.GetScalarType<T[P], AggregateCommunityEvent[P]>;
};
export type CommunityEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventWhereInput;
    orderBy?: Prisma.CommunityEventOrderByWithAggregationInput | Prisma.CommunityEventOrderByWithAggregationInput[];
    by: Prisma.CommunityEventScalarFieldEnum[] | Prisma.CommunityEventScalarFieldEnum;
    having?: Prisma.CommunityEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityEventCountAggregateInputType | true;
    _avg?: CommunityEventAvgAggregateInputType;
    _sum?: CommunityEventSumAggregateInputType;
    _min?: CommunityEventMinAggregateInputType;
    _max?: CommunityEventMaxAggregateInputType;
};
export type CommunityEventGroupByOutputType = {
    id: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status: $Enums.CommunityEventStatus;
    startsAt: Date;
    endsAt: Date | null;
    location: string | null;
    capacity: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CommunityEventCountAggregateOutputType | null;
    _avg: CommunityEventAvgAggregateOutputType | null;
    _sum: CommunityEventSumAggregateOutputType | null;
    _min: CommunityEventMinAggregateOutputType | null;
    _max: CommunityEventMaxAggregateOutputType | null;
};
type GetCommunityEventGroupByPayload<T extends CommunityEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityEventGroupByOutputType[P]>;
}>>;
export type CommunityEventWhereInput = {
    AND?: Prisma.CommunityEventWhereInput | Prisma.CommunityEventWhereInput[];
    OR?: Prisma.CommunityEventWhereInput[];
    NOT?: Prisma.CommunityEventWhereInput | Prisma.CommunityEventWhereInput[];
    id?: Prisma.UuidFilter<"CommunityEvent"> | string;
    communityId?: Prisma.UuidFilter<"CommunityEvent"> | string;
    createdById?: Prisma.UuidFilter<"CommunityEvent"> | string;
    title?: Prisma.StringFilter<"CommunityEvent"> | string;
    description?: Prisma.StringFilter<"CommunityEvent"> | string;
    format?: Prisma.EnumCommunityEventFormatFilter<"CommunityEvent"> | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFilter<"CommunityEvent"> | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"CommunityEvent"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"CommunityEvent"> | string | null;
    capacity?: Prisma.IntNullableFilter<"CommunityEvent"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    attendees?: Prisma.CommunityEventAttendanceListRelationFilter;
};
export type CommunityEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    attendees?: Prisma.CommunityEventAttendanceOrderByRelationAggregateInput;
};
export type CommunityEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityEventWhereInput | Prisma.CommunityEventWhereInput[];
    OR?: Prisma.CommunityEventWhereInput[];
    NOT?: Prisma.CommunityEventWhereInput | Prisma.CommunityEventWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityEvent"> | string;
    createdById?: Prisma.UuidFilter<"CommunityEvent"> | string;
    title?: Prisma.StringFilter<"CommunityEvent"> | string;
    description?: Prisma.StringFilter<"CommunityEvent"> | string;
    format?: Prisma.EnumCommunityEventFormatFilter<"CommunityEvent"> | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFilter<"CommunityEvent"> | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"CommunityEvent"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"CommunityEvent"> | string | null;
    capacity?: Prisma.IntNullableFilter<"CommunityEvent"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    attendees?: Prisma.CommunityEventAttendanceListRelationFilter;
}, "id">;
export type CommunityEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityEventCountOrderByAggregateInput;
    _avg?: Prisma.CommunityEventAvgOrderByAggregateInput;
    _max?: Prisma.CommunityEventMaxOrderByAggregateInput;
    _min?: Prisma.CommunityEventMinOrderByAggregateInput;
    _sum?: Prisma.CommunityEventSumOrderByAggregateInput;
};
export type CommunityEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityEventScalarWhereWithAggregatesInput | Prisma.CommunityEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityEventScalarWhereWithAggregatesInput | Prisma.CommunityEventScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityEvent"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityEvent"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"CommunityEvent"> | string;
    title?: Prisma.StringWithAggregatesFilter<"CommunityEvent"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CommunityEvent"> | string;
    format?: Prisma.EnumCommunityEventFormatWithAggregatesFilter<"CommunityEvent"> | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusWithAggregatesFilter<"CommunityEvent"> | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityEvent"> | Date | string;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommunityEvent"> | Date | string | null;
    location?: Prisma.StringNullableWithAggregatesFilter<"CommunityEvent"> | string | null;
    capacity?: Prisma.IntNullableWithAggregatesFilter<"CommunityEvent"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityEvent"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityEvent"> | Date | string;
};
export type CommunityEventCreateInput = {
    id?: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCommunityEventsInput;
    attendees?: Prisma.CommunityEventAttendanceCreateNestedManyWithoutEventInput;
};
export type CommunityEventUncheckedCreateInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedCreateNestedManyWithoutEventInput;
};
export type CommunityEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCommunityEventsNestedInput;
    attendees?: Prisma.CommunityEventAttendanceUpdateManyWithoutEventNestedInput;
};
export type CommunityEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedUpdateManyWithoutEventNestedInput;
};
export type CommunityEventCreateManyInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventListRelationFilter = {
    every?: Prisma.CommunityEventWhereInput;
    some?: Prisma.CommunityEventWhereInput;
    none?: Prisma.CommunityEventWhereInput;
};
export type CommunityEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventAvgOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type CommunityEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventSumOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type CommunityEventScalarRelationFilter = {
    is?: Prisma.CommunityEventWhereInput;
    isNot?: Prisma.CommunityEventWhereInput;
};
export type CommunityEventCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityEventCreateWithoutCreatedByInput[] | Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput | Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityEventCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
};
export type CommunityEventUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityEventCreateWithoutCreatedByInput[] | Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput | Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityEventCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
};
export type CommunityEventUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityEventCreateWithoutCreatedByInput[] | Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput | Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityEventUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityEventUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityEventCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    delete?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    update?: Prisma.CommunityEventUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityEventUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityEventUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityEventUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
};
export type CommunityEventUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityEventCreateWithoutCreatedByInput[] | Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput | Prisma.CommunityEventCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityEventUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityEventUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityEventCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    delete?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    update?: Prisma.CommunityEventUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityEventUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityEventUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityEventUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
};
export type CommunityEventCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput> | Prisma.CommunityEventCreateWithoutCommunityInput[] | Prisma.CommunityEventUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCommunityInput | Prisma.CommunityEventCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityEventCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
};
export type CommunityEventUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput> | Prisma.CommunityEventCreateWithoutCommunityInput[] | Prisma.CommunityEventUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCommunityInput | Prisma.CommunityEventCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityEventCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
};
export type CommunityEventUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput> | Prisma.CommunityEventCreateWithoutCommunityInput[] | Prisma.CommunityEventUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCommunityInput | Prisma.CommunityEventCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityEventUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityEventUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityEventCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    delete?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    update?: Prisma.CommunityEventUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityEventUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityEventUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityEventUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
};
export type CommunityEventUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput> | Prisma.CommunityEventCreateWithoutCommunityInput[] | Prisma.CommunityEventUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutCommunityInput | Prisma.CommunityEventCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityEventUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityEventUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityEventCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    delete?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    connect?: Prisma.CommunityEventWhereUniqueInput | Prisma.CommunityEventWhereUniqueInput[];
    update?: Prisma.CommunityEventUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityEventUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityEventUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityEventUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
};
export type EnumCommunityEventFormatFieldUpdateOperationsInput = {
    set?: $Enums.CommunityEventFormat;
};
export type EnumCommunityEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.CommunityEventStatus;
};
export type CommunityEventCreateNestedOneWithoutAttendeesInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutAttendeesInput, Prisma.CommunityEventUncheckedCreateWithoutAttendeesInput>;
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutAttendeesInput;
    connect?: Prisma.CommunityEventWhereUniqueInput;
};
export type CommunityEventUpdateOneRequiredWithoutAttendeesNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventCreateWithoutAttendeesInput, Prisma.CommunityEventUncheckedCreateWithoutAttendeesInput>;
    connectOrCreate?: Prisma.CommunityEventCreateOrConnectWithoutAttendeesInput;
    upsert?: Prisma.CommunityEventUpsertWithoutAttendeesInput;
    connect?: Prisma.CommunityEventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityEventUpdateToOneWithWhereWithoutAttendeesInput, Prisma.CommunityEventUpdateWithoutAttendeesInput>, Prisma.CommunityEventUncheckedUpdateWithoutAttendeesInput>;
};
export type CommunityEventCreateWithoutCreatedByInput = {
    id?: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutEventsInput;
    attendees?: Prisma.CommunityEventAttendanceCreateNestedManyWithoutEventInput;
};
export type CommunityEventUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    communityId: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedCreateNestedManyWithoutEventInput;
};
export type CommunityEventCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityEventCreateManyCreatedByInputEnvelope = {
    data: Prisma.CommunityEventCreateManyCreatedByInput | Prisma.CommunityEventCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityEventUpdateWithoutCreatedByInput, Prisma.CommunityEventUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutCreatedByInput, Prisma.CommunityEventUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityEventUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityEventUpdateWithoutCreatedByInput, Prisma.CommunityEventUncheckedUpdateWithoutCreatedByInput>;
};
export type CommunityEventUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.CommunityEventScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityEventUpdateManyMutationInput, Prisma.CommunityEventUncheckedUpdateManyWithoutCreatedByInput>;
};
export type CommunityEventScalarWhereInput = {
    AND?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
    OR?: Prisma.CommunityEventScalarWhereInput[];
    NOT?: Prisma.CommunityEventScalarWhereInput | Prisma.CommunityEventScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityEvent"> | string;
    communityId?: Prisma.UuidFilter<"CommunityEvent"> | string;
    createdById?: Prisma.UuidFilter<"CommunityEvent"> | string;
    title?: Prisma.StringFilter<"CommunityEvent"> | string;
    description?: Prisma.StringFilter<"CommunityEvent"> | string;
    format?: Prisma.EnumCommunityEventFormatFilter<"CommunityEvent"> | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFilter<"CommunityEvent"> | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"CommunityEvent"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"CommunityEvent"> | string | null;
    capacity?: Prisma.IntNullableFilter<"CommunityEvent"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEvent"> | Date | string;
};
export type CommunityEventCreateWithoutCommunityInput = {
    id?: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutCommunityEventsInput;
    attendees?: Prisma.CommunityEventAttendanceCreateNestedManyWithoutEventInput;
};
export type CommunityEventUncheckedCreateWithoutCommunityInput = {
    id?: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedCreateNestedManyWithoutEventInput;
};
export type CommunityEventCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput>;
};
export type CommunityEventCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityEventCreateManyCommunityInput | Prisma.CommunityEventCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityEventUpdateWithoutCommunityInput, Prisma.CommunityEventUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutCommunityInput, Prisma.CommunityEventUncheckedCreateWithoutCommunityInput>;
};
export type CommunityEventUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityEventUpdateWithoutCommunityInput, Prisma.CommunityEventUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityEventUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityEventScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityEventUpdateManyMutationInput, Prisma.CommunityEventUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityEventCreateWithoutAttendeesInput = {
    id?: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCommunityEventsInput;
};
export type CommunityEventUncheckedCreateWithoutAttendeesInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventCreateOrConnectWithoutAttendeesInput = {
    where: Prisma.CommunityEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutAttendeesInput, Prisma.CommunityEventUncheckedCreateWithoutAttendeesInput>;
};
export type CommunityEventUpsertWithoutAttendeesInput = {
    update: Prisma.XOR<Prisma.CommunityEventUpdateWithoutAttendeesInput, Prisma.CommunityEventUncheckedUpdateWithoutAttendeesInput>;
    create: Prisma.XOR<Prisma.CommunityEventCreateWithoutAttendeesInput, Prisma.CommunityEventUncheckedCreateWithoutAttendeesInput>;
    where?: Prisma.CommunityEventWhereInput;
};
export type CommunityEventUpdateToOneWithWhereWithoutAttendeesInput = {
    where?: Prisma.CommunityEventWhereInput;
    data: Prisma.XOR<Prisma.CommunityEventUpdateWithoutAttendeesInput, Prisma.CommunityEventUncheckedUpdateWithoutAttendeesInput>;
};
export type CommunityEventUpdateWithoutAttendeesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCommunityEventsNestedInput;
};
export type CommunityEventUncheckedUpdateWithoutAttendeesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventCreateManyCreatedByInput = {
    id?: string;
    communityId: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutEventsNestedInput;
    attendees?: Prisma.CommunityEventAttendanceUpdateManyWithoutEventNestedInput;
};
export type CommunityEventUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedUpdateManyWithoutEventNestedInput;
};
export type CommunityEventUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventCreateManyCommunityInput = {
    id?: string;
    createdById: string;
    title: string;
    description: string;
    format: $Enums.CommunityEventFormat;
    status?: $Enums.CommunityEventStatus;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCommunityEventsNestedInput;
    attendees?: Prisma.CommunityEventAttendanceUpdateManyWithoutEventNestedInput;
};
export type CommunityEventUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendees?: Prisma.CommunityEventAttendanceUncheckedUpdateManyWithoutEventNestedInput;
};
export type CommunityEventUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.EnumCommunityEventFormatFieldUpdateOperationsInput | $Enums.CommunityEventFormat;
    status?: Prisma.EnumCommunityEventStatusFieldUpdateOperationsInput | $Enums.CommunityEventStatus;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventCountOutputType = {
    attendees: number;
};
export type CommunityEventCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attendees?: boolean | CommunityEventCountOutputTypeCountAttendeesArgs;
};
export type CommunityEventCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventCountOutputTypeSelect<ExtArgs> | null;
};
export type CommunityEventCountOutputTypeCountAttendeesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventAttendanceWhereInput;
};
export type CommunityEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    format?: boolean;
    status?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    attendees?: boolean | Prisma.CommunityEvent$attendeesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityEventCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEvent"]>;
export type CommunityEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    format?: boolean;
    status?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEvent"]>;
export type CommunityEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    format?: boolean;
    status?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEvent"]>;
export type CommunityEventSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    format?: boolean;
    status?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommunityEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "createdById" | "title" | "description" | "format" | "status" | "startsAt" | "endsAt" | "location" | "capacity" | "createdAt" | "updatedAt", ExtArgs["result"]["communityEvent"]>;
export type CommunityEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    attendees?: boolean | Prisma.CommunityEvent$attendeesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityEventCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommunityEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommunityEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityEvent";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        attendees: Prisma.$CommunityEventAttendancePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        createdById: string;
        title: string;
        description: string;
        format: $Enums.CommunityEventFormat;
        status: $Enums.CommunityEventStatus;
        startsAt: Date;
        endsAt: Date | null;
        location: string | null;
        capacity: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["communityEvent"]>;
    composites: {};
};
export type CommunityEventGetPayload<S extends boolean | null | undefined | CommunityEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload, S>;
export type CommunityEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityEventCountAggregateInputType | true;
};
export interface CommunityEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityEvent'];
        meta: {
            name: 'CommunityEvent';
        };
    };
    findUnique<T extends CommunityEventFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityEventFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityEventFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityEventCreateArgs>(args: Prisma.SelectSubset<T, CommunityEventCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityEventCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityEventDeleteArgs>(args: Prisma.SelectSubset<T, CommunityEventDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityEventUpdateArgs>(args: Prisma.SelectSubset<T, CommunityEventUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityEventUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityEventUpsertArgs>(args: Prisma.SelectSubset<T, CommunityEventUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityEventCountArgs>(args?: Prisma.Subset<T, CommunityEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityEventCountAggregateOutputType> : number>;
    aggregate<T extends CommunityEventAggregateArgs>(args: Prisma.Subset<T, CommunityEventAggregateArgs>): Prisma.PrismaPromise<GetCommunityEventAggregateType<T>>;
    groupBy<T extends CommunityEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityEventGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityEventFieldRefs;
}
export interface Prisma__CommunityEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    attendees<T extends Prisma.CommunityEvent$attendeesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityEvent$attendeesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityEventFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly createdById: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly title: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly description: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly format: Prisma.FieldRef<"CommunityEvent", 'CommunityEventFormat'>;
    readonly status: Prisma.FieldRef<"CommunityEvent", 'CommunityEventStatus'>;
    readonly startsAt: Prisma.FieldRef<"CommunityEvent", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"CommunityEvent", 'DateTime'>;
    readonly location: Prisma.FieldRef<"CommunityEvent", 'String'>;
    readonly capacity: Prisma.FieldRef<"CommunityEvent", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"CommunityEvent", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommunityEvent", 'DateTime'>;
}
export type CommunityEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where: Prisma.CommunityEventWhereUniqueInput;
};
export type CommunityEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where: Prisma.CommunityEventWhereUniqueInput;
};
export type CommunityEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityEventWhereInput;
    orderBy?: Prisma.CommunityEventOrderByWithRelationInput | Prisma.CommunityEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityEventScalarFieldEnum | Prisma.CommunityEventScalarFieldEnum[];
};
export type CommunityEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityEventWhereInput;
    orderBy?: Prisma.CommunityEventOrderByWithRelationInput | Prisma.CommunityEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityEventScalarFieldEnum | Prisma.CommunityEventScalarFieldEnum[];
};
export type CommunityEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityEventWhereInput;
    orderBy?: Prisma.CommunityEventOrderByWithRelationInput | Prisma.CommunityEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityEventScalarFieldEnum | Prisma.CommunityEventScalarFieldEnum[];
};
export type CommunityEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventCreateInput, Prisma.CommunityEventUncheckedCreateInput>;
};
export type CommunityEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityEventCreateManyInput | Prisma.CommunityEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    data: Prisma.CommunityEventCreateManyInput | Prisma.CommunityEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventUpdateInput, Prisma.CommunityEventUncheckedUpdateInput>;
    where: Prisma.CommunityEventWhereUniqueInput;
};
export type CommunityEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityEventUpdateManyMutationInput, Prisma.CommunityEventUncheckedUpdateManyInput>;
    where?: Prisma.CommunityEventWhereInput;
    limit?: number;
};
export type CommunityEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventUpdateManyMutationInput, Prisma.CommunityEventUncheckedUpdateManyInput>;
    where?: Prisma.CommunityEventWhereInput;
    limit?: number;
    include?: Prisma.CommunityEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where: Prisma.CommunityEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventCreateInput, Prisma.CommunityEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityEventUpdateInput, Prisma.CommunityEventUncheckedUpdateInput>;
};
export type CommunityEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
    where: Prisma.CommunityEventWhereUniqueInput;
};
export type CommunityEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventWhereInput;
    limit?: number;
};
export type CommunityEvent$attendeesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    where?: Prisma.CommunityEventAttendanceWhereInput;
    orderBy?: Prisma.CommunityEventAttendanceOrderByWithRelationInput | Prisma.CommunityEventAttendanceOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventAttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityEventAttendanceScalarFieldEnum | Prisma.CommunityEventAttendanceScalarFieldEnum[];
};
export type CommunityEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventInclude<ExtArgs> | null;
};
export {};
