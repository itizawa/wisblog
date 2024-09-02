/*
  Warnings:

  - You are about to drop the column `owener_id` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_owener_id_fkey";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "owener_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
