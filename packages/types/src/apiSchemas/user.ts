import { z } from 'zod';
import { UserSchema } from '../domains/modelSchema/UserSchema';

export const getMeSchema = z.object({
  method: z.literal('GET'),
  path: z.literal('/users/me'),
  options: z.object({
    next: z.object({
      tags: z.array(z.string()),
    }),
  }),
  response: z.object({ currentUser: UserSchema }),
});

export type GetMeSchema = z.infer<typeof getMeSchema>;
