import type { NextFunction, Request, Response } from 'express';

export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
