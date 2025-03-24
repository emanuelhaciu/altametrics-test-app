/*
  Warnings:

  - You are about to drop the column `userId` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "userId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
