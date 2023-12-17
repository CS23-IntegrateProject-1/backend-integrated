-- CreateTable
CREATE TABLE `Redeem_privilege` (
    `redeemId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `memberTier` INTEGER NOT NULL,
    `image_url` TEXT NULL,

    PRIMARY KEY (`redeemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Redeem_privilege` ADD CONSTRAINT `Redeem_privilege_memberTier_fkey` FOREIGN KEY (`memberTier`) REFERENCES `Member_tier`(`tierId`) ON DELETE RESTRICT ON UPDATE CASCADE;
