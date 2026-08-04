import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityProposalModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityProposalPayload>;
export type AggregateCommunityProposal = {
    _count: CommunityProposalCountAggregateOutputType | null;
    _min: CommunityProposalMinAggregateOutputType | null;
    _max: CommunityProposalMaxAggregateOutputType | null;
};
export type CommunityProposalMinAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    suggestedParentId: string | null;
    name: string | null;
    description: string | null;
    initialTopics: string | null;
    status: $Enums.ProposalStatus | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityProposalMaxAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    suggestedParentId: string | null;
    name: string | null;
    description: string | null;
    initialTopics: string | null;
    status: $Enums.ProposalStatus | null;
    resolutionNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommunityProposalCountAggregateOutputType = {
    id: number;
    authorId: number;
    suggestedParentId: number;
    name: number;
    description: number;
    initialTopics: number;
    status: number;
    resolutionNote: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommunityProposalMinAggregateInputType = {
    id?: true;
    authorId?: true;
    suggestedParentId?: true;
    name?: true;
    description?: true;
    initialTopics?: true;
    status?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityProposalMaxAggregateInputType = {
    id?: true;
    authorId?: true;
    suggestedParentId?: true;
    name?: true;
    description?: true;
    initialTopics?: true;
    status?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommunityProposalCountAggregateInputType = {
    id?: true;
    authorId?: true;
    suggestedParentId?: true;
    name?: true;
    description?: true;
    initialTopics?: true;
    status?: true;
    resolutionNote?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommunityProposalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityProposalWhereInput;
    orderBy?: Prisma.CommunityProposalOrderByWithRelationInput | Prisma.CommunityProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityProposalCountAggregateInputType;
    _min?: CommunityProposalMinAggregateInputType;
    _max?: CommunityProposalMaxAggregateInputType;
};
export type GetCommunityProposalAggregateType<T extends CommunityProposalAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityProposal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityProposal[P]> : Prisma.GetScalarType<T[P], AggregateCommunityProposal[P]>;
};
export type CommunityProposalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityProposalWhereInput;
    orderBy?: Prisma.CommunityProposalOrderByWithAggregationInput | Prisma.CommunityProposalOrderByWithAggregationInput[];
    by: Prisma.CommunityProposalScalarFieldEnum[] | Prisma.CommunityProposalScalarFieldEnum;
    having?: Prisma.CommunityProposalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityProposalCountAggregateInputType | true;
    _min?: CommunityProposalMinAggregateInputType;
    _max?: CommunityProposalMaxAggregateInputType;
};
export type CommunityProposalGroupByOutputType = {
    id: string;
    authorId: string;
    suggestedParentId: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status: $Enums.ProposalStatus;
    resolutionNote: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CommunityProposalCountAggregateOutputType | null;
    _min: CommunityProposalMinAggregateOutputType | null;
    _max: CommunityProposalMaxAggregateOutputType | null;
};
type GetCommunityProposalGroupByPayload<T extends CommunityProposalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityProposalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityProposalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityProposalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityProposalGroupByOutputType[P]>;
}>>;
export type CommunityProposalWhereInput = {
    AND?: Prisma.CommunityProposalWhereInput | Prisma.CommunityProposalWhereInput[];
    OR?: Prisma.CommunityProposalWhereInput[];
    NOT?: Prisma.CommunityProposalWhereInput | Prisma.CommunityProposalWhereInput[];
    id?: Prisma.UuidFilter<"CommunityProposal"> | string;
    authorId?: Prisma.UuidFilter<"CommunityProposal"> | string;
    suggestedParentId?: Prisma.UuidNullableFilter<"CommunityProposal"> | string | null;
    name?: Prisma.StringFilter<"CommunityProposal"> | string;
    description?: Prisma.StringFilter<"CommunityProposal"> | string;
    initialTopics?: Prisma.StringFilter<"CommunityProposal"> | string;
    status?: Prisma.EnumProposalStatusFilter<"CommunityProposal"> | $Enums.ProposalStatus;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityProposal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    suggestedParent?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
    supports?: Prisma.ProposalSupportListRelationFilter;
};
export type CommunityProposalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    suggestedParentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    initialTopics?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
    suggestedParent?: Prisma.CommunityOrderByWithRelationInput;
    supports?: Prisma.ProposalSupportOrderByRelationAggregateInput;
};
export type CommunityProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityProposalWhereInput | Prisma.CommunityProposalWhereInput[];
    OR?: Prisma.CommunityProposalWhereInput[];
    NOT?: Prisma.CommunityProposalWhereInput | Prisma.CommunityProposalWhereInput[];
    authorId?: Prisma.UuidFilter<"CommunityProposal"> | string;
    suggestedParentId?: Prisma.UuidNullableFilter<"CommunityProposal"> | string | null;
    name?: Prisma.StringFilter<"CommunityProposal"> | string;
    description?: Prisma.StringFilter<"CommunityProposal"> | string;
    initialTopics?: Prisma.StringFilter<"CommunityProposal"> | string;
    status?: Prisma.EnumProposalStatusFilter<"CommunityProposal"> | $Enums.ProposalStatus;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityProposal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    suggestedParent?: Prisma.XOR<Prisma.CommunityNullableScalarRelationFilter, Prisma.CommunityWhereInput> | null;
    supports?: Prisma.ProposalSupportListRelationFilter;
}, "id">;
export type CommunityProposalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    suggestedParentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    initialTopics?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityProposalCountOrderByAggregateInput;
    _max?: Prisma.CommunityProposalMaxOrderByAggregateInput;
    _min?: Prisma.CommunityProposalMinOrderByAggregateInput;
};
export type CommunityProposalScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityProposalScalarWhereWithAggregatesInput | Prisma.CommunityProposalScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityProposalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityProposalScalarWhereWithAggregatesInput | Prisma.CommunityProposalScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityProposal"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"CommunityProposal"> | string;
    suggestedParentId?: Prisma.UuidNullableWithAggregatesFilter<"CommunityProposal"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"CommunityProposal"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CommunityProposal"> | string;
    initialTopics?: Prisma.StringWithAggregatesFilter<"CommunityProposal"> | string;
    status?: Prisma.EnumProposalStatusWithAggregatesFilter<"CommunityProposal"> | $Enums.ProposalStatus;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"CommunityProposal"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityProposal"> | Date | string;
};
export type CommunityProposalCreateInput = {
    id?: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutCommunityProposalsInput;
    suggestedParent?: Prisma.CommunityCreateNestedOneWithoutProposalsInput;
    supports?: Prisma.ProposalSupportCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalUncheckedCreateInput = {
    id?: string;
    authorId: string;
    suggestedParentId?: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supports?: Prisma.ProposalSupportUncheckedCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityProposalsNestedInput;
    suggestedParent?: Prisma.CommunityUpdateOneWithoutProposalsNestedInput;
    supports?: Prisma.ProposalSupportUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedParentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supports?: Prisma.ProposalSupportUncheckedUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalCreateManyInput = {
    id?: string;
    authorId: string;
    suggestedParentId?: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityProposalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityProposalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedParentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityProposalListRelationFilter = {
    every?: Prisma.CommunityProposalWhereInput;
    some?: Prisma.CommunityProposalWhereInput;
    none?: Prisma.CommunityProposalWhereInput;
};
export type CommunityProposalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityProposalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    suggestedParentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    initialTopics?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityProposalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    suggestedParentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    initialTopics?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityProposalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    suggestedParentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    initialTopics?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommunityProposalScalarRelationFilter = {
    is?: Prisma.CommunityProposalWhereInput;
    isNot?: Prisma.CommunityProposalWhereInput;
};
export type CommunityProposalCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput> | Prisma.CommunityProposalCreateWithoutAuthorInput[] | Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput | Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommunityProposalCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
};
export type CommunityProposalUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput> | Prisma.CommunityProposalCreateWithoutAuthorInput[] | Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput | Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommunityProposalCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
};
export type CommunityProposalUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput> | Prisma.CommunityProposalCreateWithoutAuthorInput[] | Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput | Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommunityProposalUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommunityProposalUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommunityProposalCreateManyAuthorInputEnvelope;
    set?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    delete?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    update?: Prisma.CommunityProposalUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommunityProposalUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommunityProposalUpdateManyWithWhereWithoutAuthorInput | Prisma.CommunityProposalUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
};
export type CommunityProposalUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput> | Prisma.CommunityProposalCreateWithoutAuthorInput[] | Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput | Prisma.CommunityProposalCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommunityProposalUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommunityProposalUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommunityProposalCreateManyAuthorInputEnvelope;
    set?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    delete?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    update?: Prisma.CommunityProposalUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommunityProposalUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommunityProposalUpdateManyWithWhereWithoutAuthorInput | Prisma.CommunityProposalUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
};
export type CommunityProposalCreateNestedManyWithoutSuggestedParentInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput> | Prisma.CommunityProposalCreateWithoutSuggestedParentInput[] | Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput | Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput[];
    createMany?: Prisma.CommunityProposalCreateManySuggestedParentInputEnvelope;
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
};
export type CommunityProposalUncheckedCreateNestedManyWithoutSuggestedParentInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput> | Prisma.CommunityProposalCreateWithoutSuggestedParentInput[] | Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput | Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput[];
    createMany?: Prisma.CommunityProposalCreateManySuggestedParentInputEnvelope;
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
};
export type CommunityProposalUpdateManyWithoutSuggestedParentNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput> | Prisma.CommunityProposalCreateWithoutSuggestedParentInput[] | Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput | Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput[];
    upsert?: Prisma.CommunityProposalUpsertWithWhereUniqueWithoutSuggestedParentInput | Prisma.CommunityProposalUpsertWithWhereUniqueWithoutSuggestedParentInput[];
    createMany?: Prisma.CommunityProposalCreateManySuggestedParentInputEnvelope;
    set?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    delete?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    update?: Prisma.CommunityProposalUpdateWithWhereUniqueWithoutSuggestedParentInput | Prisma.CommunityProposalUpdateWithWhereUniqueWithoutSuggestedParentInput[];
    updateMany?: Prisma.CommunityProposalUpdateManyWithWhereWithoutSuggestedParentInput | Prisma.CommunityProposalUpdateManyWithWhereWithoutSuggestedParentInput[];
    deleteMany?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
};
export type CommunityProposalUncheckedUpdateManyWithoutSuggestedParentNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput> | Prisma.CommunityProposalCreateWithoutSuggestedParentInput[] | Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput[];
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput | Prisma.CommunityProposalCreateOrConnectWithoutSuggestedParentInput[];
    upsert?: Prisma.CommunityProposalUpsertWithWhereUniqueWithoutSuggestedParentInput | Prisma.CommunityProposalUpsertWithWhereUniqueWithoutSuggestedParentInput[];
    createMany?: Prisma.CommunityProposalCreateManySuggestedParentInputEnvelope;
    set?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    disconnect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    delete?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    connect?: Prisma.CommunityProposalWhereUniqueInput | Prisma.CommunityProposalWhereUniqueInput[];
    update?: Prisma.CommunityProposalUpdateWithWhereUniqueWithoutSuggestedParentInput | Prisma.CommunityProposalUpdateWithWhereUniqueWithoutSuggestedParentInput[];
    updateMany?: Prisma.CommunityProposalUpdateManyWithWhereWithoutSuggestedParentInput | Prisma.CommunityProposalUpdateManyWithWhereWithoutSuggestedParentInput[];
    deleteMany?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
};
export type EnumProposalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProposalStatus;
};
export type CommunityProposalCreateNestedOneWithoutSupportsInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSupportsInput, Prisma.CommunityProposalUncheckedCreateWithoutSupportsInput>;
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSupportsInput;
    connect?: Prisma.CommunityProposalWhereUniqueInput;
};
export type CommunityProposalUpdateOneRequiredWithoutSupportsNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSupportsInput, Prisma.CommunityProposalUncheckedCreateWithoutSupportsInput>;
    connectOrCreate?: Prisma.CommunityProposalCreateOrConnectWithoutSupportsInput;
    upsert?: Prisma.CommunityProposalUpsertWithoutSupportsInput;
    connect?: Prisma.CommunityProposalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityProposalUpdateToOneWithWhereWithoutSupportsInput, Prisma.CommunityProposalUpdateWithoutSupportsInput>, Prisma.CommunityProposalUncheckedUpdateWithoutSupportsInput>;
};
export type CommunityProposalCreateWithoutAuthorInput = {
    id?: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    suggestedParent?: Prisma.CommunityCreateNestedOneWithoutProposalsInput;
    supports?: Prisma.ProposalSupportCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalUncheckedCreateWithoutAuthorInput = {
    id?: string;
    suggestedParentId?: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supports?: Prisma.ProposalSupportUncheckedCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalCreateOrConnectWithoutAuthorInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput>;
};
export type CommunityProposalCreateManyAuthorInputEnvelope = {
    data: Prisma.CommunityProposalCreateManyAuthorInput | Prisma.CommunityProposalCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type CommunityProposalUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutAuthorInput, Prisma.CommunityProposalUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutAuthorInput, Prisma.CommunityProposalUncheckedCreateWithoutAuthorInput>;
};
export type CommunityProposalUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutAuthorInput, Prisma.CommunityProposalUncheckedUpdateWithoutAuthorInput>;
};
export type CommunityProposalUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.CommunityProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateManyMutationInput, Prisma.CommunityProposalUncheckedUpdateManyWithoutAuthorInput>;
};
export type CommunityProposalScalarWhereInput = {
    AND?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
    OR?: Prisma.CommunityProposalScalarWhereInput[];
    NOT?: Prisma.CommunityProposalScalarWhereInput | Prisma.CommunityProposalScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityProposal"> | string;
    authorId?: Prisma.UuidFilter<"CommunityProposal"> | string;
    suggestedParentId?: Prisma.UuidNullableFilter<"CommunityProposal"> | string | null;
    name?: Prisma.StringFilter<"CommunityProposal"> | string;
    description?: Prisma.StringFilter<"CommunityProposal"> | string;
    initialTopics?: Prisma.StringFilter<"CommunityProposal"> | string;
    status?: Prisma.EnumProposalStatusFilter<"CommunityProposal"> | $Enums.ProposalStatus;
    resolutionNote?: Prisma.StringNullableFilter<"CommunityProposal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommunityProposal"> | Date | string;
};
export type CommunityProposalCreateWithoutSuggestedParentInput = {
    id?: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutCommunityProposalsInput;
    supports?: Prisma.ProposalSupportCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalUncheckedCreateWithoutSuggestedParentInput = {
    id?: string;
    authorId: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supports?: Prisma.ProposalSupportUncheckedCreateNestedManyWithoutProposalInput;
};
export type CommunityProposalCreateOrConnectWithoutSuggestedParentInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput>;
};
export type CommunityProposalCreateManySuggestedParentInputEnvelope = {
    data: Prisma.CommunityProposalCreateManySuggestedParentInput | Prisma.CommunityProposalCreateManySuggestedParentInput[];
    skipDuplicates?: boolean;
};
export type CommunityProposalUpsertWithWhereUniqueWithoutSuggestedParentInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedUpdateWithoutSuggestedParentInput>;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedCreateWithoutSuggestedParentInput>;
};
export type CommunityProposalUpdateWithWhereUniqueWithoutSuggestedParentInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutSuggestedParentInput, Prisma.CommunityProposalUncheckedUpdateWithoutSuggestedParentInput>;
};
export type CommunityProposalUpdateManyWithWhereWithoutSuggestedParentInput = {
    where: Prisma.CommunityProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateManyMutationInput, Prisma.CommunityProposalUncheckedUpdateManyWithoutSuggestedParentInput>;
};
export type CommunityProposalCreateWithoutSupportsInput = {
    id?: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutCommunityProposalsInput;
    suggestedParent?: Prisma.CommunityCreateNestedOneWithoutProposalsInput;
};
export type CommunityProposalUncheckedCreateWithoutSupportsInput = {
    id?: string;
    authorId: string;
    suggestedParentId?: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityProposalCreateOrConnectWithoutSupportsInput = {
    where: Prisma.CommunityProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSupportsInput, Prisma.CommunityProposalUncheckedCreateWithoutSupportsInput>;
};
export type CommunityProposalUpsertWithoutSupportsInput = {
    update: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutSupportsInput, Prisma.CommunityProposalUncheckedUpdateWithoutSupportsInput>;
    create: Prisma.XOR<Prisma.CommunityProposalCreateWithoutSupportsInput, Prisma.CommunityProposalUncheckedCreateWithoutSupportsInput>;
    where?: Prisma.CommunityProposalWhereInput;
};
export type CommunityProposalUpdateToOneWithWhereWithoutSupportsInput = {
    where?: Prisma.CommunityProposalWhereInput;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateWithoutSupportsInput, Prisma.CommunityProposalUncheckedUpdateWithoutSupportsInput>;
};
export type CommunityProposalUpdateWithoutSupportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityProposalsNestedInput;
    suggestedParent?: Prisma.CommunityUpdateOneWithoutProposalsNestedInput;
};
export type CommunityProposalUncheckedUpdateWithoutSupportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedParentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityProposalCreateManyAuthorInput = {
    id?: string;
    suggestedParentId?: string | null;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityProposalUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    suggestedParent?: Prisma.CommunityUpdateOneWithoutProposalsNestedInput;
    supports?: Prisma.ProposalSupportUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedParentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supports?: Prisma.ProposalSupportUncheckedUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedParentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityProposalCreateManySuggestedParentInput = {
    id?: string;
    authorId: string;
    name: string;
    description: string;
    initialTopics: string;
    status?: $Enums.ProposalStatus;
    resolutionNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommunityProposalUpdateWithoutSuggestedParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityProposalsNestedInput;
    supports?: Prisma.ProposalSupportUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalUncheckedUpdateWithoutSuggestedParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supports?: Prisma.ProposalSupportUncheckedUpdateManyWithoutProposalNestedInput;
};
export type CommunityProposalUncheckedUpdateManyWithoutSuggestedParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    initialTopics?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityProposalCountOutputType = {
    supports: number;
};
export type CommunityProposalCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    supports?: boolean | CommunityProposalCountOutputTypeCountSupportsArgs;
};
export type CommunityProposalCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalCountOutputTypeSelect<ExtArgs> | null;
};
export type CommunityProposalCountOutputTypeCountSupportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProposalSupportWhereInput;
};
export type CommunityProposalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    suggestedParentId?: boolean;
    name?: boolean;
    description?: boolean;
    initialTopics?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
    supports?: boolean | Prisma.CommunityProposal$supportsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityProposalCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityProposal"]>;
export type CommunityProposalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    suggestedParentId?: boolean;
    name?: boolean;
    description?: boolean;
    initialTopics?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
}, ExtArgs["result"]["communityProposal"]>;
export type CommunityProposalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    suggestedParentId?: boolean;
    name?: boolean;
    description?: boolean;
    initialTopics?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
}, ExtArgs["result"]["communityProposal"]>;
export type CommunityProposalSelectScalar = {
    id?: boolean;
    authorId?: boolean;
    suggestedParentId?: boolean;
    name?: boolean;
    description?: boolean;
    initialTopics?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommunityProposalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "authorId" | "suggestedParentId" | "name" | "description" | "initialTopics" | "status" | "resolutionNote" | "createdAt" | "updatedAt", ExtArgs["result"]["communityProposal"]>;
export type CommunityProposalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
    supports?: boolean | Prisma.CommunityProposal$supportsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityProposalCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommunityProposalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
};
export type CommunityProposalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    suggestedParent?: boolean | Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>;
};
export type $CommunityProposalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityProposal";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
        suggestedParent: Prisma.$CommunityPayload<ExtArgs> | null;
        supports: Prisma.$ProposalSupportPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        authorId: string;
        suggestedParentId: string | null;
        name: string;
        description: string;
        initialTopics: string;
        status: $Enums.ProposalStatus;
        resolutionNote: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["communityProposal"]>;
    composites: {};
};
export type CommunityProposalGetPayload<S extends boolean | null | undefined | CommunityProposalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload, S>;
export type CommunityProposalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityProposalCountAggregateInputType | true;
};
export interface CommunityProposalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityProposal'];
        meta: {
            name: 'CommunityProposal';
        };
    };
    findUnique<T extends CommunityProposalFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityProposalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityProposalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityProposalFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityProposalFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityProposalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityProposalFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityProposalCreateArgs>(args: Prisma.SelectSubset<T, CommunityProposalCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityProposalCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityProposalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityProposalDeleteArgs>(args: Prisma.SelectSubset<T, CommunityProposalDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityProposalUpdateArgs>(args: Prisma.SelectSubset<T, CommunityProposalUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityProposalDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityProposalUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityProposalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityProposalUpsertArgs>(args: Prisma.SelectSubset<T, CommunityProposalUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityProposalCountArgs>(args?: Prisma.Subset<T, CommunityProposalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityProposalCountAggregateOutputType> : number>;
    aggregate<T extends CommunityProposalAggregateArgs>(args: Prisma.Subset<T, CommunityProposalAggregateArgs>): Prisma.PrismaPromise<GetCommunityProposalAggregateType<T>>;
    groupBy<T extends CommunityProposalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityProposalGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityProposalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityProposalFieldRefs;
}
export interface Prisma__CommunityProposalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    suggestedParent<T extends Prisma.CommunityProposal$suggestedParentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityProposal$suggestedParentArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    supports<T extends Prisma.CommunityProposal$supportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityProposal$supportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityProposalFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly authorId: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly suggestedParentId: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly name: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly description: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly initialTopics: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly status: Prisma.FieldRef<"CommunityProposal", 'ProposalStatus'>;
    readonly resolutionNote: Prisma.FieldRef<"CommunityProposal", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CommunityProposal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommunityProposal", 'DateTime'>;
}
export type CommunityProposalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityProposalWhereUniqueInput;
};
export type CommunityProposalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityProposalWhereUniqueInput;
};
export type CommunityProposalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityProposalWhereInput;
    orderBy?: Prisma.CommunityProposalOrderByWithRelationInput | Prisma.CommunityProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityProposalScalarFieldEnum | Prisma.CommunityProposalScalarFieldEnum[];
};
export type CommunityProposalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityProposalWhereInput;
    orderBy?: Prisma.CommunityProposalOrderByWithRelationInput | Prisma.CommunityProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityProposalScalarFieldEnum | Prisma.CommunityProposalScalarFieldEnum[];
};
export type CommunityProposalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where?: Prisma.CommunityProposalWhereInput;
    orderBy?: Prisma.CommunityProposalOrderByWithRelationInput | Prisma.CommunityProposalOrderByWithRelationInput[];
    cursor?: Prisma.CommunityProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityProposalScalarFieldEnum | Prisma.CommunityProposalScalarFieldEnum[];
};
export type CommunityProposalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityProposalCreateInput, Prisma.CommunityProposalUncheckedCreateInput>;
};
export type CommunityProposalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityProposalCreateManyInput | Prisma.CommunityProposalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityProposalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    data: Prisma.CommunityProposalCreateManyInput | Prisma.CommunityProposalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityProposalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityProposalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateInput, Prisma.CommunityProposalUncheckedUpdateInput>;
    where: Prisma.CommunityProposalWhereUniqueInput;
};
export type CommunityProposalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityProposalUpdateManyMutationInput, Prisma.CommunityProposalUncheckedUpdateManyInput>;
    where?: Prisma.CommunityProposalWhereInput;
    limit?: number;
};
export type CommunityProposalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityProposalUpdateManyMutationInput, Prisma.CommunityProposalUncheckedUpdateManyInput>;
    where?: Prisma.CommunityProposalWhereInput;
    limit?: number;
    include?: Prisma.CommunityProposalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityProposalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityProposalCreateInput, Prisma.CommunityProposalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityProposalUpdateInput, Prisma.CommunityProposalUncheckedUpdateInput>;
};
export type CommunityProposalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
    where: Prisma.CommunityProposalWhereUniqueInput;
};
export type CommunityProposalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityProposalWhereInput;
    limit?: number;
};
export type CommunityProposal$suggestedParentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunitySelect<ExtArgs> | null;
    omit?: Prisma.CommunityOmit<ExtArgs> | null;
    include?: Prisma.CommunityInclude<ExtArgs> | null;
    where?: Prisma.CommunityWhereInput;
};
export type CommunityProposal$supportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    where?: Prisma.ProposalSupportWhereInput;
    orderBy?: Prisma.ProposalSupportOrderByWithRelationInput | Prisma.ProposalSupportOrderByWithRelationInput[];
    cursor?: Prisma.ProposalSupportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProposalSupportScalarFieldEnum | Prisma.ProposalSupportScalarFieldEnum[];
};
export type CommunityProposalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityProposalSelect<ExtArgs> | null;
    omit?: Prisma.CommunityProposalOmit<ExtArgs> | null;
    include?: Prisma.CommunityProposalInclude<ExtArgs> | null;
};
export {};
