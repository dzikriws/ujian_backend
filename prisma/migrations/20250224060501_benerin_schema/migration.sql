/*
  Warnings:

  - You are about to drop the column `seller_id` on the `master_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_id` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `rate_conversion` to the `master_uom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "master_supplier" DROP CONSTRAINT "master_supplier_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_buyer_id_fkey";

-- AlterTable
ALTER TABLE "master_supplier" DROP COLUMN "seller_id";

-- AlterTable
ALTER TABLE "master_uom" ADD COLUMN     "rate_conversion" DECIMAL(15,2) NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "buyer_id";
