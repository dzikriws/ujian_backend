/*
  Warnings:

  - You are about to drop the column `name` on the `master_supplier` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `master_supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "master_supplier_name_key";

-- AlterTable
ALTER TABLE "master_supplier" DROP COLUMN "name",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "master_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_user_name_key" ON "master_user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_username_key" ON "master_user"("username");

-- AddForeignKey
ALTER TABLE "master_supplier" ADD CONSTRAINT "master_supplier_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
