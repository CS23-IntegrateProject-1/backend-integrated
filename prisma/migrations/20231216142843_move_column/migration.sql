/*
  Warnings:

  - You are about to drop the column `isUsing` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `isUsing`;

-- AlterTable
ALTER TABLE `Tables` ADD COLUMN `isUsing` BOOLEAN NOT NULL DEFAULT true;
