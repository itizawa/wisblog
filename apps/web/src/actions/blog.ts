'use server';

import type { Blog } from '@repo/types';
import { trpcClient } from '~/libs/trpcClient/trpcClient';

const transferToObject = (
  blog: Omit<Blog, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  },
) => {
  return {
    ...blog,
    createdAt: new Date(blog.createdAt),
    updatedAt: new Date(blog.updatedAt),
  };
};

export const getBlogsByOwnerId = async ({ ownerId }: { ownerId: string }) => {
  const { blogs } = await trpcClient.blog.getBlogsByOwnerId.query({
    ownerId,
  });

  return {
    blogs: blogs.map(transferToObject),
  };
};

export const getBlog = async ({ id }: { id: string }) => {
  const blog = await trpcClient.blog.get.query({ id });

  return blog ? transferToObject(blog) : null;
};

export const getBlogsBySubDomain = async ({ subDomain }: { subDomain: string }) => {
  const blog = await trpcClient.blog.getBlogsBySubDomain.query({
    subDomain,
  });

  return blog ? transferToObject(blog) : null;
};

export const getSubDomains = async () => {
  return await trpcClient.blog.getSubDomains.query();
};

export const createBlog = async ({
  name,
  subDomain,
}: {
  name: string;
  subDomain: string;
}) => {
  return await trpcClient.blog.createBlog.mutate({
    name,
    subDomain,
  });
};

export const updateBlog = async ({
  id,
  name,
  subDomain,
}: {
  id: string;
  name: string;
  subDomain: string;
}) => {
  return await trpcClient.blog.update.mutate({
    id,
    name,
    subDomain,
  });
};
