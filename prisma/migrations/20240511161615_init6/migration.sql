-- CreateTable
CREATE TABLE "View_Count" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "View_Count_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "View_Count" ADD CONSTRAINT "View_Count_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
