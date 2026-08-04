import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PublicationReactionModel = runtime.Types.Result.DefaultSelection<Prisma.$PublicationReactionPayload>;
export type AggregatePublicationReaction = {
    _count: PublicationReactionCountAggregateOutputType | null;
    _min: PublicationReactionMinAggregateOutputType | null;
    _max: PublicationReactionMaxAggregateOutputType | null;
};
export type PublicationReactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    publicationId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type PublicationReactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    publicationId: string | null;
    type: $Enums.ReactionType | null;
    createdAt: Date | null;
};
export type PublicationReactionCountAggregateOutputType = {
    id: number;
    userId: number;
    publicationId: number;
    type: number;
    createdAt: number;
    _all: number;
};
export type PublicationReactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    type?: true;
    createdAt?: true;
};
export type PublicationReactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    type?: true;
    createdAt?: true;
};
export type PublicationReactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    publicationId?: true;
    type?: true;
    createdAt?: true;
    _all?: true;
};
export type PublicationReactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationReactionWhereInput;
    orderBy?: Prisma.PublicationReactionOrderByWithRelationInput | Prisma.PublicationReactionOrderByWithRelationInput[];
    cursor?: Prisma.PublicationReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PublicationReactionCountAggregateInputType;
    _min?: PublicationReactionMinAggregateInputType;
    _max?: PublicationReactionMaxAggregateInputType;
};
export type GetPublicationReactionAggregateType<T extends PublicationReactionAggregateArgs> = {
    [P in keyof T & keyof AggregatePublicationReaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePublicationReaction[P]> : Prisma.GetScalarType<T[P], AggregatePublicationReaction[P]>;
};
export type PublicationReactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationReactionWhereInput;
    orderBy?: Prisma.PublicationReactionOrderByWithAggregationInput | Prisma.PublicationReactionOrderByWithAggregationInput[];
    by: Prisma.PublicationReactionScalarFieldEnum[] | Prisma.PublicationReactionScalarFieldEnum;
    having?: Prisma.PublicationReactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PublicationReactionCountAggregateInputType | true;
    _min?: PublicationReactionMinAggregateInputType;
    _max?: PublicationReactionMaxAggregateInputType;
};
export type PublicationReactionGroupByOutputType = {
    id: string;
    userId: string;
    publicationId: string;
    type: $Enums.ReactionType;
    createdAt: Date;
    _count: PublicationReactionCountAggregateOutputType | null;
    _min: PublicationReactionMinAggregateOutputType | null;
    _max: PublicationReactionMaxAggregateOutputType | null;
};
type GetPublicationReactionGroupByPayload<T extends PublicationReactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PublicationReactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PublicationReactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PublicationReactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PublicationReactionGroupByOutputType[P]>;
}>>;
export type PublicationReactionWhereInput = {
    AND?: Prisma.PublicationReactionWhereInput | Prisma.PublicationReactionWhereInput[];
    OR?: Prisma.PublicationReactionWhereInput[];
    NOT?: Prisma.PublicationReactionWhereInput | Prisma.PublicationReactionWhereInput[];
    id?: Prisma.UuidFilter<"PublicationReaction"> | string;
    userId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    publicationId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"PublicationReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"PublicationReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
};
export type PublicationReactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
};
export type PublicationReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_publicationId?: Prisma.PublicationReactionUserIdPublicationIdCompoundUniqueInput;
    AND?: Prisma.PublicationReactionWhereInput | Prisma.PublicationReactionWhereInput[];
    OR?: Prisma.PublicationReactionWhereInput[];
    NOT?: Prisma.PublicationReactionWhereInput | Prisma.PublicationReactionWhereInput[];
    userId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    publicationId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"PublicationReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"PublicationReaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
}, "id" | "userId_publicationId">;
export type PublicationReactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PublicationReactionCountOrderByAggregateInput;
    _max?: Prisma.PublicationReactionMaxOrderByAggregateInput;
    _min?: Prisma.PublicationReactionMinOrderByAggregateInput;
};
export type PublicationReactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PublicationReactionScalarWhereWithAggregatesInput | Prisma.PublicationReactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PublicationReactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PublicationReactionScalarWhereWithAggregatesInput | Prisma.PublicationReactionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PublicationReaction"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"PublicationReaction"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"PublicationReaction"> | string;
    type?: Prisma.EnumReactionTypeWithAggregatesFilter<"PublicationReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PublicationReaction"> | Date | string;
};
export type PublicationReactionCreateInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPublicationReactionsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutReactionsInput;
};
export type PublicationReactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    publicationId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPublicationReactionsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutReactionsNestedInput;
};
export type PublicationReactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionCreateManyInput = {
    id?: string;
    userId: string;
    publicationId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionListRelationFilter = {
    every?: Prisma.PublicationReactionWhereInput;
    some?: Prisma.PublicationReactionWhereInput;
    none?: Prisma.PublicationReactionWhereInput;
};
export type PublicationReactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PublicationReactionUserIdPublicationIdCompoundUniqueInput = {
    userId: string;
    publicationId: string;
};
export type PublicationReactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PublicationReactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PublicationReactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PublicationReactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput> | Prisma.PublicationReactionCreateWithoutUserInput[] | Prisma.PublicationReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutUserInput | Prisma.PublicationReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PublicationReactionCreateManyUserInputEnvelope;
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
};
export type PublicationReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput> | Prisma.PublicationReactionCreateWithoutUserInput[] | Prisma.PublicationReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutUserInput | Prisma.PublicationReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PublicationReactionCreateManyUserInputEnvelope;
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
};
export type PublicationReactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput> | Prisma.PublicationReactionCreateWithoutUserInput[] | Prisma.PublicationReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutUserInput | Prisma.PublicationReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PublicationReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PublicationReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PublicationReactionCreateManyUserInputEnvelope;
    set?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    disconnect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    delete?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    update?: Prisma.PublicationReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PublicationReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PublicationReactionUpdateManyWithWhereWithoutUserInput | Prisma.PublicationReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
};
export type PublicationReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput> | Prisma.PublicationReactionCreateWithoutUserInput[] | Prisma.PublicationReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutUserInput | Prisma.PublicationReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PublicationReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PublicationReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PublicationReactionCreateManyUserInputEnvelope;
    set?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    disconnect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    delete?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    update?: Prisma.PublicationReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PublicationReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PublicationReactionUpdateManyWithWhereWithoutUserInput | Prisma.PublicationReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
};
export type PublicationReactionCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput> | Prisma.PublicationReactionCreateWithoutPublicationInput[] | Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput | Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PublicationReactionCreateManyPublicationInputEnvelope;
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
};
export type PublicationReactionUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput> | Prisma.PublicationReactionCreateWithoutPublicationInput[] | Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput | Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PublicationReactionCreateManyPublicationInputEnvelope;
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
};
export type PublicationReactionUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput> | Prisma.PublicationReactionCreateWithoutPublicationInput[] | Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput | Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PublicationReactionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PublicationReactionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PublicationReactionCreateManyPublicationInputEnvelope;
    set?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    disconnect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    delete?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    update?: Prisma.PublicationReactionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PublicationReactionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PublicationReactionUpdateManyWithWhereWithoutPublicationInput | Prisma.PublicationReactionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
};
export type PublicationReactionUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput> | Prisma.PublicationReactionCreateWithoutPublicationInput[] | Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput | Prisma.PublicationReactionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PublicationReactionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PublicationReactionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PublicationReactionCreateManyPublicationInputEnvelope;
    set?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    disconnect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    delete?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    connect?: Prisma.PublicationReactionWhereUniqueInput | Prisma.PublicationReactionWhereUniqueInput[];
    update?: Prisma.PublicationReactionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PublicationReactionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PublicationReactionUpdateManyWithWhereWithoutPublicationInput | Prisma.PublicationReactionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
};
export type EnumReactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReactionType;
};
export type PublicationReactionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutReactionsInput;
};
export type PublicationReactionUncheckedCreateWithoutUserInput = {
    id?: string;
    publicationId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionCreateOrConnectWithoutUserInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput>;
};
export type PublicationReactionCreateManyUserInputEnvelope = {
    data: Prisma.PublicationReactionCreateManyUserInput | Prisma.PublicationReactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PublicationReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PublicationReactionUpdateWithoutUserInput, Prisma.PublicationReactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PublicationReactionCreateWithoutUserInput, Prisma.PublicationReactionUncheckedCreateWithoutUserInput>;
};
export type PublicationReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateWithoutUserInput, Prisma.PublicationReactionUncheckedUpdateWithoutUserInput>;
};
export type PublicationReactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PublicationReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateManyMutationInput, Prisma.PublicationReactionUncheckedUpdateManyWithoutUserInput>;
};
export type PublicationReactionScalarWhereInput = {
    AND?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
    OR?: Prisma.PublicationReactionScalarWhereInput[];
    NOT?: Prisma.PublicationReactionScalarWhereInput | Prisma.PublicationReactionScalarWhereInput[];
    id?: Prisma.UuidFilter<"PublicationReaction"> | string;
    userId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    publicationId?: Prisma.UuidFilter<"PublicationReaction"> | string;
    type?: Prisma.EnumReactionTypeFilter<"PublicationReaction"> | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFilter<"PublicationReaction"> | Date | string;
};
export type PublicationReactionCreateWithoutPublicationInput = {
    id?: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPublicationReactionsInput;
};
export type PublicationReactionUncheckedCreateWithoutPublicationInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionCreateOrConnectWithoutPublicationInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput>;
};
export type PublicationReactionCreateManyPublicationInputEnvelope = {
    data: Prisma.PublicationReactionCreateManyPublicationInput | Prisma.PublicationReactionCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type PublicationReactionUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PublicationReactionUpdateWithoutPublicationInput, Prisma.PublicationReactionUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.PublicationReactionCreateWithoutPublicationInput, Prisma.PublicationReactionUncheckedCreateWithoutPublicationInput>;
};
export type PublicationReactionUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PublicationReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateWithoutPublicationInput, Prisma.PublicationReactionUncheckedUpdateWithoutPublicationInput>;
};
export type PublicationReactionUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.PublicationReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateManyMutationInput, Prisma.PublicationReactionUncheckedUpdateManyWithoutPublicationInput>;
};
export type PublicationReactionCreateManyUserInput = {
    id?: string;
    publicationId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutReactionsNestedInput;
};
export type PublicationReactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionCreateManyPublicationInput = {
    id?: string;
    userId: string;
    type: $Enums.ReactionType;
    createdAt?: Date | string;
};
export type PublicationReactionUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPublicationReactionsNestedInput;
};
export type PublicationReactionUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumReactionTypeFieldUpdateOperationsInput | $Enums.ReactionType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PublicationReactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationReaction"]>;
export type PublicationReactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationReaction"]>;
export type PublicationReactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    type?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationReaction"]>;
export type PublicationReactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    publicationId?: boolean;
    type?: boolean;
    createdAt?: boolean;
};
export type PublicationReactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "publicationId" | "type" | "createdAt", ExtArgs["result"]["publicationReaction"]>;
export type PublicationReactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type PublicationReactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type PublicationReactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type $PublicationReactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PublicationReaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        publicationId: string;
        type: $Enums.ReactionType;
        createdAt: Date;
    }, ExtArgs["result"]["publicationReaction"]>;
    composites: {};
};
export type PublicationReactionGetPayload<S extends boolean | null | undefined | PublicationReactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload, S>;
export type PublicationReactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PublicationReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PublicationReactionCountAggregateInputType | true;
};
export interface PublicationReactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PublicationReaction'];
        meta: {
            name: 'PublicationReaction';
        };
    };
    findUnique<T extends PublicationReactionFindUniqueArgs>(args: Prisma.SelectSubset<T, PublicationReactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PublicationReactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PublicationReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PublicationReactionFindFirstArgs>(args?: Prisma.SelectSubset<T, PublicationReactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PublicationReactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PublicationReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PublicationReactionFindManyArgs>(args?: Prisma.SelectSubset<T, PublicationReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PublicationReactionCreateArgs>(args: Prisma.SelectSubset<T, PublicationReactionCreateArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PublicationReactionCreateManyArgs>(args?: Prisma.SelectSubset<T, PublicationReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PublicationReactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PublicationReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PublicationReactionDeleteArgs>(args: Prisma.SelectSubset<T, PublicationReactionDeleteArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PublicationReactionUpdateArgs>(args: Prisma.SelectSubset<T, PublicationReactionUpdateArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PublicationReactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PublicationReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PublicationReactionUpdateManyArgs>(args: Prisma.SelectSubset<T, PublicationReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PublicationReactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PublicationReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PublicationReactionUpsertArgs>(args: Prisma.SelectSubset<T, PublicationReactionUpsertArgs<ExtArgs>>): Prisma.Prisma__PublicationReactionClient<runtime.Types.Result.GetResult<Prisma.$PublicationReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PublicationReactionCountArgs>(args?: Prisma.Subset<T, PublicationReactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PublicationReactionCountAggregateOutputType> : number>;
    aggregate<T extends PublicationReactionAggregateArgs>(args: Prisma.Subset<T, PublicationReactionAggregateArgs>): Prisma.PrismaPromise<GetPublicationReactionAggregateType<T>>;
    groupBy<T extends PublicationReactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PublicationReactionGroupByArgs['orderBy'];
    } : {
        orderBy?: PublicationReactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PublicationReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PublicationReactionFieldRefs;
}
export interface Prisma__PublicationReactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PublicationReactionFieldRefs {
    readonly id: Prisma.FieldRef<"PublicationReaction", 'String'>;
    readonly userId: Prisma.FieldRef<"PublicationReaction", 'String'>;
    readonly publicationId: Prisma.FieldRef<"PublicationReaction", 'String'>;
    readonly type: Prisma.FieldRef<"PublicationReaction", 'ReactionType'>;
    readonly createdAt: Prisma.FieldRef<"PublicationReaction", 'DateTime'>;
}
export type PublicationReactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where: Prisma.PublicationReactionWhereUniqueInput;
};
export type PublicationReactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where: Prisma.PublicationReactionWhereUniqueInput;
};
export type PublicationReactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where?: Prisma.PublicationReactionWhereInput;
    orderBy?: Prisma.PublicationReactionOrderByWithRelationInput | Prisma.PublicationReactionOrderByWithRelationInput[];
    cursor?: Prisma.PublicationReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationReactionScalarFieldEnum | Prisma.PublicationReactionScalarFieldEnum[];
};
export type PublicationReactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where?: Prisma.PublicationReactionWhereInput;
    orderBy?: Prisma.PublicationReactionOrderByWithRelationInput | Prisma.PublicationReactionOrderByWithRelationInput[];
    cursor?: Prisma.PublicationReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationReactionScalarFieldEnum | Prisma.PublicationReactionScalarFieldEnum[];
};
export type PublicationReactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where?: Prisma.PublicationReactionWhereInput;
    orderBy?: Prisma.PublicationReactionOrderByWithRelationInput | Prisma.PublicationReactionOrderByWithRelationInput[];
    cursor?: Prisma.PublicationReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationReactionScalarFieldEnum | Prisma.PublicationReactionScalarFieldEnum[];
};
export type PublicationReactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationReactionCreateInput, Prisma.PublicationReactionUncheckedCreateInput>;
};
export type PublicationReactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PublicationReactionCreateManyInput | Prisma.PublicationReactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationReactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    data: Prisma.PublicationReactionCreateManyInput | Prisma.PublicationReactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PublicationReactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PublicationReactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateInput, Prisma.PublicationReactionUncheckedUpdateInput>;
    where: Prisma.PublicationReactionWhereUniqueInput;
};
export type PublicationReactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PublicationReactionUpdateManyMutationInput, Prisma.PublicationReactionUncheckedUpdateManyInput>;
    where?: Prisma.PublicationReactionWhereInput;
    limit?: number;
};
export type PublicationReactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationReactionUpdateManyMutationInput, Prisma.PublicationReactionUncheckedUpdateManyInput>;
    where?: Prisma.PublicationReactionWhereInput;
    limit?: number;
    include?: Prisma.PublicationReactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PublicationReactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where: Prisma.PublicationReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationReactionCreateInput, Prisma.PublicationReactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PublicationReactionUpdateInput, Prisma.PublicationReactionUncheckedUpdateInput>;
};
export type PublicationReactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
    where: Prisma.PublicationReactionWhereUniqueInput;
};
export type PublicationReactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationReactionWhereInput;
    limit?: number;
};
export type PublicationReactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationReactionSelect<ExtArgs> | null;
    omit?: Prisma.PublicationReactionOmit<ExtArgs> | null;
    include?: Prisma.PublicationReactionInclude<ExtArgs> | null;
};
export {};
