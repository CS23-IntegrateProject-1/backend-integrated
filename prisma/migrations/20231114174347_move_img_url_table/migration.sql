/*
  Warnings:

  - You are about to drop the column `image_url` on the `Tables` table. All the data in the column will be lost.
  - Added the required column `table_no` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Table_type_detail` ADD COLUMN `image_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tables` DROP COLUMN `image_url`,
    ADD COLUMN `table_no` INTEGER NOT NULL;
