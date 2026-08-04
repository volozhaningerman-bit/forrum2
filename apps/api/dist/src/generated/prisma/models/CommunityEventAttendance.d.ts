import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityEventAttendanceModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityEventAttendancePayload>;
export type AggregateCommunityEventAttendance = {
    _count: CommunityEventAttendanceCountAggregateOutputType | null;
    _min: CommunityEventAttendanceMinAggregateOutputType | null;
    _max: CommunityEventAttendanceMaxAggregateOutputType | null;
};
export type CommunityEventAttendanceMinAggregateOutputType = {
    eventId: string | null;
    userId: string | null;
    status: $Enums.EventAttendanceStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityEventAttendanceMaxAggregateOutputType = {
    eventId: string | null;
    userId: string | null;
    status: $Enums.EventAttendanceStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityEventAttendanceCountAggregateOutputType = {
    eventId: number;
    userId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommunityEventAttendanceMinAggregateInputType = {
    eventId?: true;
    userId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityEventAttendanceMaxAggregateInputType = {
    eventId?: true;
    userId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityEventAttendanceCountAggregateInputType = {
    eventId?: true;
    userId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommunityEventAttendanceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventAttendanceWhereInput;
    orderBy?: Prisma.CommunityEventAttendanceOrderByWithRelationInput | Prisma.CommunityEventAttendanceOrderByWithRelationInput[];
    cursor?: Prisma.CommunityEventAttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityEventAttendanceCountAggregateInputType;
    _min?: CommunityEventAttendanceMinAggregateInputType;
    _max?: CommunityEventAttendanceMaxAggregateInputType;
};
export type GetCommunityEventAttendanceAggregateType<T extends CommunityEventAttendanceAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityEventAttendance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityEventAttendance[P]> : Prisma.GetScalarType<T[P], AggregateCommunityEventAttendance[P]>;
};
export type CommunityEventAttendanceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventAttendanceWhereInput;
    orderBy?: Prisma.CommunityEventAttendanceOrderByWithAggregationInput | Prisma.CommunityEventAttendanceOrderByWithAggregationInput[];
    by: Prisma.CommunityEventAttendanceScalarFieldEnum[] | Prisma.CommunityEventAttendanceScalarFieldEnum;
    having?: Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityEventAttendanceCountAggregateInputType | true;
    _min?: CommunityEventAttendanceMinAggregateInputType;
    _max?: CommunityEventAttendanceMaxAggregateInputType;
};
export type CommunityEventAttendanceGroupByOutputType = {
    eventId: string;
    userId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: CommunityEventAttendanceCountAggregateOutputType | null;
    _min: CommunityEventAttendanceMinAggregateOutputType | null;
    _max: CommunityEventAttendanceMaxAggregateOutputType | null;
};
type GetCommunityEventAttendanceGroupByPayload<T extends CommunityEventAttendanceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityEventAttendanceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityEventAttendanceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityEventAttendanceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityEventAttendanceGroupByOutputType[P]>;
}>>;
export type CommunityEventAttendanceWhereInput = {
    AND?: Prisma.CommunityEventAttendanceWhereInput | Prisma.CommunityEventAttendanceWhereInput[];
    OR?: Prisma.CommunityEventAttendanceWhereInput[];
    NOT?: Prisma.CommunityEventAttendanceWhereInput | Prisma.CommunityEventAttendanceWhereInput[];
    eventId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    userId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    status?: Prisma.EnumEventAttendanceStatusFilter<"CommunityEventAttendance"> | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
    event?: Prisma.XOR<Prisma.CommunityEventScalarRelationFilter, Prisma.CommunityEventWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CommunityEventAttendanceOrderByWithRelationInput = {
    eventId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    event?: Prisma.CommunityEventOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CommunityEventAttendanceWhereUniqueInput = Prisma.AtLeast<{
    eventId_userId?: Prisma.CommunityEventAttendanceEventIdUserIdCompoundUniqueInput;
    AND?: Prisma.CommunityEventAttendanceWhereInput | Prisma.CommunityEventAttendanceWhereInput[];
    OR?: Prisma.CommunityEventAttendanceWhereInput[];
    NOT?: Prisma.CommunityEventAttendanceWhereInput | Prisma.CommunityEventAttendanceWhereInput[];
    eventId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    userId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    status?: Prisma.EnumEventAttendanceStatusFilter<"CommunityEventAttendance"> | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
    event?: Prisma.XOR<Prisma.CommunityEventScalarRelationFilter, Prisma.CommunityEventWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "eventId_userId">;
export type CommunityEventAttendanceOrderByWithAggregationInput = {
    eventId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityEventAttendanceCountOrderByAggregateInput;
    _max?: Prisma.CommunityEventAttendanceMaxOrderByAggregateInput;
    _min?: Prisma.CommunityEventAttendanceMinOrderByAggregateInput;
};
export type CommunityEventAttendanceScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput | Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput | Prisma.CommunityEventAttendanceScalarWhereWithAggregatesInput[];
    eventId?: Prisma.UuidWithAggregatesFilter<"CommunityEventAttendance"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CommunityEventAttendance"> | string;
    status?: Prisma.EnumEventAttendanceStatusWithAggregatesFilter<"CommunityEventAttendance"> | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityEventAttendance"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityEventAttendance"> | Date | string;
};
export type CommunityEventAttendanceCreateInput = {
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    event: Prisma.CommunityEventCreateNestedOneWithoutAttendeesInput;
    user: Prisma.UserCreateNestedOneWithoutEventAttendancesInput;
};
export type CommunityEventAttendanceUncheckedCreateInput = {
    eventId: string;
    userId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceUpdateInput = {
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    event?: Prisma.CommunityEventUpdateOneRequiredWithoutAttendeesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventAttendancesNestedInput;
};
export type CommunityEventAttendanceUncheckedUpdateInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceCreateManyInput = {
    eventId: string;
    userId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceUpdateManyMutationInput = {
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceUncheckedUpdateManyInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceListRelationFilter = {
    every?: Prisma.CommunityEventAttendanceWhereInput;
    some?: Prisma.CommunityEventAttendanceWhereInput;
    none?: Prisma.CommunityEventAttendanceWhereInput;
};
export type CommunityEventAttendanceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityEventAttendanceEventIdUserIdCompoundUniqueInput = {
    eventId: string;
    userId: string;
};
export type CommunityEventAttendanceCountOrderByAggregateInput = {
    eventId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventAttendanceMaxOrderByAggregateInput = {
    eventId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventAttendanceMinOrderByAggregateInput = {
    eventId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityEventAttendanceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput> | Prisma.CommunityEventAttendanceCreateWithoutUserInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
};
export type CommunityEventAttendanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput> | Prisma.CommunityEventAttendanceCreateWithoutUserInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
};
export type CommunityEventAttendanceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput> | Prisma.CommunityEventAttendanceCreateWithoutUserInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyUserInputEnvelope;
    set?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    delete?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    update?: Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutUserInput | Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
};
export type CommunityEventAttendanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput> | Prisma.CommunityEventAttendanceCreateWithoutUserInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyUserInputEnvelope;
    set?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    delete?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    update?: Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutUserInput | Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
};
export type CommunityEventAttendanceCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput> | Prisma.CommunityEventAttendanceCreateWithoutEventInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyEventInputEnvelope;
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
};
export type CommunityEventAttendanceUncheckedCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput> | Prisma.CommunityEventAttendanceCreateWithoutEventInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyEventInputEnvelope;
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
};
export type CommunityEventAttendanceUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput> | Prisma.CommunityEventAttendanceCreateWithoutEventInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutEventInput | Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyEventInputEnvelope;
    set?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    delete?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    update?: Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutEventInput | Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutEventInput | Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
};
export type CommunityEventAttendanceUncheckedUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput> | Prisma.CommunityEventAttendanceCreateWithoutEventInput[] | Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput | Prisma.CommunityEventAttendanceCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutEventInput | Prisma.CommunityEventAttendanceUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.CommunityEventAttendanceCreateManyEventInputEnvelope;
    set?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    disconnect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    delete?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    connect?: Prisma.CommunityEventAttendanceWhereUniqueInput | Prisma.CommunityEventAttendanceWhereUniqueInput[];
    update?: Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutEventInput | Prisma.CommunityEventAttendanceUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutEventInput | Prisma.CommunityEventAttendanceUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
};
export type EnumEventAttendanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventAttendanceStatus;
};
export type CommunityEventAttendanceCreateWithoutUserInput = {
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    event: Prisma.CommunityEventCreateNestedOneWithoutAttendeesInput;
};
export type CommunityEventAttendanceUncheckedCreateWithoutUserInput = {
    eventId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceCreateOrConnectWithoutUserInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput>;
};
export type CommunityEventAttendanceCreateManyUserInputEnvelope = {
    data: Prisma.CommunityEventAttendanceCreateManyUserInput | Prisma.CommunityEventAttendanceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventAttendanceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutUserInput>;
};
export type CommunityEventAttendanceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateWithoutUserInput, Prisma.CommunityEventAttendanceUncheckedUpdateWithoutUserInput>;
};
export type CommunityEventAttendanceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommunityEventAttendanceScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateManyMutationInput, Prisma.CommunityEventAttendanceUncheckedUpdateManyWithoutUserInput>;
};
export type CommunityEventAttendanceScalarWhereInput = {
    AND?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
    OR?: Prisma.CommunityEventAttendanceScalarWhereInput[];
    NOT?: Prisma.CommunityEventAttendanceScalarWhereInput | Prisma.CommunityEventAttendanceScalarWhereInput[];
    eventId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    userId?: Prisma.UuidFilter<"CommunityEventAttendance"> | string;
    status?: Prisma.EnumEventAttendanceStatusFilter<"CommunityEventAttendance"> | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityEventAttendance"> | Date | string;
};
export type CommunityEventAttendanceCreateWithoutEventInput = {
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutEventAttendancesInput;
};
export type CommunityEventAttendanceUncheckedCreateWithoutEventInput = {
    userId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceCreateOrConnectWithoutEventInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput>;
};
export type CommunityEventAttendanceCreateManyEventInputEnvelope = {
    data: Prisma.CommunityEventAttendanceCreateManyEventInput | Prisma.CommunityEventAttendanceCreateManyEventInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventAttendanceUpsertWithWhereUniqueWithoutEventInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedUpdateWithoutEventInput>;
    create: Prisma.XOR<Prisma.CommunityEventAttendanceCreateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedCreateWithoutEventInput>;
};
export type CommunityEventAttendanceUpdateWithWhereUniqueWithoutEventInput = {
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateWithoutEventInput, Prisma.CommunityEventAttendanceUncheckedUpdateWithoutEventInput>;
};
export type CommunityEventAttendanceUpdateManyWithWhereWithoutEventInput = {
    where: Prisma.CommunityEventAttendanceScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateManyMutationInput, Prisma.CommunityEventAttendanceUncheckedUpdateManyWithoutEventInput>;
};
export type CommunityEventAttendanceCreateManyUserInput = {
    eventId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceUpdateWithoutUserInput = {
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    event?: Prisma.CommunityEventUpdateOneRequiredWithoutAttendeesNestedInput;
};
export type CommunityEventAttendanceUncheckedUpdateWithoutUserInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceUncheckedUpdateManyWithoutUserInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceCreateManyEventInput = {
    userId: string;
    status: $Enums.EventAttendanceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityEventAttendanceUpdateWithoutEventInput = {
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutEventAttendancesNestedInput;
};
export type CommunityEventAttendanceUncheckedUpdateWithoutEventInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceUncheckedUpdateManyWithoutEventInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumEventAttendanceStatusFieldUpdateOperationsInput | $Enums.EventAttendanceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityEventAttendanceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    eventId?: boolean;
    userId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEventAttendance"]>;
export type CommunityEventAttendanceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    eventId?: boolean;
    userId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEventAttendance"]>;
export type CommunityEventAttendanceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    eventId?: boolean;
    userId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityEventAttendance"]>;
export type CommunityEventAttendanceSelectScalar = {
    eventId?: boolean;
    userId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommunityEventAttendanceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"eventId" | "userId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["communityEventAttendance"]>;
export type CommunityEventAttendanceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityEventAttendanceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityEventAttendanceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.CommunityEventDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommunityEventAttendancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityEventAttendance";
    objects: {
        event: Prisma.$CommunityEventPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        eventId: string;
        userId: string;
        status: $Enums.EventAttendanceStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["communityEventAttendance"]>;
    composites: {};
};
export type CommunityEventAttendanceGetPayload<S extends boolean | null | undefined | CommunityEventAttendanceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload, S>;
export type CommunityEventAttendanceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityEventAttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityEventAttendanceCountAggregateInputType | true;
};
export interface CommunityEventAttendanceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityEventAttendance'];
        meta: {
            name: 'CommunityEventAttendance';
        };
    };
    findUnique<T extends CommunityEventAttendanceFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityEventAttendanceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityEventAttendanceFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityEventAttendanceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityEventAttendanceFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityEventAttendanceCreateArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityEventAttendanceCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityEventAttendanceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityEventAttendanceDeleteArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityEventAttendanceUpdateArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityEventAttendanceDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityEventAttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityEventAttendanceUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityEventAttendanceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityEventAttendanceUpsertArgs>(args: Prisma.SelectSubset<T, CommunityEventAttendanceUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityEventAttendanceClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventAttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityEventAttendanceCountArgs>(args?: Prisma.Subset<T, CommunityEventAttendanceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityEventAttendanceCountAggregateOutputType> : number>;
    aggregate<T extends CommunityEventAttendanceAggregateArgs>(args: Prisma.Subset<T, CommunityEventAttendanceAggregateArgs>): Prisma.PrismaPromise<GetCommunityEventAttendanceAggregateType<T>>;
    groupBy<T extends CommunityEventAttendanceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityEventAttendanceGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityEventAttendanceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityEventAttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityEventAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityEventAttendanceFieldRefs;
}
export interface Prisma__CommunityEventAttendanceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    event<T extends Prisma.CommunityEventDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityEventDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityEventClient<runtime.Types.Result.GetResult<Prisma.$CommunityEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityEventAttendanceFieldRefs {
    readonly eventId: Prisma.FieldRef<"CommunityEventAttendance", 'String'>;
    readonly userId: Prisma.FieldRef<"CommunityEventAttendance", 'String'>;
    readonly status: Prisma.FieldRef<"CommunityEventAttendance", 'EventAttendanceStatus'>;
    readonly createdAt: Prisma.FieldRef<"CommunityEventAttendance", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommunityEventAttendance", 'DateTime'>;
}
export type CommunityEventAttendanceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
};
export type CommunityEventAttendanceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
};
export type CommunityEventAttendanceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommunityEventAttendanceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommunityEventAttendanceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommunityEventAttendanceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceCreateInput, Prisma.CommunityEventAttendanceUncheckedCreateInput>;
};
export type CommunityEventAttendanceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityEventAttendanceCreateManyInput | Prisma.CommunityEventAttendanceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityEventAttendanceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    data: Prisma.CommunityEventAttendanceCreateManyInput | Prisma.CommunityEventAttendanceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityEventAttendanceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityEventAttendanceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateInput, Prisma.CommunityEventAttendanceUncheckedUpdateInput>;
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
};
export type CommunityEventAttendanceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateManyMutationInput, Prisma.CommunityEventAttendanceUncheckedUpdateManyInput>;
    where?: Prisma.CommunityEventAttendanceWhereInput;
    limit?: number;
};
export type CommunityEventAttendanceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateManyMutationInput, Prisma.CommunityEventAttendanceUncheckedUpdateManyInput>;
    where?: Prisma.CommunityEventAttendanceWhereInput;
    limit?: number;
    include?: Prisma.CommunityEventAttendanceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityEventAttendanceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityEventAttendanceCreateInput, Prisma.CommunityEventAttendanceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityEventAttendanceUpdateInput, Prisma.CommunityEventAttendanceUncheckedUpdateInput>;
};
export type CommunityEventAttendanceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
    where: Prisma.CommunityEventAttendanceWhereUniqueInput;
};
export type CommunityEventAttendanceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityEventAttendanceWhereInput;
    limit?: number;
};
export type CommunityEventAttendanceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityEventAttendanceSelect<ExtArgs> | null;
    omit?: Prisma.CommunityEventAttendanceOmit<ExtArgs> | null;
    include?: Prisma.CommunityEventAttendanceInclude<ExtArgs> | null;
};
export {};
