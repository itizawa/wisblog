'use server';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@repo/api';
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

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
    }),
  ],
});

export const fetchTest = async () => {
  const res = await trpcClient.userList.query();
  console.log(res, 30);

  return res;
};
