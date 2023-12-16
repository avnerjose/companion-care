-- CreateTable
CREATE TABLE "Patient" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_crm_key" ON "Doctor"("crm");
