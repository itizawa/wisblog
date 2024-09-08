'use server';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@repo/api';
import urlJoin from 'url-join';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', '/trpc'),
    }),
  ],
});
