import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getBlog } from '~/actions/blog';
import { EditBlogForm } from '~/components/models/blog/EditBlogForm';

export default async function Page({ params }: { params: { blogId: string } }) {
  const blog = await getBlog({ id: params.blogId });

  if (!blog) return notFound();

  return (
    <Stack maxWidth={600} mx='auto' pt={4} gap={3} px={2}>
      <Typography variant='h5'>編集</Typography>
      <EditBlogForm existingBlog={blog} />
    </Stack>
  );
}
