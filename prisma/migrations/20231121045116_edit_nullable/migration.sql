-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_branchId_fkey`;

-- DropForeignKey
ALTER TABLE `Tables` DROP FOREIGN KEY `Tables_branchId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` MODIFY `branchId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tables` MODIFY `branchId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE SET NULL ON UPDATE CASCADE;
