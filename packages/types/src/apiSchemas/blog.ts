import { z } from 'zod';
import { BlogSchema } from '../domains/modelSchema/BlogSchema';

export const createBlogSchema = z.object({
  method: z.literal('POST'),
  path: z.literal('/blogs'),
  options: z.object({
    body: BlogSchema.pick({ name: true, subDomain: true }),
  }),
  response: BlogSchema,
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
