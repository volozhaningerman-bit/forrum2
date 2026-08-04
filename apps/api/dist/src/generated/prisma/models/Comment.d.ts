import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommentModel = runtime.Types.Result.DefaultSelection<Prisma.$CommentPayload>;
export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
};
export type CommentMinAggregateOutputType = {
    id: string | null;
    body: string | null;
    publicationId: string | null;
    authorId: string | null;
    parentId: string | null;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommentMaxAggregateOutputType = {
    id: string | null;
    body: string | null;
    publicationId: string | null;
    authorId: string | null;
    parentId: string | null;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CommentCountAggregateOutputType = {
    id: number;
    body: number;
    publicationId: number;
    authorId: number;
    parentId: number;
    hiddenAt: number;
    hiddenReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CommentMinAggregateInputType = {
    id?: true;
    body?: true;
    publicationId?: true;
    authorId?: true;
    parentId?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommentMaxAggregateInputType = {
    id?: true;
    body?: true;
    publicationId?: true;
    authorId?: true;
    parentId?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CommentCountAggregateInputType = {
    id?: true;
    body?: true;
    publicationId?: true;
    authorId?: true;
    parentId?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CommentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommentCountAggregateInputType;
    _min?: CommentMinAggregateInputType;
    _max?: CommentMaxAggregateInputType;
};
export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
    [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateComment[P]> : Prisma.GetScalarType<T[P], AggregateComment[P]>;
};
export type CommentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithAggregationInput | Prisma.CommentOrderByWithAggregationInput[];
    by: Prisma.CommentScalarFieldEnum[] | Prisma.CommentScalarFieldEnum;
    having?: Prisma.CommentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommentCountAggregateInputType | true;
    _min?: CommentMinAggregateInputType;
    _max?: CommentMaxAggregateInputType;
};
export type CommentGroupByOutputType = {
    id: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId: string | null;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
};
type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommentGroupByOutputType[P]>;
}>>;
export type CommentWhereInput = {
    AND?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    OR?: Prisma.CommentWhereInput[];
    NOT?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    id?: Prisma.UuidFilter<"Comment"> | string;
    body?: Prisma.StringFilter<"Comment"> | string;
    publicationId?: Prisma.UuidFilter<"Comment"> | string;
    authorId?: Prisma.UuidFilter<"Comment"> | string;
    parentId?: Prisma.UuidNullableFilter<"Comment"> | string | null;
    hiddenAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"Comment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    parent?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
    replies?: Prisma.CommentListRelationFilter;
    reactions?: Prisma.CommentReactionListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
};
export type CommentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publication?: Prisma.PublicationOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
    parent?: Prisma.CommentOrderByWithRelationInput;
    replies?: Prisma.CommentOrderByRelationAggregateInput;
    reactions?: Prisma.CommentReactionOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    reports?: Prisma.ReportOrderByRelationAggregateInput;
};
export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    OR?: Prisma.CommentWhereInput[];
    NOT?: Prisma.CommentWhereInput | Prisma.CommentWhereInput[];
    body?: Prisma.StringFilter<"Comment"> | string;
    publicationId?: Prisma.UuidFilter<"Comment"> | string;
    authorId?: Prisma.UuidFilter<"Comment"> | string;
    parentId?: Prisma.UuidNullableFilter<"Comment"> | string | null;
    hiddenAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"Comment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    parent?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
    replies?: Prisma.CommentListRelationFilter;
    reactions?: Prisma.CommentReactionListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
}, "id">;
export type CommentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CommentCountOrderByAggregateInput;
    _max?: Prisma.CommentMaxOrderByAggregateInput;
    _min?: Prisma.CommentMinOrderByAggregateInput;
};
export type CommentScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommentScalarWhereWithAggregatesInput | Prisma.CommentScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommentScalarWhereWithAggregatesInput | Prisma.CommentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Comment"> | string;
    body?: Prisma.StringWithAggregatesFilter<"Comment"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"Comment"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"Comment"> | string;
    parentId?: Prisma.UuidNullableWithAggregatesFilter<"Comment"> | string | null;
    hiddenAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Comment"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableWithAggregatesFilter<"Comment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Comment"> | Date | string;
};
export type CommentCreateInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentCreateManyInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentListRelationFilter = {
    every?: Prisma.CommentWhereInput;
    some?: Prisma.CommentWhereInput;
    none?: Prisma.CommentWhereInput;
};
export type CommentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommentNullableScalarRelationFilter = {
    is?: Prisma.CommentWhereInput | null;
    isNot?: Prisma.CommentWhereInput | null;
};
export type CommentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CommentScalarRelationFilter = {
    is?: Prisma.CommentWhereInput;
    isNot?: Prisma.CommentWhereInput;
};
export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput> | Prisma.CommentCreateWithoutAuthorInput[] | Prisma.CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutAuthorInput | Prisma.CommentCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommentCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput> | Prisma.CommentCreateWithoutAuthorInput[] | Prisma.CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutAuthorInput | Prisma.CommentCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.CommentCreateManyAuthorInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput> | Prisma.CommentCreateWithoutAuthorInput[] | Prisma.CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutAuthorInput | Prisma.CommentCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommentCreateManyAuthorInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutAuthorInput | Prisma.CommentUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput> | Prisma.CommentCreateWithoutAuthorInput[] | Prisma.CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutAuthorInput | Prisma.CommentCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput | Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.CommentCreateManyAuthorInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput | Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutAuthorInput | Prisma.CommentUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput> | Prisma.CommentCreateWithoutPublicationInput[] | Prisma.CommentUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutPublicationInput | Prisma.CommentCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.CommentCreateManyPublicationInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput> | Prisma.CommentCreateWithoutPublicationInput[] | Prisma.CommentUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutPublicationInput | Prisma.CommentCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.CommentCreateManyPublicationInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput> | Prisma.CommentCreateWithoutPublicationInput[] | Prisma.CommentUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutPublicationInput | Prisma.CommentCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutPublicationInput | Prisma.CommentUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.CommentCreateManyPublicationInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutPublicationInput | Prisma.CommentUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutPublicationInput | Prisma.CommentUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput> | Prisma.CommentCreateWithoutPublicationInput[] | Prisma.CommentUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutPublicationInput | Prisma.CommentCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutPublicationInput | Prisma.CommentUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.CommentCreateManyPublicationInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutPublicationInput | Prisma.CommentUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutPublicationInput | Prisma.CommentUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentCreateNestedOneWithoutRepliesInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutRepliesInput, Prisma.CommentUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutRepliesInput;
    connect?: Prisma.CommentWhereUniqueInput;
};
export type CommentCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput> | Prisma.CommentCreateWithoutParentInput[] | Prisma.CommentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutParentInput | Prisma.CommentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.CommentCreateManyParentInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput> | Prisma.CommentCreateWithoutParentInput[] | Prisma.CommentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutParentInput | Prisma.CommentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.CommentCreateManyParentInputEnvelope;
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
};
export type CommentUpdateOneWithoutRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutRepliesInput, Prisma.CommentUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutRepliesInput;
    upsert?: Prisma.CommentUpsertWithoutRepliesInput;
    disconnect?: Prisma.CommentWhereInput | boolean;
    delete?: Prisma.CommentWhereInput | boolean;
    connect?: Prisma.CommentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommentUpdateToOneWithWhereWithoutRepliesInput, Prisma.CommentUpdateWithoutRepliesInput>, Prisma.CommentUncheckedUpdateWithoutRepliesInput>;
};
export type CommentUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput> | Prisma.CommentCreateWithoutParentInput[] | Prisma.CommentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutParentInput | Prisma.CommentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutParentInput | Prisma.CommentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.CommentCreateManyParentInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutParentInput | Prisma.CommentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutParentInput | Prisma.CommentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput> | Prisma.CommentCreateWithoutParentInput[] | Prisma.CommentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutParentInput | Prisma.CommentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.CommentUpsertWithWhereUniqueWithoutParentInput | Prisma.CommentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.CommentCreateManyParentInputEnvelope;
    set?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    disconnect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    delete?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    connect?: Prisma.CommentWhereUniqueInput | Prisma.CommentWhereUniqueInput[];
    update?: Prisma.CommentUpdateWithWhereUniqueWithoutParentInput | Prisma.CommentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.CommentUpdateManyWithWhereWithoutParentInput | Prisma.CommentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
};
export type CommentCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReactionsInput, Prisma.CommentUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReactionsInput, Prisma.CommentUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.CommentUpsertWithoutReactionsInput;
    connect?: Prisma.CommentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommentUpdateToOneWithWhereWithoutReactionsInput, Prisma.CommentUpdateWithoutReactionsInput>, Prisma.CommentUncheckedUpdateWithoutReactionsInput>;
};
export type CommentCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.CommentUpsertWithoutNotificationsInput;
    disconnect?: Prisma.CommentWhereInput | boolean;
    delete?: Prisma.CommentWhereInput | boolean;
    connect?: Prisma.CommentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommentUpdateToOneWithWhereWithoutNotificationsInput, Prisma.CommentUpdateWithoutNotificationsInput>, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
};
export type CommentCreateNestedOneWithoutReportsInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReportsInput, Prisma.CommentUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReportsInput;
    connect?: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateOneWithoutReportsNestedInput = {
    create?: Prisma.XOR<Prisma.CommentCreateWithoutReportsInput, Prisma.CommentUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.CommentCreateOrConnectWithoutReportsInput;
    upsert?: Prisma.CommentUpsertWithoutReportsInput;
    disconnect?: Prisma.CommentWhereInput | boolean;
    delete?: Prisma.CommentWhereInput | boolean;
    connect?: Prisma.CommentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CommentUpdateToOneWithWhereWithoutReportsInput, Prisma.CommentUpdateWithoutReportsInput>, Prisma.CommentUncheckedUpdateWithoutReportsInput>;
};
export type CommentCreateWithoutAuthorInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string;
    body: string;
    publicationId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutAuthorInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput>;
};
export type CommentCreateManyAuthorInputEnvelope = {
    data: Prisma.CommentCreateManyAuthorInput | Prisma.CommentCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUpdateWithoutAuthorInput, Prisma.CommentUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutAuthorInput, Prisma.CommentUncheckedCreateWithoutAuthorInput>;
};
export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutAuthorInput, Prisma.CommentUncheckedUpdateWithoutAuthorInput>;
};
export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.CommentScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyWithoutAuthorInput>;
};
export type CommentScalarWhereInput = {
    AND?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
    OR?: Prisma.CommentScalarWhereInput[];
    NOT?: Prisma.CommentScalarWhereInput | Prisma.CommentScalarWhereInput[];
    id?: Prisma.UuidFilter<"Comment"> | string;
    body?: Prisma.StringFilter<"Comment"> | string;
    publicationId?: Prisma.UuidFilter<"Comment"> | string;
    authorId?: Prisma.UuidFilter<"Comment"> | string;
    parentId?: Prisma.UuidNullableFilter<"Comment"> | string | null;
    hiddenAt?: Prisma.DateTimeNullableFilter<"Comment"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"Comment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Comment"> | Date | string;
};
export type CommentCreateWithoutPublicationInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutPublicationInput = {
    id?: string;
    body: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutPublicationInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput>;
};
export type CommentCreateManyPublicationInputEnvelope = {
    data: Prisma.CommentCreateManyPublicationInput | Prisma.CommentCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type CommentUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.CommentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUpdateWithoutPublicationInput, Prisma.CommentUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutPublicationInput, Prisma.CommentUncheckedCreateWithoutPublicationInput>;
};
export type CommentUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutPublicationInput, Prisma.CommentUncheckedUpdateWithoutPublicationInput>;
};
export type CommentUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.CommentScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyWithoutPublicationInput>;
};
export type CommentCreateWithoutRepliesInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutRepliesInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutRepliesInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutRepliesInput, Prisma.CommentUncheckedCreateWithoutRepliesInput>;
};
export type CommentCreateWithoutParentInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutParentInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutParentInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput>;
};
export type CommentCreateManyParentInputEnvelope = {
    data: Prisma.CommentCreateManyParentInput | Prisma.CommentCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type CommentUpsertWithoutRepliesInput = {
    update: Prisma.XOR<Prisma.CommentUpdateWithoutRepliesInput, Prisma.CommentUncheckedUpdateWithoutRepliesInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutRepliesInput, Prisma.CommentUncheckedCreateWithoutRepliesInput>;
    where?: Prisma.CommentWhereInput;
};
export type CommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: Prisma.CommentWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutRepliesInput, Prisma.CommentUncheckedUpdateWithoutRepliesInput>;
};
export type CommentUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.CommentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUpdateWithoutParentInput, Prisma.CommentUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutParentInput, Prisma.CommentUncheckedCreateWithoutParentInput>;
};
export type CommentUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutParentInput, Prisma.CommentUncheckedUpdateWithoutParentInput>;
};
export type CommentUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.CommentScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyWithoutParentInput>;
};
export type CommentCreateWithoutReactionsInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutReactionsInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutReactionsInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReactionsInput, Prisma.CommentUncheckedCreateWithoutReactionsInput>;
};
export type CommentUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.CommentUpdateWithoutReactionsInput, Prisma.CommentUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReactionsInput, Prisma.CommentUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.CommentWhereInput;
};
export type CommentUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.CommentWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutReactionsInput, Prisma.CommentUncheckedUpdateWithoutReactionsInput>;
};
export type CommentUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentCreateWithoutNotificationsInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
};
export type CommentUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.CommentUpdateWithoutNotificationsInput, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutNotificationsInput, Prisma.CommentUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.CommentWhereInput;
};
export type CommentUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.CommentWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutNotificationsInput, Prisma.CommentUncheckedUpdateWithoutNotificationsInput>;
};
export type CommentUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentCreateWithoutReportsInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutCommentsInput;
    author: Prisma.UserCreateNestedOneWithoutCommentsInput;
    parent?: Prisma.CommentCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.CommentCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutCommentInput;
};
export type CommentUncheckedCreateWithoutReportsInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.CommentUncheckedCreateNestedManyWithoutParentInput;
    reactions?: Prisma.CommentReactionUncheckedCreateNestedManyWithoutCommentInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutCommentInput;
};
export type CommentCreateOrConnectWithoutReportsInput = {
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReportsInput, Prisma.CommentUncheckedCreateWithoutReportsInput>;
};
export type CommentUpsertWithoutReportsInput = {
    update: Prisma.XOR<Prisma.CommentUpdateWithoutReportsInput, Prisma.CommentUncheckedUpdateWithoutReportsInput>;
    create: Prisma.XOR<Prisma.CommentCreateWithoutReportsInput, Prisma.CommentUncheckedCreateWithoutReportsInput>;
    where?: Prisma.CommentWhereInput;
};
export type CommentUpdateToOneWithWhereWithoutReportsInput = {
    where?: Prisma.CommentWhereInput;
    data: Prisma.XOR<Prisma.CommentUpdateWithoutReportsInput, Prisma.CommentUncheckedUpdateWithoutReportsInput>;
};
export type CommentUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentCreateManyAuthorInput = {
    id?: string;
    body: string;
    publicationId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommentUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentCreateManyPublicationInput = {
    id?: string;
    body: string;
    authorId: string;
    parentId?: string | null;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommentUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    parent?: Prisma.CommentUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentCreateManyParentInput = {
    id?: string;
    body: string;
    publicationId: string;
    authorId: string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CommentUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutCommentsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput;
    replies?: Prisma.CommentUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput;
    reactions?: Prisma.CommentReactionUncheckedUpdateManyWithoutCommentNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutCommentNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutCommentNestedInput;
};
export type CommentUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentCountOutputType = {
    replies: number;
    reactions: number;
    notifications: number;
    reports: number;
};
export type CommentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replies?: boolean | CommentCountOutputTypeCountRepliesArgs;
    reactions?: boolean | CommentCountOutputTypeCountReactionsArgs;
    notifications?: boolean | CommentCountOutputTypeCountNotificationsArgs;
    reports?: boolean | CommentCountOutputTypeCountReportsArgs;
};
export type CommentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentCountOutputTypeSelect<ExtArgs> | null;
};
export type CommentCountOutputTypeCountRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
export type CommentCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentReactionWhereInput;
};
export type CommentCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type CommentCountOutputTypeCountReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
};
export type CommentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    body?: boolean;
    publicationId?: boolean;
    authorId?: boolean;
    parentId?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
    replies?: boolean | Prisma.Comment$repliesArgs<ExtArgs>;
    reactions?: boolean | Prisma.Comment$reactionsArgs<ExtArgs>;
    notifications?: boolean | Prisma.Comment$notificationsArgs<ExtArgs>;
    reports?: boolean | Prisma.Comment$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    body?: boolean;
    publicationId?: boolean;
    authorId?: boolean;
    parentId?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    body?: boolean;
    publicationId?: boolean;
    authorId?: boolean;
    parentId?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
}, ExtArgs["result"]["comment"]>;
export type CommentSelectScalar = {
    id?: boolean;
    body?: boolean;
    publicationId?: boolean;
    authorId?: boolean;
    parentId?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CommentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "body" | "publicationId" | "authorId" | "parentId" | "hiddenAt" | "hiddenReason" | "createdAt" | "updatedAt", ExtArgs["result"]["comment"]>;
export type CommentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
    replies?: boolean | Prisma.Comment$repliesArgs<ExtArgs>;
    reactions?: boolean | Prisma.Comment$reactionsArgs<ExtArgs>;
    notifications?: boolean | Prisma.Comment$notificationsArgs<ExtArgs>;
    reports?: boolean | Prisma.Comment$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.CommentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CommentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
};
export type CommentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Comment$parentArgs<ExtArgs>;
};
export type $CommentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Comment";
    objects: {
        publication: Prisma.$PublicationPayload<ExtArgs>;
        author: Prisma.$UserPayload<ExtArgs>;
        parent: Prisma.$CommentPayload<ExtArgs> | null;
        replies: Prisma.$CommentPayload<ExtArgs>[];
        reactions: Prisma.$CommentReactionPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        reports: Prisma.$ReportPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        body: string;
        publicationId: string;
        authorId: string;
        parentId: string | null;
        hiddenAt: Date | null;
        hiddenReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["comment"]>;
    composites: {};
};
export type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommentPayload, S>;
export type CommentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommentCountAggregateInputType | true;
};
export interface CommentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Comment'];
        meta: {
            name: 'Comment';
        };
    };
    findUnique<T extends CommentFindUniqueArgs>(args: Prisma.SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommentFindFirstArgs>(args?: Prisma.SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommentFindManyArgs>(args?: Prisma.SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommentCreateArgs>(args: Prisma.SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommentCreateManyArgs>(args?: Prisma.SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommentDeleteArgs>(args: Prisma.SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommentUpdateArgs>(args: Prisma.SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommentDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommentUpdateManyArgs>(args: Prisma.SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommentUpsertArgs>(args: Prisma.SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommentCountArgs>(args?: Prisma.Subset<T, CommentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommentCountAggregateOutputType> : number>;
    aggregate<T extends CommentAggregateArgs>(args: Prisma.Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>;
    groupBy<T extends CommentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommentGroupByArgs['orderBy'];
    } : {
        orderBy?: CommentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommentFieldRefs;
}
export interface Prisma__CommentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parent<T extends Prisma.Comment$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$parentArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    replies<T extends Prisma.Comment$repliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reactions<T extends Prisma.Comment$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.Comment$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reports<T extends Prisma.Comment$reportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Comment$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommentFieldRefs {
    readonly id: Prisma.FieldRef<"Comment", 'String'>;
    readonly body: Prisma.FieldRef<"Comment", 'String'>;
    readonly publicationId: Prisma.FieldRef<"Comment", 'String'>;
    readonly authorId: Prisma.FieldRef<"Comment", 'String'>;
    readonly parentId: Prisma.FieldRef<"Comment", 'String'>;
    readonly hiddenAt: Prisma.FieldRef<"Comment", 'DateTime'>;
    readonly hiddenReason: Prisma.FieldRef<"Comment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Comment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Comment", 'DateTime'>;
}
export type CommentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
export type CommentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
export type CommentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
export type CommentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentCreateInput, Prisma.CommentUncheckedCreateInput>;
};
export type CommentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommentCreateManyInput | Prisma.CommentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    data: Prisma.CommentCreateManyInput | Prisma.CommentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUpdateInput, Prisma.CommentUncheckedUpdateInput>;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyInput>;
    where?: Prisma.CommentWhereInput;
    limit?: number;
};
export type CommentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUpdateManyMutationInput, Prisma.CommentUncheckedUpdateManyInput>;
    where?: Prisma.CommentWhereInput;
    limit?: number;
    include?: Prisma.CommentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentCreateInput, Prisma.CommentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommentUpdateInput, Prisma.CommentUncheckedUpdateInput>;
};
export type CommentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where: Prisma.CommentWhereUniqueInput;
};
export type CommentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
    limit?: number;
};
export type Comment$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
};
export type Comment$repliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
export type Comment$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    where?: Prisma.CommentReactionWhereInput;
    orderBy?: Prisma.CommentReactionOrderByWithRelationInput | Prisma.CommentReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentReactionScalarFieldEnum | Prisma.CommentReactionScalarFieldEnum[];
};
export type Comment$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type Comment$reportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
};
export {};
