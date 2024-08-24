import { z } from 'zod';

export const BlogScalarFieldEnumSchema = z.enum(['id', 'name', 'subDomain', 'owenerId', 'createdAt', 'updatedAt']);

export default BlogScalarFieldEnumSchema;
