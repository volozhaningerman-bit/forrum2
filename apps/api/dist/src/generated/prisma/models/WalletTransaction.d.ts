import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WalletTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$WalletTransactionPayload>;
export type AggregateWalletTransaction = {
    _count: WalletTransactionCountAggregateOutputType | null;
    _avg: WalletTransactionAvgAggregateOutputType | null;
    _sum: WalletTransactionSumAggregateOutputType | null;
    _min: WalletTransactionMinAggregateOutputType | null;
    _max: WalletTransactionMaxAggregateOutputType | null;
};
export type WalletTransactionAvgAggregateOutputType = {
    amount: number | null;
};
export type WalletTransactionSumAggregateOutputType = {
    amount: number | null;
};
export type WalletTransactionMinAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.WalletTransactionType | null;
    status: $Enums.WalletTransactionStatus | null;
    amount: number | null;
    description: string | null;
    externalRef: string | null;
    createdAt: Date | null;
};
export type WalletTransactionMaxAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.WalletTransactionType | null;
    status: $Enums.WalletTransactionStatus | null;
    amount: number | null;
    description: string | null;
    externalRef: string | null;
    createdAt: Date | null;
};
export type WalletTransactionCountAggregateOutputType = {
    id: number;
    walletId: number;
    type: number;
    status: number;
    amount: number;
    description: number;
    externalRef: number;
    createdAt: number;
    _all: number;
};
export type WalletTransactionAvgAggregateInputType = {
    amount?: true;
};
export type WalletTransactionSumAggregateInputType = {
    amount?: true;
};
export type WalletTransactionMinAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    externalRef?: true;
    createdAt?: true;
};
export type WalletTransactionMaxAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    externalRef?: true;
    createdAt?: true;
};
export type WalletTransactionCountAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    externalRef?: true;
    createdAt?: true;
    _all?: true;
};
export type WalletTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WalletTransactionCountAggregateInputType;
    _avg?: WalletTransactionAvgAggregateInputType;
    _sum?: WalletTransactionSumAggregateInputType;
    _min?: WalletTransactionMinAggregateInputType;
    _max?: WalletTransactionMaxAggregateInputType;
};
export type GetWalletTransactionAggregateType<T extends WalletTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateWalletTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWalletTransaction[P]> : Prisma.GetScalarType<T[P], AggregateWalletTransaction[P]>;
};
export type WalletTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithAggregationInput | Prisma.WalletTransactionOrderByWithAggregationInput[];
    by: Prisma.WalletTransactionScalarFieldEnum[] | Prisma.WalletTransactionScalarFieldEnum;
    having?: Prisma.WalletTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WalletTransactionCountAggregateInputType | true;
    _avg?: WalletTransactionAvgAggregateInputType;
    _sum?: WalletTransactionSumAggregateInputType;
    _min?: WalletTransactionMinAggregateInputType;
    _max?: WalletTransactionMaxAggregateInputType;
};
export type WalletTransactionGroupByOutputType = {
    id: string;
    walletId: string;
    type: $Enums.WalletTransactionType;
    status: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef: string | null;
    createdAt: Date;
    _count: WalletTransactionCountAggregateOutputType | null;
    _avg: WalletTransactionAvgAggregateOutputType | null;
    _sum: WalletTransactionSumAggregateOutputType | null;
    _min: WalletTransactionMinAggregateOutputType | null;
    _max: WalletTransactionMaxAggregateOutputType | null;
};
type GetWalletTransactionGroupByPayload<T extends WalletTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WalletTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WalletTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WalletTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>;
}>>;
export type WalletTransactionWhereInput = {
    AND?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    OR?: Prisma.WalletTransactionWhereInput[];
    NOT?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    id?: Prisma.UuidFilter<"WalletTransaction"> | string;
    walletId?: Prisma.UuidFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumWalletTransactionTypeFilter<"WalletTransaction"> | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFilter<"WalletTransaction"> | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFilter<"WalletTransaction"> | number;
    description?: Prisma.StringFilter<"WalletTransaction"> | string;
    externalRef?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
};
export type WalletTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    wallet?: Prisma.WalletOrderByWithRelationInput;
};
export type WalletTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    OR?: Prisma.WalletTransactionWhereInput[];
    NOT?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    walletId?: Prisma.UuidFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumWalletTransactionTypeFilter<"WalletTransaction"> | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFilter<"WalletTransaction"> | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFilter<"WalletTransaction"> | number;
    description?: Prisma.StringFilter<"WalletTransaction"> | string;
    externalRef?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
}, "id">;
export type WalletTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.WalletTransactionCountOrderByAggregateInput;
    _avg?: Prisma.WalletTransactionAvgOrderByAggregateInput;
    _max?: Prisma.WalletTransactionMaxOrderByAggregateInput;
    _min?: Prisma.WalletTransactionMinOrderByAggregateInput;
    _sum?: Prisma.WalletTransactionSumOrderByAggregateInput;
};
export type WalletTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.WalletTransactionScalarWhereWithAggregatesInput | Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WalletTransactionScalarWhereWithAggregatesInput | Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"WalletTransaction"> | string;
    walletId?: Prisma.UuidWithAggregatesFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumWalletTransactionTypeWithAggregatesFilter<"WalletTransaction"> | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusWithAggregatesFilter<"WalletTransaction"> | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntWithAggregatesFilter<"WalletTransaction"> | number;
    description?: Prisma.StringWithAggregatesFilter<"WalletTransaction"> | string;
    externalRef?: Prisma.StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WalletTransaction"> | Date | string;
};
export type WalletTransactionCreateInput = {
    id?: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
};
export type WalletTransactionUncheckedCreateInput = {
    id?: string;
    walletId: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionCreateManyInput = {
    id?: string;
    walletId: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionListRelationFilter = {
    every?: Prisma.WalletTransactionWhereInput;
    some?: Prisma.WalletTransactionWhereInput;
    none?: Prisma.WalletTransactionWhereInput;
};
export type WalletTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WalletTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WalletTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WalletTransactionCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type EnumWalletTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.WalletTransactionType;
};
export type EnumWalletTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.WalletTransactionStatus;
};
export type WalletTransactionCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUncheckedCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionCreateOrConnectWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput>;
};
export type WalletTransactionCreateManyWalletInputEnvelope = {
    data: Prisma.WalletTransactionCreateManyWalletInput | Prisma.WalletTransactionCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutWalletInput, Prisma.WalletTransactionUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput>;
};
export type WalletTransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutWalletInput, Prisma.WalletTransactionUncheckedUpdateWithoutWalletInput>;
};
export type WalletTransactionUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.WalletTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletInput>;
};
export type WalletTransactionScalarWhereInput = {
    AND?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
    OR?: Prisma.WalletTransactionScalarWhereInput[];
    NOT?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
    id?: Prisma.UuidFilter<"WalletTransaction"> | string;
    walletId?: Prisma.UuidFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumWalletTransactionTypeFilter<"WalletTransaction"> | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFilter<"WalletTransaction"> | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFilter<"WalletTransaction"> | number;
    description?: Prisma.StringFilter<"WalletTransaction"> | string;
    externalRef?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
};
export type WalletTransactionCreateManyWalletInput = {
    id?: string;
    type: $Enums.WalletTransactionType;
    status?: $Enums.WalletTransactionStatus;
    amount: number;
    description: string;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTransactionTypeFieldUpdateOperationsInput | $Enums.WalletTransactionType;
    status?: Prisma.EnumWalletTransactionStatusFieldUpdateOperationsInput | $Enums.WalletTransactionStatus;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectScalar = {
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
};
export type WalletTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "walletId" | "type" | "status" | "amount" | "description" | "externalRef" | "createdAt", ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WalletTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WalletTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type $WalletTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WalletTransaction";
    objects: {
        wallet: Prisma.$WalletPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        walletId: string;
        type: $Enums.WalletTransactionType;
        status: $Enums.WalletTransactionStatus;
        amount: number;
        description: string;
        externalRef: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["walletTransaction"]>;
    composites: {};
};
export type WalletTransactionGetPayload<S extends boolean | null | undefined | WalletTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload, S>;
export type WalletTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WalletTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WalletTransactionCountAggregateInputType | true;
};
export interface WalletTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WalletTransaction'];
        meta: {
            name: 'WalletTransaction';
        };
    };
    findUnique<T extends WalletTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, WalletTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WalletTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WalletTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WalletTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WalletTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WalletTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WalletTransactionCreateArgs>(args: Prisma.SelectSubset<T, WalletTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WalletTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WalletTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WalletTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WalletTransactionDeleteArgs>(args: Prisma.SelectSubset<T, WalletTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WalletTransactionUpdateArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WalletTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WalletTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WalletTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WalletTransactionUpsertArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WalletTransactionCountArgs>(args?: Prisma.Subset<T, WalletTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WalletTransactionCountAggregateOutputType> : number>;
    aggregate<T extends WalletTransactionAggregateArgs>(args: Prisma.Subset<T, WalletTransactionAggregateArgs>): Prisma.PrismaPromise<GetWalletTransactionAggregateType<T>>;
    groupBy<T extends WalletTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WalletTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: WalletTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WalletTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WalletTransactionFieldRefs;
}
export interface Prisma__WalletTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WalletTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly walletId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly type: Prisma.FieldRef<"WalletTransaction", 'WalletTransactionType'>;
    readonly status: Prisma.FieldRef<"WalletTransaction", 'WalletTransactionStatus'>;
    readonly amount: Prisma.FieldRef<"WalletTransaction", 'Int'>;
    readonly description: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly externalRef: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WalletTransaction", 'DateTime'>;
}
export type WalletTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletTransactionScalarFieldEnum | Prisma.WalletTransactionScalarFieldEnum[];
};
export type WalletTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletTransactionScalarFieldEnum | Prisma.WalletTransactionScalarFieldEnum[];
};
export type WalletTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletTransactionScalarFieldEnum | Prisma.WalletTransactionScalarFieldEnum[];
};
export type WalletTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionCreateInput, Prisma.WalletTransactionUncheckedCreateInput>;
};
export type WalletTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WalletTransactionCreateManyInput | Prisma.WalletTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    data: Prisma.WalletTransactionCreateManyInput | Prisma.WalletTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WalletTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WalletTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateInput, Prisma.WalletTransactionUncheckedUpdateInput>;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyInput>;
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
};
export type WalletTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyInput>;
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
    include?: Prisma.WalletTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WalletTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateInput, Prisma.WalletTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateInput, Prisma.WalletTransactionUncheckedUpdateInput>;
};
export type WalletTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
};
export type WalletTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
};
export {};
