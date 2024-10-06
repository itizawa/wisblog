import { Stack } from '@mui/material';
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
    <Stack maxWidth={900} mx='auto' py={4} px={2} gap={2}>
      <ArticleForm
        existedArticle={{
          id: article.id,
          title: article.title,
          body: article.body,
          status: article.status,
        }}
        subDomain={blog.subDomain}
        blogId={blog.id}
      />
    </Stack>
  );
}
