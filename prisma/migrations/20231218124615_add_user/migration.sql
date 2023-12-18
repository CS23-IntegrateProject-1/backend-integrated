/*
  Warnings:

  - Added the required column `userId` to the `Reservation_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation_logs` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Venue_reviews` ADD COLUMN `review_type` ENUM('Delivery', 'Reservation') NULL;

-- AddForeignKey
ALTER TABLE `Reservation_logs` ADD CONSTRAINT `Reservation_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
