-- CreateEnum
CREATE TYPE "public"."ServiceCategory" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM');

-- AlterTable
ALTER TABLE "public"."services" ADD COLUMN     "category" "public"."ServiceCategory" NOT NULL DEFAULT 'BASIC';
