export const generateSubDomainUrl = (subDomain: string) => {
  const currentHost = window.location.hostname;

  if (currentHost.includes('localhost')) {
    // NOTE: ローカルでサブドメインは扱えないので直接ドメインの後ろにつける
    return `http://localhost:3000/${subDomain}`;
  }
  return `https://${subDomain}.${currentHost}`;
};
