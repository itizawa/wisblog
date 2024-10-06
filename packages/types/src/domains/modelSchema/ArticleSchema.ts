import { z } from 'zod';
import { StatusSchema } from '../inputTypeSchemas/StatusSchema';

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  status: StatusSchema,
  id: z.string(),
  title: z.string(),
  body: z.string(),
  blogId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Article = z.infer<typeof ArticleSchema>;

export default ArticleSchema;
