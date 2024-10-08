import app from './app';

export type { AppRouter } from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`REST API server ready at: http://localhost:${PORT}`);
});
