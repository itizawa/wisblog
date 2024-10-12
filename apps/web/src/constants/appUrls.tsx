export const appUrls = {
  dashboard: {
    blogs: {
      list: () => '/blogs' as const,
      articles: {
        list: (blogId: string) => `/dashboards/blogs/${blogId}/articles` as const,
        new: (blogId: string) => `/dashboards/blogs/${blogId}/articles/new` as const,
        edit: (blogId: string, articleId: string) => `/dashboards/blogs/${blogId}/articles/${articleId}/edit` as const,
      },
    },
  },
  blogs: {
    top: () => '/' as const,
    article: (id: string) => `/${id}` as const,
  },
};
