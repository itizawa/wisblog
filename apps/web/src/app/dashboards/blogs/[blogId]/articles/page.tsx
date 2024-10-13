import { Stack, Typography } from '@mui/material';
import type { Blog } from '@repo/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getBlog } from '~/actions/blog';
import { getDraftArticles } from '~/actions/draftArticle';
import { getPublishArticles } from '~/actions/publishArticle';
import { getCurrentUser } from '~/actions/user';
import { ArticleSummaryPaperForAdmin } from '~/components/models/article/ArticleSummaryPaperForAdmin';
import { CreateNewArticleButton } from '~/components/models/article/CreateNewArticleButton';
import { LoadingBox } from '~/components/uiParts/LoadingBox';
import { WisblogTabs } from '~/components/uiParts/WisblogTabs';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';

export const metadata = generateWisblogMetadata({ title: '記事一覧' });

export default async function Page({ params }: { params: { blogId: string } }) {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const blog = await getBlog({ id: params.blogId });

  if (!blog) return notFound();

  return (
    <Stack maxWidth={600} mx='auto' py={4} gap={3} px={2}>
      <Stack direction='row' justifyContent='space-between' columnGap={2}>
        <Typography variant='h5'>{blog.name} の記事一覧</Typography>
        <CreateNewArticleButton blogId={blog.id} />
      </Stack>
      <WisblogTabs
        defaultValue='PUBLIC'
        tabs={[
          {
            value: 'PUBLIC',
            label: '公開',
            children: (
              <Suspense fallback={<LoadingBox />}>
                <PublicArticleList blog={blog} />
              </Suspense>
            ),
          },
          {
            value: 'DRAFT',
            label: '下書き',
            children: (
              <Suspense fallback={<LoadingBox />}>
                <DraftArticleList blog={blog} />
              </Suspense>
            ),
          },
        ]}
      />
    </Stack>
  );
}

const PublicArticleList = async ({ blog }: { blog: Blog }) => {
  const articles = await getPublishArticles({ blogId: blog.id });

  return (
    <Stack gap={2}>
      {articles.map(article => (
        <ArticleSummaryPaperForAdmin key={article.id} blog={blog} article={article} />
      ))}
    </Stack>
  );
};

const DraftArticleList = async ({ blog }: { blog: Blog }) => {
  const articles = await getDraftArticles({ blogId: blog.id });

  return (
    <Stack gap={2}>
      {articles.map(article => (
        <ArticleSummaryPaperForAdmin key={article.id} blog={blog} article={article} />
      ))}
    </Stack>
  );
};
