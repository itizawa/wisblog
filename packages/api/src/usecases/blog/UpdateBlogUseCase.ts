import type { PrismaClient } from '@prisma/client';
import { BadRequest, type Blog } from '@repo/types';

export class UpdateBlogUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(args: Pick<Blog, 'name' | 'subDomain' | 'id'>): Promise<{ createdBlog: Blog }> {
    const sameSubDomainBlog = await this.prismaClient.blog.findFirst({
      where: {
        id: { not: args.id },
        subDomain: args.subDomain,
      },
    });

    if (sameSubDomainBlog) {
      throw new BadRequest('同一のサブドメインのブログが存在します');
    }

    const createdBlog = await this.prismaClient.blog.update({
      where: { id: args.id },
      data: {
        subDomain: args.subDomain,
        name: args.name,
      },
    });

    return { createdBlog };
  }
}
