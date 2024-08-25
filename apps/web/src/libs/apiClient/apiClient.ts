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

  const response = await fetch(url, init).catch(error => {
    console.error(error);
    throw new Error(`Fetch error: ${error.message}`);
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  console.error('ERROR:', { statusCode: response.status, statusText: response.statusText, url, method, options });
  throw new Error(response.statusText);
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
