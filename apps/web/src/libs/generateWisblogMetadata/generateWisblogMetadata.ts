import type { Metadata } from 'next';

const DEFAULT_TITLE = 'Wisblog';
const DEFAULT_DESCRIPTION = 'シンプルで賢いブログサービス';
const DEFAULT_URL = 'https://wiscro.app/';

type Args = {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
};

export const generateWisblogMetadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  images,
}: Args): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wisblog',
      locale: 'ja_JP',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: '@',
      creator: '@',
    },
    metadataBase: new URL('https://wiscro.app/'),
  };
};
