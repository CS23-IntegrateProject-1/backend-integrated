/*
  Warnings:

  - Added the required column `userId` to the `Reservation_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation_logs` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Shows` MODIFY `price` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `Venue` ADD COLUMN `venue_picture` TEXT NULL;

-- CreateTable
CREATE TABLE `Chat_message` (
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Group`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_logs` ADD CONSTRAINT `Reservation_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
