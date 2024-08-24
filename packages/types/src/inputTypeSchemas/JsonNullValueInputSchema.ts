import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const JsonNullValueInputSchema = z
  .enum(['JsonNull'])
  .transform(value => (value === 'JsonNull' ? Prisma.JsonNull : value));
