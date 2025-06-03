/*
  Warnings:

  - Made the column `shortUrl` on table `URL` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "URL" ALTER COLUMN "shortUrl" SET NOT NULL;
