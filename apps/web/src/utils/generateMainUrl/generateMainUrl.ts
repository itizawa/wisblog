export const generateMainUrl = () => {
  const currentHost = window.location.hostname;

  if (currentHost.includes('localhost')) {
    return 'http://localhost:3000';
  }
  return 'https://wiscro.app';
};
