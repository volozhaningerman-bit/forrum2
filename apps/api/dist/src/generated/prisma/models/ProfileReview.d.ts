import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProfileReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ProfileReviewPayload>;
export type AggregateProfileReview = {
    _count: ProfileReviewCountAggregateOutputType | null;
    _min: ProfileReviewMinAggregateOutputType | null;
    _max: ProfileReviewMaxAggregateOutputType | null;
};
export type ProfileReviewMinAggregateOutputType = {
    id: string | null;
    interactionId: string | null;
    authorId: string | null;
    targetId: string | null;
    evidenceMediaId: string | null;
    verdict: $Enums.ReviewVerdict | null;
    moderationStatus: $Enums.ReviewModerationStatus | null;
    moderationNote: string | null;
    moderatedAt: Date | null;
    body: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProfileReviewMaxAggregateOutputType = {
    id: string | null;
    interactionId: string | null;
    authorId: string | null;
    targetId: string | null;
    evidenceMediaId: string | null;
    verdict: $Enums.ReviewVerdict | null;
    moderationStatus: $Enums.ReviewModerationStatus | null;
    moderationNote: string | null;
    moderatedAt: Date | null;
    body: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProfileReviewCountAggregateOutputType = {
    id: number;
    interactionId: number;
    authorId: number;
    targetId: number;
    evidenceMediaId: number;
    verdict: number;
    moderationStatus: number;
    moderationNote: number;
    moderatedAt: number;
    body: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProfileReviewMinAggregateInputType = {
    id?: true;
    interactionId?: true;
    authorId?: true;
    targetId?: true;
    evidenceMediaId?: true;
    verdict?: true;
    moderationStatus?: true;
    moderationNote?: true;
    moderatedAt?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProfileReviewMaxAggregateInputType = {
    id?: true;
    interactionId?: true;
    authorId?: true;
    targetId?: true;
    evidenceMediaId?: true;
    verdict?: true;
    moderationStatus?: true;
    moderationNote?: true;
    moderatedAt?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProfileReviewCountAggregateInputType = {
    id?: true;
    interactionId?: true;
    authorId?: true;
    targetId?: true;
    evidenceMediaId?: true;
    verdict?: true;
    moderationStatus?: true;
    moderationNote?: true;
    moderatedAt?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProfileReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProfileReviewWhereInput;
    orderBy?: Prisma.ProfileReviewOrderByWithRelationInput | Prisma.ProfileReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProfileReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProfileReviewCountAggregateInputType;
    _min?: ProfileReviewMinAggregateInputType;
    _max?: ProfileReviewMaxAggregateInputType;
};
export type GetProfileReviewAggregateType<T extends ProfileReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateProfileReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProfileReview[P]> : Prisma.GetScalarType<T[P], AggregateProfileReview[P]>;
};
export type ProfileReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProfileReviewWhereInput;
    orderBy?: Prisma.ProfileReviewOrderByWithAggregationInput | Prisma.ProfileReviewOrderByWithAggregationInput[];
    by: Prisma.ProfileReviewScalarFieldEnum[] | Prisma.ProfileReviewScalarFieldEnum;
    having?: Prisma.ProfileReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProfileReviewCountAggregateInputType | true;
    _min?: ProfileReviewMinAggregateInputType;
    _max?: ProfileReviewMaxAggregateInputType;
};
export type ProfileReviewGroupByOutputType = {
    id: string;
    interactionId: string;
    authorId: string;
    targetId: string;
    evidenceMediaId: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus: $Enums.ReviewModerationStatus;
    moderationNote: string | null;
    moderatedAt: Date | null;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ProfileReviewCountAggregateOutputType | null;
    _min: ProfileReviewMinAggregateOutputType | null;
    _max: ProfileReviewMaxAggregateOutputType | null;
};
type GetProfileReviewGroupByPayload<T extends ProfileReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProfileReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProfileReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProfileReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProfileReviewGroupByOutputType[P]>;
}>>;
export type ProfileReviewWhereInput = {
    AND?: Prisma.ProfileReviewWhereInput | Prisma.ProfileReviewWhereInput[];
    OR?: Prisma.ProfileReviewWhereInput[];
    NOT?: Prisma.ProfileReviewWhereInput | Prisma.ProfileReviewWhereInput[];
    id?: Prisma.UuidFilter<"ProfileReview"> | string;
    interactionId?: Prisma.UuidFilter<"ProfileReview"> | string;
    authorId?: Prisma.UuidFilter<"ProfileReview"> | string;
    targetId?: Prisma.UuidFilter<"ProfileReview"> | string;
    evidenceMediaId?: Prisma.UuidNullableFilter<"ProfileReview"> | string | null;
    verdict?: Prisma.EnumReviewVerdictFilter<"ProfileReview"> | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFilter<"ProfileReview"> | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.StringNullableFilter<"ProfileReview"> | string | null;
    moderatedAt?: Prisma.DateTimeNullableFilter<"ProfileReview"> | Date | string | null;
    body?: Prisma.StringFilter<"ProfileReview"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
    interaction?: Prisma.XOR<Prisma.ConfirmedInteractionScalarRelationFilter, Prisma.ConfirmedInteractionWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    target?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    evidenceMedia?: Prisma.XOR<Prisma.MediaAssetNullableScalarRelationFilter, Prisma.MediaAssetWhereInput> | null;
};
export type ProfileReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    interactionId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    evidenceMediaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    body?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    interaction?: Prisma.ConfirmedInteractionOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
    target?: Prisma.UserOrderByWithRelationInput;
    evidenceMedia?: Prisma.MediaAssetOrderByWithRelationInput;
};
export type ProfileReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    interactionId_authorId?: Prisma.ProfileReviewInteractionIdAuthorIdCompoundUniqueInput;
    AND?: Prisma.ProfileReviewWhereInput | Prisma.ProfileReviewWhereInput[];
    OR?: Prisma.ProfileReviewWhereInput[];
    NOT?: Prisma.ProfileReviewWhereInput | Prisma.ProfileReviewWhereInput[];
    interactionId?: Prisma.UuidFilter<"ProfileReview"> | string;
    authorId?: Prisma.UuidFilter<"ProfileReview"> | string;
    targetId?: Prisma.UuidFilter<"ProfileReview"> | string;
    evidenceMediaId?: Prisma.UuidNullableFilter<"ProfileReview"> | string | null;
    verdict?: Prisma.EnumReviewVerdictFilter<"ProfileReview"> | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFilter<"ProfileReview"> | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.StringNullableFilter<"ProfileReview"> | string | null;
    moderatedAt?: Prisma.DateTimeNullableFilter<"ProfileReview"> | Date | string | null;
    body?: Prisma.StringFilter<"ProfileReview"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
    interaction?: Prisma.XOR<Prisma.ConfirmedInteractionScalarRelationFilter, Prisma.ConfirmedInteractionWhereInput>;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    target?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    evidenceMedia?: Prisma.XOR<Prisma.MediaAssetNullableScalarRelationFilter, Prisma.MediaAssetWhereInput> | null;
}, "id" | "interactionId_authorId">;
export type ProfileReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    interactionId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    evidenceMediaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    body?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProfileReviewCountOrderByAggregateInput;
    _max?: Prisma.ProfileReviewMaxOrderByAggregateInput;
    _min?: Prisma.ProfileReviewMinOrderByAggregateInput;
};
export type ProfileReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProfileReviewScalarWhereWithAggregatesInput | Prisma.ProfileReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProfileReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProfileReviewScalarWhereWithAggregatesInput | Prisma.ProfileReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProfileReview"> | string;
    interactionId?: Prisma.UuidWithAggregatesFilter<"ProfileReview"> | string;
    authorId?: Prisma.UuidWithAggregatesFilter<"ProfileReview"> | string;
    targetId?: Prisma.UuidWithAggregatesFilter<"ProfileReview"> | string;
    evidenceMediaId?: Prisma.UuidNullableWithAggregatesFilter<"ProfileReview"> | string | null;
    verdict?: Prisma.EnumReviewVerdictWithAggregatesFilter<"ProfileReview"> | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusWithAggregatesFilter<"ProfileReview"> | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.StringNullableWithAggregatesFilter<"ProfileReview"> | string | null;
    moderatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProfileReview"> | Date | string | null;
    body?: Prisma.StringWithAggregatesFilter<"ProfileReview"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProfileReview"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProfileReview"> | Date | string;
};
export type ProfileReviewCreateInput = {
    id?: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interaction: Prisma.ConfirmedInteractionCreateNestedOneWithoutReviewsInput;
    author: Prisma.UserCreateNestedOneWithoutInteractionReviewsWrittenInput;
    target: Prisma.UserCreateNestedOneWithoutInteractionReviewsReceivedInput;
    evidenceMedia?: Prisma.MediaAssetCreateNestedOneWithoutReviewEvidenceInput;
};
export type ProfileReviewUncheckedCreateInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    interaction?: Prisma.ConfirmedInteractionUpdateOneRequiredWithoutReviewsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsWrittenNestedInput;
    target?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsReceivedNestedInput;
    evidenceMedia?: Prisma.MediaAssetUpdateOneWithoutReviewEvidenceNestedInput;
};
export type ProfileReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewCreateManyInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewListRelationFilter = {
    every?: Prisma.ProfileReviewWhereInput;
    some?: Prisma.ProfileReviewWhereInput;
    none?: Prisma.ProfileReviewWhereInput;
};
export type ProfileReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProfileReviewInteractionIdAuthorIdCompoundUniqueInput = {
    interactionId: string;
    authorId: string;
};
export type ProfileReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    interactionId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    evidenceMediaId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationNote?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProfileReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    interactionId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    evidenceMediaId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationNote?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProfileReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    interactionId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    targetId?: Prisma.SortOrder;
    evidenceMediaId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationNote?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProfileReviewCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput> | Prisma.ProfileReviewCreateWithoutAuthorInput[] | Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput | Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ProfileReviewCreateManyAuthorInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput> | Prisma.ProfileReviewCreateWithoutTargetInput[] | Prisma.ProfileReviewUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutTargetInput | Prisma.ProfileReviewCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.ProfileReviewCreateManyTargetInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput> | Prisma.ProfileReviewCreateWithoutAuthorInput[] | Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput | Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ProfileReviewCreateManyAuthorInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUncheckedCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput> | Prisma.ProfileReviewCreateWithoutTargetInput[] | Prisma.ProfileReviewUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutTargetInput | Prisma.ProfileReviewCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.ProfileReviewCreateManyTargetInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput> | Prisma.ProfileReviewCreateWithoutAuthorInput[] | Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput | Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ProfileReviewCreateManyAuthorInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutAuthorInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput> | Prisma.ProfileReviewCreateWithoutTargetInput[] | Prisma.ProfileReviewUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutTargetInput | Prisma.ProfileReviewCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutTargetInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.ProfileReviewCreateManyTargetInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutTargetInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutTargetInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput> | Prisma.ProfileReviewCreateWithoutAuthorInput[] | Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput | Prisma.ProfileReviewCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ProfileReviewCreateManyAuthorInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutAuthorInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput> | Prisma.ProfileReviewCreateWithoutTargetInput[] | Prisma.ProfileReviewUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutTargetInput | Prisma.ProfileReviewCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutTargetInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.ProfileReviewCreateManyTargetInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutTargetInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutTargetInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewCreateNestedManyWithoutEvidenceMediaInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput> | Prisma.ProfileReviewCreateWithoutEvidenceMediaInput[] | Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput | Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput[];
    createMany?: Prisma.ProfileReviewCreateManyEvidenceMediaInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUncheckedCreateNestedManyWithoutEvidenceMediaInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput> | Prisma.ProfileReviewCreateWithoutEvidenceMediaInput[] | Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput | Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput[];
    createMany?: Prisma.ProfileReviewCreateManyEvidenceMediaInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUpdateManyWithoutEvidenceMediaNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput> | Prisma.ProfileReviewCreateWithoutEvidenceMediaInput[] | Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput | Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutEvidenceMediaInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutEvidenceMediaInput[];
    createMany?: Prisma.ProfileReviewCreateManyEvidenceMediaInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutEvidenceMediaInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutEvidenceMediaInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutEvidenceMediaInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutEvidenceMediaInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewUncheckedUpdateManyWithoutEvidenceMediaNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput> | Prisma.ProfileReviewCreateWithoutEvidenceMediaInput[] | Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput | Prisma.ProfileReviewCreateOrConnectWithoutEvidenceMediaInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutEvidenceMediaInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutEvidenceMediaInput[];
    createMany?: Prisma.ProfileReviewCreateManyEvidenceMediaInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutEvidenceMediaInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutEvidenceMediaInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutEvidenceMediaInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutEvidenceMediaInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewCreateNestedManyWithoutInteractionInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput> | Prisma.ProfileReviewCreateWithoutInteractionInput[] | Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput | Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput[];
    createMany?: Prisma.ProfileReviewCreateManyInteractionInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUncheckedCreateNestedManyWithoutInteractionInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput> | Prisma.ProfileReviewCreateWithoutInteractionInput[] | Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput | Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput[];
    createMany?: Prisma.ProfileReviewCreateManyInteractionInputEnvelope;
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
};
export type ProfileReviewUpdateManyWithoutInteractionNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput> | Prisma.ProfileReviewCreateWithoutInteractionInput[] | Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput | Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutInteractionInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutInteractionInput[];
    createMany?: Prisma.ProfileReviewCreateManyInteractionInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutInteractionInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutInteractionInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutInteractionInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutInteractionInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type ProfileReviewUncheckedUpdateManyWithoutInteractionNestedInput = {
    create?: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput> | Prisma.ProfileReviewCreateWithoutInteractionInput[] | Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput[];
    connectOrCreate?: Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput | Prisma.ProfileReviewCreateOrConnectWithoutInteractionInput[];
    upsert?: Prisma.ProfileReviewUpsertWithWhereUniqueWithoutInteractionInput | Prisma.ProfileReviewUpsertWithWhereUniqueWithoutInteractionInput[];
    createMany?: Prisma.ProfileReviewCreateManyInteractionInputEnvelope;
    set?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    disconnect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    delete?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    connect?: Prisma.ProfileReviewWhereUniqueInput | Prisma.ProfileReviewWhereUniqueInput[];
    update?: Prisma.ProfileReviewUpdateWithWhereUniqueWithoutInteractionInput | Prisma.ProfileReviewUpdateWithWhereUniqueWithoutInteractionInput[];
    updateMany?: Prisma.ProfileReviewUpdateManyWithWhereWithoutInteractionInput | Prisma.ProfileReviewUpdateManyWithWhereWithoutInteractionInput[];
    deleteMany?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
};
export type EnumReviewVerdictFieldUpdateOperationsInput = {
    set?: $Enums.ReviewVerdict;
};
export type EnumReviewModerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewModerationStatus;
};
export type ProfileReviewCreateWithoutAuthorInput = {
    id?: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interaction: Prisma.ConfirmedInteractionCreateNestedOneWithoutReviewsInput;
    target: Prisma.UserCreateNestedOneWithoutInteractionReviewsReceivedInput;
    evidenceMedia?: Prisma.MediaAssetCreateNestedOneWithoutReviewEvidenceInput;
};
export type ProfileReviewUncheckedCreateWithoutAuthorInput = {
    id?: string;
    interactionId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewCreateOrConnectWithoutAuthorInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput>;
};
export type ProfileReviewCreateManyAuthorInputEnvelope = {
    data: Prisma.ProfileReviewCreateManyAuthorInput | Prisma.ProfileReviewCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type ProfileReviewCreateWithoutTargetInput = {
    id?: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interaction: Prisma.ConfirmedInteractionCreateNestedOneWithoutReviewsInput;
    author: Prisma.UserCreateNestedOneWithoutInteractionReviewsWrittenInput;
    evidenceMedia?: Prisma.MediaAssetCreateNestedOneWithoutReviewEvidenceInput;
};
export type ProfileReviewUncheckedCreateWithoutTargetInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewCreateOrConnectWithoutTargetInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput>;
};
export type ProfileReviewCreateManyTargetInputEnvelope = {
    data: Prisma.ProfileReviewCreateManyTargetInput | Prisma.ProfileReviewCreateManyTargetInput[];
    skipDuplicates?: boolean;
};
export type ProfileReviewUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutAuthorInput, Prisma.ProfileReviewUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutAuthorInput, Prisma.ProfileReviewUncheckedCreateWithoutAuthorInput>;
};
export type ProfileReviewUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutAuthorInput, Prisma.ProfileReviewUncheckedUpdateWithoutAuthorInput>;
};
export type ProfileReviewUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.ProfileReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyWithoutAuthorInput>;
};
export type ProfileReviewScalarWhereInput = {
    AND?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
    OR?: Prisma.ProfileReviewScalarWhereInput[];
    NOT?: Prisma.ProfileReviewScalarWhereInput | Prisma.ProfileReviewScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProfileReview"> | string;
    interactionId?: Prisma.UuidFilter<"ProfileReview"> | string;
    authorId?: Prisma.UuidFilter<"ProfileReview"> | string;
    targetId?: Prisma.UuidFilter<"ProfileReview"> | string;
    evidenceMediaId?: Prisma.UuidNullableFilter<"ProfileReview"> | string | null;
    verdict?: Prisma.EnumReviewVerdictFilter<"ProfileReview"> | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFilter<"ProfileReview"> | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.StringNullableFilter<"ProfileReview"> | string | null;
    moderatedAt?: Prisma.DateTimeNullableFilter<"ProfileReview"> | Date | string | null;
    body?: Prisma.StringFilter<"ProfileReview"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProfileReview"> | Date | string;
};
export type ProfileReviewUpsertWithWhereUniqueWithoutTargetInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutTargetInput, Prisma.ProfileReviewUncheckedUpdateWithoutTargetInput>;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutTargetInput, Prisma.ProfileReviewUncheckedCreateWithoutTargetInput>;
};
export type ProfileReviewUpdateWithWhereUniqueWithoutTargetInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutTargetInput, Prisma.ProfileReviewUncheckedUpdateWithoutTargetInput>;
};
export type ProfileReviewUpdateManyWithWhereWithoutTargetInput = {
    where: Prisma.ProfileReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyWithoutTargetInput>;
};
export type ProfileReviewCreateWithoutEvidenceMediaInput = {
    id?: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    interaction: Prisma.ConfirmedInteractionCreateNestedOneWithoutReviewsInput;
    author: Prisma.UserCreateNestedOneWithoutInteractionReviewsWrittenInput;
    target: Prisma.UserCreateNestedOneWithoutInteractionReviewsReceivedInput;
};
export type ProfileReviewUncheckedCreateWithoutEvidenceMediaInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    targetId: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewCreateOrConnectWithoutEvidenceMediaInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput>;
};
export type ProfileReviewCreateManyEvidenceMediaInputEnvelope = {
    data: Prisma.ProfileReviewCreateManyEvidenceMediaInput | Prisma.ProfileReviewCreateManyEvidenceMediaInput[];
    skipDuplicates?: boolean;
};
export type ProfileReviewUpsertWithWhereUniqueWithoutEvidenceMediaInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedUpdateWithoutEvidenceMediaInput>;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedCreateWithoutEvidenceMediaInput>;
};
export type ProfileReviewUpdateWithWhereUniqueWithoutEvidenceMediaInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutEvidenceMediaInput, Prisma.ProfileReviewUncheckedUpdateWithoutEvidenceMediaInput>;
};
export type ProfileReviewUpdateManyWithWhereWithoutEvidenceMediaInput = {
    where: Prisma.ProfileReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyWithoutEvidenceMediaInput>;
};
export type ProfileReviewCreateWithoutInteractionInput = {
    id?: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutInteractionReviewsWrittenInput;
    target: Prisma.UserCreateNestedOneWithoutInteractionReviewsReceivedInput;
    evidenceMedia?: Prisma.MediaAssetCreateNestedOneWithoutReviewEvidenceInput;
};
export type ProfileReviewUncheckedCreateWithoutInteractionInput = {
    id?: string;
    authorId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewCreateOrConnectWithoutInteractionInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput>;
};
export type ProfileReviewCreateManyInteractionInputEnvelope = {
    data: Prisma.ProfileReviewCreateManyInteractionInput | Prisma.ProfileReviewCreateManyInteractionInput[];
    skipDuplicates?: boolean;
};
export type ProfileReviewUpsertWithWhereUniqueWithoutInteractionInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutInteractionInput, Prisma.ProfileReviewUncheckedUpdateWithoutInteractionInput>;
    create: Prisma.XOR<Prisma.ProfileReviewCreateWithoutInteractionInput, Prisma.ProfileReviewUncheckedCreateWithoutInteractionInput>;
};
export type ProfileReviewUpdateWithWhereUniqueWithoutInteractionInput = {
    where: Prisma.ProfileReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateWithoutInteractionInput, Prisma.ProfileReviewUncheckedUpdateWithoutInteractionInput>;
};
export type ProfileReviewUpdateManyWithWhereWithoutInteractionInput = {
    where: Prisma.ProfileReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyWithoutInteractionInput>;
};
export type ProfileReviewCreateManyAuthorInput = {
    id?: string;
    interactionId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewCreateManyTargetInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    interaction?: Prisma.ConfirmedInteractionUpdateOneRequiredWithoutReviewsNestedInput;
    target?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsReceivedNestedInput;
    evidenceMedia?: Prisma.MediaAssetUpdateOneWithoutReviewEvidenceNestedInput;
};
export type ProfileReviewUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUpdateWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    interaction?: Prisma.ConfirmedInteractionUpdateOneRequiredWithoutReviewsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsWrittenNestedInput;
    evidenceMedia?: Prisma.MediaAssetUpdateOneWithoutReviewEvidenceNestedInput;
};
export type ProfileReviewUncheckedUpdateWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUncheckedUpdateManyWithoutTargetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewCreateManyEvidenceMediaInput = {
    id?: string;
    interactionId: string;
    authorId: string;
    targetId: string;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewUpdateWithoutEvidenceMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    interaction?: Prisma.ConfirmedInteractionUpdateOneRequiredWithoutReviewsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsWrittenNestedInput;
    target?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsReceivedNestedInput;
};
export type ProfileReviewUncheckedUpdateWithoutEvidenceMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUncheckedUpdateManyWithoutEvidenceMediaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewCreateManyInteractionInput = {
    id?: string;
    authorId: string;
    targetId: string;
    evidenceMediaId?: string | null;
    verdict: $Enums.ReviewVerdict;
    moderationStatus?: $Enums.ReviewModerationStatus;
    moderationNote?: string | null;
    moderatedAt?: Date | string | null;
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProfileReviewUpdateWithoutInteractionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsWrittenNestedInput;
    target?: Prisma.UserUpdateOneRequiredWithoutInteractionReviewsReceivedNestedInput;
    evidenceMedia?: Prisma.MediaAssetUpdateOneWithoutReviewEvidenceNestedInput;
};
export type ProfileReviewUncheckedUpdateWithoutInteractionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewUncheckedUpdateManyWithoutInteractionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetId?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceMediaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verdict?: Prisma.EnumReviewVerdictFieldUpdateOperationsInput | $Enums.ReviewVerdict;
    moderationStatus?: Prisma.EnumReviewModerationStatusFieldUpdateOperationsInput | $Enums.ReviewModerationStatus;
    moderationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProfileReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    interactionId?: boolean;
    authorId?: boolean;
    targetId?: boolean;
    evidenceMediaId?: boolean;
    verdict?: boolean;
    moderationStatus?: boolean;
    moderationNote?: boolean;
    moderatedAt?: boolean;
    body?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
}, ExtArgs["result"]["profileReview"]>;
export type ProfileReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    interactionId?: boolean;
    authorId?: boolean;
    targetId?: boolean;
    evidenceMediaId?: boolean;
    verdict?: boolean;
    moderationStatus?: boolean;
    moderationNote?: boolean;
    moderatedAt?: boolean;
    body?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
}, ExtArgs["result"]["profileReview"]>;
export type ProfileReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    interactionId?: boolean;
    authorId?: boolean;
    targetId?: boolean;
    evidenceMediaId?: boolean;
    verdict?: boolean;
    moderationStatus?: boolean;
    moderationNote?: boolean;
    moderatedAt?: boolean;
    body?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
}, ExtArgs["result"]["profileReview"]>;
export type ProfileReviewSelectScalar = {
    id?: boolean;
    interactionId?: boolean;
    authorId?: boolean;
    targetId?: boolean;
    evidenceMediaId?: boolean;
    verdict?: boolean;
    moderationStatus?: boolean;
    moderationNote?: boolean;
    moderatedAt?: boolean;
    body?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProfileReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "interactionId" | "authorId" | "targetId" | "evidenceMediaId" | "verdict" | "moderationStatus" | "moderationNote" | "moderatedAt" | "body" | "createdAt" | "updatedAt", ExtArgs["result"]["profileReview"]>;
export type ProfileReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
};
export type ProfileReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
};
export type ProfileReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    interaction?: boolean | Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    target?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    evidenceMedia?: boolean | Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>;
};
export type $ProfileReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProfileReview";
    objects: {
        interaction: Prisma.$ConfirmedInteractionPayload<ExtArgs>;
        author: Prisma.$UserPayload<ExtArgs>;
        target: Prisma.$UserPayload<ExtArgs>;
        evidenceMedia: Prisma.$MediaAssetPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        interactionId: string;
        authorId: string;
        targetId: string;
        evidenceMediaId: string | null;
        verdict: $Enums.ReviewVerdict;
        moderationStatus: $Enums.ReviewModerationStatus;
        moderationNote: string | null;
        moderatedAt: Date | null;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["profileReview"]>;
    composites: {};
};
export type ProfileReviewGetPayload<S extends boolean | null | undefined | ProfileReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload, S>;
export type ProfileReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProfileReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProfileReviewCountAggregateInputType | true;
};
export interface ProfileReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProfileReview'];
        meta: {
            name: 'ProfileReview';
        };
    };
    findUnique<T extends ProfileReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ProfileReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProfileReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProfileReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProfileReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ProfileReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProfileReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProfileReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProfileReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ProfileReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProfileReviewCreateArgs>(args: Prisma.SelectSubset<T, ProfileReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProfileReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ProfileReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProfileReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProfileReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProfileReviewDeleteArgs>(args: Prisma.SelectSubset<T, ProfileReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProfileReviewUpdateArgs>(args: Prisma.SelectSubset<T, ProfileReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProfileReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProfileReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProfileReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ProfileReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProfileReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProfileReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProfileReviewUpsertArgs>(args: Prisma.SelectSubset<T, ProfileReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ProfileReviewClient<runtime.Types.Result.GetResult<Prisma.$ProfileReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProfileReviewCountArgs>(args?: Prisma.Subset<T, ProfileReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProfileReviewCountAggregateOutputType> : number>;
    aggregate<T extends ProfileReviewAggregateArgs>(args: Prisma.Subset<T, ProfileReviewAggregateArgs>): Prisma.PrismaPromise<GetProfileReviewAggregateType<T>>;
    groupBy<T extends ProfileReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProfileReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ProfileReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProfileReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProfileReviewFieldRefs;
}
export interface Prisma__ProfileReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    interaction<T extends Prisma.ConfirmedInteractionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConfirmedInteractionDefaultArgs<ExtArgs>>): Prisma.Prisma__ConfirmedInteractionClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    target<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    evidenceMedia<T extends Prisma.ProfileReview$evidenceMediaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfileReview$evidenceMediaArgs<ExtArgs>>): Prisma.Prisma__MediaAssetClient<runtime.Types.Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProfileReviewFieldRefs {
    readonly id: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly interactionId: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly authorId: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly targetId: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly evidenceMediaId: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly verdict: Prisma.FieldRef<"ProfileReview", 'ReviewVerdict'>;
    readonly moderationStatus: Prisma.FieldRef<"ProfileReview", 'ReviewModerationStatus'>;
    readonly moderationNote: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly moderatedAt: Prisma.FieldRef<"ProfileReview", 'DateTime'>;
    readonly body: Prisma.FieldRef<"ProfileReview", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProfileReview", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProfileReview", 'DateTime'>;
}
export type ProfileReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where: Prisma.ProfileReviewWhereUniqueInput;
};
export type ProfileReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where: Prisma.ProfileReviewWhereUniqueInput;
};
export type ProfileReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where?: Prisma.ProfileReviewWhereInput;
    orderBy?: Prisma.ProfileReviewOrderByWithRelationInput | Prisma.ProfileReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProfileReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProfileReviewScalarFieldEnum | Prisma.ProfileReviewScalarFieldEnum[];
};
export type ProfileReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where?: Prisma.ProfileReviewWhereInput;
    orderBy?: Prisma.ProfileReviewOrderByWithRelationInput | Prisma.ProfileReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProfileReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProfileReviewScalarFieldEnum | Prisma.ProfileReviewScalarFieldEnum[];
};
export type ProfileReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where?: Prisma.ProfileReviewWhereInput;
    orderBy?: Prisma.ProfileReviewOrderByWithRelationInput | Prisma.ProfileReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProfileReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProfileReviewScalarFieldEnum | Prisma.ProfileReviewScalarFieldEnum[];
};
export type ProfileReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProfileReviewCreateInput, Prisma.ProfileReviewUncheckedCreateInput>;
};
export type ProfileReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProfileReviewCreateManyInput | Prisma.ProfileReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProfileReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    data: Prisma.ProfileReviewCreateManyInput | Prisma.ProfileReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProfileReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProfileReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateInput, Prisma.ProfileReviewUncheckedUpdateInput>;
    where: Prisma.ProfileReviewWhereUniqueInput;
};
export type ProfileReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyInput>;
    where?: Prisma.ProfileReviewWhereInput;
    limit?: number;
};
export type ProfileReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProfileReviewUpdateManyMutationInput, Prisma.ProfileReviewUncheckedUpdateManyInput>;
    where?: Prisma.ProfileReviewWhereInput;
    limit?: number;
    include?: Prisma.ProfileReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProfileReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where: Prisma.ProfileReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProfileReviewCreateInput, Prisma.ProfileReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProfileReviewUpdateInput, Prisma.ProfileReviewUncheckedUpdateInput>;
};
export type ProfileReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
    where: Prisma.ProfileReviewWhereUniqueInput;
};
export type ProfileReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProfileReviewWhereInput;
    limit?: number;
};
export type ProfileReview$evidenceMediaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaAssetSelect<ExtArgs> | null;
    omit?: Prisma.MediaAssetOmit<ExtArgs> | null;
    include?: Prisma.MediaAssetInclude<ExtArgs> | null;
    where?: Prisma.MediaAssetWhereInput;
};
export type ProfileReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProfileReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProfileReviewOmit<ExtArgs> | null;
    include?: Prisma.ProfileReviewInclude<ExtArgs> | null;
};
export {};
