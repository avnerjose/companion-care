/*
  Warnings:

  - You are about to drop the column `patientCpf` on the `LocationRecord` table. All the data in the column will be lost.
  - Added the required column `hospitalProcedureId` to the `LocationRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LocationRecord" DROP CONSTRAINT "LocationRecord_patientCpf_fkey";

-- AlterTable
ALTER TABLE "LocationRecord" DROP COLUMN "patientCpf",
ADD COLUMN     "hospitalProcedureId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LocationRecord" ADD CONSTRAINT "LocationRecord_hospitalProcedureId_fkey" FOREIGN KEY ("hospitalProcedureId") REFERENCES "HospitalProcedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
