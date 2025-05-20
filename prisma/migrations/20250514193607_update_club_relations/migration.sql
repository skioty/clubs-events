/*
  Warnings:

  - The primary key for the `Club` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Club` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clubId` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clubId` on the `Membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_clubId_fkey";

-- AlterTable
ALTER TABLE "Club" DROP CONSTRAINT "Club_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Club_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "clubId",
ADD COLUMN     "clubId" INTEGER NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "clubId",
ADD COLUMN     "clubId" INTEGER NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_clubId_key" ON "Membership"("userId", "clubId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
