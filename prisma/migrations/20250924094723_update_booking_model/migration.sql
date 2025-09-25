/*
  Warnings:

  - You are about to drop the column `service_id` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `car_model` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_type` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_service_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."bookings" DROP COLUMN "service_id",
ADD COLUMN     "car_model" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "km" INTEGER,
ADD COLUMN     "license_plate" TEXT NOT NULL,
ADD COLUMN     "location_type" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."booking_services" (
    "booking_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "booking_services_pkey" PRIMARY KEY ("booking_id","service_id")
);

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_services" ADD CONSTRAINT "booking_services_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_services" ADD CONSTRAINT "booking_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
