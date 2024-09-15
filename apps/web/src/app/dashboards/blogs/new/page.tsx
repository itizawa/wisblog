import { Stack, Typography } from '@mui/material';
import { CreateBlogForm } from '~/components/models/blog/CreateBlogForm';

export default function Page() {
  return (
    <Stack maxWidth={500} mx='auto' pt={4} gap={3}>
      <Typography variant='h5'>新規作成</Typography>
      <CreateBlogForm />
    </Stack>
  );
}
