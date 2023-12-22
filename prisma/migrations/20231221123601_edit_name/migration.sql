/*
  Warnings:

  - You are about to drop the column `bussinessId` on the `Redeem_privilege` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Redeem_privilege` DROP FOREIGN KEY `Redeem_privilege_bussinessId_fkey`;

-- AlterTable
ALTER TABLE `Redeem_privilege` DROP COLUMN `bussinessId`,
    ADD COLUMN `businessId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Redeem_privilege` ADD CONSTRAINT `Redeem_privilege_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business_user`(`businessId`) ON DELETE SET NULL ON UPDATE CASCADE;
