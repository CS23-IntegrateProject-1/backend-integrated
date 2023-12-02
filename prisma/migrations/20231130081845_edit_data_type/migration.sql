/*
  Warnings:

  - You are about to alter the column `isApprove` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.

*/
-- AlterTable
ALTER TABLE `Promotion` MODIFY `isApprove` ENUM('Rejected', 'In_progress', 'Completed') NOT NULL DEFAULT 'In_progress';
