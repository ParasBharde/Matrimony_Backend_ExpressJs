-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contact_number" TEXT NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT,
    "city" TEXT NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "weight" INTEGER,
    "color" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "cast_or_community" TEXT NOT NULL,
    "mother_tongue" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "dietary_preference" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "mother_occupation" TEXT NOT NULL,
    "father_occupation" TEXT NOT NULL,
    "mother_native" TEXT NOT NULL,
    "father_native" TEXT NOT NULL,
    "family_contact_no" TEXT NOT NULL,
    "number_of_siblings" INTEGER NOT NULL,
    "brother" INTEGER NOT NULL DEFAULT 0,
    "sister" INTEGER NOT NULL DEFAULT 0,
    "father" BOOLEAN DEFAULT false,
    "mother" BOOLEAN DEFAULT false,
    "zodiac_sign" TEXT NOT NULL,
    "birth_time" TEXT NOT NULL,
    "birth_place" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile_Image" (
    "id" SERIAL NOT NULL,
    "profile_img" TEXT NOT NULL,
    "userProfileImgId" INTEGER NOT NULL,

    CONSTRAINT "Profile_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horoscopic_Image" (
    "id" SERIAL NOT NULL,
    "horoscope_img" TEXT NOT NULL,
    "userHoroscopeImgId" INTEGER NOT NULL,

    CONSTRAINT "Horoscopic_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" SERIAL NOT NULL,
    "plan_name" TEXT NOT NULL,
    "plan_desc1" TEXT NOT NULL,
    "plan_desc2" TEXT NOT NULL,
    "plan_desc3" TEXT,
    "plan_price" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Active_Plan" (
    "id" SERIAL NOT NULL,
    "activeUserId" INTEGER NOT NULL,
    "activePlanId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "member_disply_limit" INTEGER NOT NULL DEFAULT 0,
    "viwed_profile" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Active_Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_number_key" ON "User"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_family_contact_no_key" ON "User"("family_contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_Image_userProfileImgId_key" ON "Profile_Image"("userProfileImgId");

-- CreateIndex
CREATE UNIQUE INDEX "Horoscopic_Image_userHoroscopeImgId_key" ON "Horoscopic_Image"("userHoroscopeImgId");

-- CreateIndex
CREATE UNIQUE INDEX "Active_Plan_activeUserId_key" ON "Active_Plan"("activeUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Active_Plan_activePlanId_key" ON "Active_Plan"("activePlanId");

-- AddForeignKey
ALTER TABLE "Profile_Image" ADD CONSTRAINT "Profile_Image_userProfileImgId_fkey" FOREIGN KEY ("userProfileImgId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horoscopic_Image" ADD CONSTRAINT "Horoscopic_Image_userHoroscopeImgId_fkey" FOREIGN KEY ("userHoroscopeImgId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Active_Plan" ADD CONSTRAINT "Active_Plan_activeUserId_fkey" FOREIGN KEY ("activeUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Active_Plan" ADD CONSTRAINT "Active_Plan_activePlanId_fkey" FOREIGN KEY ("activePlanId") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
