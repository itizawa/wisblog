import type { Article, Blog, User } from '@repo/types';

const allowedGuestUser = true;

const accessControlObject = {
  article: {
    create: ({ user, blog }: { user?: User; blog: Blog }) => !!user && blog.ownerId === user.id,
    read: () => allowedGuestUser,
    update: ({ user, article, blog }: { user?: User; article: Article; blog: Blog }) =>
      !!user && (article.authorId === user.id || blog.ownerId === user.id),
    delete: ({ user, article, blog }: { user?: User; article: Article; blog: Blog }) =>
      !!user && (article.authorId === user.id || blog.ownerId === user.id),
  },
  blog: {
    create: ({ user }: { user?: User }) => !!user,
    read: () => allowedGuestUser,
    update: ({ user, blog }: { user?: User; blog: Blog }) => !!user && blog.ownerId === user.id,
    delete: ({ user, blog }: { user?: User; blog: Blog }) => !!user && blog.ownerId === user.id,
  },
};

type Args = {
  action: 'create' | 'read' | 'update' | 'delete';
  user?: User;
} & (
  | {
      type: 'article';
      article: Article;
      blog: Blog;
    }
  | {
      type: 'blog';
      blog: Blog;
    }
);

export const can = (args: Args): boolean => {
  switch (args.type) {
    case 'article':
      return accessControlObject[args.type][args.action](args);
    case 'blog':
      return accessControlObject[args.type][args.action](args);
    default: {
      const _exhaustiveCheck: never = args;
      return false;
    }
  }
};
