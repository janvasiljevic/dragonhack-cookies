/*
  Warnings:

  - You are about to drop the column `numberOfBooksBorrowed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "numberOfBooksBorrowed",
ADD COLUMN     "numberOfBooksRead" INTEGER NOT NULL DEFAULT 0;
