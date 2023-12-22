-- AlterTable
ALTER TABLE `Chat_Room_Logs` ADD COLUMN `reservationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Chat_Room_Logs` ADD CONSTRAINT `Chat_Room_Logs_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`reservationId`) ON DELETE SET NULL ON UPDATE CASCADE;
