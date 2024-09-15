import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getBlogsBySubDomain } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const blog = await getBlogsBySubDomain({ subDomain: params.subDomain });

  if (!blog) {
    return notFound();
  }

  return (
    <Stack mx='auto' pt={4} gap={3} px={4}>
      <Typography variant='h5'>記事の新規作成</Typography>
      <ArticleForm blogId={blog.id} />
    </Stack>
  );
}
