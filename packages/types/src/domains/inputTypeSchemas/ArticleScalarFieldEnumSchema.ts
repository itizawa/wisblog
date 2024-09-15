import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id', 'title', 'body', 'authorId', 'createdAt', 'updatedAt']);

export default ArticleScalarFieldEnumSchema;
