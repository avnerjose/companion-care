-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_companionId_fkey";

-- AlterTable
ALTER TABLE "HospitalProcedure" ALTER COLUMN "companionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Companion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
