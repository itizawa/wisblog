'use server';

import type { DraftArticle } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const getDraftArticles = async ({
  blogId,
}: {
  blogId: string;
}) => {
  const { draftArticles } = await trpcClient.draftArticle.list.mutate({
    blogId,
  });

  return draftArticles.map<DraftArticle>(convertStringsToDates);
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
