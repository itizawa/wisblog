import { ArticleSchema } from '@repo/types';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { CreateArticleUseCase } from '../usecases/article/CreateArticleUseCase';

const prismaClient = PrismaClientSingleton.instance;
const createArticleUseCase = new CreateArticleUseCase(prismaClient);

export const articleRouter = router({
  getArticles: publicProcedure.input(ArticleSchema.pick({ blogId: true })).mutation(async ({ ctx, input }) => {
    const articles = await prismaClient.article.findMany({
      where: {
        blogId: input.blogId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { articles };
  }),
  createArticle: protectedProcedure
    .input(ArticleSchema.pick({ title: true, body: true, blogId: true }))
    .mutation(async ({ ctx, input }) => {
      return await createArticleUseCase.execute({
        title: input.title,
        body: input.body,
        authorId: ctx.user.id,
        blogId: input.blogId,
      });
    }),
});
