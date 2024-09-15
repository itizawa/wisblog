'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NoteAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, useTheme } from '@mui/material';
import { ArticleSchema } from '@repo/types';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { createArticle } from '~/actions/article';
import { Editor } from '~/components/uiParts/Editor';

const inputSchema = ArticleSchema.pick({ title: true, body: true });
type InputState = z.infer<typeof inputSchema>;

type Props = {
  blogId: string;
};

export const ArticleForm: FC<Props> = ({ blogId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();
  const router = useRouter();

  const { control, formState, handleSubmit } = useForm<InputState>({
    defaultValues: {
      title: '',
      body: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ title, body }) => {
    try {
      await createArticle({
        title,
        body,
        blogId,
      });
      enqueueSnackbar({ message: '記事を作成しました', variant: 'success' });
      router.push('/');
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  });

  return (
    <Stack gap={2}>
      <Controller
        name='title'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            placeholder='タイトルを入力してください'
            label='タイトル'
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
        name='body'
        control={control}
        render={({ field }) => (
          <Editor onChange={field.onChange} placeholder='記事の内容を入力する' body={field.value} />
        )}
      />
      <LoadingButton
        type='submit'
        variant='contained'
        endIcon={<NoteAdd />}
        color='primary'
        onClick={onSubmit}
        disabled={formState.isLoading || formState.isSubmitting || !formState.isValid}
        loading={formState.isSubmitting}
      >
        作成
      </LoadingButton>
    </Stack>
  );
};
