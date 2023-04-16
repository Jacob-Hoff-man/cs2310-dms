-- DropForeignKey
ALTER TABLE "kids" DROP CONSTRAINT "kids_appId_fkey";

-- DropForeignKey
ALTER TABLE "mentors" DROP CONSTRAINT "mentors_appId_fkey";

-- AddForeignKey
ALTER TABLE "kids" ADD CONSTRAINT "kids_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentors" ADD CONSTRAINT "mentors_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
