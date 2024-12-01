import { BlogSchema } from '@repo/types';
import { z } from 'zod';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { CreateBlogUseCase } from '../usecases/blog';
import { UpdateBlogUseCase } from '../usecases/blog/UpdateBlogUseCase';

const prismaClient = PrismaClientSingleton.instance;
const createBlogUseCase = new CreateBlogUseCase(prismaClient);
const updateBlogUseCase = new UpdateBlogUseCase(prismaClient);

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
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prismaClient.blog.findFirst({
      where: { id: input.id },
    });
  }),
  getBlogsByOwnerId: publicProcedure.input(BlogSchema.pick({ ownerId: true })).query(async ({ input }) => {
    const blogs = await prismaClient.blog.findMany({
      where: { ownerId: input.ownerId },
      orderBy: { createdAt: 'desc' },
    });

    return { blogs };
  }),
  getBlogsBySubDomain: publicProcedure.input(BlogSchema.pick({ subDomain: true })).query(async ({ input }) => {
    return await prismaClient.blog.findFirst({
      where: { subDomain: input.subDomain },
    });
  }),
  getSubDomains: publicProcedure.query(async () => {
    const blogs = await prismaClient.blog.findMany({
      select: { subDomain: true },
    });

    return blogs.map(blog => blog.subDomain);
  }),
  update: protectedProcedure
    .input(BlogSchema.pick({ id: true, name: true, subDomain: true }))
    .mutation(async ({ input }) => {
      return await updateBlogUseCase.execute({
        id: input.id,
        name: input.name,
        subDomain: input.subDomain,
      });
    }),
});
