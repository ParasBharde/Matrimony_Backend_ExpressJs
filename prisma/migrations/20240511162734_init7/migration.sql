/*
  Warnings:

  - Added the required column `count` to the `View_Count` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "View_Count" ADD COLUMN     "count" BIGINT NOT NULL;
