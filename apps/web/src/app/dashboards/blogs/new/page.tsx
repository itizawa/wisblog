'use client';

import { Button } from '@repo/ui/button';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { createBlog } from '~/actions/blog';
import { useSnackbar } from '~/context/SnackbarProvider';

export default function Page() {
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

    try {
      await createBlog({
        name,
        subDomain,
      });
      enqueueSnackbar({ message: 'ブログを作成しました', variant: 'success' });
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
      setError('ブログの作成に失敗しました');
    }
  };

  const onReset = () => {
    setName('');
  };

  return (
    <div>
      <h1>New</h1>
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
