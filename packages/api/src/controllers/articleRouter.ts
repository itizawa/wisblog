import type { Article } from '@prisma/client';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

import { StatusSchema } from '@repo/types';
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
        return null;
      }

      if (toStatus === 'publish') {
        const newArticle = await prismaClient.$transaction([
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

        return newArticle;
      }

      const newArticle = await prismaClient.$transaction([
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

      return newArticle;
    }),
});
