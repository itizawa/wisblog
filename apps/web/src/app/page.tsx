'use client';

import type { CreateBlogSchema } from '@repo/types';
import { Button } from '@repo/ui/button';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { apiRequest } from '~/libs/apiClient';

export default function Web() {
  const [name, setName] = useState<string>('');
  const [subDomain, setSubDomain] = useState<string>('');

  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, []);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeSubDomain = (e: ChangeEvent<HTMLInputElement>) => setSubDomain(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiRequest<CreateBlogSchema>({
        path: '/blogs',
        method: 'POST',
        options: {
          body: { name, subDomain },
        },
      });
    } catch (err) {
      console.error(err);
      setError('Unable to fetch response');
    }
  };

  const onReset = () => {
    setName('');
  };

  return (
    <div>
      <h1>Web</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name </label>
        <input type='text' name='name' id='name' value={name} onChange={onChangeName} />
        <br />
        <label htmlFor='subDomain'>SubDomain </label>
        <input type='text' name='subDomain' id='subDomain' value={subDomain} onChange={onChangeSubDomain} />
        <br />
        <Button type='submit'>Submit</Button>
      </form>
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div>
          <h3>Greeting</h3>
          <p>{response.message}</p>
          <Button onClick={onReset}>Reset</Button>
        </div>
      )}
    </div>
  );
}
