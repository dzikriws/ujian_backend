/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `quantity` on the `transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `subtotal` on the `transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `unit_price` on the `transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "transaction_detail" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(15,2);
