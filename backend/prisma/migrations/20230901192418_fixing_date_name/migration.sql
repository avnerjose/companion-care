/*
  Warnings:

  - You are about to drop the column `expiryData` on the `VerificationCode` table. All the data in the column will be lost.
  - Added the required column `expiryDate` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "expiryData",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;
