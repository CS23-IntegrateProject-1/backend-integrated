-- AddForeignKey
ALTER TABLE `Venue` ADD CONSTRAINT `Venue_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`locationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
