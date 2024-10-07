'use client';

import { Box, Link, Paper, Typography } from '@mui/material';
import type { Blog, PublishArticle } from '@repo/types';
import { format } from 'date-fns';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  blog: Blog;
  article: PublishArticle;
};

export const ArticleSummaryPaperForAdmin: FC<Props> = ({ blog, article }) => {
  return (
    <Paper key={article.id} variant='outlined' sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 0.5 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Link
          href={urlJoin(generateSubDomainUrl(blog.subDomain), article.id, 'edit')}
          underline='hover'
          color='inherit'
        >
          <Typography variant='h5' component='div'>
            {article.title}
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
        <Box display='flex' columnGap={2} sx={{ pb: 1 }}>
          <Typography variant='caption' component='h6'>
            作成日：{format(article.createdAt, 'yyyy-MM-dd HH:mm')}
          </Typography>
          <Typography variant='caption' component='h6'>
            更新日：{format(article.updatedAt, 'yyyy-MM-dd HH:mm')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
