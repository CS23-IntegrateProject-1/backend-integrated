/*
  Warnings:

  - You are about to drop the `Promotion_approval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Promotion_approval`;

-- CreateTable
CREATE TABLE `Promotion_response` (
    `promotionId` INTEGER NOT NULL,
    `response` TEXT NOT NULL,

    PRIMARY KEY (`promotionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher_response` (
    `voucherId` INTEGER NOT NULL,
    `response` TEXT NOT NULL,

    PRIMARY KEY (`voucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promotion_response` ADD CONSTRAINT `Promotion_response_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`promotionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher_response` ADD CONSTRAINT `Voucher_response_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`voucherId`) ON DELETE RESTRICT ON UPDATE CASCADE;
