import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityRoleInviteModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityRoleInvitePayload>;
export type AggregateCommunityRoleInvite = {
    _count: CommunityRoleInviteCountAggregateOutputType | null;
    _min: CommunityRoleInviteMinAggregateOutputType | null;
    _max: CommunityRoleInviteMaxAggregateOutputType | null;
};
export type CommunityRoleInviteMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    invitedUserId: string | null;
    invitedById: string | null;
    role: $Enums.CommunityRoleType | null;
    status: $Enums.TeamInviteStatus | null;
    note: string | null;
    expiresAt: Date | null;
    respondedAt: Date | null;
    createdAt: Date | null;
};
export type CommunityRoleInviteMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    invitedUserId: string | null;
    invitedById: string | null;
    role: $Enums.CommunityRoleType | null;
    status: $Enums.TeamInviteStatus | null;
    note: string | null;
    expiresAt: Date | null;
    respondedAt: Date | null;
    createdAt: Date | null;
};
export type CommunityRoleInviteCountAggregateOutputType = {
    id: number;
    communityId: number;
    invitedUserId: number;
    invitedById: number;
    role: number;
    status: number;
    note: number;
    expiresAt: number;
    respondedAt: number;
    createdAt: number;
    _all: number;
};
export type CommunityRoleInviteMinAggregateInputType = {
    id?: true;
    communityId?: true;
    invitedUserId?: true;
    invitedById?: true;
    role?: true;
    status?: true;
    note?: true;
    expiresAt?: true;
    respondedAt?: true;
    createdAt?: true;
};
export type CommunityRoleInviteMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    invitedUserId?: true;
    invitedById?: true;
    role?: true;
    status?: true;
    note?: true;
    expiresAt?: true;
    respondedAt?: true;
    createdAt?: true;
};
export type CommunityRoleInviteCountAggregateInputType = {
    id?: true;
    communityId?: true;
    invitedUserId?: true;
    invitedById?: true;
    role?: true;
    status?: true;
    note?: true;
    expiresAt?: true;
    respondedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunityRoleInviteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleInviteWhereInput;
    orderBy?: Prisma.CommunityRoleInviteOrderByWithRelationInput | Prisma.CommunityRoleInviteOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleInviteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityRoleInviteCountAggregateInputType;
    _min?: CommunityRoleInviteMinAggregateInputType;
    _max?: CommunityRoleInviteMaxAggregateInputType;
};
export type GetCommunityRoleInviteAggregateType<T extends CommunityRoleInviteAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityRoleInvite]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityRoleInvite[P]> : Prisma.GetScalarType<T[P], AggregateCommunityRoleInvite[P]>;
};
export type CommunityRoleInviteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleInviteWhereInput;
    orderBy?: Prisma.CommunityRoleInviteOrderByWithAggregationInput | Prisma.CommunityRoleInviteOrderByWithAggregationInput[];
    by: Prisma.CommunityRoleInviteScalarFieldEnum[] | Prisma.CommunityRoleInviteScalarFieldEnum;
    having?: Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityRoleInviteCountAggregateInputType | true;
    _min?: CommunityRoleInviteMinAggregateInputType;
    _max?: CommunityRoleInviteMaxAggregateInputType;
};
export type CommunityRoleInviteGroupByOutputType = {
    id: string;
    communityId: string;
    invitedUserId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date;
    respondedAt: Date | null;
    createdAt: Date;
    _count: CommunityRoleInviteCountAggregateOutputType | null;
    _min: CommunityRoleInviteMinAggregateOutputType | null;
    _max: CommunityRoleInviteMaxAggregateOutputType | null;
};
type GetCommunityRoleInviteGroupByPayload<T extends CommunityRoleInviteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityRoleInviteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityRoleInviteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityRoleInviteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityRoleInviteGroupByOutputType[P]>;
}>>;
export type CommunityRoleInviteWhereInput = {
    AND?: Prisma.CommunityRoleInviteWhereInput | Prisma.CommunityRoleInviteWhereInput[];
    OR?: Prisma.CommunityRoleInviteWhereInput[];
    NOT?: Prisma.CommunityRoleInviteWhereInput | Prisma.CommunityRoleInviteWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    communityId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedUserId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedById?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRoleInvite"> | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFilter<"CommunityRoleInvite"> | $Enums.TeamInviteStatus;
    note?: Prisma.StringFilter<"CommunityRoleInvite"> | string;
    expiresAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"CommunityRoleInvite"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    invitedUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invitedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CommunityRoleInviteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    invitedUserId?: Prisma.SortOrder;
    invitedById?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    invitedUser?: Prisma.UserOrderByWithRelationInput;
    invitedBy?: Prisma.UserOrderByWithRelationInput;
};
export type CommunityRoleInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityRoleInviteWhereInput | Prisma.CommunityRoleInviteWhereInput[];
    OR?: Prisma.CommunityRoleInviteWhereInput[];
    NOT?: Prisma.CommunityRoleInviteWhereInput | Prisma.CommunityRoleInviteWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedUserId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedById?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRoleInvite"> | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFilter<"CommunityRoleInvite"> | $Enums.TeamInviteStatus;
    note?: Prisma.StringFilter<"CommunityRoleInvite"> | string;
    expiresAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"CommunityRoleInvite"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    invitedUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invitedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CommunityRoleInviteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    invitedUserId?: Prisma.SortOrder;
    invitedById?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityRoleInviteCountOrderByAggregateInput;
    _max?: Prisma.CommunityRoleInviteMaxOrderByAggregateInput;
    _min?: Prisma.CommunityRoleInviteMinOrderByAggregateInput;
};
export type CommunityRoleInviteScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput | Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput | Prisma.CommunityRoleInviteScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityRoleInvite"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityRoleInvite"> | string;
    invitedUserId?: Prisma.UuidWithAggregatesFilter<"CommunityRoleInvite"> | string;
    invitedById?: Prisma.UuidWithAggregatesFilter<"CommunityRoleInvite"> | string;
    role?: Prisma.EnumCommunityRoleTypeWithAggregatesFilter<"CommunityRoleInvite"> | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusWithAggregatesFilter<"CommunityRoleInvite"> | $Enums.TeamInviteStatus;
    note?: Prisma.StringWithAggregatesFilter<"CommunityRoleInvite"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityRoleInvite"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommunityRoleInvite"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityRoleInvite"> | Date | string;
};
export type CommunityRoleInviteCreateInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutRoleInvitesInput;
    invitedUser: Prisma.UserCreateNestedOneWithoutRoleInvitesReceivedInput;
    invitedBy: Prisma.UserCreateNestedOneWithoutRoleInvitesCreatedInput;
};
export type CommunityRoleInviteUncheckedCreateInput = {
    id?: string;
    communityId: string;
    invitedUserId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRoleInvitesNestedInput;
    invitedUser?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesReceivedNestedInput;
    invitedBy?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesCreatedNestedInput;
};
export type CommunityRoleInviteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteCreateManyInput = {
    id?: string;
    communityId: string;
    invitedUserId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteListRelationFilter = {
    every?: Prisma.CommunityRoleInviteWhereInput;
    some?: Prisma.CommunityRoleInviteWhereInput;
    none?: Prisma.CommunityRoleInviteWhereInput;
};
export type CommunityRoleInviteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityRoleInviteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    invitedUserId?: Prisma.SortOrder;
    invitedById?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleInviteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    invitedUserId?: Prisma.SortOrder;
    invitedById?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleInviteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    invitedUserId?: Prisma.SortOrder;
    invitedById?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityRoleInviteCreateNestedManyWithoutInvitedUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedUserInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteCreateNestedManyWithoutInvitedByInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedByInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedByInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteUncheckedCreateNestedManyWithoutInvitedUserInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedUserInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedByInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedByInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteUpdateManyWithoutInvitedUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedUserInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedUserInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedUserInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedUserInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type CommunityRoleInviteUpdateManyWithoutInvitedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedByInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedByInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedByInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedByInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedByInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedByInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedByInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedByInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutInvitedUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedUserInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedUserInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedUserInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedUserInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedUserInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput> | Prisma.CommunityRoleInviteCreateWithoutInvitedByInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutInvitedByInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedByInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedByInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyInvitedByInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedByInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedByInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedByInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutInvitedByInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type CommunityRoleInviteCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleInviteCreateWithoutCommunityInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleInviteCreateWithoutCommunityInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
};
export type CommunityRoleInviteUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleInviteCreateWithoutCommunityInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput> | Prisma.CommunityRoleInviteCreateWithoutCommunityInput[] | Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput | Prisma.CommunityRoleInviteCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleInviteUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityRoleInviteCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    disconnect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    delete?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    connect?: Prisma.CommunityRoleInviteWhereUniqueInput | Prisma.CommunityRoleInviteWhereUniqueInput[];
    update?: Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityRoleInviteUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityRoleInviteUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
};
export type EnumTeamInviteStatusFieldUpdateOperationsInput = {
    set?: $Enums.TeamInviteStatus;
};
export type CommunityRoleInviteCreateWithoutInvitedUserInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutRoleInvitesInput;
    invitedBy: Prisma.UserCreateNestedOneWithoutRoleInvitesCreatedInput;
};
export type CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput = {
    id?: string;
    communityId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteCreateOrConnectWithoutInvitedUserInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput>;
};
export type CommunityRoleInviteCreateManyInvitedUserInputEnvelope = {
    data: Prisma.CommunityRoleInviteCreateManyInvitedUserInput | Prisma.CommunityRoleInviteCreateManyInvitedUserInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleInviteCreateWithoutInvitedByInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutRoleInvitesInput;
    invitedUser: Prisma.UserCreateNestedOneWithoutRoleInvitesReceivedInput;
};
export type CommunityRoleInviteUncheckedCreateWithoutInvitedByInput = {
    id?: string;
    communityId: string;
    invitedUserId: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteCreateOrConnectWithoutInvitedByInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput>;
};
export type CommunityRoleInviteCreateManyInvitedByInputEnvelope = {
    data: Prisma.CommunityRoleInviteCreateManyInvitedByInput | Prisma.CommunityRoleInviteCreateManyInvitedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedUserInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutInvitedUserInput>;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedUserInput>;
};
export type CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedUserInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutInvitedUserInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutInvitedUserInput>;
};
export type CommunityRoleInviteUpdateManyWithWhereWithoutInvitedUserInput = {
    where: Prisma.CommunityRoleInviteScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateManyMutationInput, Prisma.CommunityRoleInviteUncheckedUpdateManyWithoutInvitedUserInput>;
};
export type CommunityRoleInviteScalarWhereInput = {
    AND?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
    OR?: Prisma.CommunityRoleInviteScalarWhereInput[];
    NOT?: Prisma.CommunityRoleInviteScalarWhereInput | Prisma.CommunityRoleInviteScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    communityId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedUserId?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    invitedById?: Prisma.UuidFilter<"CommunityRoleInvite"> | string;
    role?: Prisma.EnumCommunityRoleTypeFilter<"CommunityRoleInvite"> | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFilter<"CommunityRoleInvite"> | $Enums.TeamInviteStatus;
    note?: Prisma.StringFilter<"CommunityRoleInvite"> | string;
    expiresAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"CommunityRoleInvite"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityRoleInvite"> | Date | string;
};
export type CommunityRoleInviteUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutInvitedByInput>;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutInvitedByInput>;
};
export type CommunityRoleInviteUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutInvitedByInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutInvitedByInput>;
};
export type CommunityRoleInviteUpdateManyWithWhereWithoutInvitedByInput = {
    where: Prisma.CommunityRoleInviteScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateManyMutationInput, Prisma.CommunityRoleInviteUncheckedUpdateManyWithoutInvitedByInput>;
};
export type CommunityRoleInviteCreateWithoutCommunityInput = {
    id?: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    invitedUser: Prisma.UserCreateNestedOneWithoutRoleInvitesReceivedInput;
    invitedBy: Prisma.UserCreateNestedOneWithoutRoleInvitesCreatedInput;
};
export type CommunityRoleInviteUncheckedCreateWithoutCommunityInput = {
    id?: string;
    invitedUserId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput>;
};
export type CommunityRoleInviteCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityRoleInviteCreateManyCommunityInput | Prisma.CommunityRoleInviteCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleInviteUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedCreateWithoutCommunityInput>;
};
export type CommunityRoleInviteUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateWithoutCommunityInput, Prisma.CommunityRoleInviteUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityRoleInviteUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityRoleInviteScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateManyMutationInput, Prisma.CommunityRoleInviteUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityRoleInviteCreateManyInvitedUserInput = {
    id?: string;
    communityId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteCreateManyInvitedByInput = {
    id?: string;
    communityId: string;
    invitedUserId: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteUpdateWithoutInvitedUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRoleInvitesNestedInput;
    invitedBy?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesCreatedNestedInput;
};
export type CommunityRoleInviteUncheckedUpdateWithoutInvitedUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutInvitedUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteUpdateWithoutInvitedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutRoleInvitesNestedInput;
    invitedUser?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesReceivedNestedInput;
};
export type CommunityRoleInviteUncheckedUpdateWithoutInvitedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutInvitedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteCreateManyCommunityInput = {
    id?: string;
    invitedUserId: string;
    invitedById: string;
    role: $Enums.CommunityRoleType;
    status?: $Enums.TeamInviteStatus;
    note: string;
    expiresAt: Date | string;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type CommunityRoleInviteUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invitedUser?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesReceivedNestedInput;
    invitedBy?: Prisma.UserUpdateOneRequiredWithoutRoleInvitesCreatedNestedInput;
};
export type CommunityRoleInviteUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    invitedById?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumCommunityRoleTypeFieldUpdateOperationsInput | $Enums.CommunityRoleType;
    status?: Prisma.EnumTeamInviteStatusFieldUpdateOperationsInput | $Enums.TeamInviteStatus;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityRoleInviteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    invitedUserId?: boolean;
    invitedById?: boolean;
    role?: boolean;
    status?: boolean;
    note?: boolean;
    expiresAt?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleInvite"]>;
export type CommunityRoleInviteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    invitedUserId?: boolean;
    invitedById?: boolean;
    role?: boolean;
    status?: boolean;
    note?: boolean;
    expiresAt?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleInvite"]>;
export type CommunityRoleInviteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    invitedUserId?: boolean;
    invitedById?: boolean;
    role?: boolean;
    status?: boolean;
    note?: boolean;
    expiresAt?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityRoleInvite"]>;
export type CommunityRoleInviteSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    invitedUserId?: boolean;
    invitedById?: boolean;
    role?: boolean;
    status?: boolean;
    note?: boolean;
    expiresAt?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
};
export type CommunityRoleInviteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "invitedUserId" | "invitedById" | "role" | "status" | "note" | "expiresAt" | "respondedAt" | "createdAt", ExtArgs["result"]["communityRoleInvite"]>;
export type CommunityRoleInviteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityRoleInviteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityRoleInviteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    invitedUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invitedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommunityRoleInvitePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityRoleInvite";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        invitedUser: Prisma.$UserPayload<ExtArgs>;
        invitedBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        invitedUserId: string;
        invitedById: string;
        role: $Enums.CommunityRoleType;
        status: $Enums.TeamInviteStatus;
        note: string;
        expiresAt: Date;
        respondedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["communityRoleInvite"]>;
    composites: {};
};
export type CommunityRoleInviteGetPayload<S extends boolean | null | undefined | CommunityRoleInviteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload, S>;
export type CommunityRoleInviteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityRoleInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityRoleInviteCountAggregateInputType | true;
};
export interface CommunityRoleInviteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityRoleInvite'];
        meta: {
            name: 'CommunityRoleInvite';
        };
    };
    findUnique<T extends CommunityRoleInviteFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityRoleInviteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityRoleInviteFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityRoleInviteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityRoleInviteFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityRoleInviteCreateArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityRoleInviteCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityRoleInviteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityRoleInviteDeleteArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityRoleInviteUpdateArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityRoleInviteDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityRoleInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityRoleInviteUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityRoleInviteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityRoleInviteUpsertArgs>(args: Prisma.SelectSubset<T, CommunityRoleInviteUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityRoleInviteClient<runtime.Types.Result.GetResult<Prisma.$CommunityRoleInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityRoleInviteCountArgs>(args?: Prisma.Subset<T, CommunityRoleInviteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityRoleInviteCountAggregateOutputType> : number>;
    aggregate<T extends CommunityRoleInviteAggregateArgs>(args: Prisma.Subset<T, CommunityRoleInviteAggregateArgs>): Prisma.PrismaPromise<GetCommunityRoleInviteAggregateType<T>>;
    groupBy<T extends CommunityRoleInviteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityRoleInviteGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityRoleInviteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityRoleInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityRoleInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityRoleInviteFieldRefs;
}
export interface Prisma__CommunityRoleInviteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invitedUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invitedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityRoleInviteFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityRoleInvite", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityRoleInvite", 'String'>;
    readonly invitedUserId: Prisma.FieldRef<"CommunityRoleInvite", 'String'>;
    readonly invitedById: Prisma.FieldRef<"CommunityRoleInvite", 'String'>;
    readonly role: Prisma.FieldRef<"CommunityRoleInvite", 'CommunityRoleType'>;
    readonly status: Prisma.FieldRef<"CommunityRoleInvite", 'TeamInviteStatus'>;
    readonly note: Prisma.FieldRef<"CommunityRoleInvite", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"CommunityRoleInvite", 'DateTime'>;
    readonly respondedAt: Prisma.FieldRef<"CommunityRoleInvite", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CommunityRoleInvite", 'DateTime'>;
}
export type CommunityRoleInviteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
};
export type CommunityRoleInviteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
};
export type CommunityRoleInviteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleInviteWhereInput;
    orderBy?: Prisma.CommunityRoleInviteOrderByWithRelationInput | Prisma.CommunityRoleInviteOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleInviteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleInviteScalarFieldEnum | Prisma.CommunityRoleInviteScalarFieldEnum[];
};
export type CommunityRoleInviteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleInviteWhereInput;
    orderBy?: Prisma.CommunityRoleInviteOrderByWithRelationInput | Prisma.CommunityRoleInviteOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleInviteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleInviteScalarFieldEnum | Prisma.CommunityRoleInviteScalarFieldEnum[];
};
export type CommunityRoleInviteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where?: Prisma.CommunityRoleInviteWhereInput;
    orderBy?: Prisma.CommunityRoleInviteOrderByWithRelationInput | Prisma.CommunityRoleInviteOrderByWithRelationInput[];
    cursor?: Prisma.CommunityRoleInviteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityRoleInviteScalarFieldEnum | Prisma.CommunityRoleInviteScalarFieldEnum[];
};
export type CommunityRoleInviteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleInviteCreateInput, Prisma.CommunityRoleInviteUncheckedCreateInput>;
};
export type CommunityRoleInviteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityRoleInviteCreateManyInput | Prisma.CommunityRoleInviteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityRoleInviteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    data: Prisma.CommunityRoleInviteCreateManyInput | Prisma.CommunityRoleInviteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityRoleInviteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleInviteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateInput, Prisma.CommunityRoleInviteUncheckedUpdateInput>;
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
};
export type CommunityRoleInviteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateManyMutationInput, Prisma.CommunityRoleInviteUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleInviteWhereInput;
    limit?: number;
};
export type CommunityRoleInviteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityRoleInviteUpdateManyMutationInput, Prisma.CommunityRoleInviteUncheckedUpdateManyInput>;
    where?: Prisma.CommunityRoleInviteWhereInput;
    limit?: number;
    include?: Prisma.CommunityRoleInviteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityRoleInviteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityRoleInviteCreateInput, Prisma.CommunityRoleInviteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityRoleInviteUpdateInput, Prisma.CommunityRoleInviteUncheckedUpdateInput>;
};
export type CommunityRoleInviteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
    where: Prisma.CommunityRoleInviteWhereUniqueInput;
};
export type CommunityRoleInviteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityRoleInviteWhereInput;
    limit?: number;
};
export type CommunityRoleInviteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityRoleInviteSelect<ExtArgs> | null;
    omit?: Prisma.CommunityRoleInviteOmit<ExtArgs> | null;
    include?: Prisma.CommunityRoleInviteInclude<ExtArgs> | null;
};
export {};
