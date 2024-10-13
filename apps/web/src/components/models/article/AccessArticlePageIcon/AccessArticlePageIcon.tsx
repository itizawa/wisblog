import { Preview } from '@mui/icons-material';
import { Link } from '@mui/material';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { WisblogTooltip } from '~/components/uiParts/WisblogTooltip';
import { appUrls } from '~/constants/appUrls';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

type Props = {
  subDomain: string;
  articleId: string;
};

export const AccessArticlePageIcon: FC<Props> = ({ subDomain, articleId }) => {
  return (
    <Link
      underline='hover'
      color='inherit'
      target='_blank'
      rel='noopener noreferrer'
      style={{ height: 24 }}
      href={urlJoin(generateSubDomainUrl(subDomain), appUrls.blogs.article(articleId))}
    >
      <WisblogTooltip title='記事にアクセスする'>
        <Preview />
      </WisblogTooltip>
    </Link>
  );
};
