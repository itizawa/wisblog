import { z } from 'zod';

export const StatusSchema = z.enum(['publish', 'draft']);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

export default StatusSchema;
