import { PublishArticleSchema } from '@repo/types';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { CreateArticleUseCase } from '../usecases/article/CreateArticleUseCase';
import { UpdateArticleUseCase } from '../usecases/article/UpdateArticleUseCase';

const prismaClient = PrismaClientSingleton.instance;
const createArticleUseCase = new CreateArticleUseCase(prismaClient);
const updateArticleUseCase = new UpdateArticleUseCase(prismaClient);

export const publishArticleRouter = router({
  get: publicProcedure.input(PublishArticleSchema.pick({ id: true })).mutation(async ({ input }) => {
    const article = await prismaClient.publishArticle.findFirst({
      where: {
        id: input.id,
      },
    });

    return { article };
  }),
  list: publicProcedure.input(PublishArticleSchema.pick({ blogId: true })).mutation(async ({ ctx, input }) => {
    const articles = await prismaClient.publishArticle.findMany({
      where: {
        blogId: input.blogId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { articles };
  }),
  create: protectedProcedure
    .input(PublishArticleSchema.pick({ title: true, body: true, blogId: true }))
    .mutation(async ({ ctx, input }) => {
      return await createArticleUseCase.execute({
        title: input.title,
        body: input.body,
        authorId: ctx.user.id,
        blogId: input.blogId,
      });
    }),

  update: protectedProcedure
    .input(PublishArticleSchema.pick({ id: true, title: true, body: true }))
    .mutation(async ({ ctx, input }) => {
      return await updateArticleUseCase.execute(
        {
          id: input.id,
          title: input.title,
          body: input.body,
        },
        ctx.user,
      );
    }),
});
