import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getBlogsBySubDomain } from '~/actions/blog';
import { getPublishArticles } from '~/actions/publishArticle';
import { ArticleSummaryPaper } from '~/components/models/article/ArticleSummaryPaper';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const blog = await getBlogsBySubDomain({ subDomain: params.subDomain });

  if (!blog) {
    return notFound();
  }

  const articles = await getPublishArticles({ blogId: blog.id });

  return (
    <Stack maxWidth={900} mx='auto' pt={2} pb={4} px={2} gap={3}>
      <Typography textAlign='center' variant='h5'>
        {blog.name}
      </Typography>
      {articles.map(article => (
        <ArticleSummaryPaper key={article.id} article={article} blog={blog} />
      ))}
    </Stack>
  );
}
