'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NoteAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, useTheme } from '@mui/material';
import { type Blog, BlogSchema } from '@repo/types';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { createBlog, updateBlog } from '~/actions/blog';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

const inputSchema = BlogSchema.pick({ name: true, subDomain: true });
type InputState = z.infer<typeof inputSchema>;

type Props = {
  existingBlog?: Blog;
};

export const EditBlogForm: FC<Props> = ({ existingBlog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();

  const { control, formState, handleSubmit } = useForm<InputState>({
    defaultValues: existingBlog
      ? {
          name: existingBlog.name,
          subDomain: existingBlog.subDomain,
        }
      : {
          name: '',
          subDomain: '',
        },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, subDomain }) => {
    try {
      if (existingBlog) {
        await updateBlog({
          id: existingBlog.id,
          name,
          subDomain,
        });
        enqueueSnackbar({ message: 'ブログを更新しました', variant: 'success' });
      } else {
        await createBlog({
          name,
          subDomain,
        });
        enqueueSnackbar({ message: 'ブログを作成しました', variant: 'success' });
        window.location.href = generateSubDomainUrl(subDomain);
      }
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
