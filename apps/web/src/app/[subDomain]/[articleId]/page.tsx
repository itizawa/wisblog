import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlogsBySubDomain } from '~/actions/blog';
import { ArticleBreadcrumbs } from '~/components/models/article/ArticleBreadcrumbs';
import { ArticlePaper } from '~/components/models/article/ArticlePaper';

export default async function Page({ params }: { params: { subDomain: string; articleId: string } }) {
  const [blog, article] = await Promise.all([
    getBlogsBySubDomain({ subDomain: params.subDomain }),
    getArticle({ id: params.articleId }),
  ]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={900} mx='auto' pt={4} px={2} gap={1}>
      <ArticleBreadcrumbs blogName={blog.name} blogSubDomain={blog.subDomain} articleTitle={article.title} />
      <ArticlePaper key={article.id} article={article} blog={blog} />
    </Stack>
  );
}
