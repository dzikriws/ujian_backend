/*
  Warnings:

  - You are about to drop the column `createdAt` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `uomId` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `master_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `master_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `master_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `master_uom` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_uom` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `master_user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `master_user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `uomId` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transaction_detail` table. All the data in the column will be lost.
  - Added the required column `supplier_id` to the `master_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom_id` to the `master_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `master_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `master_supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `master_supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom_id` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "master_product" DROP CONSTRAINT "master_product_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "master_product" DROP CONSTRAINT "master_product_uomId_fkey";

-- DropForeignKey
ALTER TABLE "master_supplier" DROP CONSTRAINT "master_supplier_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_productId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_uomId_fkey";

-- AlterTable
ALTER TABLE "master_product" DROP COLUMN "createdAt",
DROP COLUMN "supplierId",
DROP COLUMN "uomId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "supplier_id" TEXT NOT NULL,
ADD COLUMN     "uom_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "master_supplier" DROP COLUMN "contactPerson",
DROP COLUMN "createdAt",
DROP COLUMN "sellerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "contact_person" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seller_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "master_uom" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "master_user" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "createdAt",
DROP COLUMN "supplierId",
DROP COLUMN "transactionDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "supplier_id" TEXT NOT NULL,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "transactionId",
DROP COLUMN "unitPrice",
DROP COLUMN "uomId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "uom_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "master_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_supplier" ADD CONSTRAINT "master_supplier_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "master_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
