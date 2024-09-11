import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  getCurrentUser: publicProcedure.query(({ ctx }) => {
    return {
      currentUser: ctx.user,
    };
  }),
});
