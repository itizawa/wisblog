import type { Article } from '@prisma/client';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

import z from 'zod';

const prismaClient = PrismaClientSingleton.instance;

export const articleRouter = router({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }): Promise<{ article: Article | null }> => {
      const article = await prismaClient.article.findFirst({
        where: {
          id: input.id,
        },
      });

      return { article };
    }),
});
