import { Alert, Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlogsBySubDomain } from '~/actions/blog';
import { getCurrentUser } from '~/actions/user';
import { ArticlePaper } from '~/components/models/article/ArticlePaper';

export default async function Page({ params }: { params: { subDomain: string; articleId: string } }) {
  const [blog, article, { currentUser }] = await Promise.all([
    getBlogsBySubDomain({ subDomain: params.subDomain }),
    getArticle({ id: params.articleId }),
    getCurrentUser(),
  ]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={900} mx='auto' py={4} px={2} gap={1}>
      {article.status === 'draft' && <Alert severity='warning'>この記事は下書き状態です</Alert>}
      <ArticlePaper key={article.id} currentUser={currentUser} article={article} blog={blog} />
    </Stack>
  );
}
