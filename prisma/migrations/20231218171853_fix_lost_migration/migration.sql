-- AlterTable
ALTER TABLE `Promotion` ADD COLUMN `branchId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Screens` ADD COLUMN `price` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `Shows` MODIFY `price` DECIMAL(65, 30) NULL;

-- CreateTable
CREATE TABLE `Promotion_approval` (
    `promotionId` INTEGER NOT NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`promotionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE SET NULL ON UPDATE CASCADE;
