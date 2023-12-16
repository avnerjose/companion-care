-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiryData" TIMESTAMP(3) NOT NULL,
    "companionId" INTEGER NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_companionId_key" ON "VerificationCode"("companionId");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Companion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
