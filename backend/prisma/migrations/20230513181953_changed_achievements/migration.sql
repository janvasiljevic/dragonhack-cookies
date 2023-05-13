/*
  Warnings:

  - You are about to drop the column `userId` on the `Achievement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_AchievementToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToUser_AB_unique" ON "_AchievementToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToUser_B_index" ON "_AchievementToUser"("B");

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
