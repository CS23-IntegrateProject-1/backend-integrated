/*
  Warnings:

  - A unique constraint covering the columns `[phone_num]` on the table `Business_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Business_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Business_user` ADD COLUMN `email` VARCHAR(125) NULL,
    ADD COLUMN `fname` VARCHAR(191) NULL,
    ADD COLUMN `lname` VARCHAR(191) NULL,
    ADD COLUMN `phone_num` VARCHAR(10) NULL,
    ADD COLUMN `profile_picture` VARCHAR(191) NULL,
    ADD COLUMN `prompt_pay` INTEGER NULL;

-- AlterTable
ALTER TABLE `Food_reviews` ADD COLUMN `magnitude` DOUBLE NULL,
    ADD COLUMN `score` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Venue_reviews` ADD COLUMN `magnitude` DOUBLE NULL,
    ADD COLUMN `score` DOUBLE NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Business_user_phone_num_key` ON `Business_user`(`phone_num`);

-- CreateIndex
CREATE UNIQUE INDEX `Business_user_email_key` ON `Business_user`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `User`(`phone`);
