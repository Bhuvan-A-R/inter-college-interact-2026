/*
  Warnings:

  - The values [ACCOMPANIST] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `attendanceStatus` on the `EventRegistrations` table. All the data in the column will be lost.
  - You are about to drop the column `maxAccompanist` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAccompanist` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `aadharUrl` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `accomodation` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `admission1Url` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `admission2Url` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `pucUrl` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `sslcUrl` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `teamManager` on the `Registrants` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalDate` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalTime` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `collegeCode` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Registrants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deptCode]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deptCode` to the `Registrants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deptCode` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('PARTICIPANT');
ALTER TABLE "EventRegistrations" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- DropIndex
DROP INDEX "Users_collegeCode_key";

-- AlterTable
ALTER TABLE "EventRegistrations" DROP COLUMN "attendanceStatus";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "maxAccompanist",
DROP COLUMN "registeredAccompanist";

-- AlterTable
ALTER TABLE "Registrants" DROP COLUMN "aadharUrl",
DROP COLUMN "accomodation",
DROP COLUMN "admission1Url",
DROP COLUMN "admission2Url",
DROP COLUMN "designation",
DROP COLUMN "pucUrl",
DROP COLUMN "sslcUrl",
DROP COLUMN "teamManager",
ADD COLUMN     "deptCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "arrivalDate",
DROP COLUMN "arrivalTime",
DROP COLUMN "collegeCode",
ADD COLUMN     "deptCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Registrants_email_key" ON "Registrants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_deptCode_key" ON "Users"("deptCode");
