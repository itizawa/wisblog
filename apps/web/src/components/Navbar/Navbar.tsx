'use client';

import { Container, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const { palette } = useTheme();

  return (
    <Stack
      position='static'
      sx={{ borderBottom: `solid 1px ${palette.grey[600]}`, bgcolor: palette.background.default }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                textDecoration: 'none',
                color: palette.text.primary,
              }}
            >
              Wisblog
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </Stack>
  );
};
