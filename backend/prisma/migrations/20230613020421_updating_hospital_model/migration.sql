/*
  Warnings:

  - You are about to drop the column `hospitalCnpj` on the `Doctor` table. All the data in the column will be lost.
  - The primary key for the `Hospital` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hospitalCnpj` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalCnpj` on the `Sector` table. All the data in the column will be lost.
  - Added the required column `hospitalId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_hospitalCnpj_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_hospitalCnpj_fkey";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_hospitalCnpj_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "hospitalCnpj",
ADD COLUMN     "hospitalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "hospitalCnpj",
ADD COLUMN     "hospitalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sector" DROP COLUMN "hospitalCnpj",
ADD COLUMN     "hospitalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
