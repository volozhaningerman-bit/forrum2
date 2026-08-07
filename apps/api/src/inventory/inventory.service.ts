import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';

type InventoryDefinitionRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  previewKey: string | null;
  style: Record<string, string> | null;
  transferable: boolean;
  deletable: boolean;
  equipable: boolean;
};

type InventoryItemRow = InventoryDefinitionRow & {
  itemId: string;
  ownerId: string;
  serialNumber: number | null;
  equipped: boolean;
  acquiredAt: Date;
  equippedAt: Date | null;
};

type InventoryOwnerRow = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

type TransferTargetRow = {
  id: string;
  username: string;
};

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async publicInventory(username: string) {
    const owners = await this.prisma.$queryRawUnsafe<InventoryOwnerRow[]>(
      `SELECT "id", "username", "displayName", "avatarUrl"
       FROM "User"
       WHERE lower("username") = lower($1)
       LIMIT 1`,
      username,
    );
    const owner = owners[0];

    if (!owner) {
      throw new NotFoundException('Пользователь не найден');
    }

    const rows = await this.prisma.$queryRawUnsafe<InventoryItemRow[]>(
      `SELECT
         ui."id" AS "itemId",
         ui."ownerId",
         ui."serialNumber",
         ui."equipped",
         ui."acquiredAt",
         ui."equippedAt",
         d."id",
         d."slug",
         d."name",
         d."description",
         d."type"::text AS "type",
         d."rarity"::text AS "rarity",
         d."previewKey",
         d."style",
         d."transferable",
         d."deletable",
         d."equipable"
       FROM "UserInventoryItem" ui
       JOIN "InventoryItemDefinition" d
         ON d."id" = ui."definitionId"
       WHERE ui."ownerId" = $1
         AND ui."deletedAt" IS NULL
       ORDER BY ui."equipped" DESC, ui."acquiredAt" DESC, d."name" ASC`,
      owner.id,
    );

    return {
      owner: {
        username: owner.username,
        displayName: owner.displayName,
        avatarUrl: owner.avatarUrl,
      },
      items: rows.map((row) => ({
        id: row.itemId,
        serialNumber: row.serialNumber,
        equipped: row.equipped,
        acquiredAt: row.acquiredAt,
        equippedAt: row.equippedAt,
        definition: {
          id: row.id,
          slug: row.slug,
          name: row.name,
          description: row.description,
          type: row.type,
          rarity: row.rarity,
          previewKey: row.previewKey,
          style: row.style ?? {},
          transferable: row.transferable,
          deletable: row.deletable,
          equipable: row.equipable,
        },
      })),
    };
  }

  async equip(actorId: string, itemId: string) {
    const item = await this.ownedItem(actorId, itemId);

    if (!item.equipable) {
      throw new BadRequestException('Этот предмет нельзя надеть');
    }

    await this.prisma.$transaction(async (transaction) => {
      await transaction.$executeRawUnsafe(
        `UPDATE "UserInventoryItem" ui
         SET "equipped" = false, "equippedAt" = NULL
         FROM "InventoryItemDefinition" d
         WHERE ui."definitionId" = d."id"
           AND ui."ownerId" = $1
           AND ui."deletedAt" IS NULL
           AND d."type" = $2::"InventoryItemType"`,
        actorId,
        item.type,
      );

      await transaction.$executeRawUnsafe(
        `UPDATE "UserInventoryItem"
         SET "equipped" = true, "equippedAt" = NOW()
         WHERE "id" = $1 AND "ownerId" = $2 AND "deletedAt" IS NULL`,
        itemId,
        actorId,
      );

      await this.writeTransaction(
        transaction,
        itemId,
        'EQUIP',
        actorId,
        actorId,
        { itemType: item.type },
      );
    });

    return { ok: true };
  }

  async unequip(actorId: string, itemId: string) {
    const item = await this.ownedItem(actorId, itemId);

    if (!item.equipped) {
      return { ok: true };
    }

    await this.prisma.$transaction(async (transaction) => {
      await transaction.$executeRawUnsafe(
        `UPDATE "UserInventoryItem"
         SET "equipped" = false, "equippedAt" = NULL
         WHERE "id" = $1 AND "ownerId" = $2 AND "deletedAt" IS NULL`,
        itemId,
        actorId,
      );

      await this.writeTransaction(
        transaction,
        itemId,
        'UNEQUIP',
        actorId,
        actorId,
        { itemType: item.type },
      );
    });

    return { ok: true };
  }

  async transfer(actorId: string, itemId: string, username: string) {
    const item = await this.ownedItem(actorId, itemId);

    if (!item.transferable) {
      throw new ForbiddenException('Этот предмет нельзя передавать');
    }

    const targets = await this.prisma.$queryRawUnsafe<TransferTargetRow[]>(
      `SELECT "id", "username"
       FROM "User"
       WHERE lower("username") = lower($1)
       LIMIT 1`,
      username.trim(),
    );
    const target = targets[0];

    if (!target) {
      throw new NotFoundException('Получатель не найден');
    }
    if (target.id === actorId) {
      throw new BadRequestException('Нельзя передать предмет самому себе');
    }

    await this.prisma.$transaction(async (transaction) => {
      const changed = await transaction.$executeRawUnsafe(
        `UPDATE "UserInventoryItem"
         SET "ownerId" = $1,
             "equipped" = false,
             "equippedAt" = NULL,
             "acquiredAt" = NOW()
         WHERE "id" = $2
           AND "ownerId" = $3
           AND "deletedAt" IS NULL`,
        target.id,
        itemId,
        actorId,
      );

      if (Number(changed) !== 1) {
        throw new ConflictException('Владелец предмета уже изменился');
      }

      await this.writeTransaction(
        transaction,
        itemId,
        'TRANSFER',
        actorId,
        target.id,
        { targetUsername: target.username },
      );
    });

    return { ok: true };
  }

  async remove(actorId: string, itemId: string) {
    const item = await this.ownedItem(actorId, itemId);

    if (!item.deletable) {
      throw new ForbiddenException('Этот предмет нельзя удалить');
    }

    await this.prisma.$transaction(async (transaction) => {
      const changed = await transaction.$executeRawUnsafe(
        `UPDATE "UserInventoryItem"
         SET "deletedAt" = NOW(),
             "equipped" = false,
             "equippedAt" = NULL
         WHERE "id" = $1
           AND "ownerId" = $2
           AND "deletedAt" IS NULL`,
        itemId,
        actorId,
      );

      if (Number(changed) !== 1) {
        throw new ConflictException('Предмет уже удалён или передан');
      }

      await this.writeTransaction(
        transaction,
        itemId,
        'DELETE',
        actorId,
        null,
        { itemType: item.type },
      );
    });

    return { ok: true };
  }

  private async ownedItem(actorId: string, itemId: string) {
    const rows = await this.prisma.$queryRawUnsafe<InventoryItemRow[]>(
      `SELECT
         ui."id" AS "itemId",
         ui."ownerId",
         ui."serialNumber",
         ui."equipped",
         ui."acquiredAt",
         ui."equippedAt",
         d."id",
         d."slug",
         d."name",
         d."description",
         d."type"::text AS "type",
         d."rarity"::text AS "rarity",
         d."previewKey",
         d."style",
         d."transferable",
         d."deletable",
         d."equipable"
       FROM "UserInventoryItem" ui
       JOIN "InventoryItemDefinition" d
         ON d."id" = ui."definitionId"
       WHERE ui."id" = $1
         AND ui."ownerId" = $2
         AND ui."deletedAt" IS NULL
       LIMIT 1`,
      itemId,
      actorId,
    );
    const item = rows[0];

    if (!item) {
      throw new NotFoundException('Предмет не найден в вашем инвентаре');
    }

    return item;
  }

  private async writeTransaction(
    transaction: {
      $executeRawUnsafe: (
        query: string,
        ...values: unknown[]
      ) => Promise<number>;
    },
    itemId: string,
    type: 'EQUIP' | 'UNEQUIP' | 'TRANSFER' | 'DELETE',
    fromUserId: string | null,
    toUserId: string | null,
    metadata: Record<string, string>,
  ) {
    await transaction.$executeRawUnsafe(
      `INSERT INTO "InventoryTransaction"
         ("id", "itemId", "type", "fromUserId", "toUserId", "metadata", "createdAt")
       VALUES ($1, $2, $3::"InventoryTransactionType", $4, $5, $6::jsonb, NOW())`,
      randomUUID(),
      itemId,
      type,
      fromUserId,
      toUserId,
      JSON.stringify(metadata),
    );
  }
}
