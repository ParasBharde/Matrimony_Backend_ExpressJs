/*
  Warnings:

  - You are about to drop the column `user_id` on the `Download_Profile` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Download_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Download_Profile" DROP CONSTRAINT "Download_Profile_user_id_fkey";

-- AlterTable
ALTER TABLE "Download_Profile" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Download_Profile" ADD CONSTRAINT "Download_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
