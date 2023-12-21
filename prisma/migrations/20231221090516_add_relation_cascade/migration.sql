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
ALTER TABLE `Ticket_responses` DROP FOREIGN KEY `Ticket_responses_complainTicketId_fkey`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`tagId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Group`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room` ADD CONSTRAINT `Chat_room_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Venue`(`chatRoomId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Check_in_log` ADD CONSTRAINT `Check_in_log_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`commentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket_responses` ADD CONSTRAINT `Ticket_responses_complainTicketId_fkey` FOREIGN KEY (`complainTicketId`) REFERENCES `Complain_ticket`(`ComplainTicketId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit_card` ADD CONSTRAINT `Credit_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Online_orders` ADD CONSTRAINT `Online_orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Online_orders` ADD CONSTRAINT `Online_orders_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Online_orders` ADD CONSTRAINT `Online_orders_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Online_orders` ADD CONSTRAINT `Online_orders_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver_list`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;
