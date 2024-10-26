import { Box, Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticle } from '~/actions/article';
import { getBlog } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';
import { DashBoardArticleBackLink } from '~/components/models/article/DashBoardArticleBackLink/DashBoardArticleBackLink';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';

export const metadata = generateWisblogMetadata({ title: '記事の編集' });

export default async function Page({ params }: { params: { blogId: string; articleId: string } }) {
  const [blog, article] = await Promise.all([getBlog({ id: params.blogId }), getArticle({ id: params.articleId })]);

  if (!blog || !article) {
    return notFound();
  }

  return (
    <Stack maxWidth={1260} mx='auto' pt={2} pb={4} px={2} gap={2}>
      <Stack gap='16px'>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <DashBoardArticleBackLink blogId={blog.id} />
        </Box>
        <ArticleForm existingArticle={article} subDomain={blog.subDomain} />
      </Stack>
    </Stack>
  );
}
