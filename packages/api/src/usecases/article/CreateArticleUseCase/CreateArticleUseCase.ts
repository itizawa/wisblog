import type { PrismaClient } from '@prisma/client';
import type { Article } from '@repo/types';
import { ResourceNotFound, UnAuthorized } from '@repo/types';

export class CreateArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(args: Pick<Article, 'body' | 'title' | 'authorId' | 'blogId'>): Promise<{ createdArticle: Article }> {
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

    const createdArticle = await this.prismaClient.article.create({
      data: args,
    });

    return { createdArticle };
  }
}
