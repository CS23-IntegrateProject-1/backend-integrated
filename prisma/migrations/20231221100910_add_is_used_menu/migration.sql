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

-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_tags` DROP FOREIGN KEY `Article_tags_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_tags` DROP FOREIGN KEY `Article_tags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_venue` DROP FOREIGN KEY `Article_venue_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_venue` DROP FOREIGN KEY `Article_venue_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_Room_Logs` DROP FOREIGN KEY `Chat_Room_Logs_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_Room_Logs` DROP FOREIGN KEY `Chat_Room_Logs_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_message` DROP FOREIGN KEY `Chat_message_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_message` DROP FOREIGN KEY `Chat_message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_room` DROP FOREIGN KEY `Chat_room_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `Check_in_log` DROP FOREIGN KEY `Check_in_log_reserveId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment_like_by_creator` DROP FOREIGN KEY `Comment_like_by_creator_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment_like_by_creator` DROP FOREIGN KEY `Comment_like_by_creator_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Complain_ticket` DROP FOREIGN KEY `Complain_ticket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Credit_card` DROP FOREIGN KEY `Credit_card_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_reservedId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket_responses` DROP FOREIGN KEY `Ticket_responses_complainTicketId_fkey`;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `isused` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Sets` ADD COLUMN `isused` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `Ad_business` ADD CONSTRAINT `Ad_business_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business_user`(`businessId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_advertisementId_fkey` FOREIGN KEY (`advertisementId`) REFERENCES `Ad_influencer`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`influencerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `A_tag`(`tagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_name` ADD CONSTRAINT `Admin_name_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_notification_setting` ADD CONSTRAINT `Admin_notification_setting_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_privacy_policy` ADD CONSTRAINT `Admin_privacy_policy_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_system_access` ADD CONSTRAINT `Admin_system_access_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_terms_of_services` ADD CONSTRAINT `Admin_terms_of_services_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`tagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Group`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room` ADD CONSTRAINT `Chat_room_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Venue`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Check_in_log` ADD CONSTRAINT `Check_in_log_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`commentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket_responses` ADD CONSTRAINT `Ticket_responses_complainTicketId_fkey` FOREIGN KEY (`complainTicketId`) REFERENCES `Complain_ticket`(`ComplainTicketId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit_card` ADD CONSTRAINT `Credit_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_reservedId_fkey` FOREIGN KEY (`reservedId`) REFERENCES `Reservation`(`reservationId`) ON DELETE SET NULL ON UPDATE CASCADE;
