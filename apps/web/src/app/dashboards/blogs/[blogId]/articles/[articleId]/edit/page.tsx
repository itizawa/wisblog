import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlog } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';

export const metadata = generateWisblogMetadata({ title: '記事の編集' });

export default async function Page({ params }: { params: { blogId: string; articleId: string } }) {
  const [blog, article] = await Promise.all([getBlog({ id: params.blogId }), getArticle({ id: params.articleId })]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={1260} mx='auto' py={4} px={2} gap={2}>
      <ArticleForm existingArticle={article} subDomain={blog.subDomain} />
    </Stack>
  );
}
