import { z } from 'zod';

/////////////////////////////////////////
// DRAFT ARTICLE SCHEMA
/////////////////////////////////////////

export const DraftArticleSchema = z.object({
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

export type DraftArticle = z.infer<typeof DraftArticleSchema>;

export default DraftArticleSchema;
