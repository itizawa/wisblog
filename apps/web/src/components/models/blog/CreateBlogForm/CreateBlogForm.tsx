'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, useTheme } from '@mui/material';
import { BlogSchema } from '@repo/types';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { createBlog } from '~/actions/blog';

const inputSchema = BlogSchema.pick({ name: true, subDomain: true });
type InputState = z.infer<typeof inputSchema>;

export const CreateBlogForm: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();

  const { control, handleSubmit } = useForm<InputState>({
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, subDomain }) => {
    try {
      await createBlog({
        name,
        subDomain,
      });
      enqueueSnackbar({ message: 'ブログを作成しました', variant: 'success' });
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  });

  return (
    <Stack gap={2}>
      <Controller
        name='name'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            placeholder='ブログの名前を入力してください'
            label='名前'
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{
              '.MuiInputLabel-formControl.Mui-focused': {
                color: palette.text.primary,
              },
            }}
          />
        )}
      />
      <Controller
        name='subDomain'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            placeholder='ブログのサブドメインを入力してください'
            label='サブドメイン'
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{
              '.MuiInputLabel-formControl.Mui-focused': {
                color: palette.text.primary,
              },
            }}
          />
        )}
      />
      <Button type='submit' variant='contained' color='primary' onClick={onSubmit}>
        作成
      </Button>
    </Stack>
  );
};
