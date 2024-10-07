'use client';

export const generateSubDomainUrl = (subDomain: string) => {
  if (process.env.NEXT_PUBLIC_IS_LOCAL === 'true') {
    // NOTE: ローカルでサブドメインは扱えないので直接ドメインの後ろにつける
    return `http://localhost:3000/${subDomain}`;
  }
  return `https://${subDomain}.wiscro.app`;
};
