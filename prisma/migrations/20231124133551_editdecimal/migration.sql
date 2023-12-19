/*
  Warnings:

  - You are about to alter the column `price` on the `Sets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Sets` MODIFY `price` DECIMAL(10, 2) NOT NULL;
