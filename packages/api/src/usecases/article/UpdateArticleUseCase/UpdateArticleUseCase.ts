import type { PrismaClient } from '@prisma/client';
import type { PublishArticle, User } from '@repo/types';

export class UpdateArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(
    args: Pick<PublishArticle, 'body' | 'title' | 'id'>,
    requestedUser: User,
  ): Promise<{ updatedArticle: PublishArticle }> {
    const updatedArticle = await this.prismaClient.publishArticle.update({
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
