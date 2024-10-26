'use client';

import { ArrowBack } from '@mui/icons-material';
import { Link } from '@mui/material';
import type { FC } from 'react';
import { appUrls } from '~/constants/appUrls';

type Props = {
  blogId: string;
};

export const DashBoardArticleBackLink: FC<Props> = ({ blogId }) => {
  return (
    <Link
      color='inherit'
      sx={{
        textDecoration: 'none',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        color: 'text.secondary',
        ':hover': {
          color: 'text.primary',
        },
      }}
      href={appUrls.dashboard.blogs.articles.list(blogId)}
    >
      <ArrowBack
        sx={{
          fontSize: '1rem',
          marginRight: '0.5rem',
        }}
      />
      記事一覧
    </Link>
  );
};
