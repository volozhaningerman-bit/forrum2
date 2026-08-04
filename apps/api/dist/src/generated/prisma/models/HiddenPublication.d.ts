import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HiddenPublicationModel = runtime.Types.Result.DefaultSelection<Prisma.$HiddenPublicationPayload>;
export type AggregateHiddenPublication = {
    _count: HiddenPublicationCountAggregateOutputType | null;
    _min: HiddenPublicationMinAggregateOutputType | null;
    _max: HiddenPublicationMaxAggregateOutputType | null;
};
export type HiddenPublicationMinAggregateOutputType = {
    userId: string | null;
    publicationId: string | null;
    createdAt: Date | null;
};
export type HiddenPublicationMaxAggregateOutputType = {
    userId: string | null;
    publicationId: string | null;
    createdAt: Date | null;
};
export type HiddenPublicationCountAggregateOutputType = {
    userId: number;
    publicationId: number;
    createdAt: number;
    _all: number;
};
export type HiddenPublicationMinAggregateInputType = {
    userId?: true;
    publicationId?: true;
    createdAt?: true;
};
export type HiddenPublicationMaxAggregateInputType = {
    userId?: true;
    publicationId?: true;
    createdAt?: true;
};
export type HiddenPublicationCountAggregateInputType = {
    userId?: true;
    publicationId?: true;
    createdAt?: true;
    _all?: true;
};
export type HiddenPublicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenPublicationWhereInput;
    orderBy?: Prisma.HiddenPublicationOrderByWithRelationInput | Prisma.HiddenPublicationOrderByWithRelationInput[];
    cursor?: Prisma.HiddenPublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HiddenPublicationCountAggregateInputType;
    _min?: HiddenPublicationMinAggregateInputType;
    _max?: HiddenPublicationMaxAggregateInputType;
};
export type GetHiddenPublicationAggregateType<T extends HiddenPublicationAggregateArgs> = {
    [P in keyof T & keyof AggregateHiddenPublication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHiddenPublication[P]> : Prisma.GetScalarType<T[P], AggregateHiddenPublication[P]>;
};
export type HiddenPublicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenPublicationWhereInput;
    orderBy?: Prisma.HiddenPublicationOrderByWithAggregationInput | Prisma.HiddenPublicationOrderByWithAggregationInput[];
    by: Prisma.HiddenPublicationScalarFieldEnum[] | Prisma.HiddenPublicationScalarFieldEnum;
    having?: Prisma.HiddenPublicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HiddenPublicationCountAggregateInputType | true;
    _min?: HiddenPublicationMinAggregateInputType;
    _max?: HiddenPublicationMaxAggregateInputType;
};
export type HiddenPublicationGroupByOutputType = {
    userId: string;
    publicationId: string;
    createdAt: Date;
    _count: HiddenPublicationCountAggregateOutputType | null;
    _min: HiddenPublicationMinAggregateOutputType | null;
    _max: HiddenPublicationMaxAggregateOutputType | null;
};
type GetHiddenPublicationGroupByPayload<T extends HiddenPublicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HiddenPublicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HiddenPublicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HiddenPublicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HiddenPublicationGroupByOutputType[P]>;
}>>;
export type HiddenPublicationWhereInput = {
    AND?: Prisma.HiddenPublicationWhereInput | Prisma.HiddenPublicationWhereInput[];
    OR?: Prisma.HiddenPublicationWhereInput[];
    NOT?: Prisma.HiddenPublicationWhereInput | Prisma.HiddenPublicationWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    publicationId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenPublication"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
};
export type HiddenPublicationOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
};
export type HiddenPublicationWhereUniqueInput = Prisma.AtLeast<{
    userId_publicationId?: Prisma.HiddenPublicationUserIdPublicationIdCompoundUniqueInput;
    AND?: Prisma.HiddenPublicationWhereInput | Prisma.HiddenPublicationWhereInput[];
    OR?: Prisma.HiddenPublicationWhereInput[];
    NOT?: Prisma.HiddenPublicationWhereInput | Prisma.HiddenPublicationWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    publicationId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenPublication"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
}, "userId_publicationId">;
export type HiddenPublicationOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HiddenPublicationCountOrderByAggregateInput;
    _max?: Prisma.HiddenPublicationMaxOrderByAggregateInput;
    _min?: Prisma.HiddenPublicationMinOrderByAggregateInput;
};
export type HiddenPublicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.HiddenPublicationScalarWhereWithAggregatesInput | Prisma.HiddenPublicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.HiddenPublicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HiddenPublicationScalarWhereWithAggregatesInput | Prisma.HiddenPublicationScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"HiddenPublication"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"HiddenPublication"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HiddenPublication"> | Date | string;
};
export type HiddenPublicationCreateInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHiddenPublicationsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutHiddenByInput;
};
export type HiddenPublicationUncheckedCreateInput = {
    userId: string;
    publicationId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHiddenPublicationsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutHiddenByNestedInput;
};
export type HiddenPublicationUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationCreateManyInput = {
    userId: string;
    publicationId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationListRelationFilter = {
    every?: Prisma.HiddenPublicationWhereInput;
    some?: Prisma.HiddenPublicationWhereInput;
    none?: Prisma.HiddenPublicationWhereInput;
};
export type HiddenPublicationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HiddenPublicationUserIdPublicationIdCompoundUniqueInput = {
    userId: string;
    publicationId: string;
};
export type HiddenPublicationCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenPublicationMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenPublicationMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HiddenPublicationCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput> | Prisma.HiddenPublicationCreateWithoutUserInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutUserInput | Prisma.HiddenPublicationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HiddenPublicationCreateManyUserInputEnvelope;
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
};
export type HiddenPublicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput> | Prisma.HiddenPublicationCreateWithoutUserInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutUserInput | Prisma.HiddenPublicationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HiddenPublicationCreateManyUserInputEnvelope;
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
};
export type HiddenPublicationUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput> | Prisma.HiddenPublicationCreateWithoutUserInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutUserInput | Prisma.HiddenPublicationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutUserInput | Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HiddenPublicationCreateManyUserInputEnvelope;
    set?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    disconnect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    delete?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    update?: Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutUserInput | Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HiddenPublicationUpdateManyWithWhereWithoutUserInput | Prisma.HiddenPublicationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
};
export type HiddenPublicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput> | Prisma.HiddenPublicationCreateWithoutUserInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutUserInput | Prisma.HiddenPublicationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutUserInput | Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HiddenPublicationCreateManyUserInputEnvelope;
    set?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    disconnect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    delete?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    update?: Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutUserInput | Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HiddenPublicationUpdateManyWithWhereWithoutUserInput | Prisma.HiddenPublicationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
};
export type HiddenPublicationCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput> | Prisma.HiddenPublicationCreateWithoutPublicationInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput | Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.HiddenPublicationCreateManyPublicationInputEnvelope;
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
};
export type HiddenPublicationUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput> | Prisma.HiddenPublicationCreateWithoutPublicationInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput | Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.HiddenPublicationCreateManyPublicationInputEnvelope;
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
};
export type HiddenPublicationUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput> | Prisma.HiddenPublicationCreateWithoutPublicationInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput | Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutPublicationInput | Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.HiddenPublicationCreateManyPublicationInputEnvelope;
    set?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    disconnect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    delete?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    update?: Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutPublicationInput | Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.HiddenPublicationUpdateManyWithWhereWithoutPublicationInput | Prisma.HiddenPublicationUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
};
export type HiddenPublicationUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput> | Prisma.HiddenPublicationCreateWithoutPublicationInput[] | Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput | Prisma.HiddenPublicationCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutPublicationInput | Prisma.HiddenPublicationUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.HiddenPublicationCreateManyPublicationInputEnvelope;
    set?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    disconnect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    delete?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    connect?: Prisma.HiddenPublicationWhereUniqueInput | Prisma.HiddenPublicationWhereUniqueInput[];
    update?: Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutPublicationInput | Prisma.HiddenPublicationUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.HiddenPublicationUpdateManyWithWhereWithoutPublicationInput | Prisma.HiddenPublicationUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
};
export type HiddenPublicationCreateWithoutUserInput = {
    createdAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutHiddenByInput;
};
export type HiddenPublicationUncheckedCreateWithoutUserInput = {
    publicationId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationCreateOrConnectWithoutUserInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput>;
};
export type HiddenPublicationCreateManyUserInputEnvelope = {
    data: Prisma.HiddenPublicationCreateManyUserInput | Prisma.HiddenPublicationCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type HiddenPublicationUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    update: Prisma.XOR<Prisma.HiddenPublicationUpdateWithoutUserInput, Prisma.HiddenPublicationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutUserInput, Prisma.HiddenPublicationUncheckedCreateWithoutUserInput>;
};
export type HiddenPublicationUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateWithoutUserInput, Prisma.HiddenPublicationUncheckedUpdateWithoutUserInput>;
};
export type HiddenPublicationUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.HiddenPublicationScalarWhereInput;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateManyMutationInput, Prisma.HiddenPublicationUncheckedUpdateManyWithoutUserInput>;
};
export type HiddenPublicationScalarWhereInput = {
    AND?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
    OR?: Prisma.HiddenPublicationScalarWhereInput[];
    NOT?: Prisma.HiddenPublicationScalarWhereInput | Prisma.HiddenPublicationScalarWhereInput[];
    userId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    publicationId?: Prisma.UuidFilter<"HiddenPublication"> | string;
    createdAt?: Prisma.DateTimeFilter<"HiddenPublication"> | Date | string;
};
export type HiddenPublicationCreateWithoutPublicationInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHiddenPublicationsInput;
};
export type HiddenPublicationUncheckedCreateWithoutPublicationInput = {
    userId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationCreateOrConnectWithoutPublicationInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput>;
};
export type HiddenPublicationCreateManyPublicationInputEnvelope = {
    data: Prisma.HiddenPublicationCreateManyPublicationInput | Prisma.HiddenPublicationCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type HiddenPublicationUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    update: Prisma.XOR<Prisma.HiddenPublicationUpdateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.HiddenPublicationCreateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedCreateWithoutPublicationInput>;
};
export type HiddenPublicationUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.HiddenPublicationWhereUniqueInput;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateWithoutPublicationInput, Prisma.HiddenPublicationUncheckedUpdateWithoutPublicationInput>;
};
export type HiddenPublicationUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.HiddenPublicationScalarWhereInput;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateManyMutationInput, Prisma.HiddenPublicationUncheckedUpdateManyWithoutPublicationInput>;
};
export type HiddenPublicationCreateManyUserInput = {
    publicationId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutHiddenByNestedInput;
};
export type HiddenPublicationUncheckedUpdateWithoutUserInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationUncheckedUpdateManyWithoutUserInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationCreateManyPublicationInput = {
    userId: string;
    createdAt?: Date | string;
};
export type HiddenPublicationUpdateWithoutPublicationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHiddenPublicationsNestedInput;
};
export type HiddenPublicationUncheckedUpdateWithoutPublicationInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationUncheckedUpdateManyWithoutPublicationInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HiddenPublicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    publicationId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenPublication"]>;
export type HiddenPublicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    publicationId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenPublication"]>;
export type HiddenPublicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    publicationId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hiddenPublication"]>;
export type HiddenPublicationSelectScalar = {
    userId?: boolean;
    publicationId?: boolean;
    createdAt?: boolean;
};
export type HiddenPublicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "publicationId" | "createdAt", ExtArgs["result"]["hiddenPublication"]>;
export type HiddenPublicationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type HiddenPublicationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type HiddenPublicationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
};
export type $HiddenPublicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HiddenPublication";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        publicationId: string;
        createdAt: Date;
    }, ExtArgs["result"]["hiddenPublication"]>;
    composites: {};
};
export type HiddenPublicationGetPayload<S extends boolean | null | undefined | HiddenPublicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload, S>;
export type HiddenPublicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HiddenPublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HiddenPublicationCountAggregateInputType | true;
};
export interface HiddenPublicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HiddenPublication'];
        meta: {
            name: 'HiddenPublication';
        };
    };
    findUnique<T extends HiddenPublicationFindUniqueArgs>(args: Prisma.SelectSubset<T, HiddenPublicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HiddenPublicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HiddenPublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HiddenPublicationFindFirstArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HiddenPublicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HiddenPublicationFindManyArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HiddenPublicationCreateArgs>(args: Prisma.SelectSubset<T, HiddenPublicationCreateArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HiddenPublicationCreateManyArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HiddenPublicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HiddenPublicationDeleteArgs>(args: Prisma.SelectSubset<T, HiddenPublicationDeleteArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HiddenPublicationUpdateArgs>(args: Prisma.SelectSubset<T, HiddenPublicationUpdateArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HiddenPublicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, HiddenPublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HiddenPublicationUpdateManyArgs>(args: Prisma.SelectSubset<T, HiddenPublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HiddenPublicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HiddenPublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HiddenPublicationUpsertArgs>(args: Prisma.SelectSubset<T, HiddenPublicationUpsertArgs<ExtArgs>>): Prisma.Prisma__HiddenPublicationClient<runtime.Types.Result.GetResult<Prisma.$HiddenPublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HiddenPublicationCountArgs>(args?: Prisma.Subset<T, HiddenPublicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HiddenPublicationCountAggregateOutputType> : number>;
    aggregate<T extends HiddenPublicationAggregateArgs>(args: Prisma.Subset<T, HiddenPublicationAggregateArgs>): Prisma.PrismaPromise<GetHiddenPublicationAggregateType<T>>;
    groupBy<T extends HiddenPublicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HiddenPublicationGroupByArgs['orderBy'];
    } : {
        orderBy?: HiddenPublicationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HiddenPublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHiddenPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HiddenPublicationFieldRefs;
}
export interface Prisma__HiddenPublicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HiddenPublicationFieldRefs {
    readonly userId: Prisma.FieldRef<"HiddenPublication", 'String'>;
    readonly publicationId: Prisma.FieldRef<"HiddenPublication", 'String'>;
    readonly createdAt: Prisma.FieldRef<"HiddenPublication", 'DateTime'>;
}
export type HiddenPublicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where: Prisma.HiddenPublicationWhereUniqueInput;
};
export type HiddenPublicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where: Prisma.HiddenPublicationWhereUniqueInput;
};
export type HiddenPublicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where?: Prisma.HiddenPublicationWhereInput;
    orderBy?: Prisma.HiddenPublicationOrderByWithRelationInput | Prisma.HiddenPublicationOrderByWithRelationInput[];
    cursor?: Prisma.HiddenPublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenPublicationScalarFieldEnum | Prisma.HiddenPublicationScalarFieldEnum[];
};
export type HiddenPublicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where?: Prisma.HiddenPublicationWhereInput;
    orderBy?: Prisma.HiddenPublicationOrderByWithRelationInput | Prisma.HiddenPublicationOrderByWithRelationInput[];
    cursor?: Prisma.HiddenPublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenPublicationScalarFieldEnum | Prisma.HiddenPublicationScalarFieldEnum[];
};
export type HiddenPublicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where?: Prisma.HiddenPublicationWhereInput;
    orderBy?: Prisma.HiddenPublicationOrderByWithRelationInput | Prisma.HiddenPublicationOrderByWithRelationInput[];
    cursor?: Prisma.HiddenPublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HiddenPublicationScalarFieldEnum | Prisma.HiddenPublicationScalarFieldEnum[];
};
export type HiddenPublicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenPublicationCreateInput, Prisma.HiddenPublicationUncheckedCreateInput>;
};
export type HiddenPublicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HiddenPublicationCreateManyInput | Prisma.HiddenPublicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HiddenPublicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    data: Prisma.HiddenPublicationCreateManyInput | Prisma.HiddenPublicationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HiddenPublicationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HiddenPublicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateInput, Prisma.HiddenPublicationUncheckedUpdateInput>;
    where: Prisma.HiddenPublicationWhereUniqueInput;
};
export type HiddenPublicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateManyMutationInput, Prisma.HiddenPublicationUncheckedUpdateManyInput>;
    where?: Prisma.HiddenPublicationWhereInput;
    limit?: number;
};
export type HiddenPublicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HiddenPublicationUpdateManyMutationInput, Prisma.HiddenPublicationUncheckedUpdateManyInput>;
    where?: Prisma.HiddenPublicationWhereInput;
    limit?: number;
    include?: Prisma.HiddenPublicationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HiddenPublicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where: Prisma.HiddenPublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.HiddenPublicationCreateInput, Prisma.HiddenPublicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HiddenPublicationUpdateInput, Prisma.HiddenPublicationUncheckedUpdateInput>;
};
export type HiddenPublicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
    where: Prisma.HiddenPublicationWhereUniqueInput;
};
export type HiddenPublicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HiddenPublicationWhereInput;
    limit?: number;
};
export type HiddenPublicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HiddenPublicationSelect<ExtArgs> | null;
    omit?: Prisma.HiddenPublicationOmit<ExtArgs> | null;
    include?: Prisma.HiddenPublicationInclude<ExtArgs> | null;
};
export {};
