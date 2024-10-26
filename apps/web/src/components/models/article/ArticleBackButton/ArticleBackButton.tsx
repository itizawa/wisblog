'use client';

import { ArrowBack } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import type { FC } from 'react';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  blogSubDomain: string;
};

export const ArticleBackButton: FC<Props> = ({ blogSubDomain }) => {
  return (
    <Link sx={{ textDecoration: 'none' }} href={generateSubDomainUrl(blogSubDomain)}>
      <Button
        variant='text'
        sx={{
          textDecoration: 'none',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        <ArrowBack
          sx={{
            fontSize: '1rem',
            marginRight: '0.5rem',
          }}
        />
        記事一覧
      </Button>
    </Link>
  );
};
