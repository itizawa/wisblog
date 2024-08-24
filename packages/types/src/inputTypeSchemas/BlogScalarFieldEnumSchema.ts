import { z } from 'zod';

export const BlogScalarFieldEnumSchema = z.enum(['id', 'name', 'subDomain', 'ownerId', 'createdAt', 'updatedAt']);

export default BlogScalarFieldEnumSchema;
