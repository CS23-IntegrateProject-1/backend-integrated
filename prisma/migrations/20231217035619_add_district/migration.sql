-- AlterTable
ALTER TABLE `Location` MODIFY `longtitude` DECIMAL(10, 6) NULL;

-- AlterTable
ALTER TABLE `User_voucher` ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `userSaved_location` ADD COLUMN `district` TEXT NULL,
    ADD COLUMN `postcode` TEXT NULL,
    ADD COLUMN `province` TEXT NULL,
    ADD COLUMN `sub_district` TEXT NULL;
