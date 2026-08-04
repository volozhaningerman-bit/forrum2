import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AchievementDefinitionModel = runtime.Types.Result.DefaultSelection<Prisma.$AchievementDefinitionPayload>;
export type AggregateAchievementDefinition = {
    _count: AchievementDefinitionCountAggregateOutputType | null;
    _avg: AchievementDefinitionAvgAggregateOutputType | null;
    _sum: AchievementDefinitionSumAggregateOutputType | null;
    _min: AchievementDefinitionMinAggregateOutputType | null;
    _max: AchievementDefinitionMaxAggregateOutputType | null;
};
export type AchievementDefinitionAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type AchievementDefinitionSumAggregateOutputType = {
    sortOrder: number | null;
};
export type AchievementDefinitionMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    title: string | null;
    description: string | null;
    icon: string | null;
    category: $Enums.AchievementCategory | null;
    automatic: boolean | null;
    active: boolean | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AchievementDefinitionMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    title: string | null;
    description: string | null;
    icon: string | null;
    category: $Enums.AchievementCategory | null;
    automatic: boolean | null;
    active: boolean | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AchievementDefinitionCountAggregateOutputType = {
    id: number;
    code: number;
    title: number;
    description: number;
    icon: number;
    category: number;
    automatic: number;
    active: number;
    sortOrder: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AchievementDefinitionAvgAggregateInputType = {
    sortOrder?: true;
};
export type AchievementDefinitionSumAggregateInputType = {
    sortOrder?: true;
};
export type AchievementDefinitionMinAggregateInputType = {
    id?: true;
    code?: true;
    title?: true;
    description?: true;
    icon?: true;
    category?: true;
    automatic?: true;
    active?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AchievementDefinitionMaxAggregateInputType = {
    id?: true;
    code?: true;
    title?: true;
    description?: true;
    icon?: true;
    category?: true;
    automatic?: true;
    active?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AchievementDefinitionCountAggregateInputType = {
    id?: true;
    code?: true;
    title?: true;
    description?: true;
    icon?: true;
    category?: true;
    automatic?: true;
    active?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AchievementDefinitionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AchievementDefinitionWhereInput;
    orderBy?: Prisma.AchievementDefinitionOrderByWithRelationInput | Prisma.AchievementDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.AchievementDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AchievementDefinitionCountAggregateInputType;
    _avg?: AchievementDefinitionAvgAggregateInputType;
    _sum?: AchievementDefinitionSumAggregateInputType;
    _min?: AchievementDefinitionMinAggregateInputType;
    _max?: AchievementDefinitionMaxAggregateInputType;
};
export type GetAchievementDefinitionAggregateType<T extends AchievementDefinitionAggregateArgs> = {
    [P in keyof T & keyof AggregateAchievementDefinition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAchievementDefinition[P]> : Prisma.GetScalarType<T[P], AggregateAchievementDefinition[P]>;
};
export type AchievementDefinitionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AchievementDefinitionWhereInput;
    orderBy?: Prisma.AchievementDefinitionOrderByWithAggregationInput | Prisma.AchievementDefinitionOrderByWithAggregationInput[];
    by: Prisma.AchievementDefinitionScalarFieldEnum[] | Prisma.AchievementDefinitionScalarFieldEnum;
    having?: Prisma.AchievementDefinitionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AchievementDefinitionCountAggregateInputType | true;
    _avg?: AchievementDefinitionAvgAggregateInputType;
    _sum?: AchievementDefinitionSumAggregateInputType;
    _min?: AchievementDefinitionMinAggregateInputType;
    _max?: AchievementDefinitionMaxAggregateInputType;
};
export type AchievementDefinitionGroupByOutputType = {
    id: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic: boolean;
    active: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    _count: AchievementDefinitionCountAggregateOutputType | null;
    _avg: AchievementDefinitionAvgAggregateOutputType | null;
    _sum: AchievementDefinitionSumAggregateOutputType | null;
    _min: AchievementDefinitionMinAggregateOutputType | null;
    _max: AchievementDefinitionMaxAggregateOutputType | null;
};
type GetAchievementDefinitionGroupByPayload<T extends AchievementDefinitionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AchievementDefinitionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AchievementDefinitionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AchievementDefinitionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AchievementDefinitionGroupByOutputType[P]>;
}>>;
export type AchievementDefinitionWhereInput = {
    AND?: Prisma.AchievementDefinitionWhereInput | Prisma.AchievementDefinitionWhereInput[];
    OR?: Prisma.AchievementDefinitionWhereInput[];
    NOT?: Prisma.AchievementDefinitionWhereInput | Prisma.AchievementDefinitionWhereInput[];
    id?: Prisma.UuidFilter<"AchievementDefinition"> | string;
    code?: Prisma.StringFilter<"AchievementDefinition"> | string;
    title?: Prisma.StringFilter<"AchievementDefinition"> | string;
    description?: Prisma.StringFilter<"AchievementDefinition"> | string;
    icon?: Prisma.StringFilter<"AchievementDefinition"> | string;
    category?: Prisma.EnumAchievementCategoryFilter<"AchievementDefinition"> | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFilter<"AchievementDefinition"> | boolean;
    active?: Prisma.BoolFilter<"AchievementDefinition"> | boolean;
    sortOrder?: Prisma.IntFilter<"AchievementDefinition"> | number;
    createdAt?: Prisma.DateTimeFilter<"AchievementDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AchievementDefinition"> | Date | string;
    awards?: Prisma.UserAchievementListRelationFilter;
};
export type AchievementDefinitionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    automatic?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    awards?: Prisma.UserAchievementOrderByRelationAggregateInput;
};
export type AchievementDefinitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.AchievementDefinitionWhereInput | Prisma.AchievementDefinitionWhereInput[];
    OR?: Prisma.AchievementDefinitionWhereInput[];
    NOT?: Prisma.AchievementDefinitionWhereInput | Prisma.AchievementDefinitionWhereInput[];
    title?: Prisma.StringFilter<"AchievementDefinition"> | string;
    description?: Prisma.StringFilter<"AchievementDefinition"> | string;
    icon?: Prisma.StringFilter<"AchievementDefinition"> | string;
    category?: Prisma.EnumAchievementCategoryFilter<"AchievementDefinition"> | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFilter<"AchievementDefinition"> | boolean;
    active?: Prisma.BoolFilter<"AchievementDefinition"> | boolean;
    sortOrder?: Prisma.IntFilter<"AchievementDefinition"> | number;
    createdAt?: Prisma.DateTimeFilter<"AchievementDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AchievementDefinition"> | Date | string;
    awards?: Prisma.UserAchievementListRelationFilter;
}, "id" | "code">;
export type AchievementDefinitionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    automatic?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AchievementDefinitionCountOrderByAggregateInput;
    _avg?: Prisma.AchievementDefinitionAvgOrderByAggregateInput;
    _max?: Prisma.AchievementDefinitionMaxOrderByAggregateInput;
    _min?: Prisma.AchievementDefinitionMinOrderByAggregateInput;
    _sum?: Prisma.AchievementDefinitionSumOrderByAggregateInput;
};
export type AchievementDefinitionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AchievementDefinitionScalarWhereWithAggregatesInput | Prisma.AchievementDefinitionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AchievementDefinitionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AchievementDefinitionScalarWhereWithAggregatesInput | Prisma.AchievementDefinitionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AchievementDefinition"> | string;
    code?: Prisma.StringWithAggregatesFilter<"AchievementDefinition"> | string;
    title?: Prisma.StringWithAggregatesFilter<"AchievementDefinition"> | string;
    description?: Prisma.StringWithAggregatesFilter<"AchievementDefinition"> | string;
    icon?: Prisma.StringWithAggregatesFilter<"AchievementDefinition"> | string;
    category?: Prisma.EnumAchievementCategoryWithAggregatesFilter<"AchievementDefinition"> | $Enums.AchievementCategory;
    automatic?: Prisma.BoolWithAggregatesFilter<"AchievementDefinition"> | boolean;
    active?: Prisma.BoolWithAggregatesFilter<"AchievementDefinition"> | boolean;
    sortOrder?: Prisma.IntWithAggregatesFilter<"AchievementDefinition"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AchievementDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AchievementDefinition"> | Date | string;
};
export type AchievementDefinitionCreateInput = {
    id?: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    awards?: Prisma.UserAchievementCreateNestedManyWithoutAchievementInput;
};
export type AchievementDefinitionUncheckedCreateInput = {
    id?: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    awards?: Prisma.UserAchievementUncheckedCreateNestedManyWithoutAchievementInput;
};
export type AchievementDefinitionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    awards?: Prisma.UserAchievementUpdateManyWithoutAchievementNestedInput;
};
export type AchievementDefinitionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    awards?: Prisma.UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput;
};
export type AchievementDefinitionCreateManyInput = {
    id?: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AchievementDefinitionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AchievementDefinitionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AchievementDefinitionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    automatic?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AchievementDefinitionAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type AchievementDefinitionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    automatic?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AchievementDefinitionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    automatic?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AchievementDefinitionSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type AchievementDefinitionScalarRelationFilter = {
    is?: Prisma.AchievementDefinitionWhereInput;
    isNot?: Prisma.AchievementDefinitionWhereInput;
};
export type EnumAchievementCategoryFieldUpdateOperationsInput = {
    set?: $Enums.AchievementCategory;
};
export type AchievementDefinitionCreateNestedOneWithoutAwardsInput = {
    create?: Prisma.XOR<Prisma.AchievementDefinitionCreateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedCreateWithoutAwardsInput>;
    connectOrCreate?: Prisma.AchievementDefinitionCreateOrConnectWithoutAwardsInput;
    connect?: Prisma.AchievementDefinitionWhereUniqueInput;
};
export type AchievementDefinitionUpdateOneRequiredWithoutAwardsNestedInput = {
    create?: Prisma.XOR<Prisma.AchievementDefinitionCreateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedCreateWithoutAwardsInput>;
    connectOrCreate?: Prisma.AchievementDefinitionCreateOrConnectWithoutAwardsInput;
    upsert?: Prisma.AchievementDefinitionUpsertWithoutAwardsInput;
    connect?: Prisma.AchievementDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AchievementDefinitionUpdateToOneWithWhereWithoutAwardsInput, Prisma.AchievementDefinitionUpdateWithoutAwardsInput>, Prisma.AchievementDefinitionUncheckedUpdateWithoutAwardsInput>;
};
export type AchievementDefinitionCreateWithoutAwardsInput = {
    id?: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AchievementDefinitionUncheckedCreateWithoutAwardsInput = {
    id?: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    category: $Enums.AchievementCategory;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AchievementDefinitionCreateOrConnectWithoutAwardsInput = {
    where: Prisma.AchievementDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AchievementDefinitionCreateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedCreateWithoutAwardsInput>;
};
export type AchievementDefinitionUpsertWithoutAwardsInput = {
    update: Prisma.XOR<Prisma.AchievementDefinitionUpdateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedUpdateWithoutAwardsInput>;
    create: Prisma.XOR<Prisma.AchievementDefinitionCreateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedCreateWithoutAwardsInput>;
    where?: Prisma.AchievementDefinitionWhereInput;
};
export type AchievementDefinitionUpdateToOneWithWhereWithoutAwardsInput = {
    where?: Prisma.AchievementDefinitionWhereInput;
    data: Prisma.XOR<Prisma.AchievementDefinitionUpdateWithoutAwardsInput, Prisma.AchievementDefinitionUncheckedUpdateWithoutAwardsInput>;
};
export type AchievementDefinitionUpdateWithoutAwardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AchievementDefinitionUncheckedUpdateWithoutAwardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumAchievementCategoryFieldUpdateOperationsInput | $Enums.AchievementCategory;
    automatic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AchievementDefinitionCountOutputType = {
    awards: number;
};
export type AchievementDefinitionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    awards?: boolean | AchievementDefinitionCountOutputTypeCountAwardsArgs;
};
export type AchievementDefinitionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionCountOutputTypeSelect<ExtArgs> | null;
};
export type AchievementDefinitionCountOutputTypeCountAwardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAchievementWhereInput;
};
export type AchievementDefinitionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    title?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    awards?: boolean | Prisma.AchievementDefinition$awardsArgs<ExtArgs>;
    _count?: boolean | Prisma.AchievementDefinitionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["achievementDefinition"]>;
export type AchievementDefinitionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    title?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["achievementDefinition"]>;
export type AchievementDefinitionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    title?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["achievementDefinition"]>;
export type AchievementDefinitionSelectScalar = {
    id?: boolean;
    code?: boolean;
    title?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    automatic?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AchievementDefinitionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "title" | "description" | "icon" | "category" | "automatic" | "active" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["achievementDefinition"]>;
export type AchievementDefinitionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    awards?: boolean | Prisma.AchievementDefinition$awardsArgs<ExtArgs>;
    _count?: boolean | Prisma.AchievementDefinitionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AchievementDefinitionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AchievementDefinitionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AchievementDefinitionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AchievementDefinition";
    objects: {
        awards: Prisma.$UserAchievementPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        title: string;
        description: string;
        icon: string;
        category: $Enums.AchievementCategory;
        automatic: boolean;
        active: boolean;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["achievementDefinition"]>;
    composites: {};
};
export type AchievementDefinitionGetPayload<S extends boolean | null | undefined | AchievementDefinitionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload, S>;
export type AchievementDefinitionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AchievementDefinitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AchievementDefinitionCountAggregateInputType | true;
};
export interface AchievementDefinitionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AchievementDefinition'];
        meta: {
            name: 'AchievementDefinition';
        };
    };
    findUnique<T extends AchievementDefinitionFindUniqueArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AchievementDefinitionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AchievementDefinitionFindFirstArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AchievementDefinitionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AchievementDefinitionFindManyArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AchievementDefinitionCreateArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionCreateArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AchievementDefinitionCreateManyArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AchievementDefinitionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AchievementDefinitionDeleteArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionDeleteArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AchievementDefinitionUpdateArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionUpdateArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AchievementDefinitionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AchievementDefinitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AchievementDefinitionUpdateManyArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AchievementDefinitionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AchievementDefinitionUpsertArgs>(args: Prisma.SelectSubset<T, AchievementDefinitionUpsertArgs<ExtArgs>>): Prisma.Prisma__AchievementDefinitionClient<runtime.Types.Result.GetResult<Prisma.$AchievementDefinitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AchievementDefinitionCountArgs>(args?: Prisma.Subset<T, AchievementDefinitionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AchievementDefinitionCountAggregateOutputType> : number>;
    aggregate<T extends AchievementDefinitionAggregateArgs>(args: Prisma.Subset<T, AchievementDefinitionAggregateArgs>): Prisma.PrismaPromise<GetAchievementDefinitionAggregateType<T>>;
    groupBy<T extends AchievementDefinitionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AchievementDefinitionGroupByArgs['orderBy'];
    } : {
        orderBy?: AchievementDefinitionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AchievementDefinitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementDefinitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AchievementDefinitionFieldRefs;
}
export interface Prisma__AchievementDefinitionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    awards<T extends Prisma.AchievementDefinition$awardsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AchievementDefinition$awardsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AchievementDefinitionFieldRefs {
    readonly id: Prisma.FieldRef<"AchievementDefinition", 'String'>;
    readonly code: Prisma.FieldRef<"AchievementDefinition", 'String'>;
    readonly title: Prisma.FieldRef<"AchievementDefinition", 'String'>;
    readonly description: Prisma.FieldRef<"AchievementDefinition", 'String'>;
    readonly icon: Prisma.FieldRef<"AchievementDefinition", 'String'>;
    readonly category: Prisma.FieldRef<"AchievementDefinition", 'AchievementCategory'>;
    readonly automatic: Prisma.FieldRef<"AchievementDefinition", 'Boolean'>;
    readonly active: Prisma.FieldRef<"AchievementDefinition", 'Boolean'>;
    readonly sortOrder: Prisma.FieldRef<"AchievementDefinition", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"AchievementDefinition", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AchievementDefinition", 'DateTime'>;
}
export type AchievementDefinitionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where: Prisma.AchievementDefinitionWhereUniqueInput;
};
export type AchievementDefinitionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where: Prisma.AchievementDefinitionWhereUniqueInput;
};
export type AchievementDefinitionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where?: Prisma.AchievementDefinitionWhereInput;
    orderBy?: Prisma.AchievementDefinitionOrderByWithRelationInput | Prisma.AchievementDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.AchievementDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AchievementDefinitionScalarFieldEnum | Prisma.AchievementDefinitionScalarFieldEnum[];
};
export type AchievementDefinitionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where?: Prisma.AchievementDefinitionWhereInput;
    orderBy?: Prisma.AchievementDefinitionOrderByWithRelationInput | Prisma.AchievementDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.AchievementDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AchievementDefinitionScalarFieldEnum | Prisma.AchievementDefinitionScalarFieldEnum[];
};
export type AchievementDefinitionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where?: Prisma.AchievementDefinitionWhereInput;
    orderBy?: Prisma.AchievementDefinitionOrderByWithRelationInput | Prisma.AchievementDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.AchievementDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AchievementDefinitionScalarFieldEnum | Prisma.AchievementDefinitionScalarFieldEnum[];
};
export type AchievementDefinitionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AchievementDefinitionCreateInput, Prisma.AchievementDefinitionUncheckedCreateInput>;
};
export type AchievementDefinitionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AchievementDefinitionCreateManyInput | Prisma.AchievementDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AchievementDefinitionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    data: Prisma.AchievementDefinitionCreateManyInput | Prisma.AchievementDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AchievementDefinitionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AchievementDefinitionUpdateInput, Prisma.AchievementDefinitionUncheckedUpdateInput>;
    where: Prisma.AchievementDefinitionWhereUniqueInput;
};
export type AchievementDefinitionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AchievementDefinitionUpdateManyMutationInput, Prisma.AchievementDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.AchievementDefinitionWhereInput;
    limit?: number;
};
export type AchievementDefinitionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AchievementDefinitionUpdateManyMutationInput, Prisma.AchievementDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.AchievementDefinitionWhereInput;
    limit?: number;
};
export type AchievementDefinitionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where: Prisma.AchievementDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AchievementDefinitionCreateInput, Prisma.AchievementDefinitionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AchievementDefinitionUpdateInput, Prisma.AchievementDefinitionUncheckedUpdateInput>;
};
export type AchievementDefinitionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
    where: Prisma.AchievementDefinitionWhereUniqueInput;
};
export type AchievementDefinitionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AchievementDefinitionWhereInput;
    limit?: number;
};
export type AchievementDefinition$awardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAchievementSelect<ExtArgs> | null;
    omit?: Prisma.UserAchievementOmit<ExtArgs> | null;
    include?: Prisma.UserAchievementInclude<ExtArgs> | null;
    where?: Prisma.UserAchievementWhereInput;
    orderBy?: Prisma.UserAchievementOrderByWithRelationInput | Prisma.UserAchievementOrderByWithRelationInput[];
    cursor?: Prisma.UserAchievementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAchievementScalarFieldEnum | Prisma.UserAchievementScalarFieldEnum[];
};
export type AchievementDefinitionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AchievementDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.AchievementDefinitionOmit<ExtArgs> | null;
    include?: Prisma.AchievementDefinitionInclude<ExtArgs> | null;
};
export {};
