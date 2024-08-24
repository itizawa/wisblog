import { z } from 'zod';

/////////////////////////////////////////
// BLOG SCHEMA
/////////////////////////////////////////

export const BlogSchema = z.object({
  id: z.string(),
  name: z.string().max(255, { message: '255字未満で入力してください' }),
  subDomain: z.string().min(3, { message: '3字以上で入力してください' }),
  ownerId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Blog = z.infer<typeof BlogSchema>;

export default BlogSchema;
