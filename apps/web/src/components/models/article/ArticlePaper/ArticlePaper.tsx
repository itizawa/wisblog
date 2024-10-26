'use client';

import './styles.scss';
import { MoreVert } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { can } from '@repo/access-control';
import type { Blog, DraftArticle, PublishArticle, User } from '@repo/types';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { WisblogTooltip } from '~/components/uiParts/WisblogTooltip';
import { WrapperWithMenu } from '~/components/uiParts/WrapperWithMenu';
import { appUrls } from '~/constants/appUrls';
import { generateMainUrl } from '~/utils/generateMainUrl';
import { ArticleBackLink } from '../ArticleBackLink';

type Props = {
  currentUser: User | null;
  blog: Blog;
  article: DraftArticle | PublishArticle;
};

export const ArticlePaper: FC<Props> = ({ currentUser, blog, article }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 1,
      }}
    >
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <ArticleBackLink blogSubDomain={blog.subDomain} />
        <WisblogTooltip title={`最終更新：${format(article.updatedAt, 'yyyy-MM-dd HH:mm')}`}>
          <Box display='flex' sx={{ width: 'fit-content' }} alignItems='center'>
            <CalendarMonth
              sx={{
                fontSize: '1rem',
                marginRight: '0.5rem',
                color: 'text.secondary',
              }}
            />
            <Typography variant='body2' component='h6' color='textSecondary'>
              {format(article.createdAt, 'yyyy-MM-dd HH:mm')}
            </Typography>
          </Box>
        </WisblogTooltip>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }} component='div'>
          {article.title === '' ? '無題' : article.title}
        </Typography>
        {can({ type: 'publish_article', action: 'update', user: currentUser, blog, publishArticle: article }) && (
          <WrapperWithMenu
            menuItems={[
              {
                key: 'edit',
                text: '編集',
                onClick: () =>
                  router.push(urlJoin(generateMainUrl(), appUrls.dashboard.blogs.articles.edit(blog.id, article.id))),
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
      <div className='preview'>{parse(article.body)}</div>
    </Box>
  );
};
