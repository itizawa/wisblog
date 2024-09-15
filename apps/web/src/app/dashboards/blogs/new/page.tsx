import { Stack, Typography } from '@mui/material';
import { CreateBlogForm } from '~/components/models/blog/CreateBlogForm';

export default function Page() {
  return (
    <Stack maxWidth={600} mx='auto' pt={4} gap={3} px={2}>
      <Typography variant='h5'>新規作成</Typography>
      <CreateBlogForm />
    </Stack>
  );
}
