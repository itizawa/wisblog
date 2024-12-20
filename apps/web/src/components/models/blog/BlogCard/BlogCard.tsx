'use client';

import { Card, CardContent, Link, Typography } from '@mui/material';
import type { Blog } from '@repo/types';
import { format } from 'date-fns';
import type { FC } from 'react';
import { appUrls } from '~/constants/appUrls';

type Props = {
  blog: Blog;
};
export const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <Card>
      <CardContent>
        <Link
          href={appUrls.dashboard.blogs.articles.list(blog.id)}
          underline='hover'
          color='inherit'
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant='h5' component='div'>
            {blog.name}
          </Typography>
        </Link>
        <Typography variant='body2' component='h6'>
          作成日：{format(blog.createdAt, 'yyyy-MM-dd HH:mm')}
        </Typography>
      </CardContent>
    </Card>
  );
};
