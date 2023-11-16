-- AlterTable
ALTER TABLE `Order_detail` MODIFY `status` ENUM('On_going', 'Completed') NOT NULL DEFAULT 'On_going';

-- AlterTable
ALTER TABLE `Orders` MODIFY `status` ENUM('On_going', 'Completed') NOT NULL DEFAULT 'On_going';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `prompt_pay` INTEGER NULL;
