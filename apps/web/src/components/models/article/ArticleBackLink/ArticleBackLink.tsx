'use client';

import { ArrowBack } from '@mui/icons-material';
import { Link } from '@mui/material';
import type { FC } from 'react';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  blogSubDomain: string;
};

export const ArticleBackLink: FC<Props> = ({ blogSubDomain }) => {
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
      href={generateSubDomainUrl(blogSubDomain)}
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
