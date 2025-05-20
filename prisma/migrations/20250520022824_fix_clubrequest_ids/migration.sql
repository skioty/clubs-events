/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clubId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Activity` table. All the data in the column will be lost.
  - The primary key for the `Club` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clubId` on the `Enrollment` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `requestedAt` on the `Membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Club_name_key";

-- AlterTable
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_pkey",
DROP COLUMN "clubId",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "details" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Activity_id_seq";

-- AlterTable
ALTER TABLE "Club" DROP CONSTRAINT "Club_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Club_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Club_id_seq";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "clubId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clubId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "requestedAt",
ADD COLUMN     "applicationDescription" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clubId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Membership_id_seq";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ClubRequest" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClubRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE INDEX "Enrollment_userId_idx" ON "Enrollment"("userId");

-- CreateIndex
CREATE INDEX "Enrollment_eventId_idx" ON "Enrollment"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_eventId_key" ON "Enrollment"("userId", "eventId");

-- CreateIndex
CREATE INDEX "Membership_userId_idx" ON "Membership"("userId");

-- CreateIndex
CREATE INDEX "Membership_clubId_idx" ON "Membership"("clubId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubRequest" ADD CONSTRAINT "ClubRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubRequest" ADD CONSTRAINT "ClubRequest_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
