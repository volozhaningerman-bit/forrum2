import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ModerationActionModel = runtime.Types.Result.DefaultSelection<Prisma.$ModerationActionPayload>;
export type AggregateModerationAction = {
    _count: ModerationActionCountAggregateOutputType | null;
    _min: ModerationActionMinAggregateOutputType | null;
    _max: ModerationActionMaxAggregateOutputType | null;
};
export type ModerationActionMinAggregateOutputType = {
    id: string | null;
    subjectUserId: string | null;
    actorId: string | null;
    targetType: $Enums.ModerationTargetType | null;
    actionType: $Enums.ModerationActionType | null;
    publicationId: string | null;
    commentId: string | null;
    reason: string | null;
    expiresAt: Date | null;
    reversedAt: Date | null;
    createdAt: Date | null;
};
export type ModerationActionMaxAggregateOutputType = {
    id: string | null;
    subjectUserId: string | null;
    actorId: string | null;
    targetType: $Enums.ModerationTargetType | null;
    actionType: $Enums.ModerationActionType | null;
    publicationId: string | null;
    commentId: string | null;
    reason: string | null;
    expiresAt: Date | null;
    reversedAt: Date | null;
    createdAt: Date | null;
};
export type ModerationActionCountAggregateOutputType = {
    id: number;
    subjectUserId: number;
    actorId: number;
    targetType: number;
    actionType: number;
    publicationId: number;
    commentId: number;
    reason: number;
    expiresAt: number;
    reversedAt: number;
    createdAt: number;
    _all: number;
};
export type ModerationActionMinAggregateInputType = {
    id?: true;
    subjectUserId?: true;
    actorId?: true;
    targetType?: true;
    actionType?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    expiresAt?: true;
    reversedAt?: true;
    createdAt?: true;
};
export type ModerationActionMaxAggregateInputType = {
    id?: true;
    subjectUserId?: true;
    actorId?: true;
    targetType?: true;
    actionType?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    expiresAt?: true;
    reversedAt?: true;
    createdAt?: true;
};
export type ModerationActionCountAggregateInputType = {
    id?: true;
    subjectUserId?: true;
    actorId?: true;
    targetType?: true;
    actionType?: true;
    publicationId?: true;
    commentId?: true;
    reason?: true;
    expiresAt?: true;
    reversedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type ModerationActionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationActionWhereInput;
    orderBy?: Prisma.ModerationActionOrderByWithRelationInput | Prisma.ModerationActionOrderByWithRelationInput[];
    cursor?: Prisma.ModerationActionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ModerationActionCountAggregateInputType;
    _min?: ModerationActionMinAggregateInputType;
    _max?: ModerationActionMaxAggregateInputType;
};
export type GetModerationActionAggregateType<T extends ModerationActionAggregateArgs> = {
    [P in keyof T & keyof AggregateModerationAction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateModerationAction[P]> : Prisma.GetScalarType<T[P], AggregateModerationAction[P]>;
};
export type ModerationActionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationActionWhereInput;
    orderBy?: Prisma.ModerationActionOrderByWithAggregationInput | Prisma.ModerationActionOrderByWithAggregationInput[];
    by: Prisma.ModerationActionScalarFieldEnum[] | Prisma.ModerationActionScalarFieldEnum;
    having?: Prisma.ModerationActionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ModerationActionCountAggregateInputType | true;
    _min?: ModerationActionMinAggregateInputType;
    _max?: ModerationActionMaxAggregateInputType;
};
export type ModerationActionGroupByOutputType = {
    id: string;
    subjectUserId: string;
    actorId: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId: string | null;
    commentId: string | null;
    reason: string;
    expiresAt: Date | null;
    reversedAt: Date | null;
    createdAt: Date;
    _count: ModerationActionCountAggregateOutputType | null;
    _min: ModerationActionMinAggregateOutputType | null;
    _max: ModerationActionMaxAggregateOutputType | null;
};
type GetModerationActionGroupByPayload<T extends ModerationActionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ModerationActionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ModerationActionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ModerationActionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ModerationActionGroupByOutputType[P]>;
}>>;
export type ModerationActionWhereInput = {
    AND?: Prisma.ModerationActionWhereInput | Prisma.ModerationActionWhereInput[];
    OR?: Prisma.ModerationActionWhereInput[];
    NOT?: Prisma.ModerationActionWhereInput | Prisma.ModerationActionWhereInput[];
    id?: Prisma.UuidFilter<"ModerationAction"> | string;
    subjectUserId?: Prisma.UuidFilter<"ModerationAction"> | string;
    actorId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFilter<"ModerationAction"> | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFilter<"ModerationAction"> | $Enums.ModerationActionType;
    publicationId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    reason?: Prisma.StringFilter<"ModerationAction"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    reversedAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAction"> | Date | string;
    subject?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    appeals?: Prisma.ModerationAppealListRelationFilter;
};
export type ModerationActionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    subjectUserId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    actionType?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reversedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    subject?: Prisma.UserOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
    appeals?: Prisma.ModerationAppealOrderByRelationAggregateInput;
};
export type ModerationActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ModerationActionWhereInput | Prisma.ModerationActionWhereInput[];
    OR?: Prisma.ModerationActionWhereInput[];
    NOT?: Prisma.ModerationActionWhereInput | Prisma.ModerationActionWhereInput[];
    subjectUserId?: Prisma.UuidFilter<"ModerationAction"> | string;
    actorId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFilter<"ModerationAction"> | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFilter<"ModerationAction"> | $Enums.ModerationActionType;
    publicationId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    reason?: Prisma.StringFilter<"ModerationAction"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    reversedAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAction"> | Date | string;
    subject?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    appeals?: Prisma.ModerationAppealListRelationFilter;
}, "id">;
export type ModerationActionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    subjectUserId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    actionType?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reversedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ModerationActionCountOrderByAggregateInput;
    _max?: Prisma.ModerationActionMaxOrderByAggregateInput;
    _min?: Prisma.ModerationActionMinOrderByAggregateInput;
};
export type ModerationActionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ModerationActionScalarWhereWithAggregatesInput | Prisma.ModerationActionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ModerationActionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ModerationActionScalarWhereWithAggregatesInput | Prisma.ModerationActionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ModerationAction"> | string;
    subjectUserId?: Prisma.UuidWithAggregatesFilter<"ModerationAction"> | string;
    actorId?: Prisma.UuidNullableWithAggregatesFilter<"ModerationAction"> | string | null;
    targetType?: Prisma.EnumModerationTargetTypeWithAggregatesFilter<"ModerationAction"> | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeWithAggregatesFilter<"ModerationAction"> | $Enums.ModerationActionType;
    publicationId?: Prisma.UuidNullableWithAggregatesFilter<"ModerationAction"> | string | null;
    commentId?: Prisma.UuidNullableWithAggregatesFilter<"ModerationAction"> | string | null;
    reason?: Prisma.StringWithAggregatesFilter<"ModerationAction"> | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ModerationAction"> | Date | string | null;
    reversedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ModerationAction"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ModerationAction"> | Date | string;
};
export type ModerationActionCreateInput = {
    id?: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    subject: Prisma.UserCreateNestedOneWithoutModerationActionsInput;
    actor?: Prisma.UserCreateNestedOneWithoutModerationActionsMadeInput;
    appeals?: Prisma.ModerationAppealCreateNestedManyWithoutActionInput;
};
export type ModerationActionUncheckedCreateInput = {
    id?: string;
    subjectUserId: string;
    actorId?: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    appeals?: Prisma.ModerationAppealUncheckedCreateNestedManyWithoutActionInput;
};
export type ModerationActionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subject?: Prisma.UserUpdateOneRequiredWithoutModerationActionsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutModerationActionsMadeNestedInput;
    appeals?: Prisma.ModerationAppealUpdateManyWithoutActionNestedInput;
};
export type ModerationActionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appeals?: Prisma.ModerationAppealUncheckedUpdateManyWithoutActionNestedInput;
};
export type ModerationActionCreateManyInput = {
    id?: string;
    subjectUserId: string;
    actorId?: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationActionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationActionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationActionListRelationFilter = {
    every?: Prisma.ModerationActionWhereInput;
    some?: Prisma.ModerationActionWhereInput;
    none?: Prisma.ModerationActionWhereInput;
};
export type ModerationActionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ModerationActionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subjectUserId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    actionType?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    reversedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationActionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subjectUserId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    actionType?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    reversedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationActionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subjectUserId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    targetType?: Prisma.SortOrder;
    actionType?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    reversedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ModerationActionScalarRelationFilter = {
    is?: Prisma.ModerationActionWhereInput;
    isNot?: Prisma.ModerationActionWhereInput;
};
export type ModerationActionCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput> | Prisma.ModerationActionCreateWithoutSubjectInput[] | Prisma.ModerationActionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutSubjectInput | Prisma.ModerationActionCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.ModerationActionCreateManySubjectInputEnvelope;
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
};
export type ModerationActionCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput> | Prisma.ModerationActionCreateWithoutActorInput[] | Prisma.ModerationActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutActorInput | Prisma.ModerationActionCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ModerationActionCreateManyActorInputEnvelope;
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
};
export type ModerationActionUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput> | Prisma.ModerationActionCreateWithoutSubjectInput[] | Prisma.ModerationActionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutSubjectInput | Prisma.ModerationActionCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.ModerationActionCreateManySubjectInputEnvelope;
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
};
export type ModerationActionUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput> | Prisma.ModerationActionCreateWithoutActorInput[] | Prisma.ModerationActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutActorInput | Prisma.ModerationActionCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ModerationActionCreateManyActorInputEnvelope;
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
};
export type ModerationActionUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput> | Prisma.ModerationActionCreateWithoutSubjectInput[] | Prisma.ModerationActionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutSubjectInput | Prisma.ModerationActionCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.ModerationActionUpsertWithWhereUniqueWithoutSubjectInput | Prisma.ModerationActionUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.ModerationActionCreateManySubjectInputEnvelope;
    set?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    disconnect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    delete?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    update?: Prisma.ModerationActionUpdateWithWhereUniqueWithoutSubjectInput | Prisma.ModerationActionUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.ModerationActionUpdateManyWithWhereWithoutSubjectInput | Prisma.ModerationActionUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
};
export type ModerationActionUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput> | Prisma.ModerationActionCreateWithoutActorInput[] | Prisma.ModerationActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutActorInput | Prisma.ModerationActionCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ModerationActionUpsertWithWhereUniqueWithoutActorInput | Prisma.ModerationActionUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ModerationActionCreateManyActorInputEnvelope;
    set?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    disconnect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    delete?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    update?: Prisma.ModerationActionUpdateWithWhereUniqueWithoutActorInput | Prisma.ModerationActionUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ModerationActionUpdateManyWithWhereWithoutActorInput | Prisma.ModerationActionUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
};
export type ModerationActionUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput> | Prisma.ModerationActionCreateWithoutSubjectInput[] | Prisma.ModerationActionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutSubjectInput | Prisma.ModerationActionCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.ModerationActionUpsertWithWhereUniqueWithoutSubjectInput | Prisma.ModerationActionUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.ModerationActionCreateManySubjectInputEnvelope;
    set?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    disconnect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    delete?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    update?: Prisma.ModerationActionUpdateWithWhereUniqueWithoutSubjectInput | Prisma.ModerationActionUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.ModerationActionUpdateManyWithWhereWithoutSubjectInput | Prisma.ModerationActionUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
};
export type ModerationActionUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput> | Prisma.ModerationActionCreateWithoutActorInput[] | Prisma.ModerationActionUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutActorInput | Prisma.ModerationActionCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ModerationActionUpsertWithWhereUniqueWithoutActorInput | Prisma.ModerationActionUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ModerationActionCreateManyActorInputEnvelope;
    set?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    disconnect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    delete?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    connect?: Prisma.ModerationActionWhereUniqueInput | Prisma.ModerationActionWhereUniqueInput[];
    update?: Prisma.ModerationActionUpdateWithWhereUniqueWithoutActorInput | Prisma.ModerationActionUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ModerationActionUpdateManyWithWhereWithoutActorInput | Prisma.ModerationActionUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
};
export type EnumModerationTargetTypeFieldUpdateOperationsInput = {
    set?: $Enums.ModerationTargetType;
};
export type EnumModerationActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ModerationActionType;
};
export type ModerationActionCreateNestedOneWithoutAppealsInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutAppealsInput, Prisma.ModerationActionUncheckedCreateWithoutAppealsInput>;
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutAppealsInput;
    connect?: Prisma.ModerationActionWhereUniqueInput;
};
export type ModerationActionUpdateOneRequiredWithoutAppealsNestedInput = {
    create?: Prisma.XOR<Prisma.ModerationActionCreateWithoutAppealsInput, Prisma.ModerationActionUncheckedCreateWithoutAppealsInput>;
    connectOrCreate?: Prisma.ModerationActionCreateOrConnectWithoutAppealsInput;
    upsert?: Prisma.ModerationActionUpsertWithoutAppealsInput;
    connect?: Prisma.ModerationActionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ModerationActionUpdateToOneWithWhereWithoutAppealsInput, Prisma.ModerationActionUpdateWithoutAppealsInput>, Prisma.ModerationActionUncheckedUpdateWithoutAppealsInput>;
};
export type ModerationActionCreateWithoutSubjectInput = {
    id?: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    actor?: Prisma.UserCreateNestedOneWithoutModerationActionsMadeInput;
    appeals?: Prisma.ModerationAppealCreateNestedManyWithoutActionInput;
};
export type ModerationActionUncheckedCreateWithoutSubjectInput = {
    id?: string;
    actorId?: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    appeals?: Prisma.ModerationAppealUncheckedCreateNestedManyWithoutActionInput;
};
export type ModerationActionCreateOrConnectWithoutSubjectInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput>;
};
export type ModerationActionCreateManySubjectInputEnvelope = {
    data: Prisma.ModerationActionCreateManySubjectInput | Prisma.ModerationActionCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type ModerationActionCreateWithoutActorInput = {
    id?: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    subject: Prisma.UserCreateNestedOneWithoutModerationActionsInput;
    appeals?: Prisma.ModerationAppealCreateNestedManyWithoutActionInput;
};
export type ModerationActionUncheckedCreateWithoutActorInput = {
    id?: string;
    subjectUserId: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    appeals?: Prisma.ModerationAppealUncheckedCreateNestedManyWithoutActionInput;
};
export type ModerationActionCreateOrConnectWithoutActorInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput>;
};
export type ModerationActionCreateManyActorInputEnvelope = {
    data: Prisma.ModerationActionCreateManyActorInput | Prisma.ModerationActionCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type ModerationActionUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ModerationActionUpdateWithoutSubjectInput, Prisma.ModerationActionUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutSubjectInput, Prisma.ModerationActionUncheckedCreateWithoutSubjectInput>;
};
export type ModerationActionUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ModerationActionUpdateWithoutSubjectInput, Prisma.ModerationActionUncheckedUpdateWithoutSubjectInput>;
};
export type ModerationActionUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.ModerationActionScalarWhereInput;
    data: Prisma.XOR<Prisma.ModerationActionUpdateManyMutationInput, Prisma.ModerationActionUncheckedUpdateManyWithoutSubjectInput>;
};
export type ModerationActionScalarWhereInput = {
    AND?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
    OR?: Prisma.ModerationActionScalarWhereInput[];
    NOT?: Prisma.ModerationActionScalarWhereInput | Prisma.ModerationActionScalarWhereInput[];
    id?: Prisma.UuidFilter<"ModerationAction"> | string;
    subjectUserId?: Prisma.UuidFilter<"ModerationAction"> | string;
    actorId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFilter<"ModerationAction"> | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFilter<"ModerationAction"> | $Enums.ModerationActionType;
    publicationId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    commentId?: Prisma.UuidNullableFilter<"ModerationAction"> | string | null;
    reason?: Prisma.StringFilter<"ModerationAction"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    reversedAt?: Prisma.DateTimeNullableFilter<"ModerationAction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ModerationAction"> | Date | string;
};
export type ModerationActionUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ModerationActionUpdateWithoutActorInput, Prisma.ModerationActionUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutActorInput, Prisma.ModerationActionUncheckedCreateWithoutActorInput>;
};
export type ModerationActionUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ModerationActionUpdateWithoutActorInput, Prisma.ModerationActionUncheckedUpdateWithoutActorInput>;
};
export type ModerationActionUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.ModerationActionScalarWhereInput;
    data: Prisma.XOR<Prisma.ModerationActionUpdateManyMutationInput, Prisma.ModerationActionUncheckedUpdateManyWithoutActorInput>;
};
export type ModerationActionCreateWithoutAppealsInput = {
    id?: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
    subject: Prisma.UserCreateNestedOneWithoutModerationActionsInput;
    actor?: Prisma.UserCreateNestedOneWithoutModerationActionsMadeInput;
};
export type ModerationActionUncheckedCreateWithoutAppealsInput = {
    id?: string;
    subjectUserId: string;
    actorId?: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationActionCreateOrConnectWithoutAppealsInput = {
    where: Prisma.ModerationActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutAppealsInput, Prisma.ModerationActionUncheckedCreateWithoutAppealsInput>;
};
export type ModerationActionUpsertWithoutAppealsInput = {
    update: Prisma.XOR<Prisma.ModerationActionUpdateWithoutAppealsInput, Prisma.ModerationActionUncheckedUpdateWithoutAppealsInput>;
    create: Prisma.XOR<Prisma.ModerationActionCreateWithoutAppealsInput, Prisma.ModerationActionUncheckedCreateWithoutAppealsInput>;
    where?: Prisma.ModerationActionWhereInput;
};
export type ModerationActionUpdateToOneWithWhereWithoutAppealsInput = {
    where?: Prisma.ModerationActionWhereInput;
    data: Prisma.XOR<Prisma.ModerationActionUpdateWithoutAppealsInput, Prisma.ModerationActionUncheckedUpdateWithoutAppealsInput>;
};
export type ModerationActionUpdateWithoutAppealsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subject?: Prisma.UserUpdateOneRequiredWithoutModerationActionsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutModerationActionsMadeNestedInput;
};
export type ModerationActionUncheckedUpdateWithoutAppealsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationActionCreateManySubjectInput = {
    id?: string;
    actorId?: string | null;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationActionCreateManyActorInput = {
    id?: string;
    subjectUserId: string;
    targetType: $Enums.ModerationTargetType;
    actionType: $Enums.ModerationActionType;
    publicationId?: string | null;
    commentId?: string | null;
    reason: string;
    expiresAt?: Date | string | null;
    reversedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ModerationActionUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.UserUpdateOneWithoutModerationActionsMadeNestedInput;
    appeals?: Prisma.ModerationAppealUpdateManyWithoutActionNestedInput;
};
export type ModerationActionUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appeals?: Prisma.ModerationAppealUncheckedUpdateManyWithoutActionNestedInput;
};
export type ModerationActionUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationActionUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subject?: Prisma.UserUpdateOneRequiredWithoutModerationActionsNestedInput;
    appeals?: Prisma.ModerationAppealUpdateManyWithoutActionNestedInput;
};
export type ModerationActionUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appeals?: Prisma.ModerationAppealUncheckedUpdateManyWithoutActionNestedInput;
};
export type ModerationActionUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetType?: Prisma.EnumModerationTargetTypeFieldUpdateOperationsInput | $Enums.ModerationTargetType;
    actionType?: Prisma.EnumModerationActionTypeFieldUpdateOperationsInput | $Enums.ModerationActionType;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reversedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ModerationActionCountOutputType = {
    appeals: number;
};
export type ModerationActionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    appeals?: boolean | ModerationActionCountOutputTypeCountAppealsArgs;
};
export type ModerationActionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionCountOutputTypeSelect<ExtArgs> | null;
};
export type ModerationActionCountOutputTypeCountAppealsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationAppealWhereInput;
};
export type ModerationActionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subjectUserId?: boolean;
    actorId?: boolean;
    targetType?: boolean;
    actionType?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    expiresAt?: boolean;
    reversedAt?: boolean;
    createdAt?: boolean;
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
    appeals?: boolean | Prisma.ModerationAction$appealsArgs<ExtArgs>;
    _count?: boolean | Prisma.ModerationActionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAction"]>;
export type ModerationActionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subjectUserId?: boolean;
    actorId?: boolean;
    targetType?: boolean;
    actionType?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    expiresAt?: boolean;
    reversedAt?: boolean;
    createdAt?: boolean;
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAction"]>;
export type ModerationActionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subjectUserId?: boolean;
    actorId?: boolean;
    targetType?: boolean;
    actionType?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    expiresAt?: boolean;
    reversedAt?: boolean;
    createdAt?: boolean;
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
}, ExtArgs["result"]["moderationAction"]>;
export type ModerationActionSelectScalar = {
    id?: boolean;
    subjectUserId?: boolean;
    actorId?: boolean;
    targetType?: boolean;
    actionType?: boolean;
    publicationId?: boolean;
    commentId?: boolean;
    reason?: boolean;
    expiresAt?: boolean;
    reversedAt?: boolean;
    createdAt?: boolean;
};
export type ModerationActionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "subjectUserId" | "actorId" | "targetType" | "actionType" | "publicationId" | "commentId" | "reason" | "expiresAt" | "reversedAt" | "createdAt", ExtArgs["result"]["moderationAction"]>;
export type ModerationActionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
    appeals?: boolean | Prisma.ModerationAction$appealsArgs<ExtArgs>;
    _count?: boolean | Prisma.ModerationActionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ModerationActionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
};
export type ModerationActionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.ModerationAction$actorArgs<ExtArgs>;
};
export type $ModerationActionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ModerationAction";
    objects: {
        subject: Prisma.$UserPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs> | null;
        appeals: Prisma.$ModerationAppealPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        subjectUserId: string;
        actorId: string | null;
        targetType: $Enums.ModerationTargetType;
        actionType: $Enums.ModerationActionType;
        publicationId: string | null;
        commentId: string | null;
        reason: string;
        expiresAt: Date | null;
        reversedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["moderationAction"]>;
    composites: {};
};
export type ModerationActionGetPayload<S extends boolean | null | undefined | ModerationActionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload, S>;
export type ModerationActionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ModerationActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ModerationActionCountAggregateInputType | true;
};
export interface ModerationActionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ModerationAction'];
        meta: {
            name: 'ModerationAction';
        };
    };
    findUnique<T extends ModerationActionFindUniqueArgs>(args: Prisma.SelectSubset<T, ModerationActionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ModerationActionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ModerationActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ModerationActionFindFirstArgs>(args?: Prisma.SelectSubset<T, ModerationActionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ModerationActionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ModerationActionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ModerationActionFindManyArgs>(args?: Prisma.SelectSubset<T, ModerationActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ModerationActionCreateArgs>(args: Prisma.SelectSubset<T, ModerationActionCreateArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ModerationActionCreateManyArgs>(args?: Prisma.SelectSubset<T, ModerationActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ModerationActionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ModerationActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ModerationActionDeleteArgs>(args: Prisma.SelectSubset<T, ModerationActionDeleteArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ModerationActionUpdateArgs>(args: Prisma.SelectSubset<T, ModerationActionUpdateArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ModerationActionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ModerationActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ModerationActionUpdateManyArgs>(args: Prisma.SelectSubset<T, ModerationActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ModerationActionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ModerationActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ModerationActionUpsertArgs>(args: Prisma.SelectSubset<T, ModerationActionUpsertArgs<ExtArgs>>): Prisma.Prisma__ModerationActionClient<runtime.Types.Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ModerationActionCountArgs>(args?: Prisma.Subset<T, ModerationActionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ModerationActionCountAggregateOutputType> : number>;
    aggregate<T extends ModerationActionAggregateArgs>(args: Prisma.Subset<T, ModerationActionAggregateArgs>): Prisma.PrismaPromise<GetModerationActionAggregateType<T>>;
    groupBy<T extends ModerationActionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ModerationActionGroupByArgs['orderBy'];
    } : {
        orderBy?: ModerationActionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ModerationActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModerationActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ModerationActionFieldRefs;
}
export interface Prisma__ModerationActionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subject<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.ModerationAction$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModerationAction$actorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    appeals<T extends Prisma.ModerationAction$appealsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModerationAction$appealsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModerationAppealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ModerationActionFieldRefs {
    readonly id: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly subjectUserId: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly actorId: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly targetType: Prisma.FieldRef<"ModerationAction", 'ModerationTargetType'>;
    readonly actionType: Prisma.FieldRef<"ModerationAction", 'ModerationActionType'>;
    readonly publicationId: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly commentId: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly reason: Prisma.FieldRef<"ModerationAction", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"ModerationAction", 'DateTime'>;
    readonly reversedAt: Prisma.FieldRef<"ModerationAction", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ModerationAction", 'DateTime'>;
}
export type ModerationActionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where: Prisma.ModerationActionWhereUniqueInput;
};
export type ModerationActionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where: Prisma.ModerationActionWhereUniqueInput;
};
export type ModerationActionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where?: Prisma.ModerationActionWhereInput;
    orderBy?: Prisma.ModerationActionOrderByWithRelationInput | Prisma.ModerationActionOrderByWithRelationInput[];
    cursor?: Prisma.ModerationActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationActionScalarFieldEnum | Prisma.ModerationActionScalarFieldEnum[];
};
export type ModerationActionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where?: Prisma.ModerationActionWhereInput;
    orderBy?: Prisma.ModerationActionOrderByWithRelationInput | Prisma.ModerationActionOrderByWithRelationInput[];
    cursor?: Prisma.ModerationActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationActionScalarFieldEnum | Prisma.ModerationActionScalarFieldEnum[];
};
export type ModerationActionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where?: Prisma.ModerationActionWhereInput;
    orderBy?: Prisma.ModerationActionOrderByWithRelationInput | Prisma.ModerationActionOrderByWithRelationInput[];
    cursor?: Prisma.ModerationActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationActionScalarFieldEnum | Prisma.ModerationActionScalarFieldEnum[];
};
export type ModerationActionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationActionCreateInput, Prisma.ModerationActionUncheckedCreateInput>;
};
export type ModerationActionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ModerationActionCreateManyInput | Prisma.ModerationActionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ModerationActionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    data: Prisma.ModerationActionCreateManyInput | Prisma.ModerationActionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ModerationActionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ModerationActionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationActionUpdateInput, Prisma.ModerationActionUncheckedUpdateInput>;
    where: Prisma.ModerationActionWhereUniqueInput;
};
export type ModerationActionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ModerationActionUpdateManyMutationInput, Prisma.ModerationActionUncheckedUpdateManyInput>;
    where?: Prisma.ModerationActionWhereInput;
    limit?: number;
};
export type ModerationActionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModerationActionUpdateManyMutationInput, Prisma.ModerationActionUncheckedUpdateManyInput>;
    where?: Prisma.ModerationActionWhereInput;
    limit?: number;
    include?: Prisma.ModerationActionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ModerationActionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where: Prisma.ModerationActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModerationActionCreateInput, Prisma.ModerationActionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ModerationActionUpdateInput, Prisma.ModerationActionUncheckedUpdateInput>;
};
export type ModerationActionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
    where: Prisma.ModerationActionWhereUniqueInput;
};
export type ModerationActionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModerationActionWhereInput;
    limit?: number;
};
export type ModerationAction$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type ModerationAction$appealsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationAppealSelect<ExtArgs> | null;
    omit?: Prisma.ModerationAppealOmit<ExtArgs> | null;
    include?: Prisma.ModerationAppealInclude<ExtArgs> | null;
    where?: Prisma.ModerationAppealWhereInput;
    orderBy?: Prisma.ModerationAppealOrderByWithRelationInput | Prisma.ModerationAppealOrderByWithRelationInput[];
    cursor?: Prisma.ModerationAppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModerationAppealScalarFieldEnum | Prisma.ModerationAppealScalarFieldEnum[];
};
export type ModerationActionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModerationActionSelect<ExtArgs> | null;
    omit?: Prisma.ModerationActionOmit<ExtArgs> | null;
    include?: Prisma.ModerationActionInclude<ExtArgs> | null;
};
export {};
