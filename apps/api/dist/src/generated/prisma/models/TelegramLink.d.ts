import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TelegramLinkModel = runtime.Types.Result.DefaultSelection<Prisma.$TelegramLinkPayload>;
export type AggregateTelegramLink = {
    _count: TelegramLinkCountAggregateOutputType | null;
    _min: TelegramLinkMinAggregateOutputType | null;
    _max: TelegramLinkMaxAggregateOutputType | null;
};
export type TelegramLinkMinAggregateOutputType = {
    userId: string | null;
    telegramUserId: string | null;
    chatId: string | null;
    telegramUsername: string | null;
    enabled: boolean | null;
    linkedAt: Date | null;
    lastDeliveryAt: Date | null;
};
export type TelegramLinkMaxAggregateOutputType = {
    userId: string | null;
    telegramUserId: string | null;
    chatId: string | null;
    telegramUsername: string | null;
    enabled: boolean | null;
    linkedAt: Date | null;
    lastDeliveryAt: Date | null;
};
export type TelegramLinkCountAggregateOutputType = {
    userId: number;
    telegramUserId: number;
    chatId: number;
    telegramUsername: number;
    enabled: number;
    linkedAt: number;
    lastDeliveryAt: number;
    _all: number;
};
export type TelegramLinkMinAggregateInputType = {
    userId?: true;
    telegramUserId?: true;
    chatId?: true;
    telegramUsername?: true;
    enabled?: true;
    linkedAt?: true;
    lastDeliveryAt?: true;
};
export type TelegramLinkMaxAggregateInputType = {
    userId?: true;
    telegramUserId?: true;
    chatId?: true;
    telegramUsername?: true;
    enabled?: true;
    linkedAt?: true;
    lastDeliveryAt?: true;
};
export type TelegramLinkCountAggregateInputType = {
    userId?: true;
    telegramUserId?: true;
    chatId?: true;
    telegramUsername?: true;
    enabled?: true;
    linkedAt?: true;
    lastDeliveryAt?: true;
    _all?: true;
};
export type TelegramLinkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkWhereInput;
    orderBy?: Prisma.TelegramLinkOrderByWithRelationInput | Prisma.TelegramLinkOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TelegramLinkCountAggregateInputType;
    _min?: TelegramLinkMinAggregateInputType;
    _max?: TelegramLinkMaxAggregateInputType;
};
export type GetTelegramLinkAggregateType<T extends TelegramLinkAggregateArgs> = {
    [P in keyof T & keyof AggregateTelegramLink]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTelegramLink[P]> : Prisma.GetScalarType<T[P], AggregateTelegramLink[P]>;
};
export type TelegramLinkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkWhereInput;
    orderBy?: Prisma.TelegramLinkOrderByWithAggregationInput | Prisma.TelegramLinkOrderByWithAggregationInput[];
    by: Prisma.TelegramLinkScalarFieldEnum[] | Prisma.TelegramLinkScalarFieldEnum;
    having?: Prisma.TelegramLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TelegramLinkCountAggregateInputType | true;
    _min?: TelegramLinkMinAggregateInputType;
    _max?: TelegramLinkMaxAggregateInputType;
};
export type TelegramLinkGroupByOutputType = {
    userId: string;
    telegramUserId: string;
    chatId: string;
    telegramUsername: string | null;
    enabled: boolean;
    linkedAt: Date;
    lastDeliveryAt: Date | null;
    _count: TelegramLinkCountAggregateOutputType | null;
    _min: TelegramLinkMinAggregateOutputType | null;
    _max: TelegramLinkMaxAggregateOutputType | null;
};
type GetTelegramLinkGroupByPayload<T extends TelegramLinkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TelegramLinkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TelegramLinkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TelegramLinkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TelegramLinkGroupByOutputType[P]>;
}>>;
export type TelegramLinkWhereInput = {
    AND?: Prisma.TelegramLinkWhereInput | Prisma.TelegramLinkWhereInput[];
    OR?: Prisma.TelegramLinkWhereInput[];
    NOT?: Prisma.TelegramLinkWhereInput | Prisma.TelegramLinkWhereInput[];
    userId?: Prisma.UuidFilter<"TelegramLink"> | string;
    telegramUserId?: Prisma.StringFilter<"TelegramLink"> | string;
    chatId?: Prisma.StringFilter<"TelegramLink"> | string;
    telegramUsername?: Prisma.StringNullableFilter<"TelegramLink"> | string | null;
    enabled?: Prisma.BoolFilter<"TelegramLink"> | boolean;
    linkedAt?: Prisma.DateTimeFilter<"TelegramLink"> | Date | string;
    lastDeliveryAt?: Prisma.DateTimeNullableFilter<"TelegramLink"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TelegramLinkOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    telegramUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    telegramUsername?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastDeliveryAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type TelegramLinkWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    telegramUserId?: string;
    AND?: Prisma.TelegramLinkWhereInput | Prisma.TelegramLinkWhereInput[];
    OR?: Prisma.TelegramLinkWhereInput[];
    NOT?: Prisma.TelegramLinkWhereInput | Prisma.TelegramLinkWhereInput[];
    chatId?: Prisma.StringFilter<"TelegramLink"> | string;
    telegramUsername?: Prisma.StringNullableFilter<"TelegramLink"> | string | null;
    enabled?: Prisma.BoolFilter<"TelegramLink"> | boolean;
    linkedAt?: Prisma.DateTimeFilter<"TelegramLink"> | Date | string;
    lastDeliveryAt?: Prisma.DateTimeNullableFilter<"TelegramLink"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId" | "telegramUserId">;
export type TelegramLinkOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    telegramUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    telegramUsername?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastDeliveryAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TelegramLinkCountOrderByAggregateInput;
    _max?: Prisma.TelegramLinkMaxOrderByAggregateInput;
    _min?: Prisma.TelegramLinkMinOrderByAggregateInput;
};
export type TelegramLinkScalarWhereWithAggregatesInput = {
    AND?: Prisma.TelegramLinkScalarWhereWithAggregatesInput | Prisma.TelegramLinkScalarWhereWithAggregatesInput[];
    OR?: Prisma.TelegramLinkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TelegramLinkScalarWhereWithAggregatesInput | Prisma.TelegramLinkScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"TelegramLink"> | string;
    telegramUserId?: Prisma.StringWithAggregatesFilter<"TelegramLink"> | string;
    chatId?: Prisma.StringWithAggregatesFilter<"TelegramLink"> | string;
    telegramUsername?: Prisma.StringNullableWithAggregatesFilter<"TelegramLink"> | string | null;
    enabled?: Prisma.BoolWithAggregatesFilter<"TelegramLink"> | boolean;
    linkedAt?: Prisma.DateTimeWithAggregatesFilter<"TelegramLink"> | Date | string;
    lastDeliveryAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TelegramLink"> | Date | string | null;
};
export type TelegramLinkCreateInput = {
    telegramUserId: string;
    chatId: string;
    telegramUsername?: string | null;
    enabled?: boolean;
    linkedAt?: Date | string;
    lastDeliveryAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutTelegramLinkInput;
};
export type TelegramLinkUncheckedCreateInput = {
    userId: string;
    telegramUserId: string;
    chatId: string;
    telegramUsername?: string | null;
    enabled?: boolean;
    linkedAt?: Date | string;
    lastDeliveryAt?: Date | string | null;
};
export type TelegramLinkUpdateInput = {
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutTelegramLinkNestedInput;
};
export type TelegramLinkUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TelegramLinkCreateManyInput = {
    userId: string;
    telegramUserId: string;
    chatId: string;
    telegramUsername?: string | null;
    enabled?: boolean;
    linkedAt?: Date | string;
    lastDeliveryAt?: Date | string | null;
};
export type TelegramLinkUpdateManyMutationInput = {
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TelegramLinkUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TelegramLinkNullableScalarRelationFilter = {
    is?: Prisma.TelegramLinkWhereInput | null;
    isNot?: Prisma.TelegramLinkWhereInput | null;
};
export type TelegramLinkCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    telegramUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    telegramUsername?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastDeliveryAt?: Prisma.SortOrder;
};
export type TelegramLinkMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    telegramUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    telegramUsername?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastDeliveryAt?: Prisma.SortOrder;
};
export type TelegramLinkMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    telegramUserId?: Prisma.SortOrder;
    chatId?: Prisma.SortOrder;
    telegramUsername?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    lastDeliveryAt?: Prisma.SortOrder;
};
export type TelegramLinkCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TelegramLinkCreateOrConnectWithoutUserInput;
    connect?: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TelegramLinkCreateOrConnectWithoutUserInput;
    connect?: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TelegramLinkCreateOrConnectWithoutUserInput;
    upsert?: Prisma.TelegramLinkUpsertWithoutUserInput;
    disconnect?: Prisma.TelegramLinkWhereInput | boolean;
    delete?: Prisma.TelegramLinkWhereInput | boolean;
    connect?: Prisma.TelegramLinkWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TelegramLinkUpdateToOneWithWhereWithoutUserInput, Prisma.TelegramLinkUpdateWithoutUserInput>, Prisma.TelegramLinkUncheckedUpdateWithoutUserInput>;
};
export type TelegramLinkUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TelegramLinkCreateOrConnectWithoutUserInput;
    upsert?: Prisma.TelegramLinkUpsertWithoutUserInput;
    disconnect?: Prisma.TelegramLinkWhereInput | boolean;
    delete?: Prisma.TelegramLinkWhereInput | boolean;
    connect?: Prisma.TelegramLinkWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TelegramLinkUpdateToOneWithWhereWithoutUserInput, Prisma.TelegramLinkUpdateWithoutUserInput>, Prisma.TelegramLinkUncheckedUpdateWithoutUserInput>;
};
export type TelegramLinkCreateWithoutUserInput = {
    telegramUserId: string;
    chatId: string;
    telegramUsername?: string | null;
    enabled?: boolean;
    linkedAt?: Date | string;
    lastDeliveryAt?: Date | string | null;
};
export type TelegramLinkUncheckedCreateWithoutUserInput = {
    telegramUserId: string;
    chatId: string;
    telegramUsername?: string | null;
    enabled?: boolean;
    linkedAt?: Date | string;
    lastDeliveryAt?: Date | string | null;
};
export type TelegramLinkCreateOrConnectWithoutUserInput = {
    where: Prisma.TelegramLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
};
export type TelegramLinkUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.TelegramLinkUpdateWithoutUserInput, Prisma.TelegramLinkUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TelegramLinkCreateWithoutUserInput, Prisma.TelegramLinkUncheckedCreateWithoutUserInput>;
    where?: Prisma.TelegramLinkWhereInput;
};
export type TelegramLinkUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.TelegramLinkWhereInput;
    data: Prisma.XOR<Prisma.TelegramLinkUpdateWithoutUserInput, Prisma.TelegramLinkUncheckedUpdateWithoutUserInput>;
};
export type TelegramLinkUpdateWithoutUserInput = {
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TelegramLinkUncheckedUpdateWithoutUserInput = {
    telegramUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    chatId?: Prisma.StringFieldUpdateOperationsInput | string;
    telegramUsername?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastDeliveryAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TelegramLinkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    telegramUserId?: boolean;
    chatId?: boolean;
    telegramUsername?: boolean;
    enabled?: boolean;
    linkedAt?: boolean;
    lastDeliveryAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLink"]>;
export type TelegramLinkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    telegramUserId?: boolean;
    chatId?: boolean;
    telegramUsername?: boolean;
    enabled?: boolean;
    linkedAt?: boolean;
    lastDeliveryAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLink"]>;
export type TelegramLinkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    telegramUserId?: boolean;
    chatId?: boolean;
    telegramUsername?: boolean;
    enabled?: boolean;
    linkedAt?: boolean;
    lastDeliveryAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["telegramLink"]>;
export type TelegramLinkSelectScalar = {
    userId?: boolean;
    telegramUserId?: boolean;
    chatId?: boolean;
    telegramUsername?: boolean;
    enabled?: boolean;
    linkedAt?: boolean;
    lastDeliveryAt?: boolean;
};
export type TelegramLinkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "telegramUserId" | "chatId" | "telegramUsername" | "enabled" | "linkedAt" | "lastDeliveryAt", ExtArgs["result"]["telegramLink"]>;
export type TelegramLinkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TelegramLinkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TelegramLinkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TelegramLinkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TelegramLink";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        telegramUserId: string;
        chatId: string;
        telegramUsername: string | null;
        enabled: boolean;
        linkedAt: Date;
        lastDeliveryAt: Date | null;
    }, ExtArgs["result"]["telegramLink"]>;
    composites: {};
};
export type TelegramLinkGetPayload<S extends boolean | null | undefined | TelegramLinkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload, S>;
export type TelegramLinkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TelegramLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TelegramLinkCountAggregateInputType | true;
};
export interface TelegramLinkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TelegramLink'];
        meta: {
            name: 'TelegramLink';
        };
    };
    findUnique<T extends TelegramLinkFindUniqueArgs>(args: Prisma.SelectSubset<T, TelegramLinkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TelegramLinkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TelegramLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TelegramLinkFindFirstArgs>(args?: Prisma.SelectSubset<T, TelegramLinkFindFirstArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TelegramLinkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TelegramLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TelegramLinkFindManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TelegramLinkCreateArgs>(args: Prisma.SelectSubset<T, TelegramLinkCreateArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TelegramLinkCreateManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TelegramLinkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TelegramLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TelegramLinkDeleteArgs>(args: Prisma.SelectSubset<T, TelegramLinkDeleteArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TelegramLinkUpdateArgs>(args: Prisma.SelectSubset<T, TelegramLinkUpdateArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TelegramLinkDeleteManyArgs>(args?: Prisma.SelectSubset<T, TelegramLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TelegramLinkUpdateManyArgs>(args: Prisma.SelectSubset<T, TelegramLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TelegramLinkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TelegramLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TelegramLinkUpsertArgs>(args: Prisma.SelectSubset<T, TelegramLinkUpsertArgs<ExtArgs>>): Prisma.Prisma__TelegramLinkClient<runtime.Types.Result.GetResult<Prisma.$TelegramLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TelegramLinkCountArgs>(args?: Prisma.Subset<T, TelegramLinkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TelegramLinkCountAggregateOutputType> : number>;
    aggregate<T extends TelegramLinkAggregateArgs>(args: Prisma.Subset<T, TelegramLinkAggregateArgs>): Prisma.PrismaPromise<GetTelegramLinkAggregateType<T>>;
    groupBy<T extends TelegramLinkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TelegramLinkGroupByArgs['orderBy'];
    } : {
        orderBy?: TelegramLinkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TelegramLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TelegramLinkFieldRefs;
}
export interface Prisma__TelegramLinkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TelegramLinkFieldRefs {
    readonly userId: Prisma.FieldRef<"TelegramLink", 'String'>;
    readonly telegramUserId: Prisma.FieldRef<"TelegramLink", 'String'>;
    readonly chatId: Prisma.FieldRef<"TelegramLink", 'String'>;
    readonly telegramUsername: Prisma.FieldRef<"TelegramLink", 'String'>;
    readonly enabled: Prisma.FieldRef<"TelegramLink", 'Boolean'>;
    readonly linkedAt: Prisma.FieldRef<"TelegramLink", 'DateTime'>;
    readonly lastDeliveryAt: Prisma.FieldRef<"TelegramLink", 'DateTime'>;
}
export type TelegramLinkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkWhereInput;
    orderBy?: Prisma.TelegramLinkOrderByWithRelationInput | Prisma.TelegramLinkOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkScalarFieldEnum | Prisma.TelegramLinkScalarFieldEnum[];
};
export type TelegramLinkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkWhereInput;
    orderBy?: Prisma.TelegramLinkOrderByWithRelationInput | Prisma.TelegramLinkOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkScalarFieldEnum | Prisma.TelegramLinkScalarFieldEnum[];
};
export type TelegramLinkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where?: Prisma.TelegramLinkWhereInput;
    orderBy?: Prisma.TelegramLinkOrderByWithRelationInput | Prisma.TelegramLinkOrderByWithRelationInput[];
    cursor?: Prisma.TelegramLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TelegramLinkScalarFieldEnum | Prisma.TelegramLinkScalarFieldEnum[];
};
export type TelegramLinkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkCreateInput, Prisma.TelegramLinkUncheckedCreateInput>;
};
export type TelegramLinkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TelegramLinkCreateManyInput | Prisma.TelegramLinkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TelegramLinkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    data: Prisma.TelegramLinkCreateManyInput | Prisma.TelegramLinkCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TelegramLinkIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TelegramLinkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkUpdateInput, Prisma.TelegramLinkUncheckedUpdateInput>;
    where: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TelegramLinkUpdateManyMutationInput, Prisma.TelegramLinkUncheckedUpdateManyInput>;
    where?: Prisma.TelegramLinkWhereInput;
    limit?: number;
};
export type TelegramLinkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TelegramLinkUpdateManyMutationInput, Prisma.TelegramLinkUncheckedUpdateManyInput>;
    where?: Prisma.TelegramLinkWhereInput;
    limit?: number;
    include?: Prisma.TelegramLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TelegramLinkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.TelegramLinkCreateInput, Prisma.TelegramLinkUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TelegramLinkUpdateInput, Prisma.TelegramLinkUncheckedUpdateInput>;
};
export type TelegramLinkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
    where: Prisma.TelegramLinkWhereUniqueInput;
};
export type TelegramLinkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TelegramLinkWhereInput;
    limit?: number;
};
export type TelegramLinkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TelegramLinkSelect<ExtArgs> | null;
    omit?: Prisma.TelegramLinkOmit<ExtArgs> | null;
    include?: Prisma.TelegramLinkInclude<ExtArgs> | null;
};
export {};
