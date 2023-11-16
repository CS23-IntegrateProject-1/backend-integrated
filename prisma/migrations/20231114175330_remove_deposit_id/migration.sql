/*
  Warnings:

  - You are about to drop the column `depositId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Reservation_depositId_key` ON `Reservation`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `depositId`;
