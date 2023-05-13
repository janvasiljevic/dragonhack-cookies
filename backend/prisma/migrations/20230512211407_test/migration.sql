/*
  Warnings:

  - You are about to drop the column `assistantId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationKnown` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assistant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_assistedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_createdUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_assistantId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "assistantId",
DROP COLUMN "latitude",
DROP COLUMN "locationKnown",
DROP COLUMN "longitude",
DROP COLUMN "refreshToken",
DROP COLUMN "telephoneNumber",
DROP COLUMN "userType",
DROP COLUMN "yearOfBirth";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "Assistant";

-- DropTable
DROP TABLE "Bid";

-- DropEnum
DROP TYPE "AchievementEnum";

-- DropEnum
DROP TYPE "BidStatus";

-- DropEnum
DROP TYPE "TypeOfProblem";

-- DropEnum
DROP TYPE "UserType";
