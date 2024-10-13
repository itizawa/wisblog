export const generateMainUrl = () => {
  if (process.env.NEXT_PUBLIC_IS_LOCAL === 'true') {
    return 'http://localhost:3000';
  }
  return 'https://wiscro.app';
};
