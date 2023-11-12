/*
  Warnings:

  - Added the required column `language` to the `Films` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Films` ADD COLUMN `language` VARCHAR(191) NOT NULL;
