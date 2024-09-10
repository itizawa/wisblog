import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  getCurrentUsers: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
