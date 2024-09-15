import { ArticleSchema } from '@repo/types';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';
import { CreateArticleUseCase } from '../usecases/article/CreateArticleUseCase';

const prismaClient = PrismaClientSingleton.instance;
const createArticleUseCase = new CreateArticleUseCase(prismaClient);

export const articleRouter = router({
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
