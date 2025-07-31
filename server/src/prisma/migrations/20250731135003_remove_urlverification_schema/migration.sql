/*
  Warnings:

  - You are about to drop the `UrlVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UrlVerification" DROP CONSTRAINT "UrlVerification_urlId_fkey";

-- DropForeignKey
ALTER TABLE "UrlVerification" DROP CONSTRAINT "UrlVerification_userId_fkey";

-- DropTable
DROP TABLE "UrlVerification";

-- DropEnum
DROP TYPE "VerificationMethod";

-- DropEnum
DROP TYPE "VerificationStatus";
