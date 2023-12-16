-- CreateTable
CREATE TABLE "LocationRecord" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientCpf" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "LocationRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LocationRecord" ADD CONSTRAINT "LocationRecord_patientCpf_fkey" FOREIGN KEY ("patientCpf") REFERENCES "Patient"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationRecord" ADD CONSTRAINT "LocationRecord_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
