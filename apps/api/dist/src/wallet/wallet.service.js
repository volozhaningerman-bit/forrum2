var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PromotionOrderStatus, PromotionType, WalletTransactionType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isWithinPromotionRefundGrace, promotionQuoteBreakdown, PROMOTION_REFUND_GRACE_MINUTES } from './rules.js';
let WalletService = class WalletService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async pricing(client = this.prisma) {
        const setting = await client.platformSetting.findUnique({ where: { key: 'promotion.pricing' } });
        return (setting?.value ?? {
            pinLimit: 3, pinBasePricePerDay: 500, pinDemandPercentPerOccupied: 35,
            boostLimit: 8, boostBasePricePerDay: 150, boostDemandPercentPerOccupied: 12,
        });
    }
    parameters(type, pricing) {
        return type === PromotionType.PIN
            ? { limit: pricing.pinLimit, basePerDay: pricing.pinBasePricePerDay, demandPercent: pricing.pinDemandPercentPerOccupied }
            : { limit: pricing.boostLimit, basePerDay: pricing.boostBasePricePerDay, demandPercent: pricing.boostDemandPercentPerOccupied };
    }
    async expireOrders(client = this.prisma, now = new Date()) {
        const expiredPins = await client.promotionOrder.findMany({
            where: { status: PromotionOrderStatus.ACTIVE, type: PromotionType.PIN, endsAt: { lte: now } },
            select: { publicationId: true },
        });
        await client.promotionOrder.updateMany({
            where: { status: PromotionOrderStatus.ACTIVE, endsAt: { lte: now } },
            data: { status: PromotionOrderStatus.EXPIRED },
        });
        const expiredPublicationIds = new Set(expiredPins.map((item) => item.publicationId));
        for (const publicationId of expiredPublicationIds) {
            await this.refreshPinnedUntil(client, publicationId, now);
        }
    }
    async refreshPinnedUntil(client, publicationId, now = new Date()) {
        const remaining = await client.promotionOrder.findFirst({
            where: { publicationId, type: PromotionType.PIN, status: PromotionOrderStatus.ACTIVE, endsAt: { gt: now } },
            orderBy: { endsAt: 'desc' },
            select: { endsAt: true },
        });
        await client.publication.update({ where: { id: publicationId }, data: { pinnedUntil: remaining?.endsAt ?? null } });
    }
    async terms() {
        const pricing = await this.pricing();
        return { ...pricing, durations: [1, 3, 7, 30], refundGraceMinutes: PROMOTION_REFUND_GRACE_MINUTES };
    }
    async get(userId) {
        await this.expireOrders();
        const [wallet, promotions] = await Promise.all([
            this.prisma.wallet.upsert({
                where: { userId }, update: {}, create: { userId },
                include: { transactions: { orderBy: { createdAt: 'desc' }, take: 80 } },
            }),
            this.prisma.promotionOrder.findMany({
                where: { userId }, orderBy: { createdAt: 'desc' }, take: 80,
                include: {
                    publication: { select: { slug: true, title: true } },
                    community: { select: { slug: true, name: true } },
                },
            }),
        ]);
        return { balance: wallet.balance, transactions: wallet.transactions, promotions, refundGraceMinutes: PROMOTION_REFUND_GRACE_MINUTES };
    }
    async quote(communitySlug, type, durationDays) {
        if (![1, 3, 7, 30].includes(durationDays))
            throw new BadRequestException('Доступные сроки: 1, 3, 7 или 30 дней');
        const community = await this.prisma.community.findUnique({ where: { slug: communitySlug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        const now = new Date();
        await this.expireOrders(this.prisma, now);
        const active = await this.prisma.promotionOrder.count({
            where: { communityId: community.id, type, status: PromotionOrderStatus.ACTIVE, startsAt: { lte: now }, endsAt: { gt: now } },
        });
        const pricing = await this.pricing();
        const { limit, basePerDay, demandPercent } = this.parameters(type, pricing);
        const breakdown = promotionQuoteBreakdown(basePerDay, durationDays, active, demandPercent);
        const available = active < limit;
        return {
            type, durationDays, active, occupied: active, limit, remaining: Math.max(0, limit - active), available,
            price: breakdown.price, currency: 'баллы', basePerDay, demandPercentPerOccupied: demandPercent,
            multiplier: breakdown.multiplier, baseDurationPrice: basePerDay * durationDays,
            demandSurcharge: breakdown.price - basePerDay * durationDays,
        };
    }
    async purchase(userId, communitySlug, publicationSlug, type, durationDays) {
        const publication = await this.prisma.publication.findUnique({ where: { slug: publicationSlug }, include: { community: true } });
        if (!publication)
            throw new NotFoundException('Публикация не найдена');
        if (publication.authorId !== userId)
            throw new ForbiddenException('Продвигать можно только свою публикацию');
        if (publication.community.slug !== communitySlug)
            throw new BadRequestException('Публикация находится в другом сообществе');
        const initialQuote = await this.quote(communitySlug, type, durationDays);
        if (!initialQuote.available)
            throw new BadRequestException('Лимит мест исчерпан');
        return this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(hashtext(${`${publication.communityId}:${type}`}))`;
            const now = new Date();
            await this.expireOrders(tx, now);
            const duplicate = await tx.promotionOrder.findFirst({
                where: { publicationId: publication.id, type, status: PromotionOrderStatus.ACTIVE, endsAt: { gt: now } },
                select: { id: true },
            });
            if (duplicate)
                throw new BadRequestException('Для этой публикации уже действует выбранный формат продвижения');
            const active = await tx.promotionOrder.count({
                where: { communityId: publication.communityId, type, status: PromotionOrderStatus.ACTIVE, startsAt: { lte: now }, endsAt: { gt: now } },
            });
            const pricing = await this.pricing(tx);
            const { limit, basePerDay, demandPercent } = this.parameters(type, pricing);
            if (active >= limit)
                throw new BadRequestException('Последнее место уже занято');
            const price = promotionQuoteBreakdown(basePerDay, durationDays, active, demandPercent).price;
            const wallet = await tx.wallet.upsert({ where: { userId }, update: {}, create: { userId } });
            if (wallet.balance < price)
                throw new BadRequestException('Недостаточно баллов');
            const endsAt = new Date(now.getTime() + durationDays * 86400000);
            await tx.wallet.update({ where: { id: wallet.id }, data: { balance: { decrement: price } } });
            const order = await tx.promotionOrder.create({
                data: { userId, publicationId: publication.id, communityId: publication.communityId, type, status: PromotionOrderStatus.ACTIVE, price, startsAt: now, endsAt },
            });
            await tx.walletTransaction.create({
                data: { walletId: wallet.id, type: WalletTransactionType.SPEND, amount: -price, description: `${type === PromotionType.PIN ? 'Закрепление' : 'Boost'} публикации`, externalRef: order.id },
            });
            await tx.publication.update({
                where: { id: publication.id },
                data: type === PromotionType.PIN ? { pinnedUntil: endsAt, lastActivityAt: now } : { lastActivityAt: now },
            });
            await tx.auditLog.create({ data: { actorId: userId, action: 'promotion.purchase', entityType: 'PromotionOrder', entityId: order.id, metadata: { type, durationDays, price } } });
            return { id: order.id, price, endsAt, refundGraceMinutes: PROMOTION_REFUND_GRACE_MINUTES };
        });
    }
    async cancel(userId, orderId, reason) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(hashtext(${`promotion:${orderId}`}))`;
            const now = new Date();
            const order = await tx.promotionOrder.findUnique({ where: { id: orderId } });
            if (!order)
                throw new NotFoundException('Продвижение не найдено');
            if (order.userId !== userId)
                throw new ForbiddenException('Нельзя управлять чужим продвижением');
            if (order.status !== PromotionOrderStatus.ACTIVE)
                throw new BadRequestException('Это продвижение уже завершено');
            if (order.endsAt <= now) {
                await tx.promotionOrder.update({ where: { id: order.id }, data: { status: PromotionOrderStatus.EXPIRED } });
                if (order.type === PromotionType.PIN)
                    await this.refreshPinnedUntil(tx, order.publicationId, now);
                return { status: PromotionOrderStatus.EXPIRED, refunded: 0 };
            }
            const refund = isWithinPromotionRefundGrace(order.startsAt, now) ? order.price : 0;
            const status = refund ? PromotionOrderStatus.REFUNDED : PromotionOrderStatus.CANCELLED;
            await tx.promotionOrder.update({ where: { id: order.id }, data: { status, cancelledAt: now, cancellationReason: reason.trim() } });
            if (refund) {
                const wallet = await tx.wallet.upsert({ where: { userId }, update: {}, create: { userId } });
                await tx.wallet.update({ where: { id: wallet.id }, data: { balance: { increment: refund } } });
                await tx.walletTransaction.create({ data: { walletId: wallet.id, type: WalletTransactionType.REFUND, amount: refund, description: 'Возврат за отменённое продвижение', externalRef: order.id } });
            }
            if (order.type === PromotionType.PIN)
                await this.refreshPinnedUntil(tx, order.publicationId, now);
            await tx.auditLog.create({ data: { actorId: userId, action: 'promotion.cancel', entityType: 'PromotionOrder', entityId: order.id, metadata: { reason: reason.trim(), refund } } });
            return { status, refunded: refund };
        });
    }
    async adminList() {
        await this.expireOrders();
        return this.prisma.promotionOrder.findMany({
            orderBy: { createdAt: 'desc' }, take: 200,
            include: {
                user: { select: { username: true, displayName: true } },
                publication: { select: { slug: true, title: true } },
                community: { select: { slug: true, name: true } },
            },
        });
    }
    async adminRefund(actorId, orderId, reason) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(hashtext(${`promotion:${orderId}`}))`;
            const order = await tx.promotionOrder.findUnique({ where: { id: orderId } });
            if (!order)
                throw new NotFoundException('Продвижение не найдено');
            if (order.status === PromotionOrderStatus.REFUNDED)
                throw new BadRequestException('Возврат уже выполнен');
            const wallet = await tx.wallet.upsert({ where: { userId: order.userId }, update: {}, create: { userId: order.userId } });
            await tx.wallet.update({ where: { id: wallet.id }, data: { balance: { increment: order.price } } });
            await tx.walletTransaction.create({ data: { walletId: wallet.id, type: WalletTransactionType.REFUND, amount: order.price, description: 'Административный возврат за продвижение', externalRef: order.id } });
            await tx.promotionOrder.update({ where: { id: order.id }, data: { status: PromotionOrderStatus.REFUNDED, cancelledAt: new Date(), cancellationReason: reason.trim() } });
            if (order.type === PromotionType.PIN)
                await this.refreshPinnedUntil(tx, order.publicationId);
            await tx.auditLog.create({ data: { actorId, action: 'promotion.refund', entityType: 'PromotionOrder', entityId: order.id, metadata: { reason: reason.trim(), amount: order.price } } });
            return { refunded: order.price };
        });
    }
    async grant(actorId, usernameInput, amount, description) {
        const user = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() } });
        if (!user)
            throw new NotFoundException('Пользователь не найден');
        const result = await this.prisma.$transaction(async (tx) => {
            const wallet = await tx.wallet.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
            await tx.wallet.update({ where: { id: wallet.id }, data: { balance: { increment: amount } } });
            const transaction = await tx.walletTransaction.create({
                data: { walletId: wallet.id, type: WalletTransactionType.MANUAL_GRANT, amount, description },
            });
            await tx.auditLog.create({
                data: { actorId, action: 'wallet.grant', entityType: 'User', entityId: user.id, metadata: { amount, description } },
            });
            return transaction;
        });
        return { id: result.id };
    }
};
WalletService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], WalletService);
export { WalletService };
//# sourceMappingURL=wallet.service.js.map