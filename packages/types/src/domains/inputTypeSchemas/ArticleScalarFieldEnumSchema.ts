import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'body',
  'blogId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export default ArticleScalarFieldEnumSchema;
