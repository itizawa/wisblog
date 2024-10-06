'use server';

import type { PublishArticle } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';

const transferToObject = (
  article: Omit<PublishArticle, 'createdAt' | 'updatedAt'> & {
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

export const getPublishArticle = async ({
  id,
}: {
  id: string;
}) => {
  const { article } = await trpcClient.publishArticle.get.mutate({
    id,
  });

  return article ? transferToObject(article) : null;
};

export const getPublishArticles = async ({
  blogId,
}: {
  blogId: string;
}) => {
  const { articles } = await trpcClient.publishArticle.list.mutate({
    blogId,
  });

  return articles.map(transferToObject);
};

export const createPublishArticle = async ({
  title,
  body,
  blogId,
}: {
  title: string;
  body: string;
  blogId: string;
}) => {
  return await trpcClient.publishArticle.create.mutate({
    title,
    body,
    blogId,
  });
};

export const updatePublishArticle = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  return await trpcClient.publishArticle.update.mutate({
    id,
    title,
    body,
  });
};
