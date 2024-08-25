import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const JsonNullValueFilterSchema = z
  .enum(['DbNull', 'JsonNull', 'AnyNull'])
  .transform(value =>
    value === 'JsonNull'
      ? Prisma.JsonNull
      : value === 'DbNull'
        ? Prisma.JsonNull
        : value === 'AnyNull'
          ? Prisma.AnyNull
          : value,
  );
