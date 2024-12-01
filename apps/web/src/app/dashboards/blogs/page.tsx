import { NoteAdd } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { getCurrentUser } from '~/actions/user';
import { BlogCard } from '~/components/models/blog/BlogCard';
import { appUrls } from '~/constants/appUrls';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';
import { getBlogsByOwnerId } from '../../../actions/blog';

export const metadata = generateWisblogMetadata({ title: 'ブログ一覧' });

export default async function Page() {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const { blogs } = await getBlogsByOwnerId({ ownerId: currentUser?.id });

  return (
    <Stack maxWidth={900} mx='auto' pt={2} pb={4} gap={3} px={2}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>ブログ一覧</Typography>
        <Link href={appUrls.dashboard.blogs.new()}>
          <Button variant='contained' startIcon={<NoteAdd />}>
            新規作成
          </Button>
        </Link>
      </Box>
      {blogs.map(blog => (
        <Box key={blog.id} width='100%'>
          <BlogCard blog={blog} />
        </Box>
      ))}
    </Stack>
  );
}
