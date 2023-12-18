-- AddForeignKey
ALTER TABLE `Venue_photo` ADD CONSTRAINT `Venue_photo_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;
