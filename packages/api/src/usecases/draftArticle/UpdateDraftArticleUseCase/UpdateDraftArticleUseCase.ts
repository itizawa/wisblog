import type { PrismaClient } from '@prisma/client';
import type { DraftArticle, User } from '@repo/types';

export class UpdateDraftArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(
    args: Pick<DraftArticle, 'body' | 'title' | 'id'>,
    requestedUser: User,
  ): Promise<{ updatedDraftArticle: DraftArticle }> {
    const updatedDraftArticle = await this.prismaClient.draftArticle.update({
      where: {
        id: args.id,
        authorId: requestedUser.id,
      },
      data: {
        body: args.body,
        title: args.title,
      },
    });

    return { updatedDraftArticle };
  }
}
