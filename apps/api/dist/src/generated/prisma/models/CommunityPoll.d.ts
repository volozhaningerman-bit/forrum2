import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityPollModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityPollPayload>;
export type AggregateCommunityPoll = {
    _count: CommunityPollCountAggregateOutputType | null;
    _avg: CommunityPollAvgAggregateOutputType | null;
    _sum: CommunityPollSumAggregateOutputType | null;
    _min: CommunityPollMinAggregateOutputType | null;
    _max: CommunityPollMaxAggregateOutputType | null;
};
export type CommunityPollAvgAggregateOutputType = {
    quorum: number | null;
    minAccountAgeDays: number | null;
};
export type CommunityPollSumAggregateOutputType = {
    quorum: number | null;
    minAccountAgeDays: number | null;
};
export type CommunityPollMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    createdById: string | null;
    title: string | null;
    description: string | null;
    kind: $Enums.PollKind | null;
    status: $Enums.PollStatus | null;
    quorum: number | null;
    minAccountAgeDays: number | null;
    requireSubscription: boolean | null;
    allowAdvisory: boolean | null;
    resultNote: string | null;
    resultPublishedAt: Date | null;
    closesAt: Date | null;
    createdAt: Date | null;
};
export type CommunityPollMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    createdById: string | null;
    title: string | null;
    description: string | null;
    kind: $Enums.PollKind | null;
    status: $Enums.PollStatus | null;
    quorum: number | null;
    minAccountAgeDays: number | null;
    requireSubscription: boolean | null;
    allowAdvisory: boolean | null;
    resultNote: string | null;
    resultPublishedAt: Date | null;
    closesAt: Date | null;
    createdAt: Date | null;
};
export type CommunityPollCountAggregateOutputType = {
    id: number;
    communityId: number;
    createdById: number;
    title: number;
    description: number;
    kind: number;
    status: number;
    quorum: number;
    minAccountAgeDays: number;
    requireSubscription: number;
    allowAdvisory: number;
    resultNote: number;
    resultPublishedAt: number;
    closesAt: number;
    createdAt: number;
    _all: number;
};
export type CommunityPollAvgAggregateInputType = {
    quorum?: true;
    minAccountAgeDays?: true;
};
export type CommunityPollSumAggregateInputType = {
    quorum?: true;
    minAccountAgeDays?: true;
};
export type CommunityPollMinAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    kind?: true;
    status?: true;
    quorum?: true;
    minAccountAgeDays?: true;
    requireSubscription?: true;
    allowAdvisory?: true;
    resultNote?: true;
    resultPublishedAt?: true;
    closesAt?: true;
    createdAt?: true;
};
export type CommunityPollMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    kind?: true;
    status?: true;
    quorum?: true;
    minAccountAgeDays?: true;
    requireSubscription?: true;
    allowAdvisory?: true;
    resultNote?: true;
    resultPublishedAt?: true;
    closesAt?: true;
    createdAt?: true;
};
export type CommunityPollCountAggregateInputType = {
    id?: true;
    communityId?: true;
    createdById?: true;
    title?: true;
    description?: true;
    kind?: true;
    status?: true;
    quorum?: true;
    minAccountAgeDays?: true;
    requireSubscription?: true;
    allowAdvisory?: true;
    resultNote?: true;
    resultPublishedAt?: true;
    closesAt?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunityPollAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityPollWhereInput;
    orderBy?: Prisma.CommunityPollOrderByWithRelationInput | Prisma.CommunityPollOrderByWithRelationInput[];
    cursor?: Prisma.CommunityPollWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityPollCountAggregateInputType;
    _avg?: CommunityPollAvgAggregateInputType;
    _sum?: CommunityPollSumAggregateInputType;
    _min?: CommunityPollMinAggregateInputType;
    _max?: CommunityPollMaxAggregateInputType;
};
export type GetCommunityPollAggregateType<T extends CommunityPollAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityPoll]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityPoll[P]> : Prisma.GetScalarType<T[P], AggregateCommunityPoll[P]>;
};
export type CommunityPollGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityPollWhereInput;
    orderBy?: Prisma.CommunityPollOrderByWithAggregationInput | Prisma.CommunityPollOrderByWithAggregationInput[];
    by: Prisma.CommunityPollScalarFieldEnum[] | Prisma.CommunityPollScalarFieldEnum;
    having?: Prisma.CommunityPollScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityPollCountAggregateInputType | true;
    _avg?: CommunityPollAvgAggregateInputType;
    _sum?: CommunityPollSumAggregateInputType;
    _min?: CommunityPollMinAggregateInputType;
    _max?: CommunityPollMaxAggregateInputType;
};
export type CommunityPollGroupByOutputType = {
    id: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    kind: $Enums.PollKind;
    status: $Enums.PollStatus;
    quorum: number | null;
    minAccountAgeDays: number;
    requireSubscription: boolean;
    allowAdvisory: boolean;
    resultNote: string | null;
    resultPublishedAt: Date | null;
    closesAt: Date;
    createdAt: Date;
    _count: CommunityPollCountAggregateOutputType | null;
    _avg: CommunityPollAvgAggregateOutputType | null;
    _sum: CommunityPollSumAggregateOutputType | null;
    _min: CommunityPollMinAggregateOutputType | null;
    _max: CommunityPollMaxAggregateOutputType | null;
};
type GetCommunityPollGroupByPayload<T extends CommunityPollGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityPollGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityPollGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityPollGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityPollGroupByOutputType[P]>;
}>>;
export type CommunityPollWhereInput = {
    AND?: Prisma.CommunityPollWhereInput | Prisma.CommunityPollWhereInput[];
    OR?: Prisma.CommunityPollWhereInput[];
    NOT?: Prisma.CommunityPollWhereInput | Prisma.CommunityPollWhereInput[];
    id?: Prisma.UuidFilter<"CommunityPoll"> | string;
    communityId?: Prisma.UuidFilter<"CommunityPoll"> | string;
    createdById?: Prisma.UuidFilter<"CommunityPoll"> | string;
    title?: Prisma.StringFilter<"CommunityPoll"> | string;
    description?: Prisma.StringFilter<"CommunityPoll"> | string;
    kind?: Prisma.EnumPollKindFilter<"CommunityPoll"> | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFilter<"CommunityPoll"> | $Enums.PollStatus;
    quorum?: Prisma.IntNullableFilter<"CommunityPoll"> | number | null;
    minAccountAgeDays?: Prisma.IntFilter<"CommunityPoll"> | number;
    requireSubscription?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    allowAdvisory?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    resultNote?: Prisma.StringNullableFilter<"CommunityPoll"> | string | null;
    resultPublishedAt?: Prisma.DateTimeNullableFilter<"CommunityPoll"> | Date | string | null;
    closesAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    options?: Prisma.PollOptionListRelationFilter;
    votes?: Prisma.PollVoteListRelationFilter;
};
export type CommunityPollOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    quorum?: Prisma.SortOrderInput | Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
    requireSubscription?: Prisma.SortOrder;
    allowAdvisory?: Prisma.SortOrder;
    resultNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resultPublishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closesAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    options?: Prisma.PollOptionOrderByRelationAggregateInput;
    votes?: Prisma.PollVoteOrderByRelationAggregateInput;
};
export type CommunityPollWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityPollWhereInput | Prisma.CommunityPollWhereInput[];
    OR?: Prisma.CommunityPollWhereInput[];
    NOT?: Prisma.CommunityPollWhereInput | Prisma.CommunityPollWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityPoll"> | string;
    createdById?: Prisma.UuidFilter<"CommunityPoll"> | string;
    title?: Prisma.StringFilter<"CommunityPoll"> | string;
    description?: Prisma.StringFilter<"CommunityPoll"> | string;
    kind?: Prisma.EnumPollKindFilter<"CommunityPoll"> | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFilter<"CommunityPoll"> | $Enums.PollStatus;
    quorum?: Prisma.IntNullableFilter<"CommunityPoll"> | number | null;
    minAccountAgeDays?: Prisma.IntFilter<"CommunityPoll"> | number;
    requireSubscription?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    allowAdvisory?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    resultNote?: Prisma.StringNullableFilter<"CommunityPoll"> | string | null;
    resultPublishedAt?: Prisma.DateTimeNullableFilter<"CommunityPoll"> | Date | string | null;
    closesAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    options?: Prisma.PollOptionListRelationFilter;
    votes?: Prisma.PollVoteListRelationFilter;
}, "id">;
export type CommunityPollOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    quorum?: Prisma.SortOrderInput | Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
    requireSubscription?: Prisma.SortOrder;
    allowAdvisory?: Prisma.SortOrder;
    resultNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resultPublishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closesAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityPollCountOrderByAggregateInput;
    _avg?: Prisma.CommunityPollAvgOrderByAggregateInput;
    _max?: Prisma.CommunityPollMaxOrderByAggregateInput;
    _min?: Prisma.CommunityPollMinOrderByAggregateInput;
    _sum?: Prisma.CommunityPollSumOrderByAggregateInput;
};
export type CommunityPollScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityPollScalarWhereWithAggregatesInput | Prisma.CommunityPollScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityPollScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityPollScalarWhereWithAggregatesInput | Prisma.CommunityPollScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityPoll"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityPoll"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"CommunityPoll"> | string;
    title?: Prisma.StringWithAggregatesFilter<"CommunityPoll"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CommunityPoll"> | string;
    kind?: Prisma.EnumPollKindWithAggregatesFilter<"CommunityPoll"> | $Enums.PollKind;
    status?: Prisma.EnumPollStatusWithAggregatesFilter<"CommunityPoll"> | $Enums.PollStatus;
    quorum?: Prisma.IntNullableWithAggregatesFilter<"CommunityPoll"> | number | null;
    minAccountAgeDays?: Prisma.IntWithAggregatesFilter<"CommunityPoll"> | number;
    requireSubscription?: Prisma.BoolWithAggregatesFilter<"CommunityPoll"> | boolean;
    allowAdvisory?: Prisma.BoolWithAggregatesFilter<"CommunityPoll"> | boolean;
    resultNote?: Prisma.StringNullableWithAggregatesFilter<"CommunityPoll"> | string | null;
    resultPublishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommunityPoll"> | Date | string | null;
    closesAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityPoll"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityPoll"> | Date | string;
};
export type CommunityPollCreateInput = {
    id?: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutPollsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutPollsCreatedInput;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteCreateNestedManyWithoutPollInput;
};
export type CommunityPollUncheckedCreateInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutPollInput;
};
export type CommunityPollUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPollsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutPollsCreatedNestedInput;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutPollNestedInput;
};
export type CommunityPollCreateManyInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
};
export type CommunityPollUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityPollUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityPollListRelationFilter = {
    every?: Prisma.CommunityPollWhereInput;
    some?: Prisma.CommunityPollWhereInput;
    none?: Prisma.CommunityPollWhereInput;
};
export type CommunityPollOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityPollCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    quorum?: Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
    requireSubscription?: Prisma.SortOrder;
    allowAdvisory?: Prisma.SortOrder;
    resultNote?: Prisma.SortOrder;
    resultPublishedAt?: Prisma.SortOrder;
    closesAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityPollAvgOrderByAggregateInput = {
    quorum?: Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
};
export type CommunityPollMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    quorum?: Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
    requireSubscription?: Prisma.SortOrder;
    allowAdvisory?: Prisma.SortOrder;
    resultNote?: Prisma.SortOrder;
    resultPublishedAt?: Prisma.SortOrder;
    closesAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityPollMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    quorum?: Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
    requireSubscription?: Prisma.SortOrder;
    allowAdvisory?: Prisma.SortOrder;
    resultNote?: Prisma.SortOrder;
    resultPublishedAt?: Prisma.SortOrder;
    closesAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityPollSumOrderByAggregateInput = {
    quorum?: Prisma.SortOrder;
    minAccountAgeDays?: Prisma.SortOrder;
};
export type CommunityPollScalarRelationFilter = {
    is?: Prisma.CommunityPollWhereInput;
    isNot?: Prisma.CommunityPollWhereInput;
};
export type CommunityPollCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityPollCreateWithoutCreatedByInput[] | Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput | Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityPollCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
};
export type CommunityPollUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityPollCreateWithoutCreatedByInput[] | Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput | Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.CommunityPollCreateManyCreatedByInputEnvelope;
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
};
export type CommunityPollUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityPollCreateWithoutCreatedByInput[] | Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput | Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityPollUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityPollUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityPollCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    disconnect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    delete?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    update?: Prisma.CommunityPollUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityPollUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityPollUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityPollUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
};
export type CommunityPollUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput> | Prisma.CommunityPollCreateWithoutCreatedByInput[] | Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput | Prisma.CommunityPollCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.CommunityPollUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityPollUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.CommunityPollCreateManyCreatedByInputEnvelope;
    set?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    disconnect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    delete?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    update?: Prisma.CommunityPollUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.CommunityPollUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.CommunityPollUpdateManyWithWhereWithoutCreatedByInput | Prisma.CommunityPollUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
};
export type CommunityPollCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput> | Prisma.CommunityPollCreateWithoutCommunityInput[] | Prisma.CommunityPollUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCommunityInput | Prisma.CommunityPollCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityPollCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
};
export type CommunityPollUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput> | Prisma.CommunityPollCreateWithoutCommunityInput[] | Prisma.CommunityPollUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCommunityInput | Prisma.CommunityPollCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityPollCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
};
export type CommunityPollUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput> | Prisma.CommunityPollCreateWithoutCommunityInput[] | Prisma.CommunityPollUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCommunityInput | Prisma.CommunityPollCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityPollUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityPollUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityPollCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    disconnect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    delete?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    update?: Prisma.CommunityPollUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityPollUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityPollUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityPollUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
};
export type CommunityPollUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput> | Prisma.CommunityPollCreateWithoutCommunityInput[] | Prisma.CommunityPollUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutCommunityInput | Prisma.CommunityPollCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityPollUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityPollUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityPollCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    disconnect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    delete?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    connect?: Prisma.CommunityPollWhereUniqueInput | Prisma.CommunityPollWhereUniqueInput[];
    update?: Prisma.CommunityPollUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityPollUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityPollUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityPollUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
};
export type EnumPollKindFieldUpdateOperationsInput = {
    set?: $Enums.PollKind;
};
export type EnumPollStatusFieldUpdateOperationsInput = {
    set?: $Enums.PollStatus;
};
export type CommunityPollCreateNestedOneWithoutOptionsInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutOptionsInput, Prisma.CommunityPollUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutOptionsInput;
    connect?: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutOptionsInput, Prisma.CommunityPollUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutOptionsInput;
    upsert?: Prisma.CommunityPollUpsertWithoutOptionsInput;
    connect?: Prisma.CommunityPollWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityPollUpdateToOneWithWhereWithoutOptionsInput, Prisma.CommunityPollUpdateWithoutOptionsInput>, Prisma.CommunityPollUncheckedUpdateWithoutOptionsInput>;
};
export type CommunityPollCreateNestedOneWithoutVotesInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutVotesInput, Prisma.CommunityPollUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutVotesInput;
    connect?: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollUpdateOneRequiredWithoutVotesNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityPollCreateWithoutVotesInput, Prisma.CommunityPollUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.CommunityPollCreateOrConnectWithoutVotesInput;
    upsert?: Prisma.CommunityPollUpsertWithoutVotesInput;
    connect?: Prisma.CommunityPollWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityPollUpdateToOneWithWhereWithoutVotesInput, Prisma.CommunityPollUpdateWithoutVotesInput>, Prisma.CommunityPollUncheckedUpdateWithoutVotesInput>;
};
export type CommunityPollCreateWithoutCreatedByInput = {
    id?: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutPollsInput;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteCreateNestedManyWithoutPollInput;
};
export type CommunityPollUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    communityId: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutPollInput;
};
export type CommunityPollCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityPollCreateManyCreatedByInputEnvelope = {
    data: Prisma.CommunityPollCreateManyCreatedByInput | Prisma.CommunityPollCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type CommunityPollUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityPollUpdateWithoutCreatedByInput, Prisma.CommunityPollUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutCreatedByInput, Prisma.CommunityPollUncheckedCreateWithoutCreatedByInput>;
};
export type CommunityPollUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateWithoutCreatedByInput, Prisma.CommunityPollUncheckedUpdateWithoutCreatedByInput>;
};
export type CommunityPollUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.CommunityPollScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateManyMutationInput, Prisma.CommunityPollUncheckedUpdateManyWithoutCreatedByInput>;
};
export type CommunityPollScalarWhereInput = {
    AND?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
    OR?: Prisma.CommunityPollScalarWhereInput[];
    NOT?: Prisma.CommunityPollScalarWhereInput | Prisma.CommunityPollScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityPoll"> | string;
    communityId?: Prisma.UuidFilter<"CommunityPoll"> | string;
    createdById?: Prisma.UuidFilter<"CommunityPoll"> | string;
    title?: Prisma.StringFilter<"CommunityPoll"> | string;
    description?: Prisma.StringFilter<"CommunityPoll"> | string;
    kind?: Prisma.EnumPollKindFilter<"CommunityPoll"> | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFilter<"CommunityPoll"> | $Enums.PollStatus;
    quorum?: Prisma.IntNullableFilter<"CommunityPoll"> | number | null;
    minAccountAgeDays?: Prisma.IntFilter<"CommunityPoll"> | number;
    requireSubscription?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    allowAdvisory?: Prisma.BoolFilter<"CommunityPoll"> | boolean;
    resultNote?: Prisma.StringNullableFilter<"CommunityPoll"> | string | null;
    resultPublishedAt?: Prisma.DateTimeNullableFilter<"CommunityPoll"> | Date | string | null;
    closesAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"CommunityPoll"> | Date | string;
};
export type CommunityPollCreateWithoutCommunityInput = {
    id?: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutPollsCreatedInput;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteCreateNestedManyWithoutPollInput;
};
export type CommunityPollUncheckedCreateWithoutCommunityInput = {
    id?: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutPollInput;
};
export type CommunityPollCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput>;
};
export type CommunityPollCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityPollCreateManyCommunityInput | Prisma.CommunityPollCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityPollUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityPollUpdateWithoutCommunityInput, Prisma.CommunityPollUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutCommunityInput, Prisma.CommunityPollUncheckedCreateWithoutCommunityInput>;
};
export type CommunityPollUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateWithoutCommunityInput, Prisma.CommunityPollUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityPollUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityPollScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateManyMutationInput, Prisma.CommunityPollUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityPollCreateWithoutOptionsInput = {
    id?: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutPollsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutPollsCreatedInput;
    votes?: Prisma.PollVoteCreateNestedManyWithoutPollInput;
};
export type CommunityPollUncheckedCreateWithoutOptionsInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutPollInput;
};
export type CommunityPollCreateOrConnectWithoutOptionsInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutOptionsInput, Prisma.CommunityPollUncheckedCreateWithoutOptionsInput>;
};
export type CommunityPollUpsertWithoutOptionsInput = {
    update: Prisma.XOR<Prisma.CommunityPollUpdateWithoutOptionsInput, Prisma.CommunityPollUncheckedUpdateWithoutOptionsInput>;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutOptionsInput, Prisma.CommunityPollUncheckedCreateWithoutOptionsInput>;
    where?: Prisma.CommunityPollWhereInput;
};
export type CommunityPollUpdateToOneWithWhereWithoutOptionsInput = {
    where?: Prisma.CommunityPollWhereInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateWithoutOptionsInput, Prisma.CommunityPollUncheckedUpdateWithoutOptionsInput>;
};
export type CommunityPollUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPollsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutPollsCreatedNestedInput;
    votes?: Prisma.PollVoteUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutPollNestedInput;
};
export type CommunityPollCreateWithoutVotesInput = {
    id?: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutPollsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutPollsCreatedInput;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
};
export type CommunityPollUncheckedCreateWithoutVotesInput = {
    id?: string;
    communityId: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
};
export type CommunityPollCreateOrConnectWithoutVotesInput = {
    where: Prisma.CommunityPollWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutVotesInput, Prisma.CommunityPollUncheckedCreateWithoutVotesInput>;
};
export type CommunityPollUpsertWithoutVotesInput = {
    update: Prisma.XOR<Prisma.CommunityPollUpdateWithoutVotesInput, Prisma.CommunityPollUncheckedUpdateWithoutVotesInput>;
    create: Prisma.XOR<Prisma.CommunityPollCreateWithoutVotesInput, Prisma.CommunityPollUncheckedCreateWithoutVotesInput>;
    where?: Prisma.CommunityPollWhereInput;
};
export type CommunityPollUpdateToOneWithWhereWithoutVotesInput = {
    where?: Prisma.CommunityPollWhereInput;
    data: Prisma.XOR<Prisma.CommunityPollUpdateWithoutVotesInput, Prisma.CommunityPollUncheckedUpdateWithoutVotesInput>;
};
export type CommunityPollUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPollsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutPollsCreatedNestedInput;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
};
export type CommunityPollCreateManyCreatedByInput = {
    id?: string;
    communityId: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
};
export type CommunityPollUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutPollsNestedInput;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityPollCreateManyCommunityInput = {
    id?: string;
    createdById: string;
    title: string;
    description: string;
    kind?: $Enums.PollKind;
    status?: $Enums.PollStatus;
    quorum?: number | null;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: string | null;
    resultPublishedAt?: Date | string | null;
    closesAt: Date | string;
    createdAt?: Date | string;
};
export type CommunityPollUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutPollsCreatedNestedInput;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutPollNestedInput;
};
export type CommunityPollUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumPollKindFieldUpdateOperationsInput | $Enums.PollKind;
    status?: Prisma.EnumPollStatusFieldUpdateOperationsInput | $Enums.PollStatus;
    quorum?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    minAccountAgeDays?: Prisma.IntFieldUpdateOperationsInput | number;
    requireSubscription?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowAdvisory?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    resultNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resultPublishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closesAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityPollCountOutputType = {
    options: number;
    votes: number;
};
export type CommunityPollCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | CommunityPollCountOutputTypeCountOptionsArgs;
    votes?: boolean | CommunityPollCountOutputTypeCountVotesArgs;
};
export type CommunityPollCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollCountOutputTypeSelect<ExtArgs> | null;
};
export type CommunityPollCountOutputTypeCountOptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollOptionWhereInput;
};
export type CommunityPollCountOutputTypeCountVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollVoteWhereInput;
};
export type CommunityPollSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    kind?: boolean;
    status?: boolean;
    quorum?: boolean;
    minAccountAgeDays?: boolean;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: boolean;
    resultPublishedAt?: boolean;
    closesAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.CommunityPoll$optionsArgs<ExtArgs>;
    votes?: boolean | Prisma.CommunityPoll$votesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityPollCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityPoll"]>;
export type CommunityPollSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    kind?: boolean;
    status?: boolean;
    quorum?: boolean;
    minAccountAgeDays?: boolean;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: boolean;
    resultPublishedAt?: boolean;
    closesAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityPoll"]>;
export type CommunityPollSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    kind?: boolean;
    status?: boolean;
    quorum?: boolean;
    minAccountAgeDays?: boolean;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: boolean;
    resultPublishedAt?: boolean;
    closesAt?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityPoll"]>;
export type CommunityPollSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    createdById?: boolean;
    title?: boolean;
    description?: boolean;
    kind?: boolean;
    status?: boolean;
    quorum?: boolean;
    minAccountAgeDays?: boolean;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
    resultNote?: boolean;
    resultPublishedAt?: boolean;
    closesAt?: boolean;
    createdAt?: boolean;
};
export type CommunityPollOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "createdById" | "title" | "description" | "kind" | "status" | "quorum" | "minAccountAgeDays" | "requireSubscription" | "allowAdvisory" | "resultNote" | "resultPublishedAt" | "closesAt" | "createdAt", ExtArgs["result"]["communityPoll"]>;
export type CommunityPollInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.CommunityPoll$optionsArgs<ExtArgs>;
    votes?: boolean | Prisma.CommunityPoll$votesArgs<ExtArgs>;
    _count?: boolean | Prisma.CommunityPollCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommunityPollIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityPollIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommunityPollPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityPoll";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        options: Prisma.$PollOptionPayload<ExtArgs>[];
        votes: Prisma.$PollVotePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        createdById: string;
        title: string;
        description: string;
        kind: $Enums.PollKind;
        status: $Enums.PollStatus;
        quorum: number | null;
        minAccountAgeDays: number;
        requireSubscription: boolean;
        allowAdvisory: boolean;
        resultNote: string | null;
        resultPublishedAt: Date | null;
        closesAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["communityPoll"]>;
    composites: {};
};
export type CommunityPollGetPayload<S extends boolean | null | undefined | CommunityPollDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload, S>;
export type CommunityPollCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityPollFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityPollCountAggregateInputType | true;
};
export interface CommunityPollDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityPoll'];
        meta: {
            name: 'CommunityPoll';
        };
    };
    findUnique<T extends CommunityPollFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityPollFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityPollFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityPollFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityPollFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityPollFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityPollFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityPollFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityPollFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityPollFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityPollCreateArgs>(args: Prisma.SelectSubset<T, CommunityPollCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityPollCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityPollCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityPollCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityPollCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityPollDeleteArgs>(args: Prisma.SelectSubset<T, CommunityPollDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityPollUpdateArgs>(args: Prisma.SelectSubset<T, CommunityPollUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityPollDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityPollDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityPollUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityPollUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityPollUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityPollUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityPollUpsertArgs>(args: Prisma.SelectSubset<T, CommunityPollUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityPollClient<runtime.Types.Result.GetResult<Prisma.$CommunityPollPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityPollCountArgs>(args?: Prisma.Subset<T, CommunityPollCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityPollCountAggregateOutputType> : number>;
    aggregate<T extends CommunityPollAggregateArgs>(args: Prisma.Subset<T, CommunityPollAggregateArgs>): Prisma.PrismaPromise<GetCommunityPollAggregateType<T>>;
    groupBy<T extends CommunityPollGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityPollGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityPollGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityPollGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityPollGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityPollFieldRefs;
}
export interface Prisma__CommunityPollClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    options<T extends Prisma.CommunityPoll$optionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityPoll$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    votes<T extends Prisma.CommunityPoll$votesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityPoll$votesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityPollFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly createdById: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly title: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly description: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly kind: Prisma.FieldRef<"CommunityPoll", 'PollKind'>;
    readonly status: Prisma.FieldRef<"CommunityPoll", 'PollStatus'>;
    readonly quorum: Prisma.FieldRef<"CommunityPoll", 'Int'>;
    readonly minAccountAgeDays: Prisma.FieldRef<"CommunityPoll", 'Int'>;
    readonly requireSubscription: Prisma.FieldRef<"CommunityPoll", 'Boolean'>;
    readonly allowAdvisory: Prisma.FieldRef<"CommunityPoll", 'Boolean'>;
    readonly resultNote: Prisma.FieldRef<"CommunityPoll", 'String'>;
    readonly resultPublishedAt: Prisma.FieldRef<"CommunityPoll", 'DateTime'>;
    readonly closesAt: Prisma.FieldRef<"CommunityPoll", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CommunityPoll", 'DateTime'>;
}
export type CommunityPollFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where?: Prisma.CommunityPollWhereInput;
    orderBy?: Prisma.CommunityPollOrderByWithRelationInput | Prisma.CommunityPollOrderByWithRelationInput[];
    cursor?: Prisma.CommunityPollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityPollScalarFieldEnum | Prisma.CommunityPollScalarFieldEnum[];
};
export type CommunityPollFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where?: Prisma.CommunityPollWhereInput;
    orderBy?: Prisma.CommunityPollOrderByWithRelationInput | Prisma.CommunityPollOrderByWithRelationInput[];
    cursor?: Prisma.CommunityPollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityPollScalarFieldEnum | Prisma.CommunityPollScalarFieldEnum[];
};
export type CommunityPollFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where?: Prisma.CommunityPollWhereInput;
    orderBy?: Prisma.CommunityPollOrderByWithRelationInput | Prisma.CommunityPollOrderByWithRelationInput[];
    cursor?: Prisma.CommunityPollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityPollScalarFieldEnum | Prisma.CommunityPollScalarFieldEnum[];
};
export type CommunityPollCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityPollCreateInput, Prisma.CommunityPollUncheckedCreateInput>;
};
export type CommunityPollCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityPollCreateManyInput | Prisma.CommunityPollCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityPollCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    data: Prisma.CommunityPollCreateManyInput | Prisma.CommunityPollCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityPollIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityPollUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityPollUpdateInput, Prisma.CommunityPollUncheckedUpdateInput>;
    where: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityPollUpdateManyMutationInput, Prisma.CommunityPollUncheckedUpdateManyInput>;
    where?: Prisma.CommunityPollWhereInput;
    limit?: number;
};
export type CommunityPollUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityPollUpdateManyMutationInput, Prisma.CommunityPollUncheckedUpdateManyInput>;
    where?: Prisma.CommunityPollWhereInput;
    limit?: number;
    include?: Prisma.CommunityPollIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityPollUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where: Prisma.CommunityPollWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityPollCreateInput, Prisma.CommunityPollUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityPollUpdateInput, Prisma.CommunityPollUncheckedUpdateInput>;
};
export type CommunityPollDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
    where: Prisma.CommunityPollWhereUniqueInput;
};
export type CommunityPollDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityPollWhereInput;
    limit?: number;
};
export type CommunityPoll$optionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where?: Prisma.PollOptionWhereInput;
    orderBy?: Prisma.PollOptionOrderByWithRelationInput | Prisma.PollOptionOrderByWithRelationInput[];
    cursor?: Prisma.PollOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollOptionScalarFieldEnum | Prisma.PollOptionScalarFieldEnum[];
};
export type CommunityPoll$votesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithRelationInput | Prisma.PollVoteOrderByWithRelationInput[];
    cursor?: Prisma.PollVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollVoteScalarFieldEnum | Prisma.PollVoteScalarFieldEnum[];
};
export type CommunityPollDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityPollSelect<ExtArgs> | null;
    omit?: Prisma.CommunityPollOmit<ExtArgs> | null;
    include?: Prisma.CommunityPollInclude<ExtArgs> | null;
};
export {};
