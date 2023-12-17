/*
  Warnings:

  - You are about to drop the `Venue_photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Venue_photo` DROP FOREIGN KEY `Venue_photo_venueId_fkey`;

-- DropTable
DROP TABLE `Venue_photo`;
