/*
  Warnings:

  - You are about to drop the column `category` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `master_product` table. All the data in the column will be lost.
  - You are about to drop the column `uom_id` on the `master_product` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `master_product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "master_product" DROP CONSTRAINT "master_product_uom_id_fkey";

-- DropIndex
DROP INDEX "master_product_sku_key";

-- AlterTable
ALTER TABLE "master_product" DROP COLUMN "category",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "sku",
DROP COLUMN "uom_id",
ADD COLUMN     "product_name" TEXT NOT NULL;
