-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('KID', 'MENTOR');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "appType" "AppType" NOT NULL DEFAULT 'MENTOR',
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
