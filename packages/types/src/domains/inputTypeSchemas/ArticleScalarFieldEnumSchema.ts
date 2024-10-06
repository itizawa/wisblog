import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'body',
  'status',
  'blogId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export default ArticleScalarFieldEnumSchema;
