import { Box, Stack, Typography } from '@mui/material';
import { getCurrentUser } from '~/actions/user';
import { BlogCard } from '~/components/models/blog/BlogCard';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';
import { getBlogsByOwnerId } from '../../../actions/blog';

export const metadata = generateWisblogMetadata({ title: 'ブログ一覧' });

export default async function Page() {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const { blogs } = await getBlogsByOwnerId({ ownerId: currentUser?.id });

  return (
    <Stack maxWidth={900} mx='auto' py={4} gap={3} px={2}>
      <Typography variant='h5'>ブログ一覧</Typography>
      {blogs.map(blog => (
        <Box key={blog.id} width='100%'>
          <BlogCard blog={blog} />
        </Box>
      ))}
    </Stack>
  );
}
