/*
  Warnings:

  - You are about to alter the column `event_start` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `event_end` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `order_time` on the `Order_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_chatRoomId_fkey`;

-- AlterTable
ALTER TABLE `Event` MODIFY `event_start` TIMESTAMP NOT NULL,
    MODIFY `event_end` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Order_detail` MODIFY `order_time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `chatRoomId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
