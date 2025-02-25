/*
  Warnings:

  - You are about to drop the column `status` on the `transaction_detail` table. All the data in the column will be lost.
  - Added the required column `status` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "status" "transaction_status" NOT NULL;

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "status";
