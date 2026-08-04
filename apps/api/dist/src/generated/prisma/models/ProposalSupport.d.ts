import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProposalSupportModel = runtime.Types.Result.DefaultSelection<Prisma.$ProposalSupportPayload>;
export type AggregateProposalSupport = {
    _count: ProposalSupportCountAggregateOutputType | null;
    _min: ProposalSupportMinAggregateOutputType | null;
    _max: ProposalSupportMaxAggregateOutputType | null;
};
export type ProposalSupportMinAggregateOutputType = {
    proposalId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type ProposalSupportMaxAggregateOutputType = {
    proposalId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type ProposalSupportCountAggregateOutputType = {
    proposalId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type ProposalSupportMinAggregateInputType = {
    proposalId?: true;
    userId?: true;
    createdAt?: true;
};
export type ProposalSupportMaxAggregateInputType = {
    proposalId?: true;
    userId?: true;
    createdAt?: true;
};
export type ProposalSupportCountAggregateInputType = {
    proposalId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type ProposalSupportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProposalSupportWhereInput;
    orderBy?: Prisma.ProposalSupportOrderByWithRelationInput | Prisma.ProposalSupportOrderByWithRelationInput[];
    cursor?: Prisma.ProposalSupportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProposalSupportCountAggregateInputType;
    _min?: ProposalSupportMinAggregateInputType;
    _max?: ProposalSupportMaxAggregateInputType;
};
export type GetProposalSupportAggregateType<T extends ProposalSupportAggregateArgs> = {
    [P in keyof T & keyof AggregateProposalSupport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProposalSupport[P]> : Prisma.GetScalarType<T[P], AggregateProposalSupport[P]>;
};
export type ProposalSupportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProposalSupportWhereInput;
    orderBy?: Prisma.ProposalSupportOrderByWithAggregationInput | Prisma.ProposalSupportOrderByWithAggregationInput[];
    by: Prisma.ProposalSupportScalarFieldEnum[] | Prisma.ProposalSupportScalarFieldEnum;
    having?: Prisma.ProposalSupportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProposalSupportCountAggregateInputType | true;
    _min?: ProposalSupportMinAggregateInputType;
    _max?: ProposalSupportMaxAggregateInputType;
};
export type ProposalSupportGroupByOutputType = {
    proposalId: string;
    userId: string;
    createdAt: Date;
    _count: ProposalSupportCountAggregateOutputType | null;
    _min: ProposalSupportMinAggregateOutputType | null;
    _max: ProposalSupportMaxAggregateOutputType | null;
};
type GetProposalSupportGroupByPayload<T extends ProposalSupportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProposalSupportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProposalSupportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProposalSupportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProposalSupportGroupByOutputType[P]>;
}>>;
export type ProposalSupportWhereInput = {
    AND?: Prisma.ProposalSupportWhereInput | Prisma.ProposalSupportWhereInput[];
    OR?: Prisma.ProposalSupportWhereInput[];
    NOT?: Prisma.ProposalSupportWhereInput | Prisma.ProposalSupportWhereInput[];
    proposalId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    userId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProposalSupport"> | Date | string;
    proposal?: Prisma.XOR<Prisma.CommunityProposalScalarRelationFilter, Prisma.CommunityProposalWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ProposalSupportOrderByWithRelationInput = {
    proposalId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    proposal?: Prisma.CommunityProposalOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ProposalSupportWhereUniqueInput = Prisma.AtLeast<{
    proposalId_userId?: Prisma.ProposalSupportProposalIdUserIdCompoundUniqueInput;
    AND?: Prisma.ProposalSupportWhereInput | Prisma.ProposalSupportWhereInput[];
    OR?: Prisma.ProposalSupportWhereInput[];
    NOT?: Prisma.ProposalSupportWhereInput | Prisma.ProposalSupportWhereInput[];
    proposalId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    userId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProposalSupport"> | Date | string;
    proposal?: Prisma.XOR<Prisma.CommunityProposalScalarRelationFilter, Prisma.CommunityProposalWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "proposalId_userId">;
export type ProposalSupportOrderByWithAggregationInput = {
    proposalId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProposalSupportCountOrderByAggregateInput;
    _max?: Prisma.ProposalSupportMaxOrderByAggregateInput;
    _min?: Prisma.ProposalSupportMinOrderByAggregateInput;
};
export type ProposalSupportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProposalSupportScalarWhereWithAggregatesInput | Prisma.ProposalSupportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProposalSupportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProposalSupportScalarWhereWithAggregatesInput | Prisma.ProposalSupportScalarWhereWithAggregatesInput[];
    proposalId?: Prisma.UuidWithAggregatesFilter<"ProposalSupport"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"ProposalSupport"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProposalSupport"> | Date | string;
};
export type ProposalSupportCreateInput = {
    createdAt?: Date | string;
    proposal: Prisma.CommunityProposalCreateNestedOneWithoutSupportsInput;
    user: Prisma.UserCreateNestedOneWithoutProposalSupportsInput;
};
export type ProposalSupportUncheckedCreateInput = {
    proposalId: string;
    userId: string;
    createdAt?: Date | string;
};
export type ProposalSupportUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: Prisma.CommunityProposalUpdateOneRequiredWithoutSupportsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutProposalSupportsNestedInput;
};
export type ProposalSupportUncheckedUpdateInput = {
    proposalId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportCreateManyInput = {
    proposalId: string;
    userId: string;
    createdAt?: Date | string;
};
export type ProposalSupportUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportUncheckedUpdateManyInput = {
    proposalId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportListRelationFilter = {
    every?: Prisma.ProposalSupportWhereInput;
    some?: Prisma.ProposalSupportWhereInput;
    none?: Prisma.ProposalSupportWhereInput;
};
export type ProposalSupportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProposalSupportProposalIdUserIdCompoundUniqueInput = {
    proposalId: string;
    userId: string;
};
export type ProposalSupportCountOrderByAggregateInput = {
    proposalId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProposalSupportMaxOrderByAggregateInput = {
    proposalId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProposalSupportMinOrderByAggregateInput = {
    proposalId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProposalSupportCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput> | Prisma.ProposalSupportCreateWithoutUserInput[] | Prisma.ProposalSupportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutUserInput | Prisma.ProposalSupportCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProposalSupportCreateManyUserInputEnvelope;
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
};
export type ProposalSupportUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput> | Prisma.ProposalSupportCreateWithoutUserInput[] | Prisma.ProposalSupportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutUserInput | Prisma.ProposalSupportCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProposalSupportCreateManyUserInputEnvelope;
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
};
export type ProposalSupportUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput> | Prisma.ProposalSupportCreateWithoutUserInput[] | Prisma.ProposalSupportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutUserInput | Prisma.ProposalSupportCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProposalSupportUpsertWithWhereUniqueWithoutUserInput | Prisma.ProposalSupportUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProposalSupportCreateManyUserInputEnvelope;
    set?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    disconnect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    delete?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    update?: Prisma.ProposalSupportUpdateWithWhereUniqueWithoutUserInput | Prisma.ProposalSupportUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProposalSupportUpdateManyWithWhereWithoutUserInput | Prisma.ProposalSupportUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
};
export type ProposalSupportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput> | Prisma.ProposalSupportCreateWithoutUserInput[] | Prisma.ProposalSupportUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutUserInput | Prisma.ProposalSupportCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProposalSupportUpsertWithWhereUniqueWithoutUserInput | Prisma.ProposalSupportUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProposalSupportCreateManyUserInputEnvelope;
    set?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    disconnect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    delete?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    update?: Prisma.ProposalSupportUpdateWithWhereUniqueWithoutUserInput | Prisma.ProposalSupportUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProposalSupportUpdateManyWithWhereWithoutUserInput | Prisma.ProposalSupportUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
};
export type ProposalSupportCreateNestedManyWithoutProposalInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput> | Prisma.ProposalSupportCreateWithoutProposalInput[] | Prisma.ProposalSupportUncheckedCreateWithoutProposalInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutProposalInput | Prisma.ProposalSupportCreateOrConnectWithoutProposalInput[];
    createMany?: Prisma.ProposalSupportCreateManyProposalInputEnvelope;
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
};
export type ProposalSupportUncheckedCreateNestedManyWithoutProposalInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput> | Prisma.ProposalSupportCreateWithoutProposalInput[] | Prisma.ProposalSupportUncheckedCreateWithoutProposalInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutProposalInput | Prisma.ProposalSupportCreateOrConnectWithoutProposalInput[];
    createMany?: Prisma.ProposalSupportCreateManyProposalInputEnvelope;
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
};
export type ProposalSupportUpdateManyWithoutProposalNestedInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput> | Prisma.ProposalSupportCreateWithoutProposalInput[] | Prisma.ProposalSupportUncheckedCreateWithoutProposalInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutProposalInput | Prisma.ProposalSupportCreateOrConnectWithoutProposalInput[];
    upsert?: Prisma.ProposalSupportUpsertWithWhereUniqueWithoutProposalInput | Prisma.ProposalSupportUpsertWithWhereUniqueWithoutProposalInput[];
    createMany?: Prisma.ProposalSupportCreateManyProposalInputEnvelope;
    set?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    disconnect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    delete?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    update?: Prisma.ProposalSupportUpdateWithWhereUniqueWithoutProposalInput | Prisma.ProposalSupportUpdateWithWhereUniqueWithoutProposalInput[];
    updateMany?: Prisma.ProposalSupportUpdateManyWithWhereWithoutProposalInput | Prisma.ProposalSupportUpdateManyWithWhereWithoutProposalInput[];
    deleteMany?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
};
export type ProposalSupportUncheckedUpdateManyWithoutProposalNestedInput = {
    create?: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput> | Prisma.ProposalSupportCreateWithoutProposalInput[] | Prisma.ProposalSupportUncheckedCreateWithoutProposalInput[];
    connectOrCreate?: Prisma.ProposalSupportCreateOrConnectWithoutProposalInput | Prisma.ProposalSupportCreateOrConnectWithoutProposalInput[];
    upsert?: Prisma.ProposalSupportUpsertWithWhereUniqueWithoutProposalInput | Prisma.ProposalSupportUpsertWithWhereUniqueWithoutProposalInput[];
    createMany?: Prisma.ProposalSupportCreateManyProposalInputEnvelope;
    set?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    disconnect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    delete?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    connect?: Prisma.ProposalSupportWhereUniqueInput | Prisma.ProposalSupportWhereUniqueInput[];
    update?: Prisma.ProposalSupportUpdateWithWhereUniqueWithoutProposalInput | Prisma.ProposalSupportUpdateWithWhereUniqueWithoutProposalInput[];
    updateMany?: Prisma.ProposalSupportUpdateManyWithWhereWithoutProposalInput | Prisma.ProposalSupportUpdateManyWithWhereWithoutProposalInput[];
    deleteMany?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
};
export type ProposalSupportCreateWithoutUserInput = {
    createdAt?: Date | string;
    proposal: Prisma.CommunityProposalCreateNestedOneWithoutSupportsInput;
};
export type ProposalSupportUncheckedCreateWithoutUserInput = {
    proposalId: string;
    createdAt?: Date | string;
};
export type ProposalSupportCreateOrConnectWithoutUserInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput>;
};
export type ProposalSupportCreateManyUserInputEnvelope = {
    data: Prisma.ProposalSupportCreateManyUserInput | Prisma.ProposalSupportCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProposalSupportUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProposalSupportUpdateWithoutUserInput, Prisma.ProposalSupportUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProposalSupportCreateWithoutUserInput, Prisma.ProposalSupportUncheckedCreateWithoutUserInput>;
};
export type ProposalSupportUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateWithoutUserInput, Prisma.ProposalSupportUncheckedUpdateWithoutUserInput>;
};
export type ProposalSupportUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProposalSupportScalarWhereInput;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateManyMutationInput, Prisma.ProposalSupportUncheckedUpdateManyWithoutUserInput>;
};
export type ProposalSupportScalarWhereInput = {
    AND?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
    OR?: Prisma.ProposalSupportScalarWhereInput[];
    NOT?: Prisma.ProposalSupportScalarWhereInput | Prisma.ProposalSupportScalarWhereInput[];
    proposalId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    userId?: Prisma.UuidFilter<"ProposalSupport"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProposalSupport"> | Date | string;
};
export type ProposalSupportCreateWithoutProposalInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProposalSupportsInput;
};
export type ProposalSupportUncheckedCreateWithoutProposalInput = {
    userId: string;
    createdAt?: Date | string;
};
export type ProposalSupportCreateOrConnectWithoutProposalInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput>;
};
export type ProposalSupportCreateManyProposalInputEnvelope = {
    data: Prisma.ProposalSupportCreateManyProposalInput | Prisma.ProposalSupportCreateManyProposalInput[];
    skipDuplicates?: boolean;
};
export type ProposalSupportUpsertWithWhereUniqueWithoutProposalInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProposalSupportUpdateWithoutProposalInput, Prisma.ProposalSupportUncheckedUpdateWithoutProposalInput>;
    create: Prisma.XOR<Prisma.ProposalSupportCreateWithoutProposalInput, Prisma.ProposalSupportUncheckedCreateWithoutProposalInput>;
};
export type ProposalSupportUpdateWithWhereUniqueWithoutProposalInput = {
    where: Prisma.ProposalSupportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateWithoutProposalInput, Prisma.ProposalSupportUncheckedUpdateWithoutProposalInput>;
};
export type ProposalSupportUpdateManyWithWhereWithoutProposalInput = {
    where: Prisma.ProposalSupportScalarWhereInput;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateManyMutationInput, Prisma.ProposalSupportUncheckedUpdateManyWithoutProposalInput>;
};
export type ProposalSupportCreateManyUserInput = {
    proposalId: string;
    createdAt?: Date | string;
};
export type ProposalSupportUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: Prisma.CommunityProposalUpdateOneRequiredWithoutSupportsNestedInput;
};
export type ProposalSupportUncheckedUpdateWithoutUserInput = {
    proposalId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportUncheckedUpdateManyWithoutUserInput = {
    proposalId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportCreateManyProposalInput = {
    userId: string;
    createdAt?: Date | string;
};
export type ProposalSupportUpdateWithoutProposalInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProposalSupportsNestedInput;
};
export type ProposalSupportUncheckedUpdateWithoutProposalInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportUncheckedUpdateManyWithoutProposalInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProposalSupportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    proposalId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["proposalSupport"]>;
export type ProposalSupportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    proposalId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["proposalSupport"]>;
export type ProposalSupportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    proposalId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["proposalSupport"]>;
export type ProposalSupportSelectScalar = {
    proposalId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type ProposalSupportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"proposalId" | "userId" | "createdAt", ExtArgs["result"]["proposalSupport"]>;
export type ProposalSupportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProposalSupportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProposalSupportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proposal?: boolean | Prisma.CommunityProposalDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProposalSupportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProposalSupport";
    objects: {
        proposal: Prisma.$CommunityProposalPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        proposalId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["proposalSupport"]>;
    composites: {};
};
export type ProposalSupportGetPayload<S extends boolean | null | undefined | ProposalSupportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload, S>;
export type ProposalSupportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProposalSupportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProposalSupportCountAggregateInputType | true;
};
export interface ProposalSupportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProposalSupport'];
        meta: {
            name: 'ProposalSupport';
        };
    };
    findUnique<T extends ProposalSupportFindUniqueArgs>(args: Prisma.SelectSubset<T, ProposalSupportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProposalSupportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProposalSupportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProposalSupportFindFirstArgs>(args?: Prisma.SelectSubset<T, ProposalSupportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProposalSupportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProposalSupportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProposalSupportFindManyArgs>(args?: Prisma.SelectSubset<T, ProposalSupportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProposalSupportCreateArgs>(args: Prisma.SelectSubset<T, ProposalSupportCreateArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProposalSupportCreateManyArgs>(args?: Prisma.SelectSubset<T, ProposalSupportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProposalSupportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProposalSupportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProposalSupportDeleteArgs>(args: Prisma.SelectSubset<T, ProposalSupportDeleteArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProposalSupportUpdateArgs>(args: Prisma.SelectSubset<T, ProposalSupportUpdateArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProposalSupportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProposalSupportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProposalSupportUpdateManyArgs>(args: Prisma.SelectSubset<T, ProposalSupportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProposalSupportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProposalSupportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProposalSupportUpsertArgs>(args: Prisma.SelectSubset<T, ProposalSupportUpsertArgs<ExtArgs>>): Prisma.Prisma__ProposalSupportClient<runtime.Types.Result.GetResult<Prisma.$ProposalSupportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProposalSupportCountArgs>(args?: Prisma.Subset<T, ProposalSupportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProposalSupportCountAggregateOutputType> : number>;
    aggregate<T extends ProposalSupportAggregateArgs>(args: Prisma.Subset<T, ProposalSupportAggregateArgs>): Prisma.PrismaPromise<GetProposalSupportAggregateType<T>>;
    groupBy<T extends ProposalSupportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProposalSupportGroupByArgs['orderBy'];
    } : {
        orderBy?: ProposalSupportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProposalSupportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProposalSupportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProposalSupportFieldRefs;
}
export interface Prisma__ProposalSupportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    proposal<T extends Prisma.CommunityProposalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityProposalDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityProposalClient<runtime.Types.Result.GetResult<Prisma.$CommunityProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProposalSupportFieldRefs {
    readonly proposalId: Prisma.FieldRef<"ProposalSupport", 'String'>;
    readonly userId: Prisma.FieldRef<"ProposalSupport", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProposalSupport", 'DateTime'>;
}
export type ProposalSupportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    where: Prisma.ProposalSupportWhereUniqueInput;
};
export type ProposalSupportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    where: Prisma.ProposalSupportWhereUniqueInput;
};
export type ProposalSupportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProposalSupportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProposalSupportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProposalSupportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProposalSupportCreateInput, Prisma.ProposalSupportUncheckedCreateInput>;
};
export type ProposalSupportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProposalSupportCreateManyInput | Prisma.ProposalSupportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProposalSupportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    data: Prisma.ProposalSupportCreateManyInput | Prisma.ProposalSupportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProposalSupportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProposalSupportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateInput, Prisma.ProposalSupportUncheckedUpdateInput>;
    where: Prisma.ProposalSupportWhereUniqueInput;
};
export type ProposalSupportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProposalSupportUpdateManyMutationInput, Prisma.ProposalSupportUncheckedUpdateManyInput>;
    where?: Prisma.ProposalSupportWhereInput;
    limit?: number;
};
export type ProposalSupportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProposalSupportUpdateManyMutationInput, Prisma.ProposalSupportUncheckedUpdateManyInput>;
    where?: Prisma.ProposalSupportWhereInput;
    limit?: number;
    include?: Prisma.ProposalSupportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProposalSupportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    where: Prisma.ProposalSupportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProposalSupportCreateInput, Prisma.ProposalSupportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProposalSupportUpdateInput, Prisma.ProposalSupportUncheckedUpdateInput>;
};
export type ProposalSupportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
    where: Prisma.ProposalSupportWhereUniqueInput;
};
export type ProposalSupportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProposalSupportWhereInput;
    limit?: number;
};
export type ProposalSupportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProposalSupportSelect<ExtArgs> | null;
    omit?: Prisma.ProposalSupportOmit<ExtArgs> | null;
    include?: Prisma.ProposalSupportInclude<ExtArgs> | null;
};
export {};
