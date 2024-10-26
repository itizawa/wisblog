'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import type {} from '@repo/types';
import type { FC } from 'react';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  blogSubDomain: string;
  articleTitle: string;
};

export const ArticleBreadcrumbs: FC<Props> = ({ blogSubDomain, articleTitle }) => {
  return (
    <Breadcrumbs>
      <Link underline='hover' color='inherit' href={generateSubDomainUrl(blogSubDomain)}>
        記事一覧
      </Link>
      <Typography sx={{ color: 'text.primary' }}>{articleTitle === '' ? '無題' : articleTitle}</Typography>
    </Breadcrumbs>
  );
};
