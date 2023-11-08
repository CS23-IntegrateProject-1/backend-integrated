/*
  Warnings:

  - The primary key for the `About_app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `About_app` table. All the data in the column will be lost.
  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Article` table. All the data in the column will be lost.
  - The primary key for the `Chat_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `isCheckIn` on the `Check_in_log` table. All the data in the column will be lost.
  - The primary key for the `Comment_like_by_creator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comment_like_by_creator` table. All the data in the column will be lost.
  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_date` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `isReply` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Deposit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Deposit` table. All the data in the column will be lost.
  - The primary key for the `Discount_voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Discount_voucher` table. All the data in the column will be lost.
  - The primary key for the `Food_voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Food_voucher` table. All the data in the column will be lost.
  - The primary key for the `General_answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `General_answers` table. All the data in the column will be lost.
  - The primary key for the `General_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `General_questions` table. All the data in the column will be lost.
  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Images` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `isLike` on the `Like` table. All the data in the column will be lost.
  - The primary key for the `Member_tier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Member_tier` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Member_tier` table. All the data in the column will be lost.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Menu` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notes` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `notification_type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Opening_day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fri` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `mon` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `sat` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `sun` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `thu` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `tue` on the `Opening_day` table. All the data in the column will be lost.
  - You are about to drop the column `wed` on the `Opening_day` table. All the data in the column will be lost.
  - The primary key for the `Order_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Order_detail` table. All the data in the column will be lost.
  - You are about to alter the column `order_time` on the `Order_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `Orders` table. All the data in the column will be lost.
  - The primary key for the `Payment_method` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Payment_method` table. All the data in the column will be lost.
  - The values [QR] on the enum `Payment_method_method` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Point` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Point` table. All the data in the column will be lost.
  - The primary key for the `Privacy_policies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Privacy_policies` table. All the data in the column will be lost.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Reservation` table. All the data in the column will be lost.
  - The values [On_going,Complete] on the enum `Reservation_status` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Search_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Search_history` table. All the data in the column will be lost.
  - The primary key for the `Sets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Sets` table. All the data in the column will be lost.
  - The primary key for the `Share_reserve` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Share_reserve` table. All the data in the column will be lost.
  - You are about to drop the column `phone_access` on the `System_access` table. All the data in the column will be lost.
  - The primary key for the `Table_type_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Table_type_detail` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Table_type_detail` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Table_type_detail` table. All the data in the column will be lost.
  - The primary key for the `Tables` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tables` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tables` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `Term_of_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Term_of_services` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatRoomId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phonenum` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Venue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `banking_type` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `opening_status` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Venue` table. All the data in the column will be lost.
  - The primary key for the `Venue_answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venue_answer` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Venue_answer` table. All the data in the column will be lost.
  - The primary key for the `Venue_contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Venue_contacts` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Venue_contacts` table. All the data in the column will be lost.
  - The primary key for the `Venue_managers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `middle_name` on the `Venue_managers` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `Venue_managers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - The primary key for the `Venue_question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venue_question` table. All the data in the column will be lost.
  - The primary key for the `Venue_reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venue_reviews` table. All the data in the column will be lost.
  - The primary key for the `Voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the `Advertisement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business_royal_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu_ordered` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sets_ordered` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venue_overviews` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reservedId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menuId]` on the table `Set_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chatRoomId]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId]` on the table `Venue_answer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[venueId]` on the table `Venue_managers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aboutAppId` to the `About_app` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatRoomId` to the `Chat_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositId` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountVoucherId` to the `Discount_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodVoucherId` to the `Food_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalAnswerId` to the `General_answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalQuestionId` to the `General_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tierId` to the `Member_tier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `Notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appTransactionId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `send_on` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueTransactionId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_hours` to the `Opening_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Opening_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingDayId` to the `Opening_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_hours` to the `Opening_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Opening_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointId` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entry_time` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `searchHistoryId` to the `Search_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setId` to the `Sets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareReserveId` to the `Share_reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Table_type_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Table_type_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableTypeDetailId` to the `Table_type_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Table_type_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `information` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableTypeDetailId` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatRoomId` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_url` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueAnswerId` to the `Venue_answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Venue_contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `Venue_contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Venue_contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SSN` to the `Venue_managers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Venue_question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueQuestionId` to the `Venue_question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueReviewId` to the `Venue_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Advertisement` DROP FOREIGN KEY `Advertisement_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_tags` DROP FOREIGN KEY `Article_tags_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Article_tags` DROP FOREIGN KEY `Article_tags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `Business_royal_member` DROP FOREIGN KEY `Business_royal_member_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Business_royal_member` DROP FOREIGN KEY `Business_royal_member_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_room` DROP FOREIGN KEY `Chat_room_venueId_fkey`;

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
ALTER TABLE `Deposit` DROP FOREIGN KEY `Deposit_reserveId_fkey`;

-- DropForeignKey
ALTER TABLE `Discount_voucher` DROP FOREIGN KEY `Discount_voucher_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Food_voucher` DROP FOREIGN KEY `Food_voucher_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `General_answers` DROP FOREIGN KEY `General_answers_gQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Member_tier` DROP FOREIGN KEY `Member_tier_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu_ordered` DROP FOREIGN KEY `Menu_ordered_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu_ordered` DROP FOREIGN KEY `Menu_ordered_orderDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notes` DROP FOREIGN KEY `Notes_reserveId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification_setting` DROP FOREIGN KEY `Notification_setting_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_detail` DROP FOREIGN KEY `Order_detail_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment_method` DROP FOREIGN KEY `Payment_method_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Point` DROP FOREIGN KEY `Point_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Privacy_policies` DROP FOREIGN KEY `Privacy_policies_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Recommendation` DROP FOREIGN KEY `Recommendation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Recommendation` DROP FOREIGN KEY `Recommendation_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Saved_place` DROP FOREIGN KEY `Saved_place_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Saved_place` DROP FOREIGN KEY `Saved_place_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Search_history` DROP FOREIGN KEY `Search_history_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Set_items` DROP FOREIGN KEY `Set_items_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `Set_items` DROP FOREIGN KEY `Set_items_setId_fkey`;

-- DropForeignKey
ALTER TABLE `Sets` DROP FOREIGN KEY `Sets_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Sets_ordered` DROP FOREIGN KEY `Sets_ordered_orderDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `Sets_ordered` DROP FOREIGN KEY `Sets_ordered_setId_fkey`;

-- DropForeignKey
ALTER TABLE `Share_reserve` DROP FOREIGN KEY `Share_reserve_reserveId_fkey`;

-- DropForeignKey
ALTER TABLE `System_access` DROP FOREIGN KEY `System_access_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Table_type_detail` DROP FOREIGN KEY `Table_type_detail_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `Tables` DROP FOREIGN KEY `Tables_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Term_of_services` DROP FOREIGN KEY `Term_of_services_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `User_bio` DROP FOREIGN KEY `User_bio_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User_voucher` DROP FOREIGN KEY `User_voucher_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User_voucher` DROP FOREIGN KEY `User_voucher_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue` DROP FOREIGN KEY `Venue_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_answer` DROP FOREIGN KEY `Venue_answer_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_answer` DROP FOREIGN KEY `Venue_answer_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_contacts` DROP FOREIGN KEY `Venue_contacts_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_keywords` DROP FOREIGN KEY `Venue_keywords_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_managers` DROP FOREIGN KEY `Venue_managers_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_overviews` DROP FOREIGN KEY `Venue_overviews_openingDayId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_overviews` DROP FOREIGN KEY `Venue_overviews_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_photo` DROP FOREIGN KEY `Venue_photo_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_reviews` DROP FOREIGN KEY `Venue_reviews_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Venue_reviews` DROP FOREIGN KEY `Venue_reviews_venuId_fkey`;

-- DropForeignKey
ALTER TABLE `Voucher` DROP FOREIGN KEY `Voucher_venueId_fkey`;

-- AlterTable
ALTER TABLE `About_app` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `aboutAppId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`aboutAppId`);

-- AlterTable
ALTER TABLE `Article` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `venueId`,
    ADD COLUMN `articleId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `author_name` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`articleId`);

-- AlterTable
ALTER TABLE `Chat_room` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `venueId`,
    ADD COLUMN `chatRoomId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`chatRoomId`);

-- AlterTable
ALTER TABLE `Check_in_log` DROP COLUMN `isCheckIn`;

-- AlterTable
ALTER TABLE `Comment_like_by_creator` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`commentId`, `articleId`);

-- AlterTable
ALTER TABLE `Comments` DROP PRIMARY KEY,
    DROP COLUMN `created_date`,
    DROP COLUMN `id`,
    DROP COLUMN `isReply`,
    ADD COLUMN `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`commentId`);

-- AlterTable
ALTER TABLE `Deposit` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `depositId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`depositId`);

-- AlterTable
ALTER TABLE `Discount_voucher` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `discountVoucherId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`discountVoucherId`);

-- AlterTable
ALTER TABLE `Food_voucher` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `foodVoucherId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`foodVoucherId`);

-- AlterTable
ALTER TABLE `General_answers` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `generalAnswerId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`generalAnswerId`);

-- AlterTable
ALTER TABLE `General_questions` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `generalQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`generalQuestionId`);

-- AlterTable
ALTER TABLE `Images` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`imageId`);

-- AlterTable
ALTER TABLE `Like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `isLike`,
    ADD PRIMARY KEY (`articleId`, `userId`);

-- AlterTable
ALTER TABLE `Member_tier` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `tierId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tierId`);

-- AlterTable
ALTER TABLE `Menu` DROP PRIMARY KEY,
    DROP COLUMN `category`,
    DROP COLUMN `id`,
    DROP COLUMN `image_url`,
    DROP COLUMN `stock`,
    ADD COLUMN `branchId` INTEGER NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `isAvailiable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `menuId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`menuId`);

-- AlterTable
ALTER TABLE `Message` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `replyMessageId` INTEGER NULL,
    ADD PRIMARY KEY (`messageId`);

-- AlterTable
ALTER TABLE `Notes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `noteId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`noteId`);

-- AlterTable
ALTER TABLE `Notification` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `isRead`,
    DROP COLUMN `notification_type`,
    DROP COLUMN `timestamp`,
    DROP COLUMN `userId`,
    ADD COLUMN `appTransactionId` INTEGER NOT NULL,
    ADD COLUMN `notificationId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `send_on` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `venueTransactionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`notificationId`);

-- AlterTable
ALTER TABLE `Opening_day` DROP PRIMARY KEY,
    DROP COLUMN `fri`,
    DROP COLUMN `id`,
    DROP COLUMN `mon`,
    DROP COLUMN `sat`,
    DROP COLUMN `sun`,
    DROP COLUMN `thu`,
    DROP COLUMN `tue`,
    DROP COLUMN `wed`,
    ADD COLUMN `closing_hours` TIME NOT NULL,
    ADD COLUMN `day` ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun') NOT NULL,
    ADD COLUMN `openingDayId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `opening_hours` TIME NOT NULL,
    ADD COLUMN `venueId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`openingDayId`);

-- AlterTable
ALTER TABLE `Order_detail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `menuId` INTEGER NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `setId` INTEGER NULL,
    MODIFY `order_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `Orders` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `isComplete`,
    ADD COLUMN `addressId` INTEGER NOT NULL,
    ADD COLUMN `branchId` INTEGER NOT NULL,
    ADD COLUMN `driverId` INTEGER NULL,
    ADD COLUMN `isDelivery` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `reservedId` INTEGER NULL,
    ADD COLUMN `status` ENUM('On_going', 'Completed') NOT NULL,
    MODIFY `userId` INTEGER NULL,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `Payment_method` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `method` ENUM('Cash', 'Promptpay', 'Mobilebanking') NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `Point` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `pointId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`pointId`);

-- AlterTable
ALTER TABLE `Privacy_policies` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `Reservation` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `tableId`,
    ADD COLUMN `entry_time` DATETIME(3) NOT NULL,
    ADD COLUMN `isReview` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reservationId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('Pending', 'Check_in', 'Check_out', 'Cancel') NOT NULL,
    ADD PRIMARY KEY (`reservationId`);

-- AlterTable
ALTER TABLE `Search_history` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `searchHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`searchHistoryId`);

-- AlterTable
ALTER TABLE `Sets` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `setId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`setId`);

-- AlterTable
ALTER TABLE `Share_reserve` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `shareReserveId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`shareReserveId`);

-- AlterTable
ALTER TABLE `System_access` DROP COLUMN `phone_access`;

-- AlterTable
ALTER TABLE `Table_type_detail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `tableId`,
    DROP COLUMN `type`,
    ADD COLUMN `detail` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `tableTypeDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `venueId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`tableTypeDetailId`);

-- AlterTable
ALTER TABLE `Tables` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `status`,
    ADD COLUMN `information` TEXT NOT NULL,
    ADD COLUMN `tableId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `tableTypeDetailId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`tableId`);

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `tagId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tagId`);

-- AlterTable
ALTER TABLE `Term_of_services` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `chatRoomId`,
    DROP COLUMN `id`,
    DROP COLUMN `phonenum`,
    DROP COLUMN `user_type`,
    ADD COLUMN `addId` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(10) NOT NULL,
    ADD COLUMN `tierId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `Venue` DROP PRIMARY KEY,
    DROP COLUMN `banking_type`,
    DROP COLUMN `id`,
    DROP COLUMN `opening_status`,
    DROP COLUMN `type`,
    DROP COLUMN `userId`,
    ADD COLUMN `chatRoomId` INTEGER NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `score` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `venueId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `website_url` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`venueId`);

-- AlterTable
ALTER TABLE `Venue_answer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `venueId`,
    ADD COLUMN `venueAnswerId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`venueAnswerId`);

-- AlterTable
ALTER TABLE `Venue_contacts` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `type` ENUM('Email', 'Phone') NOT NULL,
    ADD PRIMARY KEY (`contactId`);

-- AlterTable
ALTER TABLE `Venue_managers` DROP PRIMARY KEY,
    DROP COLUMN `middle_name`,
    ADD COLUMN `SSN` VARCHAR(10) NOT NULL,
    MODIFY `phone` VARCHAR(10) NULL,
    ADD PRIMARY KEY (`SSN`);

-- AlterTable
ALTER TABLE `Venue_question` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `venueId` INTEGER NOT NULL,
    ADD COLUMN `venueQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`venueQuestionId`);

-- AlterTable
ALTER TABLE `Venue_reviews` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `venueReviewId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`venueReviewId`);

-- AlterTable
ALTER TABLE `Voucher` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `isApprove` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `voucherId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`voucherId`);

-- DropTable
DROP TABLE `Advertisement`;

-- DropTable
DROP TABLE `Business_royal_member`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `Menu_ordered`;

-- DropTable
DROP TABLE `Sets_ordered`;

-- DropTable
DROP TABLE `Ticket`;

-- DropTable
DROP TABLE `Venue_overviews`;

-- CreateTable
CREATE TABLE `Group_user` (
    `groupId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,

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

    PRIMARY KEY (`firstUserId`, `sencondUserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue_branch` (
    `branchId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `branch_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`branchId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate_general_questions` (
    `rateGeneralQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NOT NULL,
    `questionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`rateGeneralQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate_venue_question` (
    `rateVenueQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NOT NULL,
    `vQuestionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`rateVenueQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_Room_Logs` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `chatRoomId` INTEGER NOT NULL,
    `access_status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu_category` (
    `menuId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`menuId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu_category_list` (
    `menuCategoryListId` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menuCategoryListId`)
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

    PRIMARY KEY (`ComplainTicketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket_responses` (
    `ticketResponseId` INTEGER NOT NULL AUTO_INCREMENT,
    `complainTicketId` INTEGER NOT NULL,
    `response_title` VARCHAR(191) NOT NULL,
    `response_detail` VARCHAR(191) NOT NULL,

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
CREATE TABLE `Reservation_table` (
    `reservationTableId` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `reserveId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    PRIMARY KEY (`reservationTableId`)
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
    `isApprove` BOOLEAN NOT NULL DEFAULT false,
    `customer_type` ENUM('All', 'Member') NOT NULL,
    `target_group` ENUM('Teen', 'Young_adult', 'Adult', 'Elder') NOT NULL,
    `businessId` INTEGER NOT NULL,

    PRIMARY KEY (`advertisementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ad_tag` (
    `adId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

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

    PRIMARY KEY (`businessId`, `venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business_finance` (
    `financeId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `profit` DOUBLE NOT NULL,

    PRIMARY KEY (`financeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Geocoding_cache` (
    `geocodingCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(191) NOT NULL,
    `expiration` TIMESTAMP NOT NULL,
    `result` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`geocodingCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_nearby_cache` (
    `nearbyCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `location` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

    PRIMARY KEY (`nearbyCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Geofence_cache` (
    `fenceCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `geofenceId` INTEGER NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,
    `geometry` JSON NOT NULL,

    PRIMARY KEY (`fenceCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Directions_cache` (
    `directionCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `origin` JSON NOT NULL,
    `destination` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

    PRIMARY KEY (`directionCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Elevation_cache` (
    `elevationCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `location` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

    PRIMARY KEY (`elevationCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Static_map_cache` (
    `staticCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `parameters` JSON NOT NULL,
    `expiration` TIMESTAMP NOT NULL,
    `result` TEXT NOT NULL,

    PRIMARY KEY (`staticCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distance_matrix_cache` (
    `matrixCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `origins` JSON NOT NULL,
    `destinations` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

    PRIMARY KEY (`matrixCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place_details_cache` (
    `detailCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `placeId` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

    PRIMARY KEY (`detailCacheId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Route_details_cache` (
    `routeCacheId` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` JSON NOT NULL,
    `result` TEXT NOT NULL,
    `expiration` TIMESTAMP NOT NULL,

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
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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

    PRIMARY KEY (`driverReviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

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
    PRIMARY KEY (`appTransactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_transaction_detail` (
    `appTransactionDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NOT NULL,
    `monthly` TIMESTAMP NOT NULL,
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
CREATE TABLE `Credit_card` (
    `creditCardId` INTEGER NOT NULL AUTO_INCREMENT,
    `card_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `cvc` INTEGER NOT NULL,
    `exp` DATE NOT NULL,
    `userId` INTEGER NOT NULL,

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
    `synopsis` DATE NOT NULL,
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

    PRIMARY KEY (`screenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theaters` (
    `theaterId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone_num` VARCHAR(10) NOT NULL,
    `promptpay_num` VARCHAR(10) NOT NULL,
    `latitude` DECIMAL(10, 10) NOT NULL,
    `longtitude` DECIMAL(10, 10) NOT NULL,

    PRIMARY KEY (`theaterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shows` (
    `showId` INTEGER NOT NULL AUTO_INCREMENT,
    `screenId` INTEGER NOT NULL,
    `filmId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIMESTAMP NOT NULL,
    `end_time` TIMESTAMP NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`showId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seats` (
    `seatId` INTEGER NOT NULL AUTO_INCREMENT,
    `screenId` INTEGER NOT NULL,
    `seatTypeId` INTEGER NOT NULL,
    `seat_row` INTEGER NOT NULL,
    `seat_no` INTEGER NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX `Orders_reservedId_key` ON `Orders`(`reservedId`);

-- CreateIndex
CREATE UNIQUE INDEX `Set_items_menuId_key` ON `Set_items`(`menuId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_addId_key` ON `User`(`addId`);

-- CreateIndex
CREATE UNIQUE INDEX `Venue_locationId_key` ON `Venue`(`locationId`);

-- CreateIndex
CREATE UNIQUE INDEX `Venue_chatRoomId_key` ON `Venue`(`chatRoomId`);

-- CreateIndex
CREATE UNIQUE INDEX `Venue_answer_questionId_key` ON `Venue_answer`(`questionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Venue_managers_venueId_key` ON `Venue_managers`(`venueId`);

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
ALTER TABLE `Rate_venue_question` ADD CONSTRAINT `Rate_venue_question_vQuestionId_fkey` FOREIGN KEY (`vQuestionId`) REFERENCES `Venue_question`(`venueQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate_venue_question` ADD CONSTRAINT `Rate_venue_question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room` ADD CONSTRAINT `Chat_room_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Venue`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Chat_room`(`chatRoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_replyMessageId_fkey` FOREIGN KEY (`replyMessageId`) REFERENCES `Message`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver_list`(`driverId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Saved_address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_reservedId_fkey` FOREIGN KEY (`reservedId`) REFERENCES `Reservation`(`reservationId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Sets`(`setId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Venue_branch`(`branchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_category` ADD CONSTRAINT `Menu_category_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_category` ADD CONSTRAINT `Menu_category_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Menu_category_list`(`menuCategoryListId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sets` ADD CONSTRAINT `Sets_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set_items` ADD CONSTRAINT `Set_items_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Sets`(`setId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set_items` ADD CONSTRAINT `Set_items_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_ingredients` ADD CONSTRAINT `menu_ingredients_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_ingredients` ADD CONSTRAINT `menu_ingredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredients`(`ingredientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_reviews` ADD CONSTRAINT `Food_reviews_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_reviews` ADD CONSTRAINT `Food_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`teamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complain_ticket` ADD CONSTRAINT `Complain_ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket_responses` ADD CONSTRAINT `Ticket_responses_complainTicketId_fkey` FOREIGN KEY (`complainTicketId`) REFERENCES `Complain_ticket`(`ComplainTicketId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team_member` ADD CONSTRAINT `Team_member_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`teamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team_member` ADD CONSTRAINT `Team_member_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin_user`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Images` ADD CONSTRAINT `Images_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`tagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_tags` ADD CONSTRAINT `Article_tags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`commentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment_like_by_creator` ADD CONSTRAINT `Comment_like_by_creator_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_table` ADD CONSTRAINT `Reservation_table_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Tables`(`tableId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_table` ADD CONSTRAINT `Reservation_table_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share_reserve` ADD CONSTRAINT `Share_reserve_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_tableTypeDetailId_fkey` FOREIGN KEY (`tableTypeDetailId`) REFERENCES `Table_type_detail`(`tableTypeDetailId`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Driver_reviews` ADD CONSTRAINT `Driver_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver_reviews` ADD CONSTRAINT `Driver_reviews_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver_list`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction_detail` ADD CONSTRAINT `Transaction_detail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction` ADD CONSTRAINT `App_transaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction` ADD CONSTRAINT `App_transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_transaction_detail` ADD CONSTRAINT `App_transaction_detail_appTransactionId_fkey` FOREIGN KEY (`appTransactionId`) REFERENCES `App_transaction`(`appTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction` ADD CONSTRAINT `Venue_transaction_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction` ADD CONSTRAINT `Venue_transaction_advertiseId_fkey` FOREIGN KEY (`advertiseId`) REFERENCES `Ad_business`(`advertisementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_transaction_detail` ADD CONSTRAINT `Venue_transaction_detail_venueTransactionId_fkey` FOREIGN KEY (`venueTransactionId`) REFERENCES `Venue_transaction`(`venueTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_appTransactionId_fkey` FOREIGN KEY (`appTransactionId`) REFERENCES `App_transaction`(`appTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_venueTransactionId_fkey` FOREIGN KEY (`venueTransactionId`) REFERENCES `Venue_transaction`(`venueTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit_card` ADD CONSTRAINT `Credit_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_credit_card` ADD CONSTRAINT `Venue_credit_card_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venue_promptpay` ADD CONSTRAINT `Venue_promptpay_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screens` ADD CONSTRAINT `Screens_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theaters`(`theaterId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shows` ADD CONSTRAINT `Shows_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shows` ADD CONSTRAINT `Shows_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Films`(`filmId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_seatTypeId_fkey` FOREIGN KEY (`seatTypeId`) REFERENCES `Seat_types`(`seatTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_logs` ADD CONSTRAINT `Reservation_logs_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seats`(`seatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation_logs`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
