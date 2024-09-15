import type { User } from '@repo/types';
import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export const createContext = async ({ req }: CreateHTTPContextOptions) => {
  return {
    // FIXME: CreateHTTPContextOptionsに型を指定してanyを回避する
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    user: (req as any).user as User | null, // TODO:
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

const loginRequiredMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error('Not authenticated');
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(loginRequiredMiddleware);
