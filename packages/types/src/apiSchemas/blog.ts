import z from 'zod';
import { BlogSchema } from '~/modelSchema';

export const createBlogSchema = z.object({
  body: BlogSchema.pick({ name: true, subDomain: true }),
});
