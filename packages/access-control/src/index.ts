import type { Blog, PublishArticle, User } from '@repo/types';

const allowedGuestUser = true;

const accessControlObject = {
  publish_article: {
    create: ({ user, blog }: { user: User | null; blog: Blog }) => !!user && blog.ownerId === user.id,
    read: () => allowedGuestUser,
    update: ({ user, article, blog }: { user: User | null; article?: PublishArticle; blog: Blog }) =>
      !!user && !!article && (article.authorId === user.id || blog.ownerId === user.id),
    delete: ({ user, article, blog }: { user: User | null; article?: PublishArticle; blog: Blog }) =>
      !!user && !!article && (article.authorId === user.id || blog.ownerId === user.id),
  },
  blog: {
    create: ({ user }: { user: User | null }) => !!user,
    read: () => allowedGuestUser,
    update: ({ user, blog }: { user: User | null; blog?: Blog }) => !!user && !!blog && blog.ownerId === user.id,
    delete: ({ user, blog }: { user: User | null; blog?: Blog }) => !!user && !!blog && blog.ownerId === user.id,
  },
};

type Args = {
  action: 'create' | 'read' | 'update' | 'delete';
  user: User | null;
} & (
  | {
      type: 'publish_article';
      publishArticle?: PublishArticle;
      blog: Blog;
    }
  | {
      type: 'blog';
      blog?: Blog;
    }
);

export const can = (args: Args): boolean => {
  switch (args.type) {
    case 'publish_article':
      return accessControlObject[args.type][args.action](args);
    case 'blog':
      return accessControlObject[args.type][args.action](args);
    default: {
      const _exhaustiveCheck: never = args;
      return false;
    }
  }
};
