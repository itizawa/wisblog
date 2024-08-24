-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "owener_id" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_owener_id_fkey" FOREIGN KEY ("owener_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
