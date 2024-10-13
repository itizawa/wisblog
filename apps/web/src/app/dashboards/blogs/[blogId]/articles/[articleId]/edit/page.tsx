import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlog } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';

export default async function Page({ params }: { params: { blogId: string; articleId: string } }) {
  const [blog, article] = await Promise.all([getBlog({ id: params.blogId }), getArticle({ id: params.articleId })]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={1260} mx='auto' py={4} px={2} gap={2}>
      <ArticleForm
        existingArticle={{
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
