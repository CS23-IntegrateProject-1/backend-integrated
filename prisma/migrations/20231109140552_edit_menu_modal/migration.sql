/*
  Warnings:

  - You are about to alter the column `monthly` on the `App_transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Directions_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Distance_matrix_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Elevation_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Geocoding_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Geofence_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `venue_branchBranchId` on the `Menu` table. All the data in the column will be lost.
  - You are about to alter the column `order_time` on the `Order_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Place_details_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Place_nearby_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Route_details_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Saved_address` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Saved_location` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `start_time` on the `Shows` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `end_time` on the `Shows` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Static_map_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_venue_branchBranchId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_appTransactionId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_venueTransactionId_fkey`;

-- AlterTable
ALTER TABLE `App_transaction_detail` MODIFY `monthly` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Directions_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Distance_matrix_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Elevation_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Geocoding_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Geofence_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `venue_branchBranchId`;

-- AlterTable
ALTER TABLE `Notification` MODIFY `appTransactionId` INTEGER NULL,
    MODIFY `venueTransactionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order_detail` MODIFY `order_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Place_details_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Place_nearby_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Route_details_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Saved_address` MODIFY `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Saved_location` MODIFY `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Shows` MODIFY `start_time` TIMESTAMP NOT NULL,
    MODIFY `end_time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Static_map_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_appTransactionId_fkey` FOREIGN KEY (`appTransactionId`) REFERENCES `App_transaction`(`appTransactionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_venueTransactionId_fkey` FOREIGN KEY (`venueTransactionId`) REFERENCES `Venue_transaction`(`venueTransactionId`) ON DELETE SET NULL ON UPDATE CASCADE;
