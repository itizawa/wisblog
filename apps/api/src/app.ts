import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors());

app.get('/message/:name', (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});

app.get('/status', (_, res) => {
  return res.json({ ok: true });
});

export default app;
