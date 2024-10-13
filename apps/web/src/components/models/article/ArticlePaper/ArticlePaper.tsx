'use client';

import './styles.scss';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Link, Paper, Typography, useTheme } from '@mui/material';
import { can } from '@repo/access-control';
import type { Blog, PublishArticle, User } from '@repo/types';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { WrapperWithMenu } from '~/components/uiParts/WrapperWithMenu';
import { appUrls } from '~/constants/appUrls';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  currentUser: User | null;
  blog: Blog;
  article: PublishArticle;
};

export const ArticlePaper: FC<Props> = ({ currentUser, blog, article }) => {
  const { palette } = useTheme();
  const router = useRouter();
  return (
    <Paper key={article.id} variant='outlined' sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 0.5 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Link href={urlJoin(generateSubDomainUrl(blog.subDomain), article.id)} underline='hover' color='inherit'>
          <Typography variant='h5' component='div'>
            {article.title}
          </Typography>
        </Link>
        {can({ type: 'publish_article', action: 'update', user: currentUser, blog, publishArticle: article }) && (
          <WrapperWithMenu
            menuItems={[
              {
                key: 'edit',
                text: '編集',
                onClick: () => router.push(appUrls.dashboard.blogs.articles.edit(blog.id, article.id)),
              },
            ]}
          >
            {({ triggerMenu }) => {
              return (
                <IconButton onClick={triggerMenu}>
                  <MoreVert />
                </IconButton>
              );
            }}
          </WrapperWithMenu>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
        <Box display='flex' columnGap={2} sx={{ pb: 1, borderBottom: `1px solid ${palette.grey[500]}` }}>
          <Typography variant='caption' component='h6'>
            作成日：{format(article.createdAt, 'yyyy-MM-dd HH:mm')}
          </Typography>
          <Typography variant='caption' component='h6'>
            更新日：{format(article.updatedAt, 'yyyy-MM-dd HH:mm')}
          </Typography>
        </Box>
        <div className='preview'>{parse(article.body)}</div>
      </Box>
    </Paper>
  );
};
