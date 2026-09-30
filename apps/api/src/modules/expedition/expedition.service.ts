import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  EXPEDITION_DEPTHS,
  EXPEDITION_ENERGY_REGEN_SECONDS,
  EXPEDITION_ITEM_SEEDS,
} from './expedition.constants.js';

type SeriesIssueRow = {
  issuedCount: number;
  maxSupply: number;
  inventoryDefinitionId: string;
};

type InventoryRow = {
  id: string;
  serialNumber: number | null;
  equipped: boolean;
  definitionId: string;
  name: string;
  rarity: string;
  type: string;
  previewKey: string | null;
  style: Record<string, unknown> | null;
};

@Injectable()
export class ExpeditionService {
  constructor(private readonly prisma: PrismaService) {}

  async getState(userId: string) {
    await this.ensureSeeded();
    const profile = await this.syncProfile(userId);
    await this.markReady(profile.id);

    const currentRun = await this.prisma.expeditionRun.findFirst({
      where: {
        profileId: profile.id,
        status: { in: ['ACTIVE', 'READY'] },
      },
      orderBy: { startedAt: 'desc' },
    });

    const inventory = await this.prisma.$queryRawUnsafe<InventoryRow[]>(
      `SELECT
         ui."id",
         ui."serialNumber",
         ui."equipped",
         d."id" AS "definitionId",
         d."name",
         d."rarity"::text AS "rarity",
         d."type"::text AS "type",
         d."previewKey",
         d."style"
       FROM "UserInventoryItem" ui
       JOIN "InventoryItemDefinition" d ON d."id" = ui."definitionId"
       WHERE ui."ownerId" = $1
         AND ui."deletedAt" IS NULL
         AND d."type"::text LIKE 'GAME_%'
       ORDER BY ui."equipped" DESC, ui."acquiredAt" DESC`,
      userId,
    );

    return {
      profile,
      currentRun,
      depths: EXPEDITION_DEPTHS,
      inventory,
      itemSeries: EXPEDITION_ITEM_SEEDS.map((item) => ({
        id: item.id,
        name: item.name,
        rarity: item.rarity,
        maxSupply: item.maxSupply,
        minimumDepth: item.minimumDepth,
      })),
    };
  }

  async start(userId: string, depthId: number) {
    await this.ensureSeeded();
    const profile = await this.syncProfile(userId);
    await this.markReady(profile.id);

    const existing = await this.prisma.expeditionRun.findFirst({
      where: {
        profileId: profile.id,
        status: { in: ['ACTIVE', 'READY'] },
      },
    });
    if (existing) {
      throw new BadRequestException('Сначала заберите результат текущей экспедиции');
    }

    const depth = EXPEDITION_DEPTHS.find((entry) => entry.id === depthId);
    if (!depth) throw new NotFoundException('Глубина не найдена');
    if (depth.id > profile.unlockedDepth) {
      throw new BadRequestException('Эта глубина ещё не открыта');
    }
    if (profile.energy < depth.energyCost) {
      throw new BadRequestException('Недостаточно энергии');
    }

    const lootSeriesKey = await this.pickSeries(depth.id);
    const resolvesAt = new Date(Date.now() + depth.durationSeconds * 1000);
    const rewardXp = depth.xp;
    const rewardMetal = this.roll(depth.metal);
    const rewardCloth = this.roll(depth.cloth);
    const rewardScrap = this.roll(depth.scrap);
    const rewardOldParts = this.roll(depth.oldParts);

    const [, run] = await this.prisma.$transaction([
      this.prisma.expeditionProfile.update({
        where: { id: profile.id },
        data: { energy: { decrement: depth.energyCost } },
      }),
      this.prisma.expeditionRun.create({
        data: {
          profileId: profile.id,
          locationKey: 'rust-outskirts',
          depth: depth.id,
          energyCost: depth.energyCost,
          resolvesAt,
          rewardXp,
          rewardMetal,
          rewardCloth,
          rewardScrap,
          rewardOldParts,
          lootSeriesKey,
        },
      }),
    ]);

    return { ok: true, run };
  }

  async claim(userId: string) {
    await this.ensureSeeded();
    const profile = await this.syncProfile(userId);
    await this.markReady(profile.id);

    const run = await this.prisma.expeditionRun.findFirst({
      where: { profileId: profile.id, status: 'READY' },
      orderBy: { startedAt: 'asc' },
    });
    if (!run) {
      throw new BadRequestException('Готовой экспедиции нет');
    }

    const issuedItem = await this.prisma.$transaction(async (tx) => {
      const freshRun = await tx.expeditionRun.findUnique({ where: { id: run.id } });
      if (!freshRun || freshRun.status !== 'READY') {
        throw new BadRequestException('Эта экспедиция уже получена');
      }

      let item: {
        id: string;
        serialNumber: number;
        definitionId: string;
      } | null = null;

      if (freshRun.lootSeriesKey) {
        const rows = await tx.$queryRawUnsafe<SeriesIssueRow[]>(
          `UPDATE "ExpeditionItemSeries"
             SET "issuedCount" = "issuedCount" + 1
           WHERE "id" = $1
             AND "issuedCount" < "maxSupply"
           RETURNING "issuedCount", "maxSupply", "inventoryDefinitionId"`,
          freshRun.lootSeriesKey,
        );
        const series = rows[0];

        if (series) {
          const itemId = randomUUID();
          await tx.userInventoryItem.create({
            data: {
              id: itemId,
              definitionId: series.inventoryDefinitionId,
              ownerId: userId,
              serialNumber: series.issuedCount,
              sourceKey: `expedition:${freshRun.id}:${freshRun.lootSeriesKey}`,
            },
          });
          await tx.inventoryTransaction.create({
            data: {
              id: randomUUID(),
              itemId,
              type: 'GRANT',
              fromUserId: null,
              toUserId: userId,
              metadata: {
                source: 'expedition',
                runId: freshRun.id,
                depth: freshRun.depth,
              },
            },
          });
          item = {
            id: itemId,
            serialNumber: series.issuedCount,
            definitionId: series.inventoryDefinitionId,
          };
        }
      }

      let nextLevel = profile.level;
      let nextXp = profile.xp + freshRun.rewardXp;
      while (nextXp >= 100) {
        nextXp -= 100;
        nextLevel += 1;
      }

      await tx.expeditionProfile.update({
        where: { id: profile.id },
        data: {
          level: nextLevel,
          xp: nextXp,
          unlockedDepth: Math.min(5, Math.max(profile.unlockedDepth, freshRun.depth + 1)),
          metal: { increment: freshRun.rewardMetal },
          cloth: { increment: freshRun.rewardCloth },
          scrap: { increment: freshRun.rewardScrap },
          oldParts: { increment: freshRun.rewardOldParts },
        },
      });

      await tx.expeditionRun.update({
        where: { id: freshRun.id },
        data: {
          status: 'CLAIMED',
          claimedAt: new Date(),
        },
      });

      return item;
    });

    const state = await this.getState(userId);
    return {
      ok: true,
      rewards: {
        xp: run.rewardXp,
        metal: run.rewardMetal,
        cloth: run.rewardCloth,
        scrap: run.rewardScrap,
        oldParts: run.rewardOldParts,
        item: issuedItem,
      },
      state,
    };
  }

  private async syncProfile(userId: string) {
    let profile = await this.prisma.expeditionProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await this.prisma.expeditionProfile.create({ data: { userId } });
    }

    const now = new Date();
    const intervalMs = EXPEDITION_ENERGY_REGEN_SECONDS * 1000;
    const elapsed = now.getTime() - profile.lastEnergySync.getTime();
    const ticks = Math.floor(elapsed / intervalMs);

    if (ticks > 0) {
      const energy = Math.min(profile.maxEnergy, profile.energy + ticks);
      profile = await this.prisma.expeditionProfile.update({
        where: { id: profile.id },
        data: {
          energy,
          lastEnergySync: new Date(profile.lastEnergySync.getTime() + ticks * intervalMs),
        },
      });
    }

    return profile;
  }

  private async markReady(profileId: string) {
    await this.prisma.expeditionRun.updateMany({
      where: {
        profileId,
        status: 'ACTIVE',
        resolvesAt: { lte: new Date() },
      },
      data: { status: 'READY' },
    });
  }

  private async ensureSeeded() {
    for (const item of EXPEDITION_ITEM_SEEDS) {
      await this.prisma.inventoryItemDefinition.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          description: item.description,
          type: item.type,
          rarity: item.rarity,
          previewKey: item.previewKey,
          style: { gamePower: item.power, visual: item.previewKey },
          transferable: true,
          deletable: true,
          equipable: true,
        },
        create: {
          id: item.id,
          slug: item.slug,
          name: item.name,
          description: item.description,
          type: item.type,
          rarity: item.rarity,
          previewKey: item.previewKey,
          style: { gamePower: item.power, visual: item.previewKey },
          transferable: true,
          deletable: true,
          equipable: true,
        },
      });

      await this.prisma.expeditionItemSeries.upsert({
        where: { id: item.id },
        update: {
          inventoryDefinitionId: item.id,
          maxSupply: item.maxSupply,
          minimumDepth: item.minimumDepth,
          weight: item.weight,
        },
        create: {
          id: item.id,
          inventoryDefinitionId: item.id,
          maxSupply: item.maxSupply,
          minimumDepth: item.minimumDepth,
          weight: item.weight,
        },
      });
    }
  }

  private async pickSeries(depth: number) {
    const candidates = EXPEDITION_ITEM_SEEDS.filter((item) => item.minimumDepth <= depth);
    const total = candidates.reduce((sum, item) => sum + item.weight, 0);
    let cursor = Math.random() * total;
    for (const item of candidates) {
      cursor -= item.weight;
      if (cursor <= 0) return item.id;
    }
    return candidates[0]?.id ?? null;
  }

  private roll(range: readonly [number, number]) {
    const [min, max] = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
