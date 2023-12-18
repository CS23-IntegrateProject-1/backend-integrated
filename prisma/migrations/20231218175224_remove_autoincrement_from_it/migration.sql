-- AlterTable
ALTER TABLE `Films` MODIFY `filmId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Screens` MODIFY `screenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Seat_types` MODIFY `seatTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Seats` MODIFY `seatId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Shows` MODIFY `showId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Theaters` MODIFY `theaterId` INTEGER NOT NULL;
