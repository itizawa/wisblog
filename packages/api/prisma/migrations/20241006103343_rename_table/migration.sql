ALTER TABLE articles RENAME TO publish_articles;

-- AlterTable
ALTER TABLE "publish_articles" RENAME CONSTRAINT "articles_pkey" TO "publish_articles_pkey";

-- RenameForeignKey
ALTER TABLE "publish_articles" RENAME CONSTRAINT "articles_author_id_fkey" TO "publish_articles_author_id_fkey";

-- RenameForeignKey
ALTER TABLE "publish_articles" RENAME CONSTRAINT "articles_blog_id_fkey" TO "publish_articles_blog_id_fkey";