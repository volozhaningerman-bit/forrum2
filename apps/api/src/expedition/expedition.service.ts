import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';

const DEPTH_COST = [0, 1, 2, 2, 3, 4] as const;
const DEPTH_SECONDS = [0, 5, 15, 30, 60, 90] as const;
const ENERGY_REGEN_MINUTES = 10;

const itemTemplates = [
  { id: 'exp_head_hood', slug: 'collector-hood', name: 'Капюшон Собирателя', slot: 'HEAD', rarity: 'COMMON', circulationCap: 5000, power: 2, visualKey: 'hood', minDepth: 1 },
  { id: 'exp_chest_guard', slug: 'old-guard-shell', name: 'Панцирь Старой Стражи', slot: 'CHEST', rarity: 'UNCOMMON', circulationCap: 2500, power: 5, visualKey: 'chest', minDepth: 1 },
  { id: 'exp_gloves_servo', slug: 'servo-master-gloves', name: 'Перчатки Сервомастера', slot: 'GLOVES', rarity: 'UNCOMMON', circulationCap: 4000, power: 4, visualKey: 'gloves', minDepth: 1 },
  { id: 'exp_boots_iron', slug: 'iron-step-boots', name: 'Сапоги Железного Шага', slot: 'FEET', rarity: 'UNCOMMON', circulationCap: 3000, power: 4, visualKey: 'boots', minDepth: 1 },
  { id: 'exp_shoulders_border', slug: 'border-shoulders', name: 'Наплечники Рубежа', slot: 'SHOULDERS', rarity: 'RARE', circulationCap: 650, power: 7, visualKey: 'shoulders', minDepth: 2 },
  { id: 'exp_cloak_blue', slug: 'blue-banner-cloak', name: 'Плащ Синего Знамени', slot: 'CLOAK', rarity: 'RARE', circulationCap: 500, power: 8, visualKey: 'cloak', minDepth: 2 },
  { id: 'exp_sword_contour', slug: 'last-contour-blade', name: 'Клинок Последнего Контура', slot: 'MAIN_HAND', rarity: 'RARE', circulationCap: 400, power: 11, visualKey: 'sword', minDepth: 3 },
  { id: 'exp_shield_barrier', slug: 'barrier-shield', name: 'Щит Заслона', slot: 'OFF_HAND', rarity: 'RARE', circulationCap: 300, power: 9, visualKey: 'shield', minDepth: 3 },
  { id: 'exp_relic_beacon', slug: 'beacon-heart', name: 'Сердце Маяка', slot: 'RELIC_1', rarity: 'EPIC', circulationCap: 60, power: 14, visualKey: 'relic', minDepth: 4 },
  { id: 'exp_head_consul', slug: 'rust-consul-mask', name: 'Маска Ржавого Консула', slot: 'HEAD', rarity: 'EPIC', circulationCap: 80, power: 13, visualKey: 'consul-mask', minDepth: 5 },
] as const;

@Injectable()
export class ExpeditionService {
  constructor(private readonly prisma: PrismaService) {}

  async state(actorId: string) {
    await this.ensureTemplates();
    const profile = await this.ensureProfile(actorId);
    const synced = await this.syncEnergy(profile.id);
    await this.prisma.expeditionRun.updateMany({
      where: {
        profileId: synced.id,
        status: 'ACTIVE',
        readyAt: { lte: new Date() },
      },
      data: { status: 'READY' },
    });

    const [freshProfile, run, items] = await Promise.all([
      this.prisma.expeditionProfile.findUniqueOrThrow({ where: { id: synced.id } }),
      this.prisma.expeditionRun.findFirst({
        where: { profileId: synced.id, status: { in: ['ACTIVE', 'READY'] } },
        orderBy: { startedAt: 'desc' },
      }),
      this.prisma.expeditionItemInstance.findMany({
        where: { ownerId: actorId },
        include: { template: true },
        orderBy: [{ equipped: 'desc' }, { acquiredAt: 'desc' }],
      }),
    ]);

    return this.serializeState(freshProfile, run, items);
  }

  async startRun(actorId: string, depth: number) {
    await this.ensureTemplates();
    const profile = await this.ensureProfile(actorId);
    const synced = await this.syncEnergy(profile.id);

    if (depth < 1 || depth > 5) {
      throw new BadRequestException('Неизвестная глубина экспедиции');
    }
    if (depth > synced.unlockedDepth) {
      throw new BadRequestException('Эта глубина пока не открыта');
    }

    const pending = await this.prisma.expeditionRun.findFirst({
      where: { profileId: synced.id, status: { in: ['ACTIVE', 'READY'] } },
      select: { id: true },
    });
    if (pending) {
      throw new ConflictException('Сначала завершите текущую экспедицию');
    }

    const cost = DEPTH_COST[depth] ?? 1;
    if (synced.energy < cost) {
      throw new BadRequestException('Недостаточно энергии');
    }

    const startedAt = new Date();
    const readyAt = new Date(startedAt.getTime() + (DEPTH_SECONDS[depth] ?? 30) * 1000);
    const rewardSeed = randomInt(1, 2_000_000_000);

    const run = await this.prisma.$transaction(async (tx) => {
      const changed = await tx.expeditionProfile.updateMany({
        where: { id: synced.id, energy: { gte: cost } },
        data: { energy: { decrement: cost } },
      });
      if (changed.count !== 1) {
        throw new BadRequestException('Недостаточно энергии');
      }

      return tx.expeditionRun.create({
        data: {
          profileId: synced.id,
          depth,
          energyCost: cost,
          rewardSeed,
          startedAt,
          readyAt,
          status: 'ACTIVE',
        },
      });
    });

    return { ok: true, run };
  }

  async claimRun(actorId: string, runId: string) {
    await this.ensureTemplates();
    const profile = await this.ensureProfile(actorId);
    const run = await this.prisma.expeditionRun.findFirst({
      where: { id: runId, profileId: profile.id },
    });

    if (!run) throw new NotFoundException('Экспедиция не найдена');
    if (run.status === 'CLAIMED') throw new ConflictException('Награда уже получена');
    if (run.readyAt.getTime() > Date.now()) {
      throw new BadRequestException('Экспедиция ещё не завершена');
    }

    const candidates = await this.prisma.expeditionItemTemplate.findMany({
      where: { active: true, minDepth: { lte: run.depth } },
      orderBy: [{ minDepth: 'desc' }, { power: 'asc' }],
    });
    if (!candidates.length) throw new NotFoundException('Для глубины не настроена добыча');

    const picked = candidates[Math.abs(run.rewardSeed) % candidates.length];
    const xpGain = 30 + run.depth * 10;
    const resources = {
      scrap: 8 + run.depth * 5,
      cloth: 3 + run.depth * 2,
      oldParts: Math.max(0, run.depth - 1) * 2,
    };

    const result = await this.prisma.$transaction(async (tx) => {
      const serialRows = await tx.$queryRawUnsafe<Array<{ issuedCount: number }>>(
        `UPDATE "ExpeditionItemTemplate"
         SET "issuedCount" = "issuedCount" + 1, "updatedAt" = NOW()
         WHERE "id" = $1
           AND "issuedCount" < "circulationCap"
         RETURNING "issuedCount"`,
        picked.id,
      );
      const serial = serialRows[0]?.issuedCount;
      if (!serial) {
        throw new ConflictException('Тираж этого предмета уже исчерпан');
      }

      const item = await tx.expeditionItemInstance.create({
        data: {
          templateId: picked.id,
          ownerId: actorId,
          serialNumber: serial,
          sourceKey: `expedition:${run.id}:primary`,
        },
        include: { template: true },
      });

      const current = await tx.expeditionProfile.findUniqueOrThrow({ where: { id: profile.id } });
      let nextLevel = current.level;
      let nextXp = current.xp + xpGain;
      while (nextXp >= 100) {
        nextXp -= 100;
        nextLevel += 1;
      }

      const updatedProfile = await tx.expeditionProfile.update({
        where: { id: current.id },
        data: {
          level: nextLevel,
          xp: nextXp,
          unlockedDepth: Math.min(5, Math.max(current.unlockedDepth, run.depth + 1)),
        },
      });

      const rewardJson = {
        xp: xpGain,
        resources,
        itemId: item.id,
        templateId: item.templateId,
        serialNumber: item.serialNumber,
      };

      await tx.expeditionRun.update({
        where: { id: run.id },
        data: {
          status: 'CLAIMED',
          claimedAt: new Date(),
          rewardJson,
        },
      });

      return { item, profile: updatedProfile, reward: rewardJson };
    });

    return {
      ok: true,
      reward: {
        ...result.reward,
        item: this.serializeItem(result.item),
      },
      profile: {
        level: result.profile.level,
        xp: result.profile.xp,
        unlockedDepth: result.profile.unlockedDepth,
      },
    };
  }

  async equip(actorId: string, itemId: string) {
    const item = await this.prisma.expeditionItemInstance.findFirst({
      where: { id: itemId, ownerId: actorId },
      include: { template: true },
    });
    if (!item) throw new NotFoundException('Предмет не найден');

    await this.prisma.$transaction(async (tx) => {
      const sameSlot = await tx.expeditionItemInstance.findMany({
        where: { ownerId: actorId, equipped: true, template: { slot: item.template.slot } },
        select: { id: true },
      });
      if (sameSlot.length) {
        await tx.expeditionItemInstance.updateMany({
          where: { id: { in: sameSlot.map((entry) => entry.id) } },
          data: { equipped: false, equippedAt: null },
        });
      }
      await tx.expeditionItemInstance.update({
        where: { id: item.id },
        data: { equipped: true, equippedAt: new Date() },
      });
    });

    return this.state(actorId);
  }

  private async ensureProfile(actorId: string) {
    return this.prisma.expeditionProfile.upsert({
      where: { userId: actorId },
      create: { userId: actorId },
      update: {},
    });
  }

  private async syncEnergy(profileId: string) {
    const profile = await this.prisma.expeditionProfile.findUniqueOrThrow({ where: { id: profileId } });
    if (profile.energy >= profile.maxEnergy) return profile;

    const intervalMs = ENERGY_REGEN_MINUTES * 60 * 1000;
    const elapsed = Date.now() - profile.lastEnergySync.getTime();
    const gained = Math.floor(elapsed / intervalMs);
    if (gained <= 0) return profile;

    const energy = Math.min(profile.maxEnergy, profile.energy + gained);
    const consumedIntervals = energy === profile.maxEnergy
      ? gained
      : Math.max(1, energy - profile.energy);
    const lastEnergySync = new Date(profile.lastEnergySync.getTime() + consumedIntervals * intervalMs);

    return this.prisma.expeditionProfile.update({
      where: { id: profile.id },
      data: { energy, lastEnergySync },
    });
  }

  private async ensureTemplates() {
    await Promise.all(itemTemplates.map((template) =>
      this.prisma.expeditionItemTemplate.upsert({
        where: { id: template.id },
        create: template,
        update: {
          name: template.name,
          slot: template.slot,
          rarity: template.rarity,
          circulationCap: template.circulationCap,
          power: template.power,
          visualKey: template.visualKey,
          minDepth: template.minDepth,
          active: true,
        },
      }),
    ));
  }

  private serializeState(
    profile: {
      level: number;
      xp: number;
      energy: number;
      maxEnergy: number;
      unlockedDepth: number;
      basePower: number;
    },
    run: {
      id: string;
      depth: number;
      energyCost: number;
      status: string;
      startedAt: Date;
      readyAt: Date;
    } | null,
    items: Array<{
      id: string;
      serialNumber: number;
      equipped: boolean;
      acquiredAt: Date;
      template: {
        id: string;
        name: string;
        slot: string;
        rarity: string;
        circulationCap: number;
        power: number;
        visualKey: string;
      };
    }>,
  ) {
    const serializedItems = items.map((item) => this.serializeItem(item));
    const equippedPower = serializedItems
      .filter((item) => item.equipped)
      .reduce((sum, item) => sum + item.power, 0);

    return {
      profile: {
        level: profile.level,
        xp: profile.xp,
        energy: profile.energy,
        maxEnergy: profile.maxEnergy,
        unlockedDepth: profile.unlockedDepth,
        power: profile.basePower + profile.level * 3 + equippedPower,
      },
      run: run ? {
        ...run,
        secondsLeft: Math.max(0, Math.ceil((run.readyAt.getTime() - Date.now()) / 1000)),
      } : null,
      inventory: serializedItems,
    };
  }

  private serializeItem(item: {
    id: string;
    serialNumber: number;
    equipped: boolean;
    acquiredAt: Date;
    template: {
      id: string;
      name: string;
      slot: string;
      rarity: string;
      circulationCap: number;
      power: number;
      visualKey: string;
    };
  }) {
    return {
      id: item.id,
      templateId: item.template.id,
      name: item.template.name,
      slot: item.template.slot,
      rarity: item.template.rarity,
      serialNumber: item.serialNumber,
      circulation: item.template.circulationCap,
      power: item.template.power,
      visualKey: item.template.visualKey,
      equipped: item.equipped,
      acquiredAt: item.acquiredAt,
    };
  }
}
