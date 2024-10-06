import { z } from 'zod';

export const PublishArticleScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'body',
  'blogId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export default PublishArticleScalarFieldEnumSchema;
