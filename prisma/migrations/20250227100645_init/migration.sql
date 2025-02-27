-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('pembelian', 'penjualan');

-- CreateTable
CREATE TABLE "fw_user_role" (
    "status" TEXT NOT NULL,
    "role_id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "ts_insert" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    CONSTRAINT "fw_user_role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "master_product" (
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "master_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_role" (
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "master_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_supplier" (
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
    "id" SERIAL NOT NULL,

    CONSTRAINT "master_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_uom" (
    "name" TEXT NOT NULL,
    "rate_conversion" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "master_uom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_user" (
    "username" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "ts_insert" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_list" (
    "price_list_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "price_list_pkey" PRIMARY KEY ("price_list_id")
);

-- CreateTable
CREATE TABLE "transaction_detail" (
    "quantity" DECIMAL(15,2) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "uom_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_name" TEXT,
    "tax_rate" DECIMAL(15,2) NOT NULL,
    "transaction_type" "transaction_type" NOT NULL,
    "username" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "supplier_id" INTEGER,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_role_name_key" ON "master_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_uom_name_key" ON "master_uom"("name");

-- AddForeignKey
ALTER TABLE "price_list" ADD CONSTRAINT "price_list_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list" ADD CONSTRAINT "price_list_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "master_uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "master_supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
