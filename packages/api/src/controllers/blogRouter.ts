import { BlogSchema } from '@repo/types';
import { PrismaClientSingleton } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { CreateBlogUseCase } from '../usecases/blog';

const prismaClient = PrismaClientSingleton.instance;
const createBlogUseCase = new CreateBlogUseCase(prismaClient);

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
});
