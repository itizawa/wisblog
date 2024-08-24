/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "session";

-- CreateTable
CREATE TABLE "sessions" (
    "sid" TEXT NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "IDX_sessions_expire" ON "sessions"("expire");
