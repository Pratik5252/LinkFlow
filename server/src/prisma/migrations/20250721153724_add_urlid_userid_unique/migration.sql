/*
  Warnings:

  - A unique constraint covering the columns `[userId,urlId]` on the table `UrlVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UrlVerification_userId_urlId_key" ON "UrlVerification"("userId", "urlId");
