import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityRoleEventModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityRoleEventPayload>;
export type AggregateCommunityRoleEvent = {
    _count: CommunityRoleEventCountAggregateOutputType | null;
    _min: CommunityRoleEventMinAggregateOutputType | null;
    _max: CommunityRoleEventMaxAggregateOutputType | null;
};
export type CommunityRoleEventMinAggregateOutputType = {
    id: string | null;
    roleId: string | null;
    userId: string | null;
    actorId: string | null;
    type: $Enums.RoleEventType | null;
    note: string | null;
    createdAt: Date | null;
};
export type CommunityRoleEventMaxAggregateOutputType = {
    id: string | null;
    roleId: string | null;
    userId: string | null;
    actorId: string | null;
    type: $Enums.RoleEventType | null;
    note: string | null;
    createdAt: Date | null;
};
export type CommunityRoleEventCountAggregateOutputType = {
    id: number;
    roleId: number;
    userId: number;
    actorId: number;
    type: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type CommunityRoleEventMinAggregateInputType = {
    id?: true;
    roleId?: true;
    userId?: true;
    actorId?: true;
    type?: true;
    note?: true;
    createdAt?: true;
};
export type CommunityRoleEventMaxAggregateInputType = {
    id?: true;
    roleId?: true;
    userId?: true;
    actorId?: true;
    type?: true;
    note?: true;
    createdAt?: true;
};
export type CommunityRoleEventCountAggregateInputType = {
    id?: true;
    roleId?: true;
    userId?: true;
    actorId?: true;
    type?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunityRoleEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleEventWhereInput;
    orderBy?: Prisma.CommunityRoleEventOrderByWithRelationInput | Prisma.CommunityRoleEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityRoleEventCountAggregateInputType;
    _min?: CommunityRoleEventMinAggregateInputType;
    _max?: CommunityRoleEventMaxAggregateInputType;
};
export type GetCommunityRoleEventAggregateType<T extends CommunityRoleEventAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityRoleEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityRoleEvent[P]> : Prisma.GetScalarType<T[P], AggregateCommunityRoleEvent[P]>;
};
export type CommunityRoleEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleEventWhereInput;
    orderBy?: Prisma.CommunityRoleEventOrderByWithAggregationInput | Prisma.CommunityRoleEventOrderByWithAggregationInput[];
    by: Prisma.CommunityRoleEventScalarFieldEnum[] | Prisma.CommunityRoleEventScalarFieldEnum;
    having?: Prisma.CommunityRoleEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityRoleEventCountAggregateInputType | true;
    _min?: CommunityRoleEventMinAggregateInputType;
    _max?: CommunityRoleEventMaxAggregateInputType;
};
export type CommunityRoleEventGroupByOutputType = {
    id: string;
    roleId: string;
    userId: string;
    actorId: string | null;
    type: $Enums.RoleEventType;
    note: string | null;
    createdAt: Date;
    _count: CommunityRoleEventCountAggregateOutputType | null;
    _min: CommunityRoleEventMinAggregateOutputType | null;
    _max: CommunityRoleEventMaxAggregateOutputType | null;
};
type GetCommunityRoleEventGroupByPayload<T extends CommunityRoleEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityRoleEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityRoleEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityRoleEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityRoleEventGroupByOutputType[P]>;
}>>;
export type CommunityRoleEventWhereInput = {
    AND?: Prisma.CommunityRoleEventWhereInput | Prisma.CommunityRoleEventWhereInput[];
    OR?: Prisma.CommunityRoleEventWhereInput[];
    NOT?: Prisma.CommunityRoleEventWhereInput | Prisma.CommunityRoleEventWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    roleId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    userId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    actorId?: Prisma.UuidNullableFilter<"CommunityRoleEvent"> | string | null;
    type?: Prisma.EnumRoleEventTypeFilter<"CommunityRoleEvent"> | $Enums.RoleEventType;
    note?: Prisma.StringNullableFilter<"CommunityRoleEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleEvent"> | Date | string;
    role?: Prisma.XOR<Prisma.CommunityRoleScalarRelationFilter, Prisma.CommunityRoleWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type CommunityRoleEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    role?: Prisma.CommunityRoleOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type CommunityRoleEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityRoleEventWhereInput | Prisma.CommunityRoleEventWhereInput[];
    OR?: Prisma.CommunityRoleEventWhereInput[];
    NOT?: Prisma.CommunityRoleEventWhereInput | Prisma.CommunityRoleEventWhereInput[];
    roleId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    userId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    actorId?: Prisma.UuidNullableFilter<"CommunityRoleEvent"> | string | null;
    type?: Prisma.EnumRoleEventTypeFilter<"CommunityRoleEvent"> | $Enums.RoleEventType;
    note?: Prisma.StringNullableFilter<"CommunityRoleEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleEvent"> | Date | string;
    role?: Prisma.XOR<Prisma.CommunityRoleScalarRelationFilter, Prisma.CommunityRoleWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type CommunityRoleEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityRoleEventCountOrderByAggregateInput;
    _max?: Prisma.CommunityRoleEventMaxOrderByAggregateInput;
    _min?: Prisma.CommunityRoleEventMinOrderByAggregateInput;
};
export type CommunityRoleEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityRoleEventScalarWhereWithAggregatesInput | Prisma.CommunityRoleEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityRoleEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityRoleEventScalarWhereWithAggregatesInput | Prisma.CommunityRoleEventScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityRoleEvent"> | string;
    roleId?: Prisma.UuidWithAggregatesFilter<"CommunityRoleEvent"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CommunityRoleEvent"> | string;
    actorId?: Prisma.UuidNullableWithAggregatesFilter<"CommunityRoleEvent"> | string | null;
    type?: Prisma.EnumRoleEventTypeWithAggregatesFilter<"CommunityRoleEvent"> | $Enums.RoleEventType;
    note?: Prisma.StringNullableWithAggregatesFilter<"CommunityRoleEvent"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityRoleEvent"> | Date | string;
};
export type CommunityRoleEventCreateInput = {
    id?: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
    role: Prisma.CommunityRoleCreateNestedOneWithoutEventsInput;
    user: Prisma.UserCreateNestedOneWithoutRoleEventsReceivedInput;
    actor?: Prisma.UserCreateNestedOneWithoutRoleEventsCreatedInput;
};
export type CommunityRoleEventUncheckedCreateInput = {
    id?: string;
    roleId: string;
    userId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.CommunityRoleUpdateOneRequiredWithoutEventsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRoleEventsReceivedNestedInput;
    actor?: Prisma.UserUpdateOneWithoutRoleEventsCreatedNestedInput;
};
export type CommunityRoleEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventCreateManyInput = {
    id?: string;
    roleId: string;
    userId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventListRelationFilter = {
    every?: Prisma.CommunityRoleEventWhereInput;
    some?: Prisma.CommunityRoleEventWhereInput;
    none?: Prisma.CommunityRoleEventWhereInput;
};
export type CommunityRoleEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityRoleEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleEventCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleEventCreateWithoutUserInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput | Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput> | Prisma.CommunityRoleEventCreateWithoutActorInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput | Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyActorInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleEventCreateWithoutUserInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput | Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput> | Prisma.CommunityRoleEventCreateWithoutActorInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput | Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyActorInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleEventCreateWithoutUserInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput | Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyUserInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutUserInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type CommunityRoleEventUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput> | Prisma.CommunityRoleEventCreateWithoutActorInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput | Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutActorInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyActorInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutActorInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutActorInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type CommunityRoleEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleEventCreateWithoutUserInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput | Prisma.CommunityRoleEventCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyUserInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutUserInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type CommunityRoleEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput> | Prisma.CommunityRoleEventCreateWithoutActorInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput | Prisma.CommunityRoleEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutActorInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyActorInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutActorInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutActorInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type CommunityRoleEventCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput> | Prisma.CommunityRoleEventCreateWithoutRoleInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput | Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyRoleInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput> | Prisma.CommunityRoleEventCreateWithoutRoleInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput | Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyRoleInputEnvelope;
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
};
export type CommunityRoleEventUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput> | Prisma.CommunityRoleEventCreateWithoutRoleInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput | Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutRoleInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyRoleInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutRoleInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutRoleInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type CommunityRoleEventUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput> | Prisma.CommunityRoleEventCreateWithoutRoleInput[] | Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput | Prisma.CommunityRoleEventCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutRoleInput | Prisma.CommunityRoleEventUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.CommunityRoleEventCreateManyRoleInputEnvelope;
    set?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    delete?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    connect?: Prisma.CommunityRoleEventWhereUniqueInput | Prisma.CommunityRoleEventWhereUniqueInput[];
    update?: Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutRoleInput | Prisma.CommunityRoleEventUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.CommunityRoleEventUpdateManyWithWhereWithoutRoleInput | Prisma.CommunityRoleEventUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
};
export type EnumRoleEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoleEventType;
};
export type CommunityRoleEventCreateWithoutUserInput = {
    id?: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
    role: Prisma.CommunityRoleCreateNestedOneWithoutEventsInput;
    actor?: Prisma.UserCreateNestedOneWithoutRoleEventsCreatedInput;
};
export type CommunityRoleEventUncheckedCreateWithoutUserInput = {
    id?: string;
    roleId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventCreateOrConnectWithoutUserInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput>;
};
export type CommunityRoleEventCreateManyUserInputEnvelope = {
    data: Prisma.CommunityRoleEventCreateManyUserInput | Prisma.CommunityRoleEventCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleEventCreateWithoutActorInput = {
    id?: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
    role: Prisma.CommunityRoleCreateNestedOneWithoutEventsInput;
    user: Prisma.UserCreateNestedOneWithoutRoleEventsReceivedInput;
};
export type CommunityRoleEventUncheckedCreateWithoutActorInput = {
    id?: string;
    roleId: string;
    userId: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventCreateOrConnectWithoutActorInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput>;
};
export type CommunityRoleEventCreateManyActorInputEnvelope = {
    data: Prisma.CommunityRoleEventCreateManyActorInput | Prisma.CommunityRoleEventCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleEventUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutUserInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutUserInput, Prisma.CommunityRoleEventUncheckedCreateWithoutUserInput>;
};
export type CommunityRoleEventUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutUserInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutUserInput>;
};
export type CommunityRoleEventUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommunityRoleEventScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateManyMutationInput, Prisma.CommunityRoleEventUncheckedUpdateManyWithoutUserInput>;
};
export type CommunityRoleEventScalarWhereInput = {
    AND?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
    OR?: Prisma.CommunityRoleEventScalarWhereInput[];
    NOT?: Prisma.CommunityRoleEventScalarWhereInput | Prisma.CommunityRoleEventScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    roleId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    userId?: Prisma.UuidFilter<"CommunityRoleEvent"> | string;
    actorId?: Prisma.UuidNullableFilter<"CommunityRoleEvent"> | string | null;
    type?: Prisma.EnumRoleEventTypeFilter<"CommunityRoleEvent"> | $Enums.RoleEventType;
    note?: Prisma.StringNullableFilter<"CommunityRoleEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleEvent"> | Date | string;
};
export type CommunityRoleEventUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutActorInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutActorInput, Prisma.CommunityRoleEventUncheckedCreateWithoutActorInput>;
};
export type CommunityRoleEventUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutActorInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutActorInput>;
};
export type CommunityRoleEventUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.CommunityRoleEventScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateManyMutationInput, Prisma.CommunityRoleEventUncheckedUpdateManyWithoutActorInput>;
};
export type CommunityRoleEventCreateWithoutRoleInput = {
    id?: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRoleEventsReceivedInput;
    actor?: Prisma.UserCreateNestedOneWithoutRoleEventsCreatedInput;
};
export type CommunityRoleEventUncheckedCreateWithoutRoleInput = {
    id?: string;
    userId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventCreateOrConnectWithoutRoleInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput>;
};
export type CommunityRoleEventCreateManyRoleInputEnvelope = {
    data: Prisma.CommunityRoleEventCreateManyRoleInput | Prisma.CommunityRoleEventCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleEventUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedCreateWithoutRoleInput>;
};
export type CommunityRoleEventUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateWithoutRoleInput, Prisma.CommunityRoleEventUncheckedUpdateWithoutRoleInput>;
};
export type CommunityRoleEventUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.CommunityRoleEventScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateManyMutationInput, Prisma.CommunityRoleEventUncheckedUpdateManyWithoutRoleInput>;
};
export type CommunityRoleEventCreateManyUserInput = {
    id?: string;
    roleId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventCreateManyActorInput = {
    id?: string;
    roleId: string;
    userId: string;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.CommunityRoleUpdateOneRequiredWithoutEventsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutRoleEventsCreatedNestedInput;
};
export type CommunityRoleEventUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.CommunityRoleUpdateOneRequiredWithoutEventsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRoleEventsReceivedNestedInput;
};
export type CommunityRoleEventUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventCreateManyRoleInput = {
    id?: string;
    userId: string;
    actorId?: string | null;
    type: $Enums.RoleEventType;
    note?: string | null;
    createdAt?: Date | string;
};
export type CommunityRoleEventUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRoleEventsReceivedNestedInput;
    actor?: Prisma.UserUpdateOneWithoutRoleEventsCreatedNestedInput;
};
export type CommunityRoleEventUncheckedUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventUncheckedUpdateManyWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumRoleEventTypeFieldUpdateOperationsInput | $Enums.RoleEventType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roleId?: boolean;
    userId?: boolean;
    actorId?: boolean;
    type?: boolean;
    note?: boolean;
    createdAt?: boolean;
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleEvent"]>;
export type CommunityRoleEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roleId?: boolean;
    userId?: boolean;
    actorId?: boolean;
    type?: boolean;
    note?: boolean;
    createdAt?: boolean;
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleEvent"]>;
export type CommunityRoleEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roleId?: boolean;
    userId?: boolean;
    actorId?: boolean;
    type?: boolean;
    note?: boolean;
    createdAt?: boolean;
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleEvent"]>;
export type CommunityRoleEventSelectScalar = {
    id?: boolean;
    roleId?: boolean;
    userId?: boolean;
    actorId?: boolean;
    type?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type CommunityRoleEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roleId" | "userId" | "actorId" | "type" | "note" | "createdAt", ExtArgs["result"]["communityRoleEvent"]>;
export type CommunityRoleEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
};
export type CommunityRoleEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
};
export type CommunityRoleEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.CommunityRoleDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.CommunityRoleEvent$actorArgs<ExtArgs>;
};
export type $CommunityRoleEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityRoleEvent";
    objects: {
        role: Prisma.$CommunityRolePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roleId: string;
        userId: string;
        actorId: string | null;
        type: $Enums.RoleEventType;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["communityRoleEvent"]>;
    composites: {};
};
export type CommunityRoleEventGetPayload<S extends boolean | null | undefined | CommunityRoleEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload, S>;
export type CommunityRoleEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityRoleEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityRoleEventCountAggregateInputType | true;
};
export interface CommunityRoleEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityRoleEvent'];
        meta: {
            name: 'CommunityRoleEvent';
        };
    };
    findUnique<T extends CommunityRoleEventFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityRoleEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityRoleEventFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityRoleEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityRoleEventFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityRoleEventCreateArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityRoleEventCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityRoleEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityRoleEventDeleteArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityRoleEventUpdateArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityRoleEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityRoleEventUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityRoleEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityRoleEventUpsertArgs>(args: Prisma.SelectSubset<T, CommunityRoleEventUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityRoleEventCountArgs>(args?: Prisma.Subset<T, CommunityRoleEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityRoleEventCountAggregateOutputType> : number>;
    aggregate<T extends CommunityRoleEventAggregateArgs>(args: Prisma.Subset<T, CommunityRoleEventAggregateArgs>): Prisma.PrismaPromise<GetCommunityRoleEventAggregateType<T>>;
    groupBy<T extends CommunityRoleEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityRoleEventGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityRoleEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityRoleEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityRoleEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityRoleEventFieldRefs;
}
export interface Prisma__CommunityRoleEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    role<T extends Prisma.CommunityRoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityRoleDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.CommunityRoleEvent$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityRoleEvent$actorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityRoleEventFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityRoleEvent", 'String'>;
    readonly roleId: Prisma.FieldRef<"CommunityRoleEvent", 'String'>;
    readonly userId: Prisma.FieldRef<"CommunityRoleEvent", 'String'>;
    readonly actorId: Prisma.FieldRef<"CommunityRoleEvent", 'String'>;
    readonly type: Prisma.FieldRef<"CommunityRoleEvent", 'RoleEventType'>;
    readonly note: Prisma.FieldRef<"CommunityRoleEvent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CommunityRoleEvent", 'DateTime'>;
}
export type CommunityRoleEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleEventWhereUniqueInput;
};
export type CommunityRoleEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleEventWhereUniqueInput;
};
export type CommunityRoleEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleEventWhereInput;
    orderBy?: Prisma.CommunityRoleEventOrderByWithRelationInput | Prisma.CommunityRoleEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleEventScalarFieldEnum | Prisma.CommunityRoleEventScalarFieldEnum[];
};
export type CommunityRoleEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleEventWhereInput;
    orderBy?: Prisma.CommunityRoleEventOrderByWithRelationInput | Prisma.CommunityRoleEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleEventScalarFieldEnum | Prisma.CommunityRoleEventScalarFieldEnum[];
};
export type CommunityRoleEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleEventWhereInput;
    orderBy?: Prisma.CommunityRoleEventOrderByWithRelationInput | Prisma.CommunityRoleEventOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleEventScalarFieldEnum | Prisma.CommunityRoleEventScalarFieldEnum[];
};
export type CommunityRoleEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleEventCreateInput, Prisma.CommunityRoleEventUncheckedCreateInput>;
};
export type CommunityRoleEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityRoleEventCreateManyInput | Prisma.CommunityRoleEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    data: Prisma.CommunityRoleEventCreateManyInput | Prisma.CommunityRoleEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityRoleEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateInput, Prisma.CommunityRoleEventUncheckedUpdateInput>;
    where: Prisma.CommunityRoleEventWhereUniqueInput;
};
export type CommunityRoleEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateManyMutationInput, Prisma.CommunityRoleEventUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleEventWhereInput;
    limit?: number;
};
export type CommunityRoleEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleEventUpdateManyMutationInput, Prisma.CommunityRoleEventUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleEventWhereInput;
    limit?: number;
    include?: Prisma.CommunityRoleEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleEventCreateInput, Prisma.CommunityRoleEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityRoleEventUpdateInput, Prisma.CommunityRoleEventUncheckedUpdateInput>;
};
export type CommunityRoleEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleEventWhereUniqueInput;
};
export type CommunityRoleEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleEventWhereInput;
    limit?: number;
};
export type CommunityRoleEvent$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type CommunityRoleEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleEventSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleEventOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleEventInclude<ExtArgs> | null;
};
export {};
