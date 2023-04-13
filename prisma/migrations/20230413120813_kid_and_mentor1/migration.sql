-- CreateTable
CREATE TABLE "Kid" (
    "id" TEXT NOT NULL,
    "kidName" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "Kid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "mentorName" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kid_appId_key" ON "Kid"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_appId_key" ON "Mentor"("appId");

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
