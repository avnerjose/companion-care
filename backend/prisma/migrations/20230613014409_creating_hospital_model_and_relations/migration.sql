/*
  Warnings:

  - Added the required column `hospitalCnpj` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalCnpj` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `sectorId` on table `Room` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hospitalCnpj` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_sectorId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "hospitalCnpj" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "hospitalCnpj" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "sectorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "hospitalCnpj" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Hospital" (
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("cnpj")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalCnpj_fkey" FOREIGN KEY ("hospitalCnpj") REFERENCES "Hospital"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalCnpj_fkey" FOREIGN KEY ("hospitalCnpj") REFERENCES "Hospital"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_hospitalCnpj_fkey" FOREIGN KEY ("hospitalCnpj") REFERENCES "Hospital"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
