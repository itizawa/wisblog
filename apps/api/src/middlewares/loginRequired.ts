import type { User } from '@repo/types';
import type { NextFunction, Request, Response } from 'express';

/**
 * ログイン状態をチェックするミドルウェア
 * @param req
 * @param res
 * @param next
 * @returns 403
 */
export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    // TODO: ロギングライプラリを使う https://github.com/itizawa/wisblog/issues/42
    console.log('Error: login required', 'error');
    return res.sendStatus(403);
  }

  return next();
};
