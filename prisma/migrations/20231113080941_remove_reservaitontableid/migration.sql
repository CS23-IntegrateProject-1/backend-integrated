/*
  Warnings:

  - The primary key for the `Reservation_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservationTableId` on the `Reservation_table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation_table` DROP PRIMARY KEY,
    DROP COLUMN `reservationTableId`,
    ADD PRIMARY KEY (`reserveId`, `tableId`);
