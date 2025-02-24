/*
  Warnings:

  - Added the required column `buyer_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "buyer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
