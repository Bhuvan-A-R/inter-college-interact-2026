/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventNo,teamNumber]` on the table `Events` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Events_userId_eventNo_key";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deptCode" TEXT,
ADD COLUMN     "teamNumber" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Registrants" ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "blood" DROP NOT NULL,
ALTER COLUMN "deptCode" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Events_userId_eventNo_teamNumber_key" ON "Events"("userId", "eventNo", "teamNumber");
