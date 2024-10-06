import { DraftArticleSchema } from '@repo/types';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';
import { CreateDraftArticleUseCase } from '../usecases/draftArticle/CreateDraftArticleUseCase';
import { UpdateDraftArticleUseCase } from '../usecases/draftArticle/UpdateDraftArticleUseCase';

const prismaClient = PrismaClientSingleton.instance;
const createDraftArticleUseCase = new CreateDraftArticleUseCase(prismaClient);
const updateDraftArticleUseCase = new UpdateDraftArticleUseCase(prismaClient);

export const draftArticleRouter = router({
  getDraftArticle: protectedProcedure.input(DraftArticleSchema.pick({ id: true })).mutation(async ({ input }) => {
    const draftArticle = await prismaClient.draftArticle.findFirst({
      where: {
        id: input.id,
      },
    });

    return { draftArticle };
  }),
  getDraftArticles: protectedProcedure
    .input(DraftArticleSchema.pick({ blogId: true }))
    .mutation(async ({ ctx, input }) => {
      const draftArticles = await prismaClient.draftArticle.findMany({
        where: {
          blogId: input.blogId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { draftArticles };
    }),
  createDraftArticle: protectedProcedure
    .input(DraftArticleSchema.pick({ title: true, body: true, blogId: true }))
    .mutation(async ({ ctx, input }) => {
      return await createDraftArticleUseCase.execute({
        title: input.title,
        body: input.body,
        authorId: ctx.user.id,
        blogId: input.blogId,
      });
    }),

  updateDraftArticle: protectedProcedure
    .input(DraftArticleSchema.pick({ id: true, title: true, body: true }))
    .mutation(async ({ ctx, input }) => {
      return await updateDraftArticleUseCase.execute(
        {
          id: input.id,
          title: input.title,
          body: input.body,
        },
        ctx.user,
      );
    }),
});
