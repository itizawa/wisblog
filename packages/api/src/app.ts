import type { Blog } from '@repo/types';
import * as trpcExpress from '@trpc/server/adapters/express';
import { json, urlencoded } from 'body-parser';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { Pool } from 'pg';
import { blogRoutes } from './controllers/blog';
import { userRoutes } from './controllers/user';
import { errorHandler } from './middlewares/errorHandler';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    return { hoge: 'hello trpc' };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

const PgSession = connectPgSimple(session);

const app = express();

if (!process.env.SESSION_SECRET || !process.env.DATABASE_URL) {
  throw new Error('Please set env variables SESSION_SECRET and DATABASE_URL');
}

const url = new URL(process.env.DATABASE_URL);

app.use(
  session({
    rolling: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: process.env.MAIN_DOMAIN,
      maxAge: 24 * 60 * 60 * 1000, // クッキーの有効期限(msec)
    },
    store: new PgSession({
      tableName: 'sessions',
      pool: new Pool({
        user: url.username,
        password: url.password,
        host: url.hostname,
        database: url.pathname.slice(1),
        port: Number(url.port),
      }),
    }),
  }),
);

// Passportの初期化
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.get('/message/:name', (req, res) => {
  return res.json({ message: `hello ${req.params.name as Blog['name']}` });
});

app.get('/status', (_, res) => {
  return res.json({ ok: true });
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);
app.use(errorHandler);

export default app;