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
  const { article } = await trpcClient.article.getArticle.mutate({
    id,
  });

  return article ? transferToObject(article) : null;
};

export const getArticles = async ({
  blogId,
}: {
  blogId: string;
}) => {
  const { articles } = await trpcClient.article.getArticles.mutate({
    blogId,
  });

  return articles.map(transferToObject);
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

export const updateArticle = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  return await trpcClient.article.updateArticle.mutate({
    id,
    title,
    body,
  });
};
