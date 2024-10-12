import { Stack } from '@mui/material';
import { can } from '@repo/access-control';
import { notFound } from 'next/navigation';
import { getBlog } from '~/actions/blog';
import { getCurrentUser } from '~/actions/user';
import { ArticleForm } from '~/components/models/article/ArticleForm';

export default async function Page({ params }: { params: { blogId: string } }) {
  const [blog, { currentUser }] = await Promise.all([getBlog({ id: params.blogId }), getCurrentUser()]);

  if (!blog) {
    return notFound();
  }

  if (!can({ type: 'publish_article', action: 'create', user: currentUser, blog })) {
    return notFound();
  }

  return (
    <Stack maxWidth={1260} mx='auto' py={4} gap={3} px={2}>
      <ArticleForm blogId={blog.id} subDomain={blog.subDomain} />
    </Stack>
  );
}
