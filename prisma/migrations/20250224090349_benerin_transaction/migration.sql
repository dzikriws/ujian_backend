/*
  Warnings:

  - You are about to drop the column `customer_or_supplier_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `order_number` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `proof_url` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `transaction_detail` table. All the data in the column will be lost.
  - Added the required column `customer_name` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_rate` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_customer_or_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_product_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_uom_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "customer_or_supplier_id",
DROP COLUMN "order_number",
DROP COLUMN "payment_type",
DROP COLUMN "proof_url",
DROP COLUMN "status",
DROP COLUMN "total_amount",
DROP COLUMN "type",
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "supplier_id" TEXT NOT NULL,
ADD COLUMN     "tax_rate" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "transaction_type" "transaction_type" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "created_at",
DROP COLUMN "status",
DROP COLUMN "subtotal",
DROP COLUMN "unit_price",
DROP COLUMN "updated_at",
ADD COLUMN     "amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "price" DECIMAL(15,2) NOT NULL;

-- DropEnum
DROP TYPE "payment_type";

-- DropEnum
DROP TYPE "transaction_status";

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "master_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
