'use client';

import { Logout } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import type { User } from '@repo/types';
import Link from 'next/link';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { WrapperWithMenu } from '../WrapperWithMenu';

type Props = {
  currentUser: User | null;
};

export const Navbar: FC<Props> = ({ currentUser }) => {
  const { palette } = useTheme();

  return (
    <Stack
      position='static'
      sx={{ borderBottom: `solid 1px ${palette.grey[600]}`, bgcolor: palette.background.default }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
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
          {currentUser ? (
            <WrapperWithMenu
              menuItems={[
                {
                  key: 'logout',
                  onClick: () => {
                    window.location.href = urlJoin(
                      process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080',
                      '/users/logout',
                    );
                  },
                  text: 'Logout',
                  icon: <Logout fontSize='small' sx={{ mr: 1 }} />,
                },
              ]}
            >
              {({ triggerMenu, open }) => (
                <IconButton
                  onClick={triggerMenu}
                  size='small'
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ color: palette.grey[50] }}>{currentUser.name[0]}</Avatar>
                </IconButton>
              )}
            </WrapperWithMenu>
          ) : (
            <Button
              href={urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', '/users/auth/google')}
              variant='outlined'
              sx={{ color: palette.text.primary, borderColor: palette.text.primary }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </Stack>
  );
};
