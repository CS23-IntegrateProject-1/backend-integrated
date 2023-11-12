/*
  Warnings:

  - You are about to drop the column `isAvailiable` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `isAvailiable`;

-- CreateTable
CREATE TABLE `Stocks` (
    `stockId` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Stocks_menuId_key`(`menuId`),
    PRIMARY KEY (`stockId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;
