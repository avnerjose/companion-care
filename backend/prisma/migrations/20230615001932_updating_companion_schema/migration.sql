/*
  Warnings:

  - You are about to drop the column `patientCpf` on the `Companion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Companion_patientCpf_key";

-- AlterTable
ALTER TABLE "Companion" DROP COLUMN "patientCpf";
