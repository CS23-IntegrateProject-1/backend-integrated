/*
  Warnings:

  - You are about to alter the column `isApprove` on the `Ad_business` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(12))`.
  - You are about to drop the column `status` on the `Deposit` table. All the data in the column will be lost.
  - You are about to alter the column `isApprove` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(12))`.
  - Added the required column `isPaidDeposit` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ad_business` MODIFY `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL;

-- AlterTable
ALTER TABLE `Deposit` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `isPaidDeposit` ENUM('Pending', 'Completed') NOT NULL;

-- AlterTable
ALTER TABLE `Voucher` MODIFY `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL;
