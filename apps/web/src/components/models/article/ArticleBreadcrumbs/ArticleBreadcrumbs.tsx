'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import type {} from '@repo/types';
import type { FC } from 'react';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  blogName: string;
  blogSubDomain: string;
  articleTitle: string;
};

export const ArticleBreadcrumbs: FC<Props> = ({ blogSubDomain, blogName, articleTitle }) => {
  return (
    <Breadcrumbs>
      <Link underline='hover' color='inherit' href={generateSubDomainUrl(blogSubDomain)}>
        {blogName}
      </Link>
      <Typography sx={{ color: 'text.primary' }}>{articleTitle}</Typography>
    </Breadcrumbs>
  );
};
