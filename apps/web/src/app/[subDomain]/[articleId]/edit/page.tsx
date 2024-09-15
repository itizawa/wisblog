import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlogsBySubDomain } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';

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
      <Typography variant='h5'>記事の編集</Typography>
      <ArticleForm
        existedArticle={{
          id: article.id,
          title: article.title,
          body: article.body,
        }}
        subDomain={blog.subDomain}
        blogId={blog.id}
      />
    </Stack>
  );
}
