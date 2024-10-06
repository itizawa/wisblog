import type { PrismaClient } from '@prisma/client';
import type { PublishArticle } from '@repo/types';
import { ResourceNotFound, UnAuthorized } from '@repo/types';

export class CreateArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(
    args: Pick<PublishArticle, 'body' | 'title' | 'authorId' | 'blogId'>,
  ): Promise<{ createdArticle: PublishArticle }> {
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        id: args.blogId,
      },
    });

    if (!blog) {
      throw new ResourceNotFound('リソースが存在しません');
    }

    if (blog.ownerId !== args.authorId) {
      throw new UnAuthorized('権限がありません');
    }

    const createdArticle = await this.prismaClient.publishArticle.create({
      data: args,
    });

    return { createdArticle };
  }
}
