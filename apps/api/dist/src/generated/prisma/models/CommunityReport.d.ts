import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityReportModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityReportPayload>;
export type AggregateCommunityReport = {
    _count: CommunityReportCountAggregateOutputType | null;
    _min: CommunityReportMinAggregateOutputType | null;
    _max: CommunityReportMaxAggregateOutputType | null;
};
export type CommunityReportMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    authorId: string | null;
    publicationId: string | null;
    periodStart: Date | null;
    periodEnd: Date | null;
    summary: string | null;
    achievements: string | null;
    problems: string | null;
    plans: string | null;
    treasuryNote: string | null;
    createdAt: Date | null;
};
export type CommunityReportMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    authorId: string | null;
    publicationId: string | null;
    periodStart: Date | null;
    periodEnd: Date | null;
    summary: string | null;
    achievements: string | null;
    problems: string | null;
    plans: string | null;
    treasuryNote: string | null;
    createdAt: Date | null;
};
export type CommunityReportCountAggregateOutputType = {
    id: number;
    communityId: number;
    authorId: number;
    publicationId: number;
    periodStart: number;
    periodEnd: number;
    summary: number;
    achievements: number;
    problems: number;
    plans: number;
    treasuryNote: number;
    createdAt: number;
    _all: number;
};
export type CommunityReportMinAggregateInputType = {
    id?: true;
    communityId?: true;
    authorId?: true;
    publicationId?: true;
    periodStart?: true;
    periodEnd?: true;
    summary?: true;
    achievements?: true;
    problems?: true;
    plans?: true;
    treasuryNote?: true;
    createdAt?: true;
};
export type CommunityReportMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    authorId?: true;
    publicationId?: true;
    periodStart?: true;
    periodEnd?: true;
    summary?: true;
    achievements?: true;
    problems?: true;
    plans?: true;
    treasuryNote?: true;
    createdAt?: true;
};
export type CommunityReportCountAggregateInputType = {
    id?: true;
    communityId?: true;
    authorId?: true;
    publicationId?: true;
    periodStart?: true;
    periodEnd?: true;
    summary?: true;
    achievements?: true;
    problems?: true;
    plans?: true;
    treasuryNote?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunityReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityReportWhereInput;
    orderBy?: Prisma.CommunityReportOrderByWithRelationInput | Prisma.CommunityReportOrderByWithRelationInput[];
    cursor?: Prisma.CommunityReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityReportCountAggregateInputType;
    _min?: CommunityReportMinAggregateInputType;
    _max?: CommunityReportMaxAggregateInputType;
};
export type GetCommunityReportAggregateType<T extends CommunityReportAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityReport[P]> : Prisma.GetScalarType<T[P], AggregateCommunityReport[P]>;
};
export type CommunityReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityReportWhereInput;
    orderBy?: Prisma.CommunityReportOrderByWithAggregationInput | Prisma.CommunityReportOrderByWithAggregationInput[];
    by: Prisma.CommunityReportScalarFieldEnum[] | Prisma.CommunityReportScalarFieldEnum;
    having?: Prisma.CommunityReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityReportCountAggregateInputType | true;
    _min?: CommunityReportMinAggregateInputType;
    _max?: CommunityReportMaxAggregateInputType;
};
export type CommunityReportGroupByOutputType = {
    id: string;
    communityId: string;
    authorId: string;
    publicationId: string | null;
    periodStart: Date;
    periodEnd: Date;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote: string | null;
    createdAt: Date;
    _count: CommunityReportCountAggregateOutputType | null;
    _min: CommunityReportMinAggregateOutputType | null;
    _max: CommunityReportMaxAggregateOutputType | null;
};
type GetCommunityReportGroupByPayload<T extends CommunityReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityReportGroupByOutputType[P]>;
}>>;
export type CommunityReportWhereInput = {
    AND?: Prisma.CommunityReportWhereInput | Prisma.CommunityReportWhereInput[];
    OR?: Prisma.CommunityReportWhereInput[];
    NOT?: Prisma.CommunityReportWhereInput | Prisma.CommunityReportWhereInput[];
    id?: Prisma.UuidFilter<"CommunityReport"> | string;
    communityId?: Prisma.UuidFilter<"CommunityReport"> | string;
    authorId?: Prisma.UuidFilter<"CommunityReport"> | string;
    publicationId?: Prisma.UuidNullableFilter<"CommunityReport"> | string | null;
    periodStart?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    periodEnd?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    summary?: Prisma.StringFilter<"CommunityReport"> | string;
    achievements?: Prisma.StringFilter<"CommunityReport"> | string;
    problems?: Prisma.StringFilter<"CommunityReport"> | string;
    plans?: Prisma.StringFilter<"CommunityReport"> | string;
    treasuryNote?: Prisma.StringNullableFilter<"CommunityReport"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
};
export type CommunityReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    periodStart?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    achievements?: Prisma.SortOrder;
    problems?: Prisma.SortOrder;
    plans?: Prisma.SortOrder;
    treasuryNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
};
export type CommunityReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    publicationId?: string;
    AND?: Prisma.CommunityReportWhereInput | Prisma.CommunityReportWhereInput[];
    OR?: Prisma.CommunityReportWhereInput[];
    NOT?: Prisma.CommunityReportWhereInput | Prisma.CommunityReportWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityReport"> | string;
    authorId?: Prisma.UuidFilter<"CommunityReport"> | string;
    periodStart?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    periodEnd?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    summary?: Prisma.StringFilter<"CommunityReport"> | string;
    achievements?: Prisma.StringFilter<"CommunityReport"> | string;
    problems?: Prisma.StringFilter<"CommunityReport"> | string;
    plans?: Prisma.StringFilter<"CommunityReport"> | string;
    treasuryNote?: Prisma.StringNullableFilter<"CommunityReport"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
}, "id" | "publicationId">;
export type CommunityReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    periodStart?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    achievements?: Prisma.SortOrder;
    problems?: Prisma.SortOrder;
    plans?: Prisma.SortOrder;
    treasuryNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityReportCountOrderByAggregateInput;
    _max?: Prisma.CommunityReportMaxOrderByAggregateInput;
    _min?: Prisma.CommunityReportMinOrderByAggregateInput;
};
export type CommunityReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityReportScalarWhereWithAggregatesInput | Prisma.CommunityReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityReportScalarWhereWithAggregatesInput | Prisma.CommunityReportScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityReport"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityReport"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"CommunityReport"> | string;
    publicationId?: Prisma.UuidNullableWithAggregatesFilter<"CommunityReport"> | string | null;
    periodStart?: Prisma.DateTimeWithAggregatesFilter<"CommunityReport"> | Date | string;
    periodEnd?: Prisma.DateTimeWithAggregatesFilter<"CommunityReport"> | Date | string;
    summary?: Prisma.StringWithAggregatesFilter<"CommunityReport"> | string;
    achievements?: Prisma.StringWithAggregatesFilter<"CommunityReport"> | string;
    problems?: Prisma.StringWithAggregatesFilter<"CommunityReport"> | string;
    plans?: Prisma.StringWithAggregatesFilter<"CommunityReport"> | string;
    treasuryNote?: Prisma.StringNullableWithAggregatesFilter<"CommunityReport"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityReport"> | Date | string;
};
export type CommunityReportCreateInput = {
    id?: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutReportsInput;
    author: Prisma.UserCreateNestedOneWithoutCommunityReportsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutCommunityReportInput;
};
export type CommunityReportUncheckedCreateInput = {
    id?: string;
    communityId: string;
    authorId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutReportsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityReportsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutCommunityReportNestedInput;
};
export type CommunityReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportCreateManyInput = {
    id?: string;
    communityId: string;
    authorId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportListRelationFilter = {
    every?: Prisma.CommunityReportWhereInput;
    some?: Prisma.CommunityReportWhereInput;
    none?: Prisma.CommunityReportWhereInput;
};
export type CommunityReportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityReportNullableScalarRelationFilter = {
    is?: Prisma.CommunityReportWhereInput | null;
    isNot?: Prisma.CommunityReportWhereInput | null;
};
export type CommunityReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    periodStart?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    achievements?: Prisma.SortOrder;
    problems?: Prisma.SortOrder;
    plans?: Prisma.SortOrder;
    treasuryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    periodStart?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    achievements?: Prisma.SortOrder;
    problems?: Prisma.SortOrder;
    plans?: Prisma.SortOrder;
    treasuryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    periodStart?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    achievements?: Prisma.SortOrder;
    problems?: Prisma.SortOrder;
    plans?: Prisma.SortOrder;
    treasuryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityReportCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput> | Prisma.CommunityReportCreateWithoutAuthorInput[] | Prisma.CommunityReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutAuthorInput | Prisma.CommunityReportCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommunityReportCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
};
export type CommunityReportUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput> | Prisma.CommunityReportCreateWithoutAuthorInput[] | Prisma.CommunityReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutAuthorInput | Prisma.CommunityReportCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommunityReportCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
};
export type CommunityReportUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput> | Prisma.CommunityReportCreateWithoutAuthorInput[] | Prisma.CommunityReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutAuthorInput | Prisma.CommunityReportCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommunityReportUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommunityReportUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommunityReportCreateManyAuthorInputEnvelope;
    set?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    disconnect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    delete?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    update?: Prisma.CommunityReportUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommunityReportUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommunityReportUpdateManyWithWhereWithoutAuthorInput | Prisma.CommunityReportUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
};
export type CommunityReportUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput> | Prisma.CommunityReportCreateWithoutAuthorInput[] | Prisma.CommunityReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutAuthorInput | Prisma.CommunityReportCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommunityReportUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommunityReportUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommunityReportCreateManyAuthorInputEnvelope;
    set?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    disconnect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    delete?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    update?: Prisma.CommunityReportUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommunityReportUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommunityReportUpdateManyWithWhereWithoutAuthorInput | Prisma.CommunityReportUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
};
export type CommunityReportCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput> | Prisma.CommunityReportCreateWithoutCommunityInput[] | Prisma.CommunityReportUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutCommunityInput | Prisma.CommunityReportCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityReportCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
};
export type CommunityReportUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput> | Prisma.CommunityReportCreateWithoutCommunityInput[] | Prisma.CommunityReportUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutCommunityInput | Prisma.CommunityReportCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityReportCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
};
export type CommunityReportUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput> | Prisma.CommunityReportCreateWithoutCommunityInput[] | Prisma.CommunityReportUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutCommunityInput | Prisma.CommunityReportCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityReportUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityReportUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityReportCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    disconnect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    delete?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    update?: Prisma.CommunityReportUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityReportUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityReportUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityReportUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
};
export type CommunityReportUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput> | Prisma.CommunityReportCreateWithoutCommunityInput[] | Prisma.CommunityReportUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutCommunityInput | Prisma.CommunityReportCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityReportUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityReportUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityReportCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    disconnect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    delete?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    connect?: Prisma.CommunityReportWhereUniqueInput | Prisma.CommunityReportWhereUniqueInput[];
    update?: Prisma.CommunityReportUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityReportUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityReportUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityReportUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
};
export type CommunityReportCreateNestedOneWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutPublicationInput;
    connect?: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportUncheckedCreateNestedOneWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutPublicationInput;
    connect?: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportUpdateOneWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutPublicationInput;
    upsert?: Prisma.CommunityReportUpsertWithoutPublicationInput;
    disconnect?: Prisma.CommunityReportWhereInput | boolean;
    delete?: Prisma.CommunityReportWhereInput | boolean;
    connect?: Prisma.CommunityReportWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityReportUpdateToOneWithWhereWithoutPublicationInput, Prisma.CommunityReportUpdateWithoutPublicationInput>, Prisma.CommunityReportUncheckedUpdateWithoutPublicationInput>;
};
export type CommunityReportUncheckedUpdateOneWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
    connectOrCreate?: Prisma.CommunityReportCreateOrConnectWithoutPublicationInput;
    upsert?: Prisma.CommunityReportUpsertWithoutPublicationInput;
    disconnect?: Prisma.CommunityReportWhereInput | boolean;
    delete?: Prisma.CommunityReportWhereInput | boolean;
    connect?: Prisma.CommunityReportWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommunityReportUpdateToOneWithWhereWithoutPublicationInput, Prisma.CommunityReportUpdateWithoutPublicationInput>, Prisma.CommunityReportUncheckedUpdateWithoutPublicationInput>;
};
export type CommunityReportCreateWithoutAuthorInput = {
    id?: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutReportsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutCommunityReportInput;
};
export type CommunityReportUncheckedCreateWithoutAuthorInput = {
    id?: string;
    communityId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportCreateOrConnectWithoutAuthorInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput>;
};
export type CommunityReportCreateManyAuthorInputEnvelope = {
    data: Prisma.CommunityReportCreateManyAuthorInput | Prisma.CommunityReportCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type CommunityReportUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityReportUpdateWithoutAuthorInput, Prisma.CommunityReportUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutAuthorInput, Prisma.CommunityReportUncheckedCreateWithoutAuthorInput>;
};
export type CommunityReportUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityReportUpdateWithoutAuthorInput, Prisma.CommunityReportUncheckedUpdateWithoutAuthorInput>;
};
export type CommunityReportUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.CommunityReportScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityReportUpdateManyMutationInput, Prisma.CommunityReportUncheckedUpdateManyWithoutAuthorInput>;
};
export type CommunityReportScalarWhereInput = {
    AND?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
    OR?: Prisma.CommunityReportScalarWhereInput[];
    NOT?: Prisma.CommunityReportScalarWhereInput | Prisma.CommunityReportScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityReport"> | string;
    communityId?: Prisma.UuidFilter<"CommunityReport"> | string;
    authorId?: Prisma.UuidFilter<"CommunityReport"> | string;
    publicationId?: Prisma.UuidNullableFilter<"CommunityReport"> | string | null;
    periodStart?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    periodEnd?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
    summary?: Prisma.StringFilter<"CommunityReport"> | string;
    achievements?: Prisma.StringFilter<"CommunityReport"> | string;
    problems?: Prisma.StringFilter<"CommunityReport"> | string;
    plans?: Prisma.StringFilter<"CommunityReport"> | string;
    treasuryNote?: Prisma.StringNullableFilter<"CommunityReport"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommunityReport"> | Date | string;
};
export type CommunityReportCreateWithoutCommunityInput = {
    id?: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutCommunityReportsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutCommunityReportInput;
};
export type CommunityReportUncheckedCreateWithoutCommunityInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput>;
};
export type CommunityReportCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityReportCreateManyCommunityInput | Prisma.CommunityReportCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityReportUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityReportUpdateWithoutCommunityInput, Prisma.CommunityReportUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutCommunityInput, Prisma.CommunityReportUncheckedCreateWithoutCommunityInput>;
};
export type CommunityReportUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityReportUpdateWithoutCommunityInput, Prisma.CommunityReportUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityReportUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityReportScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityReportUpdateManyMutationInput, Prisma.CommunityReportUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityReportCreateWithoutPublicationInput = {
    id?: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutReportsInput;
    author: Prisma.UserCreateNestedOneWithoutCommunityReportsInput;
};
export type CommunityReportUncheckedCreateWithoutPublicationInput = {
    id?: string;
    communityId: string;
    authorId: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportCreateOrConnectWithoutPublicationInput = {
    where: Prisma.CommunityReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
};
export type CommunityReportUpsertWithoutPublicationInput = {
    update: Prisma.XOR<Prisma.CommunityReportUpdateWithoutPublicationInput, Prisma.CommunityReportUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.CommunityReportCreateWithoutPublicationInput, Prisma.CommunityReportUncheckedCreateWithoutPublicationInput>;
    where?: Prisma.CommunityReportWhereInput;
};
export type CommunityReportUpdateToOneWithWhereWithoutPublicationInput = {
    where?: Prisma.CommunityReportWhereInput;
    data: Prisma.XOR<Prisma.CommunityReportUpdateWithoutPublicationInput, Prisma.CommunityReportUncheckedUpdateWithoutPublicationInput>;
};
export type CommunityReportUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutReportsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityReportsNestedInput;
};
export type CommunityReportUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportCreateManyAuthorInput = {
    id?: string;
    communityId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutReportsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutCommunityReportNestedInput;
};
export type CommunityReportUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportCreateManyCommunityInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    periodStart: Date | string;
    periodEnd: Date | string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string | null;
    createdAt?: Date | string;
};
export type CommunityReportUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutCommunityReportsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutCommunityReportNestedInput;
};
export type CommunityReportUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    periodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    achievements?: Prisma.StringFieldUpdateOperationsInput | string;
    problems?: Prisma.StringFieldUpdateOperationsInput | string;
    plans?: Prisma.StringFieldUpdateOperationsInput | string;
    treasuryNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    periodStart?: boolean;
    periodEnd?: boolean;
    summary?: boolean;
    achievements?: boolean;
    problems?: boolean;
    plans?: boolean;
    treasuryNote?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["communityReport"]>;
export type CommunityReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    periodStart?: boolean;
    periodEnd?: boolean;
    summary?: boolean;
    achievements?: boolean;
    problems?: boolean;
    plans?: boolean;
    treasuryNote?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["communityReport"]>;
export type CommunityReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    periodStart?: boolean;
    periodEnd?: boolean;
    summary?: boolean;
    achievements?: boolean;
    problems?: boolean;
    plans?: boolean;
    treasuryNote?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["communityReport"]>;
export type CommunityReportSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    periodStart?: boolean;
    periodEnd?: boolean;
    summary?: boolean;
    achievements?: boolean;
    problems?: boolean;
    plans?: boolean;
    treasuryNote?: boolean;
    createdAt?: boolean;
};
export type CommunityReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "authorId" | "publicationId" | "periodStart" | "periodEnd" | "summary" | "achievements" | "problems" | "plans" | "treasuryNote" | "createdAt", ExtArgs["result"]["communityReport"]>;
export type CommunityReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
};
export type CommunityReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
};
export type CommunityReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.CommunityReport$publicationArgs<ExtArgs>;
};
export type $CommunityReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityReport";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        author: Prisma.$UserPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        authorId: string;
        publicationId: string | null;
        periodStart: Date;
        periodEnd: Date;
        summary: string;
        achievements: string;
        problems: string;
        plans: string;
        treasuryNote: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["communityReport"]>;
    composites: {};
};
export type CommunityReportGetPayload<S extends boolean | null | undefined | CommunityReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload, S>;
export type CommunityReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityReportCountAggregateInputType | true;
};
export interface CommunityReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityReport'];
        meta: {
            name: 'CommunityReport';
        };
    };
    findUnique<T extends CommunityReportFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityReportFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityReportFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityReportCreateArgs>(args: Prisma.SelectSubset<T, CommunityReportCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityReportCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityReportDeleteArgs>(args: Prisma.SelectSubset<T, CommunityReportDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityReportUpdateArgs>(args: Prisma.SelectSubset<T, CommunityReportUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityReportUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityReportUpsertArgs>(args: Prisma.SelectSubset<T, CommunityReportUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityReportClient<runtime.Types.Result.GetResult<Prisma.$CommunityReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityReportCountArgs>(args?: Prisma.Subset<T, CommunityReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityReportCountAggregateOutputType> : number>;
    aggregate<T extends CommunityReportAggregateArgs>(args: Prisma.Subset<T, CommunityReportAggregateArgs>): Prisma.PrismaPromise<GetCommunityReportAggregateType<T>>;
    groupBy<T extends CommunityReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityReportGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityReportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityReportFieldRefs;
}
export interface Prisma__CommunityReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.CommunityReport$publicationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityReport$publicationArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityReportFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly authorId: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly publicationId: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly periodStart: Prisma.FieldRef<"CommunityReport", 'DateTime'>;
    readonly periodEnd: Prisma.FieldRef<"CommunityReport", 'DateTime'>;
    readonly summary: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly achievements: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly problems: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly plans: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly treasuryNote: Prisma.FieldRef<"CommunityReport", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CommunityReport", 'DateTime'>;
}
export type CommunityReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where?: Prisma.CommunityReportWhereInput;
    orderBy?: Prisma.CommunityReportOrderByWithRelationInput | Prisma.CommunityReportOrderByWithRelationInput[];
    cursor?: Prisma.CommunityReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityReportScalarFieldEnum | Prisma.CommunityReportScalarFieldEnum[];
};
export type CommunityReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where?: Prisma.CommunityReportWhereInput;
    orderBy?: Prisma.CommunityReportOrderByWithRelationInput | Prisma.CommunityReportOrderByWithRelationInput[];
    cursor?: Prisma.CommunityReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityReportScalarFieldEnum | Prisma.CommunityReportScalarFieldEnum[];
};
export type CommunityReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where?: Prisma.CommunityReportWhereInput;
    orderBy?: Prisma.CommunityReportOrderByWithRelationInput | Prisma.CommunityReportOrderByWithRelationInput[];
    cursor?: Prisma.CommunityReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityReportScalarFieldEnum | Prisma.CommunityReportScalarFieldEnum[];
};
export type CommunityReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityReportCreateInput, Prisma.CommunityReportUncheckedCreateInput>;
};
export type CommunityReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityReportCreateManyInput | Prisma.CommunityReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    data: Prisma.CommunityReportCreateManyInput | Prisma.CommunityReportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityReportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityReportUpdateInput, Prisma.CommunityReportUncheckedUpdateInput>;
    where: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityReportUpdateManyMutationInput, Prisma.CommunityReportUncheckedUpdateManyInput>;
    where?: Prisma.CommunityReportWhereInput;
    limit?: number;
};
export type CommunityReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityReportUpdateManyMutationInput, Prisma.CommunityReportUncheckedUpdateManyInput>;
    where?: Prisma.CommunityReportWhereInput;
    limit?: number;
    include?: Prisma.CommunityReportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where: Prisma.CommunityReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityReportCreateInput, Prisma.CommunityReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityReportUpdateInput, Prisma.CommunityReportUncheckedUpdateInput>;
};
export type CommunityReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
    where: Prisma.CommunityReportWhereUniqueInput;
};
export type CommunityReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityReportWhereInput;
    limit?: number;
};
export type CommunityReport$publicationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
};
export type CommunityReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityReportSelect<ExtArgs> | null;
    omit?: Prisma.CommunityReportOmit<ExtArgs> | null;
    include?: Prisma.CommunityReportInclude<ExtArgs> | null;
};
export {};
