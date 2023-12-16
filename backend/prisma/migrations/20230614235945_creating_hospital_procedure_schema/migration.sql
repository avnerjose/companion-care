-- DropForeignKey
ALTER TABLE "Companion" DROP CONSTRAINT "Companion_patientCpf_fkey";

-- CreateTable
CREATE TABLE "HospitalProcedure" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "doctorCpf" TEXT NOT NULL,
    "patientCpf" TEXT NOT NULL,
    "companionId" INTEGER NOT NULL,

    CONSTRAINT "HospitalProcedure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_doctorCpf_fkey" FOREIGN KEY ("doctorCpf") REFERENCES "Doctor"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_patientCpf_fkey" FOREIGN KEY ("patientCpf") REFERENCES "Patient"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Companion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
