-- CreateTable
CREATE TABLE `Notfication_ad_business` (
    `notiAdBusinessId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,
    `advertisementId` INTEGER NOT NULL,

    PRIMARY KEY (`notiAdBusinessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_reservation` (
    `notiReserveId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` ENUM('Pending', 'Check_in', 'Check_out', 'Cancel') NOT NULL,
    `reserveId` INTEGER NOT NULL,

    PRIMARY KEY (`notiReserveId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_order` (
    `notificationOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` ENUM('On_going', 'Completed') NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`notificationOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notfication_ad_business` ADD CONSTRAINT `Notfication_ad_business_advertisementId_fkey` FOREIGN KEY (`advertisementId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification_reservation` ADD CONSTRAINT `Notification_reservation_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification_order` ADD CONSTRAINT `Notification_order_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
