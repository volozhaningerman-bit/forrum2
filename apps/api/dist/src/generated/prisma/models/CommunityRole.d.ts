import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityRoleModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityRolePayload>;
export type AggregateCommunityRole = {
    _count: CommunityRoleCountAggregateOutputType | null;
    _min: CommunityRoleMinAggregateOutputType | null;
    _max: CommunityRoleMaxAggregateOutputType | null;
};
export type CommunityRoleMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    communityId: string | null;
    role: $Enums.CommunityRoleType | null;
    grantedById: string | null;
    note: string | null;
    endedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityRoleMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    communityId: string | null;
    role: $Enums.CommunityRoleType | null;
    grantedById: string | null;
    note: string | null;
    endedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityRoleCountAggregateOutputType = {
    id: number;
    userId: number;
    communityId: number;
    role: number;
    grantedById: number;
    note: number;
    endedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommunityRoleMinAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    role?: true;
    grantedById?: true;
    note?: true;
    endedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityRoleMaxAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    role?: true;
    grantedById?: true;
    note?: true;
    endedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityRoleCountAggregateInputType = {
    id?: true;
    userId?: true;
    communityId?: true;
    role?: true;
    grantedById?: true;
    note?: true;
    endedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommunityRoleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleWhereInput;
    orderBy?: Prisma.CommunityRoleOrderByWithRelationInput | Prisma.CommunityRoleOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityRoleCountAggregateInputType;
    _min?: CommunityRoleMinAggregateInputType;
    _max?: CommunityRoleMaxAggregateInputType;
};
export type GetCommunityRoleAggregateType<T extends CommunityRoleAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityRole]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityRole[P]> : Prisma.GetScalarType<T[P], AggregateCommunityRole[P]>;
};
export type CommunityRoleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleWhereInput;
    orderBy?: Prisma.CommunityRoleOrderByWithAggregationInput | Prisma.CommunityRoleOrderByWithAggregationInput[];
    by: Prisma.CommunityRoleScalarFieldEnum[] | Prisma.CommunityRoleScalarFieldEnum;
    having?: Prisma.CommunityRoleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityRoleCountAggregateInputType | true;
    _min?: CommunityRoleMinAggregateInputType;
    _max?: CommunityRoleMaxAggregateInputType;
};
export type CommunityRoleGroupByOutputType = {
    id: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById: string | null;
    note: string | null;
    endedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CommunityRoleCountAggregateOutputType | null;
    _min: CommunityRoleMinAggregateOutputType | null;
    _max: CommunityRoleMaxAggregateOutputType | null;
};
type GetCommunityRoleGroupByPayload<T extends CommunityRoleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityRoleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityRoleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityRoleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityRoleGroupByOutputType[P]>;
}>>;
export type CommunityRoleWhereInput = {
    AND?: Prisma.CommunityRoleWhereInput | Prisma.CommunityRoleWhereInput[];
    OR?: Prisma.CommunityRoleWhereInput[];
    NOT?: Prisma.CommunityRoleWhereInput | Prisma.CommunityRoleWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRole"> | string;
    userId?: Prisma.UuidFilter<"CommunityRole"> | string;
    communityId?: Prisma.UuidFilter<"CommunityRole"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRole"> | $Enums.CommunityRoleType;
    grantedById?: Prisma.UuidNullableFilter<"CommunityRole"> | string | null;
    note?: Prisma.StringNullableFilter<"CommunityRole"> | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"CommunityRole"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    grantedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    events?: Prisma.CommunityRoleEventListRelationFilter;
};
export type CommunityRoleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    grantedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    community?: Prisma.CommunityOrderByWithRelationInput;
    grantedBy?: Prisma.UserOrderByWithRelationInput;
    events?: Prisma.CommunityRoleEventOrderByRelationAggregateInput;
};
export type CommunityRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_communityId_role?: Prisma.CommunityRoleUserIdCommunityIdRoleCompoundUniqueInput;
    AND?: Prisma.CommunityRoleWhereInput | Prisma.CommunityRoleWhereInput[];
    OR?: Prisma.CommunityRoleWhereInput[];
    NOT?: Prisma.CommunityRoleWhereInput | Prisma.CommunityRoleWhereInput[];
    userId?: Prisma.UuidFilter<"CommunityRole"> | string;
    communityId?: Prisma.UuidFilter<"CommunityRole"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRole"> | $Enums.CommunityRoleType;
    grantedById?: Prisma.UuidNullableFilter<"CommunityRole"> | string | null;
    note?: Prisma.StringNullableFilter<"CommunityRole"> | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"CommunityRole"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    grantedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    events?: Prisma.CommunityRoleEventListRelationFilter;
}, "id" | "userId_communityId_role">;
export type CommunityRoleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    grantedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityRoleCountOrderByAggregateInput;
    _max?: Prisma.CommunityRoleMaxOrderByAggregateInput;
    _min?: Prisma.CommunityRoleMinOrderByAggregateInput;
};
export type CommunityRoleScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityRoleScalarWhereWithAggregatesInput | Prisma.CommunityRoleScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityRoleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityRoleScalarWhereWithAggregatesInput | Prisma.CommunityRoleScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityRole"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CommunityRole"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityRole"> | string;
    role?: Prisma.EnumCommunityRoleTypeWithAggregatesFilter<"CommunityRole"> | $Enums.CommunityRoleType;
    grantedById?: Prisma.UuidNullableWithAggregatesFilter<"CommunityRole"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"CommunityRole"> | string | null;
    endedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommunityRole"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityRole"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityRole"> | Date | string;
};
export type CommunityRoleCreateInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommunityRolesInput;
    community: Prisma.CommunityCreateNestedOneWithoutRolesInput;
    grantedBy?: Prisma.UserCreateNestedOneWithoutCommunityRolesGrantedInput;
    events?: Prisma.CommunityRoleEventCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleUncheckedCreateInput = {
    id?: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    events?: Prisma.CommunityRoleEventUncheckedCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommunityRolesNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRolesNestedInput;
    grantedBy?: Prisma.UserUpdateOneWithoutCommunityRolesGrantedNestedInput;
    events?: Prisma.CommunityRoleEventUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.CommunityRoleEventUncheckedUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleCreateManyInput = {
    id?: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityRoleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleListRelationFilter = {
    every?: Prisma.CommunityRoleWhereInput;
    some?: Prisma.CommunityRoleWhereInput;
    none?: Prisma.CommunityRoleWhereInput;
};
export type CommunityRoleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityRoleUserIdCommunityIdRoleCompoundUniqueInput = {
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
};
export type CommunityRoleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    grantedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityRoleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    grantedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityRoleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    grantedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityRoleScalarRelationFilter = {
    is?: Prisma.CommunityRoleWhereInput;
    isNot?: Prisma.CommunityRoleWhereInput;
};
export type CommunityRoleCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleCreateWithoutUserInput[] | Prisma.CommunityRoleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutUserInput | Prisma.CommunityRoleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityRoleCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleCreateNestedManyWithoutGrantedByInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput> | Prisma.CommunityRoleCreateWithoutGrantedByInput[] | Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput | Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput[];
    createMany?: Prisma.CommunityRoleCreateManyGrantedByInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleCreateWithoutUserInput[] | Prisma.CommunityRoleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutUserInput | Prisma.CommunityRoleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommunityRoleCreateManyUserInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleUncheckedCreateNestedManyWithoutGrantedByInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput> | Prisma.CommunityRoleCreateWithoutGrantedByInput[] | Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput | Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput[];
    createMany?: Prisma.CommunityRoleCreateManyGrantedByInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleCreateWithoutUserInput[] | Prisma.CommunityRoleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutUserInput | Prisma.CommunityRoleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityRoleCreateManyUserInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutUserInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type CommunityRoleUpdateManyWithoutGrantedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput> | Prisma.CommunityRoleCreateWithoutGrantedByInput[] | Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput | Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutGrantedByInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutGrantedByInput[];
    createMany?: Prisma.CommunityRoleCreateManyGrantedByInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutGrantedByInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutGrantedByInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutGrantedByInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutGrantedByInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type CommunityRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput> | Prisma.CommunityRoleCreateWithoutUserInput[] | Prisma.CommunityRoleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutUserInput | Prisma.CommunityRoleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommunityRoleCreateManyUserInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutUserInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutUserInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type CommunityRoleUncheckedUpdateManyWithoutGrantedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput> | Prisma.CommunityRoleCreateWithoutGrantedByInput[] | Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput | Prisma.CommunityRoleCreateOrConnectWithoutGrantedByInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutGrantedByInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutGrantedByInput[];
    createMany?: Prisma.CommunityRoleCreateManyGrantedByInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutGrantedByInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutGrantedByInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutGrantedByInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutGrantedByInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type CommunityRoleCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleCreateWithoutCommunityInput[] | Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleCreateWithoutCommunityInput[] | Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
};
export type CommunityRoleUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleCreateWithoutCommunityInput[] | Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type CommunityRoleUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleCreateWithoutCommunityInput[] | Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityRoleUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    delete?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    connect?: Prisma.CommunityRoleWhereUniqueInput | Prisma.CommunityRoleWhereUniqueInput[];
    update?: Prisma.CommunityRoleUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityRoleUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityRoleUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
};
export type EnumCommunityRoleTypeFieldUpdateOperationsInput = {
    set?: $Enums.CommunityRoleType;
};
export type CommunityRoleCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutEventsInput, Prisma.CommunityRoleUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutEventsInput;
    connect?: Prisma.CommunityRoleWhereUniqueInput;
};
export type CommunityRoleUpdateOneRequiredWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleCreateWithoutEventsInput, Prisma.CommunityRoleUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.CommunityRoleCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.CommunityRoleUpsertWithoutEventsInput;
    connect?: Prisma.CommunityRoleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityRoleUpdateToOneWithWhereWithoutEventsInput, Prisma.CommunityRoleUpdateWithoutEventsInput>, Prisma.CommunityRoleUncheckedUpdateWithoutEventsInput>;
};
export type CommunityRoleCreateWithoutUserInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutRolesInput;
    grantedBy?: Prisma.UserCreateNestedOneWithoutCommunityRolesGrantedInput;
    events?: Prisma.CommunityRoleEventCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleUncheckedCreateWithoutUserInput = {
    id?: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    events?: Prisma.CommunityRoleEventUncheckedCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleCreateOrConnectWithoutUserInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput>;
};
export type CommunityRoleCreateManyUserInputEnvelope = {
    data: Prisma.CommunityRoleCreateManyUserInput | Prisma.CommunityRoleCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleCreateWithoutGrantedByInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommunityRolesInput;
    community: Prisma.CommunityCreateNestedOneWithoutRolesInput;
    events?: Prisma.CommunityRoleEventCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleUncheckedCreateWithoutGrantedByInput = {
    id?: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    events?: Prisma.CommunityRoleEventUncheckedCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleCreateOrConnectWithoutGrantedByInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput>;
};
export type CommunityRoleCreateManyGrantedByInputEnvelope = {
    data: Prisma.CommunityRoleCreateManyGrantedByInput | Prisma.CommunityRoleCreateManyGrantedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutUserInput, Prisma.CommunityRoleUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutUserInput, Prisma.CommunityRoleUncheckedCreateWithoutUserInput>;
};
export type CommunityRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutUserInput, Prisma.CommunityRoleUncheckedUpdateWithoutUserInput>;
};
export type CommunityRoleUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommunityRoleScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateManyMutationInput, Prisma.CommunityRoleUncheckedUpdateManyWithoutUserInput>;
};
export type CommunityRoleScalarWhereInput = {
    AND?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
    OR?: Prisma.CommunityRoleScalarWhereInput[];
    NOT?: Prisma.CommunityRoleScalarWhereInput | Prisma.CommunityRoleScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRole"> | string;
    userId?: Prisma.UuidFilter<"CommunityRole"> | string;
    communityId?: Prisma.UuidFilter<"CommunityRole"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRole"> | $Enums.CommunityRoleType;
    grantedById?: Prisma.UuidNullableFilter<"CommunityRole"> | string | null;
    note?: Prisma.StringNullableFilter<"CommunityRole"> | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"CommunityRole"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityRole"> | Date | string;
};
export type CommunityRoleUpsertWithWhereUniqueWithoutGrantedByInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedUpdateWithoutGrantedByInput>;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedCreateWithoutGrantedByInput>;
};
export type CommunityRoleUpdateWithWhereUniqueWithoutGrantedByInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutGrantedByInput, Prisma.CommunityRoleUncheckedUpdateWithoutGrantedByInput>;
};
export type CommunityRoleUpdateManyWithWhereWithoutGrantedByInput = {
    where: Prisma.CommunityRoleScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateManyMutationInput, Prisma.CommunityRoleUncheckedUpdateManyWithoutGrantedByInput>;
};
export type CommunityRoleCreateWithoutCommunityInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommunityRolesInput;
    grantedBy?: Prisma.UserCreateNestedOneWithoutCommunityRolesGrantedInput;
    events?: Prisma.CommunityRoleEventCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleUncheckedCreateWithoutCommunityInput = {
    id?: string;
    userId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    events?: Prisma.CommunityRoleEventUncheckedCreateNestedManyWithoutRoleInput;
};
export type CommunityRoleCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput>;
};
export type CommunityRoleCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityRoleCreateManyCommunityInput | Prisma.CommunityRoleCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutCommunityInput, Prisma.CommunityRoleUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutCommunityInput, Prisma.CommunityRoleUncheckedCreateWithoutCommunityInput>;
};
export type CommunityRoleUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutCommunityInput, Prisma.CommunityRoleUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityRoleUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityRoleScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateManyMutationInput, Prisma.CommunityRoleUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityRoleCreateWithoutEventsInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommunityRolesInput;
    community: Prisma.CommunityCreateNestedOneWithoutRolesInput;
    grantedBy?: Prisma.UserCreateNestedOneWithoutCommunityRolesGrantedInput;
};
export type CommunityRoleUncheckedCreateWithoutEventsInput = {
    id?: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityRoleCreateOrConnectWithoutEventsInput = {
    where: Prisma.CommunityRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutEventsInput, Prisma.CommunityRoleUncheckedCreateWithoutEventsInput>;
};
export type CommunityRoleUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutEventsInput, Prisma.CommunityRoleUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.CommunityRoleCreateWithoutEventsInput, Prisma.CommunityRoleUncheckedCreateWithoutEventsInput>;
    where?: Prisma.CommunityRoleWhereInput;
};
export type CommunityRoleUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.CommunityRoleWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateWithoutEventsInput, Prisma.CommunityRoleUncheckedUpdateWithoutEventsInput>;
};
export type CommunityRoleUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommunityRolesNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRolesNestedInput;
    grantedBy?: Prisma.UserUpdateOneWithoutCommunityRolesGrantedNestedInput;
};
export type CommunityRoleUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleCreateManyUserInput = {
    id?: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityRoleCreateManyGrantedByInput = {
    id?: string;
    userId: string;
    communityId: string;
    role: $Enums.CommunityRoleType;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityRoleUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRolesNestedInput;
    grantedBy?: Prisma.UserUpdateOneWithoutCommunityRolesGrantedNestedInput;
    events?: Prisma.CommunityRoleEventUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.CommunityRoleEventUncheckedUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleUpdateWithoutGrantedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommunityRolesNestedInput;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRolesNestedInput;
    events?: Prisma.CommunityRoleEventUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateWithoutGrantedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.CommunityRoleEventUncheckedUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateManyWithoutGrantedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleCreateManyCommunityInput = {
    id?: string;
    userId: string;
    role: $Enums.CommunityRoleType;
    grantedById?: string | null;
    note?: string | null;
    endedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityRoleUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommunityRolesNestedInput;
    grantedBy?: Prisma.UserUpdateOneWithoutCommunityRolesGrantedNestedInput;
    events?: Prisma.CommunityRoleEventUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.CommunityRoleEventUncheckedUpdateManyWithoutRoleNestedInput;
};
export type CommunityRoleUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    grantedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleCountOutputType = {
    events: number;
};
export type CommunityRoleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    events?: boolean | CommunityRoleCountOutputTypeCountEventsArgs;
};
export type CommunityRoleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleCountOutputTypeSelect<ExtArgs> | null;
};
export type CommunityRoleCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleEventWhereInput;
};
export type CommunityRoleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    role?: boolean;
    grantedById?: boolean;
    note?: boolean;
    endedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
    events?: boolean | Prisma.CommunityRole$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityRoleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityRole"]>;
export type CommunityRoleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    role?: boolean;
    grantedById?: boolean;
    note?: boolean;
    endedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
}, ExtArgs["result"]["communityRole"]>;
export type CommunityRoleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    role?: boolean;
    grantedById?: boolean;
    note?: boolean;
    endedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
}, ExtArgs["result"]["communityRole"]>;
export type CommunityRoleSelectScalar = {
    id?: boolean;
    userId?: boolean;
    communityId?: boolean;
    role?: boolean;
    grantedById?: boolean;
    note?: boolean;
    endedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommunityRoleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "communityId" | "role" | "grantedById" | "note" | "endedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["communityRole"]>;
export type CommunityRoleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
    events?: boolean | Prisma.CommunityRole$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityRoleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommunityRoleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
};
export type CommunityRoleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    grantedBy?: boolean | Prisma.CommunityRole$grantedByArgs<ExtArgs>;
};
export type $CommunityRolePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityRole";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        community: Prisma.$CommunityPayload<ExtArgs>;
        grantedBy: Prisma.$UserPayload<ExtArgs> | null;
        events: Prisma.$CommunityRoleEventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        communityId: string;
        role: $Enums.CommunityRoleType;
        grantedById: string | null;
        note: string | null;
        endedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["communityRole"]>;
    composites: {};
};
export type CommunityRoleGetPayload<S extends boolean | null | undefined | CommunityRoleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload, S>;
export type CommunityRoleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityRoleCountAggregateInputType | true;
};
export interface CommunityRoleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityRole'];
        meta: {
            name: 'CommunityRole';
        };
    };
    findUnique<T extends CommunityRoleFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityRoleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityRoleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityRoleFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityRoleFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityRoleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityRoleFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityRoleCreateArgs>(args: Prisma.SelectSubset<T, CommunityRoleCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityRoleCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityRoleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityRoleDeleteArgs>(args: Prisma.SelectSubset<T, CommunityRoleDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityRoleUpdateArgs>(args: Prisma.SelectSubset<T, CommunityRoleUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityRoleDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityRoleUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityRoleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityRoleUpsertArgs>(args: Prisma.SelectSubset<T, CommunityRoleUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleClient<runtime.Types.Result.GetResult<Prisma.$CommunityRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityRoleCountArgs>(args?: Prisma.Subset<T, CommunityRoleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityRoleCountAggregateOutputType> : number>;
    aggregate<T extends CommunityRoleAggregateArgs>(args: Prisma.Subset<T, CommunityRoleAggregateArgs>): Prisma.PrismaPromise<GetCommunityRoleAggregateType<T>>;
    groupBy<T extends CommunityRoleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityRoleGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityRoleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityRoleFieldRefs;
}
export interface Prisma__CommunityRoleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    grantedBy<T extends Prisma.CommunityRole$grantedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityRole$grantedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    events<T extends Prisma.CommunityRole$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityRole$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityRoleFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityRole", 'String'>;
    readonly userId: Prisma.FieldRef<"CommunityRole", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityRole", 'String'>;
    readonly role: Prisma.FieldRef<"CommunityRole", 'CommunityRoleType'>;
    readonly grantedById: Prisma.FieldRef<"CommunityRole", 'String'>;
    readonly note: Prisma.FieldRef<"CommunityRole", 'String'>;
    readonly endedAt: Prisma.FieldRef<"CommunityRole", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CommunityRole", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommunityRole", 'DateTime'>;
}
export type CommunityRoleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleWhereUniqueInput;
};
export type CommunityRoleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleWhereUniqueInput;
};
export type CommunityRoleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleWhereInput;
    orderBy?: Prisma.CommunityRoleOrderByWithRelationInput | Prisma.CommunityRoleOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleScalarFieldEnum | Prisma.CommunityRoleScalarFieldEnum[];
};
export type CommunityRoleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleWhereInput;
    orderBy?: Prisma.CommunityRoleOrderByWithRelationInput | Prisma.CommunityRoleOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleScalarFieldEnum | Prisma.CommunityRoleScalarFieldEnum[];
};
export type CommunityRoleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleWhereInput;
    orderBy?: Prisma.CommunityRoleOrderByWithRelationInput | Prisma.CommunityRoleOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleScalarFieldEnum | Prisma.CommunityRoleScalarFieldEnum[];
};
export type CommunityRoleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleCreateInput, Prisma.CommunityRoleUncheckedCreateInput>;
};
export type CommunityRoleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityRoleCreateManyInput | Prisma.CommunityRoleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    data: Prisma.CommunityRoleCreateManyInput | Prisma.CommunityRoleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityRoleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateInput, Prisma.CommunityRoleUncheckedUpdateInput>;
    where: Prisma.CommunityRoleWhereUniqueInput;
};
export type CommunityRoleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityRoleUpdateManyMutationInput, Prisma.CommunityRoleUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleWhereInput;
    limit?: number;
};
export type CommunityRoleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleUpdateManyMutationInput, Prisma.CommunityRoleUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleWhereInput;
    limit?: number;
    include?: Prisma.CommunityRoleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleCreateInput, Prisma.CommunityRoleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityRoleUpdateInput, Prisma.CommunityRoleUncheckedUpdateInput>;
};
export type CommunityRoleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleWhereUniqueInput;
};
export type CommunityRoleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleWhereInput;
    limit?: number;
};
export type CommunityRole$grantedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type CommunityRole$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommunityRoleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInclude<ExtArgs> | null;
};
export {};
