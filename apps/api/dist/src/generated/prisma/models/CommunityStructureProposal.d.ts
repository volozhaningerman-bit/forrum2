import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityStructureProposalModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityStructureProposalPayload>;
export type AggregateCommunityStructureProposal = {
    _count: CommunityStructureProposalCountAggregateOutputType | null;
    _min: CommunityStructureProposalMinAggregateOutputType | null;
    _max: CommunityStructureProposalMaxAggregateOutputType | null;
};
export type CommunityStructureProposalMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    targetCommunityId: string | null;
    createdById: string | null;
    resolvedById: string | null;
    type: $Enums.CommunityStructureChangeType | null;
    status: $Enums.CommunityStructureStatus | null;
    title: string | null;
    description: string | null;
    proposedName: string | null;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityStructureProposalMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    targetCommunityId: string | null;
    createdById: string | null;
    resolvedById: string | null;
    type: $Enums.CommunityStructureChangeType | null;
    status: $Enums.CommunityStructureStatus | null;
    title: string | null;
    description: string | null;
    proposedName: string | null;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityStructureProposalCountAggregateOutputType = {
    id: number;
    communityId: number;
    targetCommunityId: number;
    createdById: number;
    resolvedById: number;
    type: number;
    status: number;
    title: number;
    description: number;
    proposedName: number;
    resolutionNote: number;
    resolvedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommunityStructureProposalMinAggregateInputType = {
    id?: true;
    communityId?: true;
    targetCommunityId?: true;
    createdById?: true;
    resolvedById?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    proposedName?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityStructureProposalMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    targetCommunityId?: true;
    createdById?: true;
    resolvedById?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    proposedName?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityStructureProposalCountAggregateInputType = {
    id?: true;
    communityId?: true;
    targetCommunityId?: true;
    createdById?: true;
    resolvedById?: true;
    type?: true;
    status?: true;
    title?: true;
    description?: true;
    proposedName?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommunityStructureProposalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityStructureProposalWhereInput;
    orderBy?: Prisma.CommunityStructureProposalOrderByWithRelationInput | Prisma.CommunityStructureProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityStructureProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityStructureProposalCountAggregateInputType;
    _min?: CommunityStructureProposalMinAggregateInputType;
    _max?: CommunityStructureProposalMaxAggregateInputType;
};
export type GetCommunityStructureProposalAggregateType<T extends CommunityStructureProposalAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityStructureProposal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityStructureProposal[P]> : Prisma.GetScalarType<T[P], AggregateCommunityStructureProposal[P]>;
};
export type CommunityStructureProposalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityStructureProposalWhereInput;
    orderBy?: Prisma.CommunityStructureProposalOrderByWithAggregationInput | Prisma.CommunityStructureProposalOrderByWithAggregationInput[];
    by: Prisma.CommunityStructureProposalScalarFieldEnum[] | Prisma.CommunityStructureProposalScalarFieldEnum;
    having?: Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityStructureProposalCountAggregateInputType | true;
    _min?: CommunityStructureProposalMinAggregateInputType;
    _max?: CommunityStructureProposalMaxAggregateInputType;
};
export type CommunityStructureProposalGroupByOutputType = {
    id: string;
    communityId: string;
    targetCommunityId: string | null;
    createdById: string;
    resolvedById: string | null;
    type: $Enums.CommunityStructureChangeType;
    status: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName: string | null;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CommunityStructureProposalCountAggregateOutputType | null;
    _min: CommunityStructureProposalMinAggregateOutputType | null;
    _max: CommunityStructureProposalMaxAggregateOutputType | null;
};
type GetCommunityStructureProposalGroupByPayload<T extends CommunityStructureProposalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityStructureProposalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityStructureProposalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityStructureProposalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityStructureProposalGroupByOutputType[P]>;
}>>;
export type CommunityStructureProposalWhereInput = {
    AND?: Prisma.CommunityStructureProposalWhereInput | Prisma.CommunityStructureProposalWhereInput[];
    OR?: Prisma.CommunityStructureProposalWhereInput[];
    NOT?: Prisma.CommunityStructureProposalWhereInput | Prisma.CommunityStructureProposalWhereInput[];
    id?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    communityId?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    targetCommunityId?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    createdById?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    resolvedById?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    description?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    proposedName?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"CommunityStructureProposal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    targetCommunity?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type CommunityStructureProposalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    targetCommunityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    proposedName?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    targetCommunity?: Prisma.CommunityOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    resolvedBy?: Prisma.UserOrderByWithRelationInput;
};
export type CommunityStructureProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityStructureProposalWhereInput | Prisma.CommunityStructureProposalWhereInput[];
    OR?: Prisma.CommunityStructureProposalWhereInput[];
    NOT?: Prisma.CommunityStructureProposalWhereInput | Prisma.CommunityStructureProposalWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    targetCommunityId?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    createdById?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    resolvedById?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    description?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    proposedName?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"CommunityStructureProposal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    targetCommunity?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type CommunityStructureProposalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    targetCommunityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    proposedName?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityStructureProposalCountOrderByAggregateInput;
    _max?: Prisma.CommunityStructureProposalMaxOrderByAggregateInput;
    _min?: Prisma.CommunityStructureProposalMinOrderByAggregateInput;
};
export type CommunityStructureProposalScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput | Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput | Prisma.CommunityStructureProposalScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityStructureProposal"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityStructureProposal"> | string;
    targetCommunityId?: Prisma.UuidNullableWithAggregatesFilter<"CommunityStructureProposal"> | string | null;
    createdById?: Prisma.UuidWithAggregatesFilter<"CommunityStructureProposal"> | string;
    resolvedById?: Prisma.UuidNullableWithAggregatesFilter<"CommunityStructureProposal"> | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeWithAggregatesFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusWithAggregatesFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureStatus;
    title?: Prisma.StringWithAggregatesFilter<"CommunityStructureProposal"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CommunityStructureProposal"> | string;
    proposedName?: Prisma.StringNullableWithAggregatesFilter<"CommunityStructureProposal"> | string | null;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"CommunityStructureProposal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommunityStructureProposal"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityStructureProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityStructureProposal"> | Date | string;
};
export type CommunityStructureProposalCreateInput = {
    id?: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutStructureProposalsInput;
    targetCommunity?: Prisma.CommunityCreateNestedOneWithoutStructureTargetsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutStructureProposalsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutStructureResolutionsInput;
};
export type CommunityStructureProposalUncheckedCreateInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutStructureProposalsNestedInput;
    targetCommunity?: Prisma.CommunityUpdateOneWithoutStructureTargetsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutStructureProposalsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutStructureResolutionsNestedInput;
};
export type CommunityStructureProposalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalCreateManyInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalListRelationFilter = {
    every?: Prisma.CommunityStructureProposalWhereInput;
    some?: Prisma.CommunityStructureProposalWhereInput;
    none?: Prisma.CommunityStructureProposalWhereInput;
};
export type CommunityStructureProposalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityStructureProposalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    targetCommunityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    proposedName?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityStructureProposalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    targetCommunityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    proposedName?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityStructureProposalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    targetCommunityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    proposedName?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityStructureProposalCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityStructureProposalCreateWithoutCreatedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput> | Prisma.CommunityStructureProposalCreateWithoutResolvedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyResolvedByInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityStructureProposalCreateWithoutCreatedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUncheckedCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput> | Prisma.CommunityStructureProposalCreateWithoutResolvedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyResolvedByInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityStructureProposalCreateWithoutCreatedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput> | Prisma.CommunityStructureProposalCreateWithoutResolvedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyResolvedByInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutResolvedByInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityStructureProposalCreateWithoutCreatedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput> | Prisma.CommunityStructureProposalCreateWithoutResolvedByInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyResolvedByInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutResolvedByInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalCreateNestedManyWithoutTargetCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyTargetCommunityInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUncheckedCreateNestedManyWithoutTargetCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyTargetCommunityInputEnvelope;
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
};
export type CommunityStructureProposalUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUpdateManyWithoutTargetCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutTargetCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyTargetCommunityInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutTargetCommunityInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutTargetCommunityInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutTargetCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput> | Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput[] | Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput[];
    connectOrCreate?: Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput | Prisma.CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput[];
    upsert?: Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpsertWithWhereUniqueWithoutTargetCommunityInput[];
    createMany?: Prisma.CommunityStructureProposalCreateManyTargetCommunityInputEnvelope;
    set?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    delete?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    connect?: Prisma.CommunityStructureProposalWhereUniqueInput | Prisma.CommunityStructureProposalWhereUniqueInput[];
    update?: Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpdateWithWhereUniqueWithoutTargetCommunityInput[];
    updateMany?: Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutTargetCommunityInput | Prisma.CommunityStructureProposalUpdateManyWithWhereWithoutTargetCommunityInput[];
    deleteMany?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
};
export type EnumCommunityStructureChangeTypeFieldUpdateOperationsInput = {
    set?: $Enums.CommunityStructureChangeType;
};
export type EnumCommunityStructureStatusFieldUpdateOperationsInput = {
    set?: $Enums.CommunityStructureStatus;
};
export type CommunityStructureProposalCreateWithoutCreatedByInput = {
    id?: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutStructureProposalsInput;
    targetCommunity?: Prisma.CommunityCreateNestedOneWithoutStructureTargetsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutStructureResolutionsInput;
};
export type CommunityStructureProposalUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityStructureProposalCreateManyCreatedByInputEnvelope = {
    data: Prisma.CommunityStructureProposalCreateManyCreatedByInput | Prisma.CommunityStructureProposalCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityStructureProposalCreateWithoutResolvedByInput = {
    id?: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutStructureProposalsInput;
    targetCommunity?: Prisma.CommunityCreateNestedOneWithoutStructureTargetsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutStructureProposalsInput;
};
export type CommunityStructureProposalUncheckedCreateWithoutResolvedByInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    createdById: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateOrConnectWithoutResolvedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput>;
};
export type CommunityStructureProposalCreateManyResolvedByInputEnvelope = {
    data: Prisma.CommunityStructureProposalCreateManyResolvedByInput | Prisma.CommunityStructureProposalCreateManyResolvedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityStructureProposalUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityStructureProposalUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutCreatedByInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutCreatedByInput>;
};
export type CommunityStructureProposalUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.CommunityStructureProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyWithoutCreatedByInput>;
};
export type CommunityStructureProposalScalarWhereInput = {
    AND?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
    OR?: Prisma.CommunityStructureProposalScalarWhereInput[];
    NOT?: Prisma.CommunityStructureProposalScalarWhereInput | Prisma.CommunityStructureProposalScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    communityId?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    targetCommunityId?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    createdById?: Prisma.UuidFilter<"CommunityStructureProposal"> | string;
    resolvedById?: Prisma.UuidNullableFilter<"CommunityStructureProposal"> | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFilter<"CommunityStructureProposal"> | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    description?: Prisma.StringFilter<"CommunityStructureProposal"> | string;
    proposedName?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityStructureProposal"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"CommunityStructureProposal"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityStructureProposal"> | Date | string;
};
export type CommunityStructureProposalUpsertWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutResolvedByInput>;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutResolvedByInput>;
};
export type CommunityStructureProposalUpdateWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutResolvedByInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutResolvedByInput>;
};
export type CommunityStructureProposalUpdateManyWithWhereWithoutResolvedByInput = {
    where: Prisma.CommunityStructureProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyWithoutResolvedByInput>;
};
export type CommunityStructureProposalCreateWithoutCommunityInput = {
    id?: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targetCommunity?: Prisma.CommunityCreateNestedOneWithoutStructureTargetsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutStructureProposalsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutStructureResolutionsInput;
};
export type CommunityStructureProposalUncheckedCreateWithoutCommunityInput = {
    id?: string;
    targetCommunityId?: string | null;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput>;
};
export type CommunityStructureProposalCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityStructureProposalCreateManyCommunityInput | Prisma.CommunityStructureProposalCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityStructureProposalCreateWithoutTargetCommunityInput = {
    id?: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutStructureProposalsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutStructureProposalsInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutStructureResolutionsInput;
};
export type CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput = {
    id?: string;
    communityId: string;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateOrConnectWithoutTargetCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput>;
};
export type CommunityStructureProposalCreateManyTargetCommunityInputEnvelope = {
    data: Prisma.CommunityStructureProposalCreateManyTargetCommunityInput | Prisma.CommunityStructureProposalCreateManyTargetCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityStructureProposalUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutCommunityInput>;
};
export type CommunityStructureProposalUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutCommunityInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityStructureProposalUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityStructureProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityStructureProposalUpsertWithWhereUniqueWithoutTargetCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutTargetCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedCreateWithoutTargetCommunityInput>;
};
export type CommunityStructureProposalUpdateWithWhereUniqueWithoutTargetCommunityInput = {
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateWithoutTargetCommunityInput, Prisma.CommunityStructureProposalUncheckedUpdateWithoutTargetCommunityInput>;
};
export type CommunityStructureProposalUpdateManyWithWhereWithoutTargetCommunityInput = {
    where: Prisma.CommunityStructureProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyWithoutTargetCommunityInput>;
};
export type CommunityStructureProposalCreateManyCreatedByInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateManyResolvedByInput = {
    id?: string;
    communityId: string;
    targetCommunityId?: string | null;
    createdById: string;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutStructureProposalsNestedInput;
    targetCommunity?: Prisma.CommunityUpdateOneWithoutStructureTargetsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutStructureResolutionsNestedInput;
};
export type CommunityStructureProposalUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutStructureProposalsNestedInput;
    targetCommunity?: Prisma.CommunityUpdateOneWithoutStructureTargetsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutStructureProposalsNestedInput;
};
export type CommunityStructureProposalUncheckedUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalCreateManyCommunityInput = {
    id?: string;
    targetCommunityId?: string | null;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalCreateManyTargetCommunityInput = {
    id?: string;
    communityId: string;
    createdById: string;
    resolvedById?: string | null;
    type: $Enums.CommunityStructureChangeType;
    status?: $Enums.CommunityStructureStatus;
    title: string;
    description: string;
    proposedName?: string | null;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityStructureProposalUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targetCommunity?: Prisma.CommunityUpdateOneWithoutStructureTargetsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutStructureProposalsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutStructureResolutionsNestedInput;
};
export type CommunityStructureProposalUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetCommunityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUpdateWithoutTargetCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutStructureProposalsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutStructureProposalsNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutStructureResolutionsNestedInput;
};
export type CommunityStructureProposalUncheckedUpdateWithoutTargetCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalUncheckedUpdateManyWithoutTargetCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumCommunityStructureChangeTypeFieldUpdateOperationsInput | $Enums.CommunityStructureChangeType;
    status?: Prisma.EnumCommunityStructureStatusFieldUpdateOperationsInput | $Enums.CommunityStructureStatus;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityStructureProposalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    targetCommunityId?: boolean;
    createdById?: boolean;
    resolvedById?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    proposedName?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["communityStructureProposal"]>;
export type CommunityStructureProposalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    targetCommunityId?: boolean;
    createdById?: boolean;
    resolvedById?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    proposedName?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["communityStructureProposal"]>;
export type CommunityStructureProposalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    targetCommunityId?: boolean;
    createdById?: boolean;
    resolvedById?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    proposedName?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["communityStructureProposal"]>;
export type CommunityStructureProposalSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    targetCommunityId?: boolean;
    createdById?: boolean;
    resolvedById?: boolean;
    type?: boolean;
    status?: boolean;
    title?: boolean;
    description?: boolean;
    proposedName?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommunityStructureProposalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "targetCommunityId" | "createdById" | "resolvedById" | "type" | "status" | "title" | "description" | "proposedName" | "resolutionNote" | "resolvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["communityStructureProposal"]>;
export type CommunityStructureProposalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
};
export type CommunityStructureProposalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
};
export type CommunityStructureProposalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    targetCommunity?: boolean | Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>;
};
export type $CommunityStructureProposalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityStructureProposal";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        targetCommunity: Prisma.$CommunityPayload<ExtArgs> | null;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        resolvedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        targetCommunityId: string | null;
        createdById: string;
        resolvedById: string | null;
        type: $Enums.CommunityStructureChangeType;
        status: $Enums.CommunityStructureStatus;
        title: string;
        description: string;
        proposedName: string | null;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["communityStructureProposal"]>;
    composites: {};
};
export type CommunityStructureProposalGetPayload<S extends boolean | null | undefined | CommunityStructureProposalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload, S>;
export type CommunityStructureProposalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityStructureProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityStructureProposalCountAggregateInputType | true;
};
export interface CommunityStructureProposalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityStructureProposal'];
        meta: {
            name: 'CommunityStructureProposal';
        };
    };
    findUnique<T extends CommunityStructureProposalFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityStructureProposalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityStructureProposalFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityStructureProposalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityStructureProposalFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityStructureProposalCreateArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityStructureProposalCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityStructureProposalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityStructureProposalDeleteArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityStructureProposalUpdateArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityStructureProposalDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityStructureProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityStructureProposalUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityStructureProposalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityStructureProposalUpsertArgs>(args: Prisma.SelectSubset<T, CommunityStructureProposalUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityStructureProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityStructureProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityStructureProposalCountArgs>(args?: Prisma.Subset<T, CommunityStructureProposalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityStructureProposalCountAggregateOutputType> : number>;
    aggregate<T extends CommunityStructureProposalAggregateArgs>(args: Prisma.Subset<T, CommunityStructureProposalAggregateArgs>): Prisma.PrismaPromise<GetCommunityStructureProposalAggregateType<T>>;
    groupBy<T extends CommunityStructureProposalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityStructureProposalGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityStructureProposalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityStructureProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityStructureProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityStructureProposalFieldRefs;
}
export interface Prisma__CommunityStructureProposalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    targetCommunity<T extends Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityStructureProposal$targetCommunityArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    resolvedBy<T extends Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityStructureProposal$resolvedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityStructureProposalFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly targetCommunityId: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly createdById: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly resolvedById: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly type: Prisma.FieldRef<"CommunityStructureProposal", 'CommunityStructureChangeType'>;
    readonly status: Prisma.FieldRef<"CommunityStructureProposal", 'CommunityStructureStatus'>;
    readonly title: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly description: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly proposedName: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly resolutionNote: Prisma.FieldRef<"CommunityStructureProposal", 'String'>;
    readonly resolvedAt: Prisma.FieldRef<"CommunityStructureProposal", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CommunityStructureProposal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommunityStructureProposal", 'DateTime'>;
}
export type CommunityStructureProposalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
};
export type CommunityStructureProposalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
};
export type CommunityStructureProposalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityStructureProposalWhereInput;
    orderBy?: Prisma.CommunityStructureProposalOrderByWithRelationInput | Prisma.CommunityStructureProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityStructureProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityStructureProposalScalarFieldEnum | Prisma.CommunityStructureProposalScalarFieldEnum[];
};
export type CommunityStructureProposalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityStructureProposalWhereInput;
    orderBy?: Prisma.CommunityStructureProposalOrderByWithRelationInput | Prisma.CommunityStructureProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityStructureProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityStructureProposalScalarFieldEnum | Prisma.CommunityStructureProposalScalarFieldEnum[];
};
export type CommunityStructureProposalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityStructureProposalWhereInput;
    orderBy?: Prisma.CommunityStructureProposalOrderByWithRelationInput | Prisma.CommunityStructureProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityStructureProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityStructureProposalScalarFieldEnum | Prisma.CommunityStructureProposalScalarFieldEnum[];
};
export type CommunityStructureProposalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityStructureProposalCreateInput, Prisma.CommunityStructureProposalUncheckedCreateInput>;
};
export type CommunityStructureProposalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityStructureProposalCreateManyInput | Prisma.CommunityStructureProposalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityStructureProposalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    data: Prisma.CommunityStructureProposalCreateManyInput | Prisma.CommunityStructureProposalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityStructureProposalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityStructureProposalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateInput, Prisma.CommunityStructureProposalUncheckedUpdateInput>;
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
};
export type CommunityStructureProposalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyInput>;
    where?: Prisma.CommunityStructureProposalWhereInput;
    limit?: number;
};
export type CommunityStructureProposalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityStructureProposalUpdateManyMutationInput, Prisma.CommunityStructureProposalUncheckedUpdateManyInput>;
    where?: Prisma.CommunityStructureProposalWhereInput;
    limit?: number;
    include?: Prisma.CommunityStructureProposalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityStructureProposalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityStructureProposalCreateInput, Prisma.CommunityStructureProposalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityStructureProposalUpdateInput, Prisma.CommunityStructureProposalUncheckedUpdateInput>;
};
export type CommunityStructureProposalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityStructureProposalWhereUniqueInput;
};
export type CommunityStructureProposalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityStructureProposalWhereInput;
    limit?: number;
};
export type CommunityStructureProposal$targetCommunityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySelect<ExtArgs> | null;
    omit?: Prisma.CommunityOmit<ExtArgs> | null;
    include?: Prisma.CommunityInclude<ExtArgs> | null;
    where?: Prisma.CommunityWhereInput;
};
export type CommunityStructureProposal$resolvedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type CommunityStructureProposalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityStructureProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityStructureProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityStructureProposalInclude<ExtArgs> | null;
};
export {};
