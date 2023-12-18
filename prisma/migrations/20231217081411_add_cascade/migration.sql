-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_reservedId_fkey`;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_reservedId_fkey` FOREIGN KEY (`reservedId`) REFERENCES `Reservation`(`reservationId`) ON DELETE CASCADE ON UPDATE CASCADE;
