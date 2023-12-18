-- CreateTable
CREATE TABLE `Report_ticket` (
    `reportTicketId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NULL,
    `bussinessId` INTEGER NOT NULL,

    PRIMARY KEY (`reportTicketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Help_desk` (
    `reportTicketId` INTEGER NOT NULL,
    `assign_to` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`reportTicketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion_approval` (
    `promotionId` INTEGER NOT NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`promotionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report_ticket` ADD CONSTRAINT `Report_ticket_bussinessId_fkey` FOREIGN KEY (`bussinessId`) REFERENCES `Business_user`(`businessId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Help_desk` ADD CONSTRAINT `Help_desk_reportTicketId_fkey` FOREIGN KEY (`reportTicketId`) REFERENCES `Report_ticket`(`reportTicketId`) ON DELETE RESTRICT ON UPDATE CASCADE;
