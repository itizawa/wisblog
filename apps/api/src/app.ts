import type { Blog } from '@repo/types';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { userRoutes } from './controllers/user';

const app = express();

if (!process.env.SESSION_SECRET) {
  throw new Error('Please set session secret!');
}

app.use(
  session({
    rolling: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // cookieへのアクセスをHTTPのみに制限しない
      maxAge: 24 * 60 * 60 * 1000, // クッキーの有効期限(msec)
    },
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

app.get('/message/:name', (req, res) => {
  return res.json({ message: `hello ${req.params.name as Blog['name']}` });
});

app.get('/status', (_, res) => {
  return res.json({ ok: true });
});

export default app;
