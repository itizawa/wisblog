import { Box, Typography } from '@mui/material';
import { getCurrentUser } from '~/actions/user';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getCurrentUser();

  if (!currentUser) {
    return (
      <Box pt={5}>
        <Typography variant='h5' textAlign='center'>
          ログインしてください
        </Typography>
      </Box>
    );
  }

  return <Box>{children}</Box>;
}
