'use server';

import type { User } from '@repo/types';
import { USERS_ME } from '~/constants/apiUrls';
import { apiGet } from '~/libs/apiClient';

export const fetchMe = async () => {
  return await apiGet<{ currentUser?: User }>(USERS_ME(), {
    next: { tags: [USERS_ME()] },
  });
};
