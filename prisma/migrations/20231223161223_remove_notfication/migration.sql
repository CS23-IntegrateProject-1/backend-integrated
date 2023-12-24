/*
  Warnings:

  - You are about to drop the `Notfication_ad_business` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notfication_ad_business` DROP FOREIGN KEY `Notfication_ad_business_advertisementId_fkey`;

-- DropTable
DROP TABLE `Notfication_ad_business`;
