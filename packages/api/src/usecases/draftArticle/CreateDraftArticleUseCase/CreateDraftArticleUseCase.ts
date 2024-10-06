import type { DraftArticle, PrismaClient } from '@prisma/client';
import type { PublishArticle } from '@repo/types';
import { ResourceNotFound, UnAuthorized } from '@repo/types';

export class CreateDraftArticleUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute(
    args: Pick<PublishArticle, 'body' | 'title' | 'authorId' | 'blogId'>,
  ): Promise<{ createdDraftArticle: DraftArticle }> {
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

    const createdDraftArticle = await this.prismaClient.draftArticle.create({
      data: args,
    });

    return { createdDraftArticle };
  }
}
