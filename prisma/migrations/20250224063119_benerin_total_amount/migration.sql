/*
  Warnings:

  - You are about to drop the column `status` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `customer_or_supplier_id` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transaction_status" AS ENUM ('PENDING', 'CONFIRMED', 'FINISH');

-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('PURCHASE', 'SALES');

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_supplier_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "status",
DROP COLUMN "supplier_id",
DROP COLUMN "totalAmount",
ADD COLUMN     "customer_or_supplier_id" TEXT NOT NULL,
ADD COLUMN     "total_amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "type" "transaction_type" NOT NULL;

-- AlterTable
ALTER TABLE "transaction_detail" ADD COLUMN     "status" "transaction_status" NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_customer_or_supplier_id_fkey" FOREIGN KEY ("customer_or_supplier_id") REFERENCES "master_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
