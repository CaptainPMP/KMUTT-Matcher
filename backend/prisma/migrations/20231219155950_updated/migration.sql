-- DropForeignKey
ALTER TABLE `mbti` DROP FOREIGN KEY `Mbti_userId_fkey`;

-- DropForeignKey
ALTER TABLE `socialmedia` DROP FOREIGN KEY `Socialmedia_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Socialmedia` ADD CONSTRAINT `Socialmedia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mbti` ADD CONSTRAINT `Mbti_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
