import type { PrismaClient } from '@prisma/client';
import { BadRequest, type Blog } from '@repo/types';

export class CreateBlogUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(args: Pick<Blog, 'name' | 'subDomain' | 'ownerId'>): Promise<{ createdBlog: Blog }> {
    const sameSubDomainBlog = await this.prismaClient.blog.findFirst({
      where: {
        subDomain: args.subDomain,
      },
    });

    if (sameSubDomainBlog) {
      throw new BadRequest('同一のサブドメインのブログが存在します');
    }

    const createdBlog = await this.prismaClient.blog.create({
      data: args,
    });

    return { createdBlog };
  }
}
