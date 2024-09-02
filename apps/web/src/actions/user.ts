'use server';

import type { AppRouter } from '@repo/api';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

import type { GetMeSchema } from '@repo/types';
import { USERS_ME } from '~/constants/apiUrls';
import { apiRequest } from '~/libs/apiClient';

export const fetchMe = async () => {
  return await apiRequest<GetMeSchema>({
    path: '/users/me',
    method: 'GET',
    options: {
      next: { tags: [USERS_ME()] },
    },
  });
};

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});
