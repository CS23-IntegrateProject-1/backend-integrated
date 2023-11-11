/*
  Warnings:

  - You are about to drop the column `longtitude` on the `Theaters` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Theaters` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,10)` to `Decimal(20,10)`.
  - Added the required column `screen_no` to the `Screens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Theaters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Films` MODIFY `synopsis` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Screens` ADD COLUMN `screen_no` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Theaters` DROP COLUMN `longtitude`,
    ADD COLUMN `longitude` DECIMAL(20, 10) NOT NULL,
    MODIFY `latitude` DECIMAL(20, 10) NOT NULL;
