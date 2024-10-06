import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getPublishArticle } from '~/actions/article';
import { getBlogsBySubDomain } from '~/actions/blog';
import { getCurrentUser } from '~/actions/user';
import { ArticleBreadcrumbs } from '~/components/models/article/ArticleBreadcrumbs';
import { ArticlePaper } from '~/components/models/article/ArticlePaper';

export default async function Page({ params }: { params: { subDomain: string; articleId: string } }) {
  const [blog, article, { currentUser }] = await Promise.all([
    getBlogsBySubDomain({ subDomain: params.subDomain }),
    getPublishArticle({ id: params.articleId }),
    getCurrentUser(),
  ]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={900} mx='auto' py={4} px={2} gap={1}>
      <ArticleBreadcrumbs blogName={blog.name} blogSubDomain={blog.subDomain} articleTitle={article.title} />
      <ArticlePaper key={article.id} currentUser={currentUser} article={article} blog={blog} />
    </Stack>
  );
}
