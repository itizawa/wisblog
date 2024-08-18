import { z } from 'zod';

export const BlogScalarFieldEnumSchema = z.enum(['id', 'name', 'subDomain', 'createdAt', 'updatedAt']);

export default BlogScalarFieldEnumSchema;
