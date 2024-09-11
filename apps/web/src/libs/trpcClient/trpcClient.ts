'use server';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@repo/api';
import { cookies } from 'next/headers';
import urlJoin from 'url-join';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', '/trpc'),
      fetch: async (input, init) => {
        const cookieStore = cookies();
        const cookie = cookieStore
          .getAll()
          .map(cookie => `${cookie.name}=${cookie.value}`)
          .join(';');

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Credentials': 'true',
          cookie: cookie,
        };

        return fetch(input, {
          ...init,
          headers,
          credentials: 'include',
        });
      },
    }),
  ],
});
