import { BlogSchema, type User } from '@repo/types';
import { TRPCError } from '@trpc/server';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';
import { CreateBlogUseCase } from '../usecases/blog';

const createBlogUseCase = new CreateBlogUseCase(PrismaClientSingleton.instance);

export const blogRouter = router({
  createBlog: protectedProcedure
    .input(BlogSchema.pick({ name: true, subDomain: true }))
    .mutation(async ({ ctx, input }) => {
      return await createBlogUseCase.execute({
        name: input.name,
        subDomain: input.subDomain,
        ownerId: ctx.user.id,
      });
    }),
});
