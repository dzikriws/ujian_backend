/*
  Warnings:

  - You are about to drop the column `supplier_id` on the `master_product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "master_product" DROP CONSTRAINT "master_product_supplier_id_fkey";

-- AlterTable
ALTER TABLE "master_product" DROP COLUMN "supplier_id";
