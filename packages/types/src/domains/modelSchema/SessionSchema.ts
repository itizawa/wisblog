import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema';

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sid: z.string(),
  sess: JsonValueSchema,
  expire: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

export default SessionSchema;
