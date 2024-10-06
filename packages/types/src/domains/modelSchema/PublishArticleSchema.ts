import { z } from 'zod';

/////////////////////////////////////////
// PUBLISH ARTICLE SCHEMA
/////////////////////////////////////////

export const PublishArticleSchema = z.object({
  id: z.string(),
  title: z
    .string({ required_error: '名前を入力してください' })
    .max(255, { message: '名前は255文字未満で入力してください' }),
  body: z.string(),
  blogId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PublishArticle = z.infer<typeof PublishArticleSchema>;

export default PublishArticleSchema;
