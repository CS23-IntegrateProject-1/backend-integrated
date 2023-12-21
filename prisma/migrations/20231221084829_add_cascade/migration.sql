-- DropForeignKey
ALTER TABLE `Ad_business` DROP FOREIGN KEY `Ad_business_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `Ad_influ` DROP FOREIGN KEY `Ad_influ_advertisementId_fkey`;

-- DropForeignKey
ALTER TABLE `Ad_influ` DROP FOREIGN KEY `Ad_influ_influencerId_fkey`;

-- DropForeignKey
ALTER TABLE `Ad_tag` DROP FOREIGN KEY `Ad_tag_adId_fkey`;

-- DropForeignKey
ALTER TABLE `Ad_tag` DROP FOREIGN KEY `Ad_tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin_name` DROP FOREIGN KEY `Admin_name_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin_notification_setting` DROP FOREIGN KEY `Admin_notification_setting_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin_privacy_policy` DROP FOREIGN KEY `Admin_privacy_policy_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin_system_access` DROP FOREIGN KEY `Admin_system_access_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin_terms_of_services` DROP FOREIGN KEY `Admin_terms_of_services_adminId_fkey`;

-- AddForeignKey
ALTER TABLE `Ad_business` ADD CONSTRAINT `Ad_business_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business_user`(`businessId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_advertisementId_fkey` FOREIGN KEY (`advertisementId`) REFERENCES `Ad_influencer`(`advertisementId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`influencerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `A_tag`(`tagId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_name` ADD CONSTRAINT `Admin_name_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_notification_setting` ADD CONSTRAINT `Admin_notification_setting_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_privacy_policy` ADD CONSTRAINT `Admin_privacy_policy_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_system_access` ADD CONSTRAINT `Admin_system_access_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_terms_of_services` ADD CONSTRAINT `Admin_terms_of_services_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE CASCADE ON UPDATE CASCADE;
