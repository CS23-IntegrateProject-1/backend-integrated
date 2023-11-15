/*
  Warnings:

  - You are about to drop the column `reservedId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_reservedId_fkey`;

-- AlterTable
ALTER TABLE `Friendship` MODIFY `since` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `reservedId`;
