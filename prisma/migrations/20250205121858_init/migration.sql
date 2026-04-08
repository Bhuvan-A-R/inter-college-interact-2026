-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PARTICIPANT', 'ACCOMPANIST');

-- CreateEnum
CREATE TYPE "DocumentVerificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentVerifiedStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "collegeCode" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "collegeOurCode" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "paymentUrl" TEXT,
    "txnNumber" TEXT,
    "Amount" INTEGER,
    "PaymentVerified" "PaymentVerifiedStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "eventNo" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "maxParticipant" INTEGER NOT NULL,
    "registeredParticipant" INTEGER NOT NULL DEFAULT 0,
    "maxAccompanist" INTEGER NOT NULL,
    "registeredAccompanist" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "teamManager" BOOLEAN NOT NULL DEFAULT false,
    "photoUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "aadharUrl" TEXT,
    "sslcUrl" TEXT,
    "pucUrl" TEXT,
    "admission1Url" TEXT,
    "admission2Url" TEXT,
    "idcardUrl" TEXT,
    "gender" TEXT NOT NULL,
    "accomodation" BOOLEAN NOT NULL DEFAULT false,
    "blood" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "docStatus" "DocumentVerificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Registrants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistrations" (
    "id" TEXT NOT NULL,
    "registrantId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "attendanceStatus" BOOLEAN NOT NULL DEFAULT false,
    "prize" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EventRegistrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventRegistrations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventRegistrations_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_collegeCode_key" ON "Users"("collegeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Users_collegeName_key" ON "Users"("collegeName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_collegeOurCode_key" ON "Users"("collegeOurCode");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Events_userId_eventNo_key" ON "Events"("userId", "eventNo");

-- CreateIndex
CREATE UNIQUE INDEX "Registrants_usn_key" ON "Registrants"("usn");

-- CreateIndex
CREATE UNIQUE INDEX "Registrants_phone_key" ON "Registrants"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistrations_registrantId_eventId_key" ON "EventRegistrations"("registrantId", "eventId");

-- CreateIndex
CREATE INDEX "_EventRegistrations_B_index" ON "_EventRegistrations"("B");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrants" ADD CONSTRAINT "Registrants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistrations" ADD CONSTRAINT "EventRegistrations_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "Registrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistrations" ADD CONSTRAINT "EventRegistrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegistrations" ADD CONSTRAINT "_EventRegistrations_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegistrations" ADD CONSTRAINT "_EventRegistrations_B_fkey" FOREIGN KEY ("B") REFERENCES "Registrants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
