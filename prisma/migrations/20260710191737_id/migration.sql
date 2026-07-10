-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "stripeCustomerId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptrionId" DROP NOT NULL;
