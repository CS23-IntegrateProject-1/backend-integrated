-- AddForeignKey
ALTER TABLE `Reservation_logs` ADD CONSTRAINT `Reservation_logs_showId_fkey` FOREIGN KEY (`showId`) REFERENCES `Shows`(`showId`) ON DELETE RESTRICT ON UPDATE CASCADE;
