'use server';

import { trpcClient } from '~/libs/trpcClient/trpcClient';

export const getBlogsBySubDomain = async ({ subDomain }: { subDomain: string }) => {
  return await trpcClient.getBlogsBySubDomain.query({
    subDomain,
  });
};

export const getSubDomains = async () => {
  return await trpcClient.getSubDomains.query();
};
