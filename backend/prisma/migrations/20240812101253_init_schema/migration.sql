/*
  Warnings:

  - You are about to drop the column `time` on the `Data` table. All the data in the column will be lost.
  - Added the required column `year` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Data` DROP COLUMN `time`,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;
