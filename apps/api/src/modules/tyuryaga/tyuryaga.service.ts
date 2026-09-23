import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  BOSSES,
  ENERGY_REGEN_INTERVAL_SECONDS,
  getXpForNextLevel,
  QUESTS,
  TATTOOS,
  WEAPONS,
} from './tyuryaga.constants.js';

@Injectable()
export class TyuryagaService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    let profile = await this.prisma.tyuryagaProfile.findUnique({
      where: { userId },
      include: {
        tattoos: true,
        activeBoss: true,
      },
    });

    if (!profile) {
      profile = await this.prisma.tyuryagaProfile.create({
        data: {
          userId,
        },
        include: {
          tattoos: true,
          activeBoss: true,
        },
      });
    }

    const now = new Date();
    const diffMs = now.getTime() - profile.lastEnergySync.getTime();
    const regenIntervalMs = ENERGY_REGEN_INTERVAL_SECONDS * 1000;
    const gainedTicks = Math.floor(diffMs / regenIntervalMs);

    if (gainedTicks > 0) {
      if (profile.energy < profile.maxEnergy) {
        const newEnergy = Math.min(profile.maxEnergy, profile.energy + gainedTicks);
        const newSyncTime = new Date(profile.lastEnergySync.getTime() + gainedTicks * regenIntervalMs);

        profile = await this.prisma.tyuryagaProfile.update({
          where: { id: profile.id },
          data: {
            energy: newEnergy,
            lastEnergySync: newSyncTime,
          },
          include: {
            tattoos: true,
            activeBoss: true,
          },
        });
      } else {
        profile = await this.prisma.tyuryagaProfile.update({
          where: { id: profile.id },
          data: {
            lastEnergySync: now,
          },
          include: {
            tattoos: true,
            activeBoss: true,
          },
        });
      }
    }

    if (profile.activeBoss && !profile.activeBoss.isDefeated) {
      if (new Date(profile.activeBoss.expiresAt) < now) {
        await this.prisma.tyuryagaBossBattle.delete({
          where: { id: profile.activeBoss.id },
        });
        profile.activeBoss = null;
      }
    }

    const effectiveDamage = this.calculateTotalDamage(profile.baseDamage, profile.tattoos);
    const nextLevelRespect = getXpForNextLevel(profile.level);

    return {
      ...profile,
      effectiveDamage,
      nextLevelRespect,
      availableQuests: QUESTS,
      allTattoos: Object.values(TATTOOS),
      availableBosses: Object.values(BOSSES),
      weapons: Object.values(WEAPONS),
    };
  }

  async executeQuest(userId: string, questId: string) {
    const state = await this.getProfile(userId);
    const quest = QUESTS.find((q) => q.id === questId);

    if (!quest) throw new NotFoundException('Движуха не найдена');
    if (state.level < quest.minLevel) {
      throw new BadRequestException('Недостаточный уровень авторитета');
    }
    if (state.energy < quest.energyCost) {
      throw new BadRequestException('Недостаточно энергии');
    }

    const [minCig, maxCig] = quest.rewardCigarettes;
    const earnedCigarettes = Math.floor(Math.random() * (maxCig - minCig + 1)) + minCig;
    const earnedSugar = Math.random() < quest.sugarDropChance ? 1 : 0;
    const newRespect = state.respect + quest.rewardRespect;

    let newLevel = state.level;
    let newMaxEnergy = state.maxEnergy;
    let newEnergy = state.energy - quest.energyCost;
    let levelUp = false;

    if (newRespect >= getXpForNextLevel(newLevel)) {
      newLevel += 1;
      newMaxEnergy += 5;
      newEnergy = newMaxEnergy;
      levelUp = true;
    }

    const updated = await this.prisma.tyuryagaProfile.update({
      where: { userId },
      data: {
        energy: newEnergy,
        respect: newRespect,
        level: newLevel,
        maxEnergy: newMaxEnergy,
        cigarettes: { increment: earnedCigarettes },
        sugar: { increment: earnedSugar },
      },
    });

    return {
      success: true,
      levelUp,
      rewards: {
        cigarettes: earnedCigarettes,
        respect: quest.rewardRespect,
        sugar: earnedSugar,
      },
      currentStats: {
        energy: updated.energy,
        maxEnergy: updated.maxEnergy,
        cigarettes: updated.cigarettes,
        sugar: updated.sugar,
        level: updated.level,
        respect: updated.respect,
      },
    };
  }

  async startBossBattle(userId: string, bossId: string) {
    const state = await this.getProfile(userId);
    const bossDef = BOSSES[bossId];

    if (!bossDef) throw new NotFoundException('Босс не найден');
    if (state.level < bossDef.minLevel) {
      throw new BadRequestException(`Требуется ${bossDef.minLevel} уровень`);
    }

    if (state.activeBoss && !state.activeBoss.isDefeated) {
      throw new BadRequestException('У вас уже идет бой с боссом');
    }

    if (state.activeBoss) {
      await this.prisma.tyuryagaBossBattle.delete({
        where: { id: state.activeBoss.id },
      });
    }

    const expiresAt = new Date(Date.now() + bossDef.durationHours * 3600 * 1000);

    const battle = await this.prisma.tyuryagaBossBattle.create({
      data: {
        profileId: state.id,
        bossId: bossDef.id,
        bossName: bossDef.name,
        maxHp: bossDef.maxHp,
        currentHp: bossDef.maxHp,
        rewardCigarettes: bossDef.rewardCigarettes,
        rewardRespect: bossDef.rewardRespect,
        rewardSugar: bossDef.rewardSugar,
        expiresAt,
      },
    });

    return battle;
  }

  async hitBoss(userId: string, weaponId: string) {
    const weapon = WEAPONS[weaponId];
    if (!weapon) throw new NotFoundException('Оружие не найдено');

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.tyuryagaProfile.findUnique({
        where: { userId },
        include: { tattoos: true, activeBoss: true },
      });

      if (!profile || !profile.activeBoss) {
        throw new BadRequestException('Нет активного боя с боссом');
      }

      const battle = profile.activeBoss;

      if (battle.isDefeated) {
        throw new BadRequestException('Босс уже повержен');
      }

      if (new Date(battle.expiresAt) < new Date()) {
        await tx.tyuryagaBossBattle.delete({ where: { id: battle.id } });
        throw new BadRequestException('Время на бой истекло');
      }

      if (profile.cigarettes < weapon.costCigarettes) {
        throw new BadRequestException('Не хватает папирос');
      }
      if (profile.sugar < weapon.costSugar) {
        throw new BadRequestException('Не хватает сахара');
      }

      const baseDmg = this.calculateTotalDamage(profile.baseDamage, profile.tattoos);
      const isCrit = Math.random() < weapon.critChance;
      const rawDamage = Math.round(baseDmg * weapon.damageMultiplier * (isCrit ? 2.0 : 1.0));
      const damageDealt = Math.min(battle.currentHp, rawDamage);
      const nextHp = battle.currentHp - damageDealt;
      const isDefeated = nextHp <= 0;

      await tx.tyuryagaProfile.update({
        where: { id: profile.id },
        data: {
          cigarettes: { decrement: weapon.costCigarettes },
          sugar: { decrement: weapon.costSugar },
        },
      });

      let rewards = null;
      if (isDefeated) {
        await tx.tyuryagaBossBattle.update({
          where: { id: battle.id },
          data: {
            currentHp: 0,
            isDefeated: true,
          },
        });

        await tx.tyuryagaProfile.update({
          where: { id: profile.id },
          data: {
            cigarettes: { increment: battle.rewardCigarettes },
            respect: { increment: battle.rewardRespect },
            sugar: { increment: battle.rewardSugar },
            wins: { increment: 1 },
          },
        });

        rewards = {
          cigarettes: battle.rewardCigarettes,
          respect: battle.rewardRespect,
          sugar: battle.rewardSugar,
        };
      } else {
        await tx.tyuryagaBossBattle.update({
          where: { id: battle.id },
          data: { currentHp: nextHp },
        });
      }

      return {
        damageDealt,
        isCrit,
        bossCurrentHp: Math.max(0, nextHp),
        bossMaxHp: battle.maxHp,
        isDefeated,
        rewards,
      };
    });
  }

  async buyTattoo(userId: string, tattooId: string) {
    const tattooDef = TATTOOS[tattooId];
    if (!tattooDef) throw new NotFoundException('Наколка не существует');

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.tyuryagaProfile.findUnique({
        where: { userId },
        include: { tattoos: true },
      });

      if (!profile) throw new NotFoundException('Профиль не найден');

      if (profile.tattoos.some((t) => t.tattooId === tattooId)) {
        throw new BadRequestException('Эта наколка уже набита');
      }

      if (profile.level < tattooDef.minLevel) {
        throw new BadRequestException(`Требуется ${tattooDef.minLevel} уровень авторитета`);
      }

      if (profile.cigarettes < tattooDef.costCigarettes) {
        throw new BadRequestException('Недостаточно папирос');
      }

      if (profile.sugar < tattooDef.costSugar) {
        throw new BadRequestException('Недостаточно сахара');
      }

      await tx.tyuryagaProfile.update({
        where: { id: profile.id },
        data: {
          cigarettes: { decrement: tattooDef.costCigarettes },
          sugar: { decrement: tattooDef.costSugar },
          maxEnergy: { increment: tattooDef.bonusMaxEnergy },
        },
      });

      await tx.tyuryagaTattoo.create({
        data: {
          profileId: profile.id,
          tattooId: tattooDef.id,
        },
      });

      return {
        success: true,
        tattoo: tattooDef,
      };
    });
  }

  private calculateTotalDamage(base: number, tattoos: { tattooId: string }[]): number {
    let bonus = 0;
    for (const t of tattoos) {
      if (TATTOOS[t.tattooId]) {
        bonus += TATTOOS[t.tattooId].bonusDamage;
      }
    }
    return base + bonus;
  }
}
