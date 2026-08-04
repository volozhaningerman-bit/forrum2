import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FeedPreferenceModel = runtime.Types.Result.DefaultSelection<Prisma.$FeedPreferencePayload>;
export type AggregateFeedPreference = {
    _count: FeedPreferenceCountAggregateOutputType | null;
    _min: FeedPreferenceMinAggregateOutputType | null;
    _max: FeedPreferenceMaxAggregateOutputType | null;
};
export type FeedPreferenceMinAggregateOutputType = {
    userId: string | null;
    recommendationsEnabled: boolean | null;
    showReasons: boolean | null;
    updatedAt: Date | null;
};
export type FeedPreferenceMaxAggregateOutputType = {
    userId: string | null;
    recommendationsEnabled: boolean | null;
    showReasons: boolean | null;
    updatedAt: Date | null;
};
export type FeedPreferenceCountAggregateOutputType = {
    userId: number;
    recommendationsEnabled: number;
    showReasons: number;
    updatedAt: number;
    _all: number;
};
export type FeedPreferenceMinAggregateInputType = {
    userId?: true;
    recommendationsEnabled?: true;
    showReasons?: true;
    updatedAt?: true;
};
export type FeedPreferenceMaxAggregateInputType = {
    userId?: true;
    recommendationsEnabled?: true;
    showReasons?: true;
    updatedAt?: true;
};
export type FeedPreferenceCountAggregateInputType = {
    userId?: true;
    recommendationsEnabled?: true;
    showReasons?: true;
    updatedAt?: true;
    _all?: true;
};
export type FeedPreferenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedPreferenceWhereInput;
    orderBy?: Prisma.FeedPreferenceOrderByWithRelationInput | Prisma.FeedPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.FeedPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FeedPreferenceCountAggregateInputType;
    _min?: FeedPreferenceMinAggregateInputType;
    _max?: FeedPreferenceMaxAggregateInputType;
};
export type GetFeedPreferenceAggregateType<T extends FeedPreferenceAggregateArgs> = {
    [P in keyof T & keyof AggregateFeedPreference]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFeedPreference[P]> : Prisma.GetScalarType<T[P], AggregateFeedPreference[P]>;
};
export type FeedPreferenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedPreferenceWhereInput;
    orderBy?: Prisma.FeedPreferenceOrderByWithAggregationInput | Prisma.FeedPreferenceOrderByWithAggregationInput[];
    by: Prisma.FeedPreferenceScalarFieldEnum[] | Prisma.FeedPreferenceScalarFieldEnum;
    having?: Prisma.FeedPreferenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FeedPreferenceCountAggregateInputType | true;
    _min?: FeedPreferenceMinAggregateInputType;
    _max?: FeedPreferenceMaxAggregateInputType;
};
export type FeedPreferenceGroupByOutputType = {
    userId: string;
    recommendationsEnabled: boolean;
    showReasons: boolean;
    updatedAt: Date;
    _count: FeedPreferenceCountAggregateOutputType | null;
    _min: FeedPreferenceMinAggregateOutputType | null;
    _max: FeedPreferenceMaxAggregateOutputType | null;
};
type GetFeedPreferenceGroupByPayload<T extends FeedPreferenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FeedPreferenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FeedPreferenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FeedPreferenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FeedPreferenceGroupByOutputType[P]>;
}>>;
export type FeedPreferenceWhereInput = {
    AND?: Prisma.FeedPreferenceWhereInput | Prisma.FeedPreferenceWhereInput[];
    OR?: Prisma.FeedPreferenceWhereInput[];
    NOT?: Prisma.FeedPreferenceWhereInput | Prisma.FeedPreferenceWhereInput[];
    userId?: Prisma.UuidFilter<"FeedPreference"> | string;
    recommendationsEnabled?: Prisma.BoolFilter<"FeedPreference"> | boolean;
    showReasons?: Prisma.BoolFilter<"FeedPreference"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"FeedPreference"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FeedPreferenceOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    recommendationsEnabled?: Prisma.SortOrder;
    showReasons?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FeedPreferenceWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.FeedPreferenceWhereInput | Prisma.FeedPreferenceWhereInput[];
    OR?: Prisma.FeedPreferenceWhereInput[];
    NOT?: Prisma.FeedPreferenceWhereInput | Prisma.FeedPreferenceWhereInput[];
    recommendationsEnabled?: Prisma.BoolFilter<"FeedPreference"> | boolean;
    showReasons?: Prisma.BoolFilter<"FeedPreference"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"FeedPreference"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type FeedPreferenceOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    recommendationsEnabled?: Prisma.SortOrder;
    showReasons?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FeedPreferenceCountOrderByAggregateInput;
    _max?: Prisma.FeedPreferenceMaxOrderByAggregateInput;
    _min?: Prisma.FeedPreferenceMinOrderByAggregateInput;
};
export type FeedPreferenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.FeedPreferenceScalarWhereWithAggregatesInput | Prisma.FeedPreferenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.FeedPreferenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FeedPreferenceScalarWhereWithAggregatesInput | Prisma.FeedPreferenceScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"FeedPreference"> | string;
    recommendationsEnabled?: Prisma.BoolWithAggregatesFilter<"FeedPreference"> | boolean;
    showReasons?: Prisma.BoolWithAggregatesFilter<"FeedPreference"> | boolean;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FeedPreference"> | Date | string;
};
export type FeedPreferenceCreateInput = {
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFeedPreferenceInput;
};
export type FeedPreferenceUncheckedCreateInput = {
    userId: string;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: Date | string;
};
export type FeedPreferenceUpdateInput = {
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFeedPreferenceNestedInput;
};
export type FeedPreferenceUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedPreferenceCreateManyInput = {
    userId: string;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: Date | string;
};
export type FeedPreferenceUpdateManyMutationInput = {
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedPreferenceUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedPreferenceNullableScalarRelationFilter = {
    is?: Prisma.FeedPreferenceWhereInput | null;
    isNot?: Prisma.FeedPreferenceWhereInput | null;
};
export type FeedPreferenceCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    recommendationsEnabled?: Prisma.SortOrder;
    showReasons?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedPreferenceMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    recommendationsEnabled?: Prisma.SortOrder;
    showReasons?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedPreferenceMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    recommendationsEnabled?: Prisma.SortOrder;
    showReasons?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedPreferenceCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FeedPreferenceCreateOrConnectWithoutUserInput;
    connect?: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FeedPreferenceCreateOrConnectWithoutUserInput;
    connect?: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FeedPreferenceCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FeedPreferenceUpsertWithoutUserInput;
    disconnect?: Prisma.FeedPreferenceWhereInput | boolean;
    delete?: Prisma.FeedPreferenceWhereInput | boolean;
    connect?: Prisma.FeedPreferenceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedPreferenceUpdateToOneWithWhereWithoutUserInput, Prisma.FeedPreferenceUpdateWithoutUserInput>, Prisma.FeedPreferenceUncheckedUpdateWithoutUserInput>;
};
export type FeedPreferenceUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FeedPreferenceCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FeedPreferenceUpsertWithoutUserInput;
    disconnect?: Prisma.FeedPreferenceWhereInput | boolean;
    delete?: Prisma.FeedPreferenceWhereInput | boolean;
    connect?: Prisma.FeedPreferenceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedPreferenceUpdateToOneWithWhereWithoutUserInput, Prisma.FeedPreferenceUpdateWithoutUserInput>, Prisma.FeedPreferenceUncheckedUpdateWithoutUserInput>;
};
export type FeedPreferenceCreateWithoutUserInput = {
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: Date | string;
};
export type FeedPreferenceUncheckedCreateWithoutUserInput = {
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: Date | string;
};
export type FeedPreferenceCreateOrConnectWithoutUserInput = {
    where: Prisma.FeedPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
};
export type FeedPreferenceUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FeedPreferenceUpdateWithoutUserInput, Prisma.FeedPreferenceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FeedPreferenceCreateWithoutUserInput, Prisma.FeedPreferenceUncheckedCreateWithoutUserInput>;
    where?: Prisma.FeedPreferenceWhereInput;
};
export type FeedPreferenceUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FeedPreferenceWhereInput;
    data: Prisma.XOR<Prisma.FeedPreferenceUpdateWithoutUserInput, Prisma.FeedPreferenceUncheckedUpdateWithoutUserInput>;
};
export type FeedPreferenceUpdateWithoutUserInput = {
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedPreferenceUncheckedUpdateWithoutUserInput = {
    recommendationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    showReasons?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedPreferenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedPreference"]>;
export type FeedPreferenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedPreference"]>;
export type FeedPreferenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedPreference"]>;
export type FeedPreferenceSelectScalar = {
    userId?: boolean;
    recommendationsEnabled?: boolean;
    showReasons?: boolean;
    updatedAt?: boolean;
};
export type FeedPreferenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "recommendationsEnabled" | "showReasons" | "updatedAt", ExtArgs["result"]["feedPreference"]>;
export type FeedPreferenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FeedPreferenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FeedPreferenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FeedPreferencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FeedPreference";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        recommendationsEnabled: boolean;
        showReasons: boolean;
        updatedAt: Date;
    }, ExtArgs["result"]["feedPreference"]>;
    composites: {};
};
export type FeedPreferenceGetPayload<S extends boolean | null | undefined | FeedPreferenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload, S>;
export type FeedPreferenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FeedPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeedPreferenceCountAggregateInputType | true;
};
export interface FeedPreferenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FeedPreference'];
        meta: {
            name: 'FeedPreference';
        };
    };
    findUnique<T extends FeedPreferenceFindUniqueArgs>(args: Prisma.SelectSubset<T, FeedPreferenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FeedPreferenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeedPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FeedPreferenceFindFirstArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FeedPreferenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FeedPreferenceFindManyArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FeedPreferenceCreateArgs>(args: Prisma.SelectSubset<T, FeedPreferenceCreateArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FeedPreferenceCreateManyArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FeedPreferenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FeedPreferenceDeleteArgs>(args: Prisma.SelectSubset<T, FeedPreferenceDeleteArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FeedPreferenceUpdateArgs>(args: Prisma.SelectSubset<T, FeedPreferenceUpdateArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FeedPreferenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeedPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FeedPreferenceUpdateManyArgs>(args: Prisma.SelectSubset<T, FeedPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FeedPreferenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeedPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FeedPreferenceUpsertArgs>(args: Prisma.SelectSubset<T, FeedPreferenceUpsertArgs<ExtArgs>>): Prisma.Prisma__FeedPreferenceClient<runtime.Types.Result.GetResult<Prisma.$FeedPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FeedPreferenceCountArgs>(args?: Prisma.Subset<T, FeedPreferenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FeedPreferenceCountAggregateOutputType> : number>;
    aggregate<T extends FeedPreferenceAggregateArgs>(args: Prisma.Subset<T, FeedPreferenceAggregateArgs>): Prisma.PrismaPromise<GetFeedPreferenceAggregateType<T>>;
    groupBy<T extends FeedPreferenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FeedPreferenceGroupByArgs['orderBy'];
    } : {
        orderBy?: FeedPreferenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FeedPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FeedPreferenceFieldRefs;
}
export interface Prisma__FeedPreferenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FeedPreferenceFieldRefs {
    readonly userId: Prisma.FieldRef<"FeedPreference", 'String'>;
    readonly recommendationsEnabled: Prisma.FieldRef<"FeedPreference", 'Boolean'>;
    readonly showReasons: Prisma.FieldRef<"FeedPreference", 'Boolean'>;
    readonly updatedAt: Prisma.FieldRef<"FeedPreference", 'DateTime'>;
}
export type FeedPreferenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where?: Prisma.FeedPreferenceWhereInput;
    orderBy?: Prisma.FeedPreferenceOrderByWithRelationInput | Prisma.FeedPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.FeedPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedPreferenceScalarFieldEnum | Prisma.FeedPreferenceScalarFieldEnum[];
};
export type FeedPreferenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where?: Prisma.FeedPreferenceWhereInput;
    orderBy?: Prisma.FeedPreferenceOrderByWithRelationInput | Prisma.FeedPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.FeedPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedPreferenceScalarFieldEnum | Prisma.FeedPreferenceScalarFieldEnum[];
};
export type FeedPreferenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where?: Prisma.FeedPreferenceWhereInput;
    orderBy?: Prisma.FeedPreferenceOrderByWithRelationInput | Prisma.FeedPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.FeedPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedPreferenceScalarFieldEnum | Prisma.FeedPreferenceScalarFieldEnum[];
};
export type FeedPreferenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedPreferenceCreateInput, Prisma.FeedPreferenceUncheckedCreateInput>;
};
export type FeedPreferenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeedPreferenceCreateManyInput | Prisma.FeedPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FeedPreferenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    data: Prisma.FeedPreferenceCreateManyInput | Prisma.FeedPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FeedPreferenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FeedPreferenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedPreferenceUpdateInput, Prisma.FeedPreferenceUncheckedUpdateInput>;
    where: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeedPreferenceUpdateManyMutationInput, Prisma.FeedPreferenceUncheckedUpdateManyInput>;
    where?: Prisma.FeedPreferenceWhereInput;
    limit?: number;
};
export type FeedPreferenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedPreferenceUpdateManyMutationInput, Prisma.FeedPreferenceUncheckedUpdateManyInput>;
    where?: Prisma.FeedPreferenceWhereInput;
    limit?: number;
    include?: Prisma.FeedPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FeedPreferenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where: Prisma.FeedPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedPreferenceCreateInput, Prisma.FeedPreferenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FeedPreferenceUpdateInput, Prisma.FeedPreferenceUncheckedUpdateInput>;
};
export type FeedPreferenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
    where: Prisma.FeedPreferenceWhereUniqueInput;
};
export type FeedPreferenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedPreferenceWhereInput;
    limit?: number;
};
export type FeedPreferenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.FeedPreferenceOmit<ExtArgs> | null;
    include?: Prisma.FeedPreferenceInclude<ExtArgs> | null;
};
export {};
