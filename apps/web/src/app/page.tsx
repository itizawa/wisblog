import { Link, Stack, Typography } from '@mui/material';
import urlJoin from 'url-join';
import { getCurrentUser } from '~/actions/user';

export default async function Page() {
  const { currentUser } = await getCurrentUser();

  return (
    <Stack maxWidth={600} mx='auto' pt={4} gap={3} px={2}>
      <Typography variant='h5'>Welcome to Wisblog !</Typography>
      {currentUser ? (
        <Link href={'/dashboards/blogs'} color='info' sx={{ textDecoration: 'none' }}>
          <Typography variant='h5'>ダッシュボードへ</Typography>
        </Link>
      ) : (
        <Link
          href={urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', '/users/auth/google')}
          color='info'
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant='h5'>ログイン</Typography>
        </Link>
      )}
    </Stack>
  );
}
