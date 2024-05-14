/*
  Warnings:

  - You are about to drop the column `horoscope_img` on the `Horoscopic_Image` table. All the data in the column will be lost.
  - You are about to drop the column `profile_img` on the `Profile_Image` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileImgId` on the `Profile_Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userProfileId]` on the table `Profile_Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `horoscope_img_publicId` to the `Horoscopic_Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horoscope_img_url` to the `Horoscopic_Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_img_publicId` to the `Profile_Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_img_url` to the `Profile_Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Profile_Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile_Image" DROP CONSTRAINT "Profile_Image_userProfileImgId_fkey";

-- DropIndex
DROP INDEX "Profile_Image_userProfileImgId_key";

-- AlterTable
ALTER TABLE "Horoscopic_Image" DROP COLUMN "horoscope_img",
ADD COLUMN     "horoscope_img_publicId" TEXT NOT NULL,
ADD COLUMN     "horoscope_img_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile_Image" DROP COLUMN "profile_img",
DROP COLUMN "userProfileImgId",
ADD COLUMN     "profile_img_publicId" TEXT NOT NULL,
ADD COLUMN     "profile_img_url" TEXT NOT NULL,
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_Image_userProfileId_key" ON "Profile_Image"("userProfileId");

-- AddForeignKey
ALTER TABLE "Profile_Image" ADD CONSTRAINT "Profile_Image_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
