/*
  Warnings:

  - You are about to drop the column `duration` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."services" DROP CONSTRAINT "services_store_id_fkey";

-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "duration",
DROP COLUMN "price",
DROP COLUMN "store_id";

-- CreateTable
CREATE TABLE "public"."store_services" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "duration" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_services_store_id_service_id_key" ON "public"."store_services"("store_id", "service_id");

-- AddForeignKey
ALTER TABLE "public"."store_services" ADD CONSTRAINT "store_services_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store_services" ADD CONSTRAINT "store_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
