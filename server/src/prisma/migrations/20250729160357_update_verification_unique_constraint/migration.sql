/*
  Warnings:

  - A unique constraint covering the columns `[userId,urlId,method]` on the table `UrlVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UrlVerification_userId_urlId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UrlVerification_userId_urlId_method_key" ON "UrlVerification"("userId", "urlId", "method");
