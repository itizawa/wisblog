import { ValidationError } from '@repo/types';
import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new ValidationError(error.errors.map(v => v.message).join(', ')));
    }
  }
};
