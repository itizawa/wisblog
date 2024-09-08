import { notFound } from 'next/navigation';
import { getBlogsBySubDomain } from '~/actions/blog';

export default async function Page({ params }: { params: { subDomain: string } }) {
  const blog = await getBlogsBySubDomain({ subDomain: params.subDomain });

  if (!blog) {
    return notFound();
  }

  return (
    <div>
      <h1>Blog個別ページ</h1>
      <p>{blog.name}</p>
    </div>
  );
}
