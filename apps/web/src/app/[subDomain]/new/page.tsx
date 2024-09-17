import { Stack } from '@mui/material';
import { can } from '@repo/access-control';
import { notFound } from 'next/navigation';
import { getBlogsBySubDomain } from '~/actions/blog';
import { getCurrentUser } from '~/actions/user';
import { ArticleForm } from '~/components/models/article/ArticleForm';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const [blog, { currentUser }] = await Promise.all([
    getBlogsBySubDomain({ subDomain: params.subDomain }),
    getCurrentUser(),
  ]);

  if (!blog) {
    return notFound();
  }

  if (
    !can({
      type: 'article',
      action: 'create',
      user: currentUser,
      blog,
    })
  ) {
    return notFound();
  }

  return (
    <Stack maxWidth={900} mx='auto' pt={4} gap={3} px={2}>
      <ArticleForm blogId={blog.id} subDomain={blog.subDomain} />
    </Stack>
  );
}
