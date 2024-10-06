import { z } from 'zod';

export const DraftArticleScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'body',
  'blogId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export default DraftArticleScalarFieldEnumSchema;
