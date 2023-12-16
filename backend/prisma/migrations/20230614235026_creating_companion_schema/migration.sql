-- CreateTable
CREATE TABLE "Companion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "patientCpf" TEXT NOT NULL,

    CONSTRAINT "Companion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companion_patientCpf_key" ON "Companion"("patientCpf");

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_patientCpf_fkey" FOREIGN KEY ("patientCpf") REFERENCES "Patient"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
