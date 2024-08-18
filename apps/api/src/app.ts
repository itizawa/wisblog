import type { Blog } from '@repo/types';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

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

app.get('/message/:name', (req, res) => {
  return res.json({ message: `hello ${req.params.name as Blog['name']}` });
});

app.get('/status', (_, res) => {
  return res.json({ ok: true });
});

export default app;
