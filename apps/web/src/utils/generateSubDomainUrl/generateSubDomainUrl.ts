export const generateSubDomainUrl = (subDomain: string) => {
  const currentHost = window.location.hostname;

  if (currentHost.includes('localhost')) {
    return `http://${subDomain}.localhost:3000`;
  }
  return `https://${subDomain}.${currentHost}`;
};
