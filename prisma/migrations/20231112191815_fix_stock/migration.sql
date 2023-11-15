-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NULL,
    `fname` VARCHAR(191) NOT NULL,
    `lname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(125) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,
    `addId` VARCHAR(191) NULL,
    `phone` VARCHAR(10) NOT NULL,
    `tierId` INTEGER NULL,
    `userId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_addId_key`(`addId`),
    INDEX `User_tierId_fkey`(`tierId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_bio` (
    `userId` INTEGER NOT NULL,
    `birthday` DATE NOT NULL,
    `gender` ENUM('Male', 'Female', 'Others') NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_method` (
    `method` ENUM('Cash', 'Promptpay', 'Mobilebanking') NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Payment_method_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_setting` (
    `userId` INTEGER NOT NULL,
    `in_app` BOOLEAN NOT NULL DEFAULT false,
    `email` BOOLEAN NOT NULL DEFAULT false,
    `offers` BOOLEAN NOT NULL DEFAULT false,
    `updates` BOOLEAN NOT NULL DEFAULT false,
    `feedbacks` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `System_access` (
    `userId` INTEGER NOT NULL,
    `location_acces` BOOLEAN NOT NULL DEFAULT false,
    `file_access` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Term_of_services` (
    `privacy_consent` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Term_of_services_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Privacy_policies` (
    `privacy_consent` BOOLEAN NOT NULL DEFAULT false,
    `cookie_consent` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Privacy_policies_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `About_app` (
    `version` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NULL,
    `last_update` DATETIME(3) NOT NULL,
    `aboutAppId` INTEGER NOT NULL,

    PRIMARY KEY (`aboutAppId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group_user` (
    `groupId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,

    INDEX `Group_user_memberId_fkey`(`memberId`),
    PRIMARY KEY (`groupId`, `memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `groupId` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friendship` (
    `firstUserId` INTEGER NOT NULL,
    `sencondUserId` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Friend') NOT NULL,
    `since` DATETIME(3) NOT NULL,

    INDEX `Friendship_sencondUserId_fkey`(`sencondUserId`),
    PRIMARY KEY (`firstUserId`, `sencondUserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue` (
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `capacity` INTEGER NOT NULL,
    `chatRoomId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `score` DECIMAL(65, 30) NOT NULL,
    `venueId` INTEGER NOT NULL AUTO_INCREMENT,
    `website_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Venue_chatRoomId_key`(`chatRoomId`),
    UNIQUE INDEX `Venue_locationId_key`(`locationId`),
    PRIMARY KEY (`venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_branch` (
    `branchId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `branch_name` VARCHAR(191) NOT NULL,

    INDEX `Venue_branch_venueId_fkey`(`venueId`),
    PRIMARY KEY (`branchId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_contacts` (
    `venueId` INTEGER NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `contactId` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Email', 'Phone') NOT NULL,

    PRIMARY KEY (`contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_reviews` (
    `venuId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `review` VARCHAR(191) NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `venueReviewId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Venue_reviews_userId_fkey`(`userId`),
    INDEX `Venue_reviews_venuId_fkey`(`venuId`),
    PRIMARY KEY (`venueReviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_managers` (
    `venueId` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(10) NULL,
    `SSN` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Venue_managers_venueId_key`(`venueId`),
    PRIMARY KEY (`SSN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_keywords` (
    `venueId` INTEGER NOT NULL,
    `keyword` VARCHAR(191) NULL,

    PRIMARY KEY (`venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opening_day` (
    `closing_hours` TIME(0) NOT NULL,
    `day` ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun') NOT NULL,
    `openingDayId` INTEGER NOT NULL AUTO_INCREMENT,
    `opening_hours` TIME(0) NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Opening_day_venueId_fkey`(`venueId`),
    PRIMARY KEY (`openingDayId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_photo` (
    `venueId` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Search_history` (
    `userId` INTEGER NOT NULL,
    `keywords` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `searchHistoryId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Search_history_userId_fkey`(`userId`),
    PRIMARY KEY (`searchHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saved_place` (
    `id` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Saved_place_userId_fkey`(`userId`),
    INDEX `Saved_place_venueId_fkey`(`venueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member_tier` (
    `tier_name` VARCHAR(191) NOT NULL,
    `tier_benefit` VARCHAR(191) NOT NULL,
    `tierId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`tierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point` (
    `amount` INTEGER NOT NULL,
    `month_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount_used` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `pointId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Point_userId_fkey`(`userId`),
    PRIMARY KEY (`pointId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `voucher_name` VARCHAR(191) NOT NULL,
    `voucher_image` VARCHAR(191) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `point_use` INTEGER NULL,
    `venueId` INTEGER NOT NULL,
    `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL,
    `voucherId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Voucher_venueId_fkey`(`venueId`),
    PRIMARY KEY (`voucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount_voucher` (
    `fix_discount` INTEGER NULL,
    `percent_discount` DOUBLE NULL,
    `limitation` INTEGER NULL,
    `minimum_spend` INTEGER NULL,
    `voucherId` INTEGER NOT NULL,
    `discountVoucherId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Discount_voucher_voucherId_key`(`voucherId`),
    PRIMARY KEY (`discountVoucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food_voucher` (
    `limitation` INTEGER NULL,
    `minimum_spend` INTEGER NULL,
    `voucherId` INTEGER NOT NULL,
    `foodVoucherId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Food_voucher_voucherId_key`(`voucherId`),
    PRIMARY KEY (`foodVoucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_voucher` (
    `userId` INTEGER NOT NULL,
    `voucherId` INTEGER NOT NULL,

    INDEX `User_voucher_voucherId_fkey`(`voucherId`),
    PRIMARY KEY (`userId`, `voucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `General_questions` (
    `g_question` VARCHAR(191) NOT NULL,
    `generalQuestionId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`generalQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `General_answers` (
    `gQuestionId` INTEGER NOT NULL,
    `g_answer` VARCHAR(191) NOT NULL,
    `generalAnswerId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `General_answers_gQuestionId_key`(`gQuestionId`),
    PRIMARY KEY (`generalAnswerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate_general_questions` (
    `rateGeneralQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NOT NULL,
    `questionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Rate_general_questions_questionId_fkey`(`questionId`),
    INDEX `Rate_general_questions_userId_fkey`(`userId`),
    PRIMARY KEY (`rateGeneralQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_question` (
    `question` VARCHAR(191) NOT NULL,
    `venueId` INTEGER NOT NULL,
    `venueQuestionId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Venue_question_venueId_fkey`(`venueId`),
    PRIMARY KEY (`venueQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_answer` (
    `answer` VARCHAR(191) NOT NULL,
    `questionId` INTEGER NOT NULL,
    `venueAnswerId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Venue_answer_questionId_key`(`questionId`),
    PRIMARY KEY (`venueAnswerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate_venue_question` (
    `rateVenueQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NOT NULL,
    `vQuestionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Rate_venue_question_userId_fkey`(`userId`),
    INDEX `Rate_venue_question_vQuestionId_fkey`(`vQuestionId`),
    PRIMARY KEY (`rateVenueQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_room` (
    `roomname` VARCHAR(191) NOT NULL,
    `chatRoomId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`chatRoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_Room_Logs` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `chatRoomId` INTEGER NOT NULL,
    `access_status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Chat_Room_Logs_chatRoomId_fkey`(`chatRoomId`),
    INDEX `Chat_Room_Logs_userId_fkey`(`userId`),
    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `replyMessageId` INTEGER NULL,

    INDEX `Message_replyMessageId_fkey`(`replyMessageId`),
    INDEX `Message_roomId_fkey`(`roomId`),
    INDEX `Message_userId_fkey`(`userId`),
    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `userId` INTEGER NULL,
    `venueId` INTEGER NOT NULL,
    `order_date` DATETIME(3) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `addressId` INTEGER NULL,
    `branchId` INTEGER NOT NULL,
    `driverId` INTEGER NULL,
    `isDelivery` BOOLEAN NOT NULL DEFAULT false,
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `reservedId` INTEGER NULL,
    `status` ENUM('On_going', 'Completed') NOT NULL,

    UNIQUE INDEX `Orders_reservedId_key`(`reservedId`),
    INDEX `Orders_addressId_fkey`(`addressId`),
    INDEX `Orders_branchId_fkey`(`branchId`),
    INDEX `Orders_driverId_fkey`(`driverId`),
    INDEX `Orders_userId_fkey`(`userId`),
    INDEX `Orders_venueId_fkey`(`venueId`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_detail` (
    `orderDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `order_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `additional_req` VARCHAR(191) NULL,
    `orderId` INTEGER NOT NULL,
    `menuId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `setId` INTEGER NULL,

    INDEX `Order_detail_menuId_fkey`(`menuId`),
    INDEX `Order_detail_setId_fkey`(`setId`),
    PRIMARY KEY (`orderDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `venueId` INTEGER NOT NULL,
    `menu_no` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `menuId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Menu_venueId_fkey`(`venueId`),
    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `stockId` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`stockId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu_category` (
    `menuId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `Menu_category_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`menuId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu_category_list` (
    `menuCategoryListId` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menuCategoryListId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sets` (
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(5, 2) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `venueId` INTEGER NOT NULL,
    `setId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Sets_venueId_fkey`(`venueId`),
    PRIMARY KEY (`setId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Set_items` (
    `setItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `setId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    PRIMARY KEY (`setItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredients` (
    `ingredientId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_ingredients` (
    `menuId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    INDEX `menu_ingredients_ingredientId_fkey`(`ingredientId`),
    PRIMARY KEY (`menuId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food_reviews` (
    `foodReviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rating` DOUBLE NOT NULL,
    `review` VARCHAR(191) NULL,
    `date_added` DATETIME(3) NOT NULL,

    INDEX `Food_reviews_menuId_fkey`(`menuId`),
    INDEX `Food_reviews_userId_fkey`(`userId`),
    PRIMARY KEY (`foodReviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Complain_ticket` (
    `ComplainTicketId` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `topic` VARCHAR(191) NOT NULL,
    `complaint` TEXT NOT NULL,
    `ticket_status` ENUM('Pending', 'On_going', 'Completed', 'Dropped') NOT NULL,
    `ticket_priority` ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    `venueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    INDEX `Complain_ticket_teamId_fkey`(`teamId`),
    INDEX `Complain_ticket_userId_fkey`(`userId`),
    INDEX `Complain_ticket_venueId_fkey`(`venueId`),
    PRIMARY KEY (`ComplainTicketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket_responses` (
    `ticketResponseId` INTEGER NOT NULL AUTO_INCREMENT,
    `complainTicketId` INTEGER NOT NULL,
    `response_title` VARCHAR(191) NOT NULL,
    `response_detail` VARCHAR(191) NOT NULL,

    INDEX `Ticket_responses_complainTicketId_fkey`(`complainTicketId`),
    PRIMARY KEY (`ticketResponseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teams` (
    `teamId` INTEGER NOT NULL AUTO_INCREMENT,
    `team_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team_member` (
    `teamId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,

    INDEX `Team_member_adminId_fkey`(`adminId`),
    PRIMARY KEY (`teamId`, `adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_user` (
    `adminId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_notification_setting` (
    `adminId` INTEGER NOT NULL,
    `in_app` BOOLEAN NOT NULL DEFAULT false,
    `email` BOOLEAN NOT NULL DEFAULT false,
    `offers` BOOLEAN NOT NULL DEFAULT false,
    `updates` BOOLEAN NOT NULL DEFAULT false,
    `feedbacks` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_name` (
    `adminId` INTEGER NOT NULL,
    `fname` VARCHAR(191) NOT NULL,
    `lanem` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_privacy_policy` (
    `adminPrivacyPolicyId` INTEGER NOT NULL,
    `privacy_consent` BOOLEAN NOT NULL DEFAULT false,
    `cookie_consent` BOOLEAN NOT NULL DEFAULT false,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_privacy_policy_adminId_key`(`adminId`),
    PRIMARY KEY (`adminPrivacyPolicyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_system_access` (
    `adminSystemAccessId` INTEGER NOT NULL,
    `location_access` BOOLEAN NOT NULL DEFAULT false,
    `file_access` BOOLEAN NOT NULL DEFAULT false,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_system_access_adminId_key`(`adminId`),
    PRIMARY KEY (`adminSystemAccessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_terms_of_services` (
    `adminTermOfServiceId` INTEGER NOT NULL,
    `term_consent` BOOLEAN NOT NULL DEFAULT false,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_terms_of_services_adminId_key`(`adminId`),
    PRIMARY KEY (`adminTermOfServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `topic` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `created_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `category` ENUM('Review', 'Blog', 'Question') NOT NULL,
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(191) NULL,

    INDEX `Article_userId_fkey`(`userId`),
    PRIMARY KEY (`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article_venue` (
    `articleId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Article_venue_venueId_fkey`(`venueId`),
    PRIMARY KEY (`articleId`, `venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `url` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `articleId` INTEGER NOT NULL,
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Images_articleId_fkey`(`articleId`),
    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tag_name` VARCHAR(191) NOT NULL,
    `tagId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article_tags` (
    `tagId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    INDEX `Article_tags_articleId_fkey`(`articleId`),
    PRIMARY KEY (`tagId`, `articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `content` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Comments_articleId_fkey`(`articleId`),
    INDEX `Comments_userId_fkey`(`userId`),
    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment_like_by_creator` (
    `commentId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    INDEX `Comment_like_by_creator_articleId_fkey`(`articleId`),
    PRIMARY KEY (`commentId`, `articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `articleId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Like_userId_fkey`(`userId`),
    PRIMARY KEY (`articleId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `venueId` INTEGER NOT NULL,
    `guest_amount` INTEGER NOT NULL,
    `reserved_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Pending', 'Check_in', 'Check_out', 'Cancel') NOT NULL,
    `userId` INTEGER NOT NULL,
    `entry_time` DATETIME(3) NOT NULL,
    `isReview` BOOLEAN NOT NULL DEFAULT false,
    `reservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `depositId` INTEGER NOT NULL,
    `isPaidDeposit` ENUM('Pending', 'Completed') NOT NULL,

    UNIQUE INDEX `Reservation_depositId_key`(`depositId`),
    INDEX `Reservation_userId_fkey`(`userId`),
    INDEX `Reservation_venueId_fkey`(`venueId`),
    PRIMARY KEY (`reservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation_table` (
    `reservationTableId` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `reserveId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    INDEX `Reservation_table_reserveId_fkey`(`reserveId`),
    INDEX `Reservation_table_tableId_fkey`(`tableId`),
    PRIMARY KEY (`reservationTableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Share_reserve` (
    `link_or_qr` VARCHAR(191) NOT NULL,
    `reserveId` INTEGER NOT NULL,
    `shareReserveId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Share_reserve_reserveId_key`(`reserveId`),
    PRIMARY KEY (`shareReserveId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notes` (
    `detail` VARCHAR(191) NOT NULL,
    `reserveId` INTEGER NOT NULL,
    `noteId` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Notes_reserveId_key`(`reserveId`),
    PRIMARY KEY (`noteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposit` (
    `deposit_amount` DECIMAL(10, 2) NOT NULL,
    `depositId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,

    INDEX `Deposit_venueId_fkey`(`venueId`),
    PRIMARY KEY (`depositId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tables` (
    `venueId` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `information` TEXT NOT NULL,
    `tableId` INTEGER NOT NULL AUTO_INCREMENT,
    `tableTypeDetailId` INTEGER NOT NULL,

    INDEX `Tables_tableTypeDetailId_fkey`(`tableTypeDetailId`),
    INDEX `Tables_venueId_fkey`(`venueId`),
    PRIMARY KEY (`tableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_type_detail` (
    `capacity` INTEGER NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tableTypeDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,

    INDEX `Table_type_detail_venueId_fkey`(`venueId`),
    PRIMARY KEY (`tableTypeDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Check_in_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reserveId` INTEGER NOT NULL,
    `check_in_time` DATETIME(3) NOT NULL,
    `check_out_time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Check_in_log_reserveId_key`(`reserveId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommendation` (
    `userId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Recommendation_venueId_fkey`(`venueId`),
    PRIMARY KEY (`userId`, `venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `promotionId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `discount_price` DOUBLE NOT NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,
    `venueId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    INDEX `Promotion_menuId_fkey`(`menuId`),
    INDEX `Promotion_venueId_fkey`(`venueId`),
    PRIMARY KEY (`promotionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_business` (
    `advertisementId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL,
    `customer_type` ENUM('All', 'Member') NOT NULL,
    `target_group` ENUM('Teen', 'Young_adult', 'Adult', 'Elder') NOT NULL,
    `businessId` INTEGER NOT NULL,

    INDEX `Ad_business_businessId_fkey`(`businessId`),
    PRIMARY KEY (`advertisementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_tag` (
    `adId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    INDEX `Ad_tag_tagId_fkey`(`tagId`),
    PRIMARY KEY (`adId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `A_tag` (
    `tagId` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_outside` (
    `advertisementId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `ad_channel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`advertisementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_influencer` (
    `advertisementId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,

    PRIMARY KEY (`advertisementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_influ` (
    `advertisementId` INTEGER NOT NULL,
    `influencerId` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,

    INDEX `Ad_influ_influencerId_fkey`(`influencerId`),
    PRIMARY KEY (`advertisementId`, `influencerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Influencer` (
    `influencerId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `followers` INTEGER NULL,

    PRIMARY KEY (`influencerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business_user` (
    `businessId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`businessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `businessId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Property_venueId_fkey`(`venueId`),
    PRIMARY KEY (`businessId`, `venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business_finance` (
    `financeId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `profit` DOUBLE NOT NULL,

    INDEX `Business_finance_venueId_fkey`(`venueId`),
    PRIMARY KEY (`financeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Geocoding_cache` (
    `geocodingCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(191) NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,
    `result` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`geocodingCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_nearby_cache` (
    `nearbyCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `location` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`nearbyCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Geofence_cache` (
    `fenceCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `geofenceId` INTEGER NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,
    `geometry` LONGTEXT NOT NULL,

    PRIMARY KEY (`fenceCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Directions_cache` (
    `directionCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `origin` LONGTEXT NOT NULL,
    `destination` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`directionCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Elevation_cache` (
    `elevationCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `location` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`elevationCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Static_map_cache` (
    `staticCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `parameters` LONGTEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,
    `result` TEXT NOT NULL,

    PRIMARY KEY (`staticCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distance_matrix_cache` (
    `matrixCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `origins` LONGTEXT NOT NULL,
    `destinations` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`matrixCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_details_cache` (
    `detailCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `placeId` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`detailCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Route_details_cache` (
    `routeCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` LONGTEXT NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`routeCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `locationId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `latitude` DECIMAL(10, 6) NOT NULL,
    `longtitude` DECIMAL(10, 6) NOT NULL,
    `address` TEXT NOT NULL,

    PRIMARY KEY (`locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saved_location` (
    `locationId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `latitude` DECIMAL(10, 6) NOT NULL,
    `longtitude` DECIMAL(10, 6) NOT NULL,
    `address` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `Saved_location_userId_fkey`(`userId`),
    PRIMARY KEY (`locationId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saved_address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` INTEGER NOT NULL,
    `user_phone_num` VARCHAR(10) NOT NULL,
    `latitude` DECIMAL(10, 6) NOT NULL,
    `longtitude` DECIMAL(10, 6) NOT NULL,
    `address` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver_list` (
    `driverId` INTEGER NOT NULL AUTO_INCREMENT,
    `driver_first_name` VARCHAR(191) NOT NULL,
    `driver_last_name` VARCHAR(191) NOT NULL,
    `driver_phone_num` VARCHAR(191) NOT NULL,
    `driver_status` VARCHAR(191) NOT NULL,
    `driver_license_plate` VARCHAR(191) NOT NULL,
    `driver_rating` DECIMAL(65, 30) NOT NULL,
    `driver_vechile_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`driverId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver_reviews` (
    `driverReviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rating` DOUBLE NOT NULL,
    `review` VARCHAR(191) NULL,
    `date_added` DATETIME(3) NOT NULL,

    INDEX `Driver_reviews_driverId_fkey`(`driverId`),
    INDEX `Driver_reviews_userId_fkey`(`userId`),
    PRIMARY KEY (`driverReviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Transaction_userId_fkey`(`userId`),
    INDEX `Transaction_venueId_fkey`(`venueId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction_detail` (
    `transactionDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `total_amount` DECIMAL(65, 30) NOT NULL,
    `transactionId` INTEGER NOT NULL,

    UNIQUE INDEX `Transaction_detail_transactionId_key`(`transactionId`),
    PRIMARY KEY (`transactionDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_transaction` (
    `appTransactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,

    UNIQUE INDEX `App_transaction_transactionId_key`(`transactionId`),
    INDEX `App_transaction_venueId_fkey`(`venueId`),
    PRIMARY KEY (`appTransactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_transaction_detail` (
    `appTransactionDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NOT NULL,
    `monthly` TIMESTAMP(0) NOT NULL,
    `total_amount` DECIMAL(65, 30) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `appTransactionId` INTEGER NOT NULL,

    UNIQUE INDEX `App_transaction_detail_appTransactionId_key`(`appTransactionId`),
    PRIMARY KEY (`appTransactionDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_transaction` (
    `venueTransactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `advertiseId` INTEGER NOT NULL,

    UNIQUE INDEX `Venue_transaction_advertiseId_key`(`advertiseId`),
    INDEX `Venue_transaction_venueId_fkey`(`venueId`),
    PRIMARY KEY (`venueTransactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_transaction_detail` (
    `venueTransactionDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NOT NULL,
    `total_amount` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `venueTransactionId` INTEGER NOT NULL,

    UNIQUE INDEX `Venue_transaction_detail_venueTransactionId_key`(`venueTransactionId`),
    PRIMARY KEY (`venueTransactionDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `message` VARCHAR(191) NOT NULL,
    `appTransactionId` INTEGER NULL,
    `notificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `send_on` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `venueTransactionId` INTEGER NULL,

    INDEX `Notification_appTransactionId_fkey`(`appTransactionId`),
    INDEX `Notification_venueTransactionId_fkey`(`venueTransactionId`),
    PRIMARY KEY (`notificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credit_card` (
    `creditCardId` INTEGER NOT NULL AUTO_INCREMENT,
    `card_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `cvc` INTEGER NOT NULL,
    `exp` DATE NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Credit_card_userId_fkey`(`userId`),
    PRIMARY KEY (`creditCardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_credit_card` (
    `creditCardId` INTEGER NOT NULL AUTO_INCREMENT,
    `card_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `cvc` INTEGER NOT NULL,
    `exp` DATE NOT NULL,
    `venueId` INTEGER NOT NULL,

    INDEX `Venue_credit_card_venueId_fkey`(`venueId`),
    PRIMARY KEY (`creditCardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_promptpay` (
    `promptpayId` INTEGER NOT NULL AUTO_INCREMENT,
    `promptpay_no` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    UNIQUE INDEX `Venue_promptpay_venueId_key`(`venueId`),
    PRIMARY KEY (`promptpayId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Films` (
    `filmId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `genre` ENUM('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci_Fi', 'Thriller', 'War', 'Western', 'Documentary', 'Musical', 'Historical', 'Superhero', 'Family') NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `synopsis` TEXT NOT NULL,
    `release_date` DATE NOT NULL,
    `duration` DECIMAL(10, 2) NOT NULL,
    `poster_img` VARCHAR(191) NOT NULL,
    `rate` INTEGER NOT NULL,

    PRIMARY KEY (`filmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screens` (
    `screenId` INTEGER NOT NULL AUTO_INCREMENT,
    `theaterId` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `screen_type` ENUM('IMAX', 'X3D', 'X4D', 'Standard', 'Kids') NOT NULL,
    `screen_no` INTEGER NOT NULL,

    INDEX `Screens_theaterId_fkey`(`theaterId`),
    PRIMARY KEY (`screenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theaters` (
    `theaterId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone_num` VARCHAR(10) NOT NULL,
    `promptpay_num` VARCHAR(10) NOT NULL,
    `latitude` DECIMAL(20, 10) NOT NULL,
    `longitude` DECIMAL(20, 10) NOT NULL,

    PRIMARY KEY (`theaterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shows` (
    `showId` INTEGER NOT NULL AUTO_INCREMENT,
    `screenId` INTEGER NOT NULL,
    `filmId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIMESTAMP(0) NOT NULL,
    `end_time` TIMESTAMP(0) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    INDEX `Shows_filmId_fkey`(`filmId`),
    INDEX `Shows_screenId_fkey`(`screenId`),
    PRIMARY KEY (`showId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seats` (
    `seatId` INTEGER NOT NULL AUTO_INCREMENT,
    `screenId` INTEGER NOT NULL,
    `seatTypeId` INTEGER NOT NULL,
    `seat_row` INTEGER NOT NULL,
    `seat_no` INTEGER NOT NULL,

    INDEX `Seats_screenId_fkey`(`screenId`),
    INDEX `Seats_seatTypeId_fkey`(`seatTypeId`),
    PRIMARY KEY (`seatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat_types` (
    `seatTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price_modifier` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`seatTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation_logs` (
    `reservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `showId` INTEGER NOT NULL,
    `seatId` INTEGER NOT NULL,

    INDEX `Reservation_logs_seatId_fkey`(`seatId`),
    PRIMARY KEY (`reservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `payment_amount` DECIMAL(65, 30) NOT NULL,
    `payment_method` ENUM('Cash', 'Promptpay') NOT NULL,
    `payment_status` ENUM('Pending', 'Success', 'Canceled') NOT NULL,

    UNIQUE INDEX `Payments_reservationId_key`(`reservationId`),
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tierId_fkey` FOREIGN KEY (`tierId`) REFERENCES `Member_tier`(`tierId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_bio` ADD CONSTRAINT `User_bio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment_method` ADD CONSTRAINT `Payment_method_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification_setting` ADD CONSTRAINT `Notification_setting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `System_access` ADD CONSTRAINT `System_access_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Term_of_services` ADD CONSTRAINT `Term_of_services_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Privacy_policies` ADD CONSTRAINT `Privacy_policies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group_user` ADD CONSTRAINT `Group_user_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group_user` ADD CONSTRAINT `Group_user_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_firstUserId_fkey` FOREIGN KEY (`firstUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_sencondUserId_fkey` FOREIGN KEY (`sencondUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_branch` ADD CONSTRAINT `Venue_branch_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_reviews` ADD CONSTRAINT `Venue_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_reviews` ADD CONSTRAINT `Venue_reviews_venuId_fkey` FOREIGN KEY (`venuId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_managers` ADD CONSTRAINT `Venue_managers_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_keywords` ADD CONSTRAINT `Venue_keywords_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Opening_day` ADD CONSTRAINT `Opening_day_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_photo` ADD CONSTRAINT `Venue_photo_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Search_history` ADD CONSTRAINT `Search_history_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saved_place` ADD CONSTRAINT `Saved_place_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saved_place` ADD CONSTRAINT `Saved_place_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount_voucher` ADD CONSTRAINT `Discount_voucher_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`voucherId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_voucher` ADD CONSTRAINT `Food_voucher_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`voucherId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_voucher` ADD CONSTRAINT `User_voucher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_voucher` ADD CONSTRAINT `User_voucher_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`voucherId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `General_answers` ADD CONSTRAINT `General_answers_gQuestionId_fkey` FOREIGN KEY (`gQuestionId`) REFERENCES `General_questions`(`generalQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate_general_questions` ADD CONSTRAINT `Rate_general_questions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `General_questions`(`generalQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate_general_questions` ADD CONSTRAINT `Rate_general_questions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_question` ADD CONSTRAINT `Venue_question_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_answer` ADD CONSTRAINT `Venue_answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Venue_question`(`venueQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate_venue_question` ADD CONSTRAINT `Rate_venue_question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate_venue_question` ADD CONSTRAINT `Rate_venue_question_vQuestionId_fkey` FOREIGN KEY (`vQuestionId`) REFERENCES `Venue_question`(`venueQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room` ADD CONSTRAINT `Chat_room_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Venue`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_replyMessageId_fkey` FOREIGN KEY (`replyMessageId`) REFERENCES `Message`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Saved_address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver_list`(`driverId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_reservedId_fkey` FOREIGN KEY (`reservedId`) REFERENCES `Reservation`(`reservationId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Sets`(`setId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_category` ADD CONSTRAINT `Menu_category_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Menu_category_list`(`menuCategoryListId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_category` ADD CONSTRAINT `Menu_category_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sets` ADD CONSTRAINT `Sets_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set_items` ADD CONSTRAINT `Set_items_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set_items` ADD CONSTRAINT `Set_items_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Sets`(`setId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_ingredients` ADD CONSTRAINT `menu_ingredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredients`(`ingredientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_ingredients` ADD CONSTRAINT `menu_ingredients_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_reviews` ADD CONSTRAINT `Food_reviews_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_reviews` ADD CONSTRAINT `Food_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`teamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket_responses` ADD CONSTRAINT `Ticket_responses_complainTicketId_fkey` FOREIGN KEY (`complainTicketId`) REFERENCES `Complain_ticket`(`ComplainTicketId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team_member` ADD CONSTRAINT `Team_member_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team_member` ADD CONSTRAINT `Team_member_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`teamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_notification_setting` ADD CONSTRAINT `Admin_notification_setting_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_name` ADD CONSTRAINT `Admin_name_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_privacy_policy` ADD CONSTRAINT `Admin_privacy_policy_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_system_access` ADD CONSTRAINT `Admin_system_access_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_terms_of_services` ADD CONSTRAINT `Admin_terms_of_services_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`tagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`commentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`depositId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_table` ADD CONSTRAINT `Reservation_table_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_table` ADD CONSTRAINT `Reservation_table_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Tables`(`tableId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share_reserve` ADD CONSTRAINT `Share_reserve_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_tableTypeDetailId_fkey` FOREIGN KEY (`tableTypeDetailId`) REFERENCES `Table_type_detail`(`tableTypeDetailId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_type_detail` ADD CONSTRAINT `Table_type_detail_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Check_in_log` ADD CONSTRAINT `Check_in_log_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_business` ADD CONSTRAINT `Ad_business_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business_user`(`businessId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_tag` ADD CONSTRAINT `Ad_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `A_tag`(`tagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_advertisementId_fkey` FOREIGN KEY (`advertisementId`) REFERENCES `Ad_influencer`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad_influ` ADD CONSTRAINT `Ad_influ_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`influencerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business_user`(`businessId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business_finance` ADD CONSTRAINT `Business_finance_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saved_location` ADD CONSTRAINT `Saved_location_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`locationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saved_location` ADD CONSTRAINT `Saved_location_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver_reviews` ADD CONSTRAINT `Driver_reviews_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver_list`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver_reviews` ADD CONSTRAINT `Driver_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction_detail` ADD CONSTRAINT `Transaction_detail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction` ADD CONSTRAINT `App_transaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction` ADD CONSTRAINT `App_transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction_detail` ADD CONSTRAINT `App_transaction_detail_appTransactionId_fkey` FOREIGN KEY (`appTransactionId`) REFERENCES `App_transaction`(`appTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction` ADD CONSTRAINT `Venue_transaction_advertiseId_fkey` FOREIGN KEY (`advertiseId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction` ADD CONSTRAINT `Venue_transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction_detail` ADD CONSTRAINT `Venue_transaction_detail_venueTransactionId_fkey` FOREIGN KEY (`venueTransactionId`) REFERENCES `Venue_transaction`(`venueTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_appTransactionId_fkey` FOREIGN KEY (`appTransactionId`) REFERENCES `App_transaction`(`appTransactionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_venueTransactionId_fkey` FOREIGN KEY (`venueTransactionId`) REFERENCES `Venue_transaction`(`venueTransactionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit_card` ADD CONSTRAINT `Credit_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_credit_card` ADD CONSTRAINT `Venue_credit_card_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_promptpay` ADD CONSTRAINT `Venue_promptpay_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screens` ADD CONSTRAINT `Screens_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theaters`(`theaterId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shows` ADD CONSTRAINT `Shows_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Films`(`filmId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shows` ADD CONSTRAINT `Shows_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_seatTypeId_fkey` FOREIGN KEY (`seatTypeId`) REFERENCES `Seat_types`(`seatTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_logs` ADD CONSTRAINT `Reservation_logs_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seats`(`seatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation_logs`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
