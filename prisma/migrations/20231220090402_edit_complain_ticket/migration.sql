/*
  Warnings:

  - You are about to drop the column `teamId` on the `Complain_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_priority` on the `Complain_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_status` on the `Complain_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Complain_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `isApprove` on the `Ticket_responses` table. All the data in the column will be lost.
  - You are about to drop the column `response_detail` on the `Ticket_responses` table. All the data in the column will be lost.
  - You are about to drop the column `response_title` on the `Ticket_responses` table. All the data in the column will be lost.
  - You are about to drop the `Help_desk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report_ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Complain_ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Complain_ticket` DROP FOREIGN KEY `Complain_ticket_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `Complain_ticket` DROP FOREIGN KEY `Complain_ticket_venueId_fkey`;

-- DropForeignKey
ALTER TABLE `Help_desk` DROP FOREIGN KEY `Help_desk_reportTicketId_fkey`;

-- DropForeignKey
ALTER TABLE `Report_ticket` DROP FOREIGN KEY `Report_ticket_bussinessId_fkey`;

-- DropForeignKey
ALTER TABLE `Team_member` DROP FOREIGN KEY `Team_member_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Team_member` DROP FOREIGN KEY `Team_member_teamId_fkey`;

-- AlterTable
ALTER TABLE `Complain_ticket` DROP COLUMN `teamId`,
    DROP COLUMN `ticket_priority`,
    DROP COLUMN `ticket_status`,
    DROP COLUMN `venueId`,
    ADD COLUMN `status` ENUM('Pending', 'Completed') NOT NULL,
    ADD COLUMN `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Ticket_responses` DROP COLUMN `isApprove`,
    DROP COLUMN `response_detail`,
    DROP COLUMN `response_title`,
    ADD COLUMN `response` TEXT NULL;

-- DropTable
DROP TABLE `Help_desk`;

-- DropTable
DROP TABLE `Report_ticket`;

-- DropTable
DROP TABLE `Team_member`;

-- DropTable
DROP TABLE `Teams`;
