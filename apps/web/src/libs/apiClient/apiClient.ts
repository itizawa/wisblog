'use server';
import urlJoin from 'url-join';

import { cookies } from 'next/headers';

export const handler = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  options?: RequestInit,
): Promise<T> => {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join(';');

  const url = urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', path);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': 'true',
    cookie: cookie,
  };

  const init: RequestInit = {
    ...options,
    method,
    headers,
    credentials: 'include',
  };

  const response = await fetch(url, init);
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  // NOTE: 現在エラーになった時はmessageを返すようにしている。
  // - 表示すべきエラーメッセージかどうかはサーバー側で制御しておりフロントではステータスコードで正常する必要はない。そのため、apiClientは全て500で返すようにしている。
  throw new Error(data.message || 'エラーが発生しました。');
};

type ApiBaseSchema = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  options?: {
    body?: object;
    query?: object;
    params?: object;
    next?: object;
  };
  response: object;
};

export const apiRequest = async <T extends ApiBaseSchema>(schema: Omit<T, 'response'>): Promise<T['response']> => {
  return handler(schema.path, schema.method, { ...schema.options, body: JSON.stringify(schema.options?.body) });
};
