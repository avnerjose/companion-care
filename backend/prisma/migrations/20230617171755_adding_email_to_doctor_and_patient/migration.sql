/*
  Warnings:

  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_doctorCpf_fkey";

-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_patientCpf_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_doctorCpf_fkey" FOREIGN KEY ("doctorCpf") REFERENCES "Doctor"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_patientCpf_fkey" FOREIGN KEY ("patientCpf") REFERENCES "Patient"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
