-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'Ime',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Priimek';
