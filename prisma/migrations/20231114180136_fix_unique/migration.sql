/*
  Warnings:

  - Added the required column `depositId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `depositId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`depositId`) ON DELETE RESTRICT ON UPDATE CASCADE;
