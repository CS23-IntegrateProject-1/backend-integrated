/*
  Warnings:

  - You are about to alter the column `monthly` on the `App_transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `reserveId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Deposit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(10))`.
  - You are about to alter the column `expiration` on the `Directions_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Distance_matrix_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Elevation_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Geocoding_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Geofence_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `order_time` on the `Order_detail` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Place_details_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Place_nearby_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Route_details_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Saved_address` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Saved_location` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `start_time` on the `Shows` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `end_time` on the `Shows` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `expiration` on the `Static_map_cache` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[depositId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `venueId` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Deposit` DROP FOREIGN KEY `Deposit_reserveId_fkey`;

-- AlterTable
ALTER TABLE `App_transaction_detail` MODIFY `monthly` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Deposit` DROP COLUMN `reserveId`,
    ADD COLUMN `venueId` INTEGER NOT NULL,
    MODIFY `status` ENUM('Pending', 'Completed') NOT NULL;

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
ALTER TABLE `Order_detail` MODIFY `order_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Place_details_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Place_nearby_cache` MODIFY `expiration` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `depositId` INTEGER NOT NULL;

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

-- CreateTable
CREATE TABLE `Article_venue` (
    `articleId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,

    PRIMARY KEY (`articleId`, `venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_depositId_key` ON `Reservation`(`depositId`);

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_venue` ADD CONSTRAINT `Article_venue_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`depositId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;
