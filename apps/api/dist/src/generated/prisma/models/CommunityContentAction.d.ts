import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommunityContentActionModel = runtime.Types.Result.DefaultSelection<Prisma.$CommunityContentActionPayload>;
export type AggregateCommunityContentAction = {
    _count: CommunityContentActionCountAggregateOutputType | null;
    _min: CommunityContentActionMinAggregateOutputType | null;
    _max: CommunityContentActionMaxAggregateOutputType | null;
};
export type CommunityContentActionMinAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    publicationId: string | null;
    actorId: string | null;
    action: $Enums.CommunityContentActionType | null;
    note: string | null;
    createdAt: Date | null;
};
export type CommunityContentActionMaxAggregateOutputType = {
    id: string | null;
    communityId: string | null;
    publicationId: string | null;
    actorId: string | null;
    action: $Enums.CommunityContentActionType | null;
    note: string | null;
    createdAt: Date | null;
};
export type CommunityContentActionCountAggregateOutputType = {
    id: number;
    communityId: number;
    publicationId: number;
    actorId: number;
    action: number;
    note: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type CommunityContentActionMinAggregateInputType = {
    id?: true;
    communityId?: true;
    publicationId?: true;
    actorId?: true;
    action?: true;
    note?: true;
    createdAt?: true;
};
export type CommunityContentActionMaxAggregateInputType = {
    id?: true;
    communityId?: true;
    publicationId?: true;
    actorId?: true;
    action?: true;
    note?: true;
    createdAt?: true;
};
export type CommunityContentActionCountAggregateInputType = {
    id?: true;
    communityId?: true;
    publicationId?: true;
    actorId?: true;
    action?: true;
    note?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type CommunityContentActionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityContentActionWhereInput;
    orderBy?: Prisma.CommunityContentActionOrderByWithRelationInput | Prisma.CommunityContentActionOrderByWithRelationInput[];
    cursor?: Prisma.CommunityContentActionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommunityContentActionCountAggregateInputType;
    _min?: CommunityContentActionMinAggregateInputType;
    _max?: CommunityContentActionMaxAggregateInputType;
};
export type GetCommunityContentActionAggregateType<T extends CommunityContentActionAggregateArgs> = {
    [P in keyof T & keyof AggregateCommunityContentAction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommunityContentAction[P]> : Prisma.GetScalarType<T[P], AggregateCommunityContentAction[P]>;
};
export type CommunityContentActionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityContentActionWhereInput;
    orderBy?: Prisma.CommunityContentActionOrderByWithAggregationInput | Prisma.CommunityContentActionOrderByWithAggregationInput[];
    by: Prisma.CommunityContentActionScalarFieldEnum[] | Prisma.CommunityContentActionScalarFieldEnum;
    having?: Prisma.CommunityContentActionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommunityContentActionCountAggregateInputType | true;
    _min?: CommunityContentActionMinAggregateInputType;
    _max?: CommunityContentActionMaxAggregateInputType;
};
export type CommunityContentActionGroupByOutputType = {
    id: string;
    communityId: string;
    publicationId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: CommunityContentActionCountAggregateOutputType | null;
    _min: CommunityContentActionMinAggregateOutputType | null;
    _max: CommunityContentActionMaxAggregateOutputType | null;
};
type GetCommunityContentActionGroupByPayload<T extends CommunityContentActionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommunityContentActionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommunityContentActionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommunityContentActionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommunityContentActionGroupByOutputType[P]>;
}>>;
export type CommunityContentActionWhereInput = {
    AND?: Prisma.CommunityContentActionWhereInput | Prisma.CommunityContentActionWhereInput[];
    OR?: Prisma.CommunityContentActionWhereInput[];
    NOT?: Prisma.CommunityContentActionWhereInput | Prisma.CommunityContentActionWhereInput[];
    id?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    communityId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    publicationId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    actorId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    action?: Prisma.EnumCommunityContentActionTypeFilter<"CommunityContentAction"> | $Enums.CommunityContentActionType;
    note?: Prisma.StringFilter<"CommunityContentAction"> | string;
    metadata?: Prisma.JsonNullableFilter<"CommunityContentAction">;
    createdAt?: Prisma.DateTimeFilter<"CommunityContentAction"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CommunityContentActionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    community?: Prisma.CommunityOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type CommunityContentActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommunityContentActionWhereInput | Prisma.CommunityContentActionWhereInput[];
    OR?: Prisma.CommunityContentActionWhereInput[];
    NOT?: Prisma.CommunityContentActionWhereInput | Prisma.CommunityContentActionWhereInput[];
    communityId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    publicationId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    actorId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    action?: Prisma.EnumCommunityContentActionTypeFilter<"CommunityContentAction"> | $Enums.CommunityContentActionType;
    note?: Prisma.StringFilter<"CommunityContentAction"> | string;
    metadata?: Prisma.JsonNullableFilter<"CommunityContentAction">;
    createdAt?: Prisma.DateTimeFilter<"CommunityContentAction"> | Date | string;
    community?: Prisma.XOR<Prisma.CommunityScalarRelationFilter, Prisma.CommunityWhereInput>;
    publication?: Prisma.XOR<Prisma.PublicationScalarRelationFilter, Prisma.PublicationWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CommunityContentActionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CommunityContentActionCountOrderByAggregateInput;
    _max?: Prisma.CommunityContentActionMaxOrderByAggregateInput;
    _min?: Prisma.CommunityContentActionMinOrderByAggregateInput;
};
export type CommunityContentActionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommunityContentActionScalarWhereWithAggregatesInput | Prisma.CommunityContentActionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommunityContentActionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommunityContentActionScalarWhereWithAggregatesInput | Prisma.CommunityContentActionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CommunityContentAction"> | string;
    communityId?: Prisma.UuidWithAggregatesFilter<"CommunityContentAction"> | string;
    publicationId?: Prisma.UuidWithAggregatesFilter<"CommunityContentAction"> | string;
    actorId?: Prisma.UuidWithAggregatesFilter<"CommunityContentAction"> | string;
    action?: Prisma.EnumCommunityContentActionTypeWithAggregatesFilter<"CommunityContentAction"> | $Enums.CommunityContentActionType;
    note?: Prisma.StringWithAggregatesFilter<"CommunityContentAction"> | string;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"CommunityContentAction">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommunityContentAction"> | Date | string;
};
export type CommunityContentActionCreateInput = {
    id?: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutContentActionsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutContentActionsInput;
    actor: Prisma.UserCreateNestedOneWithoutContentActionsInput;
};
export type CommunityContentActionUncheckedCreateInput = {
    id?: string;
    communityId: string;
    publicationId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutContentActionsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutContentActionsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutContentActionsNestedInput;
};
export type CommunityContentActionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionCreateManyInput = {
    id?: string;
    communityId: string;
    publicationId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionListRelationFilter = {
    every?: Prisma.CommunityContentActionWhereInput;
    some?: Prisma.CommunityContentActionWhereInput;
    none?: Prisma.CommunityContentActionWhereInput;
};
export type CommunityContentActionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommunityContentActionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityContentActionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityContentActionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    communityId?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CommunityContentActionCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput> | Prisma.CommunityContentActionCreateWithoutActorInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutActorInput | Prisma.CommunityContentActionCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.CommunityContentActionCreateManyActorInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput> | Prisma.CommunityContentActionCreateWithoutActorInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutActorInput | Prisma.CommunityContentActionCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.CommunityContentActionCreateManyActorInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput> | Prisma.CommunityContentActionCreateWithoutActorInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutActorInput | Prisma.CommunityContentActionCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutActorInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.CommunityContentActionCreateManyActorInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutActorInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutActorInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type CommunityContentActionUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput> | Prisma.CommunityContentActionCreateWithoutActorInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutActorInput | Prisma.CommunityContentActionCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutActorInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.CommunityContentActionCreateManyActorInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutActorInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutActorInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type CommunityContentActionCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput> | Prisma.CommunityContentActionCreateWithoutCommunityInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput | Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityContentActionCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput> | Prisma.CommunityContentActionCreateWithoutCommunityInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput | Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput[];
    createMany?: Prisma.CommunityContentActionCreateManyCommunityInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput> | Prisma.CommunityContentActionCreateWithoutCommunityInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput | Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityContentActionCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type CommunityContentActionUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput> | Prisma.CommunityContentActionCreateWithoutCommunityInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput | Prisma.CommunityContentActionCreateOrConnectWithoutCommunityInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutCommunityInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutCommunityInput[];
    createMany?: Prisma.CommunityContentActionCreateManyCommunityInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutCommunityInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutCommunityInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutCommunityInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutCommunityInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type CommunityContentActionCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput> | Prisma.CommunityContentActionCreateWithoutPublicationInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput | Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.CommunityContentActionCreateManyPublicationInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput> | Prisma.CommunityContentActionCreateWithoutPublicationInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput | Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.CommunityContentActionCreateManyPublicationInputEnvelope;
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
};
export type CommunityContentActionUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput> | Prisma.CommunityContentActionCreateWithoutPublicationInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput | Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.CommunityContentActionCreateManyPublicationInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutPublicationInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type CommunityContentActionUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput> | Prisma.CommunityContentActionCreateWithoutPublicationInput[] | Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput | Prisma.CommunityContentActionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.CommunityContentActionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.CommunityContentActionCreateManyPublicationInputEnvelope;
    set?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    disconnect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    delete?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    connect?: Prisma.CommunityContentActionWhereUniqueInput | Prisma.CommunityContentActionWhereUniqueInput[];
    update?: Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.CommunityContentActionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.CommunityContentActionUpdateManyWithWhereWithoutPublicationInput | Prisma.CommunityContentActionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
};
export type EnumCommunityContentActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.CommunityContentActionType;
};
export type CommunityContentActionCreateWithoutActorInput = {
    id?: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutContentActionsInput;
    publication: Prisma.PublicationCreateNestedOneWithoutContentActionsInput;
};
export type CommunityContentActionUncheckedCreateWithoutActorInput = {
    id?: string;
    communityId: string;
    publicationId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionCreateOrConnectWithoutActorInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput>;
};
export type CommunityContentActionCreateManyActorInputEnvelope = {
    data: Prisma.CommunityContentActionCreateManyActorInput | Prisma.CommunityContentActionCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type CommunityContentActionUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutActorInput, Prisma.CommunityContentActionUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutActorInput, Prisma.CommunityContentActionUncheckedCreateWithoutActorInput>;
};
export type CommunityContentActionUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutActorInput, Prisma.CommunityContentActionUncheckedUpdateWithoutActorInput>;
};
export type CommunityContentActionUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.CommunityContentActionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateManyMutationInput, Prisma.CommunityContentActionUncheckedUpdateManyWithoutActorInput>;
};
export type CommunityContentActionScalarWhereInput = {
    AND?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
    OR?: Prisma.CommunityContentActionScalarWhereInput[];
    NOT?: Prisma.CommunityContentActionScalarWhereInput | Prisma.CommunityContentActionScalarWhereInput[];
    id?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    communityId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    publicationId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    actorId?: Prisma.UuidFilter<"CommunityContentAction"> | string;
    action?: Prisma.EnumCommunityContentActionTypeFilter<"CommunityContentAction"> | $Enums.CommunityContentActionType;
    note?: Prisma.StringFilter<"CommunityContentAction"> | string;
    metadata?: Prisma.JsonNullableFilter<"CommunityContentAction">;
    createdAt?: Prisma.DateTimeFilter<"CommunityContentAction"> | Date | string;
};
export type CommunityContentActionCreateWithoutCommunityInput = {
    id?: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    publication: Prisma.PublicationCreateNestedOneWithoutContentActionsInput;
    actor: Prisma.UserCreateNestedOneWithoutContentActionsInput;
};
export type CommunityContentActionUncheckedCreateWithoutCommunityInput = {
    id?: string;
    publicationId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionCreateOrConnectWithoutCommunityInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput>;
};
export type CommunityContentActionCreateManyCommunityInputEnvelope = {
    data: Prisma.CommunityContentActionCreateManyCommunityInput | Prisma.CommunityContentActionCreateManyCommunityInput[];
    skipDuplicates?: boolean;
};
export type CommunityContentActionUpsertWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedUpdateWithoutCommunityInput>;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedCreateWithoutCommunityInput>;
};
export type CommunityContentActionUpdateWithWhereUniqueWithoutCommunityInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutCommunityInput, Prisma.CommunityContentActionUncheckedUpdateWithoutCommunityInput>;
};
export type CommunityContentActionUpdateManyWithWhereWithoutCommunityInput = {
    where: Prisma.CommunityContentActionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateManyMutationInput, Prisma.CommunityContentActionUncheckedUpdateManyWithoutCommunityInput>;
};
export type CommunityContentActionCreateWithoutPublicationInput = {
    id?: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    community: Prisma.CommunityCreateNestedOneWithoutContentActionsInput;
    actor: Prisma.UserCreateNestedOneWithoutContentActionsInput;
};
export type CommunityContentActionUncheckedCreateWithoutPublicationInput = {
    id?: string;
    communityId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionCreateOrConnectWithoutPublicationInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput>;
};
export type CommunityContentActionCreateManyPublicationInputEnvelope = {
    data: Prisma.CommunityContentActionCreateManyPublicationInput | Prisma.CommunityContentActionCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type CommunityContentActionUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedCreateWithoutPublicationInput>;
};
export type CommunityContentActionUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.CommunityContentActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateWithoutPublicationInput, Prisma.CommunityContentActionUncheckedUpdateWithoutPublicationInput>;
};
export type CommunityContentActionUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.CommunityContentActionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateManyMutationInput, Prisma.CommunityContentActionUncheckedUpdateManyWithoutPublicationInput>;
};
export type CommunityContentActionCreateManyActorInput = {
    id?: string;
    communityId: string;
    publicationId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutContentActionsNestedInput;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutContentActionsNestedInput;
};
export type CommunityContentActionUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionCreateManyCommunityInput = {
    id?: string;
    publicationId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publication?: Prisma.PublicationUpdateOneRequiredWithoutContentActionsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutContentActionsNestedInput;
};
export type CommunityContentActionUncheckedUpdateWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionUncheckedUpdateManyWithoutCommunityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionCreateManyPublicationInput = {
    id?: string;
    communityId: string;
    actorId: string;
    action: $Enums.CommunityContentActionType;
    note: string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type CommunityContentActionUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    community?: Prisma.CommunityUpdateOneRequiredWithoutContentActionsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutContentActionsNestedInput;
};
export type CommunityContentActionUncheckedUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionUncheckedUpdateManyWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    communityId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumCommunityContentActionTypeFieldUpdateOperationsInput | $Enums.CommunityContentActionType;
    note?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommunityContentActionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    publicationId?: boolean;
    actorId?: boolean;
    action?: boolean;
    note?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityContentAction"]>;
export type CommunityContentActionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    publicationId?: boolean;
    actorId?: boolean;
    action?: boolean;
    note?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityContentAction"]>;
export type CommunityContentActionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    communityId?: boolean;
    publicationId?: boolean;
    actorId?: boolean;
    action?: boolean;
    note?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["communityContentAction"]>;
export type CommunityContentActionSelectScalar = {
    id?: boolean;
    communityId?: boolean;
    publicationId?: boolean;
    actorId?: boolean;
    action?: boolean;
    note?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type CommunityContentActionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "communityId" | "publicationId" | "actorId" | "action" | "note" | "metadata" | "createdAt", ExtArgs["result"]["communityContentAction"]>;
export type CommunityContentActionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityContentActionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CommunityContentActionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    community?: boolean | Prisma.CommunityDefaultArgs<ExtArgs>;
    publication?: boolean | Prisma.PublicationDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CommunityContentActionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommunityContentAction";
    objects: {
        community: Prisma.$CommunityPayload<ExtArgs>;
        publication: Prisma.$PublicationPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        communityId: string;
        publicationId: string;
        actorId: string;
        action: $Enums.CommunityContentActionType;
        note: string;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["communityContentAction"]>;
    composites: {};
};
export type CommunityContentActionGetPayload<S extends boolean | null | undefined | CommunityContentActionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload, S>;
export type CommunityContentActionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommunityContentActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommunityContentActionCountAggregateInputType | true;
};
export interface CommunityContentActionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommunityContentAction'];
        meta: {
            name: 'CommunityContentAction';
        };
    };
    findUnique<T extends CommunityContentActionFindUniqueArgs>(args: Prisma.SelectSubset<T, CommunityContentActionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommunityContentActionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommunityContentActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommunityContentActionFindFirstArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommunityContentActionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommunityContentActionFindManyArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommunityContentActionCreateArgs>(args: Prisma.SelectSubset<T, CommunityContentActionCreateArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommunityContentActionCreateManyArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommunityContentActionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommunityContentActionDeleteArgs>(args: Prisma.SelectSubset<T, CommunityContentActionDeleteArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommunityContentActionUpdateArgs>(args: Prisma.SelectSubset<T, CommunityContentActionUpdateArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommunityContentActionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommunityContentActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommunityContentActionUpdateManyArgs>(args: Prisma.SelectSubset<T, CommunityContentActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommunityContentActionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommunityContentActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommunityContentActionUpsertArgs>(args: Prisma.SelectSubset<T, CommunityContentActionUpsertArgs<ExtArgs>>): Prisma.Prisma__CommunityContentActionClient<runtime.Types.Result.GetResult<Prisma.$CommunityContentActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommunityContentActionCountArgs>(args?: Prisma.Subset<T, CommunityContentActionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommunityContentActionCountAggregateOutputType> : number>;
    aggregate<T extends CommunityContentActionAggregateArgs>(args: Prisma.Subset<T, CommunityContentActionAggregateArgs>): Prisma.PrismaPromise<GetCommunityContentActionAggregateType<T>>;
    groupBy<T extends CommunityContentActionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommunityContentActionGroupByArgs['orderBy'];
    } : {
        orderBy?: CommunityContentActionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommunityContentActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityContentActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommunityContentActionFieldRefs;
}
export interface Prisma__CommunityContentActionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    community<T extends Prisma.CommunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommunityDefaultArgs<ExtArgs>>): Prisma.Prisma__CommunityClient<runtime.Types.Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.PublicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PublicationDefaultArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommunityContentActionFieldRefs {
    readonly id: Prisma.FieldRef<"CommunityContentAction", 'String'>;
    readonly communityId: Prisma.FieldRef<"CommunityContentAction", 'String'>;
    readonly publicationId: Prisma.FieldRef<"CommunityContentAction", 'String'>;
    readonly actorId: Prisma.FieldRef<"CommunityContentAction", 'String'>;
    readonly action: Prisma.FieldRef<"CommunityContentAction", 'CommunityContentActionType'>;
    readonly note: Prisma.FieldRef<"CommunityContentAction", 'String'>;
    readonly metadata: Prisma.FieldRef<"CommunityContentAction", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"CommunityContentAction", 'DateTime'>;
}
export type CommunityContentActionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where: Prisma.CommunityContentActionWhereUniqueInput;
};
export type CommunityContentActionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where: Prisma.CommunityContentActionWhereUniqueInput;
};
export type CommunityContentActionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where?: Prisma.CommunityContentActionWhereInput;
    orderBy?: Prisma.CommunityContentActionOrderByWithRelationInput | Prisma.CommunityContentActionOrderByWithRelationInput[];
    cursor?: Prisma.CommunityContentActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityContentActionScalarFieldEnum | Prisma.CommunityContentActionScalarFieldEnum[];
};
export type CommunityContentActionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where?: Prisma.CommunityContentActionWhereInput;
    orderBy?: Prisma.CommunityContentActionOrderByWithRelationInput | Prisma.CommunityContentActionOrderByWithRelationInput[];
    cursor?: Prisma.CommunityContentActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityContentActionScalarFieldEnum | Prisma.CommunityContentActionScalarFieldEnum[];
};
export type CommunityContentActionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where?: Prisma.CommunityContentActionWhereInput;
    orderBy?: Prisma.CommunityContentActionOrderByWithRelationInput | Prisma.CommunityContentActionOrderByWithRelationInput[];
    cursor?: Prisma.CommunityContentActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommunityContentActionScalarFieldEnum | Prisma.CommunityContentActionScalarFieldEnum[];
};
export type CommunityContentActionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityContentActionCreateInput, Prisma.CommunityContentActionUncheckedCreateInput>;
};
export type CommunityContentActionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommunityContentActionCreateManyInput | Prisma.CommunityContentActionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommunityContentActionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    data: Prisma.CommunityContentActionCreateManyInput | Prisma.CommunityContentActionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommunityContentActionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommunityContentActionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateInput, Prisma.CommunityContentActionUncheckedUpdateInput>;
    where: Prisma.CommunityContentActionWhereUniqueInput;
};
export type CommunityContentActionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateManyMutationInput, Prisma.CommunityContentActionUncheckedUpdateManyInput>;
    where?: Prisma.CommunityContentActionWhereInput;
    limit?: number;
};
export type CommunityContentActionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommunityContentActionUpdateManyMutationInput, Prisma.CommunityContentActionUncheckedUpdateManyInput>;
    where?: Prisma.CommunityContentActionWhereInput;
    limit?: number;
    include?: Prisma.CommunityContentActionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommunityContentActionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where: Prisma.CommunityContentActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommunityContentActionCreateInput, Prisma.CommunityContentActionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommunityContentActionUpdateInput, Prisma.CommunityContentActionUncheckedUpdateInput>;
};
export type CommunityContentActionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
    where: Prisma.CommunityContentActionWhereUniqueInput;
};
export type CommunityContentActionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommunityContentActionWhereInput;
    limit?: number;
};
export type CommunityContentActionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommunityContentActionSelect<ExtArgs> | null;
    omit?: Prisma.CommunityContentActionOmit<ExtArgs> | null;
    include?: Prisma.CommunityContentActionInclude<ExtArgs> | null;
};
export {};
