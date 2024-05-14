/*
  Warnings:

  - You are about to alter the column `count` on the `View_Count` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `view_profileId` to the `View_Count` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "View_Count" ADD COLUMN     "view_profileId" INTEGER NOT NULL,
ALTER COLUMN "count" SET DATA TYPE INTEGER;
