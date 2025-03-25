-- CreateTable
CREATE TABLE "Pass" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "passDetails" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pass_pkey" PRIMARY KEY ("id")
);
