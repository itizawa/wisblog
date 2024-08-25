'use client';

import type { CreateBlogSchema } from '@repo/types';
import { Button } from '@repo/ui/button';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useSnackbar } from '~/context/SnackbarProvider';
import { apiRequest } from '~/libs/apiClient';

export default function Web() {
  const [name, setName] = useState<string>('');
  const [subDomain, setSubDomain] = useState<string>('');

  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, []);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeSubDomain = (e: ChangeEvent<HTMLInputElement>) => setSubDomain(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await apiRequest<CreateBlogSchema>({
      path: '/blogs',
      method: 'POST',
      options: {
        body: { name, subDomain },
      },
    });

    if (result.isFailure) {
      enqueueSnackbar({ message: result.errorMessage, variant: 'error' });
      setError('ブログの作成に失敗しました');

      return;
    }

    enqueueSnackbar({ message: 'ブログを作成しました', variant: 'success' });
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
