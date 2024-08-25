'use server';

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
