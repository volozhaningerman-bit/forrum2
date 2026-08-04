import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TagModel = runtime.Types.Result.DefaultSelection<Prisma.$TagPayload>;
export type AggregateTag = {
    _count: TagCountAggregateOutputType | null;
    _min: TagMinAggregateOutputType | null;
    _max: TagMaxAggregateOutputType | null;
};
export type TagMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    label: string | null;
    backgroundColor: string | null;
    textColor: string | null;
    borderColor: string | null;
    styleEnabled: boolean | null;
    createdAt: Date | null;
};
export type TagMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    label: string | null;
    backgroundColor: string | null;
    textColor: string | null;
    borderColor: string | null;
    styleEnabled: boolean | null;
    createdAt: Date | null;
};
export type TagCountAggregateOutputType = {
    id: number;
    slug: number;
    label: number;
    backgroundColor: number;
    textColor: number;
    borderColor: number;
    styleEnabled: number;
    createdAt: number;
    _all: number;
};
export type TagMinAggregateInputType = {
    id?: true;
    slug?: true;
    label?: true;
    backgroundColor?: true;
    textColor?: true;
    borderColor?: true;
    styleEnabled?: true;
    createdAt?: true;
};
export type TagMaxAggregateInputType = {
    id?: true;
    slug?: true;
    label?: true;
    backgroundColor?: true;
    textColor?: true;
    borderColor?: true;
    styleEnabled?: true;
    createdAt?: true;
};
export type TagCountAggregateInputType = {
    id?: true;
    slug?: true;
    label?: true;
    backgroundColor?: true;
    textColor?: true;
    borderColor?: true;
    styleEnabled?: true;
    createdAt?: true;
    _all?: true;
};
export type TagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TagCountAggregateInputType;
    _min?: TagMinAggregateInputType;
    _max?: TagMaxAggregateInputType;
};
export type GetTagAggregateType<T extends TagAggregateArgs> = {
    [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTag[P]> : Prisma.GetScalarType<T[P], AggregateTag[P]>;
};
export type TagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithAggregationInput | Prisma.TagOrderByWithAggregationInput[];
    by: Prisma.TagScalarFieldEnum[] | Prisma.TagScalarFieldEnum;
    having?: Prisma.TagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TagCountAggregateInputType | true;
    _min?: TagMinAggregateInputType;
    _max?: TagMaxAggregateInputType;
};
export type TagGroupByOutputType = {
    id: string;
    slug: string;
    label: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    styleEnabled: boolean;
    createdAt: Date;
    _count: TagCountAggregateOutputType | null;
    _min: TagMinAggregateOutputType | null;
    _max: TagMaxAggregateOutputType | null;
};
type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TagGroupByOutputType[P]>;
}>>;
export type TagWhereInput = {
    AND?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    OR?: Prisma.TagWhereInput[];
    NOT?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    id?: Prisma.UuidFilter<"Tag"> | string;
    slug?: Prisma.StringFilter<"Tag"> | string;
    label?: Prisma.StringFilter<"Tag"> | string;
    backgroundColor?: Prisma.StringFilter<"Tag"> | string;
    textColor?: Prisma.StringFilter<"Tag"> | string;
    borderColor?: Prisma.StringFilter<"Tag"> | string;
    styleEnabled?: Prisma.BoolFilter<"Tag"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Tag"> | Date | string;
    publications?: Prisma.PublicationTagListRelationFilter;
    subscribers?: Prisma.TagSubscriptionListRelationFilter;
};
export type TagOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    backgroundColor?: Prisma.SortOrder;
    textColor?: Prisma.SortOrder;
    borderColor?: Prisma.SortOrder;
    styleEnabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publications?: Prisma.PublicationTagOrderByRelationAggregateInput;
    subscribers?: Prisma.TagSubscriptionOrderByRelationAggregateInput;
};
export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    OR?: Prisma.TagWhereInput[];
    NOT?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    label?: Prisma.StringFilter<"Tag"> | string;
    backgroundColor?: Prisma.StringFilter<"Tag"> | string;
    textColor?: Prisma.StringFilter<"Tag"> | string;
    borderColor?: Prisma.StringFilter<"Tag"> | string;
    styleEnabled?: Prisma.BoolFilter<"Tag"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Tag"> | Date | string;
    publications?: Prisma.PublicationTagListRelationFilter;
    subscribers?: Prisma.TagSubscriptionListRelationFilter;
}, "id" | "slug">;
export type TagOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    backgroundColor?: Prisma.SortOrder;
    textColor?: Prisma.SortOrder;
    borderColor?: Prisma.SortOrder;
    styleEnabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TagCountOrderByAggregateInput;
    _max?: Prisma.TagMaxOrderByAggregateInput;
    _min?: Prisma.TagMinOrderByAggregateInput;
};
export type TagScalarWhereWithAggregatesInput = {
    AND?: Prisma.TagScalarWhereWithAggregatesInput | Prisma.TagScalarWhereWithAggregatesInput[];
    OR?: Prisma.TagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TagScalarWhereWithAggregatesInput | Prisma.TagScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Tag"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    label?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    backgroundColor?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    textColor?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    borderColor?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    styleEnabled?: Prisma.BoolWithAggregatesFilter<"Tag"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Tag"> | Date | string;
};
export type TagCreateInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    publications?: Prisma.PublicationTagCreateNestedManyWithoutTagInput;
    subscribers?: Prisma.TagSubscriptionCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    publications?: Prisma.PublicationTagUncheckedCreateNestedManyWithoutTagInput;
    subscribers?: Prisma.TagSubscriptionUncheckedCreateNestedManyWithoutTagInput;
};
export type TagUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publications?: Prisma.PublicationTagUpdateManyWithoutTagNestedInput;
    subscribers?: Prisma.TagSubscriptionUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publications?: Prisma.PublicationTagUncheckedUpdateManyWithoutTagNestedInput;
    subscribers?: Prisma.TagSubscriptionUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCreateManyInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
};
export type TagUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    backgroundColor?: Prisma.SortOrder;
    textColor?: Prisma.SortOrder;
    borderColor?: Prisma.SortOrder;
    styleEnabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    backgroundColor?: Prisma.SortOrder;
    textColor?: Prisma.SortOrder;
    borderColor?: Prisma.SortOrder;
    styleEnabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    backgroundColor?: Prisma.SortOrder;
    textColor?: Prisma.SortOrder;
    borderColor?: Prisma.SortOrder;
    styleEnabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagScalarRelationFilter = {
    is?: Prisma.TagWhereInput;
    isNot?: Prisma.TagWhereInput;
};
export type TagCreateNestedOneWithoutPublicationsInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutPublicationsInput, Prisma.TagUncheckedCreateWithoutPublicationsInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutPublicationsInput;
    connect?: Prisma.TagWhereUniqueInput;
};
export type TagUpdateOneRequiredWithoutPublicationsNestedInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutPublicationsInput, Prisma.TagUncheckedCreateWithoutPublicationsInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutPublicationsInput;
    upsert?: Prisma.TagUpsertWithoutPublicationsInput;
    connect?: Prisma.TagWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TagUpdateToOneWithWhereWithoutPublicationsInput, Prisma.TagUpdateWithoutPublicationsInput>, Prisma.TagUncheckedUpdateWithoutPublicationsInput>;
};
export type TagCreateNestedOneWithoutSubscribersInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutSubscribersInput, Prisma.TagUncheckedCreateWithoutSubscribersInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutSubscribersInput;
    connect?: Prisma.TagWhereUniqueInput;
};
export type TagUpdateOneRequiredWithoutSubscribersNestedInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutSubscribersInput, Prisma.TagUncheckedCreateWithoutSubscribersInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutSubscribersInput;
    upsert?: Prisma.TagUpsertWithoutSubscribersInput;
    connect?: Prisma.TagWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TagUpdateToOneWithWhereWithoutSubscribersInput, Prisma.TagUpdateWithoutSubscribersInput>, Prisma.TagUncheckedUpdateWithoutSubscribersInput>;
};
export type TagCreateWithoutPublicationsInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    subscribers?: Prisma.TagSubscriptionCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateWithoutPublicationsInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    subscribers?: Prisma.TagSubscriptionUncheckedCreateNestedManyWithoutTagInput;
};
export type TagCreateOrConnectWithoutPublicationsInput = {
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateWithoutPublicationsInput, Prisma.TagUncheckedCreateWithoutPublicationsInput>;
};
export type TagUpsertWithoutPublicationsInput = {
    update: Prisma.XOR<Prisma.TagUpdateWithoutPublicationsInput, Prisma.TagUncheckedUpdateWithoutPublicationsInput>;
    create: Prisma.XOR<Prisma.TagCreateWithoutPublicationsInput, Prisma.TagUncheckedCreateWithoutPublicationsInput>;
    where?: Prisma.TagWhereInput;
};
export type TagUpdateToOneWithWhereWithoutPublicationsInput = {
    where?: Prisma.TagWhereInput;
    data: Prisma.XOR<Prisma.TagUpdateWithoutPublicationsInput, Prisma.TagUncheckedUpdateWithoutPublicationsInput>;
};
export type TagUpdateWithoutPublicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscribers?: Prisma.TagSubscriptionUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateWithoutPublicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscribers?: Prisma.TagSubscriptionUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCreateWithoutSubscribersInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    publications?: Prisma.PublicationTagCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateWithoutSubscribersInput = {
    id?: string;
    slug: string;
    label: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    styleEnabled?: boolean;
    createdAt?: Date | string;
    publications?: Prisma.PublicationTagUncheckedCreateNestedManyWithoutTagInput;
};
export type TagCreateOrConnectWithoutSubscribersInput = {
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateWithoutSubscribersInput, Prisma.TagUncheckedCreateWithoutSubscribersInput>;
};
export type TagUpsertWithoutSubscribersInput = {
    update: Prisma.XOR<Prisma.TagUpdateWithoutSubscribersInput, Prisma.TagUncheckedUpdateWithoutSubscribersInput>;
    create: Prisma.XOR<Prisma.TagCreateWithoutSubscribersInput, Prisma.TagUncheckedCreateWithoutSubscribersInput>;
    where?: Prisma.TagWhereInput;
};
export type TagUpdateToOneWithWhereWithoutSubscribersInput = {
    where?: Prisma.TagWhereInput;
    data: Prisma.XOR<Prisma.TagUpdateWithoutSubscribersInput, Prisma.TagUncheckedUpdateWithoutSubscribersInput>;
};
export type TagUpdateWithoutSubscribersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publications?: Prisma.PublicationTagUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateWithoutSubscribersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    backgroundColor?: Prisma.StringFieldUpdateOperationsInput | string;
    textColor?: Prisma.StringFieldUpdateOperationsInput | string;
    borderColor?: Prisma.StringFieldUpdateOperationsInput | string;
    styleEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publications?: Prisma.PublicationTagUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCountOutputType = {
    publications: number;
    subscribers: number;
};
export type TagCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publications?: boolean | TagCountOutputTypeCountPublicationsArgs;
    subscribers?: boolean | TagCountOutputTypeCountSubscribersArgs;
};
export type TagCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagCountOutputTypeSelect<ExtArgs> | null;
};
export type TagCountOutputTypeCountPublicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationTagWhereInput;
};
export type TagCountOutputTypeCountSubscribersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagSubscriptionWhereInput;
};
export type TagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    label?: boolean;
    backgroundColor?: boolean;
    textColor?: boolean;
    borderColor?: boolean;
    styleEnabled?: boolean;
    createdAt?: boolean;
    publications?: boolean | Prisma.Tag$publicationsArgs<ExtArgs>;
    subscribers?: boolean | Prisma.Tag$subscribersArgs<ExtArgs>;
    _count?: boolean | Prisma.TagCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tag"]>;
export type TagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    label?: boolean;
    backgroundColor?: boolean;
    textColor?: boolean;
    borderColor?: boolean;
    styleEnabled?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tag"]>;
export type TagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    label?: boolean;
    backgroundColor?: boolean;
    textColor?: boolean;
    borderColor?: boolean;
    styleEnabled?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tag"]>;
export type TagSelectScalar = {
    id?: boolean;
    slug?: boolean;
    label?: boolean;
    backgroundColor?: boolean;
    textColor?: boolean;
    borderColor?: boolean;
    styleEnabled?: boolean;
    createdAt?: boolean;
};
export type TagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "label" | "backgroundColor" | "textColor" | "borderColor" | "styleEnabled" | "createdAt", ExtArgs["result"]["tag"]>;
export type TagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    publications?: boolean | Prisma.Tag$publicationsArgs<ExtArgs>;
    subscribers?: boolean | Prisma.Tag$subscribersArgs<ExtArgs>;
    _count?: boolean | Prisma.TagCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Tag";
    objects: {
        publications: Prisma.$PublicationTagPayload<ExtArgs>[];
        subscribers: Prisma.$TagSubscriptionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        label: string;
        backgroundColor: string;
        textColor: string;
        borderColor: string;
        styleEnabled: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["tag"]>;
    composites: {};
};
export type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TagPayload, S>;
export type TagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TagCountAggregateInputType | true;
};
export interface TagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Tag'];
        meta: {
            name: 'Tag';
        };
    };
    findUnique<T extends TagFindUniqueArgs>(args: Prisma.SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TagFindFirstArgs>(args?: Prisma.SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TagFindManyArgs>(args?: Prisma.SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TagCreateArgs>(args: Prisma.SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TagCreateManyArgs>(args?: Prisma.SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TagDeleteArgs>(args: Prisma.SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TagUpdateArgs>(args: Prisma.SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TagDeleteManyArgs>(args?: Prisma.SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TagUpdateManyArgs>(args: Prisma.SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TagUpsertArgs>(args: Prisma.SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TagCountArgs>(args?: Prisma.Subset<T, TagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TagCountAggregateOutputType> : number>;
    aggregate<T extends TagAggregateArgs>(args: Prisma.Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>;
    groupBy<T extends TagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TagGroupByArgs['orderBy'];
    } : {
        orderBy?: TagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TagFieldRefs;
}
export interface Prisma__TagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    publications<T extends Prisma.Tag$publicationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tag$publicationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    subscribers<T extends Prisma.Tag$subscribersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tag$subscribersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TagFieldRefs {
    readonly id: Prisma.FieldRef<"Tag", 'String'>;
    readonly slug: Prisma.FieldRef<"Tag", 'String'>;
    readonly label: Prisma.FieldRef<"Tag", 'String'>;
    readonly backgroundColor: Prisma.FieldRef<"Tag", 'String'>;
    readonly textColor: Prisma.FieldRef<"Tag", 'String'>;
    readonly borderColor: Prisma.FieldRef<"Tag", 'String'>;
    readonly styleEnabled: Prisma.FieldRef<"Tag", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Tag", 'DateTime'>;
}
export type TagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput>;
};
export type TagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TagCreateManyInput | Prisma.TagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    data: Prisma.TagCreateManyInput | Prisma.TagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagUpdateInput, Prisma.TagUncheckedUpdateInput>;
    where: Prisma.TagWhereUniqueInput;
};
export type TagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TagUpdateManyMutationInput, Prisma.TagUncheckedUpdateManyInput>;
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type TagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagUpdateManyMutationInput, Prisma.TagUncheckedUpdateManyInput>;
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type TagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TagUpdateInput, Prisma.TagUncheckedUpdateInput>;
};
export type TagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type Tag$publicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Tag$subscribersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.TagSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.TagSubscriptionInclude<ExtArgs> | null;
    where?: Prisma.TagSubscriptionWhereInput;
    orderBy?: Prisma.TagSubscriptionOrderByWithRelationInput | Prisma.TagSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.TagSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagSubscriptionScalarFieldEnum | Prisma.TagSubscriptionScalarFieldEnum[];
};
export type TagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
};
export {};
