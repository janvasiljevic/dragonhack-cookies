/*
  Warnings:

  - Added the required column `borrowDate` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDate` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "borrowDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL;
