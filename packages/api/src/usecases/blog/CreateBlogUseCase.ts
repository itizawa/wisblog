import type { PrismaClient } from '@prisma/client';
import type { Blog } from '@repo/types';

export class CreateBlogUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(args: Pick<Blog, 'name' | 'subDomain' | 'ownerId'>): Promise<{ createdBlog: Blog }> {
    const createdBlog = await this.prismaClient.blog.create({
      data: args,
    });

    return { createdBlog };
  }
}
