/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptrionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSubscriptrionId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "stripeSubscriptrionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeSubscriptrionId_key" ON "Payment"("stripeSubscriptrionId");
