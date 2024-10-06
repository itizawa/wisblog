'use server';

import type { Article } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';

const transferToObject = (
  article: Omit<Article, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  },
) => {
  return {
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
  };
};

export const getArticle = async ({
  id,
}: {
  id: string;
}) => {
  const { article } = await trpcClient.article.get.mutate({
    id,
  });

  return article ? transferToObject(article) : null;
};
