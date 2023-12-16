/*
  Warnings:

  - The primary key for the `Doctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `doctorCpf` on the `HospitalProcedure` table. All the data in the column will be lost.
  - You are about to drop the column `patientCpf` on the `HospitalProcedure` table. All the data in the column will be lost.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[cpf]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sex` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `doctorId` to the `HospitalProcedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `HospitalProcedure` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sex` on the `Patient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('F', 'M');

-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_doctorCpf_fkey";

-- DropForeignKey
ALTER TABLE "HospitalProcedure" DROP CONSTRAINT "HospitalProcedure_patientCpf_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HospitalProcedure" DROP COLUMN "doctorCpf",
DROP COLUMN "patientCpf",
ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_cpf_key" ON "Doctor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_cnpj_key" ON "Hospital"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
