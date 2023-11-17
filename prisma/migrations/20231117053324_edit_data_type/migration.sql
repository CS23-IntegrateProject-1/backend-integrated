-- AlterTable
ALTER TABLE `Ad_business` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Ad_influencer` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Ad_outside` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Films` MODIFY `poster_img` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Images` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Promotion` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Sets` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Table_type_detail` MODIFY `image_url` TEXT NULL;

-- AlterTable
ALTER TABLE `Venue` MODIFY `website_url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Venue_photo` MODIFY `image_url` TEXT NULL;
