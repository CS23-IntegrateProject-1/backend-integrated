/*
  Warnings:

  - You are about to alter the column `event_start` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `event_end` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `menuId` on the `Order_detail` table. All the data in the column will be lost.
  - You are about to drop the column `setId` on the `Order_detail` table. All the data in the column will be lost.
  - You are about to alter the column `order_time` on the `Order_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Order_detail` DROP FOREIGN KEY `Order_detail_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_detail` DROP FOREIGN KEY `Order_detail_setId_fkey`;

-- AlterTable
ALTER TABLE `Event` MODIFY `event_start` TIMESTAMP NOT NULL,
    MODIFY `event_end` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Order_detail` DROP COLUMN `menuId`,
    DROP COLUMN `setId`,
    MODIFY `order_time` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `Menu_ordered` (
    `menuId` INTEGER NOT NULL,
    `orderDetailId` INTEGER NOT NULL,

    PRIMARY KEY (`menuId`, `orderDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sets_ordered` (
    `orderDetailId` INTEGER NOT NULL,
    `setId` INTEGER NOT NULL,

    PRIMARY KEY (`orderDetailId`, `setId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu_ordered` ADD CONSTRAINT `Menu_ordered_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_ordered` ADD CONSTRAINT `Menu_ordered_orderDetailId_fkey` FOREIGN KEY (`orderDetailId`) REFERENCES `Order_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sets_ordered` ADD CONSTRAINT `Sets_ordered_orderDetailId_fkey` FOREIGN KEY (`orderDetailId`) REFERENCES `Order_detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sets_ordered` ADD CONSTRAINT `Sets_ordered_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Sets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
