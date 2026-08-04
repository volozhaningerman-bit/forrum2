import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReportModel = runtime.Types.Result.DefaultSelection<Prisma.$ReportPayload>;
export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type ReportMinAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    publicationId: string | null;
    commentId: string | null;
    reason: string | null;
    details: string | null;
    status: $Enums.ReportStatus | null;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
};
export type ReportMaxAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    publicationId: string | null;
    commentId: string | null;
    reason: string | null;
    details: string | null;
    status: $Enums.ReportStatus | null;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
};
export type ReportCountAggregateOutputType = {
    id: number;
    authorId: number;
    publicationId: number;
    commentId: number;
    reason: number;
    details: number;
    status: number;
    resolutionNote: number;
    resolvedAt: number;
    createdAt: number;
    _all: number;
};
export type ReportMinAggregateInputType = {
    id?: true;
    authorId?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    details?: true;
    status?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
};
export type ReportMaxAggregateInputType = {
    id?: true;
    authorId?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    details?: true;
    status?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
};
export type ReportCountAggregateInputType = {
    id?: true;
    authorId?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    details?: true;
    status?: true;
    resolutionNote?: true;
    resolvedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type ReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReportCountAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type GetReportAggregateType<T extends ReportAggregateArgs> = {
    [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReport[P]> : Prisma.GetScalarType<T[P], AggregateReport[P]>;
};
export type ReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithAggregationInput | Prisma.ReportOrderByWithAggregationInput[];
    by: Prisma.ReportScalarFieldEnum[] | Prisma.ReportScalarFieldEnum;
    having?: Prisma.ReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReportCountAggregateInputType | true;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type ReportGroupByOutputType = {
    id: string;
    authorId: string;
    publicationId: string | null;
    commentId: string | null;
    reason: string;
    details: string | null;
    status: $Enums.ReportStatus;
    resolutionNote: string | null;
    resolvedAt: Date | null;
    createdAt: Date;
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>;
}>>;
export type ReportWhereInput = {
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    id?: Prisma.UuidFilter<"Report"> | string;
    authorId?: Prisma.UuidFilter<"Report"> | string;
    publicationId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.StringFilter<"Report"> | string;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    resolutionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
    comment?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
};
export type ReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
    comment?: Prisma.CommentOrderByWithRelationInput;
};
export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    authorId?: Prisma.UuidFilter<"Report"> | string;
    publicationId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.StringFilter<"Report"> | string;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    resolutionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
    comment?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
}, "id">;
export type ReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReportCountOrderByAggregateInput;
    _max?: Prisma.ReportMaxOrderByAggregateInput;
    _min?: Prisma.ReportMinOrderByAggregateInput;
};
export type ReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Report"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"Report"> | string;
    publicationId?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    commentId?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    reason?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    details?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus;
    resolutionNote?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Report"> | Date | string;
};
export type ReportCreateInput = {
    id?: string;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutReportsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutReportsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutReportsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutReportsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportListRelationFilter = {
    every?: Prisma.ReportWhereInput;
    some?: Prisma.ReportWhereInput;
    none?: Prisma.ReportWhereInput;
};
export type ReportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolutionNote?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput> | Prisma.ReportCreateWithoutAuthorInput[] | Prisma.ReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAuthorInput | Prisma.ReportCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ReportCreateManyAuthorInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput> | Prisma.ReportCreateWithoutAuthorInput[] | Prisma.ReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAuthorInput | Prisma.ReportCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ReportCreateManyAuthorInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput> | Prisma.ReportCreateWithoutAuthorInput[] | Prisma.ReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAuthorInput | Prisma.ReportCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ReportUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ReportCreateManyAuthorInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ReportUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutAuthorInput | Prisma.ReportUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput> | Prisma.ReportCreateWithoutAuthorInput[] | Prisma.ReportUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAuthorInput | Prisma.ReportCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ReportUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ReportCreateManyAuthorInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ReportUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutAuthorInput | Prisma.ReportUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput> | Prisma.ReportCreateWithoutPublicationInput[] | Prisma.ReportUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutPublicationInput | Prisma.ReportCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.ReportCreateManyPublicationInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput> | Prisma.ReportCreateWithoutPublicationInput[] | Prisma.ReportUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutPublicationInput | Prisma.ReportCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.ReportCreateManyPublicationInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput> | Prisma.ReportCreateWithoutPublicationInput[] | Prisma.ReportUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutPublicationInput | Prisma.ReportCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutPublicationInput | Prisma.ReportUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.ReportCreateManyPublicationInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutPublicationInput | Prisma.ReportUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutPublicationInput | Prisma.ReportUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput> | Prisma.ReportCreateWithoutPublicationInput[] | Prisma.ReportUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutPublicationInput | Prisma.ReportCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutPublicationInput | Prisma.ReportUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.ReportCreateManyPublicationInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutPublicationInput | Prisma.ReportUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutPublicationInput | Prisma.ReportUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput> | Prisma.ReportCreateWithoutCommentInput[] | Prisma.ReportUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutCommentInput | Prisma.ReportCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.ReportCreateManyCommentInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput> | Prisma.ReportCreateWithoutCommentInput[] | Prisma.ReportUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutCommentInput | Prisma.ReportCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.ReportCreateManyCommentInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput> | Prisma.ReportCreateWithoutCommentInput[] | Prisma.ReportUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutCommentInput | Prisma.ReportCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutCommentInput | Prisma.ReportUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.ReportCreateManyCommentInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutCommentInput | Prisma.ReportUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutCommentInput | Prisma.ReportUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput> | Prisma.ReportCreateWithoutCommentInput[] | Prisma.ReportUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutCommentInput | Prisma.ReportCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutCommentInput | Prisma.ReportUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.ReportCreateManyCommentInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutCommentInput | Prisma.ReportUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutCommentInput | Prisma.ReportUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus;
};
export type ReportCreateWithoutAuthorInput = {
    id?: string;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    publication?: Prisma.PublicationCreateNestedOneWithoutReportsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutAuthorInput = {
    id?: string;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutAuthorInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput>;
};
export type ReportCreateManyAuthorInputEnvelope = {
    data: Prisma.ReportCreateManyAuthorInput | Prisma.ReportCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutAuthorInput, Prisma.ReportUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutAuthorInput, Prisma.ReportUncheckedCreateWithoutAuthorInput>;
};
export type ReportUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutAuthorInput, Prisma.ReportUncheckedUpdateWithoutAuthorInput>;
};
export type ReportUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutAuthorInput>;
};
export type ReportScalarWhereInput = {
    AND?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    OR?: Prisma.ReportScalarWhereInput[];
    NOT?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    id?: Prisma.UuidFilter<"Report"> | string;
    authorId?: Prisma.UuidFilter<"Report"> | string;
    publicationId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.StringFilter<"Report"> | string;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    resolutionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
};
export type ReportCreateWithoutPublicationInput = {
    id?: string;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutReportsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutPublicationInput = {
    id?: string;
    authorId: string;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutPublicationInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput>;
};
export type ReportCreateManyPublicationInputEnvelope = {
    data: Prisma.ReportCreateManyPublicationInput | Prisma.ReportCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutPublicationInput, Prisma.ReportUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutPublicationInput, Prisma.ReportUncheckedCreateWithoutPublicationInput>;
};
export type ReportUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutPublicationInput, Prisma.ReportUncheckedUpdateWithoutPublicationInput>;
};
export type ReportUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutPublicationInput>;
};
export type ReportCreateWithoutCommentInput = {
    id?: string;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutReportsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutCommentInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutCommentInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput>;
};
export type ReportCreateManyCommentInputEnvelope = {
    data: Prisma.ReportCreateManyCommentInput | Prisma.ReportCreateManyCommentInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutCommentInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutCommentInput, Prisma.ReportUncheckedUpdateWithoutCommentInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutCommentInput, Prisma.ReportUncheckedCreateWithoutCommentInput>;
};
export type ReportUpdateWithWhereUniqueWithoutCommentInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutCommentInput, Prisma.ReportUncheckedUpdateWithoutCommentInput>;
};
export type ReportUpdateManyWithWhereWithoutCommentInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutCommentInput>;
};
export type ReportCreateManyAuthorInput = {
    id?: string;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneWithoutReportsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyPublicationInput = {
    id?: string;
    authorId: string;
    commentId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutReportsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyCommentInput = {
    id?: string;
    authorId: string;
    publicationId?: string | null;
    reason: string;
    details?: string | null;
    status?: $Enums.ReportStatus;
    resolutionNote?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutReportsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    resolutionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectScalar = {
    id?: boolean;
    authorId?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    resolutionNote?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
};
export type ReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "authorId" | "publicationId" | "commentId" | "reason" | "details" | "status" | "resolutionNote" | "resolvedAt" | "createdAt", ExtArgs["result"]["report"]>;
export type ReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
};
export type ReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
};
export type ReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.Report$publicationArgs<ExtArgs>;
    comment?: boolean | Prisma.Report$commentArgs<ExtArgs>;
};
export type $ReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Report";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs> | null;
        comment: Prisma.$CommentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        authorId: string;
        publicationId: string | null;
        commentId: string | null;
        reason: string;
        details: string | null;
        status: $Enums.ReportStatus;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["report"]>;
    composites: {};
};
export type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReportPayload, S>;
export type ReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReportCountAggregateInputType | true;
};
export interface ReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Report'];
        meta: {
            name: 'Report';
        };
    };
    findUnique<T extends ReportFindUniqueArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReportFindFirstArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReportFindManyArgs>(args?: Prisma.SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReportCreateArgs>(args: Prisma.SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReportCreateManyArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReportDeleteArgs>(args: Prisma.SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReportUpdateArgs>(args: Prisma.SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReportUpdateManyArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReportUpsertArgs>(args: Prisma.SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReportCountArgs>(args?: Prisma.Subset<T, ReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReportCountAggregateOutputType> : number>;
    aggregate<T extends ReportAggregateArgs>(args: Prisma.Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>;
    groupBy<T extends ReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReportGroupByArgs['orderBy'];
    } : {
        orderBy?: ReportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReportFieldRefs;
}
export interface Prisma__ReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.Report$publicationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$publicationArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    comment<T extends Prisma.Report$commentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$commentArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReportFieldRefs {
    readonly id: Prisma.FieldRef<"Report", 'String'>;
    readonly authorId: Prisma.FieldRef<"Report", 'String'>;
    readonly publicationId: Prisma.FieldRef<"Report", 'String'>;
    readonly commentId: Prisma.FieldRef<"Report", 'String'>;
    readonly reason: Prisma.FieldRef<"Report", 'String'>;
    readonly details: Prisma.FieldRef<"Report", 'String'>;
    readonly status: Prisma.FieldRef<"Report", 'ReportStatus'>;
    readonly resolutionNote: Prisma.FieldRef<"Report", 'String'>;
    readonly resolvedAt: Prisma.FieldRef<"Report", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Report", 'DateTime'>;
}
export type ReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
};
export type ReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
    include?: Prisma.ReportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
};
export type ReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type Report$publicationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
};
export type Report$commentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
};
export type ReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
};
export {};
