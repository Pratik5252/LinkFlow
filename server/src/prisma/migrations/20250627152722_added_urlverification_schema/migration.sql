-- CreateEnum
CREATE TYPE "VerificationMethod" AS ENUM ('meta', 'html', 'dns');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'FAILED');

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "analyticsEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UrlVerification" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "method" "VerificationMethod" NOT NULL,
    "code" TEXT NOT NULL,
    "status" "VerificationStatus" NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "lastCheckTime" TIMESTAMP(3),

    CONSTRAINT "UrlVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UrlVerification" ADD CONSTRAINT "UrlVerification_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlVerification" ADD CONSTRAINT "UrlVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
