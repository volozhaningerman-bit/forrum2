import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserFollowModel = runtime.Types.Result.DefaultSelection<Prisma.$UserFollowPayload>;
export type AggregateUserFollow = {
    _count: UserFollowCountAggregateOutputType | null;
    _min: UserFollowMinAggregateOutputType | null;
    _max: UserFollowMaxAggregateOutputType | null;
};
export type UserFollowMinAggregateOutputType = {
    followerId: string | null;
    followingId: string | null;
    createdAt: Date | null;
};
export type UserFollowMaxAggregateOutputType = {
    followerId: string | null;
    followingId: string | null;
    createdAt: Date | null;
};
export type UserFollowCountAggregateOutputType = {
    followerId: number;
    followingId: number;
    createdAt: number;
    _all: number;
};
export type UserFollowMinAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
};
export type UserFollowMaxAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
};
export type UserFollowCountAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
    _all?: true;
};
export type UserFollowAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserFollowWhereInput;
    orderBy?: Prisma.UserFollowOrderByWithRelationInput | Prisma.UserFollowOrderByWithRelationInput[];
    cursor?: Prisma.UserFollowWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserFollowCountAggregateInputType;
    _min?: UserFollowMinAggregateInputType;
    _max?: UserFollowMaxAggregateInputType;
};
export type GetUserFollowAggregateType<T extends UserFollowAggregateArgs> = {
    [P in keyof T & keyof AggregateUserFollow]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserFollow[P]> : Prisma.GetScalarType<T[P], AggregateUserFollow[P]>;
};
export type UserFollowGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserFollowWhereInput;
    orderBy?: Prisma.UserFollowOrderByWithAggregationInput | Prisma.UserFollowOrderByWithAggregationInput[];
    by: Prisma.UserFollowScalarFieldEnum[] | Prisma.UserFollowScalarFieldEnum;
    having?: Prisma.UserFollowScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserFollowCountAggregateInputType | true;
    _min?: UserFollowMinAggregateInputType;
    _max?: UserFollowMaxAggregateInputType;
};
export type UserFollowGroupByOutputType = {
    followerId: string;
    followingId: string;
    createdAt: Date;
    _count: UserFollowCountAggregateOutputType | null;
    _min: UserFollowMinAggregateOutputType | null;
    _max: UserFollowMaxAggregateOutputType | null;
};
type GetUserFollowGroupByPayload<T extends UserFollowGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserFollowGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserFollowGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserFollowGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserFollowGroupByOutputType[P]>;
}>>;
export type UserFollowWhereInput = {
    AND?: Prisma.UserFollowWhereInput | Prisma.UserFollowWhereInput[];
    OR?: Prisma.UserFollowWhereInput[];
    NOT?: Prisma.UserFollowWhereInput | Prisma.UserFollowWhereInput[];
    followerId?: Prisma.UuidFilter<"UserFollow"> | string;
    followingId?: Prisma.UuidFilter<"UserFollow"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserFollow"> | Date | string;
    follower?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    following?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserFollowOrderByWithRelationInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    follower?: Prisma.UserOrderByWithRelationInput;
    following?: Prisma.UserOrderByWithRelationInput;
};
export type UserFollowWhereUniqueInput = Prisma.AtLeast<{
    followerId_followingId?: Prisma.UserFollowFollowerIdFollowingIdCompoundUniqueInput;
    AND?: Prisma.UserFollowWhereInput | Prisma.UserFollowWhereInput[];
    OR?: Prisma.UserFollowWhereInput[];
    NOT?: Prisma.UserFollowWhereInput | Prisma.UserFollowWhereInput[];
    followerId?: Prisma.UuidFilter<"UserFollow"> | string;
    followingId?: Prisma.UuidFilter<"UserFollow"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserFollow"> | Date | string;
    follower?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    following?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "followerId_followingId">;
export type UserFollowOrderByWithAggregationInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserFollowCountOrderByAggregateInput;
    _max?: Prisma.UserFollowMaxOrderByAggregateInput;
    _min?: Prisma.UserFollowMinOrderByAggregateInput;
};
export type UserFollowScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserFollowScalarWhereWithAggregatesInput | Prisma.UserFollowScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserFollowScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserFollowScalarWhereWithAggregatesInput | Prisma.UserFollowScalarWhereWithAggregatesInput[];
    followerId?: Prisma.UuidWithAggregatesFilter<"UserFollow"> | string;
    followingId?: Prisma.UuidWithAggregatesFilter<"UserFollow"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserFollow"> | Date | string;
};
export type UserFollowCreateInput = {
    createdAt?: Date | string;
    follower: Prisma.UserCreateNestedOneWithoutFollowingInput;
    following: Prisma.UserCreateNestedOneWithoutFollowersInput;
};
export type UserFollowUncheckedCreateInput = {
    followerId: string;
    followingId: string;
    createdAt?: Date | string;
};
export type UserFollowUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    follower?: Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput;
    following?: Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput;
};
export type UserFollowUncheckedUpdateInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowCreateManyInput = {
    followerId: string;
    followingId: string;
    createdAt?: Date | string;
};
export type UserFollowUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowUncheckedUpdateManyInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowListRelationFilter = {
    every?: Prisma.UserFollowWhereInput;
    some?: Prisma.UserFollowWhereInput;
    none?: Prisma.UserFollowWhereInput;
};
export type UserFollowOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserFollowFollowerIdFollowingIdCompoundUniqueInput = {
    followerId: string;
    followingId: string;
};
export type UserFollowCountOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserFollowMaxOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserFollowMinOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserFollowCreateNestedManyWithoutFollowerInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput> | Prisma.UserFollowCreateWithoutFollowerInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowerInput | Prisma.UserFollowCreateOrConnectWithoutFollowerInput[];
    createMany?: Prisma.UserFollowCreateManyFollowerInputEnvelope;
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
};
export type UserFollowCreateNestedManyWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput> | Prisma.UserFollowCreateWithoutFollowingInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowingInput | Prisma.UserFollowCreateOrConnectWithoutFollowingInput[];
    createMany?: Prisma.UserFollowCreateManyFollowingInputEnvelope;
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
};
export type UserFollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput> | Prisma.UserFollowCreateWithoutFollowerInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowerInput | Prisma.UserFollowCreateOrConnectWithoutFollowerInput[];
    createMany?: Prisma.UserFollowCreateManyFollowerInputEnvelope;
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
};
export type UserFollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput> | Prisma.UserFollowCreateWithoutFollowingInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowingInput | Prisma.UserFollowCreateOrConnectWithoutFollowingInput[];
    createMany?: Prisma.UserFollowCreateManyFollowingInputEnvelope;
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
};
export type UserFollowUpdateManyWithoutFollowerNestedInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput> | Prisma.UserFollowCreateWithoutFollowerInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowerInput | Prisma.UserFollowCreateOrConnectWithoutFollowerInput[];
    upsert?: Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowerInput | Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowerInput[];
    createMany?: Prisma.UserFollowCreateManyFollowerInputEnvelope;
    set?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    disconnect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    delete?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    update?: Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowerInput | Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowerInput[];
    updateMany?: Prisma.UserFollowUpdateManyWithWhereWithoutFollowerInput | Prisma.UserFollowUpdateManyWithWhereWithoutFollowerInput[];
    deleteMany?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
};
export type UserFollowUpdateManyWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput> | Prisma.UserFollowCreateWithoutFollowingInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowingInput | Prisma.UserFollowCreateOrConnectWithoutFollowingInput[];
    upsert?: Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowingInput | Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowingInput[];
    createMany?: Prisma.UserFollowCreateManyFollowingInputEnvelope;
    set?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    disconnect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    delete?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    update?: Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowingInput | Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowingInput[];
    updateMany?: Prisma.UserFollowUpdateManyWithWhereWithoutFollowingInput | Prisma.UserFollowUpdateManyWithWhereWithoutFollowingInput[];
    deleteMany?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
};
export type UserFollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput> | Prisma.UserFollowCreateWithoutFollowerInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowerInput | Prisma.UserFollowCreateOrConnectWithoutFollowerInput[];
    upsert?: Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowerInput | Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowerInput[];
    createMany?: Prisma.UserFollowCreateManyFollowerInputEnvelope;
    set?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    disconnect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    delete?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    update?: Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowerInput | Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowerInput[];
    updateMany?: Prisma.UserFollowUpdateManyWithWhereWithoutFollowerInput | Prisma.UserFollowUpdateManyWithWhereWithoutFollowerInput[];
    deleteMany?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
};
export type UserFollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput> | Prisma.UserFollowCreateWithoutFollowingInput[] | Prisma.UserFollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.UserFollowCreateOrConnectWithoutFollowingInput | Prisma.UserFollowCreateOrConnectWithoutFollowingInput[];
    upsert?: Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowingInput | Prisma.UserFollowUpsertWithWhereUniqueWithoutFollowingInput[];
    createMany?: Prisma.UserFollowCreateManyFollowingInputEnvelope;
    set?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    disconnect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    delete?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    connect?: Prisma.UserFollowWhereUniqueInput | Prisma.UserFollowWhereUniqueInput[];
    update?: Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowingInput | Prisma.UserFollowUpdateWithWhereUniqueWithoutFollowingInput[];
    updateMany?: Prisma.UserFollowUpdateManyWithWhereWithoutFollowingInput | Prisma.UserFollowUpdateManyWithWhereWithoutFollowingInput[];
    deleteMany?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
};
export type UserFollowCreateWithoutFollowerInput = {
    createdAt?: Date | string;
    following: Prisma.UserCreateNestedOneWithoutFollowersInput;
};
export type UserFollowUncheckedCreateWithoutFollowerInput = {
    followingId: string;
    createdAt?: Date | string;
};
export type UserFollowCreateOrConnectWithoutFollowerInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput>;
};
export type UserFollowCreateManyFollowerInputEnvelope = {
    data: Prisma.UserFollowCreateManyFollowerInput | Prisma.UserFollowCreateManyFollowerInput[];
    skipDuplicates?: boolean;
};
export type UserFollowCreateWithoutFollowingInput = {
    createdAt?: Date | string;
    follower: Prisma.UserCreateNestedOneWithoutFollowingInput;
};
export type UserFollowUncheckedCreateWithoutFollowingInput = {
    followerId: string;
    createdAt?: Date | string;
};
export type UserFollowCreateOrConnectWithoutFollowingInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput>;
};
export type UserFollowCreateManyFollowingInputEnvelope = {
    data: Prisma.UserFollowCreateManyFollowingInput | Prisma.UserFollowCreateManyFollowingInput[];
    skipDuplicates?: boolean;
};
export type UserFollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserFollowUpdateWithoutFollowerInput, Prisma.UserFollowUncheckedUpdateWithoutFollowerInput>;
    create: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowerInput, Prisma.UserFollowUncheckedCreateWithoutFollowerInput>;
};
export type UserFollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserFollowUpdateWithoutFollowerInput, Prisma.UserFollowUncheckedUpdateWithoutFollowerInput>;
};
export type UserFollowUpdateManyWithWhereWithoutFollowerInput = {
    where: Prisma.UserFollowScalarWhereInput;
    data: Prisma.XOR<Prisma.UserFollowUpdateManyMutationInput, Prisma.UserFollowUncheckedUpdateManyWithoutFollowerInput>;
};
export type UserFollowScalarWhereInput = {
    AND?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
    OR?: Prisma.UserFollowScalarWhereInput[];
    NOT?: Prisma.UserFollowScalarWhereInput | Prisma.UserFollowScalarWhereInput[];
    followerId?: Prisma.UuidFilter<"UserFollow"> | string;
    followingId?: Prisma.UuidFilter<"UserFollow"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserFollow"> | Date | string;
};
export type UserFollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserFollowUpdateWithoutFollowingInput, Prisma.UserFollowUncheckedUpdateWithoutFollowingInput>;
    create: Prisma.XOR<Prisma.UserFollowCreateWithoutFollowingInput, Prisma.UserFollowUncheckedCreateWithoutFollowingInput>;
};
export type UserFollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: Prisma.UserFollowWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserFollowUpdateWithoutFollowingInput, Prisma.UserFollowUncheckedUpdateWithoutFollowingInput>;
};
export type UserFollowUpdateManyWithWhereWithoutFollowingInput = {
    where: Prisma.UserFollowScalarWhereInput;
    data: Prisma.XOR<Prisma.UserFollowUpdateManyMutationInput, Prisma.UserFollowUncheckedUpdateManyWithoutFollowingInput>;
};
export type UserFollowCreateManyFollowerInput = {
    followingId: string;
    createdAt?: Date | string;
};
export type UserFollowCreateManyFollowingInput = {
    followerId: string;
    createdAt?: Date | string;
};
export type UserFollowUpdateWithoutFollowerInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    following?: Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput;
};
export type UserFollowUncheckedUpdateWithoutFollowerInput = {
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowUncheckedUpdateManyWithoutFollowerInput = {
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowUpdateWithoutFollowingInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    follower?: Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput;
};
export type UserFollowUncheckedUpdateWithoutFollowingInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowUncheckedUpdateManyWithoutFollowingInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserFollowSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userFollow"]>;
export type UserFollowSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userFollow"]>;
export type UserFollowSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userFollow"]>;
export type UserFollowSelectScalar = {
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
};
export type UserFollowOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"followerId" | "followingId" | "createdAt", ExtArgs["result"]["userFollow"]>;
export type UserFollowInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserFollowIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserFollowIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserFollowPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserFollow";
    objects: {
        follower: Prisma.$UserPayload<ExtArgs>;
        following: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        followerId: string;
        followingId: string;
        createdAt: Date;
    }, ExtArgs["result"]["userFollow"]>;
    composites: {};
};
export type UserFollowGetPayload<S extends boolean | null | undefined | UserFollowDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserFollowPayload, S>;
export type UserFollowCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserFollowCountAggregateInputType | true;
};
export interface UserFollowDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserFollow'];
        meta: {
            name: 'UserFollow';
        };
    };
    findUnique<T extends UserFollowFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFollowFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFollowFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFollowFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFollowFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFollowFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFollowFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFollowFindManyArgs>(args?: Prisma.SelectSubset<T, UserFollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserFollowCreateArgs>(args: Prisma.SelectSubset<T, UserFollowCreateArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserFollowCreateManyArgs>(args?: Prisma.SelectSubset<T, UserFollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserFollowCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserFollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserFollowDeleteArgs>(args: Prisma.SelectSubset<T, UserFollowDeleteArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserFollowUpdateArgs>(args: Prisma.SelectSubset<T, UserFollowUpdateArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserFollowDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserFollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserFollowUpdateManyArgs>(args: Prisma.SelectSubset<T, UserFollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserFollowUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserFollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserFollowUpsertArgs>(args: Prisma.SelectSubset<T, UserFollowUpsertArgs<ExtArgs>>): Prisma.Prisma__UserFollowClient<runtime.Types.Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserFollowCountArgs>(args?: Prisma.Subset<T, UserFollowCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserFollowCountAggregateOutputType> : number>;
    aggregate<T extends UserFollowAggregateArgs>(args: Prisma.Subset<T, UserFollowAggregateArgs>): Prisma.PrismaPromise<GetUserFollowAggregateType<T>>;
    groupBy<T extends UserFollowGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserFollowGroupByArgs['orderBy'];
    } : {
        orderBy?: UserFollowGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserFollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFollowFieldRefs;
}
export interface Prisma__UserFollowClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    follower<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    following<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFollowFieldRefs {
    readonly followerId: Prisma.FieldRef<"UserFollow", 'String'>;
    readonly followingId: Prisma.FieldRef<"UserFollow", 'String'>;
    readonly createdAt: Prisma.FieldRef<"UserFollow", 'DateTime'>;
}
export type UserFollowFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where: Prisma.UserFollowWhereUniqueInput;
};
export type UserFollowFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where: Prisma.UserFollowWhereUniqueInput;
};
export type UserFollowFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where?: Prisma.UserFollowWhereInput;
    orderBy?: Prisma.UserFollowOrderByWithRelationInput | Prisma.UserFollowOrderByWithRelationInput[];
    cursor?: Prisma.UserFollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserFollowScalarFieldEnum | Prisma.UserFollowScalarFieldEnum[];
};
export type UserFollowFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where?: Prisma.UserFollowWhereInput;
    orderBy?: Prisma.UserFollowOrderByWithRelationInput | Prisma.UserFollowOrderByWithRelationInput[];
    cursor?: Prisma.UserFollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserFollowScalarFieldEnum | Prisma.UserFollowScalarFieldEnum[];
};
export type UserFollowFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where?: Prisma.UserFollowWhereInput;
    orderBy?: Prisma.UserFollowOrderByWithRelationInput | Prisma.UserFollowOrderByWithRelationInput[];
    cursor?: Prisma.UserFollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserFollowScalarFieldEnum | Prisma.UserFollowScalarFieldEnum[];
};
export type UserFollowCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserFollowCreateInput, Prisma.UserFollowUncheckedCreateInput>;
};
export type UserFollowCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserFollowCreateManyInput | Prisma.UserFollowCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserFollowCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    data: Prisma.UserFollowCreateManyInput | Prisma.UserFollowCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserFollowIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserFollowUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserFollowUpdateInput, Prisma.UserFollowUncheckedUpdateInput>;
    where: Prisma.UserFollowWhereUniqueInput;
};
export type UserFollowUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserFollowUpdateManyMutationInput, Prisma.UserFollowUncheckedUpdateManyInput>;
    where?: Prisma.UserFollowWhereInput;
    limit?: number;
};
export type UserFollowUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserFollowUpdateManyMutationInput, Prisma.UserFollowUncheckedUpdateManyInput>;
    where?: Prisma.UserFollowWhereInput;
    limit?: number;
    include?: Prisma.UserFollowIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserFollowUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where: Prisma.UserFollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserFollowCreateInput, Prisma.UserFollowUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserFollowUpdateInput, Prisma.UserFollowUncheckedUpdateInput>;
};
export type UserFollowDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
    where: Prisma.UserFollowWhereUniqueInput;
};
export type UserFollowDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserFollowWhereInput;
    limit?: number;
};
export type UserFollowDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserFollowSelect<ExtArgs> | null;
    omit?: Prisma.UserFollowOmit<ExtArgs> | null;
    include?: Prisma.UserFollowInclude<ExtArgs> | null;
};
export {};
