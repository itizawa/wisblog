import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { getBlog } from '~/actions/blog';
import { getCurrentUser } from '~/actions/user';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';

export const metadata = generateWisblogMetadata({ title: '記事一覧' });

export default async function Page({ params }: { params: { blogId: string } }) {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const blog = await getBlog({ id: params.blogId });

  if (!blog) return notFound();

  return (
    <Stack maxWidth={900} mx='auto' pt={2} pb={4} gap={3} px={2}>
      <Typography variant='h5'>ブログ設定</Typography>
      {/*  */}
    </Stack>
  );
}
