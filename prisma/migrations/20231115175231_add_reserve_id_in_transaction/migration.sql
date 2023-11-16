/*
  Warnings:

  - A unique constraint covering the columns `[reservedId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reserveId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserveId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order_detail` ADD COLUMN `status` ENUM('On_going', 'Completed') NOT NULL;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `reservedId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `reserveId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Orders_reservedId_key` ON `Orders`(`reservedId`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_reserveId_key` ON `Transaction`(`reserveId`);

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_reservedId_fkey` FOREIGN KEY (`reservedId`) REFERENCES `Reservation`(`reservationId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_reserveId_fkey` FOREIGN KEY (`reserveId`) REFERENCES `Reservation`(`reservationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
