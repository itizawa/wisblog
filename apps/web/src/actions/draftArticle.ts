'use server';

import type { DraftArticle } from '@repo/types';
import { redirect } from 'next/navigation';
import { appUrls } from '~/constants/appUrls';
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

export const createDraftArticleForNew = async ({
  blogId,
}: {
  blogId: string;
}) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const result = await trpcClient.draftArticle.create.mutate({
    title: '',
    body: '',
    blogId,
  });

  return redirect(appUrls.dashboard.blogs.articles.edit(blogId, result.createdDraftArticle.id));
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
