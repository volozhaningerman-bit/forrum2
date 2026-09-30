-- Shared raid lobby for the first cooperative boss.
DO $$ BEGIN
  CREATE TYPE "ExpeditionRaidStatus" AS ENUM ('SCHEDULED', 'RESOLVED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "ExpeditionRaid" (
  "id" TEXT NOT NULL,
  "bossKey" TEXT NOT NULL,
  "locationKey" TEXT NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "status" "ExpeditionRaidStatus" NOT NULL DEFAULT 'SCHEDULED',
  "minParticipants" INTEGER NOT NULL DEFAULT 3,
  "maxParticipants" INTEGER NOT NULL DEFAULT 10,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExpeditionRaid_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExpeditionRaid_bossKey_startsAt_key"
  ON "ExpeditionRaid"("bossKey","startsAt");
CREATE INDEX IF NOT EXISTS "ExpeditionRaid_status_startsAt_idx"
  ON "ExpeditionRaid"("status","startsAt");

CREATE TABLE IF NOT EXISTS "ExpeditionRaidParticipant" (
  "id" TEXT NOT NULL,
  "raidId" TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "powerSnapshot" INTEGER NOT NULL,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ExpeditionRaidParticipant_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExpeditionRaidParticipant_raidId_userId_key"
  ON "ExpeditionRaidParticipant"("raidId","userId");
CREATE INDEX IF NOT EXISTS "ExpeditionRaidParticipant_userId_joinedAt_idx"
  ON "ExpeditionRaidParticipant"("userId","joinedAt" DESC);

DO $$ BEGIN
  ALTER TABLE "ExpeditionRaidParticipant"
    ADD CONSTRAINT "ExpeditionRaidParticipant_raidId_fkey"
    FOREIGN KEY ("raidId") REFERENCES "ExpeditionRaid"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "ExpeditionRaidParticipant"
    ADD CONSTRAINT "ExpeditionRaidParticipant_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
