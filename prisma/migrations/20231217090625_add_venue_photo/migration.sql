-- CreateTable
CREATE TABLE `Venue_photo` (
    `venuePhotoId` INTEGER NOT NULL AUTO_INCREMENT,
    `venueId` INTEGER NOT NULL,
    `image_url` TEXT NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`venuePhotoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Venue_photo` ADD CONSTRAINT `Venue_photo_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`venueId`) ON DELETE RESTRICT ON UPDATE CASCADE;
