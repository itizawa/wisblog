import type { PrismaClient } from '@prisma/client';
import type { Article, User } from '@repo/types';

export class UpdateArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(
    args: Pick<Article, 'body' | 'title' | 'id'>,
    requestedUser: User,
  ): Promise<{ updatedArticle: Article }> {
    const updatedArticle = await this.prismaClient.article.update({
      where: {
        id: args.id,
        authorId: requestedUser.id,
      },
      data: {
        body: args.body,
        title: args.title,
      },
    });

    return { updatedArticle };
  }
}
