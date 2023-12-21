/*
  Warnings:

  - The values [Sci_Fi] on the enum `Films_genre` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isPaymentSuccess` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Films` MODIFY `genre` ENUM('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'SciFi', 'Thriller', 'War', 'Western', 'Documentary', 'Musical', 'Historical', 'Superhero', 'Family') NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `isPaymentSuccess`;
