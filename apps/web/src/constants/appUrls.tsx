export const appUrls = {
  dashboard: {
    blogs: {
      list: () => '/blogs' as const,
      articles: (blogId: string) => `/dashboards/blogs/${blogId}/articles` as const,
    },
  },
  blogs: {
    top: () => '/' as const,
    article: (id: string) => `/${id}` as const,
  },
};
