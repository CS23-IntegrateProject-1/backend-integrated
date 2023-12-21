-- AlterTable
ALTER TABLE `Ad_business` MODIFY `isApprove` ENUM('Rejected', 'In_progress', 'Completed', 'Awaiting_payment') NOT NULL;

-- AlterTable
ALTER TABLE `Redeem_privilege` ADD COLUMN `bussinessId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Redeem_privilege` ADD CONSTRAINT `Redeem_privilege_bussinessId_fkey` FOREIGN KEY (`bussinessId`) REFERENCES `Business_user`(`businessId`) ON DELETE SET NULL ON UPDATE CASCADE;
