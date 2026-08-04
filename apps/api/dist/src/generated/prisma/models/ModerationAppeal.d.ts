import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ModerationAppealModel = runtime.Types.Result.DefaultSelection<Prisma.$ModerationAppealPayload>;
export type AggregateModerationAppeal = {
    _count: ModerationAppealCountAggregateOutputType | null;
    _min: ModerationAppealMinAggregateOutputType | null;
    _max: ModerationAppealMaxAggregateOutputType | null;
};
export type ModerationAppealMinAggregateOutputType = {
    id: string | null;
    actionId: string | null;
    userId: string | null;
    body: string | null;
    status: $Enums.AppealStatus | null;
    resolutionNote: string | null;
    resolvedById: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
};
export type ModerationAppealMaxAggregateOutputType = {
    id: string | null;
    actionId: string | null;
    userId: string | null;
    body: string | null;
    status: $Enums.AppealStatus | null;
    resolutionNote: string | null;
    resolvedById: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
};
export type ModerationAppealCountAggregateOutputType = {
    id: number;
    actionId: number;
    userId: number;
    body: number;
    status: number;
    resolutionNote: number;
    resolvedById: number;
    resolvedAt: number;
    createdAt: number;
    _all: number;
};
export type ModerationAppealMinAggregateInputType = {
    id?: true;
    actionId?: true;
    userId?: true;
    body?: true;
    status?: true;
    resolutionNote?: true;
    resolvedById?: true;
    resolvedAt?: true;
    createdAt?: true;
};
export type ModerationAppealMaxAggregateInputType = {
    id?: true;
    actionId?: true;
    userId?: true;
    body?: true;
    status?: true;
    resolutionNote?: true;
    resolvedById?: true;
    resolvedAt?: true;
    createdAt?: true;
};
export type ModerationAppealCountAggregateInputType = {
    id?: true;
    actionId?: true;
    userId?: true;
    body?: true;
    status?: true;
    resolutionNote?: true;
    resolvedById?: true;
    resolvedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type ModerationAppealAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithRelationInput | Prisma.ModerationAppealOrderByWithRelationInput[];
    cursor?: Prisma.ModerationAppealWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ModerationAppealCountAggregateInputType;
    _min?: ModerationAppealMinAggregateInputType;
    _max?: ModerationAppealMaxAggregateInputType;
};
export type GetModerationAppealAggregateType<T extends ModerationAppealAggregateArgs> = {
    [P in keyof T & keyof AggregateModerationAppeal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateModerationAppeal[P]> : Prisma.GetScalarType<T[P], AggregateModerationAppeal[P]>;
};
export type ModerationAppealGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithAggregationInput | Prisma.ModerationAppealOrderByWithAggregationInput[];
    by: Prisma.ModerationAppealScalarFieldEnum[] | Prisma.ModerationAppealScalarFieldEnum;
    having?: Prisma.ModerationAppealScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ModerationAppealCountAggregateInputType | true;
    _min?: ModerationAppealMinAggregateInputType;
    _max?: ModerationAppealMaxAggregateInputType;
};
export type ModerationAppealGroupByOutputType = {
    id: string;
    actionId: string;
    userId: string;
    body: string;
    status: $Enums.AppealStatus;
    resolutionNote: string | null;
    resolvedById: string | null;
    resolvedAt: Date | null;
    createdAt: Date;
    _count: ModerationAppealCountAggregateOutputType | null;
    _min: ModerationAppealMinAggregateOutputType | null;
    _max: ModerationAppealMaxAggregateOutputType | null;
};
type GetModerationAppealGroupByPayload<T extends ModerationAppealGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ModerationAppealGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ModerationAppealGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ModerationAppealGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ModerationAppealGroupByOutputType[P]>;
}>>;
export type ModerationAppealWhereInput = {
    AND?: Prisma.ModerationAppealWhereInput | Prisma.ModerationAppealWhereInput[];
    OR?: Prisma.ModerationAppealWhereInput[];
    NOT?: Prisma.ModerationAppealWhereInput | Prisma.ModerationAppealWhereInput[];
    id?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    actionId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    userId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    body?: Prisma.StringFilter<"ModerationAppeal"> | string;
    status?: Prisma.EnumAppealStatusFilter<"ModerationAppeal"> | $Enums.AppealStatus;
    resolutionNote?: Prisma.StringNullableFilter<"ModerationAppeal"> | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"ModerationAppeal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"ModerationAppeal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAppeal"> | Date | string;
    action?: Prisma.XOR<Prisma.ModerationActionScalarRelationFilter, Prisma.ModerationActionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type ModerationAppealOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    actionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    action?: Prisma.ModerationActionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    resolvedBy?: Prisma.UserOrderByWithRelationInput;
};
export type ModerationAppealWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    actionId_userId?: Prisma.ModerationAppealActionIdUserIdCompoundUniqueInput;
    AND?: Prisma.ModerationAppealWhereInput | Prisma.ModerationAppealWhereInput[];
    OR?: Prisma.ModerationAppealWhereInput[];
    NOT?: Prisma.ModerationAppealWhereInput | Prisma.ModerationAppealWhereInput[];
    actionId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    userId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    body?: Prisma.StringFilter<"ModerationAppeal"> | string;
    status?: Prisma.EnumAppealStatusFilter<"ModerationAppeal"> | $Enums.AppealStatus;
    resolutionNote?: Prisma.StringNullableFilter<"ModerationAppeal"> | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"ModerationAppeal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"ModerationAppeal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAppeal"> | Date | string;
    action?: Prisma.XOR<Prisma.ModerationActionScalarRelationFilter, Prisma.ModerationActionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "actionId_userId">;
export type ModerationAppealOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    actionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ModerationAppealCountOrderByAggregateInput;
    _max?: Prisma.ModerationAppealMaxOrderByAggregateInput;
    _min?: Prisma.ModerationAppealMinOrderByAggregateInput;
};
export type ModerationAppealScalarWhereWithAggregatesInput = {
    AND?: Prisma.ModerationAppealScalarWhereWithAggregatesInput | Prisma.ModerationAppealScalarWhereWithAggregatesInput[];
    OR?: Prisma.ModerationAppealScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ModerationAppealScalarWhereWithAggregatesInput | Prisma.ModerationAppealScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ModerationAppeal"> | string;
    actionId?: Prisma.UuidWithAggregatesFilter<"ModerationAppeal"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"ModerationAppeal"> | string;
    body?: Prisma.StringWithAggregatesFilter<"ModerationAppeal"> | string;
    status?: Prisma.EnumAppealStatusWithAggregatesFilter<"ModerationAppeal"> | $Enums.AppealStatus;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"ModerationAppeal"> | string | null;
    resolvedById?: Prisma.UuidNullableWithAggregatesFilter<"ModerationAppeal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ModerationAppeal"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ModerationAppeal"> | Date | string;
};
export type ModerationAppealCreateInput = {
    id?: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    action: Prisma.ModerationActionCreateNestedOneWithoutAppealsInput;
    user: Prisma.UserCreateNestedOneWithoutModerationAppealsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutModerationAppealsResolvedInput;
};
export type ModerationAppealUncheckedCreateInput = {
    id?: string;
    actionId: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    action?: Prisma.ModerationActionUpdateOneRequiredWithoutAppealsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutModerationAppealsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutModerationAppealsResolvedNestedInput;
};
export type ModerationAppealUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealCreateManyInput = {
    id?: string;
    actionId: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealListRelationFilter = {
    every?: Prisma.ModerationAppealWhereInput;
    some?: Prisma.ModerationAppealWhereInput;
    none?: Prisma.ModerationAppealWhereInput;
};
export type ModerationAppealOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ModerationAppealActionIdUserIdCompoundUniqueInput = {
    actionId: string;
    userId: string;
};
export type ModerationAppealCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationAppealMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationAppealMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationAppealCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput> | Prisma.ModerationAppealCreateWithoutUserInput[] | Prisma.ModerationAppealUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutUserInput | Prisma.ModerationAppealCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ModerationAppealCreateManyUserInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput> | Prisma.ModerationAppealCreateWithoutResolvedByInput[] | Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput | Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.ModerationAppealCreateManyResolvedByInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput> | Prisma.ModerationAppealCreateWithoutUserInput[] | Prisma.ModerationAppealUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutUserInput | Prisma.ModerationAppealCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ModerationAppealCreateManyUserInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealUncheckedCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput> | Prisma.ModerationAppealCreateWithoutResolvedByInput[] | Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput | Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.ModerationAppealCreateManyResolvedByInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput> | Prisma.ModerationAppealCreateWithoutUserInput[] | Prisma.ModerationAppealUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutUserInput | Prisma.ModerationAppealCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutUserInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ModerationAppealCreateManyUserInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutUserInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutUserInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type ModerationAppealUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput> | Prisma.ModerationAppealCreateWithoutResolvedByInput[] | Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput | Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.ModerationAppealCreateManyResolvedByInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutResolvedByInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type ModerationAppealUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput> | Prisma.ModerationAppealCreateWithoutUserInput[] | Prisma.ModerationAppealUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutUserInput | Prisma.ModerationAppealCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutUserInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ModerationAppealCreateManyUserInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutUserInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutUserInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type ModerationAppealUncheckedUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput> | Prisma.ModerationAppealCreateWithoutResolvedByInput[] | Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput | Prisma.ModerationAppealCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.ModerationAppealCreateManyResolvedByInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutResolvedByInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type ModerationAppealCreateNestedManyWithoutActionInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput> | Prisma.ModerationAppealCreateWithoutActionInput[] | Prisma.ModerationAppealUncheckedCreateWithoutActionInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutActionInput | Prisma.ModerationAppealCreateOrConnectWithoutActionInput[];
    createMany?: Prisma.ModerationAppealCreateManyActionInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealUncheckedCreateNestedManyWithoutActionInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput> | Prisma.ModerationAppealCreateWithoutActionInput[] | Prisma.ModerationAppealUncheckedCreateWithoutActionInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutActionInput | Prisma.ModerationAppealCreateOrConnectWithoutActionInput[];
    createMany?: Prisma.ModerationAppealCreateManyActionInputEnvelope;
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
};
export type ModerationAppealUpdateManyWithoutActionNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput> | Prisma.ModerationAppealCreateWithoutActionInput[] | Prisma.ModerationAppealUncheckedCreateWithoutActionInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutActionInput | Prisma.ModerationAppealCreateOrConnectWithoutActionInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutActionInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutActionInput[];
    createMany?: Prisma.ModerationAppealCreateManyActionInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutActionInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutActionInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutActionInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutActionInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type ModerationAppealUncheckedUpdateManyWithoutActionNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput> | Prisma.ModerationAppealCreateWithoutActionInput[] | Prisma.ModerationAppealUncheckedCreateWithoutActionInput[];
    connectOrCreate?: Prisma.ModerationAppealCreateOrConnectWithoutActionInput | Prisma.ModerationAppealCreateOrConnectWithoutActionInput[];
    upsert?: Prisma.ModerationAppealUpsertWithWhereUniqueWithoutActionInput | Prisma.ModerationAppealUpsertWithWhereUniqueWithoutActionInput[];
    createMany?: Prisma.ModerationAppealCreateManyActionInputEnvelope;
    set?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    disconnect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    delete?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    connect?: Prisma.ModerationAppealWhereUniqueInput | Prisma.ModerationAppealWhereUniqueInput[];
    update?: Prisma.ModerationAppealUpdateWithWhereUniqueWithoutActionInput | Prisma.ModerationAppealUpdateWithWhereUniqueWithoutActionInput[];
    updateMany?: Prisma.ModerationAppealUpdateManyWithWhereWithoutActionInput | Prisma.ModerationAppealUpdateManyWithWhereWithoutActionInput[];
    deleteMany?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
};
export type EnumAppealStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppealStatus;
};
export type ModerationAppealCreateWithoutUserInput = {
    id?: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    action: Prisma.ModerationActionCreateNestedOneWithoutAppealsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutModerationAppealsResolvedInput;
};
export type ModerationAppealUncheckedCreateWithoutUserInput = {
    id?: string;
    actionId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealCreateOrConnectWithoutUserInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput>;
};
export type ModerationAppealCreateManyUserInputEnvelope = {
    data: Prisma.ModerationAppealCreateManyUserInput | Prisma.ModerationAppealCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ModerationAppealCreateWithoutResolvedByInput = {
    id?: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    action: Prisma.ModerationActionCreateNestedOneWithoutAppealsInput;
    user: Prisma.UserCreateNestedOneWithoutModerationAppealsInput;
};
export type ModerationAppealUncheckedCreateWithoutResolvedByInput = {
    id?: string;
    actionId: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealCreateOrConnectWithoutResolvedByInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput>;
};
export type ModerationAppealCreateManyResolvedByInputEnvelope = {
    data: Prisma.ModerationAppealCreateManyResolvedByInput | Prisma.ModerationAppealCreateManyResolvedByInput[];
    skipDuplicates?: boolean;
};
export type ModerationAppealUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    update: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutUserInput, Prisma.ModerationAppealUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutUserInput, Prisma.ModerationAppealUncheckedCreateWithoutUserInput>;
};
export type ModerationAppealUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutUserInput, Prisma.ModerationAppealUncheckedUpdateWithoutUserInput>;
};
export type ModerationAppealUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ModerationAppealScalarWhereInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateManyMutationInput, Prisma.ModerationAppealUncheckedUpdateManyWithoutUserInput>;
};
export type ModerationAppealScalarWhereInput = {
    AND?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
    OR?: Prisma.ModerationAppealScalarWhereInput[];
    NOT?: Prisma.ModerationAppealScalarWhereInput | Prisma.ModerationAppealScalarWhereInput[];
    id?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    actionId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    userId?: Prisma.UuidFilter<"ModerationAppeal"> | string;
    body?: Prisma.StringFilter<"ModerationAppeal"> | string;
    status?: Prisma.EnumAppealStatusFilter<"ModerationAppeal"> | $Enums.AppealStatus;
    resolutionNote?: Prisma.StringNullableFilter<"ModerationAppeal"> | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"ModerationAppeal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"ModerationAppeal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAppeal"> | Date | string;
};
export type ModerationAppealUpsertWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    update: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedUpdateWithoutResolvedByInput>;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedCreateWithoutResolvedByInput>;
};
export type ModerationAppealUpdateWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutResolvedByInput, Prisma.ModerationAppealUncheckedUpdateWithoutResolvedByInput>;
};
export type ModerationAppealUpdateManyWithWhereWithoutResolvedByInput = {
    where: Prisma.ModerationAppealScalarWhereInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateManyMutationInput, Prisma.ModerationAppealUncheckedUpdateManyWithoutResolvedByInput>;
};
export type ModerationAppealCreateWithoutActionInput = {
    id?: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutModerationAppealsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutModerationAppealsResolvedInput;
};
export type ModerationAppealUncheckedCreateWithoutActionInput = {
    id?: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealCreateOrConnectWithoutActionInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput>;
};
export type ModerationAppealCreateManyActionInputEnvelope = {
    data: Prisma.ModerationAppealCreateManyActionInput | Prisma.ModerationAppealCreateManyActionInput[];
    skipDuplicates?: boolean;
};
export type ModerationAppealUpsertWithWhereUniqueWithoutActionInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    update: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutActionInput, Prisma.ModerationAppealUncheckedUpdateWithoutActionInput>;
    create: Prisma.XOR<Prisma.ModerationAppealCreateWithoutActionInput, Prisma.ModerationAppealUncheckedCreateWithoutActionInput>;
};
export type ModerationAppealUpdateWithWhereUniqueWithoutActionInput = {
    where: Prisma.ModerationAppealWhereUniqueInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateWithoutActionInput, Prisma.ModerationAppealUncheckedUpdateWithoutActionInput>;
};
export type ModerationAppealUpdateManyWithWhereWithoutActionInput = {
    where: Prisma.ModerationAppealScalarWhereInput;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateManyMutationInput, Prisma.ModerationAppealUncheckedUpdateManyWithoutActionInput>;
};
export type ModerationAppealCreateManyUserInput = {
    id?: string;
    actionId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealCreateManyResolvedByInput = {
    id?: string;
    actionId: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    action?: Prisma.ModerationActionUpdateOneRequiredWithoutAppealsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutModerationAppealsResolvedNestedInput;
};
export type ModerationAppealUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    action?: Prisma.ModerationActionUpdateOneRequiredWithoutAppealsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutModerationAppealsNestedInput;
};
export type ModerationAppealUncheckedUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealUncheckedUpdateManyWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealCreateManyActionInput = {
    id?: string;
    userId: string;
    body: string;
    status?: $Enums.AppealStatus;
    resolutionNote?: string | null;
    resolvedById?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationAppealUpdateWithoutActionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutModerationAppealsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutModerationAppealsResolvedNestedInput;
};
export type ModerationAppealUncheckedUpdateWithoutActionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealUncheckedUpdateManyWithoutActionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationAppealSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actionId?: boolean;
    userId?: boolean;
    body?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedById?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAppeal"]>;
export type ModerationAppealSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actionId?: boolean;
    userId?: boolean;
    body?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedById?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAppeal"]>;
export type ModerationAppealSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actionId?: boolean;
    userId?: boolean;
    body?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedById?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAppeal"]>;
export type ModerationAppealSelectScalar = {
    id?: boolean;
    actionId?: boolean;
    userId?: boolean;
    body?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedById?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
};
export type ModerationAppealOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "actionId" | "userId" | "body" | "status" | "resolutionNote" | "resolvedById" | "resolvedAt" | "createdAt", ExtArgs["result"]["moderationAppeal"]>;
export type ModerationAppealInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
};
export type ModerationAppealIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
};
export type ModerationAppealIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    action?: boolean | Prisma.ModerationActionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>;
};
export type $ModerationAppealPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ModerationAppeal";
    objects: {
        action: Prisma.$ModerationActionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        resolvedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        actionId: string;
        userId: string;
        body: string;
        status: $Enums.AppealStatus;
        resolutionNote: string | null;
        resolvedById: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["moderationAppeal"]>;
    composites: {};
};
export type ModerationAppealGetPayload<S extends boolean | null | undefined | ModerationAppealDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload, S>;
export type ModerationAppealCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ModerationAppealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ModerationAppealCountAggregateInputType | true;
};
export interface ModerationAppealDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ModerationAppeal'];
        meta: {
            name: 'ModerationAppeal';
        };
    };
    findUnique<T extends ModerationAppealFindUniqueArgs>(args: Prisma.SelectSubset<T, ModerationAppealFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ModerationAppealFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ModerationAppealFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ModerationAppealFindFirstArgs>(args?: Prisma.SelectSubset<T, ModerationAppealFindFirstArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ModerationAppealFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ModerationAppealFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ModerationAppealFindManyArgs>(args?: Prisma.SelectSubset<T, ModerationAppealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ModerationAppealCreateArgs>(args: Prisma.SelectSubset<T, ModerationAppealCreateArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ModerationAppealCreateManyArgs>(args?: Prisma.SelectSubset<T, ModerationAppealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ModerationAppealCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ModerationAppealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ModerationAppealDeleteArgs>(args: Prisma.SelectSubset<T, ModerationAppealDeleteArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ModerationAppealUpdateArgs>(args: Prisma.SelectSubset<T, ModerationAppealUpdateArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ModerationAppealDeleteManyArgs>(args?: Prisma.SelectSubset<T, ModerationAppealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ModerationAppealUpdateManyArgs>(args: Prisma.SelectSubset<T, ModerationAppealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ModerationAppealUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ModerationAppealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ModerationAppealUpsertArgs>(args: Prisma.SelectSubset<T, ModerationAppealUpsertArgs<ExtArgs>>): Prisma.Prisma__ModerationAppealClient<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ModerationAppealCountArgs>(args?: Prisma.Subset<T, ModerationAppealCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ModerationAppealCountAggregateOutputType> : number>;
    aggregate<T extends ModerationAppealAggregateArgs>(args: Prisma.Subset<T, ModerationAppealAggregateArgs>): Prisma.PrismaPromise<GetModerationAppealAggregateType<T>>;
    groupBy<T extends ModerationAppealGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ModerationAppealGroupByArgs['orderBy'];
    } : {
        orderBy?: ModerationAppealGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ModerationAppealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModerationAppealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ModerationAppealFieldRefs;
}
export interface Prisma__ModerationAppealClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    action<T extends Prisma.ModerationActionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModerationActionDefaultArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    resolvedBy<T extends Prisma.ModerationAppeal$resolvedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModerationAppeal$resolvedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ModerationAppealFieldRefs {
    readonly id: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly actionId: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly userId: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly body: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly status: Prisma.FieldRef<"ModerationAppeal", 'AppealStatus'>;
    readonly resolutionNote: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly resolvedById: Prisma.FieldRef<"ModerationAppeal", 'String'>;
    readonly resolvedAt: Prisma.FieldRef<"ModerationAppeal", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ModerationAppeal", 'DateTime'>;
}
export type ModerationAppealFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where: Prisma.ModerationAppealWhereUniqueInput;
};
export type ModerationAppealFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where: Prisma.ModerationAppealWhereUniqueInput;
};
export type ModerationAppealFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithRelationInput | Prisma.ModerationAppealOrderByWithRelationInput[];
    cursor?: Prisma.ModerationAppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationAppealScalarFieldEnum | Prisma.ModerationAppealScalarFieldEnum[];
};
export type ModerationAppealFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithRelationInput | Prisma.ModerationAppealOrderByWithRelationInput[];
    cursor?: Prisma.ModerationAppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationAppealScalarFieldEnum | Prisma.ModerationAppealScalarFieldEnum[];
};
export type ModerationAppealFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithRelationInput | Prisma.ModerationAppealOrderByWithRelationInput[];
    cursor?: Prisma.ModerationAppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationAppealScalarFieldEnum | Prisma.ModerationAppealScalarFieldEnum[];
};
export type ModerationAppealCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationAppealCreateInput, Prisma.ModerationAppealUncheckedCreateInput>;
};
export type ModerationAppealCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ModerationAppealCreateManyInput | Prisma.ModerationAppealCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ModerationAppealCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    data: Prisma.ModerationAppealCreateManyInput | Prisma.ModerationAppealCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ModerationAppealIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ModerationAppealUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateInput, Prisma.ModerationAppealUncheckedUpdateInput>;
    where: Prisma.ModerationAppealWhereUniqueInput;
};
export type ModerationAppealUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ModerationAppealUpdateManyMutationInput, Prisma.ModerationAppealUncheckedUpdateManyInput>;
    where?: Prisma.ModerationAppealWhereInput;
    limit?: number;
};
export type ModerationAppealUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationAppealUpdateManyMutationInput, Prisma.ModerationAppealUncheckedUpdateManyInput>;
    where?: Prisma.ModerationAppealWhereInput;
    limit?: number;
    include?: Prisma.ModerationAppealIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ModerationAppealUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where: Prisma.ModerationAppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationAppealCreateInput, Prisma.ModerationAppealUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ModerationAppealUpdateInput, Prisma.ModerationAppealUncheckedUpdateInput>;
};
export type ModerationAppealDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where: Prisma.ModerationAppealWhereUniqueInput;
};
export type ModerationAppealDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationAppealWhereInput;
    limit?: number;
};
export type ModerationAppeal$resolvedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type ModerationAppealDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
};
export {};
