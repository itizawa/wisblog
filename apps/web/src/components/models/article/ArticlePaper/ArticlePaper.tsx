'use client';

import { Box, Link, Paper, Typography, useTheme } from '@mui/material';
import type { Article, Blog } from '@repo/types';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { generateSubDomainUrl } from '../../../../utils/generateSubDomainUrl';

type Props = {
  blog: Blog;
  article: Article;
};

export const ArticlePaper: FC<Props> = ({ blog, article }) => {
  const { palette } = useTheme();
  return (
    <Paper key={article.id} variant='outlined' sx={{ p: 3, a: { color: palette.info.light } }}>
      <Link
        href={urlJoin(generateSubDomainUrl(blog.subDomain), article.id)}
        color='info'
        sx={{ textDecoration: 'none' }}
      >
        <Typography variant='h5' component='div'>
          {article.title}
        </Typography>
      </Link>
      <Box display='flex' columnGap={2}>
        <Typography variant='caption' component='h6'>
          作成日：{format(article.createdAt, 'yyyy-MM-dd HH:mm')}
        </Typography>
        <Typography variant='caption' component='h6'>
          更新日：{format(article.updatedAt, 'yyyy-MM-dd HH:mm')}
        </Typography>
      </Box>
      {parse(article.body)}
    </Paper>
  );
};
