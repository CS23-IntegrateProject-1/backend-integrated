/*
  Warnings:

  - You are about to drop the column `replyMessageId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_replyMessageId_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `replyMessageId`;
