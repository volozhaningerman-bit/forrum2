import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TelegramLinkCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$TelegramLinkCodePayload>;
export type AggregateTelegramLinkCode = {
    _count: TelegramLinkCodeCountAggregateOutputType | null;
    _min: TelegramLinkCodeMinAggregateOutputType | null;
    _max: TelegramLinkCodeMaxAggregateOutputType | null;
};
export type TelegramLinkCodeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type TelegramLinkCodeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    codeHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type TelegramLinkCodeCountAggregateOutputType = {
    id: number;
    userId: number;
    codeHash: number;
    expiresAt: number;
    usedAt: number;
    createdAt: number;
    _all: number;
};
export type TelegramLinkCodeMinAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type TelegramLinkCodeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type TelegramLinkCodeCountAggregateInputType = {
    id?: true;
    userId?: true;
    codeHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type TelegramLinkCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkCodeWhereInput;
    orderBy?: Prisma.TelegramLinkCodeOrderByWithRelationInput | Prisma.TelegramLinkCodeOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TelegramLinkCodeCountAggregateInputType;
    _min?: TelegramLinkCodeMinAggregateInputType;
    _max?: TelegramLinkCodeMaxAggregateInputType;
};
export type GetTelegramLinkCodeAggregateType<T extends TelegramLinkCodeAggregateArgs> = {
    [P in keyof T & keyof AggregateTelegramLinkCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTelegramLinkCode[P]> : Prisma.GetScalarType<T[P], AggregateTelegramLinkCode[P]>;
};
export type TelegramLinkCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkCodeWhereInput;
    orderBy?: Prisma.TelegramLinkCodeOrderByWithAggregationInput | Prisma.TelegramLinkCodeOrderByWithAggregationInput[];
    by: Prisma.TelegramLinkCodeScalarFieldEnum[] | Prisma.TelegramLinkCodeScalarFieldEnum;
    having?: Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TelegramLinkCodeCountAggregateInputType | true;
    _min?: TelegramLinkCodeMinAggregateInputType;
    _max?: TelegramLinkCodeMaxAggregateInputType;
};
export type TelegramLinkCodeGroupByOutputType = {
    id: string;
    userId: string;
    codeHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
    _count: TelegramLinkCodeCountAggregateOutputType | null;
    _min: TelegramLinkCodeMinAggregateOutputType | null;
    _max: TelegramLinkCodeMaxAggregateOutputType | null;
};
type GetTelegramLinkCodeGroupByPayload<T extends TelegramLinkCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TelegramLinkCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TelegramLinkCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TelegramLinkCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TelegramLinkCodeGroupByOutputType[P]>;
}>>;
export type TelegramLinkCodeWhereInput = {
    AND?: Prisma.TelegramLinkCodeWhereInput | Prisma.TelegramLinkCodeWhereInput[];
    OR?: Prisma.TelegramLinkCodeWhereInput[];
    NOT?: Prisma.TelegramLinkCodeWhereInput | Prisma.TelegramLinkCodeWhereInput[];
    id?: Prisma.UuidFilter<"TelegramLinkCode"> | string;
    userId?: Prisma.UuidFilter<"TelegramLinkCode"> | string;
    codeHash?: Prisma.StringFilter<"TelegramLinkCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"TelegramLinkCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TelegramLinkCodeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type TelegramLinkCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    codeHash?: string;
    AND?: Prisma.TelegramLinkCodeWhereInput | Prisma.TelegramLinkCodeWhereInput[];
    OR?: Prisma.TelegramLinkCodeWhereInput[];
    NOT?: Prisma.TelegramLinkCodeWhereInput | Prisma.TelegramLinkCodeWhereInput[];
    userId?: Prisma.UuidFilter<"TelegramLinkCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"TelegramLinkCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "codeHash">;
export type TelegramLinkCodeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TelegramLinkCodeCountOrderByAggregateInput;
    _max?: Prisma.TelegramLinkCodeMaxOrderByAggregateInput;
    _min?: Prisma.TelegramLinkCodeMinOrderByAggregateInput;
};
export type TelegramLinkCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput | Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput | Prisma.TelegramLinkCodeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TelegramLinkCode"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"TelegramLinkCode"> | string;
    codeHash?: Prisma.StringWithAggregatesFilter<"TelegramLinkCode"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramLinkCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TelegramLinkCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramLinkCode"> | Date | string;
};
export type TelegramLinkCodeCreateInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTelegramLinkCodesInput;
};
export type TelegramLinkCodeUncheckedCreateInput = {
    id?: string;
    userId: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type TelegramLinkCodeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTelegramLinkCodesNestedInput;
};
export type TelegramLinkCodeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeCreateManyInput = {
    id?: string;
    userId: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type TelegramLinkCodeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeListRelationFilter = {
    every?: Prisma.TelegramLinkCodeWhereInput;
    some?: Prisma.TelegramLinkCodeWhereInput;
    none?: Prisma.TelegramLinkCodeWhereInput;
};
export type TelegramLinkCodeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TelegramLinkCodeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramLinkCodeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramLinkCodeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TelegramLinkCodeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput> | Prisma.TelegramLinkCodeCreateWithoutUserInput[] | Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput | Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TelegramLinkCodeCreateManyUserInputEnvelope;
    connect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
};
export type TelegramLinkCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput> | Prisma.TelegramLinkCodeCreateWithoutUserInput[] | Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput | Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TelegramLinkCodeCreateManyUserInputEnvelope;
    connect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
};
export type TelegramLinkCodeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput> | Prisma.TelegramLinkCodeCreateWithoutUserInput[] | Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput | Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TelegramLinkCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.TelegramLinkCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TelegramLinkCodeCreateManyUserInputEnvelope;
    set?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    disconnect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    delete?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    connect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    update?: Prisma.TelegramLinkCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.TelegramLinkCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TelegramLinkCodeUpdateManyWithWhereWithoutUserInput | Prisma.TelegramLinkCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TelegramLinkCodeScalarWhereInput | Prisma.TelegramLinkCodeScalarWhereInput[];
};
export type TelegramLinkCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput> | Prisma.TelegramLinkCodeCreateWithoutUserInput[] | Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput | Prisma.TelegramLinkCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TelegramLinkCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.TelegramLinkCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TelegramLinkCodeCreateManyUserInputEnvelope;
    set?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    disconnect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    delete?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    connect?: Prisma.TelegramLinkCodeWhereUniqueInput | Prisma.TelegramLinkCodeWhereUniqueInput[];
    update?: Prisma.TelegramLinkCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.TelegramLinkCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TelegramLinkCodeUpdateManyWithWhereWithoutUserInput | Prisma.TelegramLinkCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TelegramLinkCodeScalarWhereInput | Prisma.TelegramLinkCodeScalarWhereInput[];
};
export type TelegramLinkCodeCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type TelegramLinkCodeUncheckedCreateWithoutUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type TelegramLinkCodeCreateOrConnectWithoutUserInput = {
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput>;
};
export type TelegramLinkCodeCreateManyUserInputEnvelope = {
    data: Prisma.TelegramLinkCodeCreateManyUserInput | Prisma.TelegramLinkCodeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TelegramLinkCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
    update: Prisma.XOR<Prisma.TelegramLinkCodeUpdateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TelegramLinkCodeCreateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedCreateWithoutUserInput>;
};
export type TelegramLinkCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
    data: Prisma.XOR<Prisma.TelegramLinkCodeUpdateWithoutUserInput, Prisma.TelegramLinkCodeUncheckedUpdateWithoutUserInput>;
};
export type TelegramLinkCodeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TelegramLinkCodeScalarWhereInput;
    data: Prisma.XOR<Prisma.TelegramLinkCodeUpdateManyMutationInput, Prisma.TelegramLinkCodeUncheckedUpdateManyWithoutUserInput>;
};
export type TelegramLinkCodeScalarWhereInput = {
    AND?: Prisma.TelegramLinkCodeScalarWhereInput | Prisma.TelegramLinkCodeScalarWhereInput[];
    OR?: Prisma.TelegramLinkCodeScalarWhereInput[];
    NOT?: Prisma.TelegramLinkCodeScalarWhereInput | Prisma.TelegramLinkCodeScalarWhereInput[];
    id?: Prisma.UuidFilter<"TelegramLinkCode"> | string;
    userId?: Prisma.UuidFilter<"TelegramLinkCode"> | string;
    codeHash?: Prisma.StringFilter<"TelegramLinkCode"> | string;
    expiresAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"TelegramLinkCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"TelegramLinkCode"> | Date | string;
};
export type TelegramLinkCodeCreateManyUserInput = {
    id?: string;
    codeHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type TelegramLinkCodeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TelegramLinkCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLinkCode"]>;
export type TelegramLinkCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLinkCode"]>;
export type TelegramLinkCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLinkCode"]>;
export type TelegramLinkCodeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
};
export type TelegramLinkCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "codeHash" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["telegramLinkCode"]>;
export type TelegramLinkCodeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TelegramLinkCodeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TelegramLinkCodeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TelegramLinkCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TelegramLinkCode";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["telegramLinkCode"]>;
    composites: {};
};
export type TelegramLinkCodeGetPayload<S extends boolean | null | undefined | TelegramLinkCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload, S>;
export type TelegramLinkCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TelegramLinkCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TelegramLinkCodeCountAggregateInputType | true;
};
export interface TelegramLinkCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TelegramLinkCode'];
        meta: {
            name: 'TelegramLinkCode';
        };
    };
    findUnique<T extends TelegramLinkCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TelegramLinkCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TelegramLinkCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TelegramLinkCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TelegramLinkCodeFindManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TelegramLinkCodeCreateArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeCreateArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TelegramLinkCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TelegramLinkCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TelegramLinkCodeDeleteArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TelegramLinkCodeUpdateArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TelegramLinkCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TelegramLinkCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TelegramLinkCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TelegramLinkCodeUpsertArgs>(args: Prisma.SelectSubset<T, TelegramLinkCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkCodeClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TelegramLinkCodeCountArgs>(args?: Prisma.Subset<T, TelegramLinkCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TelegramLinkCodeCountAggregateOutputType> : number>;
    aggregate<T extends TelegramLinkCodeAggregateArgs>(args: Prisma.Subset<T, TelegramLinkCodeAggregateArgs>): Prisma.PrismaPromise<GetTelegramLinkCodeAggregateType<T>>;
    groupBy<T extends TelegramLinkCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TelegramLinkCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: TelegramLinkCodeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TelegramLinkCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramLinkCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TelegramLinkCodeFieldRefs;
}
export interface Prisma__TelegramLinkCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TelegramLinkCodeFieldRefs {
    readonly id: Prisma.FieldRef<"TelegramLinkCode", 'String'>;
    readonly userId: Prisma.FieldRef<"TelegramLinkCode", 'String'>;
    readonly codeHash: Prisma.FieldRef<"TelegramLinkCode", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"TelegramLinkCode", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"TelegramLinkCode", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"TelegramLinkCode", 'DateTime'>;
}
export type TelegramLinkCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
};
export type TelegramLinkCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
};
export type TelegramLinkCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkCodeWhereInput;
    orderBy?: Prisma.TelegramLinkCodeOrderByWithRelationInput | Prisma.TelegramLinkCodeOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkCodeScalarFieldEnum | Prisma.TelegramLinkCodeScalarFieldEnum[];
};
export type TelegramLinkCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkCodeWhereInput;
    orderBy?: Prisma.TelegramLinkCodeOrderByWithRelationInput | Prisma.TelegramLinkCodeOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkCodeScalarFieldEnum | Prisma.TelegramLinkCodeScalarFieldEnum[];
};
export type TelegramLinkCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkCodeWhereInput;
    orderBy?: Prisma.TelegramLinkCodeOrderByWithRelationInput | Prisma.TelegramLinkCodeOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkCodeScalarFieldEnum | Prisma.TelegramLinkCodeScalarFieldEnum[];
};
export type TelegramLinkCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkCodeCreateInput, Prisma.TelegramLinkCodeUncheckedCreateInput>;
};
export type TelegramLinkCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TelegramLinkCodeCreateManyInput | Prisma.TelegramLinkCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TelegramLinkCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    data: Prisma.TelegramLinkCodeCreateManyInput | Prisma.TelegramLinkCodeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TelegramLinkCodeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TelegramLinkCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkCodeUpdateInput, Prisma.TelegramLinkCodeUncheckedUpdateInput>;
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
};
export type TelegramLinkCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TelegramLinkCodeUpdateManyMutationInput, Prisma.TelegramLinkCodeUncheckedUpdateManyInput>;
    where?: Prisma.TelegramLinkCodeWhereInput;
    limit?: number;
};
export type TelegramLinkCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkCodeUpdateManyMutationInput, Prisma.TelegramLinkCodeUncheckedUpdateManyInput>;
    where?: Prisma.TelegramLinkCodeWhereInput;
    limit?: number;
    include?: Prisma.TelegramLinkCodeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TelegramLinkCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramLinkCodeCreateInput, Prisma.TelegramLinkCodeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TelegramLinkCodeUpdateInput, Prisma.TelegramLinkCodeUncheckedUpdateInput>;
};
export type TelegramLinkCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkCodeWhereUniqueInput;
};
export type TelegramLinkCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkCodeWhereInput;
    limit?: number;
};
export type TelegramLinkCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkCodeSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkCodeOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkCodeInclude<ExtArgs> | null;
};
export {};
