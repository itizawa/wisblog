import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getArticles } from '~/actions/article';
import { getBlogsBySubDomain } from '~/actions/blog';
import { ArticlePaper } from '~/components/models/article/ArticlePaper';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const blog = await getBlogsBySubDomain({ subDomain: params.subDomain });

  if (!blog) {
    return notFound();
  }

  const articles = await getArticles({ blogId: blog.id });

  return (
    <Stack maxWidth={900} mx='auto' pt={4} px={2} gap={3}>
      <Typography textAlign='center' variant='h5'>
        {blog.name}
      </Typography>
      {articles.map(article => (
        <ArticlePaper key={article.id} article={article} blog={blog} />
      ))}
    </Stack>
  );
}
