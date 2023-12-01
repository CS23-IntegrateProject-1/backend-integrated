/*
  Warnings:

  - You are about to drop the column `reviewType` on the `Venue_reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Venue_reviews` DROP COLUMN `reviewType`,
    ADD COLUMN `review_type` ENUM('Delivery', 'Reservation') NULL;
