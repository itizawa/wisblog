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

export const createArticle = async ({
  title,
  body,
  blogId,
}: {
  title: string;
  body: string;
  blogId: string;
}) => {
  return await trpcClient.article.createArticle.mutate({
    title,
    body,
    blogId,
  });
};
