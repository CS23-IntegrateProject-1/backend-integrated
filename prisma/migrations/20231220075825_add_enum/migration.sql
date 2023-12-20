-- AlterTable
ALTER TABLE `Online_orders` MODIFY `status` ENUM('On_going', 'Completed', 'Canceled') NOT NULL DEFAULT 'On_going';

-- AlterTable
ALTER TABLE `Online_orders_detail` MODIFY `status` ENUM('On_going', 'Completed', 'Canceled') NOT NULL DEFAULT 'On_going';

-- AlterTable
ALTER TABLE `Orders` MODIFY `status` ENUM('On_going', 'Completed', 'Canceled') NOT NULL DEFAULT 'On_going';
