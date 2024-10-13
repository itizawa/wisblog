import type { Article } from '@prisma/client';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';

import { ResourceNotFound, StatusSchema } from '@repo/types';
import z from 'zod';

const prismaClient = PrismaClientSingleton.instance;

export const articleRouter = router({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }): Promise<{ article: Article | null }> => {
      const requestedUserId = ctx.user?.id;
      const article = await prismaClient.article.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!article) {
        return { article: null };
      }

      // statusがdraftの場合は現在アクセスしているユーザーのみが取得できる
      if (article.status === 'draft' && article.authorId !== requestedUserId) {
        return { article: null };
      }

      return { article };
    }),

  convertStatus: protectedProcedure
    .input(z.object({ id: z.string(), toStatus: StatusSchema }))
    .mutation(async ({ input }) => {
      const { id, toStatus } = input;

      const article = await prismaClient.article.findFirst({
        where: {
          id,
        },
      });

      if (!article) {
        throw new ResourceNotFound('リソースが存在しません');
      }

      if (toStatus === 'publish') {
        await prismaClient.$transaction([
          prismaClient.draftArticle.delete({
            where: {
              id,
            },
          }),
          prismaClient.publishArticle.create({
            data: {
              id: article.id,
              title: article.title,
              body: article.body,
              blogId: article.blogId,
              authorId: article.authorId,
              createdAt: article.createdAt,
              updatedAt: new Date(),
            },
          }),
        ]);

        return;
      }

      await prismaClient.$transaction([
        prismaClient.publishArticle.delete({
          where: {
            id,
          },
        }),
        prismaClient.draftArticle.create({
          data: {
            id: article.id,
            title: article.title,
            body: article.body,
            blogId: article.blogId,
            authorId: article.authorId,
            createdAt: article.createdAt,
            updatedAt: new Date(),
          },
        }),
      ]);

      return;
    }),
});
