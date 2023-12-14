/*
  Warnings:

  - You are about to drop the column `vendor_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_vendor_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "vendor_id";
