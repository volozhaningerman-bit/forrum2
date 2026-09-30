-- Expedition alpha server foundation

ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_HEAD';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_NECK';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_SHOULDERS';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_CLOAK';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_CHEST';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_WRISTS';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_GLOVES';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_BELT';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_LEGS';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_FEET';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_RING_1';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_RING_2';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_RELIC_1';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_RELIC_2';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_MAIN_HAND';
ALTER TYPE "InventoryItemType" ADD VALUE IF NOT EXISTS 'GAME_OFF_HAND';

DO $$ BEGIN
  CREATE TYPE "ExpeditionRunStatus" AS ENUM ('ACTIVE', 'READY', 'CLAIMED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "ExpeditionProfile" (
  "id" TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "level" INTEGER NOT NULL DEFAULT 1,
  "xp" INTEGER NOT NULL DEFAULT 0,
  "energy" INTEGER NOT NULL DEFAULT 12,
  "maxEnergy" INTEGER NOT NULL DEFAULT 12,
  "lastEnergySync" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "unlockedDepth" INTEGER NOT NULL DEFAULT 1,
  "metal" INTEGER NOT NULL DEFAULT 0,
  "cloth" INTEGER NOT NULL DEFAULT 0,
  "scrap" INTEGER NOT NULL DEFAULT 0,
  "oldParts" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExpeditionProfile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExpeditionProfile_userId_key" ON "ExpeditionProfile"("userId");
CREATE INDEX IF NOT EXISTS "ExpeditionProfile_userId_idx" ON "ExpeditionProfile"("userId");

DO $$ BEGIN
  ALTER TABLE "ExpeditionProfile"
    ADD CONSTRAINT "ExpeditionProfile_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "ExpeditionRun" (
  "id" TEXT NOT NULL,
  "profileId" TEXT NOT NULL,
  "locationKey" TEXT NOT NULL,
  "depth" INTEGER NOT NULL,
  "energyCost" INTEGER NOT NULL,
  "status" "ExpeditionRunStatus" NOT NULL DEFAULT 'ACTIVE',
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resolvesAt" TIMESTAMP(3) NOT NULL,
  "claimedAt" TIMESTAMP(3),
  "rewardXp" INTEGER NOT NULL DEFAULT 0,
  "rewardMetal" INTEGER NOT NULL DEFAULT 0,
  "rewardCloth" INTEGER NOT NULL DEFAULT 0,
  "rewardScrap" INTEGER NOT NULL DEFAULT 0,
  "rewardOldParts" INTEGER NOT NULL DEFAULT 0,
  "lootSeriesKey" TEXT,
  CONSTRAINT "ExpeditionRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ExpeditionRun_profileId_status_idx" ON "ExpeditionRun"("profileId","status");
CREATE INDEX IF NOT EXISTS "ExpeditionRun_resolvesAt_idx" ON "ExpeditionRun"("resolvesAt");

DO $$ BEGIN
  ALTER TABLE "ExpeditionRun"
    ADD CONSTRAINT "ExpeditionRun_profileId_fkey"
    FOREIGN KEY ("profileId") REFERENCES "ExpeditionProfile"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "ExpeditionItemSeries" (
  "id" TEXT NOT NULL,
  "inventoryDefinitionId" TEXT NOT NULL,
  "maxSupply" INTEGER NOT NULL,
  "issuedCount" INTEGER NOT NULL DEFAULT 0,
  "minimumDepth" INTEGER NOT NULL DEFAULT 1,
  "weight" INTEGER NOT NULL DEFAULT 100,
  CONSTRAINT "ExpeditionItemSeries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExpeditionItemSeries_inventoryDefinitionId_key"
  ON "ExpeditionItemSeries"("inventoryDefinitionId");
CREATE INDEX IF NOT EXISTS "ExpeditionItemSeries_minimumDepth_idx"
  ON "ExpeditionItemSeries"("minimumDepth");
