import { NoteAdd } from '@mui/icons-material';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import type { Blog } from '@repo/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getBlog } from '~/actions/blog';
import { getPublishArticles } from '~/actions/publishArticle';
import { getCurrentUser } from '~/actions/user';
import { ArticleSummaryPaperForAdmin } from '~/components/models/article/ArticleSummaryPaperForAdmin';
import { appUrls } from '~/constants/appUrls';

export default async function Page({ params }: { params: { blogId: string } }) {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const blog = await getBlog({ id: params.blogId });

  if (!blog) return notFound();

  return (
    <Stack maxWidth={600} mx='auto' py={4} gap={3} px={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5'>{blog.name} の管理画面</Typography>
        <Button href={appUrls.dashboard.blogs.articles.new(blog.id)} variant='contained' startIcon={<NoteAdd />}>
          新規作成
        </Button>
      </Stack>
      <Suspense fallback={<CircularProgress sx={{ mx: 'auto' }} />}>
        <PublicArticleList blog={blog} />
      </Suspense>
    </Stack>
  );
}

const PublicArticleList = async ({ blog }: { blog: Blog }) => {
  const articles = await getPublishArticles({ blogId: blog.id });

  return (
    <Stack>
      <Typography variant='h5'>公開中の記事</Typography>
      <Stack gap={2} mt={3}>
        {articles.map(article => (
          <ArticleSummaryPaperForAdmin key={article.id} blog={blog} article={article} />
        ))}
      </Stack>
    </Stack>
  );
};
