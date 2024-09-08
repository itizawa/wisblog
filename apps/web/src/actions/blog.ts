'use server';

import { trpcClient } from '~/libs/trpcClient/trpcClient';

export const getSubDomains = async () => {
  return await trpcClient.getSubDomains.query();
};
