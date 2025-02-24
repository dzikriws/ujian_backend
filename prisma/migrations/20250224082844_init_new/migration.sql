-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('PURCHASE', 'SALES');

-- CreateEnum
CREATE TYPE "transaction_status" AS ENUM ('PENDING', 'CONFIRMED', 'FINISH');

-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('CASH', 'TRANSFER');

-- CreateTable
CREATE TABLE "fw_user_role" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "fw_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "category" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "uom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "master_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "master_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_supplier" (
    "id" TEXT NOT NULL,
    "suplier_name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "payment_terms" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "contact_name" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "master_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_uom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate_conversion" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_uom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "master_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_detail" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(15,2) NOT NULL,
    "uom_id" TEXT NOT NULL,
    "unit_price" DECIMAL(15,2) NOT NULL,
    "subtotal" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "transaction_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_number" TEXT NOT NULL,
    "customer_or_supplier_id" TEXT NOT NULL,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "payment_type" TEXT NOT NULL,
    "proof_url" TEXT NOT NULL,
    "type" "transaction_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "transaction_status" NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_product_sku_key" ON "master_product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "master_role_name_key" ON "master_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_uom_name_key" ON "master_uom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_name_key" ON "master_user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_username_key" ON "master_user"("username");

-- AddForeignKey
ALTER TABLE "fw_user_role" ADD CONSTRAINT "fw_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fw_user_role" ADD CONSTRAINT "fw_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "master_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_customer_or_supplier_id_fkey" FOREIGN KEY ("customer_or_supplier_id") REFERENCES "master_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
