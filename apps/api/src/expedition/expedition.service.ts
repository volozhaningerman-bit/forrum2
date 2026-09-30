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
  { id: 'exp_head_watch', slug: 'watcher-helm', name: 'Шлем Дозорного', slot: 'HEAD', rarity: 'UNCOMMON', circulationCap: 2400, power: 4, visualKey: 'helm', minDepth: 2 },
  { id: 'exp_head_consul', slug: 'rust-consul-mask', name: 'Маска Ржавого Консула', slot: 'HEAD', rarity: 'EPIC', circulationCap: 80, power: 13, visualKey: 'consul-mask', minDepth: 5 },

  { id: 'exp_neck_traveler', slug: 'traveler-seal', name: 'Печать Путника', slot: 'NECK', rarity: 'COMMON', circulationCap: 8000, power: 2, visualKey: 'neck', minDepth: 1 },
  { id: 'exp_neck_archivist', slug: 'archivist-eye', name: 'Око Архивариуса', slot: 'NECK', rarity: 'RARE', circulationCap: 500, power: 7, visualKey: 'neck', minDepth: 3 },

  { id: 'exp_shoulders_border', slug: 'border-shoulders', name: 'Наплечники Рубежа', slot: 'SHOULDERS', rarity: 'RARE', circulationCap: 650, power: 7, visualKey: 'shoulders', minDepth: 2 },
  { id: 'exp_cloak_ash', slug: 'ash-road-cloak', name: 'Плащ Пепельной Дороги', slot: 'CLOAK', rarity: 'COMMON', circulationCap: 7000, power: 3, visualKey: 'cloak', minDepth: 1 },
  { id: 'exp_cloak_blue', slug: 'blue-banner-cloak', name: 'Плащ Синего Знамени', slot: 'CLOAK', rarity: 'RARE', circulationCap: 500, power: 8, visualKey: 'cloak-blue', minDepth: 2 },

  { id: 'exp_chest_border', slug: 'border-jacket', name: 'Куртка Пограничника', slot: 'CHEST', rarity: 'COMMON', circulationCap: 10000, power: 3, visualKey: 'chest', minDepth: 1 },
  { id: 'exp_chest_guard', slug: 'old-guard-shell', name: 'Панцирь Старой Стражи', slot: 'CHEST', rarity: 'UNCOMMON', circulationCap: 2500, power: 5, visualKey: 'chest-guard', minDepth: 1 },
  { id: 'exp_chest_consul', slug: 'rust-consul-cuirass', name: 'Кираса Ржавого Консула', slot: 'CHEST', rarity: 'EPIC', circulationCap: 80, power: 14, visualKey: 'chest-epic', minDepth: 5 },

  { id: 'exp_wrists_seeker', slug: 'seeker-wrists', name: 'Наручи Искателя', slot: 'WRISTS', rarity: 'COMMON', circulationCap: 6000, power: 2, visualKey: 'wrists', minDepth: 1 },
  { id: 'exp_gloves_servo', slug: 'servo-master-gloves', name: 'Перчатки Сервомастера', slot: 'GLOVES', rarity: 'UNCOMMON', circulationCap: 4000, power: 4, visualKey: 'gloves', minDepth: 1 },
  { id: 'exp_belt_mechanic', slug: 'mechanic-belt', name: 'Пояс Механика', slot: 'BELT', rarity: 'UNCOMMON', circulationCap: 3500, power: 4, visualKey: 'belt', minDepth: 1 },
  { id: 'exp_legs_dust', slug: 'dust-road-legs', name: 'Штаны Пыльной Тропы', slot: 'LEGS', rarity: 'COMMON', circulationCap: 9000, power: 2, visualKey: 'legs', minDepth: 1 },
  { id: 'exp_boots_iron', slug: 'iron-step-boots', name: 'Сапоги Железного Шага', slot: 'FEET', rarity: 'UNCOMMON', circulationCap: 3000, power: 4, visualKey: 'boots', minDepth: 1 },

  { id: 'exp_ring_alloy', slug: 'old-alloy-ring', name: 'Кольцо Старого Сплава', slot: 'RING_1', rarity: 'COMMON', circulationCap: 12000, power: 2, visualKey: 'ring', minDepth: 1 },
  { id: 'exp_ring_reactor', slug: 'reactor-worker-ring', name: 'Перстень Реакторщика', slot: 'RING_2', rarity: 'RARE', circulationCap: 800, power: 6, visualKey: 'ring-blue', minDepth: 3 },
  { id: 'exp_relic_shard', slug: 'reactor-shard', name: 'Осколок Реактора', slot: 'RELIC_1', rarity: 'UNCOMMON', circulationCap: 3000, power: 5, visualKey: 'relic', minDepth: 2 },
  { id: 'exp_relic_beacon', slug: 'beacon-heart', name: 'Сердце Маяка', slot: 'RELIC_2', rarity: 'EPIC', circulationCap: 60, power: 14, visualKey: 'relic-epic', minDepth: 4 },

  { id: 'exp_sword_dust', slug: 'dust-guard-sword', name: 'Меч Пыльной Стражи', slot: 'MAIN_HAND', rarity: 'COMMON', circulationCap: 10000, power: 5, visualKey: 'sword', minDepth: 1 },
  { id: 'exp_spear_ruins', slug: 'ruin-hunter-spear', name: 'Копьё Руинного Охотника', slot: 'MAIN_HAND', rarity: 'UNCOMMON', circulationCap: 3000, power: 7, visualKey: 'spear', minDepth: 2 },
  { id: 'exp_sword_contour', slug: 'last-contour-blade', name: 'Клинок Последнего Контура', slot: 'MAIN_HAND', rarity: 'RARE', circulationCap: 400, power: 11, visualKey: 'sword-blue', minDepth: 3 },
  { id: 'exp_hammer_prior', slug: 'steel-prior-hammer', name: 'Молот Стального Приора', slot: 'MAIN_HAND', rarity: 'EPIC', circulationCap: 45, power: 16, visualKey: 'hammer', minDepth: 5 },

  { id: 'exp_shield_barrier', slug: 'barrier-shield', name: 'Щит Заслона', slot: 'OFF_HAND', rarity: 'RARE', circulationCap: 300, power: 9, visualKey: 'shield', minDepth: 3 },
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

    const raid = await this.raidState(actorId);
    return {
      ...this.serializeState(freshProfile, run, items),
      raid,
    };
  }

  async raidState(actorId: string) {
    const raid = await this.ensureRaid();
    const participants = await this.prisma.expeditionRaidParticipant.findMany({
      where: { raidId: raid.id },
      select: { userId: true },
      orderBy: { joinedAt: 'asc' },
    });

    return {
      id: raid.id,
      bossKey: raid.bossKey,
      startsAt: raid.startsAt,
      minParticipants: raid.minParticipants,
      maxParticipants: raid.maxParticipants,
      participantCount: participants.length,
      joined: participants.some((entry) => entry.userId === actorId),
    };
  }

  async joinRaid(actorId: string) {
    const raid = await this.ensureRaid();
    if (raid.startsAt.getTime() <= Date.now()) {
      throw new ConflictException('Сбор на этого босса уже закрыт');
    }

    await this.prisma.$transaction(async (tx) => {
      const existing = await tx.expeditionRaidParticipant.findUnique({
        where: { raidId_userId: { raidId: raid.id, userId: actorId } },
        select: { raidId: true },
      });
      if (existing) return;

      const count = await tx.expeditionRaidParticipant.count({
        where: { raidId: raid.id },
      });
      if (count >= raid.maxParticipants) {
        throw new ConflictException('В этом рейде больше нет свободных мест');
      }

      await tx.expeditionRaidParticipant.create({
        data: { raidId: raid.id, userId: actorId },
      });
    }, { isolationLevel: 'Serializable' });

    return this.raidState(actorId);
  }

  async leaveRaid(actorId: string) {
    const raid = await this.ensureRaid();
    if (raid.startsAt.getTime() <= Date.now()) {
      throw new ConflictException('Сбор на этого босса уже закрыт');
    }

    await this.prisma.expeditionRaidParticipant.deleteMany({
      where: { raidId: raid.id, userId: actorId },
    });

    return this.raidState(actorId);
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
      const pendingInside = await tx.expeditionRun.findFirst({
        where: { profileId: synced.id, status: { in: ['ACTIVE', 'READY'] } },
        select: { id: true },
      });
      if (pendingInside) {
        throw new ConflictException('Сначала завершите текущую экспедицию');
      }

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
    }, { isolationLevel: 'Serializable' });

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

    const startIndex = Math.abs(run.rewardSeed) % candidates.length;
    const orderedCandidates = [
      ...candidates.slice(startIndex),
      ...candidates.slice(0, startIndex),
    ];
    const xpGain = 30 + run.depth * 10;
    const resources = {
      scrap: 8 + run.depth * 5,
      cloth: 3 + run.depth * 2,
      oldParts: Math.max(0, run.depth - 1) * 2,
    };

    const result = await this.prisma.$transaction(async (tx) => {
      let reserved: { templateId: string; serialNumber: number } | null = null;
      for (const candidate of orderedCandidates) {
        const serialRows = await tx.$queryRawUnsafe<Array<{ issuedCount: number }>>(
          `UPDATE "ExpeditionItemTemplate"
           SET "issuedCount" = "issuedCount" + 1, "updatedAt" = NOW()
           WHERE "id" = $1
             AND "issuedCount" < "circulationCap"
           RETURNING "issuedCount"`,
          candidate.id,
        );
        const serialNumber = serialRows[0]?.issuedCount;
        if (serialNumber) {
          reserved = { templateId: candidate.id, serialNumber };
          break;
        }
      }
      if (!reserved) {
        throw new ConflictException('Тираж доступной добычи для этой глубины исчерпан');
      }

      const item = await tx.expeditionItemInstance.create({
        data: {
          templateId: reserved.templateId,
          ownerId: actorId,
          serialNumber: reserved.serialNumber,
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
          scrap: { increment: resources.scrap },
          cloth: { increment: resources.cloth },
          oldParts: { increment: resources.oldParts },
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

  async unequip(actorId: string, itemId: string) {
    const item = await this.prisma.expeditionItemInstance.findFirst({
      where: { id: itemId, ownerId: actorId },
      select: { id: true, equipped: true },
    });
    if (!item) throw new NotFoundException('Предмет не найден');
    if (!item.equipped) return this.state(actorId);

    await this.prisma.expeditionItemInstance.update({
      where: { id: item.id },
      data: { equipped: false, equippedAt: null },
    });

    return this.state(actorId);
  }

  private async ensureRaid() {
    const slotMs = 2 * 60 * 60 * 1000;
    const startsAt = new Date((Math.floor(Date.now() / slotMs) + 1) * slotMs);
    return this.prisma.expeditionRaid.upsert({
      where: {
        bossKey_startsAt: {
          bossKey: 'iron-shepherd',
          startsAt,
        },
      },
      create: {
        bossKey: 'iron-shepherd',
        startsAt,
        minParticipants: 5,
        maxParticipants: 10,
        status: 'OPEN',
      },
      update: {},
    });
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
      scrap: number;
      cloth: number;
      oldParts: number;
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
        resources: {
          scrap: profile.scrap,
          cloth: profile.cloth,
          oldParts: profile.oldParts,
        },
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
