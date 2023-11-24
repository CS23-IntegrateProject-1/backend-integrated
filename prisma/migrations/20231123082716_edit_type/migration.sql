/*
  Warnings:

  - You are about to alter the column `isApprove` on the `Notfication_ad_business` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(17))`.

*/
-- AlterTable
ALTER TABLE `Notfication_ad_business` MODIFY `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL DEFAULT 'In_progress';
