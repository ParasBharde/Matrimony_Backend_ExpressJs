/*
  Warnings:

  - Added the required column `user_id` to the `Download_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Liked_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Download_Profile" DROP CONSTRAINT "Download_Profile_download_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Liked_Profile" DROP CONSTRAINT "Liked_Profile_liked_profile_id_fkey";

-- AlterTable
ALTER TABLE "Download_Profile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Liked_Profile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Download_Profile" ADD CONSTRAINT "Download_Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked_Profile" ADD CONSTRAINT "Liked_Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
