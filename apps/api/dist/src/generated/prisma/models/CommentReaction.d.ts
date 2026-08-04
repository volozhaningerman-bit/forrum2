import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommentReactionModel = runtime.Types.Result.DefaultSelection<Prisma.$CommentReactionPayload>;
export type AggregateCommentReaction = {
    _count: CommentReactionCountAggregateOutputType | null;
    _min: CommentReactionMinAggregateOutputType | null;
    _max: CommentReactionMaxAggregateOutputType | null;
};
export type CommentReactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    commentId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type CommentReactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    commentId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type CommentReactionCountAggregateOutputType = {
    id: number;
    userId: number;
    commentId: number;
    type: number;
    createdAt: number;
    _all: number;
};
export type CommentReactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    commentId?: true;
    type?: true;
    createdAt?: true;
};
export type CommentReactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    commentId?: true;
    type?: true;
    createdAt?: true;
};
export type CommentReactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    commentId?: true;
    type?: true;
    createdAt?: true;
    _all?: true;
};
export type CommentReactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentReactionWhereInput;
    orderBy?: Prisma.CommentReactionOrderByWithRelationInput | Prisma.CommentReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommentReactionCountAggregateInputType;
    _min?: CommentReactionMinAggregateInputType;
    _max?: CommentReactionMaxAggregateInputType;
};
export type GetCommentReactionAggregateType<T extends CommentReactionAggregateArgs> = {
    [P in keyof T & keyof AggregateCommentReaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommentReaction[P]> : Prisma.GetScalarType<T[P], AggregateCommentReaction[P]>;
};
export type CommentReactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentReactionWhereInput;
    orderBy?: Prisma.CommentReactionOrderByWithAggregationInput | Prisma.CommentReactionOrderByWithAggregationInput[];
    by: Prisma.CommentReactionScalarFieldEnum[] | Prisma.CommentReactionScalarFieldEnum;
    having?: Prisma.CommentReactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommentReactionCountAggregateInputType | true;
    _min?: CommentReactionMinAggregateInputType;
    _max?: CommentReactionMaxAggregateInputType;
};
export type CommentReactionGroupByOutputType = {
    id: string;
    userId: string;
    commentId: string;
    type: $Enums.ReactionType;
    createdAt: Date;
    _count: CommentReactionCountAggregateOutputType | null;
    _min: CommentReactionMinAggregateOutputType | null;
    _max: CommentReactionMaxAggregateOutputType | null;
};
type GetCommentReactionGroupByPayload<T extends CommentReactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommentReactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommentReactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommentReactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommentReactionGroupByOutputType[P]>;
}>>;
export type CommentReactionWhereInput = {
    AND?: Prisma.CommentReactionWhereInput | Prisma.CommentReactionWhereInput[];
    OR?: Prisma.CommentReactionWhereInput[];
    NOT?: Prisma.CommentReactionWhereInput | Prisma.CommentReactionWhereInput[];
    id?: Prisma.UuidFilter<"CommentReaction"> | string;
    userId?: Prisma.UuidFilter<"CommentReaction"> | string;
    commentId?: Prisma.UuidFilter<"CommentReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"CommentReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"CommentReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comment?: Prisma.XOR<Prisma.CommentScalarRelationFilter, Prisma.CommentWhereInput>;
};
export type CommentReactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    comment?: Prisma.CommentOrderByWithRelationInput;
};
export type CommentReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_commentId?: Prisma.CommentReactionUserIdCommentIdCompoundUniqueInput;
    AND?: Prisma.CommentReactionWhereInput | Prisma.CommentReactionWhereInput[];
    OR?: Prisma.CommentReactionWhereInput[];
    NOT?: Prisma.CommentReactionWhereInput | Prisma.CommentReactionWhereInput[];
    userId?: Prisma.UuidFilter<"CommentReaction"> | string;
    commentId?: Prisma.UuidFilter<"CommentReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"CommentReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"CommentReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comment?: Prisma.XOR<Prisma.CommentScalarRelationFilter, Prisma.CommentWhereInput>;
}, "id" | "userId_commentId">;
export type CommentReactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommentReactionCountOrderByAggregateInput;
    _max?: Prisma.CommentReactionMaxOrderByAggregateInput;
    _min?: Prisma.CommentReactionMinOrderByAggregateInput;
};
export type CommentReactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommentReactionScalarWhereWithAggregatesInput | Prisma.CommentReactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommentReactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommentReactionScalarWhereWithAggregatesInput | Prisma.CommentReactionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommentReaction"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CommentReaction"> | string;
    commentId?: Prisma.UuidWithAggregatesFilter<"CommentReaction"> | string;
    type?: Prisma.EnumReactionTypeWithAggregatesFilter<"CommentReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommentReaction"> | Date | string;
};
export type CommentReactionCreateInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommentReactionsInput;
    comment: Prisma.CommentCreateNestedOneWithoutReactionsInput;
};
export type CommentReactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    commentId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentReactionsNestedInput;
    comment?: Prisma.CommentUpdateOneRequiredWithoutReactionsNestedInput;
};
export type CommentReactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionCreateManyInput = {
    id?: string;
    userId: string;
    commentId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionListRelationFilter = {
    every?: Prisma.CommentReactionWhereInput;
    some?: Prisma.CommentReactionWhereInput;
    none?: Prisma.CommentReactionWhereInput;
};
export type CommentReactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommentReactionUserIdCommentIdCompoundUniqueInput = {
    userId: string;
    commentId: string;
};
export type CommentReactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommentReactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommentReactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommentReactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput> | Prisma.CommentReactionCreateWithoutUserInput[] | Prisma.CommentReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutUserInput | Prisma.CommentReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentReactionCreateManyUserInputEnvelope;
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
};
export type CommentReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput> | Prisma.CommentReactionCreateWithoutUserInput[] | Prisma.CommentReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutUserInput | Prisma.CommentReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentReactionCreateManyUserInputEnvelope;
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
};
export type CommentReactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput> | Prisma.CommentReactionCreateWithoutUserInput[] | Prisma.CommentReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutUserInput | Prisma.CommentReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentReactionCreateManyUserInputEnvelope;
    set?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    delete?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    update?: Prisma.CommentReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentReactionUpdateManyWithWhereWithoutUserInput | Prisma.CommentReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
};
export type CommentReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput> | Prisma.CommentReactionCreateWithoutUserInput[] | Prisma.CommentReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutUserInput | Prisma.CommentReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentReactionCreateManyUserInputEnvelope;
    set?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    delete?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    update?: Prisma.CommentReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentReactionUpdateManyWithWhereWithoutUserInput | Prisma.CommentReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
};
export type CommentReactionCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentReactionCreateWithoutCommentInput[] | Prisma.CommentReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutCommentInput | Prisma.CommentReactionCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.CommentReactionCreateManyCommentInputEnvelope;
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
};
export type CommentReactionUncheckedCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentReactionCreateWithoutCommentInput[] | Prisma.CommentReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutCommentInput | Prisma.CommentReactionCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.CommentReactionCreateManyCommentInputEnvelope;
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
};
export type CommentReactionUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentReactionCreateWithoutCommentInput[] | Prisma.CommentReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutCommentInput | Prisma.CommentReactionCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.CommentReactionUpsertWithWhereUniqueWithoutCommentInput | Prisma.CommentReactionUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.CommentReactionCreateManyCommentInputEnvelope;
    set?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    delete?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    update?: Prisma.CommentReactionUpdateWithWhereUniqueWithoutCommentInput | Prisma.CommentReactionUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.CommentReactionUpdateManyWithWhereWithoutCommentInput | Prisma.CommentReactionUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
};
export type CommentReactionUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentReactionCreateWithoutCommentInput[] | Prisma.CommentReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentReactionCreateOrConnectWithoutCommentInput | Prisma.CommentReactionCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.CommentReactionUpsertWithWhereUniqueWithoutCommentInput | Prisma.CommentReactionUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.CommentReactionCreateManyCommentInputEnvelope;
    set?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    delete?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    connect?: Prisma.CommentReactionWhereUniqueInput | Prisma.CommentReactionWhereUniqueInput[];
    update?: Prisma.CommentReactionUpdateWithWhereUniqueWithoutCommentInput | Prisma.CommentReactionUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.CommentReactionUpdateManyWithWhereWithoutCommentInput | Prisma.CommentReactionUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
};
export type CommentReactionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    comment: Prisma.CommentCreateNestedOneWithoutReactionsInput;
};
export type CommentReactionUncheckedCreateWithoutUserInput = {
    id?: string;
    commentId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionCreateOrConnectWithoutUserInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput>;
};
export type CommentReactionCreateManyUserInputEnvelope = {
    data: Prisma.CommentReactionCreateManyUserInput | Prisma.CommentReactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommentReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentReactionUpdateWithoutUserInput, Prisma.CommentReactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommentReactionCreateWithoutUserInput, Prisma.CommentReactionUncheckedCreateWithoutUserInput>;
};
export type CommentReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentReactionUpdateWithoutUserInput, Prisma.CommentReactionUncheckedUpdateWithoutUserInput>;
};
export type CommentReactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommentReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentReactionUpdateManyMutationInput, Prisma.CommentReactionUncheckedUpdateManyWithoutUserInput>;
};
export type CommentReactionScalarWhereInput = {
    AND?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
    OR?: Prisma.CommentReactionScalarWhereInput[];
    NOT?: Prisma.CommentReactionScalarWhereInput | Prisma.CommentReactionScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommentReaction"> | string;
    userId?: Prisma.UuidFilter<"CommentReaction"> | string;
    commentId?: Prisma.UuidFilter<"CommentReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"CommentReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"CommentReaction"> | Date | string;
};
export type CommentReactionCreateWithoutCommentInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommentReactionsInput;
};
export type CommentReactionUncheckedCreateWithoutCommentInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionCreateOrConnectWithoutCommentInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput>;
};
export type CommentReactionCreateManyCommentInputEnvelope = {
    data: Prisma.CommentReactionCreateManyCommentInput | Prisma.CommentReactionCreateManyCommentInput[];
    skipDuplicates?: boolean;
};
export type CommentReactionUpsertWithWhereUniqueWithoutCommentInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentReactionUpdateWithoutCommentInput, Prisma.CommentReactionUncheckedUpdateWithoutCommentInput>;
    create: Prisma.XOR<Prisma.CommentReactionCreateWithoutCommentInput, Prisma.CommentReactionUncheckedCreateWithoutCommentInput>;
};
export type CommentReactionUpdateWithWhereUniqueWithoutCommentInput = {
    where: Prisma.CommentReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentReactionUpdateWithoutCommentInput, Prisma.CommentReactionUncheckedUpdateWithoutCommentInput>;
};
export type CommentReactionUpdateManyWithWhereWithoutCommentInput = {
    where: Prisma.CommentReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentReactionUpdateManyMutationInput, Prisma.CommentReactionUncheckedUpdateManyWithoutCommentInput>;
};
export type CommentReactionCreateManyUserInput = {
    id?: string;
    commentId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comment?: Prisma.CommentUpdateOneRequiredWithoutReactionsNestedInput;
};
export type CommentReactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionCreateManyCommentInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type CommentReactionUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentReactionsNestedInput;
};
export type CommentReactionUncheckedUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionUncheckedUpdateManyWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentReactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    commentId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentReaction"]>;
export type CommentReactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    commentId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentReaction"]>;
export type CommentReactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    commentId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentReaction"]>;
export type CommentReactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    commentId?: boolean;
    type?: boolean;
    createdAt?: boolean;
};
export type CommentReactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "commentId" | "type" | "createdAt", ExtArgs["result"]["commentReaction"]>;
export type CommentReactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type CommentReactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type CommentReactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type $CommentReactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommentReaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        comment: Prisma.$CommentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        commentId: string;
        type: $Enums.ReactionType;
        createdAt: Date;
    }, ExtArgs["result"]["commentReaction"]>;
    composites: {};
};
export type CommentReactionGetPayload<S extends boolean | null | undefined | CommentReactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload, S>;
export type CommentReactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommentReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommentReactionCountAggregateInputType | true;
};
export interface CommentReactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommentReaction'];
        meta: {
            name: 'CommentReaction';
        };
    };
    findUnique<T extends CommentReactionFindUniqueArgs>(args: Prisma.SelectSubset<T, CommentReactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommentReactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommentReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommentReactionFindFirstArgs>(args?: Prisma.SelectSubset<T, CommentReactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommentReactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommentReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommentReactionFindManyArgs>(args?: Prisma.SelectSubset<T, CommentReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommentReactionCreateArgs>(args: Prisma.SelectSubset<T, CommentReactionCreateArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommentReactionCreateManyArgs>(args?: Prisma.SelectSubset<T, CommentReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommentReactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommentReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommentReactionDeleteArgs>(args: Prisma.SelectSubset<T, CommentReactionDeleteArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommentReactionUpdateArgs>(args: Prisma.SelectSubset<T, CommentReactionUpdateArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommentReactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommentReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommentReactionUpdateManyArgs>(args: Prisma.SelectSubset<T, CommentReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommentReactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommentReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommentReactionUpsertArgs>(args: Prisma.SelectSubset<T, CommentReactionUpsertArgs<ExtArgs>>): Prisma.Prisma__CommentReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommentReactionCountArgs>(args?: Prisma.Subset<T, CommentReactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommentReactionCountAggregateOutputType> : number>;
    aggregate<T extends CommentReactionAggregateArgs>(args: Prisma.Subset<T, CommentReactionAggregateArgs>): Prisma.PrismaPromise<GetCommentReactionAggregateType<T>>;
    groupBy<T extends CommentReactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommentReactionGroupByArgs['orderBy'];
    } : {
        orderBy?: CommentReactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommentReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommentReactionFieldRefs;
}
export interface Prisma__CommentReactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    comment<T extends Prisma.CommentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommentDefaultArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommentReactionFieldRefs {
    readonly id: Prisma.FieldRef<"CommentReaction", 'String'>;
    readonly userId: Prisma.FieldRef<"CommentReaction", 'String'>;
    readonly commentId: Prisma.FieldRef<"CommentReaction", 'String'>;
    readonly type: Prisma.FieldRef<"CommentReaction", 'ReactionType'>;
    readonly createdAt: Prisma.FieldRef<"CommentReaction", 'DateTime'>;
}
export type CommentReactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    where: Prisma.CommentReactionWhereUniqueInput;
};
export type CommentReactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    where: Prisma.CommentReactionWhereUniqueInput;
};
export type CommentReactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentReactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentReactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CommentReactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentReactionCreateInput, Prisma.CommentReactionUncheckedCreateInput>;
};
export type CommentReactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommentReactionCreateManyInput | Prisma.CommentReactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommentReactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    data: Prisma.CommentReactionCreateManyInput | Prisma.CommentReactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommentReactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommentReactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentReactionUpdateInput, Prisma.CommentReactionUncheckedUpdateInput>;
    where: Prisma.CommentReactionWhereUniqueInput;
};
export type CommentReactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommentReactionUpdateManyMutationInput, Prisma.CommentReactionUncheckedUpdateManyInput>;
    where?: Prisma.CommentReactionWhereInput;
    limit?: number;
};
export type CommentReactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentReactionUpdateManyMutationInput, Prisma.CommentReactionUncheckedUpdateManyInput>;
    where?: Prisma.CommentReactionWhereInput;
    limit?: number;
    include?: Prisma.CommentReactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommentReactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    where: Prisma.CommentReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentReactionCreateInput, Prisma.CommentReactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommentReactionUpdateInput, Prisma.CommentReactionUncheckedUpdateInput>;
};
export type CommentReactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
    where: Prisma.CommentReactionWhereUniqueInput;
};
export type CommentReactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentReactionWhereInput;
    limit?: number;
};
export type CommentReactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentReactionInclude<ExtArgs> | null;
};
export {};
