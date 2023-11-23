/*
  Warnings:

  - You are about to drop the column `venuId` on the `Venue_reviews` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Venue_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Venue_reviews` DROP FOREIGN KEY `Venue_reviews_venuId_fkey`;

-- AlterTable
ALTER TABLE `Venue_reviews` DROP COLUMN `venuId`,
    ADD COLUMN `branchId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Venue_reviews` ADD CONSTRAINT `Venue_reviews_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;
