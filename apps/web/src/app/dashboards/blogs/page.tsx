import { Box, Stack, Typography } from '@mui/material';
import { getCurrentUser } from '~/actions/user';
import { BlogCard } from '~/components/models/blog/BlogCard';
import { getBlogsByOwnerId } from '../../../actions/blog';

export default async function Page() {
  const { currentUser } = await getCurrentUser();
  if (!currentUser) return null;

  const { blogs } = await getBlogsByOwnerId({ ownerId: currentUser?.id });

  return (
    <Stack maxWidth={600} mx='auto' pt={4} gap={3}>
      <Typography variant='h5'>ブログ一覧</Typography>
      {blogs.map(blog => (
        <Box key={blog.id} width='100%'>
          <BlogCard blog={blog} />
        </Box>
      ))}
    </Stack>
  );
}
