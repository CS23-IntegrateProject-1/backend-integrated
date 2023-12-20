/*
  Warnings:

  - You are about to drop the column `addressId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `isDelivery` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_driverId_fkey`;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `addressId`,
    DROP COLUMN `driverId`,
    DROP COLUMN `isDelivery`;

-- CreateTable
CREATE TABLE `Online_orders` (
    `onlineOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `branchId` INTEGER NOT NULL,
    `driverId` INTEGER NOT NULL,
    `driver_note` TEXT NOT NULL,
    `status` ENUM('On_going', 'Completed') NOT NULL DEFAULT 'On_going',

    PRIMARY KEY (`onlineOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Online_orders_detail` (
    `onlineOrderDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `onlineOrderId` INTEGER NOT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `order_time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `menuId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `status` ENUM('On_going', 'Completed') NOT NULL DEFAULT 'On_going',

    INDEX `Online_orders_detail_menuId_fkey`(`menuId`),
    PRIMARY KEY (`onlineOrderDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Online_orders_detail` ADD CONSTRAINT `Online_orders_detail_onlineOrderId_fkey` FOREIGN KEY (`onlineOrderId`) REFERENCES `Online_orders`(`onlineOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Online_orders_detail` ADD CONSTRAINT `Online_orders_detail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;
