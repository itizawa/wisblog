'use server';

import { trpcClient } from '~/libs/trpcClient/trpcClient';

export const getCurrentUser = async () => {
  const { currentUser } = await trpcClient.user.getCurrentUser.query();

  if (!currentUser) return { currentUser: null };

  return {
    currentUser: {
      ...currentUser,
      createdAt: new Date(currentUser.createdAt),
    },
  };
};
