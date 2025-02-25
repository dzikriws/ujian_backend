/*
  Warnings:

  - Added the required column `order_number` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proof_url` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('CASH', 'TRANSFER');

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "order_number" TEXT NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL,
ADD COLUMN     "proof_url" TEXT NOT NULL;
