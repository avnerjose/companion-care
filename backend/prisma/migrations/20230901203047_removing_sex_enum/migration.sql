/*
  Warnings:

  - Changed the type of `sex` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `Patient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Sex";
