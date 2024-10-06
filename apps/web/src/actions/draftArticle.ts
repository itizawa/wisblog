'use server';

import type { DraftArticle } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';

const transferToObject = (
  article: Omit<DraftArticle, 'createdAt' | 'updatedAt'> & {
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

export const createDraftArticle = async ({
  title,
  body,
  blogId,
}: {
  title: string;
  body: string;
  blogId: string;
}) => {
  return await trpcClient.draftArticle.create.mutate({
    title,
    body,
    blogId,
  });
};

export const updateDraftArticle = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  return await trpcClient.draftArticle.update.mutate({
    id,
    title,
    body,
  });
};
