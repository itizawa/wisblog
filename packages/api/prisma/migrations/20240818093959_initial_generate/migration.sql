-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub_domain" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_sub_domain_key" ON "blogs"("sub_domain");
