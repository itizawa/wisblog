'use server';

import type { Article } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const getArticle = async ({
  id,
}: {
  id: string;
}) => {
  const { article } = await trpcClient.article.get.mutate({
    id,
  });

  return article ? convertStringsToDates<Article>(article) : null;
};

export const convertStatus = async ({
  id,
  toStatus,
}: {
  id: string;
  toStatus: 'publish' | 'draft';
}) => {
  return await trpcClient.article.convertStatus.mutate({
    id,
    toStatus,
  });
};
