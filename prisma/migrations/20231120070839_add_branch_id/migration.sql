/*
  Warnings:

  - Added the required column `branchId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `branchId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tables` ADD COLUMN `branchId` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('Available', 'Unavailable') NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;
