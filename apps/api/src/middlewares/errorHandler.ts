import { ValidationError } from '@repo/types';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
