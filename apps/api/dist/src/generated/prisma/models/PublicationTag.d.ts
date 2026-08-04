import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PublicationTagModel = runtime.Types.Result.DefaultSelection<Prisma.$PublicationTagPayload>;
export type AggregatePublicationTag = {
    _count: PublicationTagCountAggregateOutputType | null;
    _min: PublicationTagMinAggregateOutputType | null;
    _max: PublicationTagMaxAggregateOutputType | null;
};
export type PublicationTagMinAggregateOutputType = {
    publicationId: string | null;
    tagId: string | null;
};
export type PublicationTagMaxAggregateOutputType = {
    publicationId: string | null;
    tagId: string | null;
};
export type PublicationTagCountAggregateOutputType = {
    publicationId: number;
    tagId: number;
    _all: number;
};
export type PublicationTagMinAggregateInputType = {
    publicationId?: true;
    tagId?: true;
};
export type PublicationTagMaxAggregateInputType = {
    publicationId?: true;
    tagId?: true;
};
export type PublicationTagCountAggregateInputType = {
    publicationId?: true;
    tagId?: true;
    _all?: true;
};
export type PublicationTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationTagWhereInput;
    orderBy?: Prisma.PublicationTagOrderByWithRelationInput | Prisma.PublicationTagOrderByWithRelationInput[];
    cursor?: Prisma.PublicationTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PublicationTagCountAggregateInputType;
    _min?: PublicationTagMinAggregateInputType;
    _max?: PublicationTagMaxAggregateInputType;
};
export type GetPublicationTagAggregateType<T extends PublicationTagAggregateArgs> = {
    [P in keyof T & keyof AggregatePublicationTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePublicationTag[P]> : Prisma.GetScalarType<T[P], AggregatePublicationTag[P]>;
};
export type PublicationTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationTagWhereInput;
    orderBy?: Prisma.PublicationTagOrderByWithAggregationInput | Prisma.PublicationTagOrderByWithAggregationInput[];
    by: Prisma.PublicationTagScalarFieldEnum[] | Prisma.PublicationTagScalarFieldEnum;
    having?: Prisma.PublicationTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PublicationTagCountAggregateInputType | true;
    _min?: PublicationTagMinAggregateInputType;
    _max?: PublicationTagMaxAggregateInputType;
};
export type PublicationTagGroupByOutputType = {
    publicationId: string;
    tagId: string;
    _count: PublicationTagCountAggregateOutputType | null;
    _min: PublicationTagMinAggregateOutputType | null;
    _max: PublicationTagMaxAggregateOutputType | null;
};
type GetPublicationTagGroupByPayload<T extends PublicationTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PublicationTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PublicationTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PublicationTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PublicationTagGroupByOutputType[P]>;
}>>;
export type PublicationTagWhereInput = {
    AND?: Prisma.PublicationTagWhereInput | Prisma.PublicationTagWhereInput[];
    OR?: Prisma.PublicationTagWhereInput[];
    NOT?: Prisma.PublicationTagWhereInput | Prisma.PublicationTagWhereInput[];
    publicationId?: Prisma.UuidFilter<"PublicationTag"> | string;
    tagId?: Prisma.UuidFilter<"PublicationTag"> | string;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type PublicationTagOrderByWithRelationInput = {
    publicationId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    publication?: Prisma.PublicationOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type PublicationTagWhereUniqueInput = Prisma.AtLeast<{
    publicationId_tagId?: Prisma.PublicationTagPublicationIdTagIdCompoundUniqueInput;
    AND?: Prisma.PublicationTagWhereInput | Prisma.PublicationTagWhereInput[];
    OR?: Prisma.PublicationTagWhereInput[];
    NOT?: Prisma.PublicationTagWhereInput | Prisma.PublicationTagWhereInput[];
    publicationId?: Prisma.UuidFilter<"PublicationTag"> | string;
    tagId?: Prisma.UuidFilter<"PublicationTag"> | string;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "publicationId_tagId">;
export type PublicationTagOrderByWithAggregationInput = {
    publicationId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    _count?: Prisma.PublicationTagCountOrderByAggregateInput;
    _max?: Prisma.PublicationTagMaxOrderByAggregateInput;
    _min?: Prisma.PublicationTagMinOrderByAggregateInput;
};
export type PublicationTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.PublicationTagScalarWhereWithAggregatesInput | Prisma.PublicationTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.PublicationTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PublicationTagScalarWhereWithAggregatesInput | Prisma.PublicationTagScalarWhereWithAggregatesInput[];
    publicationId?: Prisma.UuidWithAggregatesFilter<"PublicationTag"> | string;
    tagId?: Prisma.UuidWithAggregatesFilter<"PublicationTag"> | string;
};
export type PublicationTagCreateInput = {
    publication: Prisma.PublicationCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutPublicationsInput;
};
export type PublicationTagUncheckedCreateInput = {
    publicationId: string;
    tagId: string;
};
export type PublicationTagUpdateInput = {
    publication?: Prisma.PublicationUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutPublicationsNestedInput;
};
export type PublicationTagUncheckedUpdateInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagCreateManyInput = {
    publicationId: string;
    tagId: string;
};
export type PublicationTagUpdateManyMutationInput = {};
export type PublicationTagUncheckedUpdateManyInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagListRelationFilter = {
    every?: Prisma.PublicationTagWhereInput;
    some?: Prisma.PublicationTagWhereInput;
    none?: Prisma.PublicationTagWhereInput;
};
export type PublicationTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PublicationTagPublicationIdTagIdCompoundUniqueInput = {
    publicationId: string;
    tagId: string;
};
export type PublicationTagCountOrderByAggregateInput = {
    publicationId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type PublicationTagMaxOrderByAggregateInput = {
    publicationId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type PublicationTagMinOrderByAggregateInput = {
    publicationId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type PublicationTagCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput> | Prisma.PublicationTagCreateWithoutPublicationInput[] | Prisma.PublicationTagUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutPublicationInput | Prisma.PublicationTagCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PublicationTagCreateManyPublicationInputEnvelope;
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
};
export type PublicationTagUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput> | Prisma.PublicationTagCreateWithoutPublicationInput[] | Prisma.PublicationTagUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutPublicationInput | Prisma.PublicationTagCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.PublicationTagCreateManyPublicationInputEnvelope;
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
};
export type PublicationTagUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput> | Prisma.PublicationTagCreateWithoutPublicationInput[] | Prisma.PublicationTagUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutPublicationInput | Prisma.PublicationTagCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PublicationTagUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PublicationTagUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PublicationTagCreateManyPublicationInputEnvelope;
    set?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    disconnect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    delete?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    update?: Prisma.PublicationTagUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PublicationTagUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PublicationTagUpdateManyWithWhereWithoutPublicationInput | Prisma.PublicationTagUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
};
export type PublicationTagUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput> | Prisma.PublicationTagCreateWithoutPublicationInput[] | Prisma.PublicationTagUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutPublicationInput | Prisma.PublicationTagCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.PublicationTagUpsertWithWhereUniqueWithoutPublicationInput | Prisma.PublicationTagUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.PublicationTagCreateManyPublicationInputEnvelope;
    set?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    disconnect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    delete?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    update?: Prisma.PublicationTagUpdateWithWhereUniqueWithoutPublicationInput | Prisma.PublicationTagUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.PublicationTagUpdateManyWithWhereWithoutPublicationInput | Prisma.PublicationTagUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
};
export type PublicationTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput> | Prisma.PublicationTagCreateWithoutTagInput[] | Prisma.PublicationTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutTagInput | Prisma.PublicationTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.PublicationTagCreateManyTagInputEnvelope;
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
};
export type PublicationTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput> | Prisma.PublicationTagCreateWithoutTagInput[] | Prisma.PublicationTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutTagInput | Prisma.PublicationTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.PublicationTagCreateManyTagInputEnvelope;
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
};
export type PublicationTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput> | Prisma.PublicationTagCreateWithoutTagInput[] | Prisma.PublicationTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutTagInput | Prisma.PublicationTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.PublicationTagUpsertWithWhereUniqueWithoutTagInput | Prisma.PublicationTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.PublicationTagCreateManyTagInputEnvelope;
    set?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    disconnect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    delete?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    update?: Prisma.PublicationTagUpdateWithWhereUniqueWithoutTagInput | Prisma.PublicationTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.PublicationTagUpdateManyWithWhereWithoutTagInput | Prisma.PublicationTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
};
export type PublicationTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput> | Prisma.PublicationTagCreateWithoutTagInput[] | Prisma.PublicationTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PublicationTagCreateOrConnectWithoutTagInput | Prisma.PublicationTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.PublicationTagUpsertWithWhereUniqueWithoutTagInput | Prisma.PublicationTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.PublicationTagCreateManyTagInputEnvelope;
    set?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    disconnect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    delete?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    connect?: Prisma.PublicationTagWhereUniqueInput | Prisma.PublicationTagWhereUniqueInput[];
    update?: Prisma.PublicationTagUpdateWithWhereUniqueWithoutTagInput | Prisma.PublicationTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.PublicationTagUpdateManyWithWhereWithoutTagInput | Prisma.PublicationTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
};
export type PublicationTagCreateWithoutPublicationInput = {
    tag: Prisma.TagCreateNestedOneWithoutPublicationsInput;
};
export type PublicationTagUncheckedCreateWithoutPublicationInput = {
    tagId: string;
};
export type PublicationTagCreateOrConnectWithoutPublicationInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput>;
};
export type PublicationTagCreateManyPublicationInputEnvelope = {
    data: Prisma.PublicationTagCreateManyPublicationInput | Prisma.PublicationTagCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type PublicationTagUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.PublicationTagUpdateWithoutPublicationInput, Prisma.PublicationTagUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.PublicationTagCreateWithoutPublicationInput, Prisma.PublicationTagUncheckedCreateWithoutPublicationInput>;
};
export type PublicationTagUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.PublicationTagUpdateWithoutPublicationInput, Prisma.PublicationTagUncheckedUpdateWithoutPublicationInput>;
};
export type PublicationTagUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.PublicationTagScalarWhereInput;
    data: Prisma.XOR<Prisma.PublicationTagUpdateManyMutationInput, Prisma.PublicationTagUncheckedUpdateManyWithoutPublicationInput>;
};
export type PublicationTagScalarWhereInput = {
    AND?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
    OR?: Prisma.PublicationTagScalarWhereInput[];
    NOT?: Prisma.PublicationTagScalarWhereInput | Prisma.PublicationTagScalarWhereInput[];
    publicationId?: Prisma.UuidFilter<"PublicationTag"> | string;
    tagId?: Prisma.UuidFilter<"PublicationTag"> | string;
};
export type PublicationTagCreateWithoutTagInput = {
    publication: Prisma.PublicationCreateNestedOneWithoutTagsInput;
};
export type PublicationTagUncheckedCreateWithoutTagInput = {
    publicationId: string;
};
export type PublicationTagCreateOrConnectWithoutTagInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput>;
};
export type PublicationTagCreateManyTagInputEnvelope = {
    data: Prisma.PublicationTagCreateManyTagInput | Prisma.PublicationTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type PublicationTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.PublicationTagUpdateWithoutTagInput, Prisma.PublicationTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.PublicationTagCreateWithoutTagInput, Prisma.PublicationTagUncheckedCreateWithoutTagInput>;
};
export type PublicationTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.PublicationTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.PublicationTagUpdateWithoutTagInput, Prisma.PublicationTagUncheckedUpdateWithoutTagInput>;
};
export type PublicationTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.PublicationTagScalarWhereInput;
    data: Prisma.XOR<Prisma.PublicationTagUpdateManyMutationInput, Prisma.PublicationTagUncheckedUpdateManyWithoutTagInput>;
};
export type PublicationTagCreateManyPublicationInput = {
    tagId: string;
};
export type PublicationTagUpdateWithoutPublicationInput = {
    tag?: Prisma.TagUpdateOneRequiredWithoutPublicationsNestedInput;
};
export type PublicationTagUncheckedUpdateWithoutPublicationInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagUncheckedUpdateManyWithoutPublicationInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagCreateManyTagInput = {
    publicationId: string;
};
export type PublicationTagUpdateWithoutTagInput = {
    publication?: Prisma.PublicationUpdateOneRequiredWithoutTagsNestedInput;
};
export type PublicationTagUncheckedUpdateWithoutTagInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagUncheckedUpdateManyWithoutTagInput = {
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PublicationTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicationId?: boolean;
    tagId?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationTag"]>;
export type PublicationTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicationId?: boolean;
    tagId?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationTag"]>;
export type PublicationTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicationId?: boolean;
    tagId?: boolean;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publicationTag"]>;
export type PublicationTagSelectScalar = {
    publicationId?: boolean;
    tagId?: boolean;
};
export type PublicationTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"publicationId" | "tagId", ExtArgs["result"]["publicationTag"]>;
export type PublicationTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type PublicationTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type PublicationTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $PublicationTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PublicationTag";
    objects: {
        publication: Prisma.$PublicationPayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        publicationId: string;
        tagId: string;
    }, ExtArgs["result"]["publicationTag"]>;
    composites: {};
};
export type PublicationTagGetPayload<S extends boolean | null | undefined | PublicationTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload, S>;
export type PublicationTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PublicationTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PublicationTagCountAggregateInputType | true;
};
export interface PublicationTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PublicationTag'];
        meta: {
            name: 'PublicationTag';
        };
    };
    findUnique<T extends PublicationTagFindUniqueArgs>(args: Prisma.SelectSubset<T, PublicationTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PublicationTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PublicationTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PublicationTagFindFirstArgs>(args?: Prisma.SelectSubset<T, PublicationTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PublicationTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PublicationTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PublicationTagFindManyArgs>(args?: Prisma.SelectSubset<T, PublicationTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PublicationTagCreateArgs>(args: Prisma.SelectSubset<T, PublicationTagCreateArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PublicationTagCreateManyArgs>(args?: Prisma.SelectSubset<T, PublicationTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PublicationTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PublicationTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PublicationTagDeleteArgs>(args: Prisma.SelectSubset<T, PublicationTagDeleteArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PublicationTagUpdateArgs>(args: Prisma.SelectSubset<T, PublicationTagUpdateArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PublicationTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, PublicationTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PublicationTagUpdateManyArgs>(args: Prisma.SelectSubset<T, PublicationTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PublicationTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PublicationTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PublicationTagUpsertArgs>(args: Prisma.SelectSubset<T, PublicationTagUpsertArgs<ExtArgs>>): Prisma.Prisma__PublicationTagClient<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PublicationTagCountArgs>(args?: Prisma.Subset<T, PublicationTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PublicationTagCountAggregateOutputType> : number>;
    aggregate<T extends PublicationTagAggregateArgs>(args: Prisma.Subset<T, PublicationTagAggregateArgs>): Prisma.PrismaPromise<GetPublicationTagAggregateType<T>>;
    groupBy<T extends PublicationTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PublicationTagGroupByArgs['orderBy'];
    } : {
        orderBy?: PublicationTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PublicationTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PublicationTagFieldRefs;
}
export interface Prisma__PublicationTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PublicationTagFieldRefs {
    readonly publicationId: Prisma.FieldRef<"PublicationTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"PublicationTag", 'String'>;
}
export type PublicationTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where: Prisma.PublicationTagWhereUniqueInput;
};
export type PublicationTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where: Prisma.PublicationTagWhereUniqueInput;
};
export type PublicationTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where?: Prisma.PublicationTagWhereInput;
    orderBy?: Prisma.PublicationTagOrderByWithRelationInput | Prisma.PublicationTagOrderByWithRelationInput[];
    cursor?: Prisma.PublicationTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationTagScalarFieldEnum | Prisma.PublicationTagScalarFieldEnum[];
};
export type PublicationTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where?: Prisma.PublicationTagWhereInput;
    orderBy?: Prisma.PublicationTagOrderByWithRelationInput | Prisma.PublicationTagOrderByWithRelationInput[];
    cursor?: Prisma.PublicationTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationTagScalarFieldEnum | Prisma.PublicationTagScalarFieldEnum[];
};
export type PublicationTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where?: Prisma.PublicationTagWhereInput;
    orderBy?: Prisma.PublicationTagOrderByWithRelationInput | Prisma.PublicationTagOrderByWithRelationInput[];
    cursor?: Prisma.PublicationTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationTagScalarFieldEnum | Prisma.PublicationTagScalarFieldEnum[];
};
export type PublicationTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationTagCreateInput, Prisma.PublicationTagUncheckedCreateInput>;
};
export type PublicationTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PublicationTagCreateManyInput | Prisma.PublicationTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    data: Prisma.PublicationTagCreateManyInput | Prisma.PublicationTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PublicationTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PublicationTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationTagUpdateInput, Prisma.PublicationTagUncheckedUpdateInput>;
    where: Prisma.PublicationTagWhereUniqueInput;
};
export type PublicationTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PublicationTagUpdateManyMutationInput, Prisma.PublicationTagUncheckedUpdateManyInput>;
    where?: Prisma.PublicationTagWhereInput;
    limit?: number;
};
export type PublicationTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationTagUpdateManyMutationInput, Prisma.PublicationTagUncheckedUpdateManyInput>;
    where?: Prisma.PublicationTagWhereInput;
    limit?: number;
    include?: Prisma.PublicationTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PublicationTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where: Prisma.PublicationTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationTagCreateInput, Prisma.PublicationTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PublicationTagUpdateInput, Prisma.PublicationTagUncheckedUpdateInput>;
};
export type PublicationTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
    where: Prisma.PublicationTagWhereUniqueInput;
};
export type PublicationTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationTagWhereInput;
    limit?: number;
};
export type PublicationTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationTagSelect<ExtArgs> | null;
    omit?: Prisma.PublicationTagOmit<ExtArgs> | null;
    include?: Prisma.PublicationTagInclude<ExtArgs> | null;
};
export {};
