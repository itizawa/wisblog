import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { getBlogsBySubDomain } from '~/actions/blog';
import { ArticleForm } from '~/components/models/article/ArticleForm';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const blog = await getBlogsBySubDomain({ subDomain: params.subDomain });

  if (!blog) {
    return notFound();
  }

  return (
    <Stack maxWidth={900} mx='auto' pt={4} gap={3} px={2}>
      <ArticleForm blogId={blog.id} subDomain={blog.subDomain} />
    </Stack>
  );
}
