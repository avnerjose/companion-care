-- AlterTable
ALTER TABLE "HospitalProcedure" ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "hospitalProcedureId" INTEGER NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_hospitalProcedureId_fkey" FOREIGN KEY ("hospitalProcedureId") REFERENCES "HospitalProcedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
