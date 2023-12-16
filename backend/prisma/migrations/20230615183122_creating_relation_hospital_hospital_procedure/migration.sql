/*
  Warnings:

  - Added the required column `hospitalId` to the `HospitalProcedure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HospitalProcedure" ADD COLUMN     "hospitalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
