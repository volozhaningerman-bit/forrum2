import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WallPostModel = runtime.Types.Result.DefaultSelection<Prisma.$WallPostPayload>;
export type AggregateWallPost = {
    _count: WallPostCountAggregateOutputType | null;
    _min: WallPostMinAggregateOutputType | null;
    _max: WallPostMaxAggregateOutputType | null;
};
export type WallPostMinAggregateOutputType = {
    id: string | null;
    profileUserId: string | null;
    authorId: string | null;
    body: string | null;
    hiddenAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WallPostMaxAggregateOutputType = {
    id: string | null;
    profileUserId: string | null;
    authorId: string | null;
    body: string | null;
    hiddenAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WallPostCountAggregateOutputType = {
    id: number;
    profileUserId: number;
    authorId: number;
    body: number;
    hiddenAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WallPostMinAggregateInputType = {
    id?: true;
    profileUserId?: true;
    authorId?: true;
    body?: true;
    hiddenAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WallPostMaxAggregateInputType = {
    id?: true;
    profileUserId?: true;
    authorId?: true;
    body?: true;
    hiddenAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WallPostCountAggregateInputType = {
    id?: true;
    profileUserId?: true;
    authorId?: true;
    body?: true;
    hiddenAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WallPostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WallPostWhereInput;
    orderBy?: Prisma.WallPostOrderByWithRelationInput | Prisma.WallPostOrderByWithRelationInput[];
    cursor?: Prisma.WallPostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WallPostCountAggregateInputType;
    _min?: WallPostMinAggregateInputType;
    _max?: WallPostMaxAggregateInputType;
};
export type GetWallPostAggregateType<T extends WallPostAggregateArgs> = {
    [P in keyof T & keyof AggregateWallPost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWallPost[P]> : Prisma.GetScalarType<T[P], AggregateWallPost[P]>;
};
export type WallPostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WallPostWhereInput;
    orderBy?: Prisma.WallPostOrderByWithAggregationInput | Prisma.WallPostOrderByWithAggregationInput[];
    by: Prisma.WallPostScalarFieldEnum[] | Prisma.WallPostScalarFieldEnum;
    having?: Prisma.WallPostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WallPostCountAggregateInputType | true;
    _min?: WallPostMinAggregateInputType;
    _max?: WallPostMaxAggregateInputType;
};
export type WallPostGroupByOutputType = {
    id: string;
    profileUserId: string;
    authorId: string;
    body: string;
    hiddenAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WallPostCountAggregateOutputType | null;
    _min: WallPostMinAggregateOutputType | null;
    _max: WallPostMaxAggregateOutputType | null;
};
type GetWallPostGroupByPayload<T extends WallPostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WallPostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WallPostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WallPostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WallPostGroupByOutputType[P]>;
}>>;
export type WallPostWhereInput = {
    AND?: Prisma.WallPostWhereInput | Prisma.WallPostWhereInput[];
    OR?: Prisma.WallPostWhereInput[];
    NOT?: Prisma.WallPostWhereInput | Prisma.WallPostWhereInput[];
    id?: Prisma.UuidFilter<"WallPost"> | string;
    profileUserId?: Prisma.UuidFilter<"WallPost"> | string;
    authorId?: Prisma.UuidFilter<"WallPost"> | string;
    body?: Prisma.StringFilter<"WallPost"> | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"WallPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
    profileUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type WallPostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    profileUserId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    profileUser?: Prisma.UserOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
};
export type WallPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WallPostWhereInput | Prisma.WallPostWhereInput[];
    OR?: Prisma.WallPostWhereInput[];
    NOT?: Prisma.WallPostWhereInput | Prisma.WallPostWhereInput[];
    profileUserId?: Prisma.UuidFilter<"WallPost"> | string;
    authorId?: Prisma.UuidFilter<"WallPost"> | string;
    body?: Prisma.StringFilter<"WallPost"> | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"WallPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
    profileUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type WallPostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    profileUserId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WallPostCountOrderByAggregateInput;
    _max?: Prisma.WallPostMaxOrderByAggregateInput;
    _min?: Prisma.WallPostMinOrderByAggregateInput;
};
export type WallPostScalarWhereWithAggregatesInput = {
    AND?: Prisma.WallPostScalarWhereWithAggregatesInput | Prisma.WallPostScalarWhereWithAggregatesInput[];
    OR?: Prisma.WallPostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WallPostScalarWhereWithAggregatesInput | Prisma.WallPostScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"WallPost"> | string;
    profileUserId?: Prisma.UuidWithAggregatesFilter<"WallPost"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"WallPost"> | string;
    body?: Prisma.StringWithAggregatesFilter<"WallPost"> | string;
    hiddenAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WallPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WallPost"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WallPost"> | Date | string;
};
export type WallPostCreateInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profileUser: Prisma.UserCreateNestedOneWithoutWallReceivedInput;
    author: Prisma.UserCreateNestedOneWithoutWallAuthoredInput;
};
export type WallPostUncheckedCreateInput = {
    id?: string;
    profileUserId: string;
    authorId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profileUser?: Prisma.UserUpdateOneRequiredWithoutWallReceivedNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutWallAuthoredNestedInput;
};
export type WallPostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profileUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostCreateManyInput = {
    id?: string;
    profileUserId: string;
    authorId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profileUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostListRelationFilter = {
    every?: Prisma.WallPostWhereInput;
    some?: Prisma.WallPostWhereInput;
    none?: Prisma.WallPostWhereInput;
};
export type WallPostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WallPostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profileUserId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WallPostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profileUserId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WallPostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    profileUserId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WallPostCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput> | Prisma.WallPostCreateWithoutAuthorInput[] | Prisma.WallPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutAuthorInput | Prisma.WallPostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.WallPostCreateManyAuthorInputEnvelope;
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
};
export type WallPostCreateNestedManyWithoutProfileUserInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput> | Prisma.WallPostCreateWithoutProfileUserInput[] | Prisma.WallPostUncheckedCreateWithoutProfileUserInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutProfileUserInput | Prisma.WallPostCreateOrConnectWithoutProfileUserInput[];
    createMany?: Prisma.WallPostCreateManyProfileUserInputEnvelope;
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
};
export type WallPostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput> | Prisma.WallPostCreateWithoutAuthorInput[] | Prisma.WallPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutAuthorInput | Prisma.WallPostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.WallPostCreateManyAuthorInputEnvelope;
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
};
export type WallPostUncheckedCreateNestedManyWithoutProfileUserInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput> | Prisma.WallPostCreateWithoutProfileUserInput[] | Prisma.WallPostUncheckedCreateWithoutProfileUserInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutProfileUserInput | Prisma.WallPostCreateOrConnectWithoutProfileUserInput[];
    createMany?: Prisma.WallPostCreateManyProfileUserInputEnvelope;
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
};
export type WallPostUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput> | Prisma.WallPostCreateWithoutAuthorInput[] | Prisma.WallPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutAuthorInput | Prisma.WallPostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.WallPostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.WallPostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.WallPostCreateManyAuthorInputEnvelope;
    set?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    disconnect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    delete?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    update?: Prisma.WallPostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.WallPostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.WallPostUpdateManyWithWhereWithoutAuthorInput | Prisma.WallPostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
};
export type WallPostUpdateManyWithoutProfileUserNestedInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput> | Prisma.WallPostCreateWithoutProfileUserInput[] | Prisma.WallPostUncheckedCreateWithoutProfileUserInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutProfileUserInput | Prisma.WallPostCreateOrConnectWithoutProfileUserInput[];
    upsert?: Prisma.WallPostUpsertWithWhereUniqueWithoutProfileUserInput | Prisma.WallPostUpsertWithWhereUniqueWithoutProfileUserInput[];
    createMany?: Prisma.WallPostCreateManyProfileUserInputEnvelope;
    set?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    disconnect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    delete?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    update?: Prisma.WallPostUpdateWithWhereUniqueWithoutProfileUserInput | Prisma.WallPostUpdateWithWhereUniqueWithoutProfileUserInput[];
    updateMany?: Prisma.WallPostUpdateManyWithWhereWithoutProfileUserInput | Prisma.WallPostUpdateManyWithWhereWithoutProfileUserInput[];
    deleteMany?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
};
export type WallPostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput> | Prisma.WallPostCreateWithoutAuthorInput[] | Prisma.WallPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutAuthorInput | Prisma.WallPostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.WallPostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.WallPostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.WallPostCreateManyAuthorInputEnvelope;
    set?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    disconnect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    delete?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    update?: Prisma.WallPostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.WallPostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.WallPostUpdateManyWithWhereWithoutAuthorInput | Prisma.WallPostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
};
export type WallPostUncheckedUpdateManyWithoutProfileUserNestedInput = {
    create?: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput> | Prisma.WallPostCreateWithoutProfileUserInput[] | Prisma.WallPostUncheckedCreateWithoutProfileUserInput[];
    connectOrCreate?: Prisma.WallPostCreateOrConnectWithoutProfileUserInput | Prisma.WallPostCreateOrConnectWithoutProfileUserInput[];
    upsert?: Prisma.WallPostUpsertWithWhereUniqueWithoutProfileUserInput | Prisma.WallPostUpsertWithWhereUniqueWithoutProfileUserInput[];
    createMany?: Prisma.WallPostCreateManyProfileUserInputEnvelope;
    set?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    disconnect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    delete?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    connect?: Prisma.WallPostWhereUniqueInput | Prisma.WallPostWhereUniqueInput[];
    update?: Prisma.WallPostUpdateWithWhereUniqueWithoutProfileUserInput | Prisma.WallPostUpdateWithWhereUniqueWithoutProfileUserInput[];
    updateMany?: Prisma.WallPostUpdateManyWithWhereWithoutProfileUserInput | Prisma.WallPostUpdateManyWithWhereWithoutProfileUserInput[];
    deleteMany?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
};
export type WallPostCreateWithoutAuthorInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profileUser: Prisma.UserCreateNestedOneWithoutWallReceivedInput;
};
export type WallPostUncheckedCreateWithoutAuthorInput = {
    id?: string;
    profileUserId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostCreateOrConnectWithoutAuthorInput = {
    where: Prisma.WallPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput>;
};
export type WallPostCreateManyAuthorInputEnvelope = {
    data: Prisma.WallPostCreateManyAuthorInput | Prisma.WallPostCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type WallPostCreateWithoutProfileUserInput = {
    id?: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutWallAuthoredInput;
};
export type WallPostUncheckedCreateWithoutProfileUserInput = {
    id?: string;
    authorId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostCreateOrConnectWithoutProfileUserInput = {
    where: Prisma.WallPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput>;
};
export type WallPostCreateManyProfileUserInputEnvelope = {
    data: Prisma.WallPostCreateManyProfileUserInput | Prisma.WallPostCreateManyProfileUserInput[];
    skipDuplicates?: boolean;
};
export type WallPostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.WallPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.WallPostUpdateWithoutAuthorInput, Prisma.WallPostUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.WallPostCreateWithoutAuthorInput, Prisma.WallPostUncheckedCreateWithoutAuthorInput>;
};
export type WallPostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.WallPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.WallPostUpdateWithoutAuthorInput, Prisma.WallPostUncheckedUpdateWithoutAuthorInput>;
};
export type WallPostUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.WallPostScalarWhereInput;
    data: Prisma.XOR<Prisma.WallPostUpdateManyMutationInput, Prisma.WallPostUncheckedUpdateManyWithoutAuthorInput>;
};
export type WallPostScalarWhereInput = {
    AND?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
    OR?: Prisma.WallPostScalarWhereInput[];
    NOT?: Prisma.WallPostScalarWhereInput | Prisma.WallPostScalarWhereInput[];
    id?: Prisma.UuidFilter<"WallPost"> | string;
    profileUserId?: Prisma.UuidFilter<"WallPost"> | string;
    authorId?: Prisma.UuidFilter<"WallPost"> | string;
    body?: Prisma.StringFilter<"WallPost"> | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"WallPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WallPost"> | Date | string;
};
export type WallPostUpsertWithWhereUniqueWithoutProfileUserInput = {
    where: Prisma.WallPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.WallPostUpdateWithoutProfileUserInput, Prisma.WallPostUncheckedUpdateWithoutProfileUserInput>;
    create: Prisma.XOR<Prisma.WallPostCreateWithoutProfileUserInput, Prisma.WallPostUncheckedCreateWithoutProfileUserInput>;
};
export type WallPostUpdateWithWhereUniqueWithoutProfileUserInput = {
    where: Prisma.WallPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.WallPostUpdateWithoutProfileUserInput, Prisma.WallPostUncheckedUpdateWithoutProfileUserInput>;
};
export type WallPostUpdateManyWithWhereWithoutProfileUserInput = {
    where: Prisma.WallPostScalarWhereInput;
    data: Prisma.XOR<Prisma.WallPostUpdateManyMutationInput, Prisma.WallPostUncheckedUpdateManyWithoutProfileUserInput>;
};
export type WallPostCreateManyAuthorInput = {
    id?: string;
    profileUserId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostCreateManyProfileUserInput = {
    id?: string;
    authorId: string;
    body: string;
    hiddenAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WallPostUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profileUser?: Prisma.UserUpdateOneRequiredWithoutWallReceivedNestedInput;
};
export type WallPostUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profileUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    profileUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostUpdateWithoutProfileUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutWallAuthoredNestedInput;
};
export type WallPostUncheckedUpdateWithoutProfileUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostUncheckedUpdateManyWithoutProfileUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WallPostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profileUserId?: boolean;
    authorId?: boolean;
    body?: boolean;
    hiddenAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallPost"]>;
export type WallPostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profileUserId?: boolean;
    authorId?: boolean;
    body?: boolean;
    hiddenAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallPost"]>;
export type WallPostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    profileUserId?: boolean;
    authorId?: boolean;
    body?: boolean;
    hiddenAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallPost"]>;
export type WallPostSelectScalar = {
    id?: boolean;
    profileUserId?: boolean;
    authorId?: boolean;
    body?: boolean;
    hiddenAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WallPostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "profileUserId" | "authorId" | "body" | "hiddenAt" | "createdAt" | "updatedAt", ExtArgs["result"]["wallPost"]>;
export type WallPostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WallPostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WallPostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profileUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $WallPostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WallPost";
    objects: {
        profileUser: Prisma.$UserPayload<ExtArgs>;
        author: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        profileUserId: string;
        authorId: string;
        body: string;
        hiddenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["wallPost"]>;
    composites: {};
};
export type WallPostGetPayload<S extends boolean | null | undefined | WallPostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WallPostPayload, S>;
export type WallPostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WallPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WallPostCountAggregateInputType | true;
};
export interface WallPostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WallPost'];
        meta: {
            name: 'WallPost';
        };
    };
    findUnique<T extends WallPostFindUniqueArgs>(args: Prisma.SelectSubset<T, WallPostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WallPostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WallPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WallPostFindFirstArgs>(args?: Prisma.SelectSubset<T, WallPostFindFirstArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WallPostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WallPostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WallPostFindManyArgs>(args?: Prisma.SelectSubset<T, WallPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WallPostCreateArgs>(args: Prisma.SelectSubset<T, WallPostCreateArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WallPostCreateManyArgs>(args?: Prisma.SelectSubset<T, WallPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WallPostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WallPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WallPostDeleteArgs>(args: Prisma.SelectSubset<T, WallPostDeleteArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WallPostUpdateArgs>(args: Prisma.SelectSubset<T, WallPostUpdateArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WallPostDeleteManyArgs>(args?: Prisma.SelectSubset<T, WallPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WallPostUpdateManyArgs>(args: Prisma.SelectSubset<T, WallPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WallPostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WallPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WallPostUpsertArgs>(args: Prisma.SelectSubset<T, WallPostUpsertArgs<ExtArgs>>): Prisma.Prisma__WallPostClient<runtime.Types.Result.GetResult<Prisma.$WallPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WallPostCountArgs>(args?: Prisma.Subset<T, WallPostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WallPostCountAggregateOutputType> : number>;
    aggregate<T extends WallPostAggregateArgs>(args: Prisma.Subset<T, WallPostAggregateArgs>): Prisma.PrismaPromise<GetWallPostAggregateType<T>>;
    groupBy<T extends WallPostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WallPostGroupByArgs['orderBy'];
    } : {
        orderBy?: WallPostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WallPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWallPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WallPostFieldRefs;
}
export interface Prisma__WallPostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profileUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WallPostFieldRefs {
    readonly id: Prisma.FieldRef<"WallPost", 'String'>;
    readonly profileUserId: Prisma.FieldRef<"WallPost", 'String'>;
    readonly authorId: Prisma.FieldRef<"WallPost", 'String'>;
    readonly body: Prisma.FieldRef<"WallPost", 'String'>;
    readonly hiddenAt: Prisma.FieldRef<"WallPost", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"WallPost", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WallPost", 'DateTime'>;
}
export type WallPostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where: Prisma.WallPostWhereUniqueInput;
};
export type WallPostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where: Prisma.WallPostWhereUniqueInput;
};
export type WallPostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where?: Prisma.WallPostWhereInput;
    orderBy?: Prisma.WallPostOrderByWithRelationInput | Prisma.WallPostOrderByWithRelationInput[];
    cursor?: Prisma.WallPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WallPostScalarFieldEnum | Prisma.WallPostScalarFieldEnum[];
};
export type WallPostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where?: Prisma.WallPostWhereInput;
    orderBy?: Prisma.WallPostOrderByWithRelationInput | Prisma.WallPostOrderByWithRelationInput[];
    cursor?: Prisma.WallPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WallPostScalarFieldEnum | Prisma.WallPostScalarFieldEnum[];
};
export type WallPostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where?: Prisma.WallPostWhereInput;
    orderBy?: Prisma.WallPostOrderByWithRelationInput | Prisma.WallPostOrderByWithRelationInput[];
    cursor?: Prisma.WallPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WallPostScalarFieldEnum | Prisma.WallPostScalarFieldEnum[];
};
export type WallPostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WallPostCreateInput, Prisma.WallPostUncheckedCreateInput>;
};
export type WallPostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WallPostCreateManyInput | Prisma.WallPostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WallPostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    data: Prisma.WallPostCreateManyInput | Prisma.WallPostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WallPostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WallPostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WallPostUpdateInput, Prisma.WallPostUncheckedUpdateInput>;
    where: Prisma.WallPostWhereUniqueInput;
};
export type WallPostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WallPostUpdateManyMutationInput, Prisma.WallPostUncheckedUpdateManyInput>;
    where?: Prisma.WallPostWhereInput;
    limit?: number;
};
export type WallPostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WallPostUpdateManyMutationInput, Prisma.WallPostUncheckedUpdateManyInput>;
    where?: Prisma.WallPostWhereInput;
    limit?: number;
    include?: Prisma.WallPostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WallPostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where: Prisma.WallPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.WallPostCreateInput, Prisma.WallPostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WallPostUpdateInput, Prisma.WallPostUncheckedUpdateInput>;
};
export type WallPostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
    where: Prisma.WallPostWhereUniqueInput;
};
export type WallPostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WallPostWhereInput;
    limit?: number;
};
export type WallPostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WallPostSelect<ExtArgs> | null;
    omit?: Prisma.WallPostOmit<ExtArgs> | null;
    include?: Prisma.WallPostInclude<ExtArgs> | null;
};
export {};
