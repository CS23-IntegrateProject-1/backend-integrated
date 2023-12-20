-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `isPaymentSuccess` ENUM('Completed', 'Pending') NOT NULL DEFAULT 'Pending';
