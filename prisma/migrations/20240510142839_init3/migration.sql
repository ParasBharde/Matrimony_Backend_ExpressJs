-- CreateTable
CREATE TABLE "Download_Profile" (
    "id" SERIAL NOT NULL,
    "download_profile_id" INTEGER NOT NULL,

    CONSTRAINT "Download_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liked_Profile" (
    "id" SERIAL NOT NULL,
    "liked_profile_id" INTEGER NOT NULL,

    CONSTRAINT "Liked_Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Download_Profile" ADD CONSTRAINT "Download_Profile_download_profile_id_fkey" FOREIGN KEY ("download_profile_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked_Profile" ADD CONSTRAINT "Liked_Profile_liked_profile_id_fkey" FOREIGN KEY ("liked_profile_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
