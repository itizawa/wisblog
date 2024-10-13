import type { Article } from '@repo/types';
import useSWR, { mutate } from 'swr';
import { getArticle } from '~/actions/article';

const generateKey = (id: string) => ({ path: getArticle.name, id });

export const useArticle = ({ id, fallbackData }: { id: string; fallbackData?: Article }) => {
  return useSWR(generateKey(id), () => getArticle({ id }), {
    fallbackData,
  });
};

export const mutateArticle = ({ id }: { id: string }) => {
  mutate(generateKey(id));
};
