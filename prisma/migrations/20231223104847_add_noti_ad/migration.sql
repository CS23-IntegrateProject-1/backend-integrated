-- CreateTable
CREATE TABLE `Notification_ad_business` (
    `notiAdBusinessId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `isApprove` ENUM('Rejected', 'In_progress', 'Completed', 'Awaiting_payment') NOT NULL DEFAULT 'In_progress',
    `advertisementId` INTEGER NOT NULL,

    INDEX `Notfication_ad_business_advertisementId_fkey`(`advertisementId`),
    PRIMARY KEY (`notiAdBusinessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification_ad_business` ADD CONSTRAINT `Notification_ad_business_advertisementId_fkey` FOREIGN KEY (`advertisementId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;
